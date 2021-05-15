/**
 * [[変数]]
 *
 * [変数の種類]
 * string => 文字列
 * int|number|integer => 数値（整数）
 * float|double => 小数点
 * boolean|bool => 真偽値(true or false)
 */

let value; // 書き換えることができる

value = "aaaaaaa"; // 文字列は「''」か「""」か「``」で囲む

// 文字列のことをプログラミングの世界では「string」と呼びます

// 数値型（numberとかint）は計算ができる

let a = 10;
let b = 99;

// letで宣言した変数は書き換えることが可能です。
a = 3000;

// 足し算
let add = a + b;

// 引き算
let sub = a - b;

// 掛け算
let mul = a * b;

// 割り算
let div = a / b;

// 余りを算出
let left = b % a;

console.log("足し算" + add);
console.log("引き算" + sub);
console.log("掛け算" + mul);
console.log("割り算" + div);
console.log("余り" + left);

// 真偽値はYesかNoを表す
console.log(true);
console.log(false);

// 定数を表すconst
const myName = 'Ippei Kamimura';
console.log(myName);

/**
 * [[if文]]
 * 
 * 条件分岐をするために用いる文法です
 */

let myAge = 40;

if (myAge >= 20) {
  console.log('お酒は飲めます!');
} else {
  console.log('お酒は飲めません...');
}


if (myAge <= 10) {
  console.log('子供');
} else if (myAge <= 20) {
  console.log('若い');
} else if (myAge <= 30) {
  console.log('おっさん');
} else {
  console.log('老害');
}

/**
 * [[繰り返しの表現 for文]]
 */

// 配列という変数で、値を複数保持する変数（arrayとも言う）
const fruits = ['りんご', 'みかん', 'マンゴー', 'パイナップル'];

// [2]の中の数字のことをインデックスと言う
// インデックスは0から始まる。
// console.log(fruits[0]);

let f = 0;

// f = f + 1;
// f = f + 1;
// f = f + 1;
// f = f + 1;
// f = f + 1;
// f = f + 1;

f++
f++
f++
f++
f++

console.log(fruits.length);

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i] + ':' + i);
}





