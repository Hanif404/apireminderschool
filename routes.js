'use strict';

module.exports = function(app) {
    var controller = require('./controller');

    app.route('/').get(controller.index);
    // Referensi data
    app.route('/sekolah').get(controller.getDataSekolah);
    app.route('/mata_pelajaran/:id').get(controller.getDataMataPelajaran);
    app.route('/kelas/:id').get(controller.getDataKelas);
    app.route('/siswa/:id').get(controller.getDataSiswa);

    app.route('/loginguru').post(controller.loginGuru);
    app.route('/saveguru').post(controller.saveGuru);
};
