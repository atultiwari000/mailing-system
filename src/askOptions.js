import inquirer from 'inquirer';

export const askOptions = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'templateType',
            message: 'Which template would you like to use?',
            choices: ['invitation', 'promotion'],
        }
    ]);
    return answers.templateType;
};
