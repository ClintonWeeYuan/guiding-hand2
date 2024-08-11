import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type UserRole = "ADMIN" | "USER";

export interface Pgmigrations {
  id: Generated<number>;
  name: string;
  runOn: Timestamp;
}

export interface UserInformation {
  firstName: string | null;
  id: Generated<number>;
  lastName: string | null;
  userId: number | null;
}

export interface Users {
  email: string | null;
  id: Generated<number>;
  password: string | null;
  userRole: Generated<UserRole | null>;
}

export interface DB {
  pgmigrations: Pgmigrations;
  userInformation: UserInformation;
  users: Users;
}
