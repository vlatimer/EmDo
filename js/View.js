(function (window) {
  class View {
    constructor(template) {
      this.template = template;
      this.$createForm = qs(".creation__form");
      this.$emdoList = qs(".emdo__list");
    }
    bind = function (command, callback) {
      switch (command) {
        case "newEmployee":
          $event(this.$createForm, "submit", callback);
          break;
      }
    };
    render(command, parameter) {
      switch (command) {
        case "showEmployees":
          this.$emdoList.innerHTML = this.template.show(parameter);
        case "clearForm":
          this.$createForm.reset();
          break;
      }
    }
  }
  window.app = window.app || {};
  window.app.View = View;
})(window);
