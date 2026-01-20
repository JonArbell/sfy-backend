import { UrlResponseDTO } from "../../dtos/response/url-response.dto";

export const mapToUrlResponseDTO = (
  url: any,
  totalVisit: number | null = null,
  totalVisitor: number | null = null,
): UrlResponseDTO => {
  return {
    id: url.id,
    active: url?.status?.active,
    original: url.original,
    short: url.short,
    expirationDate: url?.status?.expirationDate,
    ...(totalVisit != null && { totalVisit }),
    ...(totalVisitor != null && { totalVisitor }),
  };
};
