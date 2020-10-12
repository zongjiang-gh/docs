// function flatAndSort(arr) {
//   if (!Array.isArray(arr)) return [];
//   const result = [];
//   arr.forEach((e) => result.push.apply(result, e));
//   result.sort((a, b) => a-b);
//   return result;
// }
// console.dir(flatAndSort([[1, 4, 7], [2, 5, 6], [3, 8, 9]]));

/* 
  [
    [1,4,7],
    [2,5,6],
    [3,8,9]
  ] 
*/
// 时间复杂度O(m*n)
function flatAndSort(arr) {
  if (!Array.isArray(arr)) return [];
  const result = [];
  // m
  arr.forEach((e) => result.push.apply(result, e));

  // 

  return result;
}
console.dir(
  flatAndSort([
    [1, 4, 7],
    [2, 5, 6],
    [3, 8, 9]
  ])
);

// 二分法找插入位置
function findIndex(arr,ele) {
  
}
