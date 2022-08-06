(function (window) {
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

  window.createTests = (count) => {
    for (let i = 0; i < count; i++) {
      emdo.controller.addTestEmployee(helpertoCreateTests(count));
    }
  };

  function setView() {
    emdo.controller.startView();
  }
  $event(window, "load", setView);
})(window);

var helpertoCreateTests = function () {
  const names = [
    "Иван",
    "Евгения",
    "Александр",
    "Виктория",
    "Ростислав",
    "Ева",
  ];
  const surnameW = [
    "Иванова",
    "Cоколова",
    "Cмирнова",
    "Попова",
    "Блинова",
    "Турова",
  ];
  const surnameM = [
    "Иванов",
    "Cоколов",
    "Михайлов",
    "Орехов",
    "Журавлёв",
    "Субботин",
  ];
  const patronymicW = [
    "Ивановна",
    "Макарова",
    "Александровна",
    "Федоровна",
    "Олеговна",
    "Георгиревна",
  ];
  const patronymicM = [
    "Иванович",
    "Игоревич",
    "Владиславович",
    "Алексеевич",
    "Добрынич",
    "Васильевич",
  ];
  const ages = [
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
    39, 40, 41, 42, 43, 44, 45, 46,
  ];

  const rnd1 = getRandomNumber(0, 5);
  const rndA = getRandomNumber(0, 25);
  const rnd2 = getRandomNumber(0, 5);

  var sex = "man";
  var arrS = surnameM;
  var arrP = patronymicM;
  let education = "";

  if (rnd1 % 2 !== 0) {
    sex = "woman";
    arrS = surnameW;
    arrP = patronymicW;
  }
  if (rndA % 3 === 0) {
    education = "educated";
  }
  const obj = {
    name: names[rnd1],
    surname: arrS[rnd2],
    patronymic: arrP[rnd2],
    age: `01.01.${2022 - ages[rndA]}`,
    sex: sex,
    education: education,
  };
  return obj;
};
