/* eslint-disable prettier/prettier, qunit/no-assert-equal */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, waitUntil, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { clickTrigger, selectChoose } from 'ember-power-select/test-support/helpers';

module('Integration | Component | paper-select', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('sizes', ['small (12-inch)', 'medium (14-inch)', 'large (16-inch)', 'insane (42-inch)']);
  });

  test('opens on click', async function(assert) {
    await render(hbs`<PaperSelect @disabled={{this.disableSelect}} @placeholder="Size" @options={{this.sizes}} @selected={{this.selectedSize}} @onChange={{fn (mut this.selectedSize)}} as |size|>
      {{size}}
    </PaperSelect>`);

    await clickTrigger('md-input-container');

    assert.dom('md-select-menu').exists();
  });

  test('backdrop removed if select closed', async function(assert) {
    await render(hbs`<PaperSelect @disabled={{this.disableSelect}} @placeholder="Size" @options={{this.sizes}} @selected={{this.selectedSize}} @onChange={{fn (mut this.selectedSize)}} as |size|>
      {{size}}
    </PaperSelect>`);

    assert.dom('md-backdrop').doesNotExist();

    await clickTrigger('md-input-container');

    assert.dom('md-backdrop').exists();

    await clickTrigger('md-input-container');

    await waitUntil(() => !find('md-backdrop'), { timeout: 2000 });

    assert.dom('md-backdrop').doesNotExist();
  });

  test('it can select an option', async function(assert) {
    await render(hbs`<PaperSelect @disabled={{this.disableSelect}} @placeholder="Size" @options={{this.sizes}} @selected={{this.selectedSize}} @onChange={{fn (mut this.selectedSize)}} as |size|>
      {{size}}
    </PaperSelect>`);

    await clickTrigger('md-input-container');

    await selectChoose('md-input-container', 'large (16-inch)');

    assert.equal(this.selectedSize, 'large (16-inch)');
  });

  test('header is rendered above content', async function(assert) {
    await render(hbs`<PaperSelect @disabled={{this.disableSelect}} @placeholder="Size" @options={{this.sizes}} @searchEnabled={{true}} @selected={{this.selectedSize}} @onChange={{fn (mut this.selectedSize)}} as |size|>
      {{size}}
    </PaperSelect>`);

    await clickTrigger('md-input-container');

    assert.dom('md-select-menu > md-select-header').exists();
    assert.dom('md-select-menu > md-content').exists();
  });

  test('it can search a value', async function(assert) {
    await render(hbs`<PaperSelect @disabled={{this.disableSelect}} @placeholder="Size" @options={{this.sizes}} @searchEnabled={{true}} @selected={{this.selectedSize}} @onChange={{fn (mut this.selectedSize)}} as |size|>
      {{size}}
    </PaperSelect>`);

    await clickTrigger('md-input-container');

    assert.dom('md-select-menu md-option').exists({ count: 4 });

    await fillIn('md-select-header input', 'small');

    assert.dom('md-select-menu md-option').exists({ count: 1 });

    assert.dom('md-select-menu md-option').hasText('small (12-inch)');
  });

  test('it shows search message before entering search string', async function(assert) {
    this.search = (value) => this.sizes.filter((size) => size.includes(value));

    await render(hbs`<PaperSelect @search={{this.search}} @searchEnabled={{true}} @selected={{this.selectedSize}} @onChange={{fn (mut this.selectedSize)}} as |size|>
      {{size}}
    </PaperSelect>`);

    await clickTrigger('md-input-container');
    assert.dom('md-select-menu > md-content').exists();
    assert.dom('md-select-menu > md-content').hasText('Type to search');
  });
});
