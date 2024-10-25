const USER_COLLECTION_NAME = "user";

const USER_SEARCHABLE_FIELD: Array<string> = ["userName", "fullName", "email"];

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1583195763986-0231686dcd43?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1hbiUyMHBvcnRyYWl0fGVufDB8fDB8fHww";

const GENDER_TYPES = {
  MALE: "male",
  FEMALE: "female",
} as const;

const USER_AVATAR_SIZE = {
  WIDTH: 400,
  HEIGHT: 400,
} as const;

export const UserConstant = {
  USER_COLLECTION_NAME,
  USER_SEARCHABLE_FIELD,
  DEFAULT_AVATAR,
  GENDER_TYPES,
  USER_AVATAR_SIZE,
};
