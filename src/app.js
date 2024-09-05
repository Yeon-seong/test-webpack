import plus from "./plus.js";
import "./styles.css";
// const style = require('./styles.css'); // 리콰이어로 데이터를 불러올 수도 있다.


import rabbit from './rabbit.webp';

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = `<img src="${rabbit}"/>`;
});


// Loader에 의해 console.log를 alert로 바뀌어버림
console.log(plus(10, 5));

function minus(a, b) {
  return a - b;
}



