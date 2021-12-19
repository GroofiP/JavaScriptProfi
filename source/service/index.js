export const fetchAddGoods = (id) => {
    fetch(`${URL}${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const fetchDeleteGoods = (id) => {
    fetch(`${URL}${id}`, {
        method: "DELETE"
    })
}

export const fetchViewBasket = (id) => {
    return fetch(`${URL}basket`).then((responce) => {
        return responce.json()
    }).then((data) => {
        return data
    })
}

export const service = function (url, goods) {
    return new Promise((resolve, reject) => {
        fetch(`${url}${goods}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                resolve(data);
            });
    });
};