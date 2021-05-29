const GOO = 0;
const PA = 1;
const CHOKI = 2;

let myWinCount = 0;
let myLoseCount = 0;

let myHp = 100;
let enemyHp = 100;

$("#myhand-goo").click(function (event) {
  console.log(event.target.value);
  displayMyImage(GOO);
  startJanken(GOO);
});

$("#myhand-thoki").click(function () {
  displayMyImage(CHOKI);
  startJanken(CHOKI);
});

$("#myhand-pa").click(function () {
  displayMyImage(PA);
  startJanken(PA);
});

function startJanken(myHand) {
  let compHand = Math.floor(Math.random() * 3);
  displayCompImage(compHand);
  displayResult(myHand, compHand);
}

function displayResult(myHand, compHand) {
  $("#janken-info").text(
    "自分" + handToString(myHand) + "相手" + handToString(compHand)
  );
  if (myHand === GOO) {
    if (compHand === GOO) {
      $("#janken-result-txt").text("あいこ");
    } else if (compHand === CHOKI) {
      $("#janken-result-txt").text("かち");
      damageFlash($(".monster-image"));
      enemyHp = enemyHp - 40;
      $("#enemy-hp").val(enemyHp);
      myWinCount++;
      $("#my-win-count").text(myWinCount);
    } else if (compHand === PA) {
      $("#janken-result-txt").text("まけ");
      myHp = myHp - 40;
      $("#my-hp").val(myHp);
      myLoseCount++;
      $("#my-lose-count").text(myLoseCount);
    }
  } else if (myHand === CHOKI) {
    if (compHand === GOO) {
      $("#janken-result-txt").text("まけ");
      myHp = myHp - 40;
      $("#my-hp").val(myHp);
      myLoseCount++;
      $("#my-lose-count").text(myLoseCount);
    } else if (compHand === CHOKI) {
      $("#janken-result-txt").text("あいこ");
    } else if (compHand === PA) {
      $("#janken-result-txt").text("かち");
      damageFlash($(".monster-image"));
      enemyHp = enemyHp - 40;
      $("#enemy-hp").val(enemyHp);
      myWinCount++;
      $("#my-win-count").text(myWinCount);
    }
  } else if (myHand === PA) {
    if (compHand === GOO) {
      $("#janken-result-txt").text("かち");
      damageFlash($(".monster-image"));
      enemyHp = enemyHp - 40;
      $("#enemy-hp").val(enemyHp);
      myWinCount++;
      $("#my-win-count").text(myWinCount);
    } else if (compHand === CHOKI) {
      $("#janken-result-txt").text("まけ");
      myHp = myHp - 40;
      $("#my-hp").val(myHp);
      myLoseCount++;
      $("#my-lose-count").text(myLoseCount);
    } else if (compHand === PA) {
      $("#janken-result-txt").text("あいこ");
    }
  }

  if (enemyHp <= 0) {
    $("#janken-result").text("あなたの勝ち！！");
    $(".my-hand").fadeOut();
    $("#comp-hand-image").fadeOut();
    $(".monster-wrapper").fadeOut();
  } else if (myHp <= 0) {
    $("#janken-result").text("あなたの負け！！");
    $(".my-hand").fadeOut();
    $("#comp-hand-image").fadeOut();
  }
}

function displayMyImage(myHand) {
  switch (myHand) {
    case GOO:
      $("#my-hand-image").attr("src", "./img/gu--.png");
      break;
    case PA:
      $("#my-hand-image").attr("src", "./img/pa-.png");
      break;
    case CHOKI:
      $("#my-hand-image").attr("src", "./img/tuoki.png");
      break;
  }
}

function displayCompImage(compHand) {
  switch (compHand) {
    case GOO:
      $("#comp-hand-image").attr("src", "./img/gu--.png");
      break;
    case PA:
      $("#comp-hand-image").attr("src", "./img/pa-.png");
      break;
    case CHOKI:
      $("#comp-hand-image").attr("src", "./img/tuoki.png");
      break;
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

function damageFlash(element, isEndNoDisplay = false) {
  element.fadeOut(50, function () {
    element.fadeIn(50, function () {
      element.fadeOut(50, function () {
        element.fadeIn(50, function () {
          element.fadeOut(50, function () {
            element.fadeIn(50, function () {
              element.fadeOut(50, function () {
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
