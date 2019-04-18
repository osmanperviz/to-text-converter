"use strict";

const toTextConverter = require("../");
const path = require("path");

test("Jpeg to text", async () => {
  const text = await toTextConverter(
    path.join(__dirname, "fixtures/test.jpeg")
  );
  expect(text).toMatchObject({
    fileFormat: "image/jpeg",
    text: "Hello World"
  });
});
