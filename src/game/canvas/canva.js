// მუდმივა
const PADDING = 20; // მარჯვენა, მარცხენა, ზედა და ქვედა ზღვარი კენვასის გარშემო

// ქუქიების მართვის ფუნქციები
const CookieManager = {
  // ქუქის შექმნა სახელით, მნიშვნელობით და ვადით (დღეებში)
  setCookie(name, value, days = 30) {
    const date = new Date(); // ახალი თარიღის ობიექტის შექმნა
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // ვადის განსაზღვრა მილიწამებში
    const expires = `expires=${date.toUTCString()}`; // ვადის ტექსტური ფორმატირება
    document.cookie = `${name}=${value};${expires};path=/`; // ქუქის ჩაწერა
  },

  // ქუქის მნიშვნელობის წამოღება სახელით
  getCookie(name) {
    const cookieName = `${name}=`; // ქუქის სახელის ფორმატირება
    const cookies = document.cookie.split(";"); // ყველა ქუქის გაყოფა
    for (let cookie of cookies) {
      cookie = cookie.trim(); // ცარიელი ადგილების მოცილება
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length); // ქუქის მნიშვნელობის დაბრუნება
      }
    }
    return null; // თუ ვერ მოიძებნა, დააბრუნე null
  },

  // მულტიპლიკატორის და მისი ისტორიის შენახვა ქუქიში
  storeMultiplier(multiplier) {
    this.setCookie("lastMultiplier", multiplier); // ბოლო მულტიპლიკატორის შენახვა
    let history = JSON.parse(this.getCookie("multiplierHistory") || "[]"); // ისტორიის წამოღება ან ცარიელი მასივი
    history.unshift({
      multiplier: multiplier,
      timestamp: new Date().toISOString(), // მიმდინარე დროის დამატება
    });
    history = history.slice(0, 10); // მხოლოდ ბოლო 10 ჩანაწერის შენახვა
    this.setCookie("multiplierHistory", JSON.stringify(history)); // განახლებული ისტორიის შენახვა
  },

  // მულტიპლიკატორის ისტორიის წამოღება ქუქიდან
  getMultiplierHistory() {
    return JSON.parse(this.getCookie("multiplierHistory") || "[]"); // ისტორიის გაშიფვრა და დაბრუნება
  },

  // ბოლო მულტიპლიკატორის წამოღება
  getLastMultiplier() {
    return parseFloat(this.getCookie("lastMultiplier") || "0"); // მნიშვნელობის რიცხვად გარდაქმნა
  },
};

// მთავარი თამაშის კლასი — მართავს თვითმფრინავის ანიმაციას და ლოგიკას
class AviatorGame {
  constructor(ctx, width, height) {
    this.ctx = ctx; // კენვასის კონტექსტი
    this.width = width; // კენვასის სიგანე
    this.height = height; // კენვასის სიმაღლე
    this.onGameEnd = null; // callback ფუნქცია თამაშის დასრულებაზე
    this.onMultiplierChange = null; // callback მულტიპლიკატორის ცვლილებაზე
    this.animationFrame = null; // ანიმაციის კადრის ID
    this.imageLoaded = false; // თვითმფრინავის გამოსახულების ჩატვირთვის სტატუსი
    this.initializeGame(); // თამაშის ინიციალიზაცია
  }

