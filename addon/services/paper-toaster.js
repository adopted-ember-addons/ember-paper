/* eslint-disable ember/no-runloop, prettier/prettier */
import { reads } from '@ember/object/computed';
import { later } from '@ember/runloop';
import { A } from '@ember/array';
import Service from '@ember/service';
import EObject from '@ember/object';
import config from 'ember-get-config';

const DEFAULT_PROPS = {
  duration: 3000,
  position: 'bottom left'
};

export default Service.extend({
  queue: A(),

  activeToast: reads('queue.firstObject'),

  show(text, options) {
    let t = EObject.create(Object.assign({ text, show: true }, this.buildOptions(options)));
    this.queue.pushObject(t);
    return t;
  },

  showComponent(componentName, options) {
    let t = EObject.create(Object.assign({ componentName, show: true }, this.buildOptions(options)));
    this.queue.pushObject(t);
    return t;
  },

  cancelToast(toast) {
    toast.set('show', false);

    if (this.activeToast === toast) {
      later(() => {
        if (toast.onClose) { toast.onClose() }
        this.queue.removeObject(toast);
      }, 400);
    } else {
      if (toast.onClose) { toast.onClose() }
      this.queue.removeObject(toast);
    }
  },

  buildOptions(options) {
    let toasterOptions = {};
    if (config['ember-paper'] && config['ember-paper']['paper-toaster']) {
      toasterOptions = config['ember-paper']['paper-toaster'];
    }
    return Object.assign({}, DEFAULT_PROPS, toasterOptions, options);
  }
});
