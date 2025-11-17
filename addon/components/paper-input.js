/* eslint-disable ember/no-classic-components, ember/no-component-lifecycle-hooks, ember/no-computed-properties-in-native-classes, ember/no-mixins, ember/no-runloop, prettier/prettier */
/**
 * @module ember-paper
 */
import { or, and } from '@ember/object/computed';

import Component from '@ember/component';
import { action, computed, set } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { bind, next } from '@ember/runloop';
import { assert } from '@ember/debug';
import FocusableMixin from 'ember-paper/mixins/focusable-mixin';
import ValidationMixin from 'ember-paper/mixins/validation-mixin';
import { invokeAction } from 'ember-paper/utils/invoke-action';
import { tracked } from '@glimmer/tracking';

/**
 * @class PaperInput
 * @extends Ember.Component
 * @uses FocusableMixin
 * @uses ChildMixin
 * @uses ValidationMixin
 */
export default class extends Component.extend(FocusableMixin, ValidationMixin) {
  tagName = 'md-input-container';
  classNames = ['md-default-theme'];

  classNameBindings = [
    'hasValue:md-input-has-value',
    'isInvalidAndTouched:md-input-invalid',
    'hasLeftIcon:md-icon-left',
    'hasRightIcon:md-icon-right',
    'focused:md-input-focused',
    'block:md-block',
    'placeholder:md-input-has-placeholder',
    'warn:md-warn',
    'accent:md-accent',
    'primary:md-primary',
  ];

  type = 'text';
  autofocus = false;
  tabindex = null;
  hideAllMessages = false;
  iconComponent = 'paper-icon';

  // this can't be tracked yet because it needs to be changed from outside
  isTouched = false;
  isNativeInvalid;

  @tracked value;
  @tracked icon;
  @tracked iconRight;

  // override validation mixin `isInvalid` to account for the native input validity
  @or('hasErrorMessages', 'isNativeInvalid')
  isInvalid;

  @computed('isNativeInvalid', 'value')
  get hasValue() {
    let value = this.value;
    let isNativeInvalid = this.isNativeInvalid;
    return !isEmpty(value) || isNativeInvalid;
  }

  @computed('label', 'focused')
  get shouldAddPlaceholder() {
    // if has label, only add placeholder when focused
    return isEmpty(this.label) || this.focused;
  }

  // elementId can be set from outside and it will override the computed value.
  // Please check the deprecations for further details
  // https://deprecations.emberjs.com/v3.x/#toc_computed-property-override
  get inputElementId() {
      return `${this.elementId}`;
  }

  set inputElementId(value) {
    // To make sure the context updates properly, We are manually set value using @ember/object#set as recommended.
    this.elementId = value;
  }

  get currentLength() {
    return this.value ? this.value.length : 0;
  }

  get hasLeftIcon () {
    return Boolean(this.icon);
  }

  get hasRightIcon () {
    return Boolean (this.iconRight);
  }

  @and('isTouched', 'isInvalid')
  isInvalidAndTouched;

  // property that validations should be run on
  validationProperty = 'value';


  // Lifecycle hooks
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);
    assert(
      '{{paper-input}} requires an `onChange` action or null for no action.',
      this.onChange !== undefined
    );

    let { value, errors } = this;
    let { _prevValue, _prevErrors } = this;
    if (value !== _prevValue || errors !== _prevErrors) {
      this.notifyValidityChange();
    }
    this._prevValue = value;
    this._prevErrors = errors;
  }

  didInsertElement() {
    super.didInsertElement(...arguments);

    if (this.parentComponent) {
      this.parentComponent.register(this);
    }

    if (this.textarea) {
      this._growTextareaOnResize = bind(this, this.growTextarea);
      window.addEventListener('resize', this._growTextareaOnResize);
    }
  }

  didRender() {
    super.didRender(...arguments);
    // setValue below ensures that the input value is the same as this.value
    this.setValue(this.value);
    this.growTextarea();
  }

  willDestroyElement() {
    super.willDestroyElement(...arguments);

    if (this.parentComponent) {
      this.parentComponent.deRegister(this);
    }
    if (this.textarea) {
      window.removeEventListener('resize', this._growTextareaOnResize);
      this._growTextareaOnResize = null;
    }
  }

  growTextarea() {
    if (this.textarea) {
      let inputElement = this.element.querySelector('input, textarea');
      inputElement.classList.add('md-no-flex');
      inputElement.setAttribute('rows', 1);

      let minRows = this.passThru?.rows;
      let height = this.getHeight(inputElement);
      if (minRows) {
        if (!this.lineHeight) {
          inputElement.style.minHeight = 0;
          this.lineHeight = inputElement.clientHeight;
          inputElement.style.minHeight = null;
        }
        if (this.lineHeight) {
          height = Math.max(height, this.lineHeight * minRows);
        }
        let proposedHeight = Math.round(height / this.lineHeight);
        let maxRows = this.passThru?.maxRows || Number.MAX_VALUE;
        let rowsToSet = Math.min(proposedHeight, maxRows);

        inputElement.style.height = `${this.lineHeight * rowsToSet}px`;
        inputElement.setAttribute('rows', rowsToSet);

        if (proposedHeight >= maxRows) {
          inputElement.classList.add('md-textarea-scrollable');
        } else {
          inputElement.classList.remove('md-textarea-scrollable');
        }
      } else {
        inputElement.style.height = 'auto';
        inputElement.scrollTop = 0;
        let height = this.getHeight(inputElement);
        if (height) {
          inputElement.style.height = `${height}px`;
        }
      }

      inputElement.classList.remove('md-no-flex');
    }
  }

  getHeight(inputElement) {
    let { offsetHeight } = inputElement;
    let line = inputElement.scrollHeight - offsetHeight;
    return offsetHeight + (line > 0 ? line : 0);
  }

  setValue(value) {
    // normalize falsy values to empty string
    value = isEmpty(value) ? '' : value;

    if (this.element.querySelector('input, textarea').value !== value) {
      this.element.querySelector('input, textarea').value = value;
    }
  }

  @action
  handleInput(e) {
    invokeAction(this, 'onChange', e.target.value);
    // setValue below ensures that the input value is the same as this.value
    next(() => {
      if (this.isDestroyed) {
        return;
      }
      this.setValue(this.value);
    });
    this.growTextarea();
    let inputElement = this.element.querySelector('input');
    let isNativeInvalid =
      inputElement && inputElement.validity && inputElement.validity.badInput;
    if (this.type === 'date' && e.target.value === '') {
      // Chrome doesn't fire the onInput event when clearing the second and third date components.
      // This means that we won't see another event when badInput becomes false if the user is clearing
      // the date field.  The reported value is empty, though, so we can already mark it as valid.
      isNativeInvalid = false;
    }
    set(this, 'isNativeInvalid', isNativeInvalid);
    this.notifyValidityChange();
  }

  @action
  handleBlur(e) {
    this.onBlur?.(e);
    set(this, 'isTouched', true);
    this.notifyValidityChange();
  }
}