  // საწყისი პარამეტრების დაყენება
  initializeGame() {
    this.planeWidth = 150; // თვითმფრინავის სიგანე
    this.planeHeight = 150; // თვითმფრინავის სიმაღლე
    this.x = PADDING + 100; // საწყისი პოზიცია X ღერძზე
    this.y = this.height - 100; // საწყისი პოზიცია Y ღერძზე

    this.speed = 4; // საწყისი სიჩქარე (ჰორიზონტალურად)
    this.ascendSpeed = Math.tan((20 * Math.PI) / 180) * this.speed; // ვერტიკალური სიჩქარე 20 გრადუსით

    this.allTrailPoints = [{ x: this.x, y: this.y }]; // კვამლის კვალის საწყისი წერტილი
    this.maxTrailLength = this.width; // კვალი ეკრანზე მაქსიმალურად
    this.finalTrailPoints = null; // საბოლოო კვალი თვითმფრინავის გაფრენისას
    this.trailHeight = 2000; // კვალის სიმაღლე

    this.currentMultiplier = 0; // მულტიპლიკატორის საწყისი მნიშვნელობა
    this.isFlying = true; // ფლობს თუ არა თვითმფრინავი
    this.hasStopped = false; // შეჩერდა თუ არა თამაში
    this.flyingAway = false; // გაფრინდა თუ არა თვითმფრინავი
    this.finalMultiplier = 0; // საბოლოო მულტიპლიკატორი
    this.isResetting = false; // თამაშის გადატვირთვის პროცესი მიმდინარეობს

    // თვითმფრინავის სურათის ჩატვირთვა
    this.planeImage = new Image(); // ახალი სურათის ობიექტი
    this.planeImage.onload = () => {
      const aspectRatio =
        this.planeImage.naturalWidth / this.planeImage.naturalHeight;
      this.planeHeight = this.planeWidth / aspectRatio; // პროპორციების შენარჩუნება
      this.imageLoaded = true;
    };
    this.planeImage.onerror = () => {
      console.error("ვერ ჩაიტვირთა თვითმფრინავის სურათი");
      this.imageLoaded = false;
    };
    this.planeImage.src = "/assets/aviator-image.png"; // სურათის ბილიკი
  }

  // თამაშის დასრულების callback ფუნქციის რეგისტრაცია
  onGameEnded(callback) {
    this.onGameEnd = callback;
  }

  // ამჟამინდელი მულტიპლიკატორის მიღება
  getCurrentMultiplier() {
    return this.flyingAway ? this.finalMultiplier : this.currentMultiplier;
  }

  // საბოლოო მულტიპლიკატორის მიღება
  getFinalMultiplier() {
    return this.finalMultiplier;
  }

  // თვითმფრინავის წითელი კვალის დახატვა
  drawTrail() {
    const points = this.flyingAway
      ? this.finalTrailPoints
      : this.allTrailPoints;

    if (!points || points.length < 2) return;

    this.ctx.beginPath(); // ხატვის დასაწყისი

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

    this.ctx.closePath(); // გზა დახურვა
    this.ctx.fillStyle = "rgba(155, 7, 7, 0.82)"; // ფერი კვალისთვის
    this.ctx.fill(); // კვალის შევსება
  }

