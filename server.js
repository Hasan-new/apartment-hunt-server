const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const app=express()
const fs = require('fs-extra')
const fileUpload =require('express-fileupload')
const ObjectId = require('mongodb').ObjectID;


app.use(fileUpload())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
require('dotenv').config()
app.use(express.static('house'))
app.use(fileUpload({
   createParentPath: true
 }));
const admin = require('firebase-admin');
// const { ObjectID } = require('mongodb')



const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://teamUser:${process.env.DB_PASS}@cluster0.xjgqp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {

  const apartmentCollection = client.db(`${process.env.DB_Name}`).collection(`${process.env.DB_APARTMENTS_COLLECTION}`);
  // perform actions on the collection object

  app.get('/apartments',(req,res)=>{
     apartmentCollection.find({})
     .toArray((err,docs)=>{
        res.send(docs)
     })
  })
   

   app.get('/apartment/:id', (req, res) => {
      apartmentCollection.find({_id: ObjectId(req.params.id)})
      .toArray( (err, documents) => {
          res.send(documents[0])
        })
      })


   const bookApartmentCollection = client.db(`${process.env.DB_Name}`).collection(`${process.env.DB_BOOK_APARTMENT_COLLECTION}`);
   app.post('/book-apartment', (req, res) => {
      const data = req.body
      bookApartmentCollection.insertOne(data)
      .then(result => {
        res.send(result)
      })
      .catch(err => console.log(err))
    })

    app.get('/get-all-booking', (req, res) => {
       bookApartmentCollection.find({})
       .toArray((err, result) => {
          res.send(result)
       })
    })

    app.get('/get-user-booking/', (req, res) => {
      bookApartmentCollection.find({email: req.query.email})
      .toArray( (err, documents) => {
        res.send(documents)
      } )
    })
});






app.listen(process.env.PORT || 3001)


