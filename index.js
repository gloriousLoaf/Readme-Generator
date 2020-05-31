// Required packages
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

// function to use in async / await structure
const writeFileAsync = util.promisify(fs.writeFile);

// Inquirer prompts to gather info to plug into .md template
function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "author",
            message: "Please enter the full name that you, the author, will use:"
        },
        {
            type: "input",
            name: "github",
            message: "Enter your GitHub Username:"
        },
        {
            type: "input",
            name: "description",
            message: "Enter a short description of your application:"
        },
        {
            type: "input",
            name: "install",
            message: "How is your appliction installed?"
        },
        {
            type: "input",
            name: "usage",
            message: "How is your application used?"
        },
        {
            type: "input",
            name: "license",
            message: `Would you like to add a license? Leave blank and press 
            enter to use default copyright law.`
        },
        {
            type: "input",
            name: "contributors",
            message: `Please list any additional contributors (Name, GitHub Username).
             Leave blank and press enter to credit only yourself.`
        },
        // What is Tests??
        {
            type: "input",
            name: "tests",
            message: "Any tests?"
        },
        // as part of generating this portion,
        // append .png to GitHub URL to get profile pic
        {
            type: "input",
            name: "questions",
            message: "What email address can users send questions to?"
        },
    ]);
}

// generateMD() will write the README with user inputs
function generateMD(answers) {
    return `
    This is where I will write the template for the README,
    using the inquirer answers to plug in custom user responses,`
}

// init() runs when user enters `node index` in their CLI
async function init() {
    console.log("Welcome to the README Generator!")
    try {
        const answers = await promptUser();

        const md = generateMD(answers);

        // CHANGE this to README.md, just using the 2 to not 
        // overwrite my repos readme everytime I test it
        await writeFileAsync("README2.md", md);

        // remove this, just testing in the CLI
        console.log(answers);
        console.log("Successfully created README.md");
    } catch (err) {
        console.log(err);
    }
}

init();