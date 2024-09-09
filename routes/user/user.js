const db = require("../../models/db");
const { isAdmin } = require("../../utils");

const router = require("express").Router();

router.post("/signin", (req, res) => {
  const { username, email, password } = req.body;
  const sql =
    "SELECT * FROM users WHERE (username= ? OR email=?) AND password=?";
  const params = [username, email, password];
  db.all(sql, params, (err, rows) => {
    if (err || rows.length === 0) {
      res.status(401).json({ error: err || "Unauthorized" });
      return;
    }
    res.json({
      message: "success",
    });
  });
});

router.post("/signup", (req, res) => {
  console.log(req.body);
  const { name, username, email, password } = req.body;
  let insert =
    "INSERT INTO users (name,username,email,password) VALUES (?,?,?,?)";
  db.run(insert, [name, username, email, password], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      id: this.lastID,
    });
  });
});

router.get("/", isAdmin, (req, res) => {
  const sql = "SELECT * FROM users";
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

router.get("/:id", isAdmin, (req, res) => {
  const sql = "SELECT * FROM users WHERE id = ?";
  const params = [req.params.id];
  console.log(params);
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row || {},
    });
  });
});

router.put("/:id", isAdmin, (req, res) => {
  const { name, email, password } = req.body;
  db.run(
    `UPDATE users set 
         name = COALESCE(?,name), 
         email = COALESCE(?,email), 
         password = COALESCE(?,password) 
         WHERE id = ?`,
    [name, email, password, req.params.id],
    (err, result) => {
      if (err) {
        res.status(400).json({ error: err });
        return;
      }
      res.json({
        message: "success",
        data: result,
        changes: this.changes,
      });
    }
  );
});

router.delete("/:id", isAdmin, (req, res) => {
  db.run("DELETE FROM user WHERE id = ?", req.params.id, (err) => {
    if (err) {
      res.status(400).json({ error: res.message });
      return;
    }
    res.json({ message: "deleted", changes: this.changes });
  });
});

module.exports = router;
