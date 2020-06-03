const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

// fXAVNMFJtvvT8jyX
const dbUser = process.env.DB_USER;
const password = process.env.DB_PASS;


let uri = process.env.DB_PATH;

let client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });


app.get('/',(req,res)=> {

   res.send("welcome to power gym")
})

app.post('/memberdata',(res,req)=>{
    const data = req.body
    let client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("power-gym").collection("members");
        collection.insert(data,(err,result) =>{
            if(err){
                console.log(err)
                res.status(500).send({message:err})
            }
            else{
                
                res.send(result.ops[0])
                
            }
        })       
        client.close();
      });

})
//dummy post data for onr time

// app.post('/cartData', (req,res) => {

//     const appointment = req.body; 
//     let client = new MongoClient(uri, { useNewUrlParser: true});

//     client.connect(err => {
//         const collection = client.db("power-gym").collection("cartData");
//         collection.insert( appointment,(err,result)=>{

//             if(err){
//                 console.log(err);
//                 res.status(500).send({message:err});
//             }
//             else{
//                 res.send(result.ops[0]);
//             }


//         });

//         client.close();
//       });


// })
const port = process.env.PORT || 5000
app.listen(port,()=> console.log(`listening ${port}`))