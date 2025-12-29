export const FIRST_NAME = {
  REQUIRED: "First name is required",
  MIN: "First name must be at least 3 characters",
  MAX: "First name must be at most 30 characters",
  INVALID: "Invalid first name format",
};

export const LAST_NAME = {
  REQUIRED: "Last name is required",
  MIN: "Last name must be at least 3 characters",
  MAX: "Last name must be at most 30 characters",
  INVALID: "Invalid last name format",
};

export const GENDER = {
  REQUIRED: "Gender is required",
  INVALID: "Gender must be one of the predefined values",
};

export const BIRTH_DATE = {
  REQUIRED: "Birth date is required",
  INVALID: "Invalid birth date",
};

export const EMAIL = {
  REQUIRED: "Email is required",
  INVALID: "Please enter a valid email address",
};

export const PASSWORD = {
  REQUIRED: "Password is required",
  INVALID:
    "Password must be 8-64 characters with uppercase, lowercase, number, and symbol",
};

export const CONFIRM_PASSWORD = {
  INVALID: "Passwords do not match",
};

export const ROLE = {
  REQUIRED: "Role is required",
  INVALID: "Role must be one of the predefined values",
};

export const PHONE = {
  INVALID: "Please enter a valid phone number",
};

export const ADDRESS = {
  MIN: "Address must be at least 5 characters",
  MAX: "Address must be at most 200 characters",
};

export const FRIEND_REQUEST = {
  SENT: "Friend request sent successfully",
  ACCEPTED: "Friend request accepted successfully",
  REJECTED: "Friend request rejected successfully",
  NOT_FOUND: "Friend request not found",
  ALREADY_SENT: "Friend request already sent to this user",
  ALREADY_FRIENDS: "You are already friends",
  REVERSE_EXISTS:
    "This user has already sent you a friend request. Please accept it instead",
  ALREADY_PROCESSED: "Friend request already processed",
  UNAUTHORIZED: "You are not authorized to accept this request",
  CANNOT_SEND_TO_SELF: "You cannot send friend request to yourself",
} as const;

export const PROFILE = {
  RETRIEVED: "Profile retrieved successfully",
  NOT_FOUND: "Profile not found",
} as const;
