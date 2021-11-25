const goods = [{
    title: 'Shirt',
    price: 150
  },
  {
    title: 'Socks',
    price: 50
  },
  {
    title: 'Jacket',
    price: 350
  },
  {
    title: 'Shoes',
    price: 250
  },
];

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
        <a onclick="basket.add('${this.title}', '${this.price}')">add</a>
      </div>
    </div>
  </div>`;
  }
}

class Basket {
  constructor() {
    this.items = [];
  }

  add(title, price) {
    console.log(title, price)
    return this.items.push({
      title,
      price
    })
  }


  renderView() {
    let el = this.items.map(item => {
      return new ItemBasket(item).render()
    })
    document.querySelector('.modal-body').innerHTML = `<div>${el}</div>`
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

class GoodsList {
  constructor(goods) {
    this.goods = goods;
  }

  sumAllProducts() {
    let all_sum = 0
    let goodsList = this.goods.map(item => {
      all_sum += new GoodsItem(item).sumProducts()
    });
    document.querySelector('.all-sum').innerHTML = all_sum
  }

  render() {
    let goodsList = this.goods.map(item => {
      return new GoodsItem(item).render()
    });
    document.querySelector('.goods-list').innerHTML = goodsList.join(" ");
  }
}



basket = new Basket();

renderCard = new GoodsList(goods);
renderCard.sumAllProducts();
renderCard.render();