const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
  ];
  
  const renderGoodsItem = ({title=undefined, price=0}) => `<div class="col">
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <h5 class="card-price">${price}</h5>
    </div>
  </div>
</div>`;
  
  const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item));
    document.querySelector('.goods-list').innerHTML = goodsList.join(" ");
  }
  
  renderGoodsList(goods);