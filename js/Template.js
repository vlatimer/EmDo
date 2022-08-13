(function (window) {
  class Template {
    constructor() {
      this.defaultTemplate = (employee) => `
        <div class="em" data-id={{id}}>
          <div class="em__header-box">
            <h2 class="em__header">{{surname}}</h2>
            <h2 class="em__header">{{name}}</h2>
            <h2 class="em__header">{{patronymic}}</h2>
            <p class="em__date">Возраст: {{age}} лет</p>
          </div>
          <div class="em__time-box">
            <div class="em__time-create em__block">
              <i class="fa-solid fa-clock-rotate-left fa-2x"></i>
              <p>{{creationTime}}</p>
            </div>
              ${
                employee.deletedAt
                  ? `<div class="em__time-delete em__block">
                        <i class="fa-solid fa-clock-rotate-left fa-2x"></i>
                        <p>{{deletionTime}}</p>
                      </div>`
                  : ""
              }
          </div>
          <div class="em__sex-{{sex}} em__block">
            ${
              employee.sex === "man"
                ? `<i class="fa-solid fa-mars fa-2x"></i>`
                : `<i class="fa-solid fa-venus fa-2x"></i>`
            }
            <p>{{sexName}}</p>
          </div>
          ${
            employee.education
              ? `<div class = "em__education em__block">
                    <i class="fa-solid fa-building-columns fa-2x"></i>
                    <p>Высшее образование</p>
                </div>`
              : ""
          }
          ${
            employee.deletedAt
              ? ""
              : `<button class="em__destroy"><i class="fa-solid fa-user-minus fa-2x"></i></button>`
          }
        </div>`;
    }

    show(data, temp) {
      var i, l;
      var view = "";

      for (i = 0, l = data.length; i < l; i++) {
        var template = temp || this.defaultTemplate(data[i]);

        if (data[i].sex === "man") {
          template = template.replace("{{sexName}}", "Мужчина");
        } else {
          template = template.replace("{{sexName}}", "Женщина");
        }

        template = template.replace("{{id}}", data[i].id);
        template = template.replace("{{name}}", data[i].name);
        template = template.replace("{{surname}}", data[i].surname);
        template = template.replace("{{patronymic}}", data[i].patronymic);
        template = template.replace("{{age}}", data[i].age);
        template = template.replace("{{creationTime}}", data[i].creationTime);
        template = template.replace("{{deletionTime}}", data[i].deletionTime);
        template = template.replace("{{sex}}", data[i].sex);

        view = view + template;
      }
      return view;
    }

    fireEmployee(data) {
      var template = this.defaultTemplate(data);

      return this.show([data], template);
    }

    employeeCounter(count) {
      const withoutEnding = [11, 12, 13, 14, 111, 1111];
      var plural;
      if (count === 1) {
        plural = "";
      } else if (withoutEnding.indexOf(count) >= 0) {
        plural = "ов";
      } else if (
        ["2", "3", "4"].indexOf(
          count.toString()[count.toString().length - 1]
        ) >= 0
      ) {
        plural = "а";
      } else {
        plural = "ов";
      }
      if (count !== 0) {
        return count + " Сотрудник" + plural;
      }
      return "";
    }
  }
  window.app = window.app || {};
  window.app.Template = Template;
})(window);
