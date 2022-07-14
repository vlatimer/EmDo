(function (window) {
  class Template {
    constructor() {
      this.defaultTemplate =
        '<div class="em" data-id={{id}}>' +
        '<div class="em__header-box">' +
        '<h2 class="em__header">{{surname}}</h2>' +
        '<h2 class="em__header">{{name}}</h2>' +
        '<h2 class="em__header">{{patronymic}}</h2>' +
        '<p class="em__date">Возраст: {{age}} лет</p>' +
        "</div>" +
        '<div class="em__time-box">' +
        '<div class="em__time-create em__block">' +
        '<i class="fa-solid fa-clock-rotate-left fa-2x"></i>' +
        "<p>{{creationTime}}</p>" +
        "</div>" +
        '<div class="{{visible?}} em__time-delete em__block">' +
        '<i class="fa-solid fa-clock-rotate-left fa-2x"></i>' +
        "<p>{{deleteTime}}</p>" +
        "</div>" +
        "</div>" +
        '<div class="em__sex-{{sex}} em__block">' +
        "{{iconSex}}" +
        "<p>{{sexName}}</p>" +
        "</div>" +
        '<div class="{{educated?}} em__education em__block">' +
        '<i class="fa-solid fa-building-columns fa-2x"></i>' +
        "<p>Высшее образование</p>" +
        "</div>" +
        '<button class="em__destroy"><i class="fa-solid fa-user-minus fa-2x"></i></button>' +
        "</div>";
    }
    show = function (data) {
      var i, l;
      var view = "";

      for (i = 0, l = data.length; i < l; i++) {
        var template = this.defaultTemplate;
        // detected if item is deleted
        if (!data[i].deletionTime) {
          template = template.replace("{{visible?}}", "unvisible");
        }
        // detected if item gender is man or woman
        if (data[i].sex === "man") {
          template = template.replace("{{sexName}}", "Мужчина");
          template = template.replace(
            "{{iconSex}}",
            '<i class="fa-solid fa-mars fa-2x"></i>'
          );
        } else {
          template = template.replace("{{sexName}}", "Женщина");
          template = template.replace(
            "{{iconSex}}",
            '<i class="fa-solid fa-venus fa-2x"></i>'
          );
        }
        //checking if person educated
        if (data[i].education) {
          template = template.replace("{{educated?}}", "visible");
        }

        template = template.replace("{{id}}", data[i].id);
        template = template.replace("{{name}}", data[i].name);
        template = template.replace("{{surname}}", data[i].surname);
        template = template.replace("{{patronymic}}", data[i].patronymic);
        template = template.replace("{{age}}", data[i].age);
        template = template.replace("{{creationTime}}", data[i].creationTime);
        template = template.replace("{{deletionTime}}", data[i].deletionTime);
        template = template.replace("{{sex}}", data[i].sex);
        template = template.replace("{{educated?}}", "unvisible");

        view = view + template;
      }
      return view;
    };
  }
  window.app = window.app || {};
  window.app.Template = Template;
})(window);
