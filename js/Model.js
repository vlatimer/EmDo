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
        deletionTime: null,
        deletionDate: null,
        education: data["education"] || "",
        sex: data["sex"],
        ageText: atc(ga(data["age"])),
        status: "work",
      };

      this.storage.save(newEmployee, callback);
    };

    read = function (data, callback) {
      var dataType = typeof data;
      callback = callback || function () {};
      if (dataType === "function") {
        callback = data;
        this.storage.findAll(callback);
      } else {
        const filtersObj = {};
        for (let filter in data) {
          if (data[filter] !== "all") {
            filtersObj[filter] = data[filter];
          }
        }
        this.storage.find(filtersObj, callback);
      }
    };

    remove = function (id, callback) {
      this.storage.remove(id, callback);
    };
    getLength = function (data, callback) {
      var dataType = typeof data;
      callback = callback || function () {};

      if (dataType === "function") {
        callback = data;
        this.storage.getLength(callback);
      } else {
        return callback(data.length);
      }
    };
  }

  window.app = window.app || {};
  window.app.Model = Model;
})(window);
