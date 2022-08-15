(function (window) {
  class Model {
    constructor(storage) {
      this.storage = storage;
    }

    create(data, callback) {
      callback = callback || function () {};

      data = {
        name: toCapitalLetter(data.name),
        surname: toCapitalLetter(data.surname),
        patronymic: toCapitalLetter(data.patronymic),
        age: calculateAge(data.age),
        sex: data.sex,
        education: data.education || "",
        status: "work",
        createdAt: new Date(),
        deletedAt: null,
      };

      this.storage.create(data, callback);
    }

    fire(id, callback) {
      const updateData = {
        deletedAt: new Date(),
        status: "del",
      };
      this.update(updateData, id, callback);
    }

    update(updateData, id, callback) {
      this.storage.update(updateData, id, callback);
    }

    read(filters, sorting, callback) {
      if (filters) {
        for (let filter in filters) {
          if (filters[filter] === "all") {
            delete filters[filter];
          }
        }
      }

      if (sorting) {
        // TODO: connect asc/desc
        sorting = app.sorters[sorting]();
      }

      this.storage.find(filters, sorting, callback);
    }

    remove(id, callback) {
      this.storage.remove(id, callback);
    }

    isValid(data) {
      if (
        data.name.trim() &&
        data.surname.trim() &&
        data.patronymic.trim() &&
        data.age.trim()
      ) {
        return true;
      }

      return false;
    }
  }

  window.app = window.app || {};
  window.app.Model = Model;
})(window);
