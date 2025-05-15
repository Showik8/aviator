const PADDING = 20;

export let restarting = false;
let randomValue = Math.pow(Math.random(), 3) * 15;

class AviatorGame {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.onGameEnd = null;
    this.onMultiplierChange = null;
    this.animationFrame = null;
    this.imageLoaded = false;
    this.initializeGame();
  }

  initializeGame() {
    restarting = false;

    this.planeWidth = this.width * 0.1;
    this.planeHeight = this.height * 0.1;
    this.x = PADDING + 100;
    this.y = this.height - 100;

    this.speed = 3;
    this.ascendSpeed = Math.tan((20 * Math.PI) / 180) * this.speed;

    this.allTrailPoints = [{ x: this.x, y: this.y }];
    this.maxTrailLength = this.width;
    this.finalTrailPoints = null;
    this.trailHeight = 2000;
    this.secretNum = randomValue;
    this.currentMultiplier = 0;
    this.isFlying = true;
    this.hasStopped = false;
    this.flyingAway = false;
    this.finalMultiplier = 0;
    this.isResetting = false;

    this.planeImage = new Image();
    this.planeImage.onload = () => {
      const aspectRatio =
        this.planeImage.naturalWidth / this.planeImage.naturalHeight;
      this.planeHeight = this.planeWidth / aspectRatio;
      this.imageLoaded = true;
    };

    this.planeImage.onerror = () => {
      console.error("ვერ ჩაიტვირთა თვითმფრინავის სურათი");
      this.imageLoaded = false;
    };
    this.planeImage.src = "/assets/aviator-image.png";
  }

  onGameEnded(callback) {
    this.onGameEnd = callback;
  }

  getCurrentMultiplier() {
    return this.flyingAway ? this.finalMultiplier : this.currentMultiplier;
  }

  getFinalMultiplier() {
    return this.finalMultiplier;
  }

  drawTrail() {
    const points = this.flyingAway
      ? this.finalTrailPoints
      : this.allTrailPoints;
    if (!points || points.length < 2) return;

    this.ctx.beginPath();
    const lastPoint = points[points.length - 1];
    this.ctx.moveTo(lastPoint.x, lastPoint.y);
    this.ctx.lineTo(lastPoint.x, lastPoint.y + this.trailHeight);

    for (let i = points.length - 1; i >= 0; i--) {
      const point = points[i];
      this.ctx.lineTo(point.x, point.y + this.trailHeight);
    }

    const firstPoint = points[0];
    this.ctx.lineTo(firstPoint.x, firstPoint.y + 100);

    for (let i = 1; i < points.length; i++) {
      const point = points[i];
      this.ctx.lineTo(point.x, point.y + 100);
    }

    this.ctx.closePath();
    this.ctx.fillStyle = "#9b0707";
    this.ctx.fill();
  }

  draw() {
    if (this.isResetting) return;

    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawTrail();

    if (this.imageLoaded && this.planeImage.complete) {
      this.ctx.save();
      this.ctx.translate(
        this.x + this.planeWidth / 2,
        this.y + this.planeHeight / 2
      );
      this.ctx.rotate((-1 * Math.PI) / 180);
      this.ctx.globalCompositeOperation = "source-over";
      this.ctx.drawImage(
        this.planeImage,
        -this.planeWidth / 2,
        -this.planeHeight / 2,
        this.planeWidth,
        this.planeHeight
      );
      this.ctx.restore();
    } else {
      this.ctx.save();
      this.ctx.translate(
        this.x + this.planeWidth / 2,
        this.y + this.planeHeight / 2
      );
      this.ctx.rotate((-1 * Math.PI) / 180);
      this.ctx.fillStyle = "red";
      this.ctx.fillRect(
        -this.planeWidth / 2,
        -this.planeHeight / 2,
        this.planeWidth,
        this.planeHeight
      );
      this.ctx.restore();
    }
  }

  update() {
    if (this.isResetting || !this.isFlying) return;

    if (this.flyingAway) {
      const speedMultiplier = 1.05;
      this.speed *= speedMultiplier;
      this.ascendSpeed *= speedMultiplier;

      this.x += this.speed;
      this.y -= this.ascendSpeed;

      if (this.y < -this.planeHeight && !this.hasStopped) {
        this.hasStopped = true;

        this.prepareReset();

        // if (this.onGameEnd) this.onGameEnd(this.finalMultiplier);
        //   this.prepareReset();

        // setTimeout(() => {
        //   if (this.onGameEnd) this.onGameEnd(this.finalMultiplier);
        //   this.prepareReset();
        // }, 2000);
      }
    } else {
      this.x += this.speed;
      this.y -= this.ascendSpeed;

      const multiplierIncrease = Math.random() * 0.03 + 0.01;

      this.currentMultiplier += multiplierIncrease;

      if (this.onMultiplierChange) {
        this.onMultiplierChange(this.currentMultiplier);
      }

      this.allTrailPoints.push({ x: this.x, y: this.y });

      while (this.allTrailPoints[0].x < this.x - this.maxTrailLength) {
        this.allTrailPoints.shift();
      }

      if (this.currentMultiplier > this.secretNum) {
        this.restarting = true;
        this.flyingAway = true;
        this.finalMultiplier = this.currentMultiplier;
        this.finalTrailPoints = [...this.allTrailPoints];
        this.speed *= 1.2;
        this.ascendSpeed *= 1.2;
      }
    }
  }

  prepareReset() {
    if (this.isResetting) return;
    this.isResetting = true;

    randomValue = Math.pow(Math.random(), 3) * 15;

    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawTrail();

    setTimeout(() => {
      this.initializeGame();
    }, 5000);
  }

  startAnimation() {
    const animate = () => {
      this.update();
      this.draw();
      this.animationFrame = requestAnimationFrame(animate);
    };
    this.animationFrame = requestAnimationFrame(animate);
  }

  stopAnimation() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  reset() {
    this.stopAnimation();
    this.initializeGame();
    this.startAnimation();
  }

  onMultiplierUpdate(callback) {
    this.onMultiplierChange = callback;
  }
}

export const initializeGame = (canvas) => {
  const ctx = canvas.getContext("2d");

  canvas.style.padding = `${PADDING}px`;
  canvas.style.boxSizing = "border-box";

  function updateCanvasSize() {
    canvas.width = (window.innerWidth - PADDING) * 1.5;
    canvas.height = (window.innerHeight - PADDING) * 1.5;
  }

  updateCanvasSize();

  const game = new AviatorGame(ctx, canvas.width, canvas.height);
  window.aviatorGame = game;
  game.startAnimation();

  const handleResize = () => {
    updateCanvasSize();
    game.width = canvas.width;
    game.height = canvas.height;
    game.reset();
  };

  window.addEventListener("resize", handleResize);

  return game;
};
