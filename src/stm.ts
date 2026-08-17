import { type AnyStateMachine, setup } from 'xstate';
import type { App, ModelReadyEvent, Obj3DPointerEvent, SceneReadyEvent } from 'illutions';

import { classes } from './classes';

// Define synchronized 3D object and stepper interaction with a state machine
export function createStateMachine(app: App<typeof classes>): AnyStateMachine {
  const { comps, engine, orbitCtrls, raycast } = app;
  const stepper = comps.Stepper[0];

  // Define the shared component highlight
  const emissiveColor = '#ff0040';
  const emissiveIntensity = 1;

  return setup({
    types: {
      events: {} as
        | SceneReadyEvent
        | ModelReadyEvent
        | Obj3DPointerEvent
        | { type: 'Stepper_Pointer_Enter'; stepName: string }
        | { type: 'Stepper_Pointer_Leave'; stepName: string },
    },
    actions: {
      // Reset the stepper when no engine component is active
      clearStepper: () => stepper.clearActiveStep(),

      // Enable camera interaction when the scene is ready
      enableOrbitCtrls: () => orbitCtrls.enable(),

      // Start rotation after the final model level has rendered
      playRotation: () => engine.playClip({ layer: 'Engine', clip: 'Rotation', loopMode: 'infinite', endSpeed: 0.3 }),

      // Use the hidden low-poly engine parts as pointer colliders
      setColliders: () => raycast.setColliders([
        { obj: 'FanLP', hide: true, pickable: true },
        { obj: 'CompressorLP', hide: true, pickable: true },
        { obj: 'ShaftLP', hide: true, pickable: true },
        { obj: 'CombChambLP', hide: true, pickable: true },
        { obj: 'TurbineLP', hide: true, pickable: true },
        { obj: 'NozzleLP', hide: true, pickable: true },
        { obj: 'IFSLP', hide: true, pickable: true },
        { obj: 'NacelleLP', hide: true, pickable: true },
      ]),

      // Show the content for the active engine component
      setStepperObj1: () => stepper.setActiveStep('Obj1', emissiveColor),
      setStepperObj2: () => stepper.setActiveStep('Obj2', emissiveColor),
      setStepperObj3: () => stepper.setActiveStep('Obj3', emissiveColor),
      setStepperObj4: () => stepper.setActiveStep('Obj4', emissiveColor),
      setStepperObj5: () => stepper.setActiveStep('Obj5', emissiveColor),
      setStepperObj6: () => stepper.setActiveStep('Obj6', emissiveColor),
      setStepperObj7: () => stepper.setActiveStep('Obj7', emissiveColor),
      setStepperObj8: () => stepper.setActiveStep('Obj8', emissiveColor),

      // Highlight the active engine component
      setMaterialObj1: () => engine.setMaterialProperties({ obj: 'Fan', emissiveIntensity, emissive: emissiveColor }),
      setMaterialObj2: () => engine.setMaterialProperties({ obj: 'Compressor', emissiveIntensity, emissive: emissiveColor }),
      setMaterialObj3: () => engine.setMaterialProperties({ obj: 'Shaft', emissiveIntensity, emissive: emissiveColor }),
      setMaterialObj4: () => engine.setMaterialProperties({ obj: 'CombChamb', emissiveIntensity, emissive: emissiveColor }),
      setMaterialObj5: () => engine.setMaterialProperties({ obj: 'Turbine', emissiveIntensity, emissive: emissiveColor }),
      setMaterialObj6: () => engine.setMaterialProperties({ obj: 'Nozzle', emissiveIntensity, emissive: emissiveColor }),
      setMaterialObj7: () => engine.setMaterialProperties({ obj: 'IFS', emissiveIntensity, emissive: emissiveColor }),
      setMaterialObj8: () => engine.setMaterialProperties({ obj: 'Nacelle', emissiveIntensity, emissive: emissiveColor }),

      // Remove the highlight when the component becomes inactive
      resetMaterialObj1: () => engine.setMaterialProperties({ obj: 'Fan', emissiveIntensity: 0 }),
      resetMaterialObj2: () => engine.setMaterialProperties({ obj: 'Compressor', emissiveIntensity: 0 }),
      resetMaterialObj3: () => engine.setMaterialProperties({ obj: 'Shaft', emissiveIntensity: 0 }),
      resetMaterialObj4: () => engine.setMaterialProperties({ obj: 'CombChamb', emissiveIntensity: 0 }),
      resetMaterialObj5: () => engine.setMaterialProperties({ obj: 'Turbine', emissiveIntensity: 0 }),
      resetMaterialObj6: () => engine.setMaterialProperties({ obj: 'Nozzle', emissiveIntensity: 0 }),
      resetMaterialObj7: () => engine.setMaterialProperties({ obj: 'IFS', emissiveIntensity: 0 }),
      resetMaterialObj8: () => engine.setMaterialProperties({ obj: 'Nacelle', emissiveIntensity: 0 }),
    },
    guards: {
      // Match 3D pointer and stepper events to the same component states
      isObj1: ({ event }) => ('objName' in event && event.objName === 'FanLP') || ('stepName' in event && event.stepName === 'Obj1'),
      isObj2: ({ event }) => ('objName' in event && event.objName === 'CompressorLP') || ('stepName' in event && event.stepName === 'Obj2'),
      isObj3: ({ event }) => ('objName' in event && event.objName === 'ShaftLP') || ('stepName' in event && event.stepName === 'Obj3'),
      isObj4: ({ event }) => ('objName' in event && event.objName === 'CombChambLP') || ('stepName' in event && event.stepName === 'Obj4'),
      isObj5: ({ event }) => ('objName' in event && event.objName === 'TurbineLP') || ('stepName' in event && event.stepName === 'Obj5'),
      isObj6: ({ event }) => ('objName' in event && event.objName === 'NozzleLP') || ('stepName' in event && event.stepName === 'Obj6'),
      isObj7: ({ event }) => ('objName' in event && event.objName === 'IFSLP') || ('stepName' in event && event.stepName === 'Obj7'),
      isObj8: ({ event }) => ('objName' in event && event.objName === 'NacelleLP') || ('stepName' in event && event.stepName === 'Obj8'),
    },
  }).createMachine({
    id: 'App',
    initial: 'INIT',
    states: {
      INIT: {
        on: {
          Scene_Ready: {
            target: 'ORBIT',
            actions: ['enableOrbitCtrls', 'setColliders'],
          },
        },
      },
      ORBIT: {
        initial: 'NONE_SELECT',
        on: {
          Model_Ready: { actions: ['playRotation'] },
          Obj3D_Pointer_Enter: [
            { target: '.OBJ1_SELECT', guard: 'isObj1' },
            { target: '.OBJ2_SELECT', guard: 'isObj2' },
            { target: '.OBJ3_SELECT', guard: 'isObj3' },
            { target: '.OBJ4_SELECT', guard: 'isObj4' },
            { target: '.OBJ5_SELECT', guard: 'isObj5' },
            { target: '.OBJ6_SELECT', guard: 'isObj6' },
            { target: '.OBJ7_SELECT', guard: 'isObj7' },
            { target: '.OBJ8_SELECT', guard: 'isObj8' },
          ],
          Stepper_Pointer_Enter: [
            { target: '.OBJ1_SELECT', guard: 'isObj1' },
            { target: '.OBJ2_SELECT', guard: 'isObj2' },
            { target: '.OBJ3_SELECT', guard: 'isObj3' },
            { target: '.OBJ4_SELECT', guard: 'isObj4' },
            { target: '.OBJ5_SELECT', guard: 'isObj5' },
            { target: '.OBJ6_SELECT', guard: 'isObj6' },
            { target: '.OBJ7_SELECT', guard: 'isObj7' },
            { target: '.OBJ8_SELECT', guard: 'isObj8' },
          ],
          Obj3D_Pointer_Leave: { target: '.NONE_SELECT' },
          Stepper_Pointer_Leave: { target: '.NONE_SELECT' },
        },
        states: {
          NONE_SELECT: {},
          OBJ1_SELECT: {
            entry: ['setMaterialObj1', 'setStepperObj1'],
            exit: ['resetMaterialObj1', 'clearStepper'],
          },
          OBJ2_SELECT: {
            entry: ['setMaterialObj2', 'setStepperObj2'],
            exit: ['resetMaterialObj2', 'clearStepper'],
          },
          OBJ3_SELECT: {
            entry: ['setMaterialObj3', 'setStepperObj3'],
            exit: ['resetMaterialObj3', 'clearStepper'],
          },
          OBJ4_SELECT: {
            entry: ['setMaterialObj4', 'setStepperObj4'],
            exit: ['resetMaterialObj4', 'clearStepper'],
          },
          OBJ5_SELECT: {
            entry: ['setMaterialObj5', 'setStepperObj5'],
            exit: ['resetMaterialObj5', 'clearStepper'],
          },
          OBJ6_SELECT: {
            entry: ['setMaterialObj6', 'setStepperObj6'],
            exit: ['resetMaterialObj6', 'clearStepper'],
          },
          OBJ7_SELECT: {
            entry: ['setMaterialObj7', 'setStepperObj7'],
            exit: ['resetMaterialObj7', 'clearStepper'],
          },
          OBJ8_SELECT: {
            entry: ['setMaterialObj8', 'setStepperObj8'],
            exit: ['resetMaterialObj8', 'clearStepper'],
          },
        },
      },
    },
  });
}
