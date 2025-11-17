/* eslint-disable ember/no-classic-components, ember/no-component-lifecycle-hooks */
/**
 * @module ember-paper
 */
import Component from '@ember/component';
import { getOwner } from '@ember/application';
import { invokeAction } from 'ember-paper/utils/invoke-action';

/**
 * @class PaperDialog
 * @extends Ember.Component
 */
export default class extends Component {
  tagName = '';
  escapeToClose = true;
  focusOnOpen = true;
  opaque = true;

  // Calculate a default that is always valid for the parent of the backdrop.
  wormholeSelector = '#paper-wormhole';
  get defaultedParent() {
    return this.parent ?? this.wormholeSelector;
  }

  // Calculate a default that is always valid where the opening transition should originate.
  get defaultedOpenFrom() {
    return this.openFrom ?? this.origin ?? this.parent;
  }

  // Calculate a default that is always valid where the closing transition should terminate.
  get defaultedCloseTo() {
    return this.closeTo ?? this.origin ?? this.parent;
  }

  // Calculate the id of the wormhole destination, setting it if need be. The
  // id is that of the 'parent', if provided, or 'paper-wormhole' if not.
  get destinationId() {
    let config = getOwner(this).resolveRegistration('config:environment');

    if (config.environment === 'test' && !this.parent) {
      return '#ember-testing';
    }
    let parent = this.defaultedParent;
    let parentEle =
      typeof parent === 'string' ? document.querySelector(parent) : parent;
    // If the parentEle isn't found, assume that it is an id, but that the DOM doesn't
    // exist yet. This only happens during integration tests or if entire application
    // route is a dialog.
    if (typeof parent === 'string' && parent.charAt(0) === '#') {
      return `#${parent.substring(1)}`;
    } else {
      let id = parentEle.getAttribute('id');
      if (!id) {
        id = `${this.elementId}-parent`;
        parentEle.setAttribute('id', id);
      }
      return `#${id}`;
    }
  }

  // Find the element referenced by destinationId
  get destinationEl() {
    return document.querySelector(this.destinationId);
  }

  didInsertElement() {
    super.didInsertElement(...arguments);
    super.didInsertElement(...arguments);
    if (this.escapeToClose) {
      this._destinationEle = document.querySelector(this.destinationId);
      this._onKeyDown = (e) => {
        if (e.keyCode === 27 && this.onClose) {
          invokeAction(this, 'onClose');
        }
      };
      this._destinationEle.addEventListener('keydown', this._onKeyDown);
    }
  }

  willDestroyElement() {
    super.willDestroyElement(...arguments);
    if (this.escapeToClose && this._destinationEle) {
      this._destinationEle.removeEventListener('keydown', this._onKeyDown);
      this._onKeyDown = null;
    }
  }

  outsideClicked = () => {
    if (this.clickOutsideToClose && this.onClose) {
      this.onClose();
    }
  };
}
