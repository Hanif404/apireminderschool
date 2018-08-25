'use strict';

module.exports = function(app) {
    var controller = require('./controller');

    app.route('/').get(controller.index);
    // Referensi data
    app.route('/sekolah').get(controller.getDataSekolah);
    app.route('/matapelajaran/:id').get(controller.getDataMataPelajaran);
    app.route('/idmatapelajaran/:mp/:sk').get(controller.getIdPelajaran);
    app.route('/kelas/:id').get(controller.getDataKelas);
    app.route('/outerkelas/:id/:kl').get(controller.getDataOuterKelas);
    app.route('/siswa/:id').get(controller.getDaftarSiswa);

    // Guru
    app.route('/loginguru').post(controller.loginGuru);
    app.route('/akunguru').post(controller.addGuru);
    app.route('/ahliguru/:id').get(controller.keahlianGuru);

    // Siswa
    app.route('/savesiswa').post(controller.addSiswa);
    app.route('/editsiswa').post(controller.editSiswa);
    app.route('/datasiswa/:id').get(controller.dataSiswa);
    app.route('/deletesiswa/:id').get(controller.deleteSiswa);
    app.route('/pindahsiswa/:id/:kl').get(controller.pindahSiswa);

    // Pengumuman
    app.route('/saveevent').post(controller.saveEvent);
    app.route('/event/:id').get(controller.getEvent);
    app.route('/dataevent/:id').get(controller.dataEvent);
    app.route('/deleteevent/:id').get(controller.deleteEvent);

    // Pekerjaan Rumah
    app.route('/pr/:id').get(controller.getDaftarPr);
    app.route('/deletepr/:id').get(controller.deletePr);
    app.route('/savepr').post(controller.savePr);
    app.route('/datapr/:id').get(controller.dataPr);

    app.route('/absensi').post(controller.absensi);
    
    app.route('/upload').post(controller.upload);
    app.route('/setfoto').post(controller.updateFoto);
    app.route('/getfoto/:id').get(controller.ambilFoto);
    app.route('/delfoto/:id').get(controller.hapusFoto);
};
