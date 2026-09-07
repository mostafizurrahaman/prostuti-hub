export type TMeta = {
   total: number;
   page: number;
   limit: number;
   totalPages: number;
};

export type TResponse<T> = {
   statusCode: number;
   message: string;
   meta?: TMeta;
   data: T;
   nextStep?: string;
};
