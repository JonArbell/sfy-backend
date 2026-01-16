export interface PageRequest {
  currentPage: number;      
  size: number;     
  sortBy?: string | undefined;
  direction : 'asc' | 'desc'
  q? : string | undefined
}

