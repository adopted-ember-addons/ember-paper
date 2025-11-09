/* eslint-disable ember/no-component-lifecycle-hooks, ember/no-mixins, prettier/prettier */
/**
 * @module ember-paper
 */
import PaperRadioBaseComponent from './paper-radio-base';
import ProxiableMixin from 'ember-paper/mixins/proxiable-mixin';

/**
 * @class PaperRadio
 * @extends PaperRadioBaseComponent
 * @uses ProxiableMixin
 */
export default PaperRadioBaseComponent.extend(ProxiableMixin, {

  didInsertElement() {
    this._super(...arguments);
    if (this.parentComponent) {
      this.parentComponent.register(this);
    }
  },

  didDestroyElement() {
    this._super(...arguments);
    if (this.parentComponent) {
      this.parentComponent.deRegister(this);
    }
  },

  processProxy() {
    this.click();
  }
});
