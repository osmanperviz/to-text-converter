"use strict";

const pdfjsLib = require("pdfjs-dist");

module.exports = async buffer => {
  const texts = [];
  const doc = await pdfjsLib.getDocument({
    data: buffer
  });
  const numPages = doc.numPages;
  for (var pageNum = 1; pageNum <= numPages; pageNum++) {
    const page = await doc.getPage(pageNum);
    const content = await page.getTextContent();
    let lastItem;
    for (let item of content.items) {
      if (lastItem && lastItem.transform[5] === item.transform[5]) {
        const ttt = item.transform[4] - lastItem.transform[4] - lastItem.width;
        if (lastItem.transform[4] + lastItem.width !== item.transform[4]) {
          texts[texts.length - 1] += " ";
        }
        texts[texts.length - 1] += item.str;
      } else {
        texts.push(item.str);
      }
      lastItem = item;
    }
  }
  for (let textIndex = 0; textIndex < texts.length; textIndex++) {
    texts[textIndex] = texts[textIndex].trim();
  }
  return texts.join("\n");
};
