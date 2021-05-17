// じゃんけんの手を定数で宣言
const GOO = 0;
const CHOKI = 1;
const PA = 2;

let myHp = 250;
let compHp = 20;

$('#hp').text(myHp);

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

$(".message-wrapper").click(function () {
  $('.message-wrapper').hide();
  $('.my-hands').show();
})

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

function showMessage(message) {
  $('#message').text(message);
  $('.my-hands').hide();
  $('.message-wrapper').show();
}

function showEndMessage() {
  $('#end-message').text('敵をやっつけた!!!');
  $('.my-hands').hide();
  $('.end-message-wrapper').show();
}

/**
 * 勝敗の結果を表示する処理
 * @param myHand
 * @param compHand
 */
function displayResult(myHand, compHand) {
  const diff = myHand - compHand;
  if (diff === 0) {
    showMessage(`${handToString(myHand)}と${handToString(compHand)}であいこです。`);
  } else if (diff === -1 || diff === 2) {
    compHp = compHp - 10;
    if (compHp === 0) {
      damageFlash($('.monster'), true);
      showEndMessage();
      return;
    } else {
      damageFlash($('.monster'));
      showMessage(`${handToString(myHand)}と${handToString(compHand)}であなたの勝ちです。10のダメージを与えた。`);
    }
  } else {
    myHp = myHp - 10;
    showMessage(`${handToString(myHand)}と${handToString(compHand)}であなたの負けです。10のダメージをくらった。`);
    damageFlash($('#damage'), true);

  }
  $('#hp').text(myHp);
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

/**
 * ダメージのフラッシュを点滅させる。
 */
function damageFlash(element, isEndNoDisplay = false) {
  element.fadeOut(50 , function () {
    element.fadeIn(50, function () {
      element.fadeOut(50 , function () {
        element.fadeIn(50, function () {
          element.fadeOut(50 , function () {
            element.fadeIn(50, function () {
              element.fadeOut(50 , function () {
                element.fadeIn(50, function () {
                  isEndNoDisplay && element.fadeOut(50);
                });
              });
            });
          });
        });
      });
    });
  });
}

/**
 * 手の定数から文字列を返す処理
 * @param hand
 * @returns {string}
 */
function handToString(hand) {
  switch (hand) {
    case GOO:
      return 'グー'
    case CHOKI:
      return 'チョキ'
    case PA:
      return 'パー'
  }
}





