class MovingImage {
    constructor(imgId, distanceId, speedId, timeId) {
        this.img = document.getElementById(imgId);
        this.distanceDisplay = document.getElementById(distanceId);
        this.speedDisplay = document.getElementById(speedId);
        this.timeDisplay = document.getElementById(timeId);
        this.position = 0;
        this.isMoving = false;
        this.animationFrameId = null;
        this.speed = this.getRandomSpeed();
        this.startTime = 0;
        this.timeInterval = null;
        this.onMove = null;
    }

    getRandomSpeed() {
        return Math.random() * 2 + 0.5; // Random speed between 0.5% and 2% of the screen width per frame
    }

    moveImage() {
        if (!this.isMoving) return;
        this.position += this.speed / 100;
        this.img.style.left = this.position + "%";
        const scaledPosition = (this.position / (100 - (this.img.width / window.innerWidth) * 100)) * 100;
        this.distanceDisplay.textContent = scaledPosition.toFixed(2) + "%";

        if (this.onMove) this.onMove();

        if (this.position + (this.img.width / window.innerWidth) * 100 < 100) {
            this.animationFrameId = requestAnimationFrame(this.moveImage.bind(this));
        } else {
            this.position = 100 - (this.img.width / window.innerWidth) * 100;
            this.img.style.left = this.position + "%";
            this.distanceDisplay.textContent = "100%"; // Ensure distance shows 100%
            this.isMoving = false;
            clearInterval(this.timeInterval);
            if (this.onMove) this.onMove();
        }
    }

    changeSpeed() {
        if (!this.isMoving) return;
        this.speed = this.getRandomSpeed();
        this.speedDisplay.textContent = this.speed.toFixed(2) + "%";
        setTimeout(this.changeSpeed.bind(this), Math.random() * 500 + 500);
    }

    start() {
        this.isMoving = true;
        this.startTime = Date.now();
        this.timeInterval = setInterval(() => {
            const elapsedTime = Date.now() - this.startTime;
            this.timeDisplay.textContent = `Time: ${(elapsedTime / 1000).toFixed(3)}s`;
        }, 10);
        this.moveImage();
        this.changeSpeed();
    }

    reset() {
        this.isMoving = false;
        cancelAnimationFrame(this.animationFrameId);
        clearInterval(this.timeInterval);
        this.position = 0;
        this.img.style.left = this.position + "%";
        this.speedDisplay.textContent = "0%";
        this.distanceDisplay.textContent = "0%";
        this.timeDisplay.textContent = "0.000s";
    }
}

export default MovingImage;
