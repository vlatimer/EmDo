(function (window) {
  function byAge(sortOrder) {
    return (a, b) => {
      a = a.age;
      b = b.age;

      if (a > b) {
        return sortOrder === "DESC" ? -1 : 1;
      }

      if (a < b) {
        return sortOrder === "DESC" ? 1 : -1;
      }
      return 0;
    };
  }

  function byFullName(sortOrder) {
    const fullName = (item) => item.surname + item.name + item.patronymic;

    return (a, b) => {
      a = fullName(a);
      b = fullName(b);

      if (sortOrder === "DESC") {
        return b.localeCompare(a);
      } else {
        return a.localeCompare(b);
      }
    };
  }

  function byTimeCreated(sortOrder) {
    const fullTimeCreate = (item) => {
      let createdAt = item.createdAt;

      if (typeof createdAt === "string") {
        createdAt = new Date(createdAt);
      }

      return createdAt.getTime();
    };

    return (a, b) => {
      a = fullTimeCreate(a);
      b = fullTimeCreate(b);

      if (a > b) {
        return sortOrder === "DESC" ? -1 : 1;
      }

      if (a < b) {
        return sortOrder === "DESC" ? 1 : -1;
      }
      return 0;
    };
  }

  function byTimeDeleted(sortOrder) {
    const fullTimeDelete = (item) => {
      let deletedAt = item.deletedAt;

      if (typeof deletedAt === "string") {
        deletedAt = new Date(deletedAt);
      }

      return deletedAt ? deletedAt.getTime() : Infinity;
    };

    return (a, b) => {
      a = fullTimeDelete(a);
      b = fullTimeDelete(b);

      if (a > b) {
        return sortOrder === "DESC" ? -1 : 1;
      }

      if (a < b) {
        return sortOrder === "DESC" ? 1 : -1;
      }
      return 0;
    };
  }

  window.app = window.app || {};
  window.app.sorters = {
    byAge,
    byFullName,
    byTimeCreated,
    byTimeDeleted,
  };
})(window);
