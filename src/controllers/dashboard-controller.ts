import { Request, Response } from "express";
import urlService from "../services/url-service";
import { asAuthRequest } from "../shared/utils/auth-request.util";
import visitService from "../services/visit-service";
import visitorService from "../services/visitor-service";

const getSummary = async (req: Request, res: Response) => {
  const authRequest = asAuthRequest(req);

  const mostVisitedUrl = await urlService.findMostVisited(authRequest.user.id);

  const totalUrls = await urlService.totalCount(authRequest.user.id);

  const totalUniqueVisitors = await visitorService.totalUniqueVisitors(
    authRequest.user.id,
  );

  const totalVisits = await visitService.totalCountByUserId(
    authRequest.user.id,
  );

  res.status(200).json({
    data: {
      totalVisits,
      totalUrls,
      mostVisitedUrl,
      totalUniqueVisitors,
    },
    message: "success",
  });
};

const getRecentUrls = async (req: Request, res: Response) => {
  const authRequest = asAuthRequest(req);

  const response = await urlService.find5RecentUrlsByUserId(
    authRequest.user.id,
  );

  res.status(200).json({
    data: response,
    message: "success",
  });
};

const getCharts = async (req: Request, res: Response) => {
  const authRequest = asAuthRequest(req);

  const totalVisitorsByDevices =
    await visitorService.totalVisitorsByUserIdAndDevices(authRequest.user.id);

  const top3VisitsByUrl = await visitorService.top3VisitsByUrl(
    authRequest.user.id,
  );

  res.status(200).json({
    data: {
      top3VisitsByUrl,
      totalVisitorsByDevices,
    },
    message: "success",
  });
};

export default {
  getCharts,
  getRecentUrls,
  getSummary,
};
