const express = require('express')
const bodyParser = require('body-parser')
const app = express()

//const MongoClient = require('mongodb').MongoClient;


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Luciano:<08178555>@cluster0.rezql.mongodb.net/<crud>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
//const uri = "mongodb+srv://Luciano:<08178555>@cluster0.rezql.mongodb.net/test" //"mongodb://<dbuser:<dbpassword>@d08178555.mlab.com:33279/crud";

MongoClient.connect(uri, (err, client) => {
    if (err) return console.log(err)
    db = client.db('crud') // coloque o nome do seu DB

    app.listen(3000, () => {
        console.log('Server running on port 3000')
    })
})

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/', (req, res) => {
    var cursor = db.collection('data').find()
})

app.get('/show', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs', { data: results })

    })
})

app.post('/show', (req, res) => {
    db.collection('data').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('Salvo no Banco de Dados')
        res.redirect('/show')
    })
})