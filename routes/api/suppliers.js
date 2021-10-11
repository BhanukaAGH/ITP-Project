const express = require("express");
const Supplier = require("../../models/Supplier");
const router = new express.Router();
const multer = require("multer");
//const cors = require("cors");

//const app = express();

//app.use(cors());

const upload = multer();

router.post("/supplier", upload.single("imgager"), async (req, res) => {
  const user = new Supplier(req.body);

  try {
    await user.save();

    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/suppliers", async (req, res) => {
  try {
    const users = await Supplier.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/supplier/:id", async (req, res) => {
  const _id = req.params.id;
  console.log(req.params.id);

  try {
    const user = await Supplier.findById(_id);

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/supplier/:id", async (req, res) => {
  try {
    const user = await Supplier.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/supplier/:id", async (req, res) => {
  try {
    const user = await Supplier.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
