import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class extends Controller {
  @tracked
  position = 'bottom';

  @tracked
  showSourceCode = false;

  toggleSource = () => {
    this.showSourceCode = !this.showSourceCode;
  };
}
