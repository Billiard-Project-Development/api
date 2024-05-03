const express = require('express');
require('dotenv')
const router = require("express").Router();
const app = express();
app.use("/", router.get('/', (req, res) => {
    res.send("tes");
}));

app.listen(8888, () => console.log("run on port 8888"));


