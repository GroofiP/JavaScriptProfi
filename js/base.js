const URL = "http://localhost:8026/";
const GOODS = "items.json";


const fetchAddGoods = (id) => {
  fetch(`${URL}${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  })
}

const fetchDeleteGoods = (id) => {
  fetch(`${URL}${id}`, {
    method: "DELETE"
  })
}

const fetchViewBasket = (id) => {
  return fetch(`${URL}basket`).then((responce) => {
    return responce.json()
  }).then((data) => {
    return data
  })
}

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
  props: ["basket_on"],
  data: function () {
    return {
      basket: []
    }
  },
  template: `
  <div v-if="basket_on" class="basket-list row row-cols-1 row-cols-md-2 g-4">
    <div class="basket-item"  v-for="item in basket">
      <basket-item :item="item"></basket-item>
    </div>
  </div>
  `,
  mounted() {
    fetchViewBasket().then((data) => {
      this.basket = data
    })
  }

});

Vue.component('basket-item', {
  props: ["item"],
  template: `
  <div>
    <h3>Название товара: {{item.title}}</h3>
    <h5>Цена: {{item.price}}</h5>
    <h5>Количество: {{item.quantity}}</h5>
    <button v-on:click="delete_basket(item.id)" class="btn btn-secondary">Delete</button>
  </div>  
    `,
  methods: {
    delete_basket(id) {
      fetchDeleteGoods(id)
    }
  },
});

Vue.component('good-items', {
  props: ["filtered_goods"],
  template: `
  <div class="goods-list row row-cols-1 row-cols-md-2 g-4">
    <div class="good-item" v-for="item in filtered_goods">
        <good-item :item="item"></good-item>
    </div>
  </div>
    `,
});

Vue.component('good-item', {
  props: ["item"],
  template: `
    <div>
      <h3>{{item.title}}</h3>
      <h5>{{item.price}}</h5>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis dignissimos, libero
          mollitia,
          expedita doloremque ullam accusantium alias recusandae quam odio nobis. Quis quo quidem in
          doloribus aut? Dolore, architecto repellendus!</p>
      <button v-on:click="add_basket(item.id)" class="btn btn-secondary">Add</button>
    </div>
    `,
  methods: {
    add_basket(id) {
      fetchAddGoods(id)
    }
  },
});

const app = new Vue({
  el: "#app",
  data: {
    goods: [],
    filtered_goods: [],
    searchLine: "",
    basket_on: false,
    basket: [],
  },

  mounted() {
    return service(URL, GOODS).then((data) => {
      this.goods = data;
      this.filtered_goods = data;
    });
  },

  methods: {
    filter() {
      this.filtered_goods = this.goods.filter(({
        title
      }) => {
        return new RegExp(this.searchLine, "i").test(title);
      });
    },

    showBasket() {
      return this.basket_on = true
    },

    closeBasket() {
      this.basket_on = false
    }
  },
});