/* eslint-disable prettier/prettier, qunit/no-assert-equal, qunit/no-assert-equal-boolean, qunit/no-commented-tests, qunit/require-expect */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, triggerKeyEvent, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | paper checkbox', function(hooks) {
  setupRenderingTest(hooks);

  test('should set and remove checked css class', async function(assert) {
    assert.expect(2);

    this.set('value', true);
    await render(hbs`<PaperCheckbox @value={{this.value}} @label="Blue" @onChange={{fn (mut this.value)}} />`);

    assert.dom('md-checkbox').hasClass('md-checked');

    this.set('value', false);
    assert.dom('md-checkbox').doesNotHaveClass('md-checked');

  });

  test('should trigger an action when unchecking', async function(assert) {
    assert.expect(1);

    this.set('value', true);
    this.set('handleChange', (value) => {
      assert.equal(value, false);
    });

    await render(hbs`<PaperCheckbox @value={{this.value}} @onChange={{this.handleChange}} />`);

    await click('md-checkbox');
  });

  test('should trigger an action when checking', async function(assert) {
    assert.expect(1);

    this.set('value', false);
    this.set('handleChange', (value) => {
      assert.equal(value, true);
    });

    await render(hbs`<PaperCheckbox @value={{this.value}} @onChange={{this.handleChange}} />`);

    await click('md-checkbox');

  });

  test('shouldn\'t trigger an action when disabled', async function(assert) {
    assert.expect(0);

    this.set('value', false);
    this.set('handleChange', (value) => {
      assert.equal(value, true);
    });

    await render(hbs`<PaperCheckbox @disabled={{true}} @value={{this.value}} @onChange={{this.handleChange}} />`);

    await click('md-checkbox');
  });

  // space and enter key codes
  [32, 13].forEach((keyCode) => {
    test(`should be possible to check with key code ${keyCode}`, async function(assert) {
      assert.expect(2);

      this.set('value', false);
      await render(hbs`<PaperCheckbox @value={{this.value}} @onChange={{fn (mut this.value)}} />`);
      assert.equal(this.value, false);

      await triggerKeyEvent('md-checkbox', 'keypress', keyCode);

      assert.equal(this.value, true);
    });

    test(`should be possible to uncheck with key code ${keyCode}`, async function(assert) {
      assert.expect(2);

      this.set('value', true);
      await render(hbs`<PaperCheckbox @value={{this.value}} @onChange={{fn (mut this.value)}} />`);
      assert.equal(this.value, true);

      await triggerKeyEvent('md-checkbox', 'keypress', keyCode);

      assert.equal(this.value, false);
    });
  });

  test('blockless version should set label inside', async function(assert) {
    assert.expect(1);

    await render(hbs`<PaperCheckbox @value={{this.value}} @onChange={{fn (mut this.value)}} @label="çup?" />`);

    assert.dom('.md-label > span').hasText('çup?');
  });

  test('block version should set label inside', async function(assert) {
    assert.expect(1);

    await render(hbs`
      <PaperCheckbox @value={{this.value}} @onChange={{fn (mut this.value)}}>
        çup?
      </PaperCheckbox>
    `);

    assert.dom('.md-label > span').hasText('çup?');
  });

  /* test('the `onChange` action is mandatory', function(assert) {
    assert.expect(1);

    assert.throws(() => {
      this.render(hbs`<PaperCheckbox @value={{true}} />`);
    }, /requires an `onChange` action/);
  });*/

  test('if `indeterminate` is true, set md-indeterminate class', async function(assert) {
    assert.expect(3);

    this.set('value', true);
    await render(hbs`
      <PaperCheckbox @value={{this.value}} @indeterminate={{this.indeterminate}} @label="Blue" @onChange={{fn (mut this.value)}} />
    `);

    assert.dom('md-checkbox').hasClass('md-checked');

    this.set('indeterminate', true);
    assert.dom('md-checkbox').doesNotHaveClass('md-checked');
    assert.dom('md-checkbox').hasClass('md-indeterminate');
  });

  test('it correctly sets aria-checked attribute', async function(assert) {
    assert.expect(3);

    this.set('value', false);
    this.set('indeterminate', false);

    await render(hbs`<PaperCheckbox @onChange={{null}} @value={{this.value}} @indeterminate={{this.indeterminate}} />`);
    assert.dom('md-checkbox').hasAttribute('aria-checked', 'false');

    this.set('value', true);
    assert.dom('md-checkbox').hasAttribute('aria-checked', 'true');

    this.set('indeterminate', true);
    assert.dom('md-checkbox').hasAttribute('aria-checked', 'mixed');
  });

  test('it sets correct aria-labelledby for label passed as property', async function(assert) {
    await render(hbs`<PaperCheckbox @onChange={{null}} @value={{true}} @label="important label" />`);

    let labelId = find('md-checkbox').getAttribute('aria-labelledby');

    assert.dom(`#${labelId}`).hasText('important label');
  });

  test('it sets correct aria-labelledby for yielded label', async function(assert) {
    await render(hbs`
      <PaperCheckbox @onChange={{null}} @value={{true}}>
        yielded label
      </PaperCheckbox>
    `);

    let labelId = find('md-checkbox').getAttribute('aria-labelledby');

    assert.dom(`#${labelId}`).hasText('yielded label');
  });

  test('it has correct role', async function(assert) {
    await render(hbs`<PaperCheckbox @onChange={{null}} @value={{true}} />`);

    assert.dom('md-checkbox').hasAttribute('role');
  });

  test('it sets aria-label when ariaLabel is passed', async function(assert) {
    await render(hbs`<PaperCheckbox @onChange={{null}} @value={{true}} @ariaLabel="checkbox aria label" />`);

    assert.dom('md-checkbox').hasAttribute('aria-label', 'checkbox aria label');
  });
});
