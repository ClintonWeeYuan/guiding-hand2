"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = exports.initializeContainer = void 0;
const postgresql_1 = require("@testcontainers/postgresql");
const kysely_1 = require("kysely");
const node_pg_migrate_1 = __importDefault(require("node-pg-migrate"));
const pg_1 = require("pg");
const initializeContainer = () => __awaiter(void 0, void 0, void 0, function* () { return yield new postgresql_1.PostgreSqlContainer().start(); });
exports.initializeContainer = initializeContainer;
const initializeDatabase = (container) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, node_pg_migrate_1.default)({
        databaseUrl: container.getConnectionUri(),
        dir: './src/db/migrations',
        direction: 'up',
        migrationsTable: 'pgmigrations',
    });
    return new kysely_1.Kysely({
        dialect: new kysely_1.PostgresDialect({
            pool: new pg_1.Pool({
                connectionString: container.getConnectionUri(),
            }),
        }),
        plugins: [new kysely_1.CamelCasePlugin()],
    });
});
exports.initializeDatabase = initializeDatabase;
