/* eslint-disable ember/no-classic-components */
import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default class extends Component {
  tagName = '';
  @service paperToaster;
  get activeToast() {
    return this.paperToaster.activeToast;
  }

  onClose = (toast) => {
    this.paperToaster.cancelToast(toast);
  };
}
