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

// 添加场景1的资源
PIXI.Assets.addBundle("scene1", {
  ball1: "./textures/ball_1.png",
  ball2: "./textures/ball_2.png",
  ball3: "./textures/ball_3.png",
});

const texturesPromise = PIXI.Assets.loadBundle("scene1", (progress) => {
  console.log("加载完成：", progress);
});

// 加载完成后创建精灵
texturesPromise.then(textures => {
  // 创建容器
  const container = new PIXI.Container();

  // 创建精灵
  const sprite = new PIXI.Sprite(textures.ball1);
  // 设置精灵位置
  sprite.x = app.screen.width / 2;
  sprite.y = app.screen.height / 2;
  // 设置精灵锚点
  sprite.anchor.set(0.5);
  // 设置精灵缩放
  sprite.scale.set(0.5);
  // 设置精灵透明度
  sprite.alpha = 0.5;
  // 设置精灵旋转
  sprite.rotation = 0.5;
  // 设置精灵混合模式
  sprite.blendMode = PIXI.BLEND_MODES.ADD;
  // 设置精灵交互
  sprite.eventMode = "static";
  // 设置于精灵鼠标样式
  sprite.buttonMode = true;
  // 设置精灵鼠标事件
  sprite.on("pointerdown", () => {
    console.log("pointerdown");
  })
  // 添加精灵到舞台
  // app.stage.addChild(sprite);
  container.addChild(sprite);

  // 创建精灵
  const sprite2 = new PIXI.Sprite(textures.ball2);
  // 设置精灵缩放
  sprite2.scale.set(0.5);
  // 添加精灵到舞台
  // app.stage.addChild(sprite2);
  
  container.addChild(sprite2);
  app.stage.addChild(container);
})

</script>

<style></style>
