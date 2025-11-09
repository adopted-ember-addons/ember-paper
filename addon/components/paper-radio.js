/* eslint-disable prettier/prettier */
/**
 * @module ember-paper
 */
import PaperRadioBaseComponent from './paper-radio-base';

/**
 * @class PaperRadio
 * @extends PaperRadioBaseComponent
 * @uses ChildMixin
 */
export default class PaperRadio extends PaperRadioBaseComponent {
 shouldRegister = false;

 didInsertElement() {
    if (this.parentComponent) {
      this.parentComponent.register(this);
    }
  }

  didDestroyElement() {
    if (this.parentComponent) {
      this.parentComponent.deRegister(this);
    }
  }
}
