(function() {
  var modifier;
  var noise;

  function addModifier(mesh) {
    modifier = new ModifierStack(mesh);

    noise = new Noise(0);
    noise.frc = 0.01;

    modifier.addModifier(noise);

    // Function to update noise.frc based on input positions
    function updateNoiseFrc(inputX, inputY, centerX, centerY) {
      // Calculate the horizontal and vertical distances from the center of the viewport
      var distanceX = Math.abs(inputX - centerX);
      var distanceY = Math.abs(inputY - centerY);

      // Define the maximum distances (half of the viewport width and height)
      var maxDistanceX = window.innerWidth / 2;
      var maxDistanceY = window.innerHeight / 2;

      // Define the desired range for noise.frc
      var noiseFrcMin = 0.0001;   // Minimum noise.frc value
      var noiseFrcMax = 0.02;    // Maximum noise.frc value

      // Calculate the mapped noise.frc value based on distances
      var mappedValueX = map(distanceX, 0, maxDistanceX, noiseFrcMin, noiseFrcMax);
      var mappedValueY = map(distanceY, 0, maxDistanceY, noiseFrcMin, noiseFrcMax);

      // Calculate the combined noise.frc value
      var combinedValue = Math.max(mappedValueX, mappedValueY);

      // Update noise.frc with the new value
      noise.frc = combinedValue;
    }

    // Get the center of the viewport
    var centerX = window.innerWidth / 2;
    var centerY = window.innerHeight / 2;

    // Event listener for mousemove
    window.addEventListener("mousemove", function(event) {
      updateNoiseFrc(event.clientX, event.clientY, centerX, centerY);
    });

    // Event listener for touchmove (mobile devices)
    window.addEventListener("touchmove", function(event) {
      // Use the first touch position for simplicity
      if (event.touches.length > 0) {
        updateNoiseFrc(event.touches[0].clientX, event.touches[0].clientY, centerX, centerY);
      }
    });

    return modifier;
  }

  // Function to map a value from one range to another
  function map(value, inMin, inMax, outMin, outMax) {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  }

  window.addModifier = addModifier;
})();
