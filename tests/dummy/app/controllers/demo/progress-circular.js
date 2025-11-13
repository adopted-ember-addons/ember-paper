import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class extends Controller {
  @tracked mode = 'query';
  @tracked determinateValue = 0;
  @tracked timer = null;

  start() {
    this.determinateValue = 30;
    this.setupTimer();
  }

  setupTimer() {
    this.timer = setTimeout(() => {
      this.determinateValue++;
      if (this.determinateValue > 100) {
        this.determinateValue = 30;
      }
      this.setupTimer();
    }, 100);
  }

  stop() {
    clearTimeout(this.timer);
  }

  @tracked sliderDiameter = 100;
  @tracked sliderValue = null;
  @tracked isIndeterminate = true;
  @tracked strokeRatio = 0.1;

  setValue = (v) => {
    this.isIndeterminate = false;
    this.sliderValue = v;
  };

  setIndeterminate = (value) => {
    if (value) {
      this.isIndeterminate = true;
      this.sliderValue = null;
    } else {
      this.isIndeterminate = false;
      this.sliderValue = 50;
    }
  };
}
