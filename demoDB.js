var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "r1o2n3a4l5d6",
  database: "htlog"
});

con.connect(function(err) {
  if (err) throw err;
  var sql = "INSERT INTO containerslog (ID_No, CNTRNO, IMPORTER, CLIENT, SHIPPING_LINE, FRT, SOB, ETA, VESSEL, SUBMIT, RESULT, STATUS, DEL) VALUES ('1.10', 'CBHU8619781', 'HUAQIAO', '?', 'COS JHB 40', 'PRE', '12/01', '09/02', 'SaN CHRISTOBAL 102S', '', '', '', '')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  con.query("SELECT * FROM containerslog", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});