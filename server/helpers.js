const fs = require("fs");

const BASKET_ITEMS = "./static/basket.json"
const GOODS_ITEMS = "./static/items.json"

const writeAllFromFile = (data) => new Promise((resolve, reject) => {
    console.log(data)
    if (data[0] == false) {
        fs.writeFile("./static/basket.json", JSON.stringify([]), (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    } else {
        fs.writeFile("./static/basket.json", JSON.stringify(data), (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    }

})

const readAllFromFile = (path) => new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (err, data) => {
        if (err) {
            reject(err);
        } else {
            resolve(JSON.parse(data));
        }
    })
})

const addGood = (id) => new Promise((resolve, reject) => {
    try {
        readAllFromFile(BASKET_ITEMS).then((_items) => {
            let items = [..._items]
            if (items.some((item) => {
                    return item.id == id;
                })) {
                items = items.map((item) => {
                    if (item.id == id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        }
                    } else {
                        return item;
                    }
                })
            } else {
                items.push({
                    id,
                    quantity: 1
                })
            }
            writeAllFromFile(items).then(() => {
                resolve(items)
            })
        })
    } catch (err) {
        console.log(err);
        reject(err)
    }
})

const deleteGood = (id) => new Promise((resolve, reject) => {
    try {
        readAllFromFile(BASKET_ITEMS).then((_items) => {
            let items = [..._items]
            items = items.map((item) => {
                if (item.id == id) {
                    let quantity = item.quantity - 1
                    if (quantity == 0) {
                        return 0
                    } else {
                        return {
                            ...item,
                            quantity: item.quantity - 1
                        }
                    }
                } else {
                    return item;
                }
            })
            let first = items.includes(0)
            if (first) {
                items.splice(first, 1)
            }
            writeAllFromFile(items).then(() => {
                resolve(items)
            })
        })
    } catch (err) {
        console.log(err);
        reject(err)
    }
})

const readBasket = () => new Promise((resolve, reject) => {
    Promise.all([readAllFromFile(BASKET_ITEMS), readAllFromFile(GOODS_ITEMS)]).then(([basketItems, goodsItems]) => {
        const result = basketItems.map((item) => {
            const gItems = goodsItems.find(({
                id: _id
            }) => {
                return _id == item.id;
            });
            if (gItems) {
                return {
                    ...item,
                    ...gItems
                }
            } else {
                item
            }
        })
        resolve(result)
    })
})

readBasket().then((data) => {

    console.log(data)
});

module.exports = {
    addGood,
    readBasket,
    deleteGood
}