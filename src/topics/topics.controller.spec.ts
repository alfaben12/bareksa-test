import { PrismaService } from 'src/prisma/prisma.service';
import { RedisService } from 'src/redis/redis.service';
import { TopicsService } from 'src/topics/topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { TopicEntity } from './entities/topic.entity';
import { TopicsController } from './topics.controller';

describe('TopicsController', () => {
  let topicsController: TopicsController;
  let topicsService: TopicsService;
  let prismaService: PrismaService;
  let redisService: RedisService;

  beforeEach(() => {
    topicsService = new TopicsService(prismaService, redisService);
    topicsController = new TopicsController(topicsService);
  });

  describe('findAll', () => {
    it('should return an array of Topic', async () => {
      const result: TopicEntity[] = [
        {
          "id": 1,
          "title": "Investment",
          "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          "createdAt": new Date(),
          "updatedAt": null,
          "news": []
        }
      ];

      jest.spyOn(topicsService, 'findAll').mockImplementation(async () => result);

      expect(await topicsController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return an object of Topic', async () => {
      const id: string = "1"
      const result: TopicEntity =
      {
        "id": 1,
        "title": "Investment",
        "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        "createdAt": new Date(),
        "updatedAt": null,
        "news": []
      }

      jest.spyOn(topicsService, 'findOne').mockImplementation(async () => result);

      expect(await topicsController.findOne(id)).toBe(result);
    });
  });

  describe('create', () => {
    it('should return an object of Topic', async () => {
      const body: CreateTopicDto = {
        title: "Investment",
        body: "Lorem ipsum",
      }

      const result: TopicEntity =
      {
        "id": 1,
        "title": "Investment",
        "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        "createdAt": new Date(),
        "updatedAt": null,
      }

      jest.spyOn(topicsService, 'create').mockImplementation(async () => result);

      expect(await topicsController.create(body)).toBe(result);
    });
  });

  describe('update', () => {
    it('should return an object of Topic', async () => {
      const id: string = "1"
      const body: CreateTopicDto = {
        title: "Investment",
        body: "Lorem ipsum",
      }
      const result: TopicEntity =
      {
        "id": 1,
        "title": "Investment",
        "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        "createdAt": new Date(),
        "updatedAt": null,
      }

      jest.spyOn(topicsService, 'findOne').mockImplementation(async () => result);
      jest.spyOn(topicsService, 'update').mockImplementation(async () => result);

      expect(await topicsController.findOne(id)).toBe(result);
      expect(await topicsController.update(id, body)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should return an object of Topic', async () => {
      const id: string = "2"
      const result: TopicEntity =
      {
        "id": 1,
        "title": "Investment",
        "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        "createdAt": new Date(),
        "updatedAt": null,
      }

      jest.spyOn(topicsService, 'findOne').mockImplementation(async () => result);
      jest.spyOn(topicsService, 'remove').mockImplementation(async () => result);

      expect(await topicsController.findOne(id)).toBe(result);
      expect(await topicsController.remove(id)).toBe(result);
    });
  });
});