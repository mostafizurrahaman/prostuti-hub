export const userSearchableFields = ["name"] as const;

export const userSortableFields = ["createdAt", "updatedAt"] as const;

export type TUserSearchableField = (typeof userSearchableFields)[number];

export type TUserSortableField = (typeof userSortableFields)[number];
