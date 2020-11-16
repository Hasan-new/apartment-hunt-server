const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const app=express()
const fileUpload =require('express-fileupload')

app.use(fileUpload())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
require('dotenv').config()
const admin = require('firebase-admin');
const { ObjectID } = require('mongodb')

app.get('/',(req,res)=>{
   res.send("connected successfully.")
})


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://teamUser:${process.env.DB_PASS}@cluster0.xjgqp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const apartmentCollection = client.db(`${process.env.DB_Name}`).collection("apartments");
  // perform actions on the collection object

  app.get('/check',(req,res)=>{
      apartmentCollection.find({})
      .toArray((err,docs)=>{
         res.send(docs)
      })
   })


// end 
});





const PORT=process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log('Server is running with '+PORT)
})



//----------------------------
// app.post('/add-service',(req,res)=>{
//    const file=req.files.file
//    const serviceTitle=req.body.serviceTitle
//    const description=req.body.description
   
//    const encImg=file.data.toString('base64')
//      const image={
//        contentType:file.mimetype,
//        size:file.size,
//        img:Buffer(encImg,'base64')
//      }
   
//    servicesCollection.insertOne({
//      img:image, description, serviceTitle
//    })
//    .then(result=>{
//      res.send(result.insertedCount>0)
//      console.log(result)
//    })
//  })

//  app.get('/show-all-service',(req,res)=>{
//    servicesCollection.find({})
//    .toArray((error,documents)=>{
//      res.send(documents)
//    })
//  })