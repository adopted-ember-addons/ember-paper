import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('paper-switch', 'PaperToggleComponent', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
});

test('it renders', function(assert) {
  assert.expect(2);

  // creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // appends the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('should set checked css class', function(assert) {
  var component = this.subject();
  this.render();

  Ember.run(function() {
    component.set('checked', true);
  });

  assert.ok(this.$().hasClass('md-checked'));
});
