const express = require("express");
const bodyParser = require("body-parser");
// const getDate = require("./date");
const date = require(__dirname + "/date.js")

// console.log(date())

const app = express();

const items = [];
const workItems = [];
// let schoolItems = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  // res.send("Ablordey Morgan");
  const day = date.getDate()

  //   const currentDay = today.getDay();
  //   var day = "";

  // if (currentDay === 6 || currentDay === 0) {
  //     day = "Weekdend"

  //     // res.render("list", {kindOfDay: day})
  // }else{
  //     // res.write("<p>It's not the weekend.<p>");
  //     // res.write("<h1>Boo! i have to work!</h1>");
  //     // res.send();
  //     day = "Weekday"
  //     // res.sendFile(__dirname + "/index.html")
  // }
  //   switch (currentDay) {
  //     case 0:
  //       day = "Sunday";
  //       break;
  //     case 1:
  //       day = "Monday";
  //       break;
  //     case 2:
  //       day = "Tueday";
  //       break;
  //     case 3:
  //       day = "Wednesday";
  //       break;
  //     case 4:
  //       day = "Thursday";
  //       break;
  //     case 5:
  //       day = "Friday";
  //       break;
  //     case 6:
  //       day = "Saturday";
  //       break;

  //     default:
  //       console.log(currentDay)
  //   }

  
  res.render("list", {
    listTitle: day,
    newListItems: items,
  });
});

app.post("/", function (req, res) {
  let item = req.body.newItem;
  console.log(req.body)
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    // console.log(req.body.newItem)
    items.push(item);

    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems,
  });
});

app.post("/work", function (req, res) {
  let item = req.body.newItem;
  workItems.push(item);

  res.redirect("/work");
});

app.get("/about", function(req, res){
  res.render("about")
})

// app.get("/school", function (req, res) {
//   res.render("list", {
//     listTitle: "School List",
//     newListItems: schoolItems,
//   });
// });

// app.post("/school", function (req, res) {
//   let item = req.body.newItem;
//   schoolItems.push(item);

//   res.redirect("/school");
// });

app.listen(3000, function () {
  console.log("Server is running at port 3000.");
});
