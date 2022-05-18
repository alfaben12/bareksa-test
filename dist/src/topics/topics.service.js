"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const redis_service_1 = require("../redis/redis.service");
const redisKeyPrefix = "topic";
let TopicsService = class TopicsService {
    constructor(prismaService, redisService) {
        this.prismaService = prismaService;
        this.redisService = redisService;
    }
    async create(createTopicDto) {
        const redisKey = `${redisKeyPrefix}:all`;
        const cache = await this.redisService.get(redisKey);
        if (cache) {
            await this.redisService.del(redisKey);
        }
        return this.prismaService.topic.create({
            data: createTopicDto
        });
    }
    async findAll() {
        const redisKey = `${redisKeyPrefix}:all`;
        const cache = await this.redisService.get(redisKey);
        if (cache) {
            return JSON.parse(cache);
        }
        const results = await this.prismaService.topic.findMany({
            include: {
                news: true
            }
        });
        await this.redisService.set(redisKey, JSON.stringify(results));
        return results;
    }
    async findOne(id) {
        const redisKey = `${redisKeyPrefix}:${id}`;
        const cache = await this.redisService.get(redisKey);
        if (cache) {
            return JSON.parse(cache);
        }
        const result = await this.prismaService.topic.findUnique({
            where: {
                id
            },
            include: {
                news: true
            }
        });
        await this.redisService.set(redisKey, JSON.stringify(result));
        return result;
    }
    async update(id, updateTopicDto) {
        const redisKey = `${redisKeyPrefix}:all`;
        const cache = await this.redisService.get(redisKey);
        if (cache) {
            await this.redisService.del(redisKey);
        }
        return this.prismaService.topic.update({
            where: {
                id
            },
            data: updateTopicDto
        });
    }
    async remove(id) {
        const redisKey = `${redisKeyPrefix}:${id}`;
        const cache = await this.redisService.get(redisKey);
        if (cache) {
            await this.redisService.del(redisKey);
        }
        return this.prismaService.topic.delete({
            where: {
                id
            },
        });
    }
};
TopicsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService])
], TopicsService);
exports.TopicsService = TopicsService;
//# sourceMappingURL=topics.service.js.map