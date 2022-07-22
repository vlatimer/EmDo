(function (window) {
  class Store {
    constructor(name, callback) {
      callback = callback || function () {};
      this.dbName = name;

      if (!localStorage.getItem(name)) {
        var emdos = [];

        localStorage.setItem(name, JSON.stringify(emdos));
      }

      callback.call(this, JSON.parse(localStorage.getItem(name)));
    }
    findAll = function (callback) {
      var emdos = JSON.parse(localStorage.getItem(this.dbName));
      callback(emdos);
    };

    save = function (updateData, callback, id) {
      var emdos = JSON.parse(localStorage.getItem(this.dbName)) || [];

      callback = callback || function () {};

      if (id) {
        for (var i = 0; i < emdos.length; i++) {
          if (emdos[i].id === id) {
            for (var key in updateData) {
              emdos[i][key] = updateData[key];
            }
            break;
          }
        }
        localStorage.setItem(this.dbName, JSON.stringify(emdos));
        callback.call(this, emdos);
      } else {
        updateData.id = new Date().getTime();
        emdos.push(updateData);
        localStorage.setItem(this.dbName, JSON.stringify(emdos));
        callback.call(this, [updateData]);
      }
    };

    remove = function (id, callback) {
      var emdos = JSON.parse(localStorage.getItem(this.dbName));
      var deletionDate = new Date();
      var deletionTime = fd(deletionDate);
      for (let i = 0; i < emdos.length; i++) {
        if (emdos[i].id === id) {
          emdos[i].deletionTime = deletionTime;
          emdos[i].deletionDate = deletionDate;
          break;
        }
      }
      localStorage.setItem(this.dbName, JSON.stringify(emdos));
      callback({ id: id, deleteTime: deletionTime });
    };

    getLength = function (callback) {
      var length = JSON.parse(localStorage.getItem(this.dbName)).length;
      callback(length);
    };

    findWithFilters = function (filters, callback) {
      var emdos = JSON.parse(localStorage.getItem(this.dbName));
      // check status
      var _status = function (status, filter) {
        if (filter === "all") {
          return true;
        }
        if (filter === "work" && !status) {
          return true;
        }
        if (filter === "del" && status) {
          return true;
        }
        return false;
      };
      // check age
      var _age = function (age, filter) {
        if (filter === "all") {
          return true;
        }
        if (filter === "teen" && age < 25) {
          return true;
        }
        if (filter === "adult" && 25 <= age && age < 45) {
          return true;
        }
        if (filter === "old" && 45 <= age) {
          return true;
        }
        return false;
      };
      // check education
      var _education = function (education, filter) {
        if (filter === "all") {
          return true;
        }
        if (filter === "yes" && education) {
          return true;
        }
        if (filter === "no" && !education) {
          return true;
        }
        return false;
      };
      // check sex
      var _sex = function (sex, filter) {
        if (filter === "all") {
          return true;
        }
        if (filter === "man" && sex === "man") {
          return true;
        }
        if (filter === "woman" && sex === "woman") {
          return true;
        }
        return false;
      };
      console.log(typeof emdos);
      var emdosFilter = emdos.filter((item) => {
        if (
          _status(item.deletionTime, filters.status) &&
          _age(item.age, filters.age) &&
          _education(item.education, filters.education) &&
          _sex(item.sex, filters.sex)
        ) {
          return true;
        } else {
          return false;
        }
      });

      callback(emdosFilter);
    };
  }
  window.app = window.app || {};
  window.app.Store = Store;
})(window);
