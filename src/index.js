const core = require('@actions/core');
const github = require('@actions/github');

try {
  // Get all changed files in string
  const changedFilesString = core.getInput('changed-files');
  // const changedFilesString = '1/1_1/file.txt 1/1_2/file.txt';
  

  // Get path
  const defaultPath = core.getInput('path');

  // Get number of nested folders
  const nesting = core.getInput('nesting');
  console.log(`Number of nested folders: ${nesting}`);

  // Split string in array
  const changedFiles = changedFilesString.trim().split(/\s+/);
  console.log("Changed files:");
  console.log(changedFiles);

  const firstPath = getFolderName(changedFiles[0], nesting);
  console.log(`File[${0}] folder: ${firstPath}`);

  for (let i = 1; i < changedFiles.length; i++) {
    let tempPath = getFolderName(changedFiles[i], nesting);
    console.log(`File[${i}] folder: ${tempPath}`);
    if (tempPath != firstPath) {
        throw `Folders ${firstPath} and ${tempPath} are different!`
    }
  }

} catch (error) {
  console.log(e);
  core.setFailed(error.message);
}

function getFolderName(file, nesting) {
  const filePath = Object.values(file.trim().split('/'));
  if (nesting > filePath.length) {
      return;
  } else {
      return filePath[nesting]
  }
}