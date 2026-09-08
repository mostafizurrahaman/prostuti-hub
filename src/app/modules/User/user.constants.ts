// ?? Constants
export const userSearchableFields = ["name"] as const;
export const userSortableFields = ["createdAt", "updatedAt"] as const;

export const UserRoles = {
   ADMIN: "admin",
   SUPER_ADMIN: "super_admin",
} as const;

export const UserStatus = {
   PENDING: "pending",
   ACTIVE: "active",
   BLOCKED: "blocked",
   DELETED: "deleted",
} as const;

// ?? Export values :
export const userRoleValues = Object.values(UserRoles);
export const userStatusValues = Object.values(UserStatus);

// ?? Types:
export type TUserSearchableField = (typeof userSearchableFields)[number];
export type TUserSortableField = (typeof userSortableFields)[number];
export type TUserRole = (typeof UserRoles)[keyof typeof UserRoles];
export type TUserStatus = (typeof UserStatus)[keyof typeof UserStatus];
