document.addEventListener("DOMContentLoaded", function() {
    const img = document.getElementById("moving-image");
    let position = 0;

    function getRandomSpeed() {
        return Math.random();
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
        setTimeout(changeSpeed, Math.random()); // Change speed at random intervals between 1 and 3 seconds
    }

    moveImage();
    changeSpeed();

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
