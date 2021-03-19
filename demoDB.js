const mysql = require('mysql');
const express = require('express');

var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());
var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "r1o2n3a4l5d6",
    database: "htlog",
    multipleStatements: true
});

mysqlConnection.connect((err) =>{
    if(!err)    
    {
        /*var sql = "INSERT INTO containerslog (ID_No, CNTRNO, IMPORTER, CLIENT, SHIPPING_LINE, FRT, SOB, ETA, VESSEL, SUBMIT, RESULT, STATUS, DEL) VALUES ('1.11', 'OOCU7358131', 'HUAQIAO', '?', 'COS JHB 40', 'PRE', '2021-12/01', '2021-09/02', 'SaN CHRISTOBAL 102S', '', '', '', '')";
        mysqlConnection.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
        });*/
        mysqlConnection.query("SELECT * FROM containerslog", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
        });
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
//get all from db
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


//get a specific container
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

app.delete('/hongtong/:id', (req,res)=>{
    const id = req.params.id;
    mysqlConnection.query('DELETE FROM containerslog WHERE ID_No = ?', id, (err, rows, field) =>{
        if(!err)
            res.send('Deleted Successfully');
        else
            console.log(err);
    })
});

//changing db requires post
/*\
CALL AddEditContainer(@ID_No, @CNTRNO, @IMPORTER, @CLIENT, @SHIPPING_LINE, @FRT, \
    @SOB, @ETA, @VESSEL, @SUBMIT , @RESULT, @STATUS, @DEL)
 is for stored procedures

     "SET ; SET ; SET ; SET ; \
    SET ; SET ; SET ; SET ; SET ; \
    SET ; SET ; SET ; SET @DEL = ?; ";
*/
//Inserting a record into the DB 
app.post("/hontong/Insert", (req,res)=>{
    let htCont = req.body;

    var sql = "INSERT INTO containerslog (ID_No, CNTRNO, IMPORTER, CLIENT, SHIPPING_LINE, FRT, SOB, ETA, \
        VESSEL, SUBMIT, RESULT, STATUS, DEL) \
        VALUES (@ID_No = ?, @CNTRNO = ?, @IMPORTER = ?, @CLIENT = ?, @SHIPPING_LINE = ?, @FRT = ?, @SOB = ?, \
            @ETA = ?, @VESSEL = ?, @SUBMIT = ?, @RESULT = ?, @STATUS = ?, @DEL = ?)";
    mysqlConnection.query(sql, [htCont.ID_No, htCont.CNTRNO, htCont.IMPORTER, htCont.CLIENT, htCont.SHIPPING_LINE, htCont.FRT, htCont.SOB, htCont.ETA, htCont.VESSEL, htCont.SUBMIT , htCont.RESULT, htCont.STATUS, htCont.DEL], (err, rows, fields)=>{
        if(!err)
           console.log(rows);
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
