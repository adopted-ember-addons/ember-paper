import Controller from '@ember/controller';
import { faker } from '@faker-js/faker';
import { tracked } from '@glimmer/tracking';

export default class extends Controller {
  @tracked fruitNames = ['Apple', 'Banana', 'Orange'];
  @tracked customFruitNames = ['Apple', 'Banana', 'Orange'];
  @tracked numOfContacts = 10;

  get contacts() {
    let contacts = [];
    let numOfContacts = this.numOfContacts;

    for (let i = 0; i < numOfContacts; i++) {
      contacts.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        image: faker.image.avatar(),
      });
    }

    return contacts;
  }

  @tracked selectedContacts = [];

  get remainingContacts() {
    return this.contacts.filter((c) => {
      return this.selectedContacts.indexOf(c) === -1;
    });
  }

  get altContacts() {
    let contacts = [];
    let numOfContacts = this.numOfContacts;

    for (let i = 0; i < numOfContacts; i++) {
      let firstName = faker.person.firstName();
      let lastName = faker.person.lastName();

      contacts.push({
        shortName: `${firstName} ${lastName[0]}`,
        emailAddress: `${firstName.toLowerCase()}.${lastName[0].toLowerCase()}@example.com`,
        profileImage: faker.image.avatar(),
      });
    }

    return contacts;
  }

  @tracked selectedAltContacts = [];

  get remainingAltContacts() {
    return this.altContacts.filter((c) => {
      return this.selectedAltContacts.indexOf(c) === -1;
    });
  }

  @tracked vegetables = [
    {
      name: 'Broccoli',
      family: 'Brassica',
    },
  ];

  allVegetables = [
    {
      name: 'Broccoli',
      family: 'Brassica',
    },
    {
      name: 'Cabbage',
      family: 'Brassica',
    },
    {
      name: 'Carrot',
      family: 'Umbelliferous',
    },
    {
      name: 'Lettuce',
      family: 'Composite',
    },
    {
      name: 'Spinach',
      family: 'Goosefoot',
    },
  ];

  get remainingVegetables() {
    return this.allVegetables.filter((source) => {
      return !this.vegetables.some(function (myVegetable) {
        return source.name === myVegetable.name;
      });
    });
  }

  @tracked vegeNames = ['Broccoli'];

  allVegeNames = ['Broccoli', 'Cabbage', 'Carrot', 'Lettuce', 'Spinach'];

  get remainingVegeNames() {
    return this.allVegeNames.filter((source) => {
      return !this.vegeNames.some(function (myVegeName) {
        return source === myVegeName;
      });
    });
  }

  removeItem = (item) => {
    this.fruitNames = this.fruitNames.filter((i) => item !== i);
  };

  addItem = (item) => {
    this.fruitNames = [...this.fruitNames, item];
  };

  removeCustomItem = (item) => {
    this.customFruitNames = this.customFruitNames.filter((i) => item !== i);
  };

  addCustomItem = (item) => {
    this.customFruitNames = [...this.customFruitNames, item];
  };

  removeVegetable = (item) => {
    this.vegetables = this.vegetables.filter((i) => item !== i);
  };

  addVegetable = (item) => {
    this.vegetables = [...this.vegetables, item];
  };

  removeVegeName = (item) => {
    this.vegeNames = this.vegeNames.filter((i) => item !== i);
  };

  addVegeName = (item) => {
    this.vegeNames = [...this.vegeNames, item];
  };

  addContact = (item) => {
    this.selectedContacts = [...this.selectedContacts, item];
  };

  removeContact = (item) => {
    this.selectedContacts = this.selectedContacts.filter((i) => item !== i);
  };

  addAltContact = (item) => {
    this.selectedAltContacts = [...this.selectedAltContacts, item];
  };

  removeAltContact = (item) => {
    this.selectedAltContacts = this.selectedAltContacts.filter(
      (i) => item !== i,
    );
  };
}
