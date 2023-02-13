const express = require("express");
const dotenv = require("dotenv");
const app = express();
const connectDb = require("./config/db");
const auth = require("./Routes/AuthRoute");
const passportConfig = require("./passport/passport");
const cookieSession = require("cookie-session");
const passport = require("passport");
const file = require("./Routes/FileRoute");
dotenv.config({ path: "./.env" });
const mongoUrl = process.env.MONGO_URL;
app.use(express.json());


// database
connectDb(mongoUrl);

//setup template engine
app.set("view engine", "ejs");

app.use(
  cookieSession({
    name: "session",
    maxAge: 2 * 24 * 60 * 60 * 1000,
    keys: [process.env.SECRET],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.session());

app.use("/auth", auth);
app.use("/file", file);

app.get("/", (req, res) => {
  res.render("home");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
