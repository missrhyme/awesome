var fs = require('fs');
var fileList = [];

function walk(path){
  var dirList = fs.readdirSync(path);
  dirList.forEach(function(item){
    if(fs.statSync(path + '/' + item).isDirectory()){
      walk(path + '/' + item);
    }else{
      fileList.push(path + '/' + item);
    }
  });

  return fileList;
}

module.exports = walk;
