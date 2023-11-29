"use strict"
// @ts-check

const app = require("./app");
const port = 8001;

app.listen(port, () => {
   console.log(`Listening to port ${port}...`);
});