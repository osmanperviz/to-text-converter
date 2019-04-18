"use strict";

const mammoth = require("mammoth");

module.exports = async buffer => {
  const result = await mammoth.extractRawText({
    buffer
  });
  return result.value;
};
