<template>
  <div></div>
</template>

<script setup>
// 导入pixi.js
import * as PIXI from "pixi.js";
import { GlowFilter, OutlineFilter } from "pixi-filters";

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
// 设置精灵的位置
sprite.x = app.screen.width / 2;
sprite.y = app.screen.height / 2;
// 设置精灵的缩放
sprite.scale.set(0.5);
// 设置精灵的锚点
sprite.anchor.set(0.5);
// 将精灵添加到舞台
app.stage.addChild(sprite);

// 创建模糊滤镜
// const blurFilter = new PIXI.BlurFilter();
// // 设置模糊滤镜的模糊程度
// blurFilter.blur = 20;
// // 将模糊滤镜添加到精灵上
// sprite.filters = [blurFilter];

// // 监听鼠标是否进入精灵
// sprite.eventMode = "static";
// sprite.on("pointerover", () => {
//   blurFilter.blur = 0;
// })
// sprite.on("pointerout", () => {
//   blurFilter.blur = 20;
// })

// 创建轮廓滤镜
// 5 为轮廓宽度，0xffff00为轮廓颜色
const outlineFilter = new OutlineFilter(5, 0xffff00);

const glowFilter = new GlowFilter({
  distance: 50,
  outerStrength: 5,
  innerStrength: 0,
  color: 0xff0000,
  quality: 0.5
});

// 将滤镜添加到精灵上
sprite.filters = [outlineFilter, glowFilter];
</script>

<style></style>
