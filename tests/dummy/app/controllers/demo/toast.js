import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class extends Controller {
  @tracked duration = 3000;
  @tracked positionX = 'left';
  @tracked positionY = 'bottom';
  @tracked toastText = 'Hello world';
  @tracked toastClass = '';
  @tracked showToast = false;
  @tracked showToastWithout = false;
  @tracked showSourceCode = false;

  @service paperToaster;

  /* Toast */
  openToast = () => {
    this.showToast = true;
  };
  openToastWithout = () => {
    this.showToastWithout = true;
  };
  // BEGIN-SNIPPET toaster
  openServiceToast = () => {
    this.paperToaster.show(this.toastText, {
      duration: 4000,
      toastClass: this.toastClass,
    });
  };

  openServiceActionToast = () => {
    this.paperToaster.show(this.toastText, {
      duration: 4000,
      toastClass: this.toastClass,
      action: {
        label: 'Undo',
        accent: true,
        onClick() {
          alert('toast action pressed');
        },
      },
    });
  };
  // END-SNIPPET
  cancelToast = (toast) => {
    this.paperToaster.cancelToast(toast);
  };
  closeToast = () => {
    this.showToast = false;
  };
  closeToastWithout = () => {
    this.showToastWithout = false;
  };
  toggleSourceCode = () => {
    this.showSourceCode = !this.showSourceCode;
  };
  buttonAction() {
    alert('You have pressed the button!');
  }
}
