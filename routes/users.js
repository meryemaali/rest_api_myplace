const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../models/users");

//POST: CREATE A NEW User
router.post("/", async (req, res) => {
  const error = await validateUser(req.body);
if(error.message) res.status(400).send(error.message);

  user = new User({
    email: req.body.userEmail,
    password: req.body.userPassword,
    nom: req.body.userNom,
    prenom: req.body.userPrenom,
    tel: req.body.userTel,
  });

  user
    .save()
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      res.status(500).send("user was not stored in db");
    });
});

//GET ALL users
router.get("/", (req, res) => {
  User.find()
    .then((users) => res.send(users))
    .catch((error) => {
      res.status(500).send("Something went wrong");
    });
});

//GET THE user BY ID
router.get("/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) res.status(404).send("user not found");
  res.send(user);
});

//UPDATE user BASED ON ID
router.put("/:userId", async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.params.userId,
    {
    email: req.body.userEmail,
    password: req.body.userPassword,
    nom: req.body.userNom,
    prenom: req.body.userPrenom,
    tel: req.body.userTel,
    },
    { new: true }
  );

  if (!updatedUser) res.status(404).send("user not found");
  res.send(updatedUser);
});

//DELETE user BASED ON ID
router.delete("/:userId", async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.userId);
  if (!user) res.status(404).send("user with id not found");
  res.send(user); 
});

module.exports = router;