/* eslint-disable ember/no-classic-components, ember/no-component-lifecycle-hooks, ember/require-tagless-components */
import Component from '@ember/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { invokeAction } from 'ember-paper/utils/invoke-action';

export default class extends Component {
  tagName = 'md-fab-speed-dial';

  classNameBindings = [
    'directionClass',
    'open:md-is-open',
    'animationClass',
    'hoverFull:md-hover-full',
  ];

  @tracked open = false;
  @tracked animation = 'fling';
  @tracked direction = 'down';

  get animationClass() {
    return `md-${this.animation}`;
  }

  get directionClass() {
    return `md-${this.direction}`;
  }

  get shouldHideActions() {
    return this.animation === 'fling';
  }

  _mouseEnterHandler = undefined;
  _mouseLeaveHandler = undefined;

  didInsertElement() {
    super.didInsertElement(...arguments);
    super.didInsertElement(...arguments);

    this._mouseEnterHandler = this.handleMouseEnter.bind(this);
    this._mouseLeaveHandler = this.handleMouseLeave.bind(this);

    this.element.addEventListener('mouseenter', this._mouseEnterHandler);
    this.element.addEventListener('mouseleave', this._mouseLeaveHandler);
  }

  willDestroyElement() {
    super.willDestroyElement(...arguments);
    super.willDestroyElement(...arguments);

    this.element.removeEventListener('mouseenter', this._mouseEnterHandler);
    this.element.removeEventListener('mouseleave', this._mouseLeaveHandler);

    this._mouseEnterHandler = undefined;
    this._mouseLeaveHandler = undefined;
  }

  @action
  handleMouseEnter() {
    invokeAction(this, 'onMouseEnter');
  }

  @action
  handleMouseLeave() {
    invokeAction(this, 'onMouseLeave');
  }

  @action
  toggle() {
    this.changeOpenValue(!this.open);
  }

  @action
  close() {
    this.changeOpenValue(false);
  }

  @action
  changeOpenValue(value) {
    // support non DDAU scenario
    if (this.onToggle) {
      invokeAction(this, 'onToggle', value);
    } else {
      this.open = value;
    }
  }
}
