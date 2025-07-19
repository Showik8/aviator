const PADDING = 20;
const LOADING_ROTATION_SPEED = 0.05;
const LOADING_DOT_COUNT = 8;
const LOADING_DOT_RADIUS = 5;
const LOADING_DOT_SPACING = 15;
const RESET_TIMEOUT = 3000; // 3 seconds

export let restarting = false;
let randomValue =
  ((Math.random() * Math.random()) / Math.random()) * Math.random() * 15;

class AviatorGame {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.callbacks = {
      gameEnd: null,
      multiplierChange: null,
      loadingChange: null,
      flyingAway: null,
    };
    this.animationFrame = null;
    this.loadingState = {
      active: true,
      rotation: 0,
      dots: Array(LOADING_DOT_COUNT)
        .fill(0)
        .map((_, i) => ({
          alpha: 1 - i / LOADING_DOT_COUNT,
        })),
      resetting: false,
      resetProgress: 0,
    };
    this.initializeGame();
  }

  setLoading(active, resetting = false) {
    if (
      this.loadingState.active === active &&
      this.loadingState.resetting === resetting
    )
      return;

    this.loadingState.active = active;
    this.loadingState.resetting = resetting;

    if (this.callbacks.loadingChange) {
      this.callbacks.loadingChange(active);
    }
  }

  initializeGame() {
    this.setLoading(true);
    restarting = false;

    // Game state
    this.state = {
      planeWidth: 100,
      planeHeight: 100,
      x: PADDING + 100,
      y: this.height - 100,
      speed: 3,
      ascendSpeed: Math.tan((20 * Math.PI) / 180) * 3,
      allTrailPoints: [{ x: PADDING + 100, y: this.height - 100 }],
      maxTrailLength: this.width,
      trailHeight: 2000,
      secretNum: randomValue,
      currentMultiplier: 1,
      isFlying: true,
      hasStopped: false,
      flyingAway: false,
      finalMultiplier: 0,
      isResetting: false,
      imageLoaded: false,
      finalTrailPoints: null,
    };

    // Load plane image
    this.planeImage = new Image();
    this.planeImage.onload = () => {
      const aspectRatio =
        this.planeImage.naturalWidth / this.planeImage.naturalHeight;
      this.state.planeHeight = this.state.planeWidth / aspectRatio;
      this.state.imageLoaded = true;
      this.setLoading(false);
    };
    this.planeImage.onerror = () => {
      console.error("Failed to load plane image");
      this.state.imageLoaded = false;
      this.setLoading(false);
    };
    this.planeImage.src = "/assets/aviator-image.png";
  }

  // Callback registration methods
  onGameEnded(callback) {
    this.callbacks.gameEnd = callback;
  }
  onLoadingStateChange(callback) {
    this.callbacks.loadingChange = callback;
  }
  onMultiplierUpdate(callback) {
    this.callbacks.multiplierChange = callback;
  }

  // Accessors
  getCurrentMultiplier() {
    return this.state.flyingAway
      ? this.state.finalMultiplier
      : this.state.currentMultiplier;
  }

  getFinalMultiplier() {
    return this.state.finalMultiplier;
  }

  // Drawing methods
  drawTrail() {
    const points = this.state.flyingAway
      ? this.state.finalTrailPoints
      : this.state.allTrailPoints;
    if (!points || points.length < 2) return;

    this.ctx.beginPath();
    const lastPoint = points[points.length - 1];
    this.ctx.moveTo(lastPoint.x, lastPoint.y);
    this.ctx.lineTo(lastPoint.x, lastPoint.y + this.state.trailHeight);

    for (let i = points.length - 1; i >= 0; i--) {
      this.ctx.lineTo(points[i].x, points[i].y + this.state.trailHeight);
    }

    const firstPoint = points[0];
    this.ctx.lineTo(firstPoint.x, firstPoint.y + 100);

    for (let i = 1; i < points.length; i++) {
      this.ctx.lineTo(points[i].x, points[i].y + 100);
    }

    this.ctx.closePath();
    this.ctx.fillStyle = "#9b0707";
    this.ctx.fill();
  }

  drawResetSpinner() {
    const centerX = this.width / 2;
    const centerY = this.height / 2;

    // Draw semi-transparent overlay
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Draw reset text
    this.ctx.fillStyle = "white";
    this.ctx.font = "32px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Resetting Game", centerX, centerY - 70);

    // Draw progress text
    const secondsLeft = Math.ceil(
      (RESET_TIMEOUT - this.loadingState.resetProgress) / 1000
    );
    this.ctx.font = "32px Arial";
    this.ctx.fillText(`Starting in ${secondsLeft}s`, centerX, centerY + 80);

    // Draw outer circle
    this.ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    this.ctx.lineWidth = 8;
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, 40, 0, Math.PI * 2);
    this.ctx.stroke();

    // Draw progress arc
    const progress = this.loadingState.resetProgress / RESET_TIMEOUT;
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + Math.PI * 2 * progress;

    this.ctx.strokeStyle = "#3498db";
    this.ctx.lineWidth = 8;
    this.ctx.lineCap = "round";
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, 40, startAngle, endAngle);
    this.ctx.stroke();

    // Draw rotating spinner
    this.ctx.save();
    this.ctx.translate(centerX, centerY);
    this.ctx.rotate(this.loadingState.rotation);

    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const size = 8;
      const x = Math.cos(angle) * 30;
      const y = Math.sin(angle) * 30;

      this.ctx.fillStyle = `rgba(52, 152, 219, ${0.1 + i * 0.1})`;
      this.ctx.beginPath();
      this.ctx.arc(x, y, size, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.ctx.restore();
  }

  drawLoadingAnimation() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw semi-transparent overlay
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    this.ctx.fillRect(0, 0, this.width, this.height);

    const centerX = this.width / 2;
    const centerY = this.height / 2;

    // Draw loading text
    this.ctx.fillStyle = "white";
    this.ctx.font = "32px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Loading Game", centerX, centerY - 140);

    // Draw rotating dots
    this.ctx.save();
    this.ctx.translate(centerX, centerY);
    this.ctx.rotate(this.loadingState.rotation);

    this.loadingState.dots.forEach((dot, i) => {
      const angle = (i / LOADING_DOT_COUNT) * Math.PI * 2;
      const x = Math.cos(angle) * 30;
      const y = Math.sin(angle) * 30;

      this.ctx.beginPath();
      this.ctx.arc(x, y, LOADING_DOT_RADIUS, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${dot.alpha})`;
      this.ctx.fill();
    });

    this.ctx.restore();
  }

  drawPlane() {
    if (this.state.imageLoaded && this.planeImage.complete) {
      this.ctx.save();
      this.ctx.translate(
        this.state.x + this.state.planeWidth / 2,
        this.state.y + this.state.planeHeight / 2
      );
      this.ctx.rotate((-1 * Math.PI) / 100);
      this.ctx.drawImage(
        this.planeImage,
        -this.state.planeWidth / 2,
        -this.state.planeHeight / 2,
        this.state.planeWidth,
        this.state.planeHeight
      );
      this.ctx.restore();
    } else {
      // Fallback plane representation
      this.ctx.save();
      this.ctx.translate(
        this.state.x + this.state.planeWidth / 2,
        this.state.y + this.state.planeHeight / 2
      );
      this.ctx.rotate((-1 * Math.PI) / 180);
      this.ctx.fillStyle = "#e74c3c";
      this.ctx.beginPath();
      this.ctx.moveTo(-this.state.planeWidth / 2, -this.state.planeHeight / 4);
      this.ctx.lineTo(this.state.planeWidth / 2, 0);
      this.ctx.lineTo(-this.state.planeWidth / 2, this.state.planeHeight / 4);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.restore();
    }
  }

  drawGameScene() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawTrail();
    this.drawPlane();
  }

  draw() {
    if (this.loadingState.active) {
      if (this.loadingState.resetting) {
        this.drawResetSpinner();
      } else {
        this.drawLoadingAnimation();
      }
    } else {
      this.drawGameScene();
    }
  }

  // Game logic methods
  updateFlight() {
    this.state.x += this.state.speed;
    this.state.y -= this.state.ascendSpeed;

    // Increase multiplier
    const multiplierIncrease = Math.random() * 0.03 + 0.01;
    this.state.currentMultiplier += multiplierIncrease;

    if (this.callbacks.multiplierChange) {
      this.callbacks.multiplierChange(this.state.currentMultiplier);
    }

    // Add new trail point
    this.state.allTrailPoints.push({
      x: this.state.x,
      y: this.state.y,
    });

    // Remove old points
    while (
      this.state.allTrailPoints[0].x <
      this.state.x - this.state.maxTrailLength
    ) {
      this.state.allTrailPoints.shift();
    }

    // Check if plane should fly away
    if (this.state.currentMultiplier > this.state.secretNum) {
      this.state.flyingAway = true;
      this.state.finalMultiplier = this.state.currentMultiplier;
      this.state.finalTrailPoints = [...this.state.allTrailPoints];
      this.state.speed *= 1.2;
      this.state.ascendSpeed *= 1.2;
    }
  }

  updateFlyingAway() {
    const speedMultiplier = 1.05;
    this.state.speed *= speedMultiplier;
    this.state.ascendSpeed *= speedMultiplier;

    this.state.x += this.state.speed;
    this.state.y -= this.state.ascendSpeed;

    // Check if plane has flown off screen
    if (this.state.y < -this.state.planeHeight && !this.state.hasStopped) {
      this.state.hasStopped = true;
      this.prepareReset();
    }
  }

  updateLoadingState() {
    // Update rotation for spinners
    this.loadingState.rotation += LOADING_ROTATION_SPEED;

    // Animate dot opacities for loading animation
    if (!this.loadingState.resetting) {
      this.loadingState.dots.forEach((dot) => {
        dot.alpha = (dot.alpha + 0.02) % 1;
      });
    }

    // Update reset progress
    if (this.loadingState.resetting) {
      this.loadingState.resetProgress += 16; // Approximately 1 frame at 60fps
    }
  }

  update() {
    // Always update loading animations
    this.updateLoadingState();

    if (
      this.loadingState.active ||
      this.state.isResetting ||
      !this.state.isFlying
    )
      return;

    if (this.state.flyingAway) {
      this.updateFlyingAway();
    } else {
      this.updateFlight();
    }
  }

  prepareReset() {
    if (this.state.isResetting) return;
    this.state.isResetting = true;

    // Reset loading state for reset spinner
    this.setLoading(true, true);
    this.loadingState.resetProgress = 0;

    // Generate new random crash point
    randomValue = Math.pow(Math.random(), 3) * 15;

    // Reset after timeout
    setTimeout(() => {
      this.initializeGame();
    }, RESET_TIMEOUT);
  }

  // Animation control
  startAnimation() {
    const animate = (timestamp) => {
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
}

export const initializeGame = (canvas) => {
  const ctx = canvas.getContext("2d");

  // Canvas styling
  canvas.style.padding = `${PADDING}px`;
  canvas.style.boxSizing = "border-box";

  // Canvas sizing
  const updateCanvasSize = () => {
    canvas.width = (window.innerWidth - PADDING * 2) * 1.5;
    canvas.height = (window.innerHeight - PADDING * 2) * 1.5;
  };
  updateCanvasSize();

  // Create game instance
  const game = new AviatorGame(ctx, canvas.width, canvas.height);
  window.aviatorGame = game;
  game.startAnimation();

  // Handle window resize
  const handleResize = () => {
    updateCanvasSize();
    game.width = canvas.width;
    game.height = canvas.height;
    game.reset();
  };
  window.addEventListener("resize", handleResize);

  return game;
};
