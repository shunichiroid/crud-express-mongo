const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const DBUSER = process.env.DBUSER
const DBPASSWORD = process.env.DBPASSWORD
let db

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

MongoClient.connect(`mongodb://${DBUSER}:${DBPASSWORD}@ds161780.mlab.com:61780/express-mongodb`, (err, client) => {
    if(err) return console.log(err);
    db = client.db('express-mongodb')
    app.listen(3000, () => {
        console.log('Example app listening on port 3000!')
    }) 
})


app.get('/', (req, res) => {
    db.collection('quotes').find().toArray((err, results) => {
        if(err) {
            return console.log(err);
        }
        res.render('../view/index.ejs',{quotes: results})
    })
})

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
        if(err) return console.log(err);
        
        console.log("saved to database");
        res.redirect('/')
    })
    
})
