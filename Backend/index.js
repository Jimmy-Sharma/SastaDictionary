const express = require("express")
const app = express()
const { connection } = require("./config/db")
const cors = require("cors");
const { userRouter } = require("./routes/user.routes");
const { searchRouter } = require("./routes/search.routes");
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/searches", searchRouter)


const port = process.env.PORT || 3000;

app.listen(port, async () => {
  try {
    await connection;
    console.log("Database connected");
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.log(error);
  }
});