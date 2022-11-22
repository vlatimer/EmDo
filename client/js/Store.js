(function (window) {
    class Store {
        constructor(callback) {
            callback = callback || function () {};
        }

        async find(filters, sorting, callback) {
            if (!callback) {
                throw new Error("callback must be provided");
            }
            const res = await fetch(
                `http://${config.host}:${config.port}/employees`,
                {
                    method: "GET",
                }
            );

            let data = (await res.json()).employees;

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
        }

        async update(updateData, id, callback) {
            const res = await fetch(
                `http://${config.host}:${config.port}/employees/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updateData),
                }
            );

            const data = await res.json();
            callback = callback || function () {};

            callback(data);
        }

        async create(data, callback) {
            callback = callback || function () {};

            const res = await fetch(
                `http://${config.host}:${config.port}/employees`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            const serverData = await res.json();

            callback(serverData);
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
