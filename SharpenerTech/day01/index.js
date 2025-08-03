

let header = document.getElementById("header");
header.innerHTML = `
<h1>Fruit World</h1>
`;
header.style.color = "orange";
header.style.backgroundColor = "green";
header.style.borderBottom = '3px solid orange';

const Basket = document.getElementById("basket");
Basket.style.color = "green"

const para = document.createElement('p');
para.textContent = "Please visit us again ";
document.getElementById("thanks").appendChild(para);

