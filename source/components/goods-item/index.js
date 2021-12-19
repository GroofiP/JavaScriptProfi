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