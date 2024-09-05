import { IPaginationResponse } from "./types";

interface IPaginationCalc {
    count: number;
    take: number;
    skip: number;
  }

export function paginationCalc({
    count,
    take,
    skip,
  }: IPaginationCalc): IPaginationResponse{
    const maxPages = Math.ceil(count / Number(take)) || 1;
    const currentPage = Math.floor(Number(skip) / Number(take)) + 1 || 1;
    const hasNextPage = currentPage < maxPages || false;
  
    return {
      maxPages,
      currentPage,
      hasNextPage,
    };
  }
  