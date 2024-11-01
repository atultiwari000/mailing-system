import fs from 'fs/promises';

export async function loadTemplate(templateName) {
  const templates = {
    invitation: './templates/invitationEmail.html',
    promotion: './templates/promotionEmail.html',
  };

  try {
    const templateContent = await fs.readFile(templates[templateName], 'utf8');
    
    // Extract the subject (look for the 'Subject:' line in the comment)
    const subjectMatch = templateContent.match(/<!-- Subject:\s*(.+)\s*-->/);
    let subject = subjectMatch ? subjectMatch[1] : 'Exclusive Discount Offer Just for You!';

    // Return both subject and body content
    return { subject, templateContent };
    
  } catch (error) {
    console.error(`Failed to load template: ${templateName}`, error);
  }
}

// template engine to dynamically replace placeholders in the template
function applyTemplate(template, data) {
  return template.replace(/{{(.*?)}}/g, (_, key) => {
    return data[key.trim()] || ''; // if value not found return empty
  });
}

export function generateEmail(template, recipientData) {
  const emailContent = applyTemplate(template.templateContent, recipientData);
  const subject = applyTemplate(template.subject, recipientData);
  
  return { subject, emailContent };
}

