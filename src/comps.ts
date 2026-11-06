import { setComps, Clip, Collid3D, Mesh3D } from 'illutions';

import { Stepper } from './web/stepper';
import { Area } from './scene/area';
import { Cam } from './scene/cam';

// Register customized asset components
export const comps = setComps({
  clips: {
    rotation: { class: Clip, params: { gltf: true } },
  },
  scene: {
    area: {
      class: Area,
      params: { gltf: true }
    },
    cam: {
      class: Cam,
      params: { name: 'Camera', gltf: true }
    },
    fan: {
      class: Mesh3D,
      params: { gltf: true }
    },
    fanLP: {
      class: Collid3D,
      params: { gltf: true, target: 'Fan', hidden: true, pickable: true }
    },
    compressor: {
      class: Mesh3D,
      params: { gltf: true }
    },
    compressorLP: {
      class: Collid3D,
      params: { gltf: true, target: 'Compressor', hidden: true, pickable: true }
    },
    shaft: {
      class: Mesh3D,
      params: { gltf: true }
    },
    shaftLP: {
      class: Collid3D,
      params: { gltf: true, target: 'Shaft', hidden: true, pickable: true }
    },
    combChamb: {
      class: Mesh3D,
      params: { gltf: true }
    },
    combChambLP: {
      class: Collid3D,
      params: { gltf: true, target: 'CombChamb', hidden: true, pickable: true }
    },
    turbine: {
      class: Mesh3D,
      params: { gltf: true }
    },
    turbineLP: {
      class: Collid3D,
      params: { gltf: true, target: 'Turbine', hidden: true, pickable: true }
    },
    nozzle: {
      class: Mesh3D,
      params: { gltf: true }
    },
    nozzleLP: {
      class: Collid3D,
      params: { gltf: true, target: 'Nozzle', hidden: true, pickable: true }
    },
    ifs: {
      class: Mesh3D,
      params: { gltf: true }
    },
    ifsLP: {
      class: Collid3D,
      params: { gltf: true, target: 'IFS', hidden: true, pickable: true }
    },
    nacelle: {
      class: Mesh3D,
      params: { gltf: true }
    },
    nacelleLP: {
      class: Collid3D,
      params: { gltf: true, target: 'Nacelle', hidden: true, pickable: true }
    },
  },
  web: {
    stepper: Stepper,
  },
});
