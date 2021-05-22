const GOO = 0;
const PA = 1;
const CHOKI = 2;

// Math.random()関数は、 0 以上 1 未満 (0 は含むが、 1 は含まない) の範囲で浮動小数点の擬似乱数を返します。
console.log(Math.random());
// 乱数に3を掛けて、小数点以下を切り捨てることで、0から2の乱数を生成している。
console.log(Math.floor(Math.random() * 3));

$("#test").click(function () {
  startJanken();
});

function startJanken() {
  // 相手の手を乱数で確定する処理
  let compHand = Math.floor(Math.random() * 3);
  let myHand = $("#my-hand").val();

  myHand = Number(myHand);

  console.log(
    "自分:" + handToString(myHand) + " 相手:" + handToString(compHand)
  );
  //　自分のパターン
  if (myHand === GOO) {
    // 相手の手のパターン
    if (compHand === GOO) {
      console.log("あいこ");
    } else if (compHand === CHOKI) {
      console.log("かち");
    } else if (compHand === PA) {
      console.log("まけ");
    }
  } else if (myHand === CHOKI) {
    // 相手の手のパターン
    if (compHand === GOO) {
      console.log("まけ");
    } else if (compHand === CHOKI) {
      console.log("あいこ");
    } else if (compHand === PA) {
      console.log("かち");
    }
  } else if (myHand === PA) {
    // 相手の手のパターン
    if (compHand === GOO) {
      console.log("かち");
    } else if (compHand === CHOKI) {
      console.log("まけ");
    } else if (compHand === PA) {
      console.log("あいこ");
    }
  }
}

function handToString(hand) {
  switch (hand) {
    case GOO:
      return "グー";
    case PA:
      return "パー";
    case CHOKI:
      return "チョキ";
  }
}
