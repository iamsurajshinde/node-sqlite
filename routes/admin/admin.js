const db = require("../../models/db");
const { signinAdmin } = require("../../utils");

const router = require("express").Router();

router.post("/signin", (req, res) => {
  const { username, email, password } = req.body;

  signinAdmin(username, email, password, res, (result) => {
    res.json({
      message: "success",
      data: result,
    });
  });
});

router.post("/signup", (req, res) => {
  const { name, username, email, password } = req.body;
  let insert =
    "INSERT INTO users (name,username,email,password) VALUES (?,?,?,?)";
  db.run(insert, [name, username, email, password], function (err) {
    if (err) {
      res.status(400).json({ error: err });
      return;
    }
    const insertAdmin = "INSERT INTO admins(adminId) VALUES(?)";
    const id = this.lastID;
    db.run(insertAdmin, [id], (err) => {
      if (err) {
        res.status(500).json({ error: err });
        return;
      }
      res.json({
        message: "success",
        id: id,
      });
    });
  });
});

module.exports = router;
