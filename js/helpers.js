(function (window) {
  window.qs = function (style, scope) {
    return (scope || document).querySelector(style);
  };

  window.qsa = function (style, scope) {
    return (scope || document).querySelectorAll(style);
  };

  window.$event = function (element, type, callback) {
    element.addEventListener(type, callback);
    return;
  };

  window.getFormData = function (event) {
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

  window.formatDate = function (date) {
    var hour = date.getHours().toString().padStart(2, 0);
    var minutes = date.getMinutes().toString().padStart(2, 0);
    var seconds = date.getSeconds().toString().padStart(2, 0);

    return `${hour}:${minutes}:${seconds}`;
  };

  window.calculateAge = function (birth) {
    var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
    var birthday = new Date(birth.replace(pattern, "$3-$2-$1"));
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  window.toCapitalLetter = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // pin point event
  window.$ppevent = function (target, selector, type, callback) {
    function findElem(event) {
      var targetElement = event.target.closest(selector);
      var potentialElements = window.qsa(selector, target);
      hasIn =
        Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;
      if (hasIn) {
        callback.call(targetElement, event);
      }
    }
    window.$event(target, type, findElem);
  };

  window.parentFind = function (element, tagName) {
    if (!element.parentNode) {
      return;
    }
    if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
      return element.parentNode;
    }
    return window.parentFind(element.parentNode, tagName);
  };

  window.getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.createElementFromHTML = function (htmlString) {
    var div = document.createElement("div");
    div.innerHTML = htmlString.trim();

    return div.firstChild;
  };
})(window);
