import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-dialog-inner', 'Integration | Component | paper dialog inner', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{paper-dialog-inner}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#paper-dialog-inner}}
      template block text
    {{/paper-dialog-inner}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
