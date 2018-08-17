'use strict';

module.exports = function(app) {
    var controller = require('./controller');

    app.route('/').get(controller.index);
    // Referensi data
    app.route('/sekolah').get(controller.getDataSekolah);
    app.route('/matapelajaran/:id').get(controller.getDataMataPelajaran);
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
};
