const express= require("express")
const app = express()
const cookieParser = require("cookie-parser")
const csurf = require("csurf")

app.use(cookieParser())
const csrfProtection = csurf({ cookie: true })


app.use(express.urlencoded({ extended:false }))
app.use(express.json())
app.set("view engine", "ejs");



app.get("/", (req, res) => {
  res.send("Hello Page!")
})



app.get("/myform",csrfProtection, (req, res) => {
  res.render("myform", {csrfToken: req.csrfToken()})
})



app.post("/submit",csrfProtection, (req, res) => {
  res.send(req.body)// submit route run hone se hamko ye data json format me browser me show hoga
})


app.listen(3000, () => {
  console.log("Server is running on port 3000")
})



