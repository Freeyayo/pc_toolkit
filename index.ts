import fs from "fs";
// import prompts from "prompts";
import resolve from "path";
import { getAllDrive } from "./src/utils";
const prompts = require("prompts");

async function readFileList(path, filesList) {
  var files = fs.readdirSync(path);
  files.forEach(function (itm, index) {
    var stat = fs.statSync(path + itm);
    if (stat.isDirectory()) {
      //递归读取文件
      readFileList(path + itm + "/", filesList);
    } else {
      var obj = {}; //定义一个对象存放文件的路径和名字
      // obj.path = path;//路径
      // obj.filename = itm//名字
      filesList.push(obj);
    }
  });
}

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

// prompts.inject(["@terkelg", ["#ff0000", "#0000ff"]]);

(async () => {
  const response = await prompts([
    {
      type: "text",
      name: "twitter",
      message: `What's your twitter handle?`,
    },
    {
      type: "multiselect",
      name: "value",
      message: "Pick colors",
      choices: [
        { title: "Red", value: "#ff0000" },
        { title: "Green", value: "#00ff00", disabled: true },
        { title: "Blue", value: "#0000ff", selected: true },
      ],
      max: 2,
      hint: "- Space to select. Return to submit",
    },
  ]);

  console.log(response);
  // => { twitter: 'terkelg', color: [ '#ff0000', '#0000ff' ] }
})();
