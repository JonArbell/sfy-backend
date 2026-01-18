import visitRepository from "../repositories/visit-repository";
import urlRepository from "../repositories/url-repository";
const totalCountByUserId = async (userId: string) => {
  const findAllUrls = await urlRepository.findAllUrlIdsByUserId(userId);

  const urlIds = findAllUrls.map((url) => url.id);

  return await visitRepository.totalCountByUrlIds(urlIds);
};

export default { totalCountByUserId };
