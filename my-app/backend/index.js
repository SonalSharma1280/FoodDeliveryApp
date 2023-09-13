const express = require('express')
const app = express()
const port = 5000
const mongodb=require("./db")
mongodb();
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use((req,res,next)=>{//these lines are defacto u have to write it anyway or just search about it on chtgapt?
  res.setHeader("Access-Control-Allow-Origin","*");//just putting "*" at the place of "http://localhost:5000" is working fine also i installed cors using npm
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
})
/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/

app.use(express.json())
app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/',(req,res)=>{
  res.send("hello world---")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

