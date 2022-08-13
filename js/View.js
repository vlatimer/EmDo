(function (window) {
  class View {
    constructor(template) {
      this.template = template;
      this.$createForm = qs(".creation__form");
      this.$emdoList = qs(".emdo__list");
      this.$employeeCounter = qs(".emdo__counter");
      this.$filterForm = qs(".additional__form");
    }

    _fireEmployee = function (data) {
      var elem = qs('[data-id="' + data.id + '"]');

      if (data.deletedAt) {
        elem.replaceWith(
          createElementFromHTML(this.template.fireEmployee(data))
        );
      }
    };

    render(command, parameter) {
      switch (command) {
        case "showEmployees":
          this.$emdoList.innerHTML = this.template.show(parameter.arr);
        case "clearForm":
          this.$createForm.reset();
          break;
        case "fireEmployee":
          this._fireEmployee(parameter);
          break;
        case "employeeCounter":
          this.$employeeCounter.innerHTML =
            this.template.employeeCounter(parameter);
      }
    }

    _itemId = function (element) {
      var div = parentFind(element, "div");
      return parseInt(div.dataset.id, 10);
    };

    bind = function (command, callback) {
      var self = this;
      switch (command) {
        case "newEmployee":
          $event(this.$createForm, "submit", callback);
          break;
        case "applyFilters":
          $event(this.$filterForm, "submit", callback);
          break;
        case "EmployeeFire":
          $ppevent(this.$emdoList, ".em__destroy", "click", function () {
            callback(self._itemId(this));
          });
      }
    };
  }
  window.app = window.app || {};
  window.app.View = View;
})(window);
