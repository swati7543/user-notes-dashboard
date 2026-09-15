require('dotenv').config();

const db=require('mysql2');


const connection=db.createConnection({
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    database:process.env.DB_NAME
})

connection.connect((err)=>{
    if(err){
        console.log("Error connecting to database",err);
    }else{
        console.log("Connected to database");
    }
})