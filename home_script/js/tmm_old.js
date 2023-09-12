(function() {
  var modifier, prevMod;
  var noise, cloth, twist, taper, bloat, breaks, userDefined;

  function addModifier(mesh) {
    modifier = new ModifierStack(mesh);

    noise = new Noise(0);
    noise.frc = 0.01;


     // Create a cloth instance with initial force values
  var initialClothX = -0.2;
  var initialClothY = 10;
  var initialClothZ = 10;

    cloth = new Cloth(1, 0);
      cloth.setForce(initialClothX, initialClothY, initialClothZ);


    twist = new Twist(0);
    twist.vector = new Vector3(0, 1, 0);

    taper = new Taper(2);
    taper.setFalloff(0.2, 0.5);

    bloat = new Bloat();
    bloat.center = mesh.position.clone();
    bloat.center.y += 100;
    bloat.radius = 200;

    breaks = new Break(0.7, 5);

    var angle = 0;
    userDefined = new UserDefined();
    userDefined.renderVector = function(vec, i, length) {
      var radius = 10;
      vec.setValue(ModConstant.Z, vec.z + Math.sin(i * 0.2 + angle) * radius);
      vec.setValue(ModConstant.Y, vec.y + Math.sin(i * 0.2 + angle) * radius);
    };
    userDefined.addEventListener("CHANGE", function() {
      angle += 0.2;
    });

    changeModifier(noise);

    return modifier;
  }

  function changeModifier(mod) {
    if (prevMod) {
      modifier.removeModifier(prevMod);
      TweenMax.killTweensOf(prevMod);
    }

    modifier.addModifier(mod);
    prevMod = mod;
  }

  function initGUI() {
    var params = {
        NoiseFrc: 0.01,
        NoiseDelay: 0.5,
        NoiseYoyo: true,
        NoiseRepeat: 4,

        initialClothX: 0.2,
        initialClothY: -0.2,
        initialClothZ: -0.2,
        ClothFrcX: 0.01,
        ClothFrcY: 0.01,
        ClothFrcZ: 0.01,
        ClothLockXMin: 0.01,
        ClothLockYMin: 0.01,
        ClothLockZMin: 0.15,

      Noise: function() {
        changeModifier(noise);
        TweenMax.to(noise, 0.2, {
          frc: params.NoiseFrc,
        delay: params.NoiseDelay,
        yoyo: params.NoiseYoyo,
        repeat: params.NoiseRepeat,
          onComplete: function() {
            noise.frc = params.NoiseFrc;

          }
        });
      },
      Cloth: function() {
        modifier.reset();
        changeModifier(cloth);
        cloth.lockXMin(params.ClothLockXMin);
      cloth.lockYMin(params.ClothLockYMin);
      cloth.lockZMin(params.ClothLockZMin);
      cloth.setForce(params.ClothFrcX, params.ClothFrcY, params.ClothFrcZ);
    },
      Twist: function() {
        changeModifier(twist);
        TweenMax.fromTo(
          twist,
          2,
          { angle: -Math.PI / 2 },
          {
            angle: Math.PI / 2,
            ease: Cubic.easeInOut,
            yoyo: true,
            repeat: 999
          }
        );
      },
      Taper: function() {
        changeModifier(taper);
        TweenMax.fromTo(
          taper,
          1,
          {
            frc: 0
          },
          {
            frc: 1,
            ease: Back.easeInOut,
            yoyo: true,
            repeat: 999
          }
        );
      },
      Bloat: function() {
        changeModifier(bloat);
        TweenMax.fromTo(
          bloat,
          1,
          {
            radius: 0
          },
          {
            radius: 200,
            yoyo: true,
            repeat: 999
          }
        );
      },
      Break: function() {
        changeModifier(breaks);
        TweenMax.fromTo(
          breaks,
          1,
          {
            angle: -Math.PI / 3
          },
          {
            angle: Math.PI / 3,
            ease: Cubic.easeInOut,
            yoyo: true,
            repeat: 999
          }
        );
      },
      UserDefined: function() {
        changeModifier(userDefined);
      },
      computeNormals: false
    
    };

    var gui = new dat.GUI();

    var noiseFolder = gui.addFolder("Noise Parameters");
    var noiseFrcSlider = noiseFolder.add(params, "NoiseFrc", 0, 2).step(0.01);
    var noiseDelaySlider = noiseFolder.add(params, "NoiseDelay", 0, 1).step(0.01);
    var noiseYoyoCheckbox = noiseFolder.add(params, "NoiseYoyo");
    var noiseRepeatSlider = noiseFolder.add(params, "NoiseRepeat", 0, 10).step(1);
  
    // Add event listeners to update parameters when sliders/checkbox change
    noiseFrcSlider.onChange(function(value) {
      params.NoiseFrc = value;
    });
  
    noiseDelaySlider.onChange(function(value) {
      params.NoiseDelay = value;
    });
  
    noiseYoyoCheckbox.onChange(function(value) {
      params.NoiseYoyo = value;
    });
  
    noiseRepeatSlider.onChange(function(value) {
      params.NoiseRepeat = value;
    });

      // Define the range of mouseX that corresponds to the desired range for NoiseFrc
var mouseXMin = 0;     // Minimum mouseX value
var mouseXMax = window.innerWidth;   // Maximum mouseX value (full width of the window)

// Define the desired range for NoiseFrc
var noiseFrcMin = 0.01;   // Minimum NoiseFrc value
var noiseFrcMax = 0.2;    // Maximum NoiseFrc value

// Custom map function
function map(value, inMin, inMax, outMin, outMax) {
  return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

// Update NoiseFrc based on mouseX
function updateNoiseFrc(mouseX) {
  // Map the mouseX value to the NoiseFrc range
  var mappedValue = map(mouseX, mouseXMin, mouseXMax, noiseFrcMin, noiseFrcMax);

  // Update the NoiseFrc parameter
  params.NoiseFrc = mappedValue;

}
/* 
// Call updateNoiseFrc whenever mouseX changes (e.g., in a mousemove event handler)
window.addEventListener("mousemove", function(event) {
  // Update NoiseFrc based on the new mouseX value
  var mouseX = event.clientX; // Get the current X position of the mouse
  updateNoiseFrc(mouseX); // Pass the mouseX value to the function

  // Change the modifier (update the noise effect) here
  changeModifier(noise);
  modifier.addModifier(noise)
  
}); */


  
    var clothFolder = gui.addFolder("Cloth Parameters");
    clothFolder.add(params, "Cloth");
    clothFolder.add(params, "initialClothX", -1, 1).step(0.01);
  clothFolder.add(params, "initialClothY", -1, 1).step(0.01);
  clothFolder.add(params, "initialClothZ", -1, 1).step(0.01);
    clothFolder.add(params, "ClothFrcX", -0.1, 0.1).step(0.01);
    clothFolder.add(params, "ClothFrcY", -0.1, 0.1).step(0.01);
    clothFolder.add(params, "ClothFrcZ", -0.1, 0.1).step(0.01);
    clothFolder.add(params, "ClothLockXMin", -1, 1).step(0.01);
    clothFolder.add(params, "ClothLockYMin", -1, 1).step(0.01);
    clothFolder.add(params, "ClothLockZMin", -1, 0.2).step(0.01);

    // Add folders and controls for other modifiers as needed

    gui.add(params, "Noise");
    gui.add(params, "Twist");
    gui.add(params, "Taper");
    gui.add(params, "Bloat");
    gui.add(params, "Break");
    gui.add(params, "Cloth");
    gui.add(params, "UserDefined");
    return gui;


  }



  window.addModifier = addModifier;
  window.initGUI = initGUI;
})();
