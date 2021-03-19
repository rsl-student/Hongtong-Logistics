const mysql = require('mysql');
const express = require('express');

var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());
//setup database connection
var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "r1o2n3a4l5d6",
    database: "htlog",
    multipleStatements: true
});

//tests connection 
mysqlConnection.connect((err) =>{
    if(!err)    
    {
        mysqlConnection.query("SELECT * FROM containerslog", function (err, result, fields) {
          if (err) throw err;
          //if connection does not succeeds
          console.log(result);
        });
        //Connection succeeds
        console.log("Connection succeeded");
    }
    else
    console.log(`Connection failed \n Error : ` + JSON.stringify(err, undefined, 2));
});

//allows you to go to web browser and type localhost:port - this case 3000 - will start the app functions
app.listen(3000, ()=>console.log('Express server is running at port no 3000'));

//define routes
//routes need get and post (app/router.get/post)
//the path is the path you place after localhost:port/path ->default is '/'
//get all records from db
app.get('/hongtong',(req,res)=>{
    mysqlConnection.query('Select * from containerslog',(err,rows,fields)=>{
        if(!err)
        {
            res.send(rows); // same and res.json(row)
            console.log(rows);  
        }            
        else
            console.log(err);
    })
})


//Selecting a specific record based on ID number
app.get('/hongtong/Select/:id',(req,res)=>{
    mysqlConnection.query('Select * from containerslog WHERE ID_No = ?', req.params.id, (err,rows,fields)=>{
        if(!err)
        {
            res.send(rows); // same and res.json(row)
            console.log(rows);  
        }            
        else
            console.log(err);
    })
})

//deleting a specific record
app.delete('/hongtong/:id', (req,res)=>{
    const id = req.params.id;
    mysqlConnection.query('DELETE FROM containerslog WHERE ID_No = ?', id, (err, rows, field) =>{
        if(!err)
            res.send('Deleted Successfully');
        else
            console.log(err);
    })
});

//Inserting a record into the DB 
app.post("/hongtong/Insert", (req,res)=>{
    let htCont = req.body;

    var sql = "INSERT INTO containerslog (ID_No, CNTRNO, IMPORTER, CLIENT, SHIPPING_LINE, \
        FRT, SOB, ETA, VESSEL, SUBMIT, RESULT, STATUS, DEL) \
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    mysqlConnection.query(sql, [htCont.ID_No, htCont.CNTRNO, htCont.IMPORTER, htCont.CLIENT, 
            htCont.SHIPPING_LINE, htCont.FRT, htCont.SOB, htCont.ETA, htCont.VESSEL, htCont.SUBMIT , 
            htCont.RESULT, htCont.STATUS, htCont.DEL], (err, rows)=>{
        if(!err)
           res.send('Inserted record id: ' + htCont.ID_No);
        else
            console.log(err);
    })
});

//Updating a specific record in DB
app.put("/hongtong/Update/:id", (req,res)=>{
    let htCont = req.body;
    
    mysqlConnection.query('UPDATE containerslog SET ID_No = ?, CNTRNO = ?, IMPORTER =? , CLIENT = ?, \
    SHIPPING_LINE = ?, FRT = ?, SOB = ?, ETA = ?, VESSEL = ?, SUBMIT = ?, RESULT = ?, STATUS = ?, DEL = ? \
    WHERE ID_No = ' + [req.params.id], [req.params.id, htCont.CNTRNO, htCont.IMPORTER, htCont.CLIENT, htCont.SHIPPING_LINE, htCont.FRT, htCont.SOB, htCont.ETA, htCont.VESSEL, htCont.SUBMIT , htCont.RESULT, htCont.STATUS, htCont.DEL], (err, rows, fields)=>{
        if(!err)
           res.send('Updated Successfully');
        else
            console.log(err);
    })
});
