import { ShortenUrlRequestDTO } from "../dtos/request/shorten-url-request.dto";
import urlRepository from "../repositories/url-repository";
import urlAccessRepository from "../repositories/url-access.repository";
import { UrlResponseDTO } from "../dtos/response/url-response.dto";
import { mapToUrlResponseDTO } from "../shared/mapper/url-mapper";
import { HttpError } from "../exceptions/httpError";
import { shortenUrl } from "../shared/utils/shortener.util";
import { PageRequest } from "../shared/types/pagination.type";
import { ViewOriginalUrlRequestDTO } from "../dtos/request/view-original-url-request.dto";
import visitorRepository from "../repositories/visitor-repository";
import visitRepository from "../repositories/visit-repository";
import cryptoUtil from "../shared/utils/crypto.util";

const shortenUrlByUserId = async (
  data: ShortenUrlRequestDTO,
  userId: string,
): Promise<UrlResponseDTO> => {
  const shortUrl = await shortenUrl(data.url);

  const findUrl = await urlRepository.findUrlByShort(shortUrl);

  if (findUrl) {
    throw new HttpError(
      409,
      "Short URL already exists. Try again.",
      "ConflictError",
    );
  }

  const url = await urlRepository.create(data.url, shortUrl, userId);

  const password = data.password ? await cryptoUtil.encode(data.password) : "";

  const access = await urlAccessRepository.create(
    url.id,
    password,
    data.expirationDate,
  );

  return {
    id: url.id,
    active: access.active,
    original: url.original,
    short: url.short,
    expirationDate: access.expirationDate,
  };
};

const viewOriginalByShort = async (
  shortUrl: string,
  visitor: ViewOriginalUrlRequestDTO,
) => {
  const findUrl = await urlRepository.findUrlByShort(shortUrl);

  const findVisitor = await visitorRepository.findVisitorByIpAddress(
    visitor.ipAddress,
  );

  if (!findUrl)
    throw new HttpError(404, "No original url found.", "ItemNotFound");

  if (!findVisitor) {
    const newVisitor = await visitorRepository.create(
      visitor.ipAddress,
      visitor.location,
      visitor.deviceType,
    );

    await visitRepository.create(findUrl.id, newVisitor.id);
  } else {
    findVisitor.deviceType = visitor.deviceType;

    await visitRepository.create(findUrl.id, findVisitor.id);

    await visitorRepository.update(
      findVisitor.id,
      findVisitor.ipAddress,
      findVisitor.location,
      findVisitor.deviceType,
    );
  }

  const findAccess = await urlAccessRepository.findByUrlId(findUrl.id);

  if (!findAccess) throw new HttpError(500, "Internal server error.");

  if (!findAccess.active) throw new HttpError(500, "This url is not active.");

  return {
    original: findUrl.original,
    password: findAccess.password,
  };
};

const verifyPassword = async (short: string, password: string) => {
  const findUrl = await urlRepository.findUrlByShort(short);

  if (!findUrl) throw new HttpError(404, "No url found.");

  const findAccess = await urlAccessRepository.findByUrlId(findUrl.id);

  if (!findAccess) throw new HttpError(500, "Internal server error.");

  if (!findAccess.password) throw new HttpError(500, "Internal server error.");

  const passwordMatch = await cryptoUtil.decode(password, findAccess.password);

  if (!passwordMatch) throw new HttpError(409, "Password not match.");

  return findUrl.original;
};

const findAllIncludeUrlAccessByUserId = async (
  userId: string,
  pageable: PageRequest,
) => {
  const count = await urlRepository.totalCountByUserId(userId);

  const data = await urlRepository.findAllIncludeUrlAccessByUserIdWithPaginate(
    userId,
    pageable,
  );

  const totalPages = Math.max(Math.ceil(count / pageable.size), 1);

  return {
    data: data.map((url) => mapToUrlResponseDTO(url)),
    totalElements: count,
    totalPages: totalPages,
  };
};

const findByIdAndUserId = async (id: string, userId: string) => {
  return await urlRepository.findByIdAndUserId(id, userId);
};

const totalCount = async (userId: string) => {
  return await urlRepository.totalCountByUserId(userId);
};

const findMostVisited = async (userId: string) => {
  const findAllUrls = await urlRepository.findAllUrlIdsByUserId(userId);

  if (findAllUrls.length < 1) return null;

  const urlIds = findAllUrls.map((url) => url.id);

  const visits = await visitRepository.findCountsAndModelsByUrlIdsGroupByModel(
    urlIds,
    "urlId",
  );

  const urlId = visits[0].urlId;

  const findUrlById = await urlRepository.findById(urlId);

  return mapToUrlResponseDTO(findUrlById).short;
};

const deleteUrlByIdAndUserId = async (id: string, userId: string) => {
  const findUrl = await urlRepository.findByIdAndUserId(id, userId);

  if (!findUrl)
    throw new HttpError(404, "No url found to delete.", "ItemNotFound");

  return await urlRepository.deleteUrlByIdAndUserId(findUrl.id, userId);
};

const find5RecentUrlsByUserId = async (userId: string) => {
  const recentUrls = await urlRepository.recent5UrlsByUserId(userId);

  const urlResponses = await Promise.all(
    recentUrls.map(async (url) => {
      const [totalVisit, totalVisitor] = await Promise.all([
        visitRepository.findAllVisitsByUrlId(url.id),
        visitRepository.findAllVisitorsByUrlId(url.id),
      ]);
      return mapToUrlResponseDTO(url, totalVisit.length, totalVisitor.length);
    }),
  );

  return urlResponses;
};

export default {
  verifyPassword,
  find5RecentUrlsByUserId,
  totalCount,
  findMostVisited,
  findByIdAndUserId,
  deleteUrlByIdAndUserId,
  findAllIncludeUrlAccessByUserId,
  shortenUrlByUserId,
  viewOriginalByShort,
};
