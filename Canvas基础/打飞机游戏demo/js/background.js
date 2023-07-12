/**
 * 图片加载方法
 * @param {*} bgUrl 背景图片的URL
 * @param {*} canvas 画布对象，将图片加载到画布上，加载两张
 * @param {*} completeCallback 加载好背景图片之后的回调函数
 */
function loadBackground(bgUrl, canvas, completeCallback) {
  var context = canvas.getContext("2d");

  var width = canvas.width;
  var height = canvas.height;

  var image = new Image();
  image.onload = function () {
    // 绘制第1张图片
    context.drawImage(this, 0, 0, width, height);
    // 绘制第2张图片，用来向下滚动
    context.drawImage(this, 0, -height, width, height);

    // 如果外界提供了回调，那么调用回调函数，并将具体的值回传回去
    if(completeCallback) {
      completeCallback(image);
    }
  }
  image.src = bgUrl;
}


/**
 * 背景图片滚动方法
 * @param {*} canvas 画布对象
 * @param {*} image 背景图片对象
 * @param {*} speed 控制背景图片滚动的速度
*/
// 背景滚动的偏移量
var backgroundOffset = 0;
function animateBackground(canvas, image, speed) {
  var context = canvas.getContext("2d");

  var width = canvas.width;
  var height = canvas.height;

  // 清除画布
  context.clearRect(0, 0, width, height);
  // 保存状态值
  context.save();
  // 更新位置
  backgroundOffset += speed;

  if(backgroundOffset >= height) {
    backgroundOffset = 0;
  }
  // 移动偏移量
  context.translate(0, backgroundOffset);

  // 绘制图片
  context.drawImage(image, 0, 0, width, height)
  context.drawImage(image, 0, -height, width, height);

  // 获取存储的状态值
  context.restore();
}