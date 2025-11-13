/* eslint-disable ember/classic-decorator-hooks, ember/classic-decorator-no-classic-methods, ember/no-classic-components, ember/no-component-lifecycle-hooks, ember/no-computed-properties-in-native-classes, ember/no-mixins */
import {
  classNames,
  attributeBindings,
  classNameBindings,
  tagName,
} from '@ember-decorators/component';

import { computed } from '@ember/object';
import Component from '@ember/component';
import { htmlSafe } from '@ember/template';
import FocusableMixin from 'ember-paper/mixins/focusable-mixin';
import { invokeAction } from 'ember-paper/utils/invoke-action';

@tagName('md-tab-item')
@classNames('md-tab')
@classNameBindings('isSelected:md-active')
@attributeBindings('isSelected:aria-selected', 'style', 'maybeHref:href')
export default class PaperTab extends Component.extend(FocusableMixin) {
  didInsertElement() {
    super.didInsertElement(...arguments);
    if (this.parentComponent) {
      this.parentComponent.register(this);
    }
  }

  didDestroyElement() {
    super.didDestroyElement(...arguments);
    if (this.parentComponent) {
      this.parentComponent.deRegister(this);
    }
  }

  // <a> tags have browser styles or are usually styled by the user
  // this makes sure that tab item still looks good with an anchor tag
  @computed('href')
  get style() {
    if (this.href) {
      return htmlSafe('text-decoration: none; border: none;');
    } else {
      return undefined;
    }
  }

  @computed('href', 'disabled')
  get maybeHref() {
    if (this.href && !this.disabled) {
      return this.href;
    } else {
      return undefined;
    }
  }

  @computed('selected', 'value')
  get isSelected() {
    return this.selected === this.value;
  }

  init() {
    super.init(...arguments);
    if (this.href) {
      this.set('tagName', 'a');
    }
  }

  // this method is called by the parent
  updateDimensions() {
    // this is the true current width
    // it is used to calculate the ink bar position & pagination offset
    this.setProperties({
      // we protect against reading the element here in case we have just been removed but didDestroyElement hasn't been
      // called yet and the element hasn't been removed from its parent. This is a subtle timing change that we just need to be careful about
      left: this.element?.offsetLeft,
      width: this.element?.offsetWidth,
    });
  }

  click() {
    if (!this.disabled) {
      invokeAction(this, 'onClick', ...arguments);
      invokeAction(this, 'onSelect', this);
    }
  }
}
