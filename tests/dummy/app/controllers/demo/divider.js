import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class extends Controller {
  @tracked showSourceCodeFull = false;
  @tracked showSourceCodeInset = false;

  messages = [
    {
      face: 'tomster.png',
      who: 'tomster 1',
      what: 'a message for you',
      notes: 'this is a message for you about ember',
    },
    {
      face: 'tomster.png',
      who: 'tomster 2',
      what: 'a message for you',
      notes: 'this is a message for you about ember',
    },
    {
      face: 'tomster.png',
      who: 'tomster 3',
      what: 'a message for you',
      notes: 'this is a message for you about ember',
    },
    {
      face: 'tomster.png',
      who: 'tomster 4',
      what: 'a message for you',
      notes: 'this is a message for you about ember',
    },
    {
      face: 'tomster.png',
      who: 'tomster 5',
      what: 'a message for you',
      notes: 'this is a message for you about ember',
    },
  ];

  toggleSourceCodeFull = () => {
    this.showSourceCodeFull = !this.showSourceCodeFull;
  };

  toggleSourceCodeInset = () => {
    this.showSourceCodeInset = !this.showSourceCodeInset;
  };
}
