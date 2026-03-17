const express = require("express");
const path = require("path");

const app = express();
const port = 3000;



app.get("/add", (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).send("Invalid input");
    }
    const result = num1 + num2;
    res.send(result.toString());
});

app.get("/subtract", (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).send("Invalid input");
    }
    const result = num1 - num2;
    res.send(result.toString());
});

app.get("/multiply", (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).send("Invalid input");
    }
    const result = num1 * num2;
    res.send(result.toString());
});

app.get("/divide", (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).send("Invalid input");
    }
    if (num2 === 0) {
        return res.status(400).send("Cannot divide by zero");
    }
    const result = num1 / num2;
    res.send(result.toString());
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
