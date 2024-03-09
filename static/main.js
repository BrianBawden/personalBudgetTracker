/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable no-undef */
const URL_PARAMS = new URLSearchParams(window.location.search);
const TOKEN = URL_PARAMS.get('token');

// Function to show an element
const showElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    element.style.display = 'block';
    element.style.height = '65%';
  }
};

// Function to hide an element
const hideElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    element.style.display = 'none';
  }
};

// Check if TOKEN exists and update UI accordingly
if (TOKEN) {
  hideElement('.content.unauthorized');
  showElement('.content.authorized');
}
