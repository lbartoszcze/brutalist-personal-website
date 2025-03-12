const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Delete existing records
  await prisma.blogPost.deleteMany();

  // Create sample blog posts
  const posts = [
    {
      title: 'The Future of Decentralized Systems',
      slug: 'future-of-decentralized-systems',
      content: 'Full content here...',
      excerpt: 'Exploring how decentralized architectures are reshaping digital infrastructure and creating new possibilities for autonomous systems.',
      tags: ['BLOCKCHAIN', 'AUTONOMY'],
      published: true
    },
    {
      title: 'Cognitive Models in Programming',
      slug: 'cognitive-models-programming',
      content: 'Full content here...',
      excerpt: 'How our mental models influence code structure and what this means for the future of programming languages and tools.',
      tags: ['COGNITION', 'PROGRAMMING'],
      published: true
    }
  ];

  for (const post of posts) {
    await prisma.blogPost.create({
      data: post
    });
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