/**
 * @module ember-paper
 */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import unwrapProxy from 'ember-paper/utils/unwrap-proxy';

/**
 * @class PaperSelectEbdTrigger
 * @extends Component
 */
export default class PaperSelectEpsTrigger extends Component {
  /**
   * Reference to the component's DOM input element.
   *
   * @type {HTMLElement}
   * @private
   */
  inputElement;
  /**
   *
   * @type {boolean}
   */
  @tracked resetButtonDestroyed;

  constructor(owner, args) {
    super(owner, args);

    this.resetButtonDestroyed = false;
  }

  /**
   * Performs any required DOM setup.
   *
   * @param {HTMLElement} element - the node that has been added to the DOM.
   */
  @action didInsertNode(element) {
    this.inputElement = element.querySelector('input');
  }

  get select() {
    return this.args.select;
  }

  get selectedText() {
    let selected = unwrapProxy(this.select.selected);
    let labelPath = this.args.extra.labelPath;
    if (selected && labelPath) {
      return selected[labelPath];
    }

    return selected;
  }

  get text() {
    let text = this.selectedText;
    if (text) {
      return text;
    }

    return this.args.searchText || '';
  }

  get showingClearButton() {
    // make room for clear button:
    // - if we're enabled
    // - or if we're disabled but the button still wasn't destroyed
    let select = this.select;
    return (
      this.args.allowClear &&
      (!select.disabled || (select.disabled && !this.resetButtonDestroyed))
    );
  }

  @action handleKeydown(e) {
    let isLetter = (e.keyCode >= 48 && e.keyCode <= 90) || e.keyCode === 32; // Keys 0-9, a-z or SPACE
    let isSpecialKeyWhileClosed =
      !isLetter &&
      !this.select.isOpen &&
      [13, 27, 38, 40].indexOf(e.keyCode) > -1;
    if (isLetter || isSpecialKeyWhileClosed) {
      e.stopPropagation();
    }
  }

  @action handleOnInput(value) {
    if (this.args.onInput) {
      this.args.onInput({ target: { value } });
    }
  }

  @action handleClear(e) {
    e.stopPropagation();
    if (this.args.onClear) {
      this.args.onClear();
    } else {
      this.select.actions.select(null);
      this.args?.onInput({ target: { value: '' } });
    }
    this.args?.onFocus(e);
    this.inputElement.focus();
  }

  @action handleResetButtonDestroyed() {
    if (this.args.disabled) {
      this.resetButtonDestroyed = true;
    }
  }
}