/* eslint-disable ember/classic-decorator-hooks, ember/classic-decorator-no-classic-methods, ember/no-classic-components, ember/no-computed-properties-in-native-classes, ember/no-get, ember/no-mixins, prettier/prettier */
/**
 * @module ember-paper
 */
import { inject as service } from '@ember/service';

import { notEmpty } from '@ember/object/computed';
import Component from '@ember/component';
import { assert } from '@ember/debug';
import FocusableMixin from 'ember-paper/mixins/focusable-mixin';
import { isPresent } from '@ember/utils';
import { invokeAction } from 'ember-paper/utils/invoke-action';
import { tracked } from '@glimmer/tracking';

/**
 * @class PaperRadioGroup
 * @extends Ember.Component
 * @uses FocusableMixin
 * @uses ParentMixin
 */
export default class PaperRadioGroup extends Component.extend(FocusableMixin) {
  tagName = 'md-radio-group';
  tabindex = 0;

  /* FocusableMixin Overrides */
  focusOnlyOnKey = true;

  radioComponent = 'paper-radio';
  labelComponent = 'paper-radio-group-label';
  role = 'radiogroup';

  @service
  constants;

  // Lifecycle hooks
  init() {
    super.init(...arguments);

    assert(
      '{{paper-radio-group}} requires an `onChange` action or null for no action',
      this.onChange !== undefined
    );
  }

  @tracked
  childComponents = [];

  register(newChild) {
    this.childComponents = [...this.childComponents, newChild];
  }

  deRegister(child) {
    this.childComponents = this.childComponents.filter(
      (item) => item !== child
    );
  }

  attributeBindings = ['role', 'ariaLabelledby:aria-labelledby'];

  get enabledChildRadios() {
    return this.childComponents.filter((item) => !item.disabled);
  }
  get childValues() {
    return this.enabledChildRadios.map((item) => item.value);
  }

  hasLabel = notEmpty('labelNode');

  keyDown(ev) {
    switch (ev.which) {
      case this.get('constants.KEYCODE.LEFT_ARROW'):
      case this.get('constants.KEYCODE.UP_ARROW'):
        ev.preventDefault();
        this.select(-1);
        break;
      case this.get('constants.KEYCODE.RIGHT_ARROW'):
      case this.get('constants.KEYCODE.DOWN_ARROW'):
        ev.preventDefault();
        this.select(1);
        break;
    }
  }

  select(increment) {
    let groupValue = this.groupValue;
    let index = 0;

    if (isPresent(groupValue)) {
      index = this.childValues.indexOf(groupValue);
      index += increment;
      let length = this.get('childValues.length');
      index = ((index % length) + length) % length;
    }

    let childRadio = this.enabledChildRadios[index];
    childRadio.set('focused', true);
    invokeAction(this, 'onChange', childRadio.get('value'));
  }
}
