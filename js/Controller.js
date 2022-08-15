(function (window) {
  class Controller {
    constructor(view, model) {
      this.view = view;
      this.model = model;

      this.view.bind("newEmployee", this.addEmployee.bind(this));
      this.view.bind("applyFilters", this.applyFilters.bind(this));
      this.view.bind("EmployeeFire", this.fireEmployee.bind(this));
    }

    addTestEmployee(data) {
      this.model.create(data, () => {
        this.view.render("clearForm");
        this.showEmployees();
      });
    }

    addEmployee(event) {
      event.preventDefault();
      const data = getFormData(event);

      if (this.model.isValid(data)) {
        this.model.create(data, () => {
          this.view.render("clearForm");
          this.showEmployees();
        });
      }
    }

    showEmployees() {
      this.model.read(null, null, (data) => {
        this.view.render("showEmployees", { arr: data });
        this.view.render("employeeCounter", data.length);
      });
    }

    fireEmployee(id) {
      this.model.fire(id, (data) => {
        this.view.render("fireEmployee", data);
      });
    }

    applyFilters(event) {
      event.preventDefault();

      const { sorting, ...filters } = getFormData(event);
      this.model.read(filters, sorting, (data) => {
        this.view.render("showEmployees", { arr: data });
        this.view.render("employeeCounter", data.length);
      });
    }

    startView() {
      this.showEmployees();
    }
  }

  window.app = window.app || {};
  window.app.Controller = Controller;
})(window);
