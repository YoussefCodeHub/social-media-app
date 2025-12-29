export const CONTENT = {
  MIN_LENGTH: 2,
  MAX_LENGTH: 50000,
} as const;

export const ATTACHMENTS = {
  MAX_LENGTH: 10,
} as const;

export const TAGS = {
  MAX_LENGTH: 10,
  TRANSFORM: (val: string) => (val ? val.split(",").map((t) => t.trim()) : []),
} as const;
