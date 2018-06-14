import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | paper button', function(hooks) {
  setupRenderingTest(hooks);

  test('renders block label', async function(assert) {
    await render(hbs`
      {{#paper-button}}
        Block label
      {{/paper-button}}
    `);
    assert.equal(find('button').textContent.trim(), 'Block label');
  });

  test('renders inline label', async function(assert) {
    await render(hbs`
      {{paper-button label='Inline label'}}
    `);
    assert.equal(find('button').textContent.trim(), 'Inline label');
  });

  test('renders type button by default', async function(assert) {
    await render(hbs`
      {{paper-button label='Inline label'}}
    `);
    assert.equal(find('button').getAttribute('type'), 'button');
  });

  test('triggers onClick function when attribute is present', async function(assert) {
    assert.expect(1);

    this.set('foo', () => {
      assert.ok(true);
    });
    await render(hbs`
      {{#paper-button onClick=foo}}
        A label
      {{/paper-button}}
    `);
    await click('.md-button');
  });

  test('does nothing onClick if attribute is not present', async function(assert) {
    assert.expect(0);

    await render(hbs`
      {{#paper-button}}
        A label
      {{/paper-button}}
    `);
    await click('.md-button');
  });

  test('uses md-raised class when raised=true', async function(assert) {
    await render(hbs`
      {{#paper-button raised=true}}
        A label
      {{/paper-button}}
    `);
    assert.ok(find('.md-button').classList.contains('md-raised'));
  });

  test('uses md-icon-button class when iconButton=true', async function(assert) {
    await render(hbs`
      {{#paper-button iconButton=true}}
        A label
      {{/paper-button}}
    `);
    assert.ok(find('.md-button').classList.contains('md-icon-button'));
  });

  test('uses md-fab class when fab=true', async function(assert) {
    await render(hbs`
      {{#paper-button fab=true}}
        A label
      {{/paper-button}}
    `);
    assert.ok(find('.md-button').classList.contains('md-fab'));
  });

  test('uses md-mini and md-fab class when mini=true', async function(assert) {
    await render(hbs`
      {{#paper-button mini=true}}
        A label
      {{/paper-button}}
    `);
    assert.ok(this.$('.md-button').is('.md-fab', '.md-mini'));
  });

  test('uses a tag when href is specified', async function(assert) {
    await render(hbs`
      {{#paper-button href="http://example.com"}}
        A label
      {{/paper-button}}
    `);
    assert.ok(this.$('.md-button').is('a'));
    assert.ok(find('.md-button').getAttribute('href') === 'http://example.com');
  });

  test('renders target', async function(assert) {
    await render(hbs`
      {{#paper-button href="http://example.com" target="_blank"}}
        A label
      {{/paper-button}}
    `);
    assert.ok(this.$('.md-button').is('a'));
    assert.ok(find('.md-button').getAttribute('target') === '_blank');
  });
});
