// Required packages
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

// function to use in async / await structure
const writeFileAsync = util.promisify(fs.writeFile);

// validator() repeats question if user leaves it blank
const validator = (val) => {
    if (val !== "") {
        return true;
    }
}

// Inquirer prompts to gather info to plug into .md template
function promptUser() {
    return inquirer.prompt([
        // first a few data points about the repo and author
        {
            type: `input`,
            name: `repo`,
            message: `Enter the name of your repo as it appears after
                 github.com/username/... :`,
            validate: validator
        },
        {
            type: `input`,
            name: `title`,
            message: `Enter a title (H1) to appear atop your README:`,
            validate: validator
        },
        {
            type: `input`,
            name: `tagline`,
            message: `Enter a one sentence tagline to go beneath H1:`,
            validate: validator
        },
        {
            type: `input`,
            name: `author`,
            message: `Enter the full name that you, the author, will use:`,
            validate: validator
        },
        {
            type: `input`,
            name: `github`,
            message: `Enter your GitHub Username (no @):`,
            validate: validator
        },
        // next, about the application. Markdown syntax (without Enter key!)
        {
            type: `input`,
            name: `description`,
            message: `Enter a description for your application 
            (Markdown syntax supported):`,
            validate: validator
        },
        {
            type: `input`,
            name: `install`,
            message: `How is your appliction installed?`,
            validate: validator
        },
        {
            type: `input`,
            name: `usage`,
            message: `How is your application used?`,
            validate: validator
        },
        // licensing, contributors, contact info
        {
            type: `input`,
            name: `license`,
            message: `Would you like to add a license? 
            Press enter to use default copyright law.`,
            default: `All rights reserved.`,
            validate: validator
        },
        {
            type: `input`,
            name: `contributors`,
            message: `List any additional contributors 
            (Name, @GitHubUsername). Press enter for default.`,
            default: `Just myself, the author.`,
            validate: validator
        },
        {
            type: `input`,
            name: `email`,
            message: `What email address can users send questions to?`,
            validate: validator
        },
    ]);
}

/* generateMD() will write the README with user inputs:
    Title, Tagline (ln 106)
    ![Github Badges] (ln 109)
    TOC (ln 113)
    Description, Installation, Usage (ln 122)
    License, Contributors, Contact (ln 137)
    GitHub profile pic (ln 150) */
function generateMD(answers) {
    return `
# ${answers.title}
${answers.tagline}

![GitHub language count](https://img.shields.io/github/languages/count/${answers.github}/${answers.repo})
![GitHub top language](https://img.shields.io/github/languages/top/${answers.github}/${answers.repo})

## Table of Contents
* [Description](#-description)
* [Installation](#-installation)
* [Usage](#-usage)
* [License](#-license)
* [Contributors](#-contributors)
* [Questions](#-questions)
<p>&nbsp;</p>

## Description
${answers.description}
<p>&nbsp;</p>

## Installation
${answers.install}
<p>&nbsp;</p>

## Usage
${answers.usage}
<p>&nbsp;</p>

---
<p>&nbsp;</p>

## License
${answers.license}
<p>&nbsp;</p>

## Contributors
${answers.contributors}
<p>&nbsp;</p>

## Questions?
  * **${answers.author}**
  * **GitHub:** [${answers.github}](https://github.com/${answers.github})
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
        await writeFileAsync("README2.md", md);

        console.log("Successfully created README.md");
    } catch (err) {
        console.log(err);
    }
}

// fire!
init();