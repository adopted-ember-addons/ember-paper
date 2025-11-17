/* eslint-disable ember/no-classic-components */
/**
 * @module ember-paper
 */

import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

/**
 * @class
 * @extends Ember.Component
 */
export default class extends Component {
  tagName = '';
  name = 'default';
  position = 'left';
  lockedOpen = 'gt-sm';
  closeOnClick = true;

  @tracked open = false;

  get closed() {
    return !this.open;
  }

  localOnBackdropTap = () => {
    this.onToggle?.(false);
  };
}
