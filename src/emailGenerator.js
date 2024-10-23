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

export function generateEmail(template, recipientData, templateName) {
  let emailContent = template.templateContent
    .replace('{{name}}', recipientData.name);
    
    if (templateName === "promotion") {
      emailContent = emailContent
      .replace('{{promo_link}}', recipientData.promo_link || '')
      .replace('{{discount_percentage}}', recipientData.discount_percentage)
      .replace('{{unsubscribe_link}}', recipientData.unsubscribe_link || '')
      .replace('{{time_limit}}', recipientData.time_limit || '');
  } else if (templateName === "invitation") {
      emailContent = emailContent
        .replace('{{name}}', recipientData.name || '')
      .replace('{{content}}', recipientData.content || '')
        .replace('{{rsvp_link}}', recipientData.rsvp_link || '')
    .replace('{{unsubscribe_link}}', recipientData.unsubscribe_link || '');
      
  }

  // Ensure the subject is processed correctly
  let subject = template.subject.replace('{{name}}', recipientData.name);

  return { subject, emailContent };
}

