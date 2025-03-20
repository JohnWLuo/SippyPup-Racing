document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-button");
    const resetButton = document.getElementById("reset-button");
    const timerDisplay = document.getElementById("timer");
    let timer = 0;
    let timerInterval;

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

            if (this.position + (this.img.width / window.innerWidth) * 100 < 100) {
                this.animationFrameId = requestAnimationFrame(this.moveImage.bind(this));
            } else {
                this.position = 100 - (this.img.width / window.innerWidth) * 100;
                this.img.style.left = this.position + "%";
                this.distanceDisplay.textContent = "100%"; // Ensure distance shows 100%
                this.isMoving = false;
                clearInterval(this.timeInterval);
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

    const img1 = new MovingImage("moving-image-1", "distance-1", "speed-1", "time-1");
    const img2 = new MovingImage("moving-image-2", "distance-2", "speed-2", "time-2");
    const img3 = new MovingImage("moving-image-3", "distance-3", "speed-3", "time-3");

    startButton.addEventListener("click", function() {
        if (!img1.isMoving && !img2.isMoving && !img3.isMoving) {
            img1.start();
            img2.start();
            img3.start();
        }
    });

    resetButton.addEventListener("click", function() {
        img1.reset();
        img2.reset();
        img3.reset();
    });

    // Fetch and display the update text
    fetch('update.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('update-text').textContent = `Version Number: ${data.count}`;
        })
        .catch(error => {
            console.error('Error fetching update text:', error);
            document.getElementById('update-text').textContent = 'Error loading update text';
        });
});
