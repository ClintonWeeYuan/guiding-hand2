"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const setup_1 = require("../db/setup");
dotenv_1.default.config({ override: true });
class BaseService {
    constructor(db) {
        if (db !== undefined) {
            this.db = db;
        }
        else {
            this.db = (0, setup_1.setupDb)();
        }
    }
}
exports.BaseService = BaseService;
