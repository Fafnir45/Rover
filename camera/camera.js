$(document).ready(function () {
    const images = [
      "../images/image3.jpg",
      "../images/image4.jpg",
    ];

    let currentIndex = 0;

    setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;

      const newImage = `
        <div class="carousel-item">
          <img src="${images[currentIndex]}" class="d-block w-100" alt="Rover Camera ${currentIndex + 3}">
        </div>
      `;
      
      $('#camera-carousel .carousel-inner').append(newImage);
      
      const carousel = new bootstrap.Carousel('#camera-carousel');
      carousel.next();

      if ($('#camera-carousel .carousel-item').length > 5) {
        $('#camera-carousel .carousel-item').first().remove();
      }
    }, 5000); 
  });