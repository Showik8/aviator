import React, { useEffect, useRef } from "react";
import planeImage from "../gameAssets/aviator-image.png";

// Cookie management utility
const CookieManager = {
  setCookie(name, value, days = 30) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  },

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

  getMultiplierHistory() {
    return JSON.parse(this.getCookie("multiplierHistory") || "[]");
  },

  getLastMultiplier() {
    return parseFloat(this.getCookie("lastMultiplier") || "0");
  },
};

class AviatorGameLogic {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.onGameEnd = null;
    this.onMultiplierChange = null;
    this.initializeGame();
  }

  initializeGame() {
    const PADDING = 20;
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

    this.planeImage = new Image();
    this.planeImage.src = planeImage;
    this.planeImage.onload = () => {
      const aspectRatio =
        this.planeImage.naturalWidth / this.planeImage.naturalHeight;
      this.planeHeight = this.planeWidth / aspectRatio;
    };
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

    if (this.planeImage.complete) {
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
    }

    const displayMultiplier = this.flyingAway
      ? this.finalMultiplier
      : this.currentMultiplier;

    if (this.onMultiplierChange) {
      this.onMultiplierChange(displayMultiplier.toFixed(2));
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

  reset() {
    this.initializeGame();
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

const AviatorGame = ({ onMultiplierUpdate }) => {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const multiplierRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const PADDING = 20;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth - PADDING * 2;
      canvas.height = window.innerHeight - PADDING * 2;
      if (gameRef.current) {
        gameRef.current.width = canvas.width;
        gameRef.current.height = canvas.height;
        gameRef.current.reset();
      }
    };

    updateCanvasSize();

    gameRef.current = new AviatorGameLogic(ctx, canvas.width, canvas.height);

    if (onMultiplierUpdate) {
      gameRef.current.onMultiplierUpdate(onMultiplierUpdate);
    }

    const animate = () => {
      if (gameRef.current) {
        gameRef.current.update();
        gameRef.current.draw();
      }
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      updateCanvasSize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [onMultiplierUpdate]);

  return (
    <div style={{ position: "relative" }}>
      <canvas
        ref={canvasRef}
        id="aviator"
        style={{
          padding: "20px",
          boxSizing: "border-box",
        }}
      />
      <div
        ref={multiplierRef}
        className="multiplier"
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          fontSize: "24px",
          color: "#fff",
        }}
      >
        1.00x
      </div>
    </div>
  );
};

export default AviatorGame;
