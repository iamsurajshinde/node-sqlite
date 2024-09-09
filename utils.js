const db = require("./models/db");

const isAdmin = (req, res, next) => {
  const { username, email, password } = req.headers;
  signinAdmin(username, email, password, res, () => {
    next();
  });
};

const signinAdmin = (username, email, password, res, next) => {
  const sql =
    "SELECT id FROM users WHERE (username= ? OR email=?) AND password=?";
  const params = [username, email, password];
  db.get(sql, params, (err, row) => {
    if (err || !row?.id) {
      res.status(401).json({ error: err || "Unauthorized" });
      return;
    }
    const sqlAdmin = "SELECT id FROM admins WHERE adminId=?";
    db.get(sqlAdmin, [row.id], (err, result) => {
      if (err || !result?.id) {
        res.status(401).json({ error: err || "Unauthorized" });
        return;
      }
      next(row);
    });
  });
};

module.exports = { isAdmin , signinAdmin};
