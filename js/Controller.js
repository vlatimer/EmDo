(function (window) {
  class Controller {
    constructor(view, model) {
      self = this;
      self.view = view;
      self.model = model;
      self.view.bind("newEmployee", this.addEmployee);
      self.view.bind("EmployeeRemove", this.removeEmployee);
    }

    addEmployee = function (event) {
      event.preventDefault();
      const data = gfd(event);
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
      self.updateEployeeCounter();
    };

    showEmployees = function () {
      // var self = this;
      self.model.read(function (data) {
        self.view.render("showEmployees", data);
      });
      self.updateEployeeCounter();
    };

    removeEmployee = function (id) {
      // var self = this;
      self.model.remove(id, function (data) {
        self.view.render("removeEmployee", data);
      });
      self.updateEployeeCounter();
    };

    startView = function () {
      // var self = this;
      self.showEmployees();
      self.updateEployeeCounter();
    };

    updateEployeeCounter = function () {
      self.model.getLength(function (data) {
        self.view.render("employeeCounter", data);
      });
    };
  }
  window.app = window.app || {};
  window.app.Controller = Controller;
})(window);
