// Script to check all projects in the database
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // Get all projects, regardless of published status
    const allProjects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    console.log('All Projects:');
    console.log(JSON.stringify(allProjects, null, 2));
    console.log(`Total Projects: ${allProjects.length}`);
    
    // Get only published projects
    const publishedProjects = await prisma.project.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
    
    console.log('\nPublished Projects:');
    console.log(JSON.stringify(publishedProjects, null, 2));
    console.log(`Total Published Projects: ${publishedProjects.length}`);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 