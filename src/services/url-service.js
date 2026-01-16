import urlRepository from "../repositories/url-repository";
import urlAccessRepository from "../repositories/url-access.repository";
import { mapToUrlResponseDTO } from "../shared/mapper/url-mapper";
import { HttpError } from "../exceptions/httpError";
import { shortenUrl } from "../shared/utils/shortener.util";
import visitorRepository from "../repositories/visitor-repository";
import visitRepository from "../repositories/visit-repository";
const shortenUrlByUserId = async (data, userId) => {
    const shortUrl = await shortenUrl(data.url);
    const findUrl = await urlRepository.findUrlByShort(shortUrl);
    if (findUrl) {
        throw new HttpError(409, "Short URL already exists. Try again.", "ConflictError");
    }
    const url = await urlRepository.create(data.url, shortUrl, userId);
    const access = await urlAccessRepository.create(url.id, data.expirationDate, data.password);
    return {
        id: url.id,
        active: access.active,
        original: url.original,
        short: url.short,
        expirationDate: access.expirationDate,
    };
};
const viewOriginalByShort = async (shortUrl, visitor) => {
    const originalUrl = await urlRepository.findUrlByShort(shortUrl);
    const findVisitor = await visitorRepository.findVisitorByIpAddress(visitor.ipAddress);
    if (!originalUrl)
        throw new HttpError(404, "No original url found.", "ItemNotFound");
    if (!findVisitor) {
        const newVisitor = await visitorRepository.create(visitor.ipAddress, visitor.location, visitor.deviceType);
        await visitRepository.create(originalUrl.id, newVisitor.id);
    }
    else {
        findVisitor.deviceType = visitor.deviceType;
        await visitRepository.create(originalUrl.id, findVisitor.id);
        await visitorRepository.update(findVisitor.id, findVisitor.ipAddress, findVisitor.location, findVisitor.deviceType);
    }
    return originalUrl.original;
};
const findAllIncludeUrlAccessByUserId = async (userId, pageable) => {
    const count = await urlRepository.totalCountByUserId(userId);
    const data = await urlRepository.findAllIncludeUrlAccessByUserId(userId, pageable);
    const totalPages = Math.max(Math.ceil(count / pageable.size), 1);
    return {
        data: data.map((url) => mapToUrlResponseDTO(url)),
        totalElements: count,
        totalPages: totalPages,
    };
};
const deleteUrlByIdAndUserId = async (id, userId) => {
    const findUrl = await urlRepository.findByIdAndUserId(id, userId);
    if (!findUrl)
        throw new HttpError(404, "No url found to delete.", "ItemNotFound");
    return await urlRepository.deleteUrlByIdAndUserId(findUrl.id, userId);
};
export default {
    deleteUrlByIdAndUserId,
    findAllIncludeUrlAccessByUserId,
    shortenUrlByUserId,
    viewOriginalByShort,
};
