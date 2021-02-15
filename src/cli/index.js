const { createGraph } = require("../graphs");
const { questions } = require("./prompts");
const { bundle } = require("../bundler");
const inquirer = require("inquirer");
const boxen = require("boxen");
const path = require("path");
const fs = require("fs");

console.log(
  boxen("📦 Pinata CLI", {
    padding: 1,
    borderColor: "green",
    borderStyle: "round",
  })
);

inquirer
  .prompt(questions)
  .then((ans) => {
    const relativePath = path.join(ans.dir, ans.entry);
    const graph = createGraph(relativePath);
    const result = bundle(graph);

    fs.writeFile(ans.filename, result, (err) => {
      if (err) return console.error(err);
      console.log(`Saved to ${ans.filename} successfully.`);
    });
  })
  .catch((err) => {
    if (err.isTtyError) {
      console.log("The CLI cannot run in this environment. We are sorry :(");
    }
  });
