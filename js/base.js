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

const app = new Vue({
  el: "#app",
  data: {
    goods: [],
    filteredGoods: [],
    searchLine: "",
    basketOn: false,
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
      return this.basketOn = true
    },

    closeBasket() {
      this.basketOn = false
    }
  },
});