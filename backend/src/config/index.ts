export const PORT = process.env.PORT || 5000;
export const DB_URL =
  process.env.DB_URL || "postgres://postgres:postgres@localhost:5432/postgres";

export const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

export const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;
export const RESET_PASSWORD_SECRET =
  process.env.RESET_PASSWORD_SECRET ?? "secret";
