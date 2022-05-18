"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
let RedisService = class RedisService {
    async set(key, data) {
        const isOpen = client.isOpen;
        if (!isOpen) {
            await client.connect();
        }
        await client.set(key, data);
        return true;
    }
    async get(key) {
        const isOpen = client.isOpen;
        if (!isOpen) {
            await client.connect();
        }
        const value = await client.get(key);
        return value;
    }
    async del(key) {
        const isOpen = client.isOpen;
        if (!isOpen) {
            await client.connect();
        }
        const value = await client.del(key);
        return value;
    }
};
RedisService = __decorate([
    (0, common_1.Injectable)()
], RedisService);
exports.RedisService = RedisService;
//# sourceMappingURL=redis.service.js.map