import Ember from 'ember';
import ColorMixin from 'ember-paper/mixins/color-mixin';

var PaperIconComponent = Ember.Component.extend(ColorMixin, {
  tagName: 'md-icon',
  classNames: ['paper-icon', 'md-font', 'material-icons', 'md-default-theme'],
  classNameBindings: ['iconClass', 'sizeClass', 'spinClass'],

  spin: false,
  reverseSpin: false,

  iconClass: Ember.computed('icon', 'positionalIcon', function() {
    let oldIcon = this.get('icon');

    Ember.deprecate(
        'ember-paper: The `{{paper-icon icon="someIcon"}}` format is deprecated. Please use `{{paper-icon "someIcon"}}`.',
        oldIcon === undefined,
        {
          id: 'ember-paper.paper-icon.non-positional-param',
          until: '1.0.0',
          url: 'https://github.com/miguelcobain/ember-paper/pull/288'
        }
      );

    let icon = this.getWithDefault('positionalIcon', oldIcon);

    return Ember.String.dasherize(icon);
  }),

  spinClass: Ember.computed('spin', 'reverseSpin', function() {
    if (this.get('spin')) {
      return 'md-spin';
    } else if (this.get('reverseSpin')) {
      return 'md-spin-reverse';
    }
  }),

  sizeClass : Ember.computed('size', function() {
    switch(this.get('size')) {
      case 'lg':
        return 'md-lg';
      case 'sm':
        return 'md-sm';
      case 2:
        return 'md-2x';
      case 3:
        return 'md-3x';
      case 4:
        return 'md-4x';
      case 5:
        return 'md-5x';
    }
  })
});

PaperIconComponent.reopenClass({
  positionalParams: ['positionalIcon']
});

export default PaperIconComponent;

