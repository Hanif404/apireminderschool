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
  var sql = "SELECT id, name FROM mata_pelajaran where id_sekolah = "+req.params.id;
  connection.query(sql, function (error, rows, fields){
      if(error){
          console.log(error)
      } else{
          response.ok(rows, res)
      }
  });
};

exports.getDataKelas = function(req, res) {
  var sql = "SELECT id, name FROM kelas where id_sekolah = "+req.params.id;
  connection.query(sql, function (error, rows, fields){
      if(error){
          console.log(error)
      } else{
          response.ok(rows, res)
      }
  });
};

exports.getDataOuterKelas = function(req, res) {
  var sql = "SELECT id, name FROM kelas where id_sekolah = "+req.params.id+" and id NOT IN ("+ req.params.kl+")";
  connection.query(sql, function (error, rows, fields){
      if(error){
          console.log(error)
      } else{
          response.ok(rows, res)
      }
  });
};

exports.getDaftarSiswa = function(req, res) {
  var sql = 'SELECT id, nisn, name FROM siswa where id_kelas = '+ req.params.id;
  connection.query(sql, function (error, rows, fields){
      if(error){
          console.log(error)
      } else{
          response.ok(rows, res)
      }
  });
};

exports.addGuru = function(req, res){
  var kelas = null;
  if(req.body.kelas != ""){
    kelas = req.body.kelas;
  }
  var sql = "INSERT INTO guru (no_identitas, name, jns_guru, foto, id_kelas, mata_pelajaran, username, password) VALUES ('"+req.body.noIdentitas+"', '"+req.body.nama+"', '"+req.body.jnsGuru+"', '"+req.body.foto+"', "+kelas+", '"+req.body.mp+"', '"+req.body.username+"', '"+req.body.password+"')";
  connection.query(sql, function (error, rows, fields){
      if(error){
          console.log(error)
      }else {
        response.ok(rows, res);
      }
  });
}

exports.loginGuru = function(req, res){
  var sql = "SELECT gr.id, id_kelas, jns_guru, gr.name, no_identitas, mata_pelajaran, kls.id_sekolah FROM guru gr LEFT JOIN kelas kls ON gr.id_kelas = kls.id where username = '"+req.body.user+"' and password = '"+req.body.pass+"'";
  connection.query(sql, function (error, rows, fields){
      if(error){
          console.log(error)
      }else{
          response.ok(rows, res)
      }
  });
}

exports.keahlianGuru = function(req, res){
  var sql = 'SELECT "Jenis Guru" as title, CASE WHEN jns_guru = 2 THEN "Wali Kelas" ELSE "Guru Pengajar" END as konten FROM guru WHERE id = '+req.params.id+' UNION SELECT "Wali Kelas" as title, kls.name as konten FROM guru gr LEFT JOIN kelas kls ON gr.id_kelas = kls.id WHERE gr.id = '+req.params.id+' AND kls.name is not null UNION SELECT "Mata Pelajaran" as title, mata_pelajaran as konten FROM guru WHERE id = '+req.params.id;
  connection.query(sql, function (error, rows, fields){
      if(error){
          console.log(error)
      }else{
          response.ok(rows, res)
      }
  });
}

exports.addSiswa = function(req, res){
  var sql = "INSERT INTO siswa (nisn, name, id_kelas) VALUES ('"+req.body.nisn+"', '"+req.body.name+"', '"+req.body.kelas+"')";
  connection.query(sql, function (error, rows, fields){
      if(error){
          console.log(error)
      }else {
        response.ok(rows, res);
      }
  });
}

exports.editSiswa = function(req, res){
  var sql = "UPDATE siswa SET nisn='"+req.body.nisn+"', name='"+req.body.name+"' WHERE id = "+req.body.id;
  connection.query(sql, function (error, rows, fields){
      if(error){
          console.log(error)
      }else {
        response.ok(rows, res);
      }
  });
}

exports.dataSiswa = function(req, res) {
  var sql = 'SELECT nisn, name FROM siswa where id = '+ req.params.id;
  connection.query(sql, function (error, rows, fields){
      if(error){
          console.log(error)
      } else{
          response.ok(rows, res)
      }
  });
};

exports.deleteSiswa = function(req, res) {
  var sql = 'DELETE FROM siswa where id = '+ req.params.id;
  connection.query(sql, function (error, rows, fields){
      if(error){
          console.log(error)
      } else{
          response.ok(rows, res)
      }
  });
};

exports.pindahSiswa = function(req, res){
  var sql = "UPDATE siswa SET id_kelas='"+req.params.kl+"' WHERE id = "+req.params.id;
  connection.query(sql, function (error, rows, fields){
      if(error){
          console.log(error)
      }else {
        response.ok(rows, res);
      }
  });
}

exports.index = function(req, res) {
    response.ok("Hello from the Node JS RESTful side!", res)
};
