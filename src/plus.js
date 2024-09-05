// // 전역 공간 노출 막는 옛날 방법
// const object = {};

// // 즉시실행함수 : 선언 즉시 실행되는 함수
// (function () {
//   function plus(a, b) {
//     return a + b;
//   }

//   object.plus = plus;
// })();


export default function plus(a, b) {
  return a + b;
}