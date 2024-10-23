import fs from 'fs/promises';
import path from 'path';

// Ensure the directory exists or create it
export async function ensureDirectoryExists(directory) {
  try {
    await fs.mkdir(directory, { recursive: true });
  } catch (error) {
    console.error(`Error ensuring directory: ${directory}`, error);
  }
}

export async function saveEmailToFile(content, recipientEmail, templateType) {
  let directory;

  if (templateType === "promotion") {
   directory = './generated/promotionReceipents.json';
  } else if (templateType === "invitation") {
   directory = './generated/invitationReceipents.json';
  }

  await ensureDirectoryExists(directory);

  const filePath = path.join(directory, `${recipientEmail}.html`);
  try {
    await fs.writeFile(filePath, content, 'utf8');
  } catch (error) {
    console.error('Error saving the email:', error);
  }
}

