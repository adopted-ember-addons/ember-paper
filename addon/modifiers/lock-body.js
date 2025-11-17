/* eslint-disable prettier/prettier */
import { modifier } from 'ember-modifier';

const LOCK_BODY_CLASS = 'ember-paper-lockbody';

export default modifier(
  function lockBody(_element, _positional, named) {
    if(named.skipLockBody) {
      return;
    }
    document.querySelector('body').classList.add(LOCK_BODY_CLASS);

    return () => {
      document.querySelector('body').classList.remove(LOCK_BODY_CLASS);
    };
  },
  {
    eager: false,
  }
);
