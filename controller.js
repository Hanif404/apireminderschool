'use strict';

var response = require('./res');
//var connection = require('./conn');

exports.getUsers = function(req, res) {
    // connection.query('SELECT * FROM person', function (error, rows, fields){
    //     if(error){
    //         console.log(error)
    //     } else{
    //         response.ok(rows, res)
    //     }
    // });
    response.ok("mengambil data pengguna", res)
};

exports.saveUsers = function(req, res){
   response.ok("Berhasil simpan data id :"+req.body.id+", nama : "+req.body.nama, res);
}

exports.index = function(req, res) {
    response.ok("Hello from the Node JS RESTful side!", res)
};
