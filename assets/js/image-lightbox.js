// Get the modal
const modal = document.getElementById("image-lightbox");

// Get the image and insert it inside the modal - use its "alt" text as a caption
const images = document.querySelectorAll('img');
const modalImg = document.getElementById("lightboxed-image");
const closeBtn = document.querySelector(".modal-close");

images.forEach(img => {
    img.addEventListener('click', () => {
        modal.style.display = "block";
        modalImg.src = img.src;
    });
});

// Get the <span> element that closes the modal
closeBtn.addEventListener('click', () => {
    modal.style.display = "none";
});

// Close the modal when clicking outside of the image
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
