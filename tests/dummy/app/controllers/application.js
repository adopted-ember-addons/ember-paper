import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class extends Controller {
  @service router;

  @tracked expandedItem;

  @action
  toggleExpandedItem(value, ev) {
    if (this.expandedItem === value) {
      value = null;
    }
    this.expandedItem = value;
    ev.stopPropagation();
  }

  get demosExpanded() {
    return this.expandedItem === 'demos';
  }

  get layoutExpanded() {
    return this.expandedItem === 'layout';
  }
}
