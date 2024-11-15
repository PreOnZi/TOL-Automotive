document.addEventListener('DOMContentLoaded', () => {
    // Select the carGroup element
    const carGroup = document.querySelector('.simpleRoad .carGroup');
    
    // Check if carGroup exists
    if (carGroup) {
      // Initialize rotation angle
      let rotateY = 0;

      // Event listener for keydown events
      document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
          // Rotate left
          rotateY -= 5; // Adjust rotation step size as needed
        } else if (event.key === 'ArrowRight') {
          // Rotate right
          rotateY += 5;
        }

        // Apply the rotation to the carGroup
        carGroup.style.transform = `rotateY(${rotateY}deg)`;

        // Debug: Log rotation value to console to check if updating
        console.log(`rotateY: ${rotateY}`);
      });
    } else {
      console.error("Could not find .carGroup element.");
    }
  });