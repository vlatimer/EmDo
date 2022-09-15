(function (window) {
  function teen(age) {
    return age < 25;
  }
  function adult(age) {
    return 25 <= age && age < 45;
  }
  function old(age) {
    return 45 <= age;
  }

  window.app = window.app || {};
  window.app.filters = {
    adult,
    teen,
    old,
  };
})(window);
