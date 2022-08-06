(function (window) {
  class View {
    constructor(template) {
      this.template = template;
      this.$createForm = qs(".creation__form");
      this.$emdoList = qs(".emdo__list");
      this.$employeeCounter = qs(".emdo__counter");
      this.$filterForm = qs(".additional__form");
    }

    _fireEmployee = function (id, dt) {
      var elem = qs('[data-id="' + id + '"]');
      var timediv = qs(".em__time-box", elem);

      if (timediv) {
        timediv.innerHTML = timediv.innerHTML + this.template.fireEmployee(dt);
        let lastchild = elem.lastChild;
        lastchild.style.display = "none";
      }
    };

    _sortData = function (sortName, arr) {
      switch (sortName) {
        case "alf":
          return arr.sort((first, second) => {
            var firstName = first.surname + first.name + first.patronymic;
            var secondName = second.surname + second.name + second.patronymic;
            if (firstName > secondName) {
              return 1;
            } else if (firstName < secondName) {
              return -1;
            } else {
              return 0;
            }
          });
        case "dc":
          return arr.sort((first, second) => {
            console.log(typeof new Date(first.createDate));
            var firstTime = new Date(first.createDate).getTime();
            var secondTime = new Date(second.createDate).getTime();
            if (firstTime > secondTime) {
              return 1;
            } else if (firstTime < secondTime) {
              return -1;
            } else {
              return 0;
            }
          });
        case "dd":
          return arr.sort((first, second) => {
            var firstTime = new Date(first.deletionDate).getTime() || Infinity;
            var secondTime =
              new Date(second.deletionDate).getTime() || Infinity;
            if (firstTime > secondTime) {
              return 1;
            } else if (firstTime < secondTime) {
              return -1;
            } else {
              return 0;
            }
          });
        case "wo":
          return arr;
      }
    };

    render(command, parameter) {
      var self = this;
      switch (command) {
        case "showEmployees":
          parameter.arr = self._sortData(parameter.sort || "wo", parameter.arr);
          self.$emdoList.innerHTML = self.template.show(parameter.arr);
        case "clearForm":
          self.$createForm.reset();
          break;
        case "fireEmployee":
          self._fireEmployee(parameter.id, parameter.deletionTime);
          break;
        case "employeeCounter":
          self.$employeeCounter.innerHTML =
            self.template.employeeCounter(parameter);
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
          $event(self.$createForm, "submit", callback);
          break;
        case "applyFilters":
          $event(self.$filterForm, "submit", callback);
          break;
        case "EmployeeFire":
          $ppevent(self.$emdoList, ".em__destroy", "click", function () {
            callback(self._itemId(this));
          });
      }
    };
  }
  window.app = window.app || {};
  window.app.View = View;
})(window);
