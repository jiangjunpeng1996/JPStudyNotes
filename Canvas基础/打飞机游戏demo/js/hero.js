/**
 * 创建主角飞机的方法
 * @param {*} width 主角的宽度
 * @param {*} height 主角的高度
 * @param {*} canvas 主角所在的画布对象
 * @param {*} imageUrl 主角的图片
 * @param {*} completeCallback 图片加载完之后的回调函数
 * @returns 
 */
function createHero(width, height, canvas, imageUrl, completeCallback) {
  var timer;
  var canvasWidth = canvas.width;
  var canvasHeight = canvas.height;

  // 飞机水平居中
  var x = canvasWidth / 2 - width / 2;
  // 飞机垂直底部向上20px
  var y = canvasHeight - height - 20;

  var hero = new Hero(x, y, width, height, imageUrl, completeCallback);

  // 通过上下左右控制飞机方向
  document.onkeydown = function(event) {
    var e = event || window.event;

    switch (e.keyCode) {
      case 37: {
        hero.left = true;
        break;
      }
      case 38: {
        hero.up = true;
        break;
      }
      case 39: {
        hero.right = true;
        break;
      }
      case 40: {
        hero.down = true;
        break;
      }
    }

    // 阻止默认事件
    e.preventDefault();
  }

  document.onkeyup = function(event) {
    var e = event || window.event;

    switch (e.keyCode) {
      case 37: {
        hero.left = false;
        break;
      }
      case 38: {
        hero.up = false;
        break;
      }
      case 39: {
        hero.right = false;
        break;
      }
      case 40: {
        hero.down = false;
        break;
      }
    }
  }

  timer = setInterval(() => {
    if(hero.left == true) hero.x -= 2;
    if(hero.up == true) hero.y -= 2;
    if(hero.right == true) hero.x += 2;
    if(hero.down == true) hero.y += 2;
  }, 10)

  return hero;
}

function Hero(x, y, width, height, imageUrl, completeCallback) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.imageUrl = imageUrl;

  this.image = new Image();

  this.image.onload = function () {
    if(completeCallback) {
      completeCallback(this);
    }
  }

  // 添加图片源
  this.image.src = imageUrl;

  // 用来切换飞机飞行的两张图片
  this.bool = true;
}

// 绘制主角飞机的方法
Hero.prototype.draw = function (canvas) {
  var context = canvas.getContext("2d");
  var x = this.width * this.bool;
  var y = this.y;
  var width = this.width;
  var height = this.height;
  context.drawImage(this.image, x, 0, width, height, this.x, y, width, height);

  this.bool = !this.bool;
}