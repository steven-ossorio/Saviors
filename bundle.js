/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bullet = function () {
  function Bullet(x, y, width, height, ctx, object) {
    _classCallCheck(this, Bullet);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.object = object;
    this.draw = this.draw.bind(this);
    this.move = this.move.bind(this);
    this.image = new Image();
    this.image.src = "images/space_bullets.png";
    this.collided = false;

    this.collidedWith = this.collidedWith.bind(this);
  }

  _createClass(Bullet, [{
    key: "draw",
    value: function draw() {
      var x = void 0;
      var y = void 0;
      var h = void 0;
      var w = void 0;
      if (this.object === "ship") {
        x = 200;
        y = 200;
        h = 60;
        w = 60;
      } else {
        x = 0, y = 0, h = 30, w = 30;
      }
      this.ctx.drawImage(this.image, x, y, h, w, this.x - 10, this.y - 10, this.width, this.height);
      this.move();
      this.enemyMove();
    }
  }, {
    key: "collidedWith",
    value: function collidedWith(object) {
      if (this.x < object.x + object.width + 50 && this.x + this.width > object.x && this.y < object.y + object.height && this.height + this.y > object.y) {
        this.collided = true;
      }
    }
  }, {
    key: "move",
    value: function move() {
      if (this.y > 0) {
        this.y -= 6;
      }
    }
  }, {
    key: "enemyMove",
    value: function enemyMove() {
      if (this.y < this.ctx.canvas.height + 10) {
        this.y += 6;
      }
    }
  }]);

  return Bullet;
}();

module.exports = Bullet;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Game = __webpack_require__(2);
var Background = __webpack_require__(7);
var GameInstance = null;

