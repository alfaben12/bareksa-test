"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicsModule = void 0;
const common_1 = require("@nestjs/common");
const topics_service_1 = require("./topics.service");
const topics_controller_1 = require("./topics.controller");
const news_service_1 = require("../news/news.service");
let TopicsModule = class TopicsModule {
};
TopicsModule = __decorate([
    (0, common_1.Module)({
        controllers: [topics_controller_1.TopicsController],
        providers: [topics_service_1.TopicsService],
        exports: [topics_service_1.TopicsService]
    })
], TopicsModule);
exports.TopicsModule = TopicsModule;
//# sourceMappingURL=topics.module.js.map