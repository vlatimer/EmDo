(function (window) {
    class TestData {
        constructor(controller) {
            this.controller = controller;
        }

        getData() {
            let rnd1 = getRandomNumber(0, 5);
            let rnd2 = getRandomNumber(0, 5);
            let rnd3 = getRandomNumber(0, 5);
            let rndA = getRandomNumber(20, 45);

            let education = "";
            let sex = "man";
            let arrPatronymic;
            let arrSurname;

            if (rnd1 % 2 !== 0) {
                sex = "woman";
                arrSurname = this.surnameW;
                arrPatronymic = this.patronymicW;
            } else {
                sex = "man";
                arrSurname = this.surnameM;
                arrPatronymic = this.patronymicM;
            }

            if (rndA % 3) {
                education = "educated";
            }

            return {
                name: this.names[rnd1],
                surname: arrSurname[rnd2],
                patronymic: arrPatronymic[rnd3],
                age: `01.01.${2022 - rndA}`,
                sex: sex,
                education: education,
            };
        }

        create(iteretion) {
            for (let i = 0; i < iteretion; i++) {
                this.controller.addTestEmployee(this.getData());
            }
        }

        names = [
            "Иван",
            "Евгения",
            "Александр",
            "Виктория",
            "Ростислав",
            "Ева",
        ];

        surnameW = [
            "Иванова",
            "Соколова",
            "Cмирнова",
            "Попова",
            "Блинова",
            "Турова",
        ];

        surnameM = [
            "Иванов",
            "Cоколов",
            "Михайлов",
            "Орехов",
            "Журавлёв",
            "Субботин",
        ];

        patronymicW = [
            "Ивановна",
            "Макарова",
            "Александровна",
            "Федоровна",
            "Олеговна",
            "Георгиревна",
        ];

        patronymicM = [
            "Иванович",
            "Игоревич",
            "Владиславович",
            "Алексеевич",
            "Добрынич",
            "Васильевич",
        ];
    }

    window.app = window.app || {};
    window.app.TestData = TestData;
})(window);
