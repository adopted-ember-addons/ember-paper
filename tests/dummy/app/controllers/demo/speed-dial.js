import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class extends Controller {
  @tracked animation = 'fling';
  @tracked direction = 'down';

  @tracked showBasicUsageSourceCode = false;
  @tracked showAdvancedUsageSourceCode = false;

  toggle = (propName) => {
    this[propName] = !this[propName];
  };
}
