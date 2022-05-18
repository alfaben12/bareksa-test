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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsController = void 0;
const common_1 = require("@nestjs/common");
const news_service_1 = require("./news.service");
const create_news_dto_1 = require("./dto/create-news.dto");
const update_news_dto_1 = require("./dto/update-news.dto");
const topics_service_1 = require("../topics/topics.service");
const client_1 = require("@prisma/client");
let NewsController = class NewsController {
    constructor(newsService, topicsService) {
        this.newsService = newsService;
        this.topicsService = topicsService;
    }
    async create(createNewsDto) {
        const validationTopic = await this.topicsService.findOne(+createNewsDto.topicId);
        if (!validationTopic) {
            return new common_1.HttpException("Topic not available", common_1.HttpStatus.NOT_FOUND);
        }
        if (![client_1.NewsStatus.deleted, client_1.NewsStatus.draft, client_1.NewsStatus.publish].includes(createNewsDto.status)) {
            return new common_1.HttpException("Invalid Status", common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.newsService.create(createNewsDto);
    }
    findAll() {
        return this.newsService.findAll();
    }
    async findOne(id) {
        const result = await this.newsService.findOne(+id);
        if (!result) {
            return new common_1.HttpException("News not available", common_1.HttpStatus.NOT_FOUND);
        }
        return result;
    }
    async update(id, updateNewsDto) {
        const result = await this.newsService.findOne(+id);
        if (!result) {
            return new common_1.HttpException("News not available", common_1.HttpStatus.NOT_FOUND);
        }
        return this.newsService.update(+id, updateNewsDto);
    }
    async remove(id) {
        const result = await this.newsService.findOne(+id);
        if (!result) {
            return new common_1.HttpException("News not available", common_1.HttpStatus.NOT_FOUND);
        }
        return this.newsService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_news_dto_1.CreateNewsDto]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NewsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_news_dto_1.UpdateNewsDto]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "remove", null);
NewsController = __decorate([
    (0, common_1.Controller)({ path: 'news', version: '1' }),
    __metadata("design:paramtypes", [news_service_1.NewsService, topics_service_1.TopicsService])
], NewsController);
exports.NewsController = NewsController;
//# sourceMappingURL=news.controller.js.map