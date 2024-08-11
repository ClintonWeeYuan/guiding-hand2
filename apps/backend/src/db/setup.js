"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupDb = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const kysely_1 = require("kysely");
const pg_1 = require("pg");
dotenv_1.default.config({ override: true });
if (!process.env.DATABASE_URL) {
    throw new Error(`Database credentials error`);
}
const setupDb = () => {
    if (process.env.DATABASE_URL) {
        return new kysely_1.Kysely({
            dialect: new kysely_1.PostgresDialect({
                pool: new pg_1.Pool({
                    connectionString: process.env.DATABASE_URL,
                }),
            }),
            plugins: [new kysely_1.CamelCasePlugin()],
        });
    }
    else {
        throw new Error('Invalid database url');
    }
};
exports.setupDb = setupDb;
