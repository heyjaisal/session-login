const express = require("express");
const app = express();
const hbs = require("hbs");
const nocache = require("nocache");
const session = require("express-session");

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    // cookie: {}
  }));

app.set("view engine", "hbs");
app.use(nocache());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("views"));



const users = {
  username: "jaisal",
  password: "123",
};

app.get("/", (req, res) => {
    if (req.session && req.session.user) {
      res.render("home");
    } else {
      res.render("login");
    }
  });

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === users.username && password === users.password) {
    req.session.user = username;
    res.render("home", { user: username });
  } else {
    res.render("error", { message: "Invalid username or password" });
  }
});

app.get("/logout",(req,res)=>{
        req.session.destroy();
        res.redirect('/');
    });

app.listen(8080);