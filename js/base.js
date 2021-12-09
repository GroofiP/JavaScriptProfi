const URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/";
const GOODS = "catalogData.json";
const GOODS_BASKET = "getBasket.json";

const reformData = (items) => {
  return items.map(({
    id_product,
    product_name,
    price
  }) => {
    return {
      id: id_product,
      title: product_name,
      price: price,
      quantity: 1,
    };
  });
};

const service = function (url, goods) {
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

Vue.component('search', {
  props: ["searchLine", "filter"],
  template: `
  <div>
    <input type="text" :searchLine="searchLine" v-on:input="$emit('input', $event.target.value)">
    <button class="btn btn-secondary" id="searchLine" @click="$emit('filter')">Искать</button>
  </div>
  `,
}, );

Vue.component('basket-list', {
  props: ["basket_on", "basket"],
  template: `
  <div v-if="basket_on" class="basket-list row row-cols-1 row-cols-md-2 g-4">
    <div class="basket-item"  v-for="item in basket">
      <basket-item :item="item"></basket-item>
    </div>
  </div>
  `
});

Vue.component('basket-item', {
  props: ["item"],
  template: `
  <div>
    <h3>Название товара: {{item.title}}</h3>
    <h5>Цена: {{item.price}}</h5>
    <h5>Количество: {{item.quantity}}</h5>
  </div>  
    `
});

const app = new Vue({
  el: "#app",
  data: {
    goods: [],
    filteredGoods: [],
    searchLine: "",
    basket_on: false,
    basket: [],
  },

  mounted() {
    return service(URL, GOODS).then((data) => {
      const result = reformData(data);
      this.goods = result;
      this.filteredGoods = result;
    });
  },

  methods: {
    filter() {
      this.filteredGoods = this.goods.filter(({
        title
      }) => {
        return new RegExp(this.searchLine, "i").test(title);
      });
    },
    addBasket({
      id,
      ...rest
    }) {
      if (this.basket == false) {
        this.basket.push({
          id,
          ...rest,
        });
      } else {
        let is_active = false;
        this.basket.map((basketProduct) => {
          console.log(basketProduct);
          if (basketProduct.id == id) {
            is_active = true;
            return (basketProduct.quantity = +basketProduct.quantity + 1);
          }
        });
        if (is_active == false) {
          return this.basket.push({
            id,
            ...rest,
          });
        }
      }
    },

    showBasket() {
      return this.basket_on = true
    },

    closeBasket() {
      this.basket_on = false
    }
  },
});