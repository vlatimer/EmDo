(function () {
  class Emdo {
    constructor(name) {
      this.storage = new app.Store(name);
      this.template = new app.Template();
      this.view = new app.View(this.template);
      this.model = new app.Model(this.storage);
      this.controller = new app.Controller(this.view, this.model);
    }
  }
  var emdo = new Emdo("emdo-storage");

  function setView() {
    emdo.controller.startView();
  }
  $event(window, "load", setView);
})();
