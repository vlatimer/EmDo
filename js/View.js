(function (window) {
  class View {
    constructor(template) {
      this.template = template;
      this.$createForm = qs(".creation__form");
      this.$emdoList = qs(".emdo__list");
    }
    itemId = function (element) {
      var div = parentFind(element, "div");
      return parseInt(div.dataset.id, 10);
    };

    bind = function (command, callback) {
      var self = this;
      switch (command) {
        case "newEmployee":
          $event(this.$createForm, "submit", callback);
          break;
        case "EmployeeRemove":
          $ppevent(self.$emdoList, ".em__destroy", "click", function () {
            callback(self.itemId(this));
          });
      }
    };

    _removeEmployee = function (id, dt) {
      var elem = qs('[data-id="' + id + '"]');
      var timediv = qs(".em__time-box", elem);

      if (timediv) {
        this.template.removeEmployee(timediv, dt);
        this.template.hidedestroyButton(elem);
      }
    };

    render(command, parameter) {
      var self = this;
      switch (command) {
        case "showEmployees":
          self.$emdoList.innerHTML = self.template.show(parameter);
        case "clearForm":
          self.$createForm.reset();
          break;
        case "removeEmployee":
          self._removeEmployee(parameter.id, parameter.deleteTime);
          break;
      }
    }
  }
  window.app = window.app || {};
  window.app.View = View;
})(window);
