const express = require('express');
const path = require("path");
const getRestaurants = require("./restaurants");

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
    location: req.query.location,
    open_at: req.query.open_at
  };
  let onOK = data => res.send(data);
  let onError = e => {
    // 400 Bad Request
    res.status(400).send(e.toString());
  };
  getRestaurants(query, onOK, onError);
});

app.listen(3000, () => console.log("PicRestaurant app listening on port 3000!"));
