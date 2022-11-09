import mysql from "mysql"

export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Dylxb88123",
    database:"Social"
})

// db.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

// How do you reach backend server
// app.get("/",(req,res)=>{
//     res.json("hello !!!!");
// })
//
// app.get("/user",(req,res)=>{
//     const q ="SELECT * FROM USERS"
//     db.query(q,(err,data)=>{
//         if(err) return res.json("Cannot !!!!!!!!")
//         return res.json(data)
//     })
// })