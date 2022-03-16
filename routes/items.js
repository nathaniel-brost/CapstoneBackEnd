const express = require("express"); //Request routing
const bcrypt = require("bcrypt"); //Password hashing
const { Item, validateItem } = require("../models/item"); //Item model and validation
const auth = require("../middleware/auth");
const { User } = require("../models/user");

// define router
const router = express.Router();

// add all items via excel??

// collection data get
// youtube video get
// add image put

// add new item
router.post("/:uid/collectionItems", auth, async (req, res) => {
  try {
    let user = await User.findById(req.params.uid);
    if (!user)
      return res.status(400).send(`User with id ${uid} does not exist.`);
    //new post validation
    //validation error handling here

    const item = new Item({
      itemName: req.body.itemName,
      category: req.body.category,
      quantityOwned: req.body.quantityOwned,
      quantityNeeded: req.body.quantityNeeded,
      costPer: req.body.costPer,
      dateBought: req.body.dateBought,
      futureBuy: req.body.futureBuy,
      notes: req.body.notes,
    });
    user.collectionItems.push(item);
    await user.save();
    return res.send(user);
  } catch (err) {
    return res.status(500).send(`Internal Server Error: ${err}`);
  }
});

// get all items
router.get("/:uid/collectionItems", async (req, res) => {
  try {
    let user = await User.findById(req.params.uid);
    if (!user)
      return res.status(400).send(`User with id ${uid} does not exist.`);

    const items = await user.collectionItems;
    return res.send(items);
  } catch (err) {
    return res.status(500).send(`Internal Server Error: ${err}`);
  }
});

// get one item by user id
router.get("/:uid/collectionItems/:itemid", async (req, res) => {
  try {
    let user = await User.findById(req.params.uid);
    if (!user)
      return res
        .status(400)
        .send(`User with id ${req.params.uid} does not exist.`);

    const item = await user.collectionItems.id(req.params.itemid);
    if (!item)
      return res
        .status(400)
        .send(`Item with id ${req.params.itemid} does not exist.`);

    return res.send(item);
  } catch (err) {
    return res.status(500).send(`Internal Server Error: ${err}`);
  }
});

////DELETE Single post - post _id
router.delete("/:uid/collectionItems/:itemid", auth, async (req, res) => {
  try {
    let user = await User.findById(req.params.uid);
    if (!user)
      return res
        .status(400)
        .send(`User with id ${req.params.uid} does not exist.`);

    const item = await user.collectionItems.id(req.params.itemid);
    if (!item)
      return res
        .status(400)
        .send(`Item with id ${req.params.itemid} does not exist.`);

    item.remove();
    await user.save();
    return res.send([item, user]);
  } catch (err) {
    return res.status(500).send(`Internal Server Error: ${err}`);
  }
});

// update one item (auth)
router.put("/:uid/collectionItems/:itemid", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.uid);

    if (!user)
      return res
        .status(400)
        .send(`User with id ${req.params.uid} does not exist.`);

    let item = await user.collectionItems.id(req.params.itemid);
    if (!item)
      return res
        .status(400)
        .send(`Item with id ${req.params.itemid} does not exist.`);

      (item.itemName = req.body.itemName),
      (item.category = req.body.category),
      (item.quantityOwned = req.body.quantityOwned),
      (item.quantityNeeded = req.body.quantityNeeded),
      (item.costPer = req.body.costPer),
      (item.dateBought = req.body.dateBought),
      (item.futureBuy = req.body.futureBuy),
      (item.notes = req.body.notes),
      await user.save();

    return res.send([item, user]);
  } catch (err) {
    return res.status(500).send(`Internal Server Error: ${err}`);
  }
});

module.exports = router;
