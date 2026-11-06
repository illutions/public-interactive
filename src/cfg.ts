import { setCfg, degToRad } from 'illutions';

export const cfg = setCfg({
  // Display runtime information and editable settings
  gui: {
    infoBox: {
      enable: true,
    },
    inspector: {
      enable: true,
    },
  },

  // Load the Draco-compressed 3D scene progressively from low to high quality
  model: {
    file: ['scene/interactive-low.glb', 'scene/interactive-med.glb', 'scene/interactive-high.glb'],
    compress: {
      mesh: 'draco',
    },
  },

  // Load renderer-specific RectAreaLight LTC data
  light: {
    rectArea: true,
  },

  // Use the EXR map for environment lighting and the background
  envCtrls: {
    enable: true,
    map: ['scene/lonely_road_afternoon_puresky_256.exr'],
    dataType: 'float',
    environmentIntensity: 0.4,
    backgroundIntensity: 0.25,
    backgroundBlurriness: 0.5,
    rotation: {
      y: degToRad(250),
    },
  },

  // Load orbit controls
  orbitCtrls: {
    load: true,
    rotateSpeed: 0.75,
    enablePan: false,
    enableDamping: true,
    dampingFactor: 0.05,
    maxPolarAngle: degToRad(135),
    minPolarAngle: degToRad(45),
    maxAzimuthAngle: degToRad(75),
    minAzimuthAngle: degToRad(-75),
    maxDistance: 8,
    minDistance: 2,
  },

  // Configure the raycast sampling circle
  raycast: {
    circleRadius: 1,
    circleSteps: 1,
  },

  render: {
    // Configure renderer profiles
    profile: {
      webgpu: {
        msaa: 'render',
        aa: 'traa',
        ssl: 'gtao',
      },
      webgl: {
        msaa: 'render',
        aa: 'fxaa',
        ssl: 'ssao',
      },
    },
    // Enable adaptive graphics
    adaptiveGfx: true,
  },

  // Configure post-processing
  post: {
    webgpu: {
      gtao: {
        radius: 0.15,
        scale: 0.75,
      },
    },
  },

  // Log all messages to the console.
  debug: {
    log: 'all',
  },
});
