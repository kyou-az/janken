// じゃんけんの手を定数で宣言
const GOO = 0;
const CHOKI = 1;
const PA = 2;

// ユーザーが手を入力したときのハンドラ
$("#my-hand-goo").click(function () {
  startJanken(GOO)
});

$("#my-hand-choki").click(function () {
  startJanken(CHOKI)
});

$("#my-hand-pa").click(function () {
  startJanken(PA)
});

/**
 * ユーザーの手の入力をトリガーにじゃんけんをスタートする処理
 * @param myHand
 */
function startJanken(myHand) {
  // 相手の手を乱数で確定する処理
  let compHand = Math.floor(Math.random() * 3);
  $('.comp-hand-initial-title').hide();
  displayCompImage(compHand);
  displayResult(myHand, compHand)
}

/**
 * 勝敗の結果を表示する処理
 * @param myHand
 * @param compHand
 */
function displayResult(myHand, compHand) {
  const diff = myHand - compHand;
  if (diff === 0) {
    $('#result').text('あいこ');
  } else if (diff === -1 || diff === 2) {
    $('#result').text('あなたの勝ち');
  } else {
    $('#result').text('あなたの負け');
  }
}


/**
 * 相手の手を表示する処理
 * @param compHand
 */
function displayCompImage(compHand) {
  // 相手の手の画像タグ
  const imageTab = $('#comp-hand-image');
  imageTab.hide();
  switch (compHand) {
    case GOO:
      imageTab.attr('src', './img/gu--.png');
      break;
    case PA:
      imageTab.attr('src', './img/pa-.png');
      break;
    case CHOKI:
      imageTab.attr('src', './img/tuoki.png');
      break;
  }
  imageTab.fadeIn();
}





