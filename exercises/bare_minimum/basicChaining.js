/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var helpers = require('./promisification.js');
//exercises/bare_minimum/promisification.js

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  let p = new Promise((resolve, reject)=>{
    fs.readFile(readFilePath, (err, data)=>{
      if (err) {
        reject(err);
      } else {
        let array = data.toString().split('\n');
        resolve(array[0]);
      }
    });
  });

  return p.then((data)=>{
    return helpers.getGitHubProfileAsync(data);
  })
    .then((data)=>{
      let string = JSON.stringify(data);
      console.log(string);
      return fs.writeFile(writeFilePath, string, (err)=>{
        if (err) {
          console.log(err);
        }
      });
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
