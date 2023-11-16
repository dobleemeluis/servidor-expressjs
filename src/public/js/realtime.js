const socket = io();

const deleteBtns = document.querySelectorAll('.delete-product');
const productsCount = document.getElementById('count');
const newBtn = document.querySelector('#new-product');
const popupCtnr = document.querySelector('.popup-container');
const closeBtn = document.querySelector('#close');
const form = document.querySelector('form');
const products = document.querySelector('#products');

newBtn.addEventListener('click', (e) => {
  e.preventDefault();
  popupCtnr.classList.add('active');
});

closeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  popupCtnr.classList.remove('active');
});

Array.from(deleteBtns).forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    socket.emit('client:delete-product', { id: btn.id }, (payload) => {
      const { id, count } = payload;
      productsCount.innerHTML = count;
      document.getElementById(id).parentElement.parentElement.remove();
    });
  });
});

socket.on('server:delete-product', (payload) => {
  const { id, count } = payload;
  productsCount.innerHTML = count;
  document.getElementById(id).parentElement.parentElement.remove();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const titleInput = document.getElementById('titulo');
  const descriptionInput = document.getElementById('descripcion');
  const codeInput = document.getElementById('codigo');
  const priceInput = document.getElementById('precio');
  const stockInput = document.getElementById('stock');
  const categoryInput = document.getElementById('categoria');

  const title = titleInput.value;
  const description = descriptionInput.value;
  const code = codeInput.value;
  const price = priceInput.value;
  const stock = stockInput.value;
  const category = categoryInput.value;

  const payload = { title, description, code, price, stock, category };
  socket.emit('client:new-product', payload, (product) => {
    popupCtnr.classList.remove('active');
    alert('product added successfully!');
    productsCount.innerHTML = Number.parseInt(productsCount.innerHTML) + 1;
    products.innerHTML += `
    <div class="product-container">
      <div class="product-actions">
        <button class="delete-product" id="${product._id}">delete</button>
      </div>
      <p class="product-title">${product.title}</p>
      <small>code: ${product.code}</small>
      <small><strong class="product-price">$${product.price}</strong><strong class="product-qty">qty: ${product.stock}</strong></small>
      <p>${product.description}</p>
    </div>
    `;
    window.scrollTo(0, document.body.scrollHeight);
  });
});

socket.on('server:new-product', (product) => {
  alert('New product added!');
  productsCount.innerHTML = Number.parseInt(productsCount.innerHTML) + 1;
  products.innerHTML += `
    <div class="product-container">
      <div class="product-actions">
        <button class="delete-product" id="${product._id}">delete</button>
      </div>
      <p class="product-title">${product.title}</p>
      <small>code: ${product.code}</small>
      <small><strong class="product-price">$${product.price}</strong><strong class="product-qty">qty: ${product.stock}</strong></small>
      <p>${product.description}</p>
    </div>
  `;
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on('server:error', (payload) => {
  alert(`error: ${payload.error}`);
});
