/* eslint-disable ember/no-classic-components, ember/require-tagless-components, prettier/prettier */
/**
 * @module ember-paper
 */
import Component from '@ember/component';

import layout from '../templates/components/paper-card-title-text';

/**
 * @class PaperCardTitleText
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  tagName: 'md-card-title-text'
});
