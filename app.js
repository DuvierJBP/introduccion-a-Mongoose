const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/FruitsDB", { useNewUrlParser: true });

const fruitSchema = new mongoose.Schema({
    name: String,
    ratting: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name: "apple",
    ratting: 35,
    review: "Pretty solid as a fruit."
});

//fruit.save();

const mango = new Fruit({
    name: "mango",
    ratting: 10,
    review: "Es delicioso en jugo"
});

mango.save();

const personSchema = mongoose.Schema({
    nombre: String,
    edad: Number,
    frutaFavorita: fruitSchema
});

const Persona = mongoose.model("Persona", personSchema);

Persona.updateOne({ nombre: "jhon" }, { frutaFavorita: mango }, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Seccesfully update the document");
    }
});

Fruit.find(function (err, fruits) {
    if (err) {
        console.log(err);
    } else {
        mongoose.connection.close();
        fruits.forEach(function (fruit) {
            console.log(fruit.name);
        });
    }
});

const findDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('Fruits');
    // Find some documents
    collection.find({}).toArray(function (err, fruits) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(fruits)
        callback(docs);
    });
}
