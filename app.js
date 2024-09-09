const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const adminRouter = require("./routes/admin/admin");
const userRouter = require("./routes/user/user");

const app = express();
const port = 1920;

app.use(bodyParser.json())
app.use(cors())

app.use("/api/admin", adminRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
