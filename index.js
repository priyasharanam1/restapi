const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const PORT = 8000;

const app = express();

app.use(express.urlencoded({extended: false}));

//ROUTES
app.get("/users", (req,res) => {
    const html = `
    <ul>
      ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    res.send(html)
})

//RESTFUL
app.get("/api/users", (req,res) => {
    return res.json(users);
})

app.route("/api/users/:id")
.get((req,res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})
.put((req,res) => {})

.post((req,res) => {
    //todo : create new user
    return res.json({status : "pending"});
})
.patch((req,res) => {
    //todo : update the user with id...
    return res.json({status : "pending"});
})
.delete((req,res) => {
    //todo : delete the user with id...
    return res.json({status : "pending"});
})



app.post("/api/users", (req,res) => {
    // todo : create new user
    const body = req.body;
    // console.log(body);
    users.push({...body, id: users.length + 1})
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
        return res.json({status : "success", id: users.length + 1});
    })
})

// app.patch("/api/users/:id", (req,res) => {
//     todo : update the user with id...
//     return res.json({status : "pending"});
// })

// app.delete("/api/users/:id", (req,res) => {
//     todo : delete the user with id...
//     return res.json({status : "pending"});
// })

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})