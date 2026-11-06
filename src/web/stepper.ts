import { Web } from 'illutions';

import css from './style/stepper.css?inline';

export class Stepper extends Web {
  private stepEntries: HTMLElement[] = [];
  private steps: HTMLElement[] = [];

  // Initialize the stepper whenever the component enters the page
  public connectedCallback(): void {
    // Add the component styles.
    const style = document.createElement('style');
    style.textContent = css;
    this.prepend(style);

    // Find the indicator placeholder.
    const list = this.querySelector<HTMLOListElement>(':scope > nav > ol');

    // Read the step entries declared in index.html.
    this.stepEntries = Array.from(this.querySelectorAll<HTMLElement>(':scope > dl > div[data-step]'));

    // Create one indicator for each non-default step.
    for (const stepEntry of this.stepEntries) {
      const stepName = stepEntry.dataset.step;
      if (!list || !stepName || stepName === 'default') continue;

      const step = document.createElement('li');
      step.dataset.step = stepName;
      step.append(document.createElement('span'));
      step.addEventListener('pointerenter', this.sendStepPointerEnter);
      step.addEventListener('pointerleave', this.sendStepPointerLeave);
      list.append(step);
      this.steps.push(step);
    }

    this.style.setProperty('--step-count', String(this.steps.length));

    // Keep pointer interactions from reaching the canvas.
    this.addEventListener('pointerdown', this.stopCanvasPointerPropagation);
    this.addEventListener('pointermove', this.stopCanvasPointerPropagation);
    this.addEventListener('pointerup', this.stopCanvasPointerPropagation);

    this.clearActiveStep();
  }

  // Remove event listeners whenever the component leaves the page
  public disconnectedCallback(): void {
    for (const step of this.steps) {
      step.removeEventListener('pointerenter', this.sendStepPointerEnter);
      step.removeEventListener('pointerleave', this.sendStepPointerLeave);
    }

    this.removeEventListener('pointerdown', this.stopCanvasPointerPropagation);
    this.removeEventListener('pointermove', this.stopCanvasPointerPropagation);
    this.removeEventListener('pointerup', this.stopCanvasPointerPropagation);
  }

  public clearActiveStep(): void {
    for (const step of this.steps) {
      step.classList.remove('is-active');
    }

    for (const contentEntry of this.stepEntries) {
      contentEntry.classList.toggle('is-active', contentEntry.dataset.step === 'default');
    }
  }

  private sendStepPointerEnter = (event: PointerEvent): void => {
    const step = event.currentTarget as HTMLElement;
    const stepName = step.dataset.step;
    if (!stepName) return;

    this.events.send({ type: 'Stepper_Pointer_Enter', stepName });
  };

  private sendStepPointerLeave = (event: PointerEvent): void => {
    const step = event.currentTarget as HTMLElement;
    const stepName = step.dataset.step;
    if (!stepName) return;

    this.events.send({ type: 'Stepper_Pointer_Leave', stepName });
  };

  public setActiveStep(stepName: string, color: string): void {
    this.style.setProperty('--active-color', color);

    for (const step of this.steps) {
      step.classList.toggle('is-active', step.dataset.step === stepName);
    }

    for (const contentEntry of this.stepEntries) {
      contentEntry.classList.toggle('is-active', contentEntry.dataset.step === stepName);
    }
  }

  private stopCanvasPointerPropagation = (event: PointerEvent): void => {
    event.stopPropagation();
  };
}
