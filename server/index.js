const express = require('express');
const app     = express();
const fileUpload = require("express-fileupload")
const mysql   = require('mysql');
const cors    = require('cors');
const morgan = require("morgan")


app.use(cors());
app.use(express.json());
app.use(fileUpload({
    createParentPath: true
  }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))

const db = mysql.createConnection({
    user : "root",
    host : "localhost",
    password : "",
    database : "insecticide"
})

app.get('/data_detail',(req,res) => {
    db.query("select * from data_detail ORDER BY subject_id  DESC" , (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
        
    });
});

app.post("/create", async (req, res) => {
    const subject      = req.body.subject;
    const date_subject = req.body.date_subject;
    const time_subject = req.body.time_subject;
    const type_subject = req.body.type_subject;

    db.query(
      "INSERT INTO data_detail (subject,date_subject,time_subject,type_subject) VALUES (?,?,?,?)",
      [subject,date_subject,time_subject,type_subject],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  });


  app.delete("/delete/:id", (req, res) => {
    const subject_id = req.params.id;
    db.query("DELETE FROM data_detail WHERE data_detail.subject_id = ?", [subject_id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });


app.listen('3001', () => {
    console.log('Server running in port 3001 !!!')
})