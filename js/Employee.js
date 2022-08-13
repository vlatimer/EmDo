(function (window) {
  class Employee {
    constructor(data) {
      this.id = data.id;
      this.name = data.name;
      this.surname = data.surname;
      this.patronymic = data.patronymic;
      this.age = data.age;
      this.sex = data.sex;
      this.education = data.education;

      this.status = data.status;
      this.createdAt =
        typeof data.createdAt === "string"
          ? new Date(data.createdAt)
          : data.createdAt;
      this.deletedAt =
        typeof data.deletedAt === "string"
          ? new Date(data.deletedAt)
          : typeof data.deletedAt === null
          ? null
          : new Date();
    }

    get fullName() {
      return this.surname + this.name + this.patronymic;
    }

    get creationTime() {
      return formatDate(this.createdAt);
    }

    get deletionTime() {
      return this.deletedAt ? formatDate(this.deletedAt) : "";
    }

    get fullTimeCreate() {
      return this.createdAt.getTime();
    }

    get fullTimeDelete() {
      return this.deletedAt ? this.deletedAt.getTime() : null;
    }
    get ageText() {
      return toStringAge(this.age);
    }

    toDbData() {
      return {
        id: this.id,
        name: this.name,
        surname: this.surname,
        patronymic: this.patronymic,
        age: this.age,
        sex: this.sex,
        education: this.education,
        status: this.status,
        createdAt: this.createdAt,
        deletedAt: this.deletedAt,
      };
    }

    static build(data) {
      return new this({
        id: new Date().getTime() - getRandomNumber(1, 10000),
        name: toCapitalLetter(data.name),
        surname: toCapitalLetter(data.surname),
        patronymic: toCapitalLetter(data.patronymic),
        age: calculateAge(data.age),
        sex: data.sex,
        education: data.education || "",
        status: "work",
        createdAt: new Date(),
        deletedAt: null,
      });
    }

    static isValid(data) {
      if (
        data.name.trim() &&
        data.surname.trim() &&
        data.patronymic.trim() &&
        data.age.trim()
      ) {
        return true;
      }
      return false;
    }
  }
  window.app = window.app || {};
  window.app.Employee = Employee;
})(window);

//   var newEmployee = {
//     //need for filters
//     //need for sort
//     fullTimeCreate: tmp_date.getTime(),
//     fullTimeDelete: null,
//   };
