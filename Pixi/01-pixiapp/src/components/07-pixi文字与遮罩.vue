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

// 显示hello Pixi
const text = new PIXI.Text("hello Pixi", {
  fontFamily: "Arial",
  fontSize: 100,
  fill: 0xff0000,
  align: "center",
});

// 设置文字位置
text.x = app.screen.width / 2;
text.y = app.screen.height / 2;

// 设置文字锚点
text.anchor.set(0.5);

// app.stage.addChild(text);

// 创建一个圆形
const circle = new PIXI.Graphics();
circle.beginFill(0x0000ff);
circle.drawCircle(app.screen.width / 2, app.screen.height / 2, 100);
circle.endFill();

// 创建一个精灵
const bunny = PIXI.Sprite.from("./textures/ball_1.png");
// 用精灵铺满整个屏幕
bunny.width = app.screen.width;
bunny.height = app.screen.height;
// 使用文字作为精灵的遮罩
// bunny.mask = text;
bunny.mask = circle;
app.stage.addChild(bunny);
</script>

<style></style>
