const express = require("express");
const Supplyproduct = require("../../models/Supplyproduct");
const router = new express.Router();
//const cors = require("cors");

//const app = express();

//app.use(cors());

router.post("/productinfo", async (req, res) => {
  const products = new Supplyproduct(req.body);
  try {
    await products.save();
    res.status(201).send(products);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/allproductinfo", async (req, res) => {
  try {
    const products = await Supplyproduct.find({});
    res.send(products);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
