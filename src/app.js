const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//path for the express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup for handlebars engine and views location
hbs.registerPartials(partialsPath);
app.set("views", viewsPath);
app.set("view engine", "hbs");

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Nikki",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Nikki",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is help page",
    title: "Help",
    name: "Nikki",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Nikki",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Nikki",
    errorMessage: "page not found",
  });
});

app.listen(3000, () => {
  console.log("Web server is up at port 3000");
});
