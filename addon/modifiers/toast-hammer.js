import { modifier } from 'ember-modifier';

/* global Hammer */

export default modifier(function toasterHammer(element, positional, named) {
  let hammer;

  function setXPosition(event) {
    element.style.transform = `translate(${event}px, 0)`;
  }

  function dragStart(event) {
    element.classList.add('md-dragging');
    element.focus();
    setXPosition(event.center.x);
  }

  function drag(event) {
    if (!element.classList.contains('md-dragging')) {
      return;
    }

    this.setXPosition(event.deltaX);
  }

  function dragEnd() {
    element.classList.remove('md-dragging');
    if (named.onClose) {
      named.onClose();
    }
  }

  if (named.enabled) {
    // Enable dragging the slider
    let containerManager = new Hammer.Manager(element, {
      dragLockToAxis: true,
      dragBlockHorizontal: true,
    });
    let swipe = new Hammer.Swipe({
      direction: Hammer.DIRECTION_ALL,
      threshold: 10,
    });
    let pan = new Hammer.Pan({
      direction: Hammer.DIRECTION_ALL,
      threshold: 10,
    });
    containerManager.add(swipe);
    containerManager.add(pan);
    containerManager
      .on('panstart', dragStart)
      .on('panmove', drag)
      .on('panend', dragEnd)
      .on('swiperight swipeleft', dragEnd);
    hammer = containerManager;
  }

  return () => {
    if (hammer) {
      hammer.destroy();
    }
  };
});
