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