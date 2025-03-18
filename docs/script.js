document.addEventListener("DOMContentLoaded", function() {
    const img = document.getElementById("moving-image");
    const speedCounter = document.getElementById("speed-counter");
    let position = 0;

    function getRandomSpeed() {
        return Math.random() * 1.5 + 0.5; // Random speed between 0.5 and 2
    }

    let speed = getRandomSpeed();

    function moveImage() {
        position += speed;
        img.style.left = position + "px";

        // Stop the image when it reaches the end of the screen
        if (position + img.width < window.innerWidth) {
            requestAnimationFrame(moveImage);
        }
    }

    function changeSpeed() {
        speed = getRandomSpeed();
        speedCounter.textContent = `Current speed: ${speed.toFixed(2)}`;
        setTimeout(changeSpeed, Math.random() * 1000 + 500); 
    }

    moveImage();
    changeSpeed();

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
