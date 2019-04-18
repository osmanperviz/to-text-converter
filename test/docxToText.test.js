"use strict";

const toTextConverter = require("../");
const path = require("path");

test("Docx to text", async () => {
  const text = await toTextConverter(
    path.join(__dirname, "fixtures/test.docx")
  );
  expect(text).toMatchObject({
    fileFormat:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    text: "Hello World"
  });
});
