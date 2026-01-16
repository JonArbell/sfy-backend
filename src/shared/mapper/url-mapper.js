export const mapToUrlResponseDTO = (url) => {
    return {
        id: url.id,
        active: url.status.active,
        original: url.original,
        short: url.short,
        expirationDate: url.status.expirationDate ?? null
    };
};
