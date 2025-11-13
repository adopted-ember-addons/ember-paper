import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class extends Controller {
  @tracked booleanProp1 = true;
  @tracked booleanProp2 = false;
  @tracked booleanProp3 = false;
  @tracked booleanProp4 = false;
  @tracked booleanProp5 = false;

  changeBooleanProp = (which, newValue) => {
    this[`booleanProp${which}`] = newValue;
  };
}
