import { UrlResponseDTO } from "../../dtos/response/url-response.dto";

export const mapToUrlResponseDTO = (url : any) : UrlResponseDTO => {
    return {
        id : url.id,
        active : url.status.active,
        original : url.original,
        short : url.short,
        expirationDate : url.status.expirationDate ?? null
    }
}