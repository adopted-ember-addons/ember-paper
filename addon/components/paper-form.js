/* eslint-disable ember/no-component-lifecycle-hooks, ember/require-tagless-components */
/* eslint-disable ember/classic-decorator-no-classic-methods, ember/no-classic-components, prettier/prettier */
import { tagName } from '@ember-decorators/component';
import { action, set } from '@ember/object';

import Component from '@ember/component';

import { invokeAction } from 'ember-paper/utils/invoke-action';
import { tracked } from '@glimmer/tracking';

/**
 * @class PaperForm
 * @extends Ember.Component
 * @uses ParentMixin
 */
@tagName('form')
export default class PaperForm extends Component {
  inputComponent = 'paper-input';
  submitButtonComponent = 'paper-button';
  selectComponent = 'paper-select';
  autocompleteComponent = 'paper-autocomplete';
  isTouched = false;

  @tracked errors = [];

  @tracked childComponents = [];

  register = (newChild) => {
    this.childComponents = [...this.childComponents, newChild];
  }

  deRegister = (child) => {
    this.childComponents = this.childComponents.filter(
      (item) => item !== child
    );
  }

  get isValid() {
    return !this.isInvalid;
  };

  get isInvalid() {
    return this.errors?.length || this.childComponents.some((child) => child.isInvalid);
  }

  get isInvalidAndTouched() {
    return this.isInvalid && this.isTouched;
  };

  submit() {
    this.localOnSubmit();
    return false;
  }

  @action
  localOnValidityChange() {
    if (
      this.lastIsValid !== this.isValid ||
      this.lastIsTouched !== this.isTouched
    ) {
      invokeAction(
        this,
        'onValidityChange',
        this.isValid,
        this.isTouched,
        this.isInvalidAndTouched
      );
      this.set('lastIsValid', this.isValid);
      this.set('lastIsTouched', this.isTouched);
    }
  }

  @action
  localOnSubmit() {
    if (this.isInvalid) {
      this.childComponents.forEach((child) => set(child, 'isTouched', false));
      this.childComponents = [...this.childComponents];
      this.onInvalid()
    } else {
      this.onSubmit?.();
      this.childComponents.forEach((child) => set(child, 'isTouched', false));
      this.childComponents = [...this.childComponents];
    }
  }

  // Lifecycle hooks
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let { value, errors } = this;
    let { _prevValue, _prevErrors } = this;
    if (value !== _prevValue || errors !== _prevErrors) {
      this.localOnValidityChange();
    }
    this._prevValue = value;
    this._prevErrors = errors;
  }
}
