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
        name: toCapitalLetter(data["name"]),
        surname: toCapitalLetter(data["surname"]),
        patronymic: toCapitalLetter(data["patronymic"]),
        age: calculateAge(data["age"]),
        creationTime: formatDate(tmp_date),
        deletionTime: null,
        deletionDate: null,
        education: data["education"] || "",
        sex: data["sex"],
        ageText: toStringAge(calculateAge(data["age"])),
        status: "work",
      };

      this.storage.save(newEmployee, callback);
    };

    update(callback, id) {
      var deletionDate = new Date();
      var deletionTime = formatDate(deletionDate);
      const updateData = {
        deletionDate: deletionDate,
        deletionTime: deletionTime,
        status: "del",
      };
      this.storage.save(updateData, callback, id);
    }

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

    isValid(data) {
      if (
        data["name"].trim() &&
        data["surname"].trim() &&
        data["patronymic"].trim() &&
        data["age"].trim()
      ) {
        return true;
      }
      return false;
    }
  }

  window.app = window.app || {};
  window.app.Model = Model;
})(window);
