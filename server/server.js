const express = require('express');
const path = require("path");
const getRestaurants = require("./getRestaurants");

const app = express();

const paths = {
  publicDir: path.resolve('./dist'),
  indexPage: path.resolve('./dist/index.html')
};

app.use(express.static(paths.publicDir));

app.get("/", (req, res) => {
  res.sendFile(paths.indexPage);
});

app.get("/restaurants", (req, res) => {
  let query = {
    location: req.query.location
  };
  let onOK = data => res.send(data);
  let onError = e => {
    // 400 Bad Request
    res.status(400).send(e.toString());
  };
  getRestaurants(query, onOK, onError);
});

app.listen(3000, () => console.log("PicRestaurant app listening on localhost:3000!"));
