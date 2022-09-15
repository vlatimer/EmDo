(function (window) {
    class Emdo {
        constructor() {
            this.storage = new app.Store();
            this.template = new app.Template();
            this.view = new app.View(this.template);
            this.model = new app.Model(this.storage);
            this.controller = new app.Controller(this.view, this.model);
            this.testdata = new app.TestData(this.controller);
        }
    }
    var emdo = new Emdo();

    function setView() {
        emdo.controller.startView();
    }

    window.createTests = (count) => {
        emdo.testdata.create(count);
    };

    $event(window, "load", setView);
})(window);
