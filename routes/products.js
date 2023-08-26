const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const apiUrl = "https://walrus-app-k59sj.ondigitalocean.app/api/v1/product";
    const response = await axios.get(apiUrl);
    const apiData = response.data.response; // Assuming the API returns an array of objects

    // Find the product with the specified id
    const selectedProduct = apiData.find((product) => product._id === id);

    // if (!selectedProduct) {
    //   return res.status(404).send("Product not found");
    // }

    console.log(selectedProduct);

    res.render("redeem-gold", { selectedProduct });
  } catch (error) {
    console.error("Error fetching API data:", error);
    res.status(500).send("Error fetching API data");
  }
});

module.exports = router;
