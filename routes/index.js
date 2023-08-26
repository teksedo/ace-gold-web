const { default: axios } = require("axios");
var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    const apiUrl = "https://walrus-app-k59sj.ondigitalocean.app/api/v1/product";
    const response = await axios.get(apiUrl);
    const apiData = response.data.response; // Assuming the API returns an array of objects
    console.log(apiData);
    res.render("index", { apiData });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
