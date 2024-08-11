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
exports.UsersService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const passwords_1 = require("../utilities/passwords");
const security_1 = require("../utilities/security");
const baseService_1 = require("./baseService");
const SALT_ROUNDS = 10;
class UsersService extends baseService_1.BaseService {
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.db
                    .selectFrom('userInformation')
                    .selectAll('userInformation')
                    .where('userId', '=', id)
                    .executeTakeFirstOrThrow();
            }
            catch (e) {
                console.log(e);
                throw Error('Something went wrong');
            }
        });
    }
    create(userCreationParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, userRole, password, email } = userCreationParams;
            const hashedPassword = yield bcrypt_1.default.hash(password, SALT_ROUNDS);
            try {
                const newUser = yield this.db
                    .insertInto('users')
                    .values({ userRole: userRole, email: email, password: hashedPassword })
                    .returning(['users.id'])
                    .executeTakeFirstOrThrow();
                yield this.db
                    .insertInto('userInformation')
                    .values({
                    userId: newUser.id,
                    firstName: firstName || '',
                    lastName: lastName || '',
                })
                    .execute();
                return newUser.id;
            }
            catch (error) {
                console.log(error);
                throw Error('Something went wrong when trying to create a new user');
            }
        });
    }
    login(userLoginParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = userLoginParams;
            try {
                const userLogin = yield this.db
                    .selectFrom('users')
                    .selectAll()
                    .where('email', '=', email)
                    .executeTakeFirstOrThrow();
                if (!userLogin.password) {
                    throw Error('Invalid user/email combination');
                }
                const { id, password: hashedPassword } = userLogin;
                const isValid = yield (0, passwords_1.validatePassword)(password.toString(), hashedPassword);
                if (!isValid) {
                    throw Error('Invalid user/email combination');
                }
                const currentUser = yield this.db
                    .selectFrom('users')
                    .innerJoin('userInformation', 'users.id', 'userInformation.userId')
                    .selectAll()
                    .where('users.id', '=', id)
                    .executeTakeFirstOrThrow();
                if (!currentUser.userId) {
                    throw Error('User does not exist');
                }
                const payload = {
                    userId: currentUser.userId,
                    firstName: currentUser.firstName,
                    lastName: currentUser.lastName,
                };
                const token = yield (0, security_1.createToken)(payload);
                return Object.assign(Object.assign({}, currentUser), { token });
            }
            catch (e) {
                throw Error(`Something went wrong when trying to search for user: ${e}`);
            }
        });
    }
}
exports.UsersService = UsersService;
