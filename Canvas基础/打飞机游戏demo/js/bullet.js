/**
 * 创建子弹
 * @param {*} bulletWidth 
 * @param {*} bulletHeight 
 * @param {*} bulletURL 
 * @param {*} hero 
 * @returns 
 */
function createBullet(bulletWidth, bulletHeight, bulletURL, hero) {
  var x = hero.x + hero.width / 2 - bulletWidth / 2;
  var y = hero.y - bulletHeight;
  var bullet = new Bullet(x, y, bulletWidth, bulletHeight, bulletURL);
  
  // 子弹的声音
  var bulletSound = new Audio("audio/bullet.mp3");
  bulletSound.play();

  return bullet;
}

function Bullet(x, y, bulletWidth, bulletHeight, imageURL) {
  this.x = x;
  this.y = y;
  this.bulletWidth = bulletWidth;
  this.bulletHeight = bulletHeight;

  this.image = new Image();
  this.image.src = imageURL;
}

Bullet.prototype.draw = function(canvas) {
  var context = canvas.getContext("2d");
  context.drawImage(this.image, this.x, this.y, this.bulletWidth, this.bulletHeight);
}

Bullet.prototype.move = function() {
  this.y -= 10;
}

Bullet.prototype.isOutOfScreen = function() {
  if(this.y <= -this.h ) {
    return true;
  } else {
    return false;
  }
}