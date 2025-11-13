import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class extends Controller {
  @tracked showSourceCode = false;
  @tracked persistentCode = false;
  @tracked leftSideBarLockedOpen = false;

  toggle = (propName) => {
    this[propName] = !this[propName];
  };
}
