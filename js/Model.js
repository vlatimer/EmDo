(function (window) {
  class Model {
    constructor(storage) {
      this.storage = storage;
    }

    create = function (data, callback) {
      callback = callback || function () {};

      this.storage.create(data, callback);
    };

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

    read = function (data, callback) {
      const filtersObj = {};

      for (let filter in data.filters) {
        if (data.filters[filter] !== "all") {
          filtersObj[filter] = data.filters[filter];
        }
      }
      const orderQuery = data.sort;
      this.storage.find(filtersObj, orderQuery, callback);
    };

    remove = function (id, callback) {
      this.storage.remove(id, callback);
    };
  }

  window.app = window.app || {};
  window.app.Model = Model;
})(window);
