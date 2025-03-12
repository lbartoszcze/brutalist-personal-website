// Script to test the /api/projects endpoint
const fetch = require('node-fetch');

async function main() {
  try {
    // Make a request to the projects API
    const response = await fetch('http://localhost:3000/api/projects');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const projects = await response.json();
    
    console.log('API Response:');
    console.log(JSON.stringify(projects, null, 2));
    console.log(`Total Projects from API: ${projects.length}`);
    
  } catch (error) {
    console.error('Error fetching from API:', error);
  }
}

main(); 