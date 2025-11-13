import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class extends Controller {
  @tracked firstName;
  @tracked lastName;
  @tracked age;
  @tracked selectedCountry;
  @tracked favoriteLetter;
  @tracked favouriteNumber;

  items = [
    { name: 'Afghanistan', code: 'AF' },
    { name: 'Åland Islands', code: 'AX' },
    { name: 'Albania', code: 'AL' },
    { name: 'Algeria', code: 'DZ' },
    { name: 'American Samoa', code: 'AS' },
    { name: 'AndorrA', code: 'AD' },
    { name: 'Angola', code: 'AO' },
    { name: 'Anguilla', code: 'AI' },
    { name: 'Antarctica', code: 'AQ' },
    { name: 'Antigua and Barbuda', code: 'AG' },
  ];

  basicSubmitAction() {
    this.firstName = '';
    this.lastName = '';
    this.age = '';
    this.selectedCountry = null;
  }
  disabledSubmitAction() {
    this.favoriteLetter = '';
  }
  customSubmitAction() {
    this.favoriteNumber = '';
  }
}
