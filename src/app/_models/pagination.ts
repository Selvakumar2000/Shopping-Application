export interface Pagination{
    //as same as pagination header response
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

export class PaginatedResult<T>
{
    result: T;
    pagination: Pagination
}