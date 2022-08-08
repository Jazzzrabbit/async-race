export default class ControlPanel {
  panel: HTMLElement;

  constructor() {
    this.panel = document.createElement('div');
  }

  renderPanel(): string {
    return `<div class="create-and-edit">
              <div class="form" id="createForm">
                <input type="text" class="create-input input" autocomplete="off" name="cname">
                <input type="color" class="create-input-color input" name="ccolor">
                <button type="submit" class="create-btn btn">Create</button>
              </div>
              <div class="form" id="editForm">
                <input type="text" class="edit-input input" autocomplete="off" name="ename">
                <input class="input hidden" name="eid">
                <input type="color" class="edit-input-color input" name="ecolor">
                <button type="submit" class="edit-btn btn">Edit</button>
              </div>
            </div>`;
  }

  renderControlButtons(): void {
    const buttons: HTMLDivElement = document.createElement('div');
    const race: HTMLButtonElement = document.createElement('button');
    const reset: HTMLButtonElement = document.createElement('button');
    const generate: HTMLButtonElement = document.createElement('button');

    buttons.classList.add('buttons');
    race.classList.add('buttons__race', 'btn');
    reset.classList.add('buttons__reset', 'btn');
    generate.classList.add('buttons__generate', 'btn');

    race.textContent = 'Race';
    reset.textContent = 'Reset';
    generate.textContent = 'Generate cars';

    buttons.append(race, reset, generate);
    this.panel.append(buttons);
  }

  render(): HTMLElement {
    this.panel.innerHTML = this.renderPanel();
    this.renderControlButtons();
    this.panel.classList.add('control-panel');
    
    return this.panel;
  }
}