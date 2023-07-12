// 返回一个在[min, max]之间的随机数
function getRandForNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// 创建敌机
function createEnemy(width, height, imageURL, canvas) {
  var enemy = new Enemy(width, height, imageURL, canvas);
  return enemy;
}

function Enemy(width, height, imageURL, canvas) {
  var canvasWidth = canvas.width; 
  var x = getRandForNumber(0, canvasWidth - width);
  this.x = x;
  this.y  = -height;
  this.width = width;
  this.height = height;
  // 速度随机3~10
  this.speed = getRandForNumber(3, 10);
  this.image = new Image();
  this.image.src = imageURL;
}

Enemy.prototype.draw = function (canvas) {
  var context = canvas.getContext("2d");
  context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
}

Enemy.prototype.move = function () {
  this.y += this.speed;
}

Enemy.prototype.isOutOfScreen = function (canvas) {
  if(this.y >= canvas.height) {
    return true;
  } else {
    return false;
  }
}

Enemy.prototype.crash = function () {
  var endSound = new Audio("audio/game_over.mp3");
  endSound.play();
}

// 碰撞检测，判断两个对象是否有交集，obj1和obj2必须要有x，y，width，height属性
function isEnemyHitHero(obj1, obj2) {
  var minX1 = obj1.x;
  var maxX1 = obj1.x + obj1.width;

  var minY1 = obj1.y;
  var maxY1 = obj1.y + obj1.height;

  var minX2 = obj2.x;
  var maxX2 = obj2.x + obj2.width;

  var minY2 = obj2.y;
  var maxY2 = obj2.y + obj2.height;

  var minX = Math.max(minX1, minX2);
  var maxX = Math.min(maxX1, maxX2);
  
  var minY = Math.max(minY1, minY2);
  var maxY = Math.min(maxY1, maxY2);

  if(minX < maxX && minY < maxY) {
    return true;
  } else {
    return false;
  }
}