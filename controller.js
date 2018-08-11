'use strict';

var response = require('./res');
var connection = require('./conn');

exports.getDataSekolah = function(req, res) {
  var sql = 'SELECT id, name FROM sekolah';
  connection.query(sql, function (error, rows, fields){
      if(error){
          console.log(error)
      } else{
          response.ok(rows, res)
      }
  });
};

exports.getDataMataPelajaran = function(req, res) {
  var sql = 'SELECT id, name FROM mata_pelajaran where id_sekolah = '+ req.params.id;
  connection.query(sql, function (error, rows, fields){
      if(error){
          console.log(error)
      } else{
          response.ok(rows, res)
      }
  });
};

exports.getDataKelas = function(req, res) {
  var sql = 'SELECT id, name FROM kelas where id_sekolah = '+ req.params.id;
  connection.query(sql, function (error, rows, fields){
      if(error){
          console.log(error)
      } else{
          response.ok(rows, res)
      }
  });
};

exports.getDataSiswa = function(req, res) {
  var sql = 'SELECT id, nisn, name FROM siswa where id_kelas = '+ req.params.id;
  connection.query(sql, function (error, rows, fields){
      if(error){
          console.log(error)
      } else{
          response.ok(rows, res)
      }
  });
};

exports.saveGuru = function(req, res){
  var sql = "INSERT INTO guru (no_identitas, name, jns_guru, foto, id_kelas, mata_pelajaran, username, password) VALUES ('"+req.body.noIdentitas+"', '"+req.body.nama+"', '"+req.body.jnsGuru+"', '"+req.body.foto+"', '"+req.body.kelas+"', '"+req.body.mp+"', '"+req.body.username+"', '"+req.body.password+"')";
  connection.query(sql, function (error, rows, fields){
      if(error){
          console.log(error)
      }
  });
}

exports.loginGuru = function(req, res){
  var sql = "SELECT id, no_identitas, name FROM guru where username = '"+req.body.user+"' and password = '"+req.body.pass+"'";
  connection.query(sql, function (error, rows, fields){
      if(error){
          console.log(error)
      }else{
          response.ok(rows, res)
      }
  });
}

exports.index = function(req, res) {
    response.ok("Hello from the Node JS RESTful side!", res)
};
