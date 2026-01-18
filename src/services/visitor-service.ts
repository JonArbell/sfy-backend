import visitRepository from "../repositories/visit-repository";
import urlRepository from "../repositories/url-repository";
import { mapToVisitorResponseDTO } from "../shared/mapper/visitor-mapper";
import { PageRequest } from "../shared/types/pagination.type";

const findAllVisitorsByUrlIds = async (
  userId: string,
  pageable: PageRequest,
) => {
  const findAllUrls = await urlRepository.findAllUrlIdsByUserId(userId);

  const urlIds = findAllUrls.map((url) => url.id);

  const visits = await visitRepository.findCountsAndModelsByUrlIdsGroupByModel(
    urlIds,
    "visitorId",
  );

  const count = visits.length;

  const visitors = await visitRepository.findAllVisitorsByUrlIdsWithPaginate(
    urlIds,
    pageable,
  );

  const data = visitors.map((v) => mapToVisitorResponseDTO(v));

  const totalPages = Math.max(Math.ceil(count / pageable.size), 1);

  return {
    totalPages: totalPages,
    totalElements: count,
    data: data,
  };
};

const totalUniqueVisitors = async (userId: string) => {
  const findAllUrls = await urlRepository.findAllUrlIdsByUserId(userId);

  const urlIds = findAllUrls.map((url) => url.id);

  const highestVisits =
    await visitRepository.findCountsAndModelsByUrlIdsGroupByModel(
      urlIds,
      "visitorId",
    );

  return highestVisits.length;
};

const totalVisitorsByUserIdAndDevices = async (userId: string) => {
  const findAllUrls = await urlRepository.findAllUrlIdsByUserId(userId);

  const urlIds = findAllUrls.map((url) => url.id);

  const visitors = await visitRepository.findAllVisitorsByUrlIds(urlIds);

  const deviceCountMap: Record<string, number> = {};

  visitors.forEach((v) => {
    const device = v.deviceType || "Other";
    deviceCountMap[device] = (deviceCountMap[device] || 0) + 1;
  });

  const result = Object.entries(deviceCountMap).map(([name, count]) => ({
    name,
    count,
  }));

  return result;
};

const top3VisitsByUrl = async (userId: string) => {
  const allUrls = await urlRepository.findAllUrlIdsByUserId(userId);

  const urlIds = allUrls.map((u) => u.id);

  const visits = await visitRepository.findAllVisitsByUrlIds(urlIds);

  const urlCountMap: Record<string, number> = {};

  for (const visit of visits) {
    const findUrl = await urlRepository.findById(visit.urlId);

    if (!findUrl?.short) continue;

    urlCountMap[findUrl?.short] = (urlCountMap[findUrl?.short] || 0) + 1;
  }

  const result = Object.entries(urlCountMap).map(([name, count]) => ({
    name,
    count,
  }));

  return result;
};

export default {
  top3VisitsByUrl,
  totalVisitorsByUserIdAndDevices,
  totalUniqueVisitors,
  findAllVisitorsByUrlIds,
};
