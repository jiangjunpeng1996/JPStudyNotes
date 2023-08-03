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
  background: "#fff",
  resolution: window.devicePixelRatio || 1,
  antialias: true
});

// 将应用画布添加到DOM中
document.body.appendChild(app.view);

// 配置
// 恐龙大小
const dinoSize = {
  width: 44,
  height: 47
};

// 恐龙位置
const dinoPosition = {
  x: 50,
  y: app.screen.height - dinoSize.height
};

// 地面高度
const groundHeight = 14;

// 创建容器
const container = new PIXI.Container();

// 将容器添加到舞台
app.stage.addChild(container);

// 添加基础纹理
const baseTexture = PIXI.BaseTexture.from("./textures/game.png");

// 创建恐龙纹理
const dinoTexture = new PIXI.Texture(
  baseTexture,
  new PIXI.Rectangle(40, 1, dinoSize.width, dinoSize.height)
);

// 创建恐龙精灵
const dino = new PIXI.Sprite(dinoTexture);
dino.x = dinoPosition.x;
dino.y = dinoPosition.y - groundHeight;
container.addChild(dino);

// 创建恐龙跑步动画
const runTextures = [];
for (let i = 2; i < 4; i++) {
  runTextures.push(
    new PIXI.Texture(
      baseTexture,
      new PIXI.Rectangle(
        677 + i * dinoSize.width,
        0,
        dinoSize.width,
        dinoSize.height
      )
    )
  )
}

const runAnimation = new PIXI.AnimatedSprite(runTextures);
runAnimation.animationSpeed = 0.1;
runAnimation.x = dinoPosition.x;
runAnimation.y = dinoPosition.y - groundHeight;
runAnimation.visible = false;
runAnimation.play();
container.addChild(runAnimation);

// 创建恐龙跳跃精灵
const jumpTexture = new PIXI.Texture(
  baseTexture,
  new PIXI.Rectangle(677, 0, dinoSize.width, dinoSize.height)
)
const jumpSprite = new PIXI.Sprite(jumpTexture);
jumpSprite.x = dinoPosition.x;
jumpSprite.y = dinoPosition.y - groundHeight;
jumpSprite.visible = false;
container.addChild(jumpSprite);

// 创建地面精灵
const groundTexture = new PIXI.Texture(
  baseTexture,
  new PIXI.Rectangle(2, 54, 1202, groundHeight)
)
// 平铺精灵
const groundSprite = new PIXI.TilingSprite(groundTexture);
groundSprite.width = app.screen.width;
groundSprite.height = groundHeight;
// 设置地面精灵的位置
groundSprite.position.set(0, app.screen.height - 20);
container.addChild(groundSprite);

// 创建仙人掌精灵
const cactusTexture = new PIXI.Texture(
  baseTexture,
  new PIXI.Rectangle(228, 2, 17, 34)
);
const cactusSprite = new PIXI.Sprite(cactusTexture);
cactusSprite.x = app.screen.width;
cactusSprite.y = app.screen.height - 15 - 35;
container.addChild(cactusSprite);

// 创建文字
let startText = new PIXI.Text('开始游戏', {
  fontFamily: "Arial",
  fontSize: 36,
  fill: 0x333333,
  align: "center"
});
startText.x = app.screen.width / 2;
startText.y = app.screen.height / 2;
startText.anchor.set(0.5);
startText.cursor = "pointer"
container.addChild(startText);

startText.eventMode = "static";
startText.on("click", () => {
  playGame();
});

// 是否正在游戏中
let isGameing = false;
// 是否游戏结束
let isGameover = false;
// 开始游戏
const playGame = () => {
  isGameing = true;
  isGameover = false;
  score = 0;
  jumpVelocity = 20;
  startText.visible = false;
  dino.visible = false;
  cactusSprite.x = app.screen.width;
  // 显示恐龙的跑步动画
  runAnimation.visible = true;
}


// 游戏得分
let score = 0;
const scoreText = new PIXI.Text("得分：0", {
  fill: "#666",
})
scoreText.position.x = app.screen.width
scoreText.position.y = 10
scoreText.anchor.x = 1.2
container.addChild(scoreText)

// 初始化跳跃速度
let jumpVelocity = 20
// 初始化重力
let gravity = 1;
// 游戏循环
app.ticker.add(() => {
  if(isGameing) {
    // 地面背景向左移动
    groundSprite.tilePosition.x -= 10;
    // 仙人掌移动
    cactusSprite.x -= 10;
    if(cactusSprite.x < -30) {
      cactusSprite.x = app.screen.width;
      score++;
      scoreText.text = `得分：${score}`
    }
  }
  // 跳跃状态
  if(jumpSprite.visible) {
    // 速度减去重力
    jumpVelocity -= gravity;
    // y值减去速度，向上跳跃
    jumpSprite.y -= jumpVelocity;
    if(jumpSprite.y > runAnimation.y) {
      jumpSprite.visible = false;
      runAnimation.visible = true;
      jumpVelocity = 20;
    }
  }
  // 检测碰撞
  if(
    jumpSprite.y + jumpSprite.height > cactusSprite.y &&
    jumpSprite.x + jumpSprite.width > cactusSprite.x &&
    jumpSprite.x < cactusSprite.x + cactusSprite.width &&
    !isGameover
  ) {
    isGameing = false;
    isGameover = true;
    dino.visible = true;
    runAnimation.visible = false;
    // 创建游戏结束
    const gameOverTexture = new PIXI.Texture(
      baseTexture,
      new PIXI.Rectangle(484, 15, 191, 11)
    )
    const gameOverSprite = new PIXI.Sprite(gameOverTexture)
    gameOverSprite.position.set(app.screen.width / 2, app.screen.height / 2)
    gameOverSprite.anchor.x = 0.5
    gameOverSprite.scale.set(2)
    container.addChild(gameOverSprite)
    // 创建重新开始
    const restartTexture = new PIXI.Texture(
      baseTexture,
      new PIXI.Rectangle(2, 2, 36, 32)
    )
    const restartSprite = new PIXI.Sprite(restartTexture)
    restartSprite.position.set(
      app.screen.width / 2,
      app.screen.height / 2 + gameOverSprite.height + 30
    )
    restartSprite.anchor.x = 0.5;
    restartSprite.eventMode = "static";
    restartSprite.cursor = "pointer";
    restartSprite.on("click", () => {
      container.removeChild(gameOverSprite);
      container.removeChild(restartSprite);
      scoreText.text = `得分：${score}`;
      playGame();
    })
    container.addChild(restartSprite);
  }
});

window.addEventListener("keydown", (e) => {
  if(e.code === "Space") {
    runAnimation.visible = false;
    jumpSprite.visible = true;
  }
})
</script>

<style></style>
