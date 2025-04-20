// Constants
const PADDING = 20;

// Cookie management functions
const CookieManager = {
  // Set a cookie with name, value, and expiration in days
  setCookie(name, value, days = 30) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  },

  // Retrieve a cookie value by name
  getCookie(name) {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return null;
  },

  // Store multiplier and its history in cookies
  storeMultiplier(multiplier) {
    this.setCookie("lastMultiplier", multiplier);
    let history = JSON.parse(this.getCookie("multiplierHistory") || "[]");
    history.unshift({
      multiplier: multiplier,
      timestamp: new Date().toISOString(),
    });
    history = history.slice(0, 10);
    this.setCookie("multiplierHistory", JSON.stringify(history));
  },

  // Retrieve the multiplier history from cookies
  getMultiplierHistory() {
    return JSON.parse(this.getCookie("multiplierHistory") || "[]");
  },

  // Get the last recorded multiplier
  getLastMultiplier() {
    return parseFloat(this.getCookie("lastMultiplier") || "0");
  },
};

// Main game class that controls the plane animation and game logic
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
    this.planeWidth = 100;
    this.planeHeight = 50;
    this.x = PADDING + 100;
    this.y = this.height - 100;

    this.speed = 4;
    this.ascendSpeed = Math.tan((20 * Math.PI) / 180) * this.speed;

    this.allTrailPoints = [{ x: this.x, y: this.y }];
    this.maxTrailLength = this.width;
    this.finalTrailPoints = null;
    this.trailHeight = 2000;

    this.currentMultiplier = 0;
    this.isFlying = true;
    this.hasStopped = false;
    this.flyingAway = false;
    this.finalMultiplier = 0;
    this.isResetting = false;

    // Load the plane image
    this.planeImage = new Image();
    this.planeImage.onload = () => {
      const aspectRatio =
        this.planeImage.naturalWidth / this.planeImage.naturalHeight;
      this.planeHeight = this.planeWidth / aspectRatio;
      this.imageLoaded = true;
    };
    this.planeImage.onerror = () => {
      console.error("Failed to load plane image");
      this.imageLoaded = false;
    };
    // Use a placeholder image or your actual image path
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
    this.ctx.fillStyle = "rgba(155, 7, 7, 0.82)";
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
      this.ctx.fillStyle = "red";
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
      // Draw a placeholder rectangle if image is not loaded
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

    if (this.hasStopped) {
      CookieManager.storeMultiplier(this.finalMultiplier);
      if (this.onGameEnd) {
        this.onGameEnd(this.finalMultiplier);
      }
      this.prepareReset();
      return;
    }

    this.x += this.speed;
    this.y -= this.ascendSpeed;

    if (this.flyingAway) {
      const speedMultiplier = 1.05;
      this.speed *= speedMultiplier;
      this.ascendSpeed *= speedMultiplier;

      if (this.y < -this.planeHeight) {
        this.hasStopped = true;
      }
    } else {
      const multiplierIncrease = Math.random() * 0.03 + 0.01;
      this.currentMultiplier += multiplierIncrease;

      if (this.onMultiplierChange) {
        this.onMultiplierChange(this.currentMultiplier);
      }

      this.allTrailPoints.push({ x: this.x, y: this.y });

      while (this.allTrailPoints[0].x < this.x - this.maxTrailLength) {
        this.allTrailPoints.shift();
      }

      if (Math.random() < 0.01 && this.currentMultiplier > 1.1) {
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

    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawTrail();

    setTimeout(() => {
      this.initializeGame();
    }, 2000);
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

  getMultiplierHistory() {
    return CookieManager.getMultiplierHistory();
  }

  getLastStoredMultiplier() {
    return CookieManager.getLastMultiplier();
  }

  onMultiplierUpdate(callback) {
    this.onMultiplierChange = callback;
  }
}

// Export the initialization function
export const initializeGame = (canvas, multiplierDisplay) => {
  const ctx = canvas.getContext("2d");

  // Add padding to canvas
  canvas.style.padding = `${PADDING}px`;
  canvas.style.boxSizing = "border-box";

  // Add observer to capture changes in multiplier text content
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "characterData" || mutation.type === "childList") {
        CookieManager.getLastMultiplier();
      }
    });
  });

  // Start observing changes in the multiplier display element
  observer.observe(multiplierDisplay, {
    characterData: true,
    childList: true,
    subtree: true,
  });

  // Update the canvas size based on window dimensions and padding
  function updateCanvasSize() {
    canvas.width = window.innerWidth - PADDING * 2;
    canvas.height = window.innerHeight - PADDING * 2;
  }

  // Set initial canvas size
  updateCanvasSize();

  // Create and initialize the game
  const game = new AviatorGame(ctx, canvas.width, canvas.height);

  // Make game accessible via window (e.g., for debugging)
  window.aviatorGame = game;

  // Start the animation
  game.startAnimation();

  // Update game and canvas when window is resized
  const handleResize = () => {
    updateCanvasSize();
    game.width = canvas.width;
    game.height = canvas.height;
    game.reset();
  };

  window.addEventListener("resize", handleResize);

  // Return the game instance
  return game;
};
