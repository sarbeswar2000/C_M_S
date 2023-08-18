const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Contents = require("../models/Contents");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get all notes : GET "/api/auth/fetchallnotes". No login required

router.get("/fetchallcontents", fetchuser, async (req, res) => {
  try {
    const contents = await Contents.find({ user: req.user.id });
    res.json(contents);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 1: Add a  notes using post  : GET "/api/notes/addnotes". login  required
router.post(
  "/addcontents",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    try {
      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const content = new Contents({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedcontent = await content.save();
      res.json({ savedcontent });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
// ROUTE 3: Add a  notes using put  : GET "/api/notes/updatenotes". login  required
router.put("/updatecontents/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    const newContent = {};
    if (title) {
        newContent.title = title;
    }
    if (description) {
        newContent.description = description;
    }
    if (tag) {
        newContent.tag = tag;
    }
    // find note to be updated
    let content = await Contents.findById(req.params.id);
    if (!content) {
      res.status(404).send("Notes not found");
    }
    if (content.user.toString() != req.user.id) {
      return res.status(401).send("Not allowed");
    }
    content = await Contents.findByIdAndUpdate(
      req.params.id,
      { $set: newContent },
      { new: true }
    );
    res.json({ content });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 4: deleting existing a  notes using put  : put "/api/notes/updatenotes". login  required
router.delete("/deletecontents/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    // find note to be delete adn delete it
    let content = await Contents.findById(req.params.id);
    if (!content) {
      res.status(404).send("Notes not found");
    }
    // allow  deletion only if user owns this Note
    if (content.user.toString() != req.user.id) {
      return res.status(401).send("Not allowed");
    }
    content = await Contents.findByIdAndDelete(req.params.id);// it will access the id which is send by the req
    res.json({ succes: "Note has been deleted ", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
