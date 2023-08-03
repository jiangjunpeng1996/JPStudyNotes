<template>
  <div>
    <PixiDemo />
  </div>
</template>

<script setup>
// import PixiDemo from "./components/01-第一个pixi应用.vue";
// import PixiDemo from "./components/02-pixi图形Graphics具体应用.vue";
// import PixiDemo from "./components/03-pixi绘制各种常见图形.vue";
// import PixiDemo from "./components/04-pixi纹理与动画实现.vue"
// import PixiDemo from "./components/05-事件交互.vue";
// import PixiDemo from "./components/06-pixi资源管理.vue";
// import PixiDemo from "./components/06-pixi资源管理2.vue";
// import PixiDemo from "./components/07-pixi文字与遮罩.vue";
// import PixiDemo from "./components/08-pixi滤镜特效.vue";
// import PixiDemo from "./components/09-应用pixi实现波浪水滴特效主页.vue"
import PixiDemo from "./components/10-pixi开发谷歌恐龙跑酷小游戏.vue";

</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

canvas {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
