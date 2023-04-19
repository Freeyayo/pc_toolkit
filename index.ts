// import fs from "fs";
// // import prompts from "prompts";
// import resolve from "path";
// import { getAllDrive } from "./src/utils";
// const inquirer = require("inquirer");
import inquirer from "inquirer";

// async function readFileList(path, filesList) {
//   var files = fs.readdirSync(path);
//   files.forEach(function (itm, index) {
//     var stat = fs.statSync(path + itm);
//     if (stat.isDirectory()) {
//       //递归读取文件
//       readFileList(path + itm + "/", filesList);
//     } else {
//       var obj = {}; //定义一个对象存放文件的路径和名字
//       // obj.path = path;//路径
//       // obj.filename = itm//名字
//       filesList.push(obj);
//     }
//   });
// }

// getAllDrive().then((res) => {
//   console.log(res);
// });

// fs.readdir("C:/", (err, files) => {
//   if (err) {
//     console.log(err);
//   } else {
//     files.forEach((f) => {
//       console.log(f);
//     });
//   }
// });

// console.log("__dirname : " + __dirname);
// console.log("cwd       : " + process.cwd());
inquirer
  .prompt([
    {
      type: "list",
      name: "theme",
      message: "What do you want to do?",
      choices: [
        "Order a pizza",
        "Make a reservation",
        new inquirer.Separator(),
        "Ask for opening hours",
        {
          name: "Contact support",
          disabled: "Unavailable at this time",
        },
        "Talk to the receptionist",
      ],
    },
    {
      type: "list",
      name: "size",
      message: "What size do you need?",
      choices: ["Jumbo", "Large", "Standard", "Medium", "Small", "Micro"],
      filter(val) {
        return val.toLowerCase();
      },
    },
  ])
  .then((answers) => {
    console.log(JSON.stringify(answers, null, "  "));
  });
