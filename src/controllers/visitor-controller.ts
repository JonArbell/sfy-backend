import visitorService from "../services/visitor-service";
import { Request, Response } from "express";
import { asAuthRequest } from "../shared/utils/auth-request.util";
import { buildPageable } from "../shared/utils/pagination.util";

const getAllVisitors = async (req: Request, res: Response) => {
  const authRequest = asAuthRequest(req);

  const pageable = buildPageable(req.query);

  const response = await visitorService.findAllVisitorsByUrlIds(
    authRequest.user.id,
    pageable,
  );

  res.status(200).json({
    message: "success",
    data: response.data,
    meta: {
      totalPages: response.totalPages,
      totalElements: response.totalElements,
      size: pageable.size,
      currentPage: pageable.currentPage,
    },
  });
};

export default {
  getAllVisitors,
};
