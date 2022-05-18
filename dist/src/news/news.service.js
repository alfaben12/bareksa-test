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
exports.NewsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const topic_entity_1 = require("../topics/entities/topic.entity");
let NewsService = class NewsService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    create(createNewsDto) {
        return this.prismaService.news.create({
            data: {
                topicId: +createNewsDto.topicId,
                title: createNewsDto.title,
                body: createNewsDto.body,
                image: createNewsDto.image,
                tags: createNewsDto.tags,
                status: createNewsDto.status,
            }
        });
    }
    findAll() {
        return this.prismaService.news.findMany({
            include: {
                topic: true
            }
        });
    }
    findOne(id) {
        return this.prismaService.news.findUnique({
            where: {
                id
            },
            include: {
                topic: true
            }
        });
    }
    update(id, updateNewsDto) {
        return this.prismaService.news.update({
            where: {
                id
            },
            data: {
                topicId: +updateNewsDto.topicId,
                title: updateNewsDto.title,
                body: updateNewsDto.body,
                image: updateNewsDto.image,
                tags: updateNewsDto.tags,
                status: updateNewsDto.status,
            }
        });
    }
    remove(id) {
        return this.prismaService.news.delete({
            where: {
                id
            },
        });
    }
};
NewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NewsService);
exports.NewsService = NewsService;
//# sourceMappingURL=news.service.js.map