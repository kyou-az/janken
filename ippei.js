
// じゃんけんの手を定数で宣言
const GOO = 0;
const CHOKI = 1;
const PA = 2;

$("#my-hand-goo").click(function () {
  startJanken(GOO)
});

$("#my-hand-choki").click(function () {
  startJanken(CHOKI)
});

$("#my-hand-pa").click(function () {
  startJanken(PA)
});

function getResultVer2(myHand, compHand) {
  const diff = myHand - compHand;
  if (diff === 0) {
    console.log('あいこ')
  } else if (diff === -1 || diff === 2) {
    console.log('あなたの勝ち')
  } else {
    console.log('あなたの負け')
  }
}

function getResult(myHand, compHand) {
  if (myHand === GOO) {

    // 相手の手のパターン
    if (compHand === GOO) {
      console.log('あいこ')
    } else if (compHand === CHOKI) {
      console.log('かち')
    } else if (compHand === PA) {
      console.log('まけ')
    }

  } else if (myHand === CHOKI) {

    // 相手の手のパターン
    if (compHand === GOO) {
      console.log('まけ')
    } else if (compHand === CHOKI) {
      console.log('あいこ')
    } else if (compHand === PA) {
      console.log('かち')
    }

  } else if (myHand === PA) {

    // 相手の手のパターン
    if (compHand === GOO) {
      console.log('かち')
    } else if (compHand === CHOKI) {
      console.log('まけ')
    } else if (compHand === PA) {
      console.log('あいこ')
    }
  }
}



function startJanken(myHand) {
  // 相手の手を乱数で確定する処理
  let compHand = Math.floor(Math.random() * 3);
  
  displayCompImage(compHand);

  console.log('自分:' + handToString(myHand) + ' 相手:' + handToString(compHand))
  //　自分のパターン

  // getResult(myHand, compHand)
  getResultVer2(myHand, compHand)
  
}

function handToString(hand) {
  switch (hand) {
    case GOO:
      return 'グー';
    case PA:
      return 'パー';
    case CHOKI:
      return 'チョキ';
  }
}

function displayCompImage(compHand) {
  switch (compHand) {
    case GOO:
      $('#comp-hand-image').attr('src', './img/gu--.png');
      break;
    case PA:
      $('#comp-hand-image').attr('src', './img/pa-.png');
      break;
    case CHOKI:
      $('#comp-hand-image').attr('src', './img/tuoki.png');
      break;
  }
}





