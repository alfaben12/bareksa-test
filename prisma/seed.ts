import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const topics = ["Investment"]
  for (let i = 0; i < topics.length; i++) {
    const topic = topics[i];
    const createdTopic = await prisma.topic.create({
      data: {
        title: topic,
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const news = ["How to start investment", "Safe investment"]
    for (let j = 0; j < news.length; j++) {
      await prisma.news.create({
        data: {
          topicId: createdTopic.id,
          image: "https://images.bareksa.com/bareksa/img/sliders/bareksa-home-slider-317.jpg",
          tags: ["investment"],
          title: news[i],
          body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
