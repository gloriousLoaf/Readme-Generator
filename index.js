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
            name: "repo",
            message: "Please enter the name of your repo:"
        },
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
            message: "Enter a description for your application:"
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
        // as part of generating Questions portion of readme,
        // append .png to GitHub URL to get profile pic
        {
            type: "input",
            name: "email",
            message: "What email address can users send questions to?"
        },
    ]);
}

// generateMD() will write the README with user inputs
function generateMD(answers) {
    return `
# ${answers.repo}
<p>&nbsp;</p>

## Table of Contents
* Description
* Installation
* Usage
* License
* Contributors
* Questions
<p>&nbsp;</p>

## Description:
${answers.description}
<p>&nbsp;</p>

## Installation:
${answers.install}
<p>&nbsp;</p>

## Usage:
${answers.usage}
<p>&nbsp;</p>

---
<p>&nbsp;</p>

## License: ${answers.license}
<p>&nbsp;</p>

## Contributors: ${answers.contributors}
<p>&nbsp;</p>

## Questions:
  * **${answers.author}**
  * GitHub: [${answers.github}](https://github.com/${answers.github})
  * <${answers.email}>

<img src="https://github.com/${answers.github}.png" alt="GitHub Profile Pic" width="125" height="125">
<p>&nbsp;</p>

---

##### This markdown was created with [Readme Generator](https://github.com/gloriousLoaf/Readme-Generator)
`
}

// init() runs when user enters `node index` in their CLI
async function init() {
    console.log("Welcome to the README Generator!")
    try {
        const answers = await promptUser();

        const md = generateMD(answers);

        // CHANGE this to README.md, just using the 2 to not 
        // overwrite my repo's readme everytime I test it
        await writeFileAsync("README.md", md);

        // remove this, just testing in the CLI
        console.log(answers);
        console.log("Successfully created README.md");
    } catch (err) {
        console.log(err);
    }
}

init();