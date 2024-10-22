// initializing express
const express = require('express');
const app = express();

// configuring PORT
const PORT =  process.env.PORT|| 3000;
app.listen(PORT,()=>console.log(`server running on port ${PORT}`));


// to parse the data coming from URL
app.use(express.json());
app.use(express.urlencoded({extended:true}))

