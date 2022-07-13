const { json } = require("express")
const express = require("express")
const UserController = require("./userController")
const app = express()
app.use(json())

app.use("/",UserController)

app.listen(4000, () => {
  console.log("Listining at port 4000")

})