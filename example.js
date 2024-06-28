//U99350821

const API_URL = 'https://course-api.com/react-store-products';
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');
const productContainer = document.getElementById('product-container');
const productImage = document.getElementById('product-image');
const productName = document.getElementById('product-name');
const productPrice = document.getElementById('product-price');
const productDescription = document.getElementById('product-description');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let products = [];
let currentIndex = 0;

const fetchData = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        products = data;
        if (products.length > 0) {
            displayProduct(0);
        } else {
            showError('No products available');
        }
    } catch (error) {
        showError(error.message);
    } finally {
        loadingElement.classList.add('hidden');
    }
};

const displayProduct = (index) => {
    const product = products[index];
    productImage.src = product.image;
    productName.textContent = product.name;
    productPrice.textContent = `$${product.price}`;
    productDescription.textContent = product.description;
    productContainer.classList.remove('hidden');
};

const showError = (message) => {
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
};
//
const showLoading = () => {
    loadingElement.classList.remove('hidden');
    errorElement.classList.add('hidden');
    productContainer.classList.add('hidden');
};

const handleNavigation = (direction) => {
    productContainer.classList.add('fade-out');
    setTimeout(() => {
        currentIndex = (currentIndex + direction + products.length) % products.length;
        displayProduct(currentIndex);
        productContainer.classList.remove('fade-out');
    }, 500);
};

prevBtn.addEventListener('click', () => handleNavigation(-1));
nextBtn.addEventListener('click', () => handleNavigation(1));

showLoading();
fetchData();
