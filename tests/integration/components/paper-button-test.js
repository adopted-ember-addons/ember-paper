/* eslint-disable prettier/prettier, qunit/require-expect */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | paper-button', function(hooks) {
  setupRenderingTest(hooks);

  test('renders block label', async function(assert) {
    await render(hbs`
      <PaperButton>
        Block label
      </PaperButton>
    `);
    assert.dom('button').hasText('Block label');
  });

  test('renders inline label', async function(assert) {
    await render(hbs`
      <PaperButton @label="Inline label" />
    `);
    assert.dom('button').hasText('Inline label');
  });

  test('renders type button by default', async function(assert) {
    await render(hbs`
      <PaperButton @label="Inline label" />
    `);

    assert.dom('button').hasAttribute('type', 'button');
  });

  test('triggers onClick function when attribute is present', async function(assert) {
    assert.expect(1);

    this.set('foo', () => {
      assert.ok(true);
    });
    await render(hbs`
      <PaperButton @onClick={{this.foo}}>
        A label
      </PaperButton>
    `);

    await click('.md-button');

  });

  test('does nothing onClick if attribute is not present', async function(assert) {
    assert.expect(0);

    await render(hbs`
      <PaperButton>
        A label
      </PaperButton>
    `);
    await click('.md-button');
  });

  test('uses md-raised class when raised=true', async function(assert) {
    await render(hbs`
      <PaperButton @raised={{true}}>
        A label
      </PaperButton>
    `);

    assert.dom('.md-button').hasClass('md-raised');
  });

  test('uses md-icon-button class when iconButton=true', async function(assert) {
    await render(hbs`
      <PaperButton @iconButton={{true}}>
        A label
      </PaperButton>
    `);

    assert.dom('.md-button').hasClass('md-icon-button');
  });

  test('uses md-fab class when fab=true', async function(assert) {
    await render(hbs`
      <PaperButton @fab={{true}}>
        A label
      </PaperButton>
    `);

    assert.dom('.md-button').hasClass('md-fab');
  });

  test('uses md-mini and md-fab class when mini=true', async function(assert) {
    assert.expect(2);
    await render(hbs`
      <PaperButton @mini={{true}}>
        A label
      </PaperButton>
    `);

    assert.dom('.md-button').hasClass('md-fab');
    assert.dom('.md-button').hasClass('md-mini');

  });

  test('uses a tag when href is specified', async function(assert) {
    await render(hbs`
      <PaperButton @href="http://example.com">
        A label
      </PaperButton>
    `);

    assert.dom('a.md-button').exists({ count: 1 });
    assert.dom('a.md-button').hasAttribute('href', 'http://example.com');
  });

  test('renders target', async function(assert) {
    await render(hbs`
      <PaperButton @href="http://example.com" @target="_blank">
        A label
      </PaperButton>
    `);

    assert.dom('a.md-button').exists({ count: 1 });
    assert.dom('a.md-button').hasAttribute('target', '_blank');
  });
});
