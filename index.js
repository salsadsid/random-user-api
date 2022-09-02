const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/v1/user.route");
const fs = require('fs');
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

app.use(userRoutes)

fs.readFile('users.json', (err, data) => {
    if (err) throw err;
    let dataParsed = JSON.parse(data);
    console.log(dataParsed)
})

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.all('*', (req, res) => {
    res.send("No route found");
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
