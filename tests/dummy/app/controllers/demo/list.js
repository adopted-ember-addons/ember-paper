import Controller from '@ember/controller';
import { faker } from '@faker-js/faker';
import { tracked } from '@glimmer/tracking';

export default class extends Controller {
  @tracked numOfRows = 3;

  get listData() {
    let contacts = [];
    let numOfRows = this.numOfRows;

    for (let i = 0; i < numOfRows; i++) {
      contacts.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        img: faker.image.dataUri(),
      });
    }

    return contacts;
  }

  phoneNumbers = [
    {
      number: '(555) 251-1234',
      type: 'Home',
    },
    {
      number: '(555) 786-9841',
      type: 'Mobile',
    },
    {
      number: '(555) 314-1592',
      type: 'Office',
    },
  ];

  toppings = [
    {
      name: 'Pepperoni',
      enabled: false,
    },
    {
      name: 'Sausage',
      enabled: false,
    },
    {
      name: 'Black Olives',
      enabled: true,
    },
    {
      name: 'Green Peppers',
      enabled: false,
    },
  ];

  messageData = [
    {
      message: 'Message A',
    },
    {
      message: 'Message B',
    },
    {
      message: 'Message C',
    },
  ];

  transitionTo(value) {
    alert(`Imagine you transition to "${value}" here.`);
  }
  transitionToWifiMenu() {
    alert('Imagine you transition to wifi settings here.');
  }
  transitionToBluetoothMenu() {
    alert('Imagine you transition to Bluetooth settings here.');
  }
  secondaryMessageClick() {
    alert('Secondary actions can be used for one click actions.');
  }
  goToPerson(person) {
    alert(
      `Imagine you transition to the person full view for '${person.name}' here.`,
    );
  }
  secondaryPersonClick(person) {
    alert(
      `'${person.name}'. Secondary actions can be used for one click actions.`,
    );
  }
  transitionToDataUsage() {
    alert('Imagine you would be taken to data-usage.');
  }
}
