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