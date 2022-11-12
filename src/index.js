const core = require('@actions/core');
const github = require('@actions/github');

try {
  // Get all changed files in string
  const changedFilesString = core.getInput('changed-files');

  // Get path
  const defaultPath = core.getInput('path');

  // Get number of nested folders
  const nesting = core.getInput('nesting');

  // Split string in array
  const changedFiles = changedFilesString.trim().split(/\s+/);

  const firstPath = getFolderName(changedFiles[0], nesting);
  console.log(`File[${0}] folder: ${firstPath}`);

  let isGood = true;

  for (let i = 1; i < changedFiles.length; i++) {
    let tempPath = getFolderName(changedFiles[i], nesting);
    console.log(`File[${i}] folder: ${tempPath}`);
    if (tempPath != firstPath) {
        isGood = false;
        break;
    }
  }

  // If folders are different throw error
  if (isGood == false) {
    throw new Error();
  }

  console.log(changedFiles);
  console.log(defaultPath);
  
} catch (error) {
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