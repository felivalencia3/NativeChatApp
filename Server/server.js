const express = require("express"),
    bodyparser = require("body-parser");
    app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ChatDB');
const messageSchema = new mongoose.Schema({
    message: String,
    user: String,
});
const Message = mongoose.model("Message", messageSchema);
function resetDB() {
    Message.deleteMany({},(err) => {
        if (err) return console.error(err)
    })
};
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
setInterval(resetDB,600000);
let urlencodedparser = bodyparser.urlencoded({extended: false});
app.post("/new",urlencodedparser, (req,res,next) => {
    const msg = req.body.msg;
    const username = req.body.user;
    const newMessage = new Message({message: msg, user: username});
    newMessage.save((err) =>  {
        if (err) return console.error(err);
        res.status(200).send("Saved.")
    });
});

app.get("/all", (req,res) => {
    let response = [];
    Message.find(function (err, messages) {
        if (err) return console.error(err);
        for (let k = 0; k < messages.length; k++) {
            const singleMSG = {msg: messages[k].message, user: messages[k].user};
            response.push(singleMSG)
        }
        res.send(response)
    })
});
const server = app.listen(8081, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port)

});