document.addEventListener("DOMContentLoaded", function () {
  var preGame = function preGame() {
    var canvasStart = document.getElementById("start");
    if (canvasStart.getContext) {
      var ctxStart = canvasStart.getContext("2d");

      ctxStart.font = "30px games";
      ctxStart.fillStyle = "red";
      ctxStart.fillText("Press R to Start!", canvasStart.width / 2 - 110, canvasStart.height / 2);
    }
  };

  document.getElementById("inputName").addEventListener("keyup", function (e) {
    e.preventDefault();
    if (e.keyCode === 13 && GameInstance) {
      var scores = firebase.database().ref("scores/");
      var name = document.getElementById("inputName").value;
      var score = GameInstance.score;
      var highScore = { name: name, score: score };
      scores.push(highScore);

      document.getElementById("inputName").type = "hidden";
      GameInstance.showLeaderBoard();
    }
  });

  preGame();
  document.addEventListener("keypress", function (e) {
    if (e.key === "r" && document.getElementById("inputName").type === "hidden") {
      var score = 0;
      var canvasStart = document.getElementById("start");
      if (canvasStart.getContext) {
        var ctxStart = canvasStart.getContext("2d");
        ctxStart.clearRect(0, 0, canvasStart.width, canvasStart.height);
      }
      var _canvas = document.getElementById("canvas");
      var canvasEnemy = document.getElementById("enemy");
      var canvasScore = document.getElementById("scoreBoard");
      var canvasGameOver = document.getElementById("gameOver");
      if (_canvas.getContext) {
        var ctx = _canvas.getContext("2d");
        var ctxEnemy = canvasEnemy.getContext("2d");
        var ctxScore = canvasScore.getContext("2d");
        var ctxGameOver = canvasGameOver.getContext("2d");
        GameInstance = new Game(ctx, _canvas, ctxEnemy, canvasEnemy, ctxScore, canvasScore, ctxGameOver, canvasGameOver, score);
        GameInstance.start();
      }
    }
  });
  var canvasBack = document.getElementById("background");
  if (canvasBack.getContext) {
    var ctx = canvasBack.getContext("2d");
    new Background(ctx, canvas).start();
  }
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Aircraft = __webpack_require__(3);
var Enemies = __webpack_require__(4);
var BigEnemy = __webpack_require__(8);
var DeadAlien = __webpack_require__(5);
var CollidedBullet = __webpack_require__(6);

var Game = function () {
  function Game(ctx, canvas, ctxEnemy, canvasEnemy, ctxScore, canvasScore, ctxGameOver, canvasGameOver, score) {
    _classCallCheck(this, Game);

    this.ctx = ctx;
    this.ctxEnemy = ctxEnemy;
    this.ctxScore = ctxScore;
    this.ctxGameOver = ctxGameOver;
    this.canvas = canvas;
    this.canvasEnemy = canvasEnemy;
    this.canvasScore = canvasScore;
    this.canvasGameOver = canvasGameOver;
    this.start = this.start.bind(this);
    this.render = this.render.bind(this);
    this.aircraft = new Aircraft(this.canvas.width / 2, this.canvas.height - 30, 50, 50, this.ctx);
    this.internalClick = 0;
    this.enemy = new Enemies(100, 0, 20, 20, this.ctxEnemy);
    this.enemyTwo = new Enemies(100, 0, 20, 20, this.ctxEnemy);
    this.enemies = [this.enemy, this.enemyTwo];
    this.deadEnemies = [];
    this.CollidedBullet = [];

    this.enemiesRender = this.enemiesRender.bind(this);
    this.score = score;
    this.enemyCounter = 0;
    this.restarted = false;
    this.showInput = this.showInput.bind(this);
    this.showLeaderBoard = this.showLeaderBoard.bind(this);
    this.boss = 0;
  }

  _createClass(Game, [{
    key: "start",
    value: function start() {
      this.render();
    }
  }, {
    key: "enemiesRender",
    value: function enemiesRender() {
      var _this = this;

      var enemies = [];
      var deadEnemies = [];
      this.enemies.forEach(function (enemy) {
        if (enemy.health <= 0) {
          if (enemy.type === "boss") {
            _this.score += 40;
          } else {
            _this.score += 20;
            _this.deadEnemies.push(new DeadAlien(enemy.x, enemy.y, enemy.height, enemy.width, enemy.ctx));
          }
        }
        if (enemy.health > 0) {
          enemies.push(enemy);
          _this.CollidedBullet.forEach(function (bullet) {
            bullet.draw();
          });
          enemy.draw();
          enemy.move();
        }
        _this.aircraft.collidedWith(enemy);
        enemy.bullets.forEach(function (bullet) {
          bullet.draw();
          bullet.enemyMove();

          _this.aircraft.collidedWith(bullet);
        });
      });

      this.deadEnemies.forEach(function (enemy) {
        if (!enemy.finished) {
          deadEnemies.push(enemy);
          enemy.draw();
        }
      });

      this.enemies = enemies;
      this.deadEnemies = deadEnemies;
    }
  }, {
    key: "showLeaderBoard",
    value: function showLeaderBoard() {
      var scores = firebase.database().ref("/scores").orderByChild("score");
      scores.once("value").then(function (snapshot) {
        orderedScore = [];
        snapshot.forEach(function (child) {
          orderedScore.unshift(child.val());
        });
        orderedScore = orderedScore.slice(0, 5);
        $("#score-results").empty();
        $("#score-results").append("<tr>\n        <th>Rank</th>\n        <th>Name</th>\n        <th>Score</th>\n        </tr>");
        for (var i = 0; i < 5; i++) {
          var player = orderedScore[i];
          var key = player.name;
          var value = player.score;
          $("#score-results").append("<tr class='firebase-score'><td>" + (i + 1) + "</td><td>" + key + "</td> <td>" + value + "</td></tr>");
        }
        orderedScore = [];
      }).catch(function (err) {
        console.log(err);
      });
    }
  }, {
    key: "showInput",
    value: function showInput() {
      var inputLength = document.getElementById("inputName").value.length;
      if (inputLength > 0) {
        document.getElementById("inputName").value = "";
      }
      document.getElementById("inputName").type = "text";
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctxEnemy.clearRect(0, 0, this.canvasEnemy.width, this.canvasEnemy.height);
      this.ctxScore.clearRect(0, 0, this.canvasScore.width, this.canvasScore.height);
      this.ctxGameOver.clearRect(0, 0, this.canvasGameOver.width, this.canvasGameOver.height);

      this.ctxScore.font = "60px Arial";
      this.ctxScore.fillStyle = "red";
      if (this.score < 100) {
        this.ctxScore.fillText(this.score, this.canvasScore.width / 2 - 10, 50);
      } else if (this.score < 1000) {
        this.ctxScore.fillText(this.score, this.canvasScore.width / 2 - 20, 50);
      } else {
        this.ctxScore.fillText(this.score, this.canvasScore.width / 2 - 30, 50);
      }

      this.internalClick += 1;
      this.boss += 1;

      if (this.aircraft.health <= 0) {
        this.ctxGameOver.font = "30px games";
        this.ctxGameOver.fillStyle = "red";
        this.ctxGameOver.fillText("Game Over", this.canvasGameOver.width / 2 - 100, this.canvasGameOver.height / 2 - 50);
        this.ctxGameOver.font = "30px games";
        this.ctxGameOver.fillStyle = "red";
        this.ctxGameOver.fillText("Play Again?", this.canvasGameOver.width / 2 - 100, this.canvasGameOver.height / 2);

        if (this.restarted === true) {
          this.showInput();
          this.restarted = false;
        }
      }
      if (this.aircraft.health > 0) {
        this.restarted = true;
        this.aircraft.draw();
        this.ctxScore.fillStyle = "#FF0000";
        this.ctxScore.fillRect(20, 20, this.aircraft.health / 100 * 100, 25);
        this.ctxScore.strokeStyle = "red";
        this.ctxScore.strokeRect(20, 20, 100, 25);
      }

      if (this.boss === 800) {
        this.enemies.push(new BigEnemy(100, 100, 40, 40, this.ctxEnemy));
        this.boss = 0;
      }

      // if (this.score < 100) {
      // if (this.score <= 80) {
      if (this.internalClick === 200 && this.enemies.length < 10) {
        this.enemies.push(new Enemies(100, 100, 40, 40, this.ctxEnemy));
        this.enemies.push(new Enemies(100, 100, 40, 40, this.ctxEnemy));
        this.internalClick = 0;
      } else if (this.score <= 500) {
        if (this.internalClick === 150 && this.enemies.length < 20) {
          this.enemies.push(new Enemies(100, 100, 40, 40, this.ctxEnemy));
          this.enemies.push(new Enemies(100, 100, 40, 40, this.ctxEnemy));
          this.internalClick = 0;
        }
      } else if (this.score <= 1000) {
        if (this.internalClick === 100 && this.enemies.length < 30) {
          this.enemies.push(new Enemies(100, 100, 40, 40, this.ctxEnemy));
          this.enemies.push(new Enemies(100, 100, 40, 40, this.ctxEnemy));
          this.internalClick = 0;
        }
      }

      this.enemiesRender();

      this.aircraft.bullets.forEach(function (bullet) {
        bullet.draw();
        bullet.move();
        _this2.enemies.forEach(function (enemy) {
          enemy.collidedWith(bullet);
          bullet.collidedWith(enemy);
        });
        if (bullet.collided === true) {
          _this2.CollidedBullet.push(new CollidedBullet(bullet.x, bullet.y, bullet.height, bullet.width, bullet.ctx));
        }
      });

      requestAnimationFrame(this.render);
    }
  }]);

  return Game;
}();

module.exports = Game;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bullets = __webpack_require__(0);

var Aircraft = function () {
  function Aircraft(x, y, width, height, ctx) {
    _classCallCheck(this, Aircraft);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.bindMovements = this.bindMovements.bind(this);
    this.bindMovements();
    this.draw = this.draw.bind(this);

    this.upPressed = false;
    this.downPressed = false;
    this.leftPressed = false;
    this.rightPressed = false;
    this.spacePressed = false;

    this.image = new Image();
    this.image.src = "images/Lightning.png";

    this.bullets = [];
    this.bulletClock = 0;

    this.count = 0;
    this.internalClick = 0;

    this.bulletConditional = this.bulletConditional.bind(this);
    this.bulletConditional();

    this.collidedWith = this.collidedWith.bind(this);
    this.health = 100;
    this.shootingAffect = this.shootingAffect.bind(this);
  }

  _createClass(Aircraft, [{
    key: "draw",
    value: function draw() {
      this.bulletClock += 2;
      this.internalClick += 2;
      if (this.internalClick % 20 === 0) {
        if (this.count === 96) {
          this.count = 0;
        } else {
          this.count += 32;
        }
      }

      this.ctx.drawImage(this.image, this.count, 0, 30, 30, this.x - 11, this.y - 8, 40, 40);

      this.bulletConditional();

      if (this.upPressed && this.y > this.width && this.spacePressed && this.bulletClock > 80 && this.bullets.length <= 6) {
        this.y -= 6;
        this.bulletClock = 0;
        this.bullets.push(new Bullets(this.x - 5, this.y - 5, 15, 15, this.ctx, "ship"));
        this.bullets.push(new Bullets(this.x + 20, this.y - 5, 15, 15, this.ctx, "ship"));
      } else if (this.downPressed && this.y < this.ctx.canvas.height - this.width - 10 && this.spacePressed && this.bulletClock > 80 && this.bullets.length <= 6) {
        this.y += 6;
        this.bulletClock = 0;
        this.bullets.push(new Bullets(this.x - 5, this.y - 5, 15, 15, this.ctx, "ship"));
        this.bullets.push(new Bullets(this.x + 20, this.y - 5, 15, 15, this.ctx, "ship"));
      }

      if (this.leftPressed && this.x > this.width && this.spacePressed && this.bulletClock > 30 && this.bullets.length <= 12) {
        this.x -= 6;
        this.bulletClock = 0;
        this.bullets.push(new Bullets(this.x - 5, this.y - 5, 15, 15, this.ctx, "ship"));
        this.bullets.push(new Bullets(this.x + 20, this.y - 5, 15, 15, this.ctx, "ship"));
      } else if (this.rightPressed && this.x < this.ctx.canvas.width - this.width - 15 && this.spacePressed && this.bulletClock > 30 && this.bullets.length <= 12) {
        this.x += 6;
        this.bulletClock = 0;
        this.bullets.push(new Bullets(this.x - 5, this.y - 5, 15, 15, this.ctx, "ship"));
        this.bullets.push(new Bullets(this.x + 20, this.y - 5, 15, 15, this.ctx, "ship"));
      }

      if (this.upPressed && this.y > this.width) {
        this.y -= 6;
      } else if (this.downPressed && this.y < this.ctx.canvas.height - this.width + 20) {
        this.y += 6;
      }
      if (this.leftPressed && this.x > this.width - 30) {
        this.x -= 6;
      } else if (this.rightPressed && this.x < this.ctx.canvas.width - this.width + 15) {
        this.x += 6;
      } else if (this.spacePressed && this.bulletClock > 30) {
        this.bulletClock = 0;
        this.bullets.push(new Bullets(this.x - 5, this.y - 5, 15, 15, this.ctx, "ship"));
        this.bullets.push(new Bullets(this.x + 20, this.y - 5, 15, 15, this.ctx, "ship"));
        this.shootingAffect();
      }
    }
  }, {
    key: "shootingAffect",
    value: function shootingAffect() {
      var audio = new Audio("music/laser.mp3");
      audio.play();
    }
  }, {
    key: "bulletConditional",
    value: function bulletConditional() {
      var newArr = [];
      this.bullets.forEach(function (bullet, idx) {
        if (bullet.y > 0 && bullet.collided === false) {
          newArr.push(bullet);
        }
      });

      this.bullets = newArr;
    }
  }, {
    key: "collidedWith",
    value: function collidedWith(object) {
      if (this.x < object.x + 30 + object.width && this.x + this.width > object.x + 30 && this.y + 30 < object.y + 30 + object.height + 30 && this.height + this.y > object.y + 30) {
        this.health -= 2;
      }
    }
  }, {
    key: "bindMovements",
    value: function bindMovements() {
      var _this = this;

      document.addEventListener("keydown", function (e) {
        switch (e.keyCode) {
          case 65:
          case 37:
            _this.leftPressed = true;
            _this.rightPressed = false;
            break;
          case 87:
          case 38:
            _this.upPressed = true;
            break;
          case 68:
          case 39:
            _this.rightPressed = true;
            _this.leftPressed = false;
            break;
          case 83:
          case 40:
            _this.downPressed = true;
            break;
          case 32:
            _this.spacePressed = true;
            break;
          default:
            break;
        }
      });

      document.addEventListener("keyup", function (e) {
        switch (e.keyCode) {
          case 65:
          case 37:
            _this.leftPressed = false;
            break;
          case 87:
          case 38:
            _this.upPressed = false;
            break;
          case 68:
          case 39:
            _this.rightPressed = false;
            break;
          case 83:
          case 40:
            _this.downPressed = false;
            break;
          case 32:
            _this.spacePressed = false;
            break;
          default:
        }
      });
    }
  }]);

  return Aircraft;
}();

module.exports = Aircraft;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bullets = __webpack_require__(0);

var Enemy = function () {
  function Enemy(x, y, width, height, ctx) {
    _classCallCheck(this, Enemy);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.draw = this.draw.bind(this);

    this.image = new Image();
    this.image.src = "images/aliens.png";

    this.row = 0;
    this.column = -2;

    this.internalClick = 0;
    this.x = Math.floor(Math.random() * this.ctx.canvas.width + 1);

    this.bullets = [];
    this.bulletConditional = this.bulletConditional.bind(this);
    this.movement = this.movement.bind(this);
    this.turnAllFalse = this.turnAllFalse.bind(this);
    this.moveUp = this.moveUp.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);

    this.animatedRow = 0;

    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;

    this.health = 100;
    this.shield = false;

    this.enemyDeath = 0;
    this.enemyDeathCounter = 0;
    this.explosionMusic = this.explosionMusic.bind(this);
    this.type = "alien";
  }

  _createClass(Enemy, [{
    key: "explosionMusic",
    value: function explosionMusic() {
      var audio = new Audio("music/atari_boom.mp3");
      audio.play().then(function () {}).catch(function (err) {
        return console.log(err);
      });
    }
  }, {
    key: "draw",
    value: function draw() {
      this.bulletConditional();
      this.internalClick += 2;
      this.animatedRow += 4;

      if (this.internalClick % 500 === 0) {
        this.internalClick = 0;
        this.bullets.push(new Bullets(this.x + 30, this.y + 35, 15, 15, this.ctx));
      }

      if (this.internalClick % 200 === 0) {
        this.movement();
      }
      this.ctx.drawImage(this.image, this.row, 0, 50, 50, this.x, this.y, 50, 50);
      if (this.animatedRow === 384 && this.column === 39) {
        this.animatedRow = 0;
        this.row = 0;
        this.column = 0;
      } else if (this.animatedRow === 384) {
        this.animatedRow = 0;
        this.row = 0;
        this.column += 43;
      } else if (this.animatedRow % 47 === 0) {
        this.row += 47;
      }
    }
  }, {
    key: "move",
    value: function move() {
      if (this.y < this.ctx.canvas.height / 2) {
        this.y += 2;
      }

      if (this.y > 10) {
        if (this.left) {
          this.moveLeft();
        } else if (this.right) {
          this.moveRight();
        } else if (this.up) {
          this.moveUp();
        } else if (this.down) {
          this.moveDown();
        }
      }
    }
  }, {
    key: "movement",
    value: function movement() {
      this.turnAllFalse();

      var moveArr = ["left", "up", "down", "right"];
      var choice = moveArr[Math.floor(Math.random() * moveArr.length)];
      switch (choice) {
        case "left":
          this.left = true;
          break;
        case "up":
          this.up = true;
          break;
        case "down":
          this.down = true;
          break;
        case "right":
          this.right = true;
          break;
        default:
      }
    }
  }, {
    key: "collidedWith",
    value: function collidedWith(object) {
      if (this.x < object.x + object.width && this.x + this.width > object.x && this.y < object.y + object.height && this.height + this.y > object.y) {
        this.health -= 20;
        this.shield = true;
        this.explosionMusic();
        this.ctx.drawImage(this.image, this.row, 0, 100, 100, this.x, this.y, 50, 50);
      }
    }
  }, {
    key: "turnAllFalse",
    value: function turnAllFalse() {
      this.left = false;
      this.right = false;
      this.up = false;
      this.down = false;
    }
  }, {
    key: "moveLeft",
    value: function moveLeft() {
      if (this.x > 0) {
        this.x -= 2;
      }
    }
  }, {
    key: "moveUp",
    value: function moveUp() {
      if (this.y > 0) {
        this.y -= 2;
      }
    }
  }, {
    key: "moveDown",
    value: function moveDown() {
      if (this.y < this.ctx.canvas.height / 1.4) {
        this.y += 2;
      }
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      if (this.x < this.ctx.canvas.width - 50) {
        this.x += 2;
      }
    }
  }, {
    key: "bulletConditional",
    value: function bulletConditional() {
      var _this = this;

      var newArr = [];
      this.bullets.forEach(function (bullet) {
        if (bullet.y < _this.ctx.canvas.height) {
          newArr.push(bullet);
        }
      });

      this.bullets = newArr;
    }
  }]);

  return Enemy;
}();

module.exports = Enemy;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DeadAlien = function () {
  function DeadAlien(x, y, width, height, ctx) {
    _classCallCheck(this, DeadAlien);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.draw = this.draw.bind(this);

    this.image = new Image();
    this.image.src = "images/aliens.png";

    this.row = 0;
    this.column = -2;

    this.internalClick = 0;

    this.animatedRow = 0;
    this.firstRowCounter = 0;
    this.finished = false;
  }

  _createClass(DeadAlien, [{
    key: "draw",
    value: function draw() {
      if (this.firstRowCounter <= 5) {
        this.internalClick += 2;
        this.animatedRow += 2;

        this.ctx.drawImage(this.image, this.row, 280, 50, 50, this.x, this.y, 50, 50);

        if (this.animatedRow === 60) {
          this.animatedRow = 0;
          this.firstRowCounter += 1;
          this.firstRowCounter < 3 ? this.row += 50 : this.row += 65;
          this.column = 0;
        }
      } else {
        this.finished = true;
      }
    }
  }]);

  return DeadAlien;
}();

module.exports = DeadAlien;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CollidedBullet = function () {
  function CollidedBullet(x, y, width, height, ctx) {
    _classCallCheck(this, CollidedBullet);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.draw = this.draw.bind(this);

    this.image = new Image();
    this.image.src = "images/explosion.png";

    this.row = 0;
    this.column = -2;

    this.internalClick = 0;

    this.animatedRow = 0;
    this.firstRowCounter = 0;
  }

  _createClass(CollidedBullet, [{
    key: "draw",
    value: function draw() {
      this.internalClick += 2;
      this.animatedRow += 4;

      if (this.animatedRow < 160) {
        this.ctx.drawImage(this.image, 0, 0, 50, 50, this.x, this.y - 10, 20, 20);
      }
    }
  }]);

  return CollidedBullet;
}();

module.exports = CollidedBullet;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Background = function () {
  function Background(ctx, canvas) {
    _classCallCheck(this, Background);

    this.ctx = ctx;
    this.canvas = canvas;
    this.start = this.start.bind(this);
    this.render = this.render.bind(this);

    this.image = new Image();
    this.image.src = 'images/nebula.png';

    this.speed = 2;
    this.y = 0;
    this.draw = this.draw.bind(this);
    this.draw();
  }

  _createClass(Background, [{
    key: 'draw',
    value: function draw() {
      this.y += this.speed;
      this.ctx.drawImage(this.image, -50, this.y);
      this.ctx.drawImage(this.image, -50, this.y - this.canvas.height);

      if (this.y > this.canvas.height) {
        this.image.src = 'images/nebula.png';
        this.y = 0;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.draw();
      requestAnimationFrame(this.render);
    }
  }, {
    key: 'start',
    value: function start() {
      this.render();
    }
  }]);

  return Background;
}();

module.exports = Background;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bullets = __webpack_require__(0);

var BigEnemy = function () {
  function BigEnemy(x, y, width, height, ctx) {
    _classCallCheck(this, BigEnemy);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.draw = this.draw.bind(this);

    this.image = new Image();
    this.image.src = "images/bigAlien2.png";

    this.row = 0;
    this.column = -2;

    this.internalClick = 0;
    this.x = Math.floor(Math.random() * this.ctx.canvas.width + 1);

    this.bullets = [];
    this.bulletConditional = this.bulletConditional.bind(this);
    this.movement = this.movement.bind(this);
    this.turnAllFalse = this.turnAllFalse.bind(this);
    this.moveUp = this.moveUp.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);

    this.animatedRow = 0;

    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;

    this.health = 150;
    this.shield = false;

    this.enemyDeath = 0;
    this.enemyDeathCounter = 0;
    this.explosionMusic = this.explosionMusic.bind(this);
    this.type = "boss";
  }

  _createClass(BigEnemy, [{
    key: "explosionMusic",
    value: function explosionMusic() {
      var audio = new Audio("music/atari_boom.mp3");
      audio.play();
    }
  }, {
    key: "draw",
    value: function draw() {
      this.bulletConditional();
      this.internalClick += 2;
      this.animatedRow += 4;

      if (this.internalClick % 500 === 0) {
        this.internalClick = 0;
        this.bullets.push(new Bullets(this.x + 30, this.y + 35, 15, 15, this.ctx));
      }

      if (this.internalClick % 200 === 0) {
        this.movement();
      }

      this.ctx.drawImage(this.image, 0, 30, 3500, 3500, this.x, this.y, 300, 300);
    }
  }, {
    key: "move",
    value: function move() {
      if (this.y < this.ctx.canvas.height / 2) {
        this.y += 2;
      }

      if (this.y > 10) {
        if (this.left) {
          this.moveLeft();
        } else if (this.right) {
          this.moveRight();
        } else if (this.up) {
          this.moveUp();
        } else if (this.down) {
          this.moveDown();
        }
      }
    }
  }, {
    key: "movement",
    value: function movement() {
      this.turnAllFalse();

      var moveArr = ["left", "up", "down", "right"];
      var choice = moveArr[Math.floor(Math.random() * moveArr.length)];
      switch (choice) {
        case "left":
          this.left = true;
          break;
        case "up":
          this.up = true;
          break;
        case "down":
          this.down = true;
          break;
        case "right":
          this.right = true;
          break;
        default:
      }
    }
  }, {
    key: "collidedWith",
    value: function collidedWith(object) {
      if (this.x < object.x + object.width && this.x + this.width > object.x && this.y < object.y + object.height && this.height + this.y > object.y) {
        this.health -= 20;
        this.shield = true;
        this.explosionMusic();
        this.ctx.drawImage(this.image, this.row, 0, 100, 100, this.x, this.y, 50, 50);
      }
    }
  }, {
    key: "turnAllFalse",
    value: function turnAllFalse() {
      this.left = false;
      this.right = false;
      this.up = false;
      this.down = false;
    }
  }, {
    key: "moveLeft",
    value: function moveLeft() {
      if (this.x > 0) {
        this.x -= 2;
      }
    }
  }, {
    key: "moveUp",
    value: function moveUp() {
      if (this.y > 0) {
        this.y -= 2;
      }
    }
  }, {
    key: "moveDown",
    value: function moveDown() {
      if (this.y < this.ctx.canvas.height / 1.4) {
        this.y += 2;
      }
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      if (this.x < this.ctx.canvas.width - 50) {
        this.x += 2;
      }
    }
  }, {
    key: "bulletConditional",
    value: function bulletConditional() {
      var _this = this;

      var newArr = [];
      this.bullets.forEach(function (bullet) {
        if (bullet.y < _this.ctx.canvas.height) {
          newArr.push(bullet);
        }
      });

      this.bullets = newArr;
    }
  }]);

  return BigEnemy;
}();

module.exports = BigEnemy;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map