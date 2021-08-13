const express = require('express');
const cors = require('cors');
const port = 5000
const app = express();
const client = require("./routes/client") ; 
const mongoose = require("mongoose"); 

const uri =
  'mongodb+srv://divya12:Puneet12@cluster0.fbxaa.mongodb.net/test';

mongoose.connect(uri,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
 .then(()=> console.log(` ++ connected to mongo ++`))
 .catch((err)=> console.error(`Could not connect to mongo`, err))

app.use(cors());
app.use(express.json());
// app.use(cors({origin: true}))

app.use('/client', client)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))