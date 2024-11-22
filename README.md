# Mailing System

This project is a mailing system that leverages email templates and automates bulk email sending. It is ideal for event invitations or marketing promotions.

## Setup

1. Create an app password for your Google account. Go to your Google account settings, search for "app password," and create a new password with a name. Copy the 16-letter password and paste it into the `emailSender.js` file without spaces.
2. In the `emailSender.js` file, update the `sender` variable with your Gmail address.
3. Create a JSON file for your recipients' data. For example, `invitationData.json` or `promotionData.json`. The file should contain an array of objects with the recipient's email address and other relevant information.

## Usage

1. Run the command `node src/index.js` to start the mailing system.
2. The system will prompt you to choose a template type (invitation or promotion).
3. Based on your selection, the system will load the corresponding template and data file.
4. The system will generate emails for each recipient and save them to a file in the `generated` directory.
5. The system will then send the emails using Nodemailer.

## Email Templates

The email templates are located in the `templates` directory. You can modify the templates to suit your needs.

* `invitationEmail.html`: Template for invitation emails.
* `promotionEmail.html`: Template for promotion emails.

## Data Files

The data files are located in the `data` directory. You can modify the data files to add or remove recipients.

* `invitationData.json`: Data file for invitation recipients.
* `promotionData.json`: Data file for promotion recipients.

## Generated Emails

The generated emails are saved to the `generated` directory. You can find the emails in the following directories:

* `generated/invitationReceipents.json`: Generated invitation emails.
* `generated/promotionReceipents.json`: Generated promotion emails.

## Troubleshooting

If you encounter any issues, check the console logs for error messages. You can also modify the `emailSender.js` file to add additional logging or debugging statements.

## Contributing

If you want to contribute to this project, please fork the repository and submit a pull request with your changes. Make sure to include a detailed description of your changes and any relevant documentation.
