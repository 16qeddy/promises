/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function(filePath) {
  let promise = new Promise((resolve, reject)=>{
    let string;
    let something = fs.readFile(filePath, (err, data)=>{
      if (err) {
        reject(err);
      } else {
        resolve(data.toString());
      }
    });
  });
  return promise
    .then((data)=>{
      let lines = data.split('\n');
      return lines;
    })
    .then((data)=>{
      return data[0];
    });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  let p = new Promise((resolve, reject)=>{
    request(url, (err, res, body)=>{
      if (err) {
        reject(err);
      } else {
        resolve(res.statusCode);
      }
    });
  });
  return p;
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
