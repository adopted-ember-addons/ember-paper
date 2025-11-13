import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class extends Controller {
  @tracked value1 = true;
  @tracked value2 = false;
  @tracked value3 = false;
  @tracked value4 = false;
  @tracked value5 = false;
  @tracked value6 = false;
  @tracked value7;

  get isIndeterminate() {
    return this.value7 === undefined;
  }

  toggleValue6 = () => {
    this.value6 = !this.value6;
  };
}
