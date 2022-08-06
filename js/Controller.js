(function (window) {
  class Controller {
    constructor(view, model) {
      var self = this;

      self.view = view;
      self.model = model;

      self.view.bind("newEmployee", this.addEmployee.bind(this));
      self.view.bind("applyFilters", this.applyFilters.bind(this));
      self.view.bind("EmployeeFire", this.fireEmployee.bind(this));
    }

    addTestEmployee(data) {
      var self = this;
      self.model.create(data, () => {
        self.view.render("clearForm");
        self.showEmployees();
      });
      self.updateEployeeCounter();
    }

    addEmployee(event) {
      var self = this;
      event.preventDefault();
      const data = getFormData(event);

      if (self.model.isValid(data)) {
        self.model.create(data, () => {
          self.view.render("clearForm");
          self.showEmployees();
        });
      }

      self.updateEployeeCounter();
    }

    showEmployees() {
      var self = this;
      self.model.read((data) => {
        self.view.render("showEmployees", { arr: data });
      });
      self.updateEployeeCounter();
    }

    fireEmployee(id) {
      var self = this;
      self.model.update(function (data) {
        self.view.render("fireEmployee", data);
      }, id);
    }

    applyFilters(event) {
      var self = this;
      event.preventDefault();

      const { sort, ...filters } = getFormData(event);

      self.model.read(filters, (data) => {
        self.updateEployeeCounter(data);
        self.view.render("showEmployees", { sort: sort, arr: data });
      });
    }

    startView() {
      var self = this;
      self.showEmployees();
    }

    updateEployeeCounter = function (data) {
      var self = this;
      var callback = (dt) => {
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
