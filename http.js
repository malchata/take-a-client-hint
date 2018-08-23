const path = require("path");
const express = require("express");
const app = express();
const htdocs = path.join(__dirname, "htdocs");

// Run static server
app.use(express.static(htdocs));
app.listen(8080, () => console.log("Presentation server running at http://localhost:8080"));
