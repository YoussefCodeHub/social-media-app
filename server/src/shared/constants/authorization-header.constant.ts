const AUTHORIZATION_HEADER = {
  MIN_SIZE: 40,
  MAX_SIZE: 2000,
  REGEX:
    /^[A-Za-z][A-Za-z0-9-_]* [A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/,
};

export default AUTHORIZATION_HEADER;
