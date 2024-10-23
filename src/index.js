import Bottleneck from 'bottleneck';
import { loadTemplate, generateEmail } from './emailGenerator.js';
import { saveEmailToFile } from './fileSaver.js';
import { sendEmail } from './emailSender.js';
import { parseJSON } from './dataParser.js';  // Assuming you have a parser for JSON or CSV
import { askOptions } from './askOptions.js';

const processEmails = async () => {
  
  const templateType = await askOptions();
  
  let dataFile;

    // Determine which data file to use based on the selected template type
    if (templateType === 'invitation') {
        dataFile = './data/invitationData.json';
    } else if (templateType === 'promotion') {
        dataFile = './data/promotionData.json';
    } else {
        return;
  }
  
  // Parse the corresponding data file
  const recipients = await parseJSON(dataFile);
  
  const templateData = await loadTemplate(templateType);

  // Create a limiter with 3 emails per second
const limiter = new Bottleneck({
  minTime: 333, // Waits at least 333ms between each email (3 emails/sec)
  maxConcurrent: 1, // Some request may take more than 333ms so we have to limit the no. of request running at the same time
});
  
  // Wrap your sendEmail function using the limiter
const sendLimitedEmail = limiter.wrap(sendEmail);

  for (const recipient of recipients) {
    // Assuming emailContent is generated as a string in generateEmail()
    const { subject, emailContent } = generateEmail(templateData, recipient, templateType);

    // Save generated email to file
    await saveEmailToFile(emailContent, recipient.email, templateType);    
    
    // Send email using Nodemailer
    if (recipient.email) {
      await sendLimitedEmail(recipient.email, subject, emailContent);
    } else {
      console.error(`No email address found for ${recipient.name}`);
    }
  }
};

processEmails();