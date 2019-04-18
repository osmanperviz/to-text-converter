"use strict";

const child_process = require("child_process");
const stream = require("stream");

module.exports = async buffer => {
  return new Promise((resolve, reject) => {
    const process = child_process.exec(
      "tesseract stdin stdout",
      (error, stdout) => {
        if (error) {
          reject(error);
        }
        resolve(stdout);
      }
    );
    const bufferStream = new stream.PassThrough();
    bufferStream.end(buffer);
    bufferStream.pipe(process.stdin);
  });
};
