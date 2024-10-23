import fs from 'fs/promises';

// Function to parse JSON
export async function parseJSON(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error parsing JSON file:', error);
  }
};

