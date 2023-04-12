import fs from "fs";
import resolve from "path";

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

fs.readdir("C:/", (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach((f) => {
      console.log(f);
    });
  }
});

// console.log("__dirname : " + __dirname);
// console.log("cwd       : " + process.cwd());
