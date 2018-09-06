'use strict';

var response = require('./res');
var connection = require('./conn');
var fs = require('fs');

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
  var sql = "SELECT id, nisn, name, '-' as status FROM siswa where id_kelas = "+ req.params.id;
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
  var sql = "INSERT INTO guru (no_identitas, name, jns_guru, foto, id_sekolah, id_kelas, mata_pelajaran, username, password) VALUES ('"+req.body.noIdentitas+"', '"+req.body.nama+"', '"+req.body.jnsGuru+"', '"+req.body.foto+"', "+req.body.idSekolah+", "+kelas+", '"+req.body.mp+"', '"+req.body.username+"', '"+req.body.password+"')";
  connection.query(sql, function (error, rows, fields){
      if(error){
          console.log(error)
      }else {
        response.ok(rows, res);
      }
  });
}

exports.loginGuru = function(req, res){
  var sql = "SELECT id, id_kelas, jns_guru, name, no_identitas, mata_pelajaran, id_sekolah FROM guru where username = '"+req.body.user+"' and password = '"+req.body.pass+"'";
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
  var sql = "SELECT nisn, name FROM siswa where id = "+ req.params.id;
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

exports.saveEvent = function(req, res){
  if(req.body.id != "0"){
    var sql = "UPDATE pengumuman SET judul='"+req.body.judul+"', isi_pengumuman='"+req.body.isi+"', tgl_mulai='"+req.body.tglMulai+"', tgl_selesai='"+req.body.tglSelesai+"', wkt_mulai='"+req.body.wktMulai+"', wkt_selesai='"+req.body.wktSelesai+"' WHERE id = "+req.body.id;
    connection.query(sql, function (error, rows, fields){
        if(error){
            console.log(error);
        }else {
          response.ok(rows, res);
        }
    });
  }else{
    var sql = "INSERT INTO pengumuman (judul, tgl_pengumuman, isi_pengumuman, tgl_mulai, tgl_selesai, wkt_mulai, wkt_selesai, id_kelas) VALUES ('"+req.body.judul+"', NOW(), '"+req.body.isi+"', '"+req.body.tglMulai+"', '"+req.body.tglSelesai+"', '"+req.body.wktMulai+"', '"+req.body.wktSelesai+"', "+req.body.kelas+")";
    connection.query(sql, function (error, rows, fields){
        if(error){
            console.log(error);
        }else {
          response.ok(rows, res);
        }
    });
  }
}

exports.dataEvent = function(req, res) {
  var sql = "SELECT judul, tgl_pengumuman, isi_pengumuman, DATE_FORMAT(tgl_mulai, '%Y-%m-%d') as tgl_mulai, DATE_FORMAT(tgl_selesai, '%Y-%m-%d') as tgl_selesai, wkt_mulai, wkt_selesai FROM pengumuman where id = "+ req.params.id;
  connection.query(sql, function (error, rows, fields){
      if(error){
          console.log(error)
      } else{
          response.ok(rows, res)
      }
  });
};

exports.getEvent = function(req, res) {
  var sql = "SELECT id, judul, DATE_FORMAT(tgl_pengumuman, '%d-%m-%Y') as tgl_pengumuman, isi_pengumuman FROM pengumuman where id_kelas = "+ req.params.id;
  connection.query(sql, function (error, rows, fields){
      if(error){
          console.log(error)
      } else{
          response.ok(rows, res)
      }
  });
};

exports.deleteEvent = function(req, res) {
  var sql = 'DELETE FROM pengumuman where id = '+ req.params.id;
  connection.query(sql, function (error, rows, fields){
      if(error){
          console.log(error)
      } else{
          response.ok(rows, res)
      }
  });
};

exports.getDaftarPr = function(req, res) {
  var sql = "SELECT pr.id, mp.name as nm_mp, kl.name as nm_kls, pr.isi_pr, DATE_FORMAT(pr.tgl_pr, '%d-%m-%Y') as tgl_pr, DATE_FORMAT(pr.tgl_selesai, '%d-%m-%Y') as tgl_selesai FROM pekerjaan_rumah pr JOIN mata_pelajaran mp ON pr.id_pelajaran = mp.id JOIN kelas kl ON pr.id_kelas = kl.id where id_guru = "+ req.params.id+" order by pr.tgl_selesai desc";
  connection.query(sql, function (error, rows, fields){
      if(error){
          console.log(error)
      } else{
          response.ok(rows, res)
      }
  });
};

exports.deletePr = function(req, res) {
  var sql = 'DELETE FROM pekerjaan_rumah where id = '+ req.params.id;
  connection.query(sql, function (error, rows, fields){
      if(error){
          console.log(error)
      } else{
          response.ok(rows, res)
      }
  });
};

exports.getIdPelajaran = function(req, res){
  var sql = "SELECT id, name FROM mata_pelajaran where name = '"+ req.params.mp +"' and id_sekolah = "+ req.params.sk;
  connection.query(sql, function (error, rows, fields){
      if(error){
          console.log(error)
      } else{
        response.ok(rows, res);
      }
  });
}

exports.savePr = function(req, res){
  if(req.body.id != "0"){
    var sql = "UPDATE pekerjaan_rumah SET id_pelajaran="+req.body.mataPelajaran+", id_kelas='"+req.body.kelas+"', isi_pr='"+req.body.isi+"', tgl_selesai='"+req.body.tglSelesai+"' WHERE id = "+req.body.id;
    connection.query(sql, function (error, rows, fields){
        if(error){
            console.log(error);
        }else {
          response.ok(rows, res);
        }
    });
  }else{
    var sql = "INSERT INTO pekerjaan_rumah (id_pelajaran, id_kelas, id_guru, isi_pr, tgl_pr, tgl_selesai) VALUES ("+req.body.mataPelajaran+", '"+req.body.kelas+"', '"+req.body.idGuru+"', '"+req.body.isi+"', NOW(), '"+req.body.tglSelesai+"')";
    connection.query(sql, function (error, rows, fields){
        if(error){
            console.log(error);
        }else {
          response.ok(rows, res);
        }
    });
  }
}

exports.dataPr = function(req, res) {
  var sql = "SELECT mp.name as nm_mp, pr.id_pelajaran, kl.name as nm_kls, pr.id_kelas, pr.isi_pr, DATE_FORMAT(pr.tgl_selesai, '%Y-%m-%d') as tgl_selesai FROM pekerjaan_rumah pr JOIN kelas kl ON pr.id_kelas = kl.id JOIN mata_pelajaran mp ON pr.id_pelajaran = mp.id where pr.id = "+ req.params.id;
  connection.query(sql, function (error, rows, fields){
      if(error){
          console.log(error)
      } else{
          response.ok(rows, res)
      }
  });
};

exports.absensi = function(req, res){
  var sql = "INSERT INTO absensi (id_siswa, id_guru, id_pelajaran, tgl_absen, is_absen) VALUES ("+req.body.siswa+", "+req.body.guru+", "+req.body.pelajaran+", NOW(), "+req.body.absen+")";
  connection.query(sql, function (error, rows, fields){
      if(error){
          console.log(error);
      }else{
        response.ok(rows, res);
      }
  });
}

exports.upload = function(req, res) {
  let fileprofile = req.files.fileprofile;
  let filename = req.files.fileprofile.name;
  fileprofile.mv(__dirname + '/file/'+ filename, function(err) {
    if(err){
        console.log(error);
    }

    res.send('File uploaded!');
  });
};

exports.updateFoto = function(req, res){
  var sql = "UPDATE guru SET foto='"+req.body.foto+"' WHERE id = "+req.body.id;
  connection.query(sql, function (error, rows, fields){
      if(error){
          console.log(error);
      }else {
        response.ok(rows, res);
      }
  });
};

exports.ambilFoto = function(req, res) {
  var options = {
    root: __dirname + '/file/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var sql = "SELECT foto FROM guru where id = "+ req.params.id;
  connection.query(sql, function (error, rows, fields){
      if(error){
          console.log(error)
      } else{
        if(rows[0].foto != ""){
          res.sendFile(rows[0].foto, options, function (err) {
            if (err) {
              console.log(err)
            }
          });
        }else{
          res.send('');
        }
      }
  });
};

exports.hapusFoto = function(req, res) {
  var path = __dirname + '/file/';

  var sql = "SELECT foto FROM guru where id = "+ req.params.id;
  connection.query(sql, function (error, rows, fields){
      if(error){
          console.log(error)
      } else{
        if(rows[0].foto != ""){
          fs.unlink(path + rows[0].foto,function(err){
              if(err) return console.log(err);
              res.send('hapus file berhasil');
           });
        }else{
          res.send('tidak ada file');
        }
      }
  });
};

// Notifikasi orangtua
exports.getNotifAbsensi = function(req, res){
  var sql = 'SELECT abs.id, mp.name AS nm_mp, gr.name as nm_gr, DATE_FORMAT(abs.tgl_absen, "%d/%m/%Y") as tgl_absen, abs.is_absen FROM absensi abs LEFT JOIN siswa sw ON abs.id_siswa = sw.id LEFT JOIN guru gr ON abs.id_guru = gr.id LEFT JOIN mata_pelajaran mp ON abs.id_pelajaran = mp.id WHERE abs.tgl_absen = CURDATE() AND sw.nisn = '+ req.params.id;
  connection.query(sql, function (error, rows, fields){
      if(error){
          console.log(error)
      } else{
        response.ok(rows, res);
      }
  });
}

exports.addOrtu = function(req, res){
  var sql = "INSERT INTO ortu (nisn, name, no_telp, alamat, id_sekolah, username, password) VALUES ('"+req.body.nisn+"', '"+req.body.nama+"', '"+req.body.noTelp+"', '"+req.body.alamat+"', "+req.body.idSekolah+", '"+req.body.username+"', '"+req.body.password+"')";
  connection.query(sql, function (error, rows, fields){
      if(error){
          console.log(error)
      }else {
        response.ok(rows, res);
      }
  });
}

exports.loginOrtu = function(req, res){
  var sql = "SELECT id, nisn, name, id_sekolah FROM ortu where username = '"+req.body.user+"' and password = '"+req.body.pass+"'";
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
