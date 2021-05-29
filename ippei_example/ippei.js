$(function () {
  // じゃんけんの手を定数で宣言
  const GOO = 0;
  const CHOKI = 1;
  const PA = 2;

  const MAX_STAGE = 2;
  let stage = 1;

  /**
   * プレイヤークラス
   */
  class Player {
    constructor(hp, str, def, yakusou = 99) {
      this.maxHp = hp;
      this.hp = hp;
      this.str = str;
      this.def = def;
      this.yakusou = yakusou;
    }

    attack(enemy) {
      let damage = this.judgeDamage(this.str, enemy.def);

      if (damage < 0) damage = 1;

      enemy.receiveDamage(damage);

      return damage;
    }

    /**
     * ダメージ判定
     * @param str 自分の攻撃力
     * @param def 相手の防御力
     * @returns {number}
     */
    judgeDamage(str, def) {
      const land = Math.floor(Math.random() * 55);
      const damage = (str - def / 2) * ((99 + land) / 256);
      return Math.round(damage);
    }

    receiveDamage(damage) {
      this.hp = this.hp - damage;
    }

    kaifuku() {
      if (this.yakusou === 0) return;
      this.hp += 100;

      if (this.hp > this.maxHp) {
        this.hp = this.maxHp;
      }

      this.yakusou--;
      $("#hp").text(this.hp);
      $("#yakusou-count").text(this.yakusou);
      $("#item-modal-wrapper").fadeOut(100);
      $("#yakusou-sound")[0].currentTime = 0;
      $("#yakusou-sound")[0].play();
    }

    openItem() {
      $("#item-modal-wrapper").fadeIn(100);
    }
  }

  /**
   * 敵クラス
   */
  class Enemy extends Player {
    constructor(hp, str, def) {
      super(hp, str, def);
    }

    /**
     * ランダムで手を生成
     * @returns {number}
     */
    makeHand() {
      const hand = Math.floor(Math.random() * 3);
      this.displayCompImage(hand);
      return hand;
    }

    /**
     * 相手の手を表示する処理
     * @param compHand
     */
    displayCompImage(compHand) {
      // 相手の手の画像タグ
      const imageTab = $("#comp-hand-image");
      imageTab.hide();
      switch (compHand) {
        case GOO:
          imageTab.attr("src", "./img/gu--.png");
          break;
        case PA:
          imageTab.attr("src", "./img/pa-.png");
          break;
        case CHOKI:
          imageTab.attr("src", "./img/tuoki.png");
          break;
      }
      imageTab.fadeIn();
    }
  }

  // [プレイヤー]
  const MY_MAX_HP = 500;
  const player = new Player(MY_MAX_HP, 255, 255);

  // [コンピューター]
  let enemy;

  $("#hp").text(player.hp);
  $("#yakusou-count").text(player.yakusou);

  let gameSound;

  // ゲームをスタートする。
  $("#start-button").click(function () {
    if (stage > MAX_STAGE) return;

    if (stage === MAX_STAGE) {
      gameSound = $("#boss-sound")[0];
      gameSound.play();
    } else {
      gameSound = $("#game-sound")[0];
      gameSound.play();
    }

    $(".start-message-wrapper").hide();
    monsterSet();
    $(".my-hands-wrapper").show();
  });

  // ユーザーが手を入力したときのハンドラ
  $("#my-hand-goo").click(function () {
    startJanken(GOO);
  });

  $("#my-hand-choki").click(function () {
    startJanken(CHOKI);
  });

  $("#my-hand-pa").click(function () {
    startJanken(PA);
  });

  $(".message-wrapper").click(function () {
    $(".message-wrapper").hide();
    $(".my-hands-wrapper").show();
  });

  $("#my-hand-item").click(function () {
    player.openItem();
  });

  $("#item-modal-wrapper").click(function (e) {
    if (e.target.className === "contents")
      $("#item-modal-wrapper").fadeOut(100);
  });

  // 回復
  $("#yakusou").click(function () {
    player.kaifuku();
    statusCheck();
  });

  $(".end-message-wrapper").click(function () {
    $(".end-message-wrapper").hide();
    $("#game-over-sound")[0].pause();
    $("#game-over-sound")[0].currentTime = 0;
    toMax();
    if (stage > MAX_STAGE) $("#start-button").text("全クリ");

    $(".start-message-wrapper").show();
  });

  function monsterSet() {
    if (stage === 1) {
      $(".monster").attr("src", "./img/monster.png");
      enemy = new Enemy(1000, 200, 20);
    }

    if (stage === 2) {
      $(".monster").attr("src", "./img/stage2.png");
      enemy = new Enemy(1500, 400, 80);
    }
    $(".monster").fadeIn(1000);
  }

  /**
   * ユーザーの手の入力をトリガーにじゃんけんをスタートする処理
   * @param myHand
   */
  function startJanken(myHand) {
    // 相手の手を乱数で確定する処理
    $(".comp-hand-initial-title").hide();
    let compHand = enemy.makeHand();
    displayResult(myHand, compHand);
  }

  function showMessage(message) {
    $("#message").text(message);
    $(".my-hands-wrapper").hide();
    $(".message-wrapper").show();
  }

  function showEndMessage(message) {
    $("#end-message").text(message);
    $(".my-hands-wrapper").hide();
    $(".end-message-wrapper").show();
  }

  /**
   * 勝敗の結果を表示する処理
   * @param myHand
   * @param compHand
   */
  function displayResult(myHand, compHand) {
    const diff = myHand - compHand;
    if (diff === 0) {
      drawProcess(myHand, compHand);
    } else if (diff === -1 || diff === 2) {
      winProcess(myHand, compHand);
    } else {
      loseProcess(myHand, compHand);
    }
  }

  function winProcess(myHand, compHand) {
    const damage = player.attack(enemy);
    if (enemy.hp <= 0) {
      damageFlash($(".monster"), true);
      gameSound.pause();
      gameSound.currentTime = 0;
      $("#win-sound")[0].play();
      showEndMessage("敵をやっつけた！！！");
      stage++;
      return;
    } else {
      $("#attack-sound")[0].play();
      damageFlash($(".monster"));
      showMessage(
        `${handToString(myHand)}と${handToString(
          compHand
        )}であなたの勝ちです。${damage}のダメージを与えた。`
      );
    }
  }

  function loseProcess(myHand, compHand) {
    const damage = enemy.attack(player);
    if (player.hp < 0) player.hp = 0;
    statusCheck();
    $("#damage-sound")[0].play();
    damageFlash($("#damage"), true);
    $("#hp").text(player.hp);
    if (player.hp <= 0) {
      showEndMessage("パーティーは絶滅しました。");
      gameSound.pause();
      gameSound.currentTime = 0;
      $("#game-over-sound")[0].play();
    } else {
      showMessage(
        `${handToString(myHand)}と${handToString(
          compHand
        )}であなたの負けです。${damage}のダメージをくらった。`
      );
    }
  }

  function drawProcess(myHand, compHand) {
    showMessage(
      `${handToString(myHand)}と${handToString(compHand)}であいこです。`
    );
    $("#miss-sound")[0].play();
  }

  /**
   * ダメージのフラッシュを点滅させる。
   */
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

  /**
   * 手の定数から文字列を返す処理
   * @param hand
   * @returns {string}
   */
  function handToString(hand) {
    switch (hand) {
      case GOO:
        return "グー";
      case CHOKI:
        return "チョキ";
      case PA:
        return "パー";
    }
  }

  /**
   * プレイヤーのステータスによってフレームの色を変える。
   */
  function statusCheck() {
    if (player.hp <= 0) {
      colorChange("#8b0404");
      return;
    }

    const rate = (player.hp / MY_MAX_HP) * 100;
    if (rate <= 20) {
      colorChange("#db2424");
    } else if (rate <= 40) {
      colorChange("#128012");
    } else {
      colorChange("white");
    }
  }

  function colorChange(color) {
    $(".me-wrapper").css("border-color", color);
    $(".me-wrapper").css("color", color);
    $(".my-hand-wrapper").css("border-color", color);
    $(".my-hand-wrapper").css("color", color);
    $(".my-hand").css("color", color);
    $(".item-modal").css("color", color);
    $(".item-modal").css("border-color", color);
  }

  function toMax() {
    player.hp = MY_MAX_HP;
    player.yakusou = 99;
    $("#hp").text(player.hp);
    $("#yakusou-count").text(player.yakusou);
    statusCheck();
  }
});
