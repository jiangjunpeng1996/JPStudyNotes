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
	// 抗锯齿
	antialias: true
});

// 将应用画布添加到DOM中
document.body.appendChild(app.view);

// 创建一个矩形
const rect = new PIXI.Graphics();

// 设置边框样式：线宽，线颜色，透明度
rect.lineStyle(4, 0xff0000, 1);

// 填充颜色，透明度
rect.beginFill(0x66ccff, 0.8);
// 绘制矩形
rect.drawRect(100, 100, 164, 64);
// 结束填充
rect.endFill();

// 图形的缩放
// rect.scale.set(2, 2);
// 图形的位移
// rect.position.set(100, 100);
// 图形的旋转
// rect.rotation = 0.5;
// 图形的锚点
// rect.pivot.set(82, 32);

// 将矩形添加到舞台
app.stage.addChild(rect);

// 创建一个圆形
const circle = new PIXI.Graphics();
circle.beginFill(0x66ccff, 0.9);
circle.drawCircle(0, 0, 32);
circle.endFill();
circle.position.set(100, 250);
app.stage.addChild(circle);

</script>

<style></style>
