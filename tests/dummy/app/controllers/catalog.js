import Controller from '@ember/controller';
import { A } from '@ember/array';
import { action } from '@ember/object';
import { later, cancel } from '@ember/runloop';
import { faker } from '@faker-js/faker';
import { tracked } from '@glimmer/tracking';
import { buildGridModel } from '../utils/grid-list';

export default class CatalogController extends Controller {
  // Autocomplete
  countries = A([
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
    { name: 'Argentina', code: 'AR' },
    { name: 'Armenia', code: 'AM' },
    { name: 'Aruba', code: 'AW' },
    { name: 'Australia', code: 'AU' },
    { name: 'Austria', code: 'AT' },
    { name: 'Azerbaijan', code: 'AZ' },
    { name: 'Bahamas', code: 'BS' },
    { name: 'Bahrain', code: 'BH' },
    { name: 'Bangladesh', code: 'BD' },
    { name: 'Barbados', code: 'BB' },
    { name: 'Belarus', code: 'BY' },
    { name: 'Belgium', code: 'BE' },
    { name: 'Belize', code: 'BZ' },
    { name: 'Benin', code: 'BJ' },
    { name: 'Bermuda', code: 'BM' },
    { name: 'Bhutan', code: 'BT' },
    { name: 'Bolivia', code: 'BO' },
    { name: 'Bosnia and Herzegovina', code: 'BA' },
    { name: 'Botswana', code: 'BW' },
    { name: 'Bouvet Island', code: 'BV' },
    { name: 'Brazil', code: 'BR' },
    { name: 'British Indian Ocean Territory', code: 'IO' },
    { name: 'Brunei Darussalam', code: 'BN' },
    { name: 'Bulgaria', code: 'BG' },
    { name: 'Burkina Faso', code: 'BF' },
    { name: 'Burundi', code: 'BI' },
    { name: 'Cambodia', code: 'KH' },
    { name: 'Cameroon', code: 'CM' },
    { name: 'Canada', code: 'CA' },
    { name: 'Cape Verde', code: 'CV' },
    { name: 'Cayman Islands', code: 'KY' },
    { name: 'Central African Republic', code: 'CF' },
    { name: 'Chad', code: 'TD' },
    { name: 'Chile', code: 'CL' },
    { name: 'China', code: 'CN' },
    { name: 'Christmas Island', code: 'CX' },
    { name: 'Cocos (Keeling) Islands', code: 'CC' },
    { name: 'Colombia', code: 'CO' },
    { name: 'Comoros', code: 'KM' },
    { name: 'Congo', code: 'CG' },
    { name: 'Congo, The Democratic Republic of the', code: 'CD' },
    { name: 'Cook Islands', code: 'CK' },
    { name: 'Costa Rica', code: 'CR' },
    { name: "Cote D'Ivoire", code: 'CI' },
    { name: 'Croatia', code: 'HR' },
    { name: 'Cuba', code: 'CU' },
    { name: 'Cyprus', code: 'CY' },
    { name: 'Czech Republic', code: 'CZ' },
    { name: 'Denmark', code: 'DK' },
    { name: 'Djibouti', code: 'DJ' },
    { name: 'Dominica', code: 'DM' },
    { name: 'Dominican Republic', code: 'DO' },
    { name: 'Ecuador', code: 'EC' },
    { name: 'Egypt', code: 'EG' },
    { name: 'El Salvador', code: 'SV' },
    { name: 'Equatorial Guinea', code: 'GQ' },
    { name: 'Eritrea', code: 'ER' },
    { name: 'Estonia', code: 'EE' },
    { name: 'Ethiopia', code: 'ET' },
    { name: 'Falkland Islands (Malvinas)', code: 'FK' },
    { name: 'Faroe Islands', code: 'FO' },
    { name: 'Fiji', code: 'FJ' },
    { name: 'Finland', code: 'FI' },
    { name: 'France', code: 'FR' },
    { name: 'French Guiana', code: 'GF' },
    { name: 'French Polynesia', code: 'PF' },
    { name: 'French Southern Territories', code: 'TF' },
    { name: 'Gabon', code: 'GA' },
    { name: 'Gambia', code: 'GM' },
    { name: 'Georgia', code: 'GE' },
    { name: 'Germany', code: 'DE' },
    { name: 'Ghana', code: 'GH' },
    { name: 'Gibraltar', code: 'GI' },
    { name: 'Greece', code: 'GR' },
    { name: 'Greenland', code: 'GL' },
    { name: 'Grenada', code: 'GD' },
    { name: 'Guadeloupe', code: 'GP' },
    { name: 'Guam', code: 'GU' },
    { name: 'Guatemala', code: 'GT' },
    { name: 'Guernsey', code: 'GG' },
    { name: 'Guinea', code: 'GN' },
    { name: 'Guinea-Bissau', code: 'GW' },
    { name: 'Guyana', code: 'GY' },
    { name: 'Haiti', code: 'HT' },
    { name: 'Heard Island and Mcdonald Islands', code: 'HM' },
    { name: 'Holy See (Vatican City State)', code: 'VA' },
    { name: 'Honduras', code: 'HN' },
    { name: 'Hong Kong', code: 'HK' },
    { name: 'Hungary', code: 'HU' },
    { name: 'Iceland', code: 'IS' },
    { name: 'India', code: 'IN' },
    { name: 'Indonesia', code: 'ID' },
    { name: 'Iran, Islamic Republic Of', code: 'IR' },
    { name: 'Iraq', code: 'IQ' },
    { name: 'Ireland', code: 'IE' },
    { name: 'Isle of Man', code: 'IM' },
    { name: 'Israel', code: 'IL' },
    { name: 'Italy', code: 'IT' },
    { name: 'Jamaica', code: 'JM' },
    { name: 'Japan', code: 'JP' },
    { name: 'Jersey', code: 'JE' },
    { name: 'Jordan', code: 'JO' },
    { name: 'Kazakhstan', code: 'KZ' },
    { name: 'Kenya', code: 'KE' },
    { name: 'Kiribati', code: 'KI' },
    { name: "Korea, Democratic People'S Republic of", code: 'KP' },
    { name: 'Korea, Republic of', code: 'KR' },
    { name: 'Kuwait', code: 'KW' },
    { name: 'Kyrgyzstan', code: 'KG' },
    { name: "Lao People'S Democratic Republic", code: 'LA' },
    { name: 'Latvia', code: 'LV' },
    { name: 'Lebanon', code: 'LB' },
    { name: 'Lesotho', code: 'LS' },
    { name: 'Liberia', code: 'LR' },
    { name: 'Libyan Arab Jamahiriya', code: 'LY' },
    { name: 'Liechtenstein', code: 'LI' },
    { name: 'Lithuania', code: 'LT' },
    { name: 'Luxembourg', code: 'LU' },
    { name: 'Macao', code: 'MO' },
    { name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK' },
    { name: 'Madagascar', code: 'MG' },
    { name: 'Malawi', code: 'MW' },
    { name: 'Malaysia', code: 'MY' },
    { name: 'Maldives', code: 'MV' },
    { name: 'Mali', code: 'ML' },
    { name: 'Malta', code: 'MT' },
    { name: 'Marshall Islands', code: 'MH' },
    { name: 'Martinique', code: 'MQ' },
    { name: 'Mauritania', code: 'MR' },
    { name: 'Mauritius', code: 'MU' },
    { name: 'Mayotte', code: 'YT' },
    { name: 'Mexico', code: 'MX' },
    { name: 'Micronesia, Federated States of', code: 'FM' },
    { name: 'Moldova, Republic of', code: 'MD' },
    { name: 'Monaco', code: 'MC' },
    { name: 'Mongolia', code: 'MN' },
    { name: 'Montserrat', code: 'MS' },
    { name: 'Morocco', code: 'MA' },
    { name: 'Mozambique', code: 'MZ' },
    { name: 'Myanmar', code: 'MM' },
    { name: 'Namibia', code: 'NA' },
    { name: 'Nauru', code: 'NR' },
    { name: 'Nepal', code: 'NP' },
    { name: 'Netherlands', code: 'NL' },
    { name: 'Netherlands Antilles', code: 'AN' },
    { name: 'New Caledonia', code: 'NC' },
    { name: 'New Zealand', code: 'NZ' },
    { name: 'Nicaragua', code: 'NI' },
    { name: 'Niger', code: 'NE' },
    { name: 'Nigeria', code: 'NG' },
    { name: 'Niue', code: 'NU' },
    { name: 'Norfolk Island', code: 'NF' },
    { name: 'Northern Mariana Islands', code: 'MP' },
    { name: 'Norway', code: 'NO' },
    { name: 'Oman', code: 'OM' },
    { name: 'Pakistan', code: 'PK' },
    { name: 'Palau', code: 'PW' },
    { name: 'Palestinian Territory, Occupied', code: 'PS' },
    { name: 'Panama', code: 'PA' },
    { name: 'Papua New Guinea', code: 'PG' },
    { name: 'Paraguay', code: 'PY' },
    { name: 'Peru', code: 'PE' },
    { name: 'Philippines', code: 'PH' },
    { name: 'Pitcairn', code: 'PN' },
    { name: 'Poland', code: 'PL' },
    { name: 'Portugal', code: 'PT' },
    { name: 'Puerto Rico', code: 'PR' },
    { name: 'Qatar', code: 'QA' },
    { name: 'Reunion', code: 'RE' },
    { name: 'Romania', code: 'RO' },
    { name: 'Russian Federation', code: 'RU' },
    { name: 'RWANDA', code: 'RW' },
    { name: 'Saint Helena', code: 'SH' },
    { name: 'Saint Kitts and Nevis', code: 'KN' },
    { name: 'Saint Lucia', code: 'LC' },
    { name: 'Saint Pierre and Miquelon', code: 'PM' },
    { name: 'Saint Vincent and the Grenadines', code: 'VC' },
    { name: 'Samoa', code: 'WS' },
    { name: 'San Marino', code: 'SM' },
    { name: 'Sao Tome and Principe', code: 'ST' },
    { name: 'Saudi Arabia', code: 'SA' },
    { name: 'Senegal', code: 'SN' },
    { name: 'Serbia and Montenegro', code: 'CS' },
    { name: 'Seychelles', code: 'SC' },
    { name: 'Sierra Leone', code: 'SL' },
    { name: 'Singapore', code: 'SG' },
    { name: 'Slovakia', code: 'SK' },
    { name: 'Slovenia', code: 'SI' },
    { name: 'Solomon Islands', code: 'SB' },
    { name: 'Somalia', code: 'SO' },
    { name: 'South Africa', code: 'ZA' },
    { name: 'South Georgia and the South Sandwich Islands', code: 'GS' },
    { name: 'Spain', code: 'ES' },
    { name: 'Sri Lanka', code: 'LK' },
    { name: 'Sudan', code: 'SD' },
    { name: 'Suriname', code: 'SR' },
    { name: 'Svalbard and Jan Mayen', code: 'SJ' },
    { name: 'Swaziland', code: 'SZ' },
    { name: 'Sweden', code: 'SE' },
    { name: 'Switzerland', code: 'CH' },
    { name: 'Syrian Arab Republic', code: 'SY' },
    { name: 'Taiwan, Province of China', code: 'TW' },
    { name: 'Tajikistan', code: 'TJ' },
    { name: 'Tanzania, United Republic of', code: 'TZ' },
    { name: 'Thailand', code: 'TH' },
    { name: 'Timor-Leste', code: 'TL' },
    { name: 'Togo', code: 'TG' },
    { name: 'Tokelau', code: 'TK' },
    { name: 'Tonga', code: 'TO' },
    { name: 'Trinidad and Tobago', code: 'TT' },
    { name: 'Tunisia', code: 'TN' },
    { name: 'Turkey', code: 'TR' },
    { name: 'Turkmenistan', code: 'TM' },
    { name: 'Turks and Caicos Islands', code: 'TC' },
    { name: 'Tuvalu', code: 'TV' },
    { name: 'Uganda', code: 'UG' },
    { name: 'Ukraine', code: 'UA' },
    { name: 'United Arab Emirates', code: 'AE' },
    { name: 'United Kingdom', code: 'GB' },
    { name: 'United States', code: 'US' },
    { name: 'United States Minor Outlying Islands', code: 'UM' },
    { name: 'Uruguay', code: 'UY' },
    { name: 'Uzbekistan', code: 'UZ' },
    { name: 'Vanuatu', code: 'VU' },
    { name: 'Venezuela', code: 'VE' },
    { name: 'Viet Nam', code: 'VN' },
    { name: 'Virgin Islands, British', code: 'VG' },
    { name: 'Virgin Islands, U.S.', code: 'VI' },
    { name: 'Wallis and Futuna', code: 'WF' },
    { name: 'Western Sahara', code: 'EH' },
    { name: 'Yemen', code: 'YE' },
    { name: 'Zambia', code: 'ZM' },
    { name: 'Zimbabwe', code: 'ZW' },
  ]);
  selectedCountry = { name: 'Ireland', code: 'IE' };
  selectedCountry2 = { name: 'New Zealand', code: 'NZ' };

  @action
  raisedButton() {
    alert('You pressed a raised button.');
  }

  @action
  flatButton() {
    alert('You pressed a flat button.');
  }

  @action
  targetButton() {
    alert('You pressed a target button.');
  }

  // Checkbox
  checkboxValue1 = true;
  checkboxValue2 = false;
  checkboxValue3 = false;
  checkboxValue4 = false;
  checkboxValue5 = false;
  @tracked checkboxValue6 = false;
  @tracked checkboxValue7 = undefined;
  get checkboxIsIndeterminate() {
    return this.checkboxValue7 === undefined;
  }
  @action checkboxToggleCheckValue6() {
    this.checkboxValue6 = !this.checkboxValue6;
  }

  // Chips
  @tracked chipsFruitNames = A(['Apple', 'Banana', 'Orange']);
  @action chipsRemoveItem(item) {
    this.chipsFruitNames.removeObject(item);
  }
  @action chipsAddItem(item) {
    this.chipsFruitNames.pushObject(item);
  }

  @tracked chipsCustomFruitNames = A(['Apple', 'Banana', 'Orange']);
  @action chipsRemoveCustomItem(item) {
    this.chipsCustomFruitNames.removeObject(item);
  }
  @action chipsAddCustomItem(item) {
    this.chipsCustomFruitNames.pushObject(item);
  }

  @tracked chipsVegeNames = A(['Broccoli']);
  @tracked chipsAllVegeNames = A([
    'Broccoli',
    'Cabbage',
    'Carrot',
    'Lettuce',
    'Spinach',
  ]);
  get chipsRemainingVegeNames() {
    return this.chipsAllVegeNames.filter((source) => {
      return !this.chipsVegeNames.any(function (myVegeName) {
        return source === myVegeName;
      });
    });
  }

  @tracked chipsVegetables = A([
    {
      name: 'Broccoli',
      family: 'Brassica',
    },
  ]);
  @action chipsRemoveVegetable(item) {
    this.chipsVegetables.removeObject(item);
  }
  @action chipsAddVegetable(item) {
    this.chipsVegetables.pushObject(item);
  }

  @tracked chipsAllVegetables = A([
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
  ]);
  get chipsRemainingVegetables() {
    return this.chipsAllVegetables.filter((source) => {
      return !this.chipsVegetables.any(function (myVegetable) {
        return source.name === myVegetable.name;
      });
    });
  }
  @action chipsRemoveVegeName(item) {
    this.chipsVegeNames.removeObject(item);
  }
  @action chipsAddVegeName(item) {
    this.chipsVegeNames.pushObject(item);
  }

  // Contact Chips
  contactChipsNumOfContacts = 10;
  get contactChipsContacts() {
    let contacts = [];
    let numOfContacts = this.contactChipsNumOfContacts;

    for (let i = 0; i < numOfContacts; i++) {
      contacts.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        image: faker.image.avatar(),
      });
    }

    return contacts;
  }
  get contactChipsSelectedContacts() {
    return this.contactChipsContacts.filter((c, index) => {
      return index % 2 === 0;
    });
  }
  get contactChipsRemainingContacts() {
    return this.contactChipsContacts.filter((c) => {
      return this.contactChipsSelectedContacts.indexOf(c) === -1;
    });
  }
  @action contactChipsAddContact(item) {
    this.contactChipsSelectedContacts.pushObject(item);
  }
  @action contactChipsRemoveContact(item) {
    this.contactChipsSelectedContacts.removeObject(item);
  }

  // Dialog
  @tracked dialogShowDialog = true;
  @action dialogToggleOpen() {
    this.dialogShowDialog = !this.dialogShowDialog;
  }

  // Grid List
  get gridListTiles() {
    let tiles = buildGridModel({
      title: 'Svg-',
      background: '',
    });

    return A(tiles);
  }

  // List
  listNumOfRows = 3;
  get listData() {
    let contacts = [];
    let numOfRows = this.listNumOfRows;

    for (let i = 0; i < numOfRows; i++) {
      contacts.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        img: faker.image.dataUri(),
      });
    }

    return contacts;
  }
  listPhoneNumbers = Object.freeze([
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
  ]);
  listToppings = Object.freeze([
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
  ]);
  listMessageData = Object.freeze([
    {
      message: 'Message A',
    },
    {
      message: 'Message B',
    },
    {
      message: 'Message C',
    },
  ]);
  @action listTransitionTo(value) {
    alert(`Imagine you transition to "${value}" here.`);
  }
  @action listTransitionToMenu() {
    alert(`Imagine you transition to a menu here.`);
  }
  @action listSecondaryMessageClick() {
    alert('Secondary actions can be used for one click actions.');
  }

  // Menu
  menuOptions = A([1, 2, 3, 4, 5]);
  menuItems = A([
    {
      icon: 'access_alarms',
      title: 'Alarm',
      isFirst: true,
    },
    {
      icon: 'airplay',
      title: 'Airplay',
    },

    {
      icon: 'airplanemode_active',
      title: 'Airplane mode',
    },
  ]);
  @action menuOpenSomething() {
    alert('Some action handler.');
  }

  // Progress
  @tracked progressDeterminateValue = 0;
  @tracked progressDeterminateValue2 = 0;
  @tracked progressTimer = null;
  @tracked progressTimer2 = null;
  @action progressStart() {
    this.progressDeterminateValue = 30;
    this.progressDeterminateValue2 = 30;
    this.progressSetupTimer();
    this.progressSetupTimer2();
  }
  progressSetupTimer() {
    this.progressTimer = later(
      this,
      function () {
        this.progressDeterminateValue += 1;
        this.progressDeterminateValue2 += 1.5;
        if (this.progressDeterminateValue > 100) {
          this.progressDeterminateValue = 30;
          this.progressDeterminateValue2 = 30;
        }

        this.progressSetupTimer();
      },
      100
    );
  }
  progressSetupTimer2() {
    this.progressTimer2 = later(
      this,
      function () {
        this.mode = this.mode === 'query' ? 'determinate' : 'query';
        this.determinateValue = 30;
        this.determinateValue2 = 30;
        later(this, this.progressSetupTimer2);
      },
      7200
    );
  }
  @action progressStop() {
    cancel(this.progressTimer);
    cancel(this.progressTimer2);
  }

  // Select
  @tracked selectSelectedState = this.selectStates.objectAt(4);
  get selectStates() {
    return A(
      'AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY'
        .split(' ')
        .map((state) => ({ abbrev: state }))
    );
  }

  // Sidenav
  @tracked sidenavRightSideBarOpen = true;

  // Slider
  @tracked sliderColor = {
    red: 55,
    green: 111,
    blue: 222,
  };
  @tracked sliderDisabled1 = 22;
  @tracked sliderRating1 = 3;
  @tracked sliderRating2 = 2;
  @tracked sliderRating3 = 4;

  // Speed Dial
  @tracked speedDialOpen = true;
}