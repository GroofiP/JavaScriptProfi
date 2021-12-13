const express = require("express");
const cors = require("cors");
const {
    addGood,
    readBasket,
    deleteGood
} = require("./helpers");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("./static"));

app.get("/", (request, responce) => {
    responce.send("GET")
    console.log("GET")
});

app.get("/basket", (request, responce) => {
    readBasket().then((data) => {
        responce.send(data)
    })
});

app.post("/", (request, responce) => {
    responce.send("POST")
    console.log("POST")
});

app.post("/:id", (request, responce) => {
    addGood(request.params.id).then(() => {
        readBasket().then((data) => {
            responce.send(data)
        })
    }).catch((err) => {
        responce.send(err)
    })
});

app.delete("/:id", (request, responce) => {
    deleteGood(request.params.id).then(() => {
        readBasket().then((data) => {
            responce.send(data)
        })
    }).catch((err) => {
        responce.send(err)
    })
});

app.listen("8026", () => {
    console.log("Server run!")
});