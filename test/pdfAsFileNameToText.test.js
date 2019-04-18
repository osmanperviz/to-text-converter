"use strict";

const toTextConverter = require("../");
const path = require("path");

test("Pdf as filename to text", async () => {
  const text = await toTextConverter(path.join(__dirname, "fixtures/test.pdf"));
  expect(text).toMatchObject({
    fileFormat: "application/pdf",
    text: "Hello World"
  });
});
