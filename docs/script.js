import MovingImage from './MovingImage.js';

document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-button");
    const resetButton = document.getElementById("reset-button");
    const leaderboardBody = document.querySelector("tbody");

    const img1 = new MovingImage("moving-image-1", "distance-1", "speed-1", "time-1");
    const img2 = new MovingImage("moving-image-2", "distance-2", "speed-2", "time-2");
    const img3 = new MovingImage("moving-image-3", "distance-3", "speed-3", "time-3");

    const images = [img1, img2, img3];

    function updateLeaderboard() {
        images.sort((a, b) => {
            if (b.position !== a.position) {
                return b.position - a.position;
            } else {
                return a.startTime - b.startTime;
            }
        });

        leaderboardBody.innerHTML = "";
        images.forEach((img, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="${img.img.src}" alt="Moving Image ${index + 1}" style="width: 50px; height: 50px; transform: scaleX(-1);"></td>
                <td id="distance-${index + 1}">${img.distanceDisplay.textContent}</td>
                <td id="speed-${index + 1}">${img.speedDisplay.textContent}</td>
                <td id="time-${index + 1}">${img.timeDisplay.textContent}</td>
            `;
            leaderboardBody.appendChild(row);
        });
    }

    images.forEach(img => {
        img.onMove = updateLeaderboard;
    });

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
        updateLeaderboard();
    });

    // Fetch and display the update text
    fetch('update.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('update-text').textContent = `Version Number: ${data.count}`;
        })
        .catch(error => {
            console.error('Error fetching update text:', error);
            document.getElementById('update-text').textContent = 'Error loading update text';
        });
});
