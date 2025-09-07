class SippyPup {
    constructor(imageName, name, isFacingRight) {
        this.imageName = imageName;
        this.name = name;
        this.isFacingRight = isFacingRight;
        this.isMoving = false;
        this.position = 0;
        this.speed = 0;
        this.animationFrameId = null;
        this.timeInterval = null;
        this.startTime = null;
        this.timeDisplay = 0.000;
    }

    getRandomSpeed() {
        return Math.random() * 12 + 0.5; // Random speed between 0.5% and 2% of the screen width per frame
    }
    
    changeSpeed() {
        if (!this.isMoving) return;
        this.speed = this.getRandomSpeed();
        this.speedDisplay = this.speed.toFixed(2) * 8 + " MPH";
        setTimeout(this.changeSpeed.bind(this), Math.random() * 500 + 500);
    }

    moveImage() {
        if (!this.isMoving) return;
        this.position += this.speed / 100;
        this.img.style.left = this.position + "%";
        const scaledPosition = (this.position / (100 - (this.img.width / window.innerWidth) * 100)) * 100;
        this.distanceDisplay = scaledPosition.toFixed(2) + "%";

        if (this.onMove) this.onMove();

        if (this.position + (this.img.width / window.innerWidth) * 100 < 100) {
            this.animationFrameId = requestAnimationFrame(this.moveImage.bind(this));
            const elapsedTime = Date.now() - this.startTime;
            this.timeDisplay = (elapsedTime / 1000).toFixed(3);
        } else {
            this.position = 100 - (this.img.width / window.innerWidth) * 100;
            this.img.style.left = this.position + "%";
            this.distanceDisplay = "100%"; // Ensure distance shows 100%
            this.isMoving = false;

            if (this.onMove) this.onMove();
            console.log(`${this.name} has reached the finish line! at time: ${this.timeDisplay}s`);
        }
    }


    start() {
        this.isMoving = true;
        this.startTime = Date.now();

        this.moveImage();
        this.changeSpeed();
    }

    reset() {
        this.isMoving = false;
        cancelAnimationFrame(this.animationFrameId);
        clearInterval(this.timeInterval);
        this.position = 0;
        this.img.style.left = this.position + "%";
        this.speedDisplay = "0%";
        this.distanceDisplay = "0%";
        this.timeDisplay = 0.000;
    }
}

export default SippyPup;
