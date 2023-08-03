<template>
  <div></div>
</template>

<script setup>
// 导入pixi.js
import * as PIXI from "pixi.js";

// 创建应用
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1,
});

// 将应用画布添加到DOM中
document.body.appendChild(app.view);

// 创建一个纹理
const texture = PIXI.Texture.from("./textures/ball_1.png");

// 创建一个精灵
const sprite = new PIXI.Sprite(texture);

// 设置精灵的锚点
sprite.anchor.set(0.5, 0.5);

// 设置精灵的位置
sprite.x = app.screen.width / 2;
sprite.y = app.screen.height / 2;

// 设置精灵旋转45度
sprite.rotation = Math.PI / 4;

// 设置精灵的缩放
sprite.scale.set(0.5, 0.5);

// 设置精灵的透明度
sprite.alpha = 0.5;

app.stage.addChild(sprite);

// ticker实现动画
app.ticker.add((delta) => {
  sprite.rotation += 0.01 * delta;
})

// 为精灵添加交互事件
sprite.eventMode = "static";
sprite.on("pointerdown", () => {
  console.log("pointerdown");
});

sprite.on("pointerenter", () => {
  sprite.alpha = 1;
});

sprite.on("pointerout", () => {
  sprite.alpha = 0.5;
});

// 绘制1个矩形
const rect = new PIXI.Graphics();
rect.beginFill(0xff0000);
rect.drawRect(0, 0, 100, 100);
rect.endFill();
rect.x = 100;
rect.y = 100;
app.stage.addChild(rect);

// 给矩形添加交互事件
rect.eventMode = "static";
rect.on("", () => {

});

</script>

<style></style>
