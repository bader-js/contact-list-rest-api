const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient, ObjectID } = require("mongodb");
const assert = require("assert");
const cors = require ('cors');
const app = express();
app.use(bodyParser.json());
const MongoUrl = "mongodb://localhost:27017";
const dataBase = "ContactList";
app.use(cors())


MongoClient.connect(MongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  assert.equal(err, null, "connection to database failed");
  const db = client.db(dataBase);

  app.post("/add-contact", (req, res) => {
    let newContact = req.body;
    db.collection("contacts").insertOne(newContact, (err, data) => {
      if (err) res.send("Can't add new contact");
      else res.send("New contact added");
    });
  });
  app.get("/contacts", (req, res) => {
    db.collection("contacts")
      .find()
      .toArray((err, data) => {
        if (err) res.send("Can't show contact list");
        else
           res.send(data);
      });
  });
  app.put("/modify-contact/:id", (req, res) => {
    let id = ObjectID(req.params.id);
    db.collection("contacts").findOneAndUpdate(
      { _id: id },
      { $set: { ...req.body } },
      (err, data) => {
        if (err) res.send("can't modify contact");
        else res.send(data);
      }
    );
  });
  app.delete("/delete-contact/:id", (req, res) => {
    let id = ObjectID(req.params.id);
    db.collection("contacts").findOneAndDelete({ _id: id }, (err, data) => {
      if (err) res.send("can't delete contact");
      else res.send(data);
    });
  });
});

app.listen(4000, err => {
  if (err) console.log("server error");
  console.log("server is running on port 4000");
});