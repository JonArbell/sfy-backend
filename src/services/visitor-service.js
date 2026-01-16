import visitRepository from "../repositories/visit-repository";
import urlRepository from "../repositories/url-repository";
import { mapToVisitorResponseDTO } from "../shared/mapper/visitor-mapper";
const findAllVisitorsByUrlIds = async (userId, pageable) => {
    const urlIds = await urlRepository.findAllUrlIdsByUserId(userId)
        .then(urls => urls.map(url => url.id));
    const count = await visitRepository.visitorsTotalCountByUrlIds(urlIds);
    const visitors = await visitRepository.findAllVisitorsByUrlIds(urlIds, pageable);
    const data = visitors.map(v => mapToVisitorResponseDTO(v));
    const totalPages = Math.max(Math.ceil(count / pageable.size), 1);
    return {
        totalPages: totalPages,
        totalElements: count,
        data: data
    };
};
export default {
    findAllVisitorsByUrlIds
};
