export const buildPageable = (query) => {
    const direction = query.direction?.toLowerCase() === 'asc' ? 'asc' : 'desc';
    const sortBy = typeof query.sortBy === 'string' ? query.sortBy : 'createdAt';
    const currentPage = Math.max(Number(query.page) || 1, 1);
    const size = Math.min(Math.max(Number(query.size) || 10, 1), 100);
    return { currentPage, size, direction, sortBy };
};
