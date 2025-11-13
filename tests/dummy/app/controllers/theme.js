/* eslint-disable prettier/prettier */
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

import PALETTES from 'ember-paper/utils/palettes';
import { action } from '@ember/object';

const palletObjects = Object.keys(PALETTES).map((key) => {
  let palette = PALETTES[key];
  return {
    name: key,
    palette
  };
});

export default class extends Controller {
  @service paperTheme;

  @tracked primary = palletObjects.find((p) => p.name === 'pink');
  @tracked accent = palletObjects.find((p) => p.name === 'green');
  @tracked warn = palletObjects.find((p) => p.name === 'red');

  constructor() {
    super(...arguments);
  }

  get palettes() {
    return palletObjects;
  }

  get isValid() {
    return this.primary && this.accent && this.warn
  }

  get isInvalid() {
    return !this.isValid
  }



  // BEGIN-SNIPPET theme.service
  @action
  installTheme() {
    this.paperTheme.installTheme('main', {
      primary: this.primary.palette,
      accent: this.accent.palette,
      warn: this.warn.palette
    });
  }

  @action
  uninstallTheme() {
    this.paperTheme.uninstallTheme('main');
  }
  // END-SNIPPET


  @action
  setTheme(type, value) {
    this[type] = value;
  }
}
