import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class extends Controller {
  @tracked dialogOrigin;
  @tracked showDialogWithParent;
  @tracked result;
  @tracked showDialog;
  @tracked showPromptDialog;
  @tracked dogName = '';
  @tracked showAnimatedDialog;

  /* Dialog with parent */
  openDialogWithParent = (event) => {
    this.dialogOrigin = event.currentTarget;
    this.showDialogWithParent = true;
  };

  closeDialogWithParent = (result) => {
    this.result = result;
    this.showDialogWithParent = false;
  };

  /* Dialog */
  openDialog = (event) => {
    this.dialogOrigin = event.currentTarget;
    this.showDialog = true;
  };

  closeDialog = (result) => {
    this.result = result;
    this.showDialog = false;
  };

  openPromptDialog = (/* param, event */) => {
    this.dialogOrigin = null;
    this.showPromptDialog = true;
  };

  closePromptDialog = (result, dogName) => {
    if (result === 'ok') {
      result = `${result} and dog named ${dogName}`;
    }
    this.result = result;
    this.showPromptDialog = false;
  };

  toggleSourceCode = () => {
    this.showSourceCode = !this.showSourceCode;
  };

  /* Animated dialog */
  openAnimatedDialog = () => {
    this.showAnimatedDialog = true;
  };

  closeAnimatedDialog = () => {
    this.showAnimatedDialog = false;
  };
}
