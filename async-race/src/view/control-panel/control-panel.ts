import CarView from '../garage/garageView';

function addCreateBtnListener() {
  console.log('Creating a car');
  const car = new CarView();
  car.renderCar(1, 'Rendered', 'yellow');
}

export default class ControlPanel {
  panel: HTMLElement;

  constructor() {
    this.panel = document.createElement('div');
  }

  renderPanel(): void {
    const createForm = document.createElement('form');
    const editForm = document.createElement('form');
    const createAndEdit: HTMLElement = document.createElement('div');
    const createInput:HTMLInputElement = document.createElement('input');
    const createInputColor: HTMLInputElement = document.createElement('input');
    const createButton: HTMLButtonElement = document.createElement('button');
    const editInput: HTMLInputElement = document.createElement('input');
    const editInputColor: HTMLInputElement = document.createElement('input');
    const editButton: HTMLButtonElement = document.createElement('button');

    createForm.classList.add('form');
    editForm.classList.add('form');
    createAndEdit.classList.add('create-and-edit');
    createInput.classList.add('createInput', 'input');
    createInputColor.classList.add('createInputColor', 'input');
    createButton.classList.add('createBtn', 'btn');
    editInput.classList.add('editInput', 'input');
    editInputColor.classList.add('editInputColor', 'input');
    editButton.classList.add('editBtn', 'btn');

    createInput.type = 'text';
    editInput.type = 'text';
    createForm.id = 'createForm';
    editForm.id = 'editForm';
    createInputColor.type = 'color';
    editInputColor.type = 'color';

    createButton.textContent = 'Create';
    editButton.textContent = 'Edit';
    createButton.type = 'submit';
    editButton.type = 'submit';

    createForm.append(createInput, createInputColor, createButton);
    editForm.append(editInput, editInputColor, editButton);
    createAndEdit.append(createForm, editForm);
    this.panel.append(createAndEdit);

    createButton.addEventListener('click', addCreateBtnListener);
  }

  renderControlButtons(): void {
    const buttons = document.createElement('div');
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
    this.renderPanel();
    this.renderControlButtons();
    this.panel.classList.add('control-panel');
    return this.panel;
  }
}