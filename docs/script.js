document.addEventListener("DOMContentLoaded", function() {
    const img = document.getElementById("moving-image");
    let position = 0;
    const speed = 2; // Adjust the speed as needed

    function moveImage() {
        position += speed;
        img.style.left = position + "px";

        if (position < window.innerWidth) {
            requestAnimationFrame(moveImage);
        }
    }

    moveImage();
});
