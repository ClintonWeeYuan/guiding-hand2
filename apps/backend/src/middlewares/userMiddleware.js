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
exports.authToken = void 0;
const security_1 = require("../utilities/security");
const authToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res
            .status(401)
            .json({ message: 'Access token is missing or invalid' });
    }
    try {
        const payload = yield (0, security_1.verifyToken)(token);
        res.locals.jwtDecoded = payload;
        next();
    }
    catch (err) {
        console.error('Token verification failed:', err);
        res.status(401).json({ message: 'Token is invalid or expired' });
    }
});
exports.authToken = authToken;
