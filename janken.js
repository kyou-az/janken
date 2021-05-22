const GOO = 0;
const PA = 1;
const CHOKI = 2;

let myWinCount = 0;
let myLoseCount = 0;

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
      myWinCount++;
      $("#my-win-count").text(myWinCount);
    } else if (compHand === PA) {
      $("#janken-result-txt").text("まけ");
      myLoseCount++;
      $("#my-lose-count").text(myLoseCount);
    }
  } else if (myHand === CHOKI) {
    if (compHand === GOO) {
      $("#janken-result-txt").text("まけ");
      myLoseCount++;
      $("#my-lose-count").text(myLoseCount);
    } else if (compHand === CHOKI) {
      $("#janken-result-txt").text("あいこ");
    } else if (compHand === PA) {
      $("#janken-result-txt").text("かち");
      myWinCount++;
      $("#my-win-count").text(myWinCount);
    }
  } else if (myHand === PA) {
    if (compHand === GOO) {
      $("#janken-result-txt").text("かち");
      myWinCount++;
      $("#my-win-count").text(myWinCount);
    } else if (compHand === CHOKI) {
      $("#janken-result-txt").text("まけ");
      myLoseCount++;
      $("#my-lose-count").text(myLoseCount);
    } else if (compHand === PA) {
      $("#janken-result-txt").text("あいこ");
    }
  }

  if (myWinCount == 3) {
    $("#janken-result").text("あなたの勝ちです");
    $("#myHand").fadeOut();
  } else if (myLoseCount == 3) {
    $("#janken-result").text("あなたの負けです");
    $("#myHand").fadeOut();
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
