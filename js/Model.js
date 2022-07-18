(function (window) {
  class Model {
    constructor(storage) {
      this.storage = storage;
    }
    create = function (data, callback) {
      callback = callback || function () {};

      var tmp_date = new Date();

      var newEmployee = {
        createDate: tmp_date,
        name: capitalLetter(data["name"]),
        surname: capitalLetter(data["surname"]),
        patronymic: capitalLetter(data["patronymic"]),
        age: ga(data["age"]),
        creationTime: fd(tmp_date),
        sex: data["sex"],
        education: data["education"] || "",
        deletionTime: null,
      };

      this.storage.save(newEmployee, callback);
    };

    read = function (callback) {
      this.storage.findAll(callback);
    };

    remove = function (id, callback) {
      this.storage.remove(id, callback);
    };
    getLength = function (callback) {
      this.storage.getLength(callback);
    };
  }

  window.app = window.app || {};
  window.app.Model = Model;
})(window);
