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