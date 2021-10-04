const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let team = [];

function createManager() {
  console.log("Create your team. Begin with your manager first:");
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the Manager's first name:",
        name: "name",
      },
      {
        type: "input",
        message: "Enter the Manager's id:",
        name: "id",
      },
      {
        type: "input",
        message: "Enter the Manager's email:",
        name: "email",
      },
      {
        type: "input",
        message: "Enter the Manager's Office number",
        name: "officeNumber",
      },
    ])
    .then((response) => {
      const manager = new Manager(
        response.name,
        response.id,
        response.email,
        response.number
      );
      team.push(manager);
      buildTeam();
    });
}

function buildTeam() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "memberOptions",
        message: "Please add a team member of your choice.",
        choices: ["Engineer", "Intern", "None"],
      },
    ])
    .then((userOption) => {
      switch (userOption.memberOptions) {
        case "Engineer":
          addEngineer();
          break;
        case "Intern":
          addIntern();
          break;
        default:
          renderTeam();
      }
    });
}
function addEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter your engineer's name?",
      },
      {
        type: "input",
        name: "id",
        message: "Enter your engineer's id?",
      },
      {
        type: "input",
        name: "email",
        message: "Enter your engineer's email?",
      },
      {
        type: "input",
        name: "github",
        message: "Enter your engineer's GitHub username?",
      },
    ])
    .then((response) => {
      const engineer = new Engineer(
        response.name,
        response.id,
        response.email,
        response.github
      );
      team.push(engineer);
      buildTeam();
    });
}

function addIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter your intern's name?",
      },
      {
        type: "input",
        name: "id",
        message: "Enter your intern's id?",
      },
      {
        type: "input",
        name: "email",
        message: "Enter your intern's email?",
      },
      {
        type: "input",
        name: "school",
        message: "Enter your intern's school?",
      },
    ])
    .then((response) => {
      const intern = new Intern(
        response.name,
        response.id,
        response.email,
        response.school
      );
      team.push(intern);
      buildTeam();
    });
}

function renderTeam() {
  fs.writeFileSync(outputPath, render(team), "utf-8");
}

createManager();