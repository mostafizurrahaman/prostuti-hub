export const SortOrder = {
   ASC: "asc",
   DESC: "desc",
} as const;

export const sortOrderValues = Object.values(SortOrder);

export type TSortOrderType = (typeof SortOrder)[keyof typeof SortOrder];
