const questions = [
  {
    type: "input",
    name: "dir",
    message: "Enter your project files directory",
    default: () => ".",
  },
  {
    type: "input",
    name: "entry",
    message: "What's the entry code filename?",
    default: () => "index.js",
  },
  {
    type: "input",
    name: "filename",
    message:
      "What should the bundle's final name be? (use relative paths if you want to)",
    default: () => "bundle.js",
  },
];

module.exports = { questions };