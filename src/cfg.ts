import { cfg } from 'illutions';

// Display runtime information and editable settings
cfg.gui.infoBox.enable = true;
cfg.gui.inspector.enable = true;

// Load orbit controls
cfg.orbitCtrls.load = true;
cfg.orbitCtrls.rotateSpeed = 0.75;
cfg.orbitCtrls.enablePan = false;
cfg.orbitCtrls.enableDamping = true;
cfg.orbitCtrls.dampingFactor = 0.05;
cfg.orbitCtrls.maxPolarAngle = 135;
cfg.orbitCtrls.minPolarAngle = 45;
cfg.orbitCtrls.maxAzimuthAngle = 75;
cfg.orbitCtrls.minAzimuthAngle = -75;
cfg.orbitCtrls.maxDistance = 8;
cfg.orbitCtrls.minDistance = 2;

// Load the Draco-compressed 3D scene progressively from low to high quality
cfg.model.file = ['scene/interactive-low.glb', 'scene/interactive-med.glb', 'scene/interactive-high.glb'];
cfg.model.compress.mesh = 'draco';

// Load renderer-specific RectAreaLight LTC data
cfg.light.rectArea = true;

// Use the EXR map for environment lighting and the background
cfg.envCtrls.enable = true;
cfg.envCtrls.map = ['scene/lonely_road_afternoon_puresky_256.exr'];
cfg.envCtrls.dataType = 'float';
cfg.envCtrls.environmentIntensity = 0.4;
cfg.envCtrls.backgroundIntensity = 0.25;
cfg.envCtrls.backgroundBlurriness = 0.5
cfg.envCtrls.rotation.y = 250;

// Configure the raycast sampling circle
cfg.raycast.circleRadius = 1
cfg.raycast.circleSteps = 1;

// Configure post-processing
cfg.post.aa.mode = 'fxaa'
cfg.post.webgl.aa.fxaa.sharpness = 1;
cfg.post.ssao.enable = true;
cfg.post.webgpu.ssao.radius = 0.15;
cfg.post.webgpu.ssao.scale = 0.75;

cfg.debug.log = 'all'

export { cfg };
