(function (window) {
  class Controller {
    constructor(view, model) {
      self = this;
      self.view = view;
      self.model = model;
      self.view.bind("newEmployee", this.addEmployee);
      self.view.bind("newFilters", this.addFilters);
      self.view.bind("EmployeeRemove", this.removeEmployee);
    }

    addEmployee = function (event, test) {
      if (!test) {
        event.preventDefault();
        const data = gfd(event);
        console.log(data);
        if (
          data["name"].trim() &&
          data["surname"].trim() &&
          data["patronymic"].trim() &&
          data["age"].trim()
        ) {
          self.model.create(data, function () {
            self.view.render("clearForm");
            self.showEmployees();
          });
        }
      } else {
        self.model.create(test, function () {
          self.view.render("clearForm");
          self.showEmployees();
        });
      }
      self.updateEployeeCounter();
    };

    showEmployees = function () {
      // var self = this;
      self.model.read(function (data) {
        self.view.render("showEmployees", { arr: data });
      });
      self.updateEployeeCounter();
    };

    removeEmployee = function (id) {
      // var self = this;
      self.model.remove(id, function (data) {
        self.view.render("removeEmployee", data);
      });
    };
    addFilters = function (event) {
      event.preventDefault();
      const { sort, ...filters } = gfd(event);
      self.model.read(filters, function (data) {
        self.updateEployeeCounter(data);
        self.view.render("showEmployees", { sort: sort, arr: data });
      });
    };
    startView = function () {
      // var self = this;
      self.showEmployees();
    };

    updateEployeeCounter = function (data) {
      var callback = function (dt) {
        self.view.render("employeeCounter", dt);
      };
      if (!data) {
        self.model.getLength(callback);
      } else {
        self.model.getLength(data, callback);
      }
    };
  }
  window.app = window.app || {};
  window.app.Controller = Controller;
})(window);
