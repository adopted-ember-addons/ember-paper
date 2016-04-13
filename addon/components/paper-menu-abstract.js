import Ember from 'ember';

const { Component, computed: { alias }, inject: { service }, assert } = Ember;

export default Component.extend({
  constants: service(),

  'is-open': false,

  /* this is true when toggleMenu action is called, but only turns false when animation to hide the wrapper is done. */
  isOpen: alias('is-open'),

  /* Supports a on-open that can return a promise, menu is not opened before this promise is resolved by the origin. */
  onOpen: alias('on-open'),

  /* async: is true if promise was not resolved. */
  isLoading: false,

  /* cache async requests */
  cache: true,

  preventMenuOpen: false,

  setOpen(newState) {
    this.set('isOpen', newState);
    let action = this.get(newState ? 'onOpenMenu' : 'onCloseMenu');
    if (action) {
      action();
    }
  },

  actions: {

    toggleMenu() {
      if (this.get('isOpen')) {
        this.get('activeWrapper').hideWrapper().then(() => {
          this.setOpen(false);
        });
      } else {
        if (this.get('preventMenuOpen')) {
          return;
        }
        if (this.get('onOpen') && (!this.get('items') || !this.get('cache'))) {
          this.set('activeWrapper', null);
          this.set('isLoading', true);
          this.setOpen(true);
          let promise = this.get('onOpen').call(this);
          promise.then((data) => {
            this.set('items', data);
            this.set('isLoading', false);
          }, () => {
            this.set('items', Ember.A([]));
            this.setOpen(false);
            this.set('isLoading', false);
          });
        } else {
          this.set('activeWrapper', null);
          this.setOpen(true);
        }
      }
    }
  },

  didReceiveAttrs() {
    Ember.run.scheduleOnce('afterRender', () => {
      if (this.get('activeWrapper')) {
        this.positionMenu(this.get('activeWrapper').$());
      }
    });
  },

  registerWrapper(component) {
    this.set('activeWrapper', component);
    this.positionMenu(component.$());
  },

  positionMenu(el) {
    assert(`Override positionMenu to create custom animation for the menu component: ${el} ${this.get('activeWrapper')}`);
  }

});
