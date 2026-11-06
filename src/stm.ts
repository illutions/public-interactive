import { type AnyStateMachine, setup } from 'xstate';

import type { ModelReadyEvent, Obj3DPointerEvent, SceneReadyEvent } from 'illutions';

import type { MyApp } from './index';


// Define synchronized 3D object and stepper interaction with a state machine
export const stm = (app: MyApp): AnyStateMachine => {
  const { comps, orbitCtrls, materials } = app;
  const { clip } = comps;
  const stepper = comps.web.stepper[0];

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
      playRotation: () => clip.rotation.start({ layer: 'Engine', modeLoop: 'infinite', speedIn: { to: 0.3 } }),

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
      setMaterialObj1: () => materials.set({ name: 'Fan', emissiveIntensity, emissive: emissiveColor }),
      setMaterialObj2: () => materials.set({ name: 'Compressor', emissiveIntensity, emissive: emissiveColor }),
      setMaterialObj3: () => materials.set({ name: 'Shaft', emissiveIntensity, emissive: emissiveColor }),
      setMaterialObj4: () => materials.set({ name: 'CombChamb', emissiveIntensity, emissive: emissiveColor }),
      setMaterialObj5: () => materials.set({ name: 'Turbine', emissiveIntensity, emissive: emissiveColor }),
      setMaterialObj6: () => materials.set({ name: 'Nozzle', emissiveIntensity, emissive: emissiveColor }),
      setMaterialObj7: () => materials.set({ name: 'IFS', emissiveIntensity, emissive: emissiveColor }),
      setMaterialObj8: () => materials.set({ name: 'Nacelle', emissiveIntensity, emissive: emissiveColor }),

      // Remove the highlight when the component becomes inactive
      resetMaterialObj1: () => materials.set({ name: 'Fan', emissiveIntensity: 0 }),
      resetMaterialObj2: () => materials.set({ name: 'Compressor', emissiveIntensity: 0 }),
      resetMaterialObj3: () => materials.set({ name: 'Shaft', emissiveIntensity: 0 }),
      resetMaterialObj4: () => materials.set({ name: 'CombChamb', emissiveIntensity: 0 }),
      resetMaterialObj5: () => materials.set({ name: 'Turbine', emissiveIntensity: 0 }),
      resetMaterialObj6: () => materials.set({ name: 'Nozzle', emissiveIntensity: 0 }),
      resetMaterialObj7: () => materials.set({ name: 'IFS', emissiveIntensity: 0 }),
      resetMaterialObj8: () => materials.set({ name: 'Nacelle', emissiveIntensity: 0 }),
    },
    guards: {
      // Match 3D pointer and stepper events to the same component states
      isObj1: ({ event }) => ('objName' in event && event.objName === 'Fan') || ('stepName' in event && event.stepName === 'Obj1'),
      isObj2: ({ event }) => ('objName' in event && event.objName === 'Compressor') || ('stepName' in event && event.stepName === 'Obj2'),
      isObj3: ({ event }) => ('objName' in event && event.objName === 'Shaft') || ('stepName' in event && event.stepName === 'Obj3'),
      isObj4: ({ event }) => ('objName' in event && event.objName === 'CombChamb') || ('stepName' in event && event.stepName === 'Obj4'),
      isObj5: ({ event }) => ('objName' in event && event.objName === 'Turbine') || ('stepName' in event && event.stepName === 'Obj5'),
      isObj6: ({ event }) => ('objName' in event && event.objName === 'Nozzle') || ('stepName' in event && event.stepName === 'Obj6'),
      isObj7: ({ event }) => ('objName' in event && event.objName === 'IFS') || ('stepName' in event && event.stepName === 'Obj7'),
      isObj8: ({ event }) => ('objName' in event && event.objName === 'Nacelle') || ('stepName' in event && event.stepName === 'Obj8'),
    },
  }).createMachine({
    id: 'App',
    initial: 'INIT',
    states: {
      INIT: {
        on: {
          Scene_Ready: {
            target: 'ORBIT',
            actions: ['enableOrbitCtrls'],
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
};
