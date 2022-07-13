const fs = require("fs");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  try {
    let data = fs.readFileSync(`./userData.json`, "utf8");
    data = JSON.parse(data);
    console.log(data);
    return res.status(201).send(data);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

router.post("/signup", (req, res) => {
  try {
    let data = fs.readFileSync(`./userData.json`, "utf8");
    data = JSON.parse(data);
    console.log(data)
      let userData = req.body;
      if (!userData.name) {
          return res.send("Invalid Name")
      }
      if (!userData.email) {
          return res.send("Invalid email")
      }
      if (!userData.password) {
          return res.send("Invalid password")
      }
    // userData = JSON.parse(userData)
    console.log(userData);
      
   let exists = data.filter((e) => e.email == userData.email);
    console.log("exists", exists);
    if (exists.length !== 0) {
      return res.send("User Already Exists");
    } else {
      console.log(userData);
      userData["id"] = Date.now();
       data.push(userData);
      let signupData = JSON.stringify(data);
      fs.writeFileSync("./userData.json", signupData);
      return res.status(201).send(data);
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

router.post("/login", (req, res) => {
  try {
    let data = fs.readFileSync(`./userData.json`, "utf8");
    data = JSON.parse(data);
    console.log(data)
    let userData = req.body;
    if (!userData.name) {
      return res.send("Invalid Name")
    }
    if (!userData.email) {
      return res.send("Invalid email")
    }
    if (!userData.password) {
      return res.send("Invalid password")
    }
    // userData = JSON.parse(userData)
    console.log(userData);
      
    let exists = data.filter((e) => e.email == userData.email);
    console.log("exists", exists);
    if (exists.length !== 0) {
      return res.send("User Already Exists");
    } else {
     
      return res.status(400).send("User Not Found.");
    }
  }
  catch (err) {
    return res.send(err.message)
  }
});



module.exports = router;