  // თვითმფრინავის და კვალის დახატვა
  draw() {
    if (this.isResetting) return;

    this.ctx.clearRect(0, 0, this.width, this.height); // კენვასის გაწმენდა
    this.drawTrail(); // კვალის დახატვა

    if (this.imageLoaded && this.planeImage.complete) {
      // თუ სურათი ჩატვირთულია — დახატე თვითმფრინავი
      this.ctx.save();
      this.ctx.translate(
        this.x + this.planeWidth / 2,
        this.y + this.planeHeight / 2
      );
      this.ctx.rotate((-1 * Math.PI) / 180); // მცირე როტაცია
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
      // დროებითი წითელი ოთხკუთხედი თვითმფრინავის ნაცვლად
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

  // თვითმფრინავის პოზიციის განახლება
  update() {
    if (this.isResetting || !this.isFlying) return;

    if (this.hasStopped) {
      CookieManager.storeMultiplier(this.finalMultiplier); // მულტიპლიკატორის შენახვა
      if (this.onGameEnd) this.onGameEnd(this.finalMultiplier); // callback
      this.prepareReset(); // თამაშის გადატვირთვა
      return;
    }

    this.x += this.speed; // მარჯვნივ მოძრაობა
    this.y -= this.ascendSpeed; // მაღლა მოძრაობა

    if (this.flyingAway) {
      // გაფრენისას სიჩქარის გაზრდა
      const speedMultiplier = 1.05;
      this.speed *= speedMultiplier;
      this.ascendSpeed *= speedMultiplier;

      if (this.y < -this.planeHeight) {
        this.hasStopped = true; // თუ ეკრანს გაცდა — დასრულდეს
      }
    } else {
      // ჩვეულებრივი ფრენა
      const multiplierIncrease = Math.random() * 0.03 + 0.01;
      this.currentMultiplier += multiplierIncrease;

      if (this.onMultiplierChange) {
        this.onMultiplierChange(this.currentMultiplier);
      }

      this.allTrailPoints.push({ x: this.x, y: this.y });

      while (this.allTrailPoints[0].x < this.x - this.maxTrailLength) {
        this.allTrailPoints.shift(); // ძველი წერტილების წაშლა
      }

      if (Math.random() < 0.01 && this.currentMultiplier > 1.1) {
        // გაფრენის შანსი
        this.flyingAway = true;
        this.finalMultiplier = this.currentMultiplier;
        this.finalTrailPoints = [...this.allTrailPoints];
        this.speed *= 1.2;
        this.ascendSpeed *= 1.2;
      }
    }
  }

  // თამაშის გადატვირთვა დაყოვნებით
  prepareReset() {
    if (this.isResetting) return;
    this.isResetting = true;

    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawTrail(); // საბოლოო კვალის დახატვა

    setTimeout(() => {
      this.initializeGame(); // თამაშის ხელახლა ინიციალიზაცია
    }, 3000); // 3 წამით დაყოვნება
  }

  // ანიმაციის დაწყება
  startAnimation() {
    const animate = () => {
      this.update(); // ლოგიკის განახლება
      this.draw(); // დახატვა
      this.animationFrame = requestAnimationFrame(animate); // ციკლის გაგრძელება
    };
    this.animationFrame = requestAnimationFrame(animate);
  }

  // ანიმაციის გაჩერება
  stopAnimation() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  // თამაშის ხელით გადატვირთვა
  reset() {
    this.stopAnimation();
    this.initializeGame();
    this.startAnimation();
  }

  // ქუქიდან ისტორიის წამოღება
  getMultiplierHistory() {
    return CookieManager.getMultiplierHistory();
  }

  // ბოლო მულტიპლიკატორის წამოღება ქუქიდან
  getLastStoredMultiplier() {
    return CookieManager.getLastMultiplier();
  }

  // მულტიპლიკატორის ცვლილების callback რეგისტრაცია
  onMultiplierUpdate(callback) {
    this.onMultiplierChange = callback;
  }
}

// ფუნქცია თამაშის დასაწყებად
export const initializeGame = (canvas, multiplierDisplay) => {
  const ctx = canvas.getContext("2d"); // 2D კონტექსტის მიღება

  // კენვასისთვის padding-ის დამატება
  canvas.style.padding = `${PADDING}px`;
  canvas.style.boxSizing = "border-box";

  // ობსერვერი, რომელიც აკვირდება მულტიპლიკატორის გამოსახვას
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "characterData" || mutation.type === "childList") {
        CookieManager.getLastMultiplier(); // დროებითი ქმედება
      }
    });
  });

  // მულტიპლიკატორის გამოსახულების დაკვირვება
  observer.observe(multiplierDisplay, {
    characterData: true,
    childList: true,
    subtree: true,
  });

  // კენვასის ზომის განახლება ეკრანის შესაბამისად
  function updateCanvasSize() {
    canvas.width = window.innerWidth - PADDING * 2;
    canvas.height = window.innerHeight - PADDING * 2;
  }

  updateCanvasSize(); // საწყისი ზომის დაყენება

  const game = new AviatorGame(ctx, canvas.width, canvas.height); // თამაშის ობიექტის შექმნა
  window.aviatorGame = game; // გლობალურად ხელმისაწვდომობა
  game.startAnimation(); // ანიმაციის დაწყება

  // ეკრანის ცვლილებაზე რეაგირება
  const handleResize = () => {
    updateCanvasSize();
    game.width = canvas.width;
    game.height = canvas.height;
    game.reset();
  };

  window.addEventListener("resize", handleResize); // ზომის შეცვლის მოვლენაზე მიბმა

  return game; // თამაშის დაბრუნება
};
