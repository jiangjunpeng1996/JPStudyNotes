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

// 创建一个矩形
const rect = new PIXI.Graphics();
// 填充颜色
rect.beginFill(0x66ccff);
// 绘制矩形
rect.drawRect(100, 100, 164, 64);
// 结束填充
rect.endFill();

// 将矩形添加到舞台
app.stage.addChild(rect);
</script>

<style></style>
