// A build script to get the files onto AWS
// We copy the working directory,
// Remove any unwated files, create a zip, and push to AWS.

// TODO uglify and minify the zip output.
// TODO perhaps this could be reduced to one single file.

const fs = require('fs');
const path = require('path');
const { exec, execSync } = require('child_process');

// Files to remove from output
var removeFiles = ['README.md', '.gitignore', 'package.json'];
var removeFolders = ['.git'];

// Create new copy of folder
var copyRecursiveSync = function(src, dest) {
  
  // we do not include the test folder
  if (src.toString() === 'app/test') return;

  var exists = fs.existsSync(src);
  var stats = exists && fs.statSync(src);
  var isDirectory = exists && stats.isDirectory();
  if (exists && isDirectory) {
    fs.mkdirSync(dest);
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(path.join(src, childItemName),
                        path.join(dest, childItemName));
    });
  } else { 
    fs.copyFileSync(src, dest);
  }
};

// From and To folder
copyRecursiveSync('./app/', './dist');

// Remove files from new dist folder
removeFiles.map((file) => {
  fs.unlink('./dist/' + file, function (){});
});

// Delete
var deleteFolderRecursive = function(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index){
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

// For now its one folder we are targeting.
removeFolders.map((folder) => {
  deleteFolderRecursive('./dist/' + folder);
});

// zip up the dist folder
execSync(`zip -r './../dist' *`, {
  cwd: 'dist'
});

// delete the newly created dist folder
deleteFolderRecursive('./dist');

// Send to AWS
exec('aws lambda update-function-code --function-name ask-custom-Hello_World-cli-user --zip-file fileb://dist.zip --publish', (err, stdout, stderr) => {
  if (err) {
    // node couldn't execute the command
    return;
  }
  // the *entire* stdout and stderr (buffered)
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});