"use strict";

const docxToText = require("./docxToText");
const fileType = require("file-type");
const fs = require("fs");
const imageToText = require("./imageToText");
const path = require("path");
const pdfToText = require("./pdfToText");
const util = require("util");

const readFile = util.promisify(fs.readFile);

const extractText = async ({ buffer, fileFormat }) => {
  switch (fileFormat) {
    case "application/pdf":
      return await pdfToText(buffer);
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return await docxToText(buffer);
    case "image/bmp":
    case "image/gif":
    case "image/jpeg":
    case "image/png":
    case "image/tiff":
      return await imageToText(buffer);
    default:
      return "";
  }
};

module.exports = async document => {
  const buffer =
    typeof document === "string" ? await readFile(document) : document;
  const fileTypeOfDocument = fileType(buffer);
  if (!fileTypeOfDocument) {
    return "";
  }
  const fileFormat = fileTypeOfDocument.mime;
  const text = await extractText({ buffer, fileFormat });
  const trimmedText = text.trim();
  return {
    fileFormat,
    text: trimmedText
  };
};
