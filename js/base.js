const reformData = (items) => {
  return items.map(({
    product_name,
    ...rest
  }) => {
    return {
      ...rest,
      title: product_name
    }
  })
}

const reformDataBasket = (items) => {
  return items.contents.map(({
    product_name,
    price
  }) => {
    return {
      title: product_name,
      price: price
    }
  });
}

const URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/"
const GOODS = "catalogData.json"
const GOODS_BASKET = "getBasket.json"

const service = function (url, goods) {
  return new Promise((resolve, reject) => {
    fetch(`${url}${goods}`).then((res) => {
      return res.json();
    }).then((data) => {
      resolve(data)
    })
  })
}

class GoodsItem {
  constructor({
    title,
    price
  }) {
    this.title = title;
    this.price = price;
  }

  sumProducts() {
    return this.price
  }

  render() {
    return `<div class="col">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${this.title}</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <h5 class="card-price">${this.price}</h5>
        <a class="btn btn-secondary" onclick="basket.add('${this.title}', '${this.price}')">add</a>
      </div>
    </div>
  </div>`;
  }
}


class GoodsList {
  constructor() {
    this.goods = [];
  }

  setGoods() {
    return service(URL, GOODS).then((data) => {
      return reformData(data)
    });
  }

  sumAllProducts() {
    let all_sum = 0
    this.goods.map(item => {
      all_sum += new GoodsItem(item).sumProducts()
    });
    document.querySelector('.all-sum').innerHTML = all_sum
  }

  render() {
    this.setGoods().then((data) => {
      this.goods = data
      let goodsList = this.goods.map(item => {
        return new GoodsItem(item).render()
      });
      document.querySelector('.goods-list').innerHTML = goodsList.join(" ");

    })

  }
}


class Basket {
  constructor() {
    this.items = [];
    this.goods = [];
  }

  add(title, price) {
    return this.items.push({
      title,
      price
    })
  }

  sumAllProducts() {
    let all_sum = 0
    this.goods.map(item => {
      all_sum += new GoodsItem(item).sumProducts()
    });

    this.items.map(item => {
      all_sum += +(new GoodsItem(item).sumProducts())
    });
    document.querySelector('.all-sum-basket').innerHTML = `Стоимость коризны: ${all_sum}`
  }

  setGoods() {
    return service(URL, GOODS_BASKET).then((data) => {
      return reformDataBasket(data)
    });
  }


  renderView() {
    this.setGoods().then((data) => {
      this.goods = data
      let goodsList = this.goods.map(item => {
        return new ItemBasket(item).render()
      });
      let el = this.items.map(item => {
        return new ItemBasket(item).render()
      })
      document.querySelector('.modal-body').innerHTML = goodsList.join(" ");
      document.querySelector('.modal-body').innerHTML += el.join(" ")
      this.sumAllProducts()
    })
    /*     let el = this.items.map(item => {
          return new ItemBasket(item).render()
        })
        document.querySelector('.modal-body').innerHTML = `<div>${el}</div>` */
  }
}

class ItemBasket {
  constructor({
    title,
    price
  }) {
    this.title = title;
    this.price = price;
  }

  render() {
    return `<div class="col">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">${this.title}</h5>
                  <h5 class="card-price">${this.price}</h5>
                </div>
              </div>
            </div>`;

  }

}


basket = new Basket();

renderCard = new GoodsList();

renderCard.render();
setTimeout(() => {
  renderCard.sumAllProducts();
}, 1000)