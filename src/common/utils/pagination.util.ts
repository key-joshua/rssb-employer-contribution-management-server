export interface PaginationMeta {
  limit: number;
  totalItems: number;
  totalPages: number;
  currentPage: number;
  nextPage: number | null;
  previousPage: number | null;
}

export const formatPaginationMetaUtil = ( page: number = Number(process.env.PAGE_NUMBER) || 1, limit: number = Number(process.env.PAGE_SIZE) || 10, totalItems: number ): PaginationMeta => {
    const totalPages = Math.ceil(totalItems / limit) || 1;

    return {
        limit,
        totalItems,
        totalPages,
        currentPage: page,
        previousPage: page > 1 ? page - 1 : null,
        nextPage: page < totalPages ? page + 1 : null,
    };
};
