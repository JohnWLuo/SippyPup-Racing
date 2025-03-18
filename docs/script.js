document.addEventListener("DOMContentLoaded", function() {
    const img = document.getElementById("moving-image");
    let position = 0;

    function getRandomSpeed() {
        return Math.random() * 5 + 1; // Random speed between 1 and 6
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

    moveImage();

    // Fetch and display the update text
    fetch('update.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('update-text').textContent = `Last updated: ${data.last_update}`;
        })
        .catch(error => {
            console.error('Error fetching update text:', error);
            document.getElementById('update-text').textContent = 'Error loading update text';
        });
});
