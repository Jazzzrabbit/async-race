import ControlPanel from '../control-panel/control-panel';

export default class Main {
  main: HTMLElement;

  controlPanel: ControlPanel;

  constructor() {
    this.main = document.createElement('main');
    this.controlPanel = new ControlPanel();
  }

  render(): HTMLElement {
    const panel = this.controlPanel.render();
    this.main.classList.add('main');
    this.main.append(panel);
    return this.main;
  }
}