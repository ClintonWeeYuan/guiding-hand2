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
exports.createToken = createToken;
exports.verifyToken = verifyToken;
const jose_1 = require("jose");
const secretKey = process.env.JWT_SECRET_KEY;
const key = new TextEncoder().encode(secretKey);
function createToken(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield new jose_1.SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('1h')
            .sign(key);
        return token;
    });
}
function isPayload(payload) {
    return (typeof payload.userId === 'number' &&
        typeof payload.firstName === 'string' &&
        typeof payload.lastName === 'string' &&
        typeof payload.iat === 'number' &&
        typeof payload.exp === 'number');
}
function verifyToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const { payload } = yield (0, jose_1.jwtVerify)(token, key);
        if (isPayload(payload)) {
            return payload;
        }
        else {
            throw new Error('Invalid token payload');
        }
    });
}
