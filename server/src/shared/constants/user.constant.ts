import { RoleEnum, GenderEnum } from "../enums/user.enum";

export const NAME = {
  MIN_LENGTH: 3,
  MAX_LENGTH: 30,
  REGEX: /^[A-Za-z]+([ '-][A-Za-z]+)*$/,
};

export const GENDERS = {
  MALE: GenderEnum.MALE,
  FEMALE: GenderEnum.FEMALE,
};

export const BIRTH_DATE = {
  VALIDATOR: (value: Date) => value < new Date(),
};

export const EMAIL = {
  MIN_LENGTH: 6,
  MAX_LENGTH: 254,
  REGEX: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
};

export const PASSWORD = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 64,
  REGEX:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/,
};

export const ROLES = {
  USER: RoleEnum.USER,
  ADMIN: RoleEnum.ADMIN,
  MODERATOR: RoleEnum.MODERATOR,
};

export const PHONE = {
  REGEX: /^\+[1-9]\d{9,14}$/,
};

export const ADDRESS = {
  MIN_LENGTH: 5,
  MAX_LENGTH: 200,
};

export const PROFILE_PICTURE = {
  MAX_LENGTH: 500,
};

export const PROFILE_PICTURE_PUBLIC_ID = {
  MAX_LENGTH: 500,
};

export const FRIEND_REQUEST = {
  STATUS: {
    PENDING: "PENDING",
    ACCEPTED: "ACCEPTED",
    REJECTED: "REJECTED",
  },
} as const;
