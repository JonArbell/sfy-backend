
export interface UrlResponseDTO {
    id : string;
    short : string;
    original : string;
    expirationDate ? : Date | null;
    active : boolean;
}