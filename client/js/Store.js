(function (window) {
    class Store {
        constructor(callback) {
            callback = callback || function () {};
        }

        find(filters, sorting, callback) {
            if (!callback) {
                throw new Error("callback must be provided");
            }

            fetch(`http://${config.host}:${config.port}/employees`, {
                method: "GET",
            })
                .then((res) => res.json())
                .then((data) => {
                    data = data.employees;
                    if (filters) {
                        data = data.filter(function (item) {
                            let _return = true;

                            for (let key in filters) {
                                let value = filters[key];
                                if (typeof value === "function") {
                                    _return = _return && value(item[key]);
                                } else {
                                    _return = _return && item[key] === value;
                                }
                            }
                            return _return;
                        });
                    }

                    if (sorting) {
                        data = data.sort(sorting);
                    }
                    callback(data);
                })
                .catch((e) => {
                    console.error(e.message);
                });
        }

        choose(id, callback) {
            callback = callback || function () {};
            fetch(`http://${config.host}:${config.port}/employees/${id}`, {
                method: "GET",
            })
                .then((res) => res.json())
                .then((data) => {
                    callback([data]);
                })
                .catch((e) => {
                    console.error(e.message);
                });
        }

        update(updateData, id, callback) {
            callback = callback || function () {};

            fetch(`http://${config.host}:${config.port}/employees/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateData),
            })
                .then((res) => res.json())
                .then((data) => callback(data))
                .catch((e) => {
                    console.error(e.message);
                });
        }

        create(data, callback) {
            callback = callback || function () {};

            fetch(`http://${config.host}:${config.port}/employees`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((res) => {
                    return res.json();
                })
                .then((serverData) => {
                    callback(serverData);
                })
                .catch((e) => {
                    console.error(e.message);
                });
        }

        async remove(id, callback) {
            const res = await fetch(
                `http://${config.host}:${config.port}/employees/${id}`,
                {
                    method: "DELETE",
                }
            );

            callback(id);
        }
    }
    window.app = window.app || {};
    window.app.Store = Store;
})(window);
