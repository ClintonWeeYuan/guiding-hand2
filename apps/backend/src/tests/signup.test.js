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
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const usersService_1 = require("../service/usersService");
const db_1 = require("./fixtures/db");
let container;
let db;
(0, globals_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
    container = yield (0, db_1.initializeContainer)();
    db = yield (0, db_1.initializeDatabase)(container);
}), 20000);
(0, globals_1.afterEach)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db.destroy();
    yield container.stop();
}), 20000);
(0, globals_1.describe)('Signing up as a new user', () => {
    (0, globals_1.test)('works when pass in correct parameters', () => __awaiter(void 0, void 0, void 0, function* () {
        const userService = new usersService_1.UsersService(db);
        yield userService.create({
            email: '123@example.com',
            password: '123',
            userRole: 'ADMIN',
        });
        const checkUser = yield db
            .selectFrom('users')
            .selectAll()
            .executeTakeFirstOrThrow();
        (0, globals_1.expect)(checkUser).toBeDefined();
        (0, globals_1.expect)(checkUser.email).toBe('123@example.com');
        (0, globals_1.expect)(checkUser.userRole).toBe('ADMIN');
        (0, globals_1.expect)(checkUser.password).not.toBe('123');
    }));
    (0, globals_1.test)('throws an error when email already exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const userService = new usersService_1.UsersService(db);
        const duplicateUser = {
            email: '123@example.com',
            password: '123',
            userRole: 'ADMIN',
        };
        yield userService.create(duplicateUser);
        yield (0, globals_1.expect)(userService.create(duplicateUser)).rejects.toThrow();
    }));
});
