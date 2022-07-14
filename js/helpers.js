(function (window) {
  window.qs = function (style) {
    return document.querySelector(style);
  };
  window.qsa = function (style) {
    return document.querySelectorAll(style);
  };
  window.$event = function (element, type, callback) {
    console.log(element);
    element.addEventListener(type, callback);
    return;
  };
  //get form data
  window.gfd = function (event) {
    const formData = new FormData(event.target);
    var alldata = (formData) => {
      const obj = {};

      for (let key of formData.keys()) {
        obj[key] = formData.get(key);
      }

      return obj;
    };
    const data = alldata(formData);
    return data;
  };
  // forming date
  window.fd = function (date) {
    var hour = date.getHours().toString().padStart(2, 0);
    var minutes = date.getMinutes().toString().padStart(2, 0);
    var seconds = date.getSeconds().toString().padStart(2, 0);

    return `${hour}:${minutes}:${seconds}`;
  };
  // get age
  window.ga = function (birth) {
    var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
    var birthday = new Date(birth.replace(pattern, "$3-$2-$1"));
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };
  window.capitalLetter = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
})(window);
