import rateLimit from "express-rate-limit";

export const getRateLimiter = (
   windowInMin: number,
   limit: number = 100,
   message: string = "Too many request.",
) => {
   return rateLimit({
      windowMs: windowInMin * 1000,
      limit,
      message,
   });
};
