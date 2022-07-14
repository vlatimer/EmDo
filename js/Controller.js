(function (window) {
  class Controller {
    constructor(view, model) {
      this.view = view;
      this.model = model;
      self = this;
      this.view.bind("newEmployee", this.addEmployee);
    }

    addEmployee = function (event) {
      event.preventDefault();
      const data = gfd(event);
      console.log(self);
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
    };

    showEmployees = function () {
      self.model.read(function (data) {
        self.view.render("showEmployees", data);
      });
    };

    startView = function () {
      self.showEmployees();
    };
  }
  window.app = window.app || {};
  window.app.Controller = Controller;
})(window);
