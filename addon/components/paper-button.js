import Ember from 'ember';
import BaseFocusable from './base-focusable';
import RippleMixin from '../mixins/ripple-mixin';
import ProxiableMixin from 'ember-paper/mixins/proxiable-mixin';
import ColorMixin from 'ember-paper/mixins/color-mixin';

export default BaseFocusable.extend(RippleMixin, ProxiableMixin, ColorMixin, {
  attributeBindings: ['target', 'action', 'type'],
  tagName: 'button',
  themed: true,
  classNameBindings: ['raised:md-raised', 'icon-button:md-icon-button', 'focus:md-focused', 'themed:md-default-theme', 'themed:md-button'],

  // Ripple Overrides
  rippleContainerSelector: null,
  fitRipple: Ember.computed.readOnly('isIconButton'),
  center: Ember.computed.readOnly('isIconButton'),
  dimBackground: Ember.computed.not('isIconButton'),

  noSpan: Ember.computed('no-span', function() {
    return this.get('no-span');
  }),

  // RippleMixin overrides
  isIconButton: Ember.computed(function() {
    return this.classNames.any(function(className) {
      return className.indexOf('md-icon-button') !== -1;
    });
  }),
  isMenuItem: Ember.computed(function() {
    return this.classNames.any(function(className) {
      return className.indexOf('md-menu-item') !== -1;
    });
  }),

  // bubble actions by default
  bubbles: true,
  click(event) {
    let target = this.get('target');

    if (target) {
      this.get('target').send(this.get('action'), this.get('param'), event);
    } else {
      this.sendAction('action', this.get('param'), event);
    }

    return this.get('bubbles');
  }
});
