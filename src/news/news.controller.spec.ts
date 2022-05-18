import { PrismaService } from 'src/prisma/prisma.service';
import { RedisService } from 'src/redis/redis.service';
import { TopicsService } from 'src/topics/topics.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { NewsEntity } from './entities/news.entity';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

describe('newsController', () => {
  let newsController: NewsController;
  let newsService: NewsService;
  let topicsService: TopicsService;
  let prismaService: PrismaService;
  let redisService: RedisService;

  beforeEach(() => {
    newsService = new NewsService(prismaService, redisService);
    topicsService = new TopicsService(prismaService, redisService);
    newsController = new NewsController(newsService, topicsService);
  });

  describe('findAll', () => {
    it('should return an array of News', async () => {
      const result: NewsEntity[] =
        [
          {
            id: 1,
            topicId: 2,
            title: "a",
            body: "b",
            image: "c",
            tags: [
              "investment",
              "reksa dana"
            ],
            status: "draft",
            createdAt: new Date(),
            updatedAt: new Date(),
            topic: {
              id: 1,
              title: "Investment",
              body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
              createdAt: new Date(),
              updatedAt: null,
            }
          }
        ]

      jest.spyOn(newsService, 'findAll').mockImplementation(async () => result);

      expect(await newsController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return an object of News', async () => {
      const id: string = "1"
      const result: NewsEntity =
      {
        id: 1,
        topicId: 2,
        title: "a",
        body: "b",
        image: "c",
        tags: [
          "investment",
          "reksa dana"
        ],
        status: "draft",
        createdAt: new Date(),
        updatedAt: new Date(),
        topic: {
          id: 1,
          title: "Investment",
          body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          createdAt: new Date(),
          updatedAt: null,
        }
      }

      jest.spyOn(newsService, 'findOne').mockImplementation(async () => result);

      expect(await newsController.findOne(id)).toBe(result);
    });
  });

  describe('create', () => {
    it('should return an object of News', async () => {
      const body: CreateNewsDto = {
        topicId: "1",
        title: "Cara investasi",
        body: "Lorem ipsum",
        image: "https://images.bareksa.com/bareksa/img/sliders/bareksa-home-slider-317.jpg",
        tags: ["invest", "robo"],
        status: "deleted"
      }

      const result: NewsEntity =
      {
        id: 1,
        topicId: 2,
        title: "a",
        body: "b",
        image: "c",
        tags: [
          "investment",
          "reksa dana"
        ],
        status: "draft",
        createdAt: new Date(),
        updatedAt: new Date(),
        topic: {
          id: 1,
          title: "Investment",
          body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          createdAt: new Date(),
          updatedAt: null,
        }
      }

      jest.spyOn(newsService, 'create').mockImplementation(async () => result);

      expect(await newsController.create(body)).toBe(result);
    });
  });

  describe('update', () => {
    it('should return an object of Topic', async () => {
      const id: string = "1"
      const body: CreateNewsDto = {
        topicId: "1",
        title: "Cara investasi",
        body: "Lorem ipsum",
        image: "https://images.bareksa.com/bareksa/img/sliders/bareksa-home-slider-317.jpg",
        tags: ["invest", "robo"],
        status: "deleted"
      }

      const result: NewsEntity =
      {
        id: 1,
        topicId: 2,
        title: "a",
        body: "b",
        image: "c",
        tags: [
          "investment",
          "reksa dana"
        ],
        status: "draft",
        createdAt: new Date(),
        updatedAt: new Date(),
        topic: {
          id: 1,
          title: "Investment",
          body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          createdAt: new Date(),
          updatedAt: null,
        }
      }

      jest.spyOn(newsService, 'findOne').mockImplementation(async () => result);
      jest.spyOn(newsService, 'update').mockImplementation(async () => result);

      expect(await newsController.findOne(id)).toBe(result);
      expect(await newsController.update(id, body)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should return an object of Topic', async () => {
      const id: string = "2"
      const result: NewsEntity =
      {
        id: 1,
        topicId: 2,
        title: "a",
        body: "b",
        image: "c",
        tags: [
          "investment",
          "reksa dana"
        ],
        status: "draft",
        createdAt: new Date(),
        updatedAt: new Date(),
        topic: {
          id: 1,
          title: "Investment",
          body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          createdAt: new Date(),
          updatedAt: null,
        }
      }

      jest.spyOn(newsService, 'findOne').mockImplementation(async () => result);
      jest.spyOn(newsService, 'remove').mockImplementation(async () => result);

      expect(await newsController.findOne(id)).toBe(result);
      expect(await newsController.remove(id)).toBe(result);
    });
  });
});