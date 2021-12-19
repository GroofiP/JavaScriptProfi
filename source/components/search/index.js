Vue.component('search', {
    props: ["searchLine", "filter"],
    template: `
    <div>
      <input type="text" :searchLine="searchLine" v-on:input="$emit('input', $event.target.value)">
      <button class="btn btn-secondary" id="searchLine" @click="$emit('filter')">Искать</button>
    </div>
    `,
}, );