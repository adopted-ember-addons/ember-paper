import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class extends Controller {
  validationApi = [
    [
      'message',
      'string',
      'The text you want to display to the user when there is an error.',
    ],
    [
      'validate',
      'function',
      "A validator that returns a falsy value when the validation message should be displayed. The function receives one argument: the input's value.",
    ],
  ];

  get usernameValidator() {
    if (!this.model?.username?.length) {
      return [`This field can't be blank`];
    }

    return [];
  }

  get passwordValidator() {
    if (!this.model?.password?.length) {
      return [`This field can't be blank`];
    }

    if (this.model?.password?.length < 4) {
      return [`This field is too short (minimum is 4 characters)`];
    }

    // FYI never do this, this is bad validation and just for demonstration
    // purposes ;)
    if (this.model?.password?.length > 8) {
      return [`This field is too long (maximum is 8 characters)`];
    }

    return [];
  }

  get emailValidator() {
    if (!this.model?.email?.length) {
      return [`This field can't be blank`];
    }

    if (!this.model?.email?.match(/.+@.+\..+/)) {
      return [`This field must be a valid email address`];
    }

    return [];
  }

  // https://github.com/ember-cli/eslint-plugin-ember/issues/782
  get emailConfirmationValidator() {
    if (!this.model?.emailConfirmation?.length) {
      return [`This field can't be blank`];
    }

    if (this.model?.email !== this.model?.emailConfirmation) {
      return [`Emails do not match`];
    }

    return [];
  }

  // BEGIN-SNIPPET input.controller.multiple-constraints
  multipleConstraints = [
    {
      message: 'Value is not even',
      validate: (inputValue) => +inputValue % 2 === 0,
    },
    {
      message: 'Value does not equal 4',
      validate: (inputValue) => +inputValue === 4,
    },
  ];
  // END-SNIPPET

  // BEGIN-SNIPPET input.controller.single-constraint
  singleContraint = [
    {
      message: 'Value does not equal 16',
      validate: (inputValue) => +inputValue === 16,
    },
  ];
  // END-SNIPPET

  // BEGIN-SNIPPET input.controller.email-validation
  emailValidation = [
    {
      message: 'Please provide email in a valid format',
      validate: (inputValue) => {
        let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(inputValue);
      },
    },
  ];
  // END-SNIPPET

  user = {};

  @tracked eventName = '';

  focusReceived = () => {
    this.eventName = 'focus';
  };

  blurReceived = () => {
    this.eventName = 'blur';
  };

  keyDownReceived = () => {
    this.eventName = 'keyDown';
  };

  enterReceived = () => {
    this.eventName = 'enter';
  };
}
