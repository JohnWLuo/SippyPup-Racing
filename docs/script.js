document.addEventListener("DOMContentLoaded", function() {
    const img = document.getElementById("moving-image");
    let position = 0;
    const speed = 2; // Adjust the speed as needed

    function moveImage() {
        position += speed;
        img.style.left = position + "px";

        // Stop the image when it reaches the end of the screen
        if (position + img.width < window.innerWidth) {
            requestAnimationFrame(moveImage);
        }
    }

    moveImage();
});
