"use strict";

const toTextConverter = require("../");
const path = require("path");

test("Png to text", async () => {
  const text = await toTextConverter(path.join(__dirname, "fixtures/test.png"));
  expect(text).toMatchObject({
    fileFormat: "image/png",
    text: "Hello World"
  });
});
