"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UsersController = void 0;
const tsoa_1 = require("tsoa");
const userMiddleware_1 = require("../middlewares/userMiddleware");
const usersService_1 = require("../service/usersService");
const usersService = new usersService_1.UsersService();
let UsersController = class UsersController extends tsoa_1.Controller {
    getUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const payload = (_a = req.res) === null || _a === void 0 ? void 0 : _a.locals.jwtDecoded;
            const id = payload.userId;
            return usersService.getById(id);
        });
    }
    createUser(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            return usersService.create(requestBody);
        });
    }
    loginUser(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            return usersService.login(requestBody);
        });
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, tsoa_1.Get)(''),
    (0, tsoa_1.Middlewares)(userMiddleware_1.authToken),
    __param(0, (0, tsoa_1.Request)())
], UsersController.prototype, "getUser", null);
__decorate([
    (0, tsoa_1.Post)(''),
    __param(0, (0, tsoa_1.Body)())
], UsersController.prototype, "createUser", null);
__decorate([
    (0, tsoa_1.Post)('login'),
    __param(0, (0, tsoa_1.Body)())
], UsersController.prototype, "loginUser", null);
exports.UsersController = UsersController = __decorate([
    (0, tsoa_1.Route)('users')
], UsersController);
