/* eslint-disable ember/no-settled-after-test-helper, prettier/prettier, qunit/no-assert-equal, qunit/require-expect */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, click, findAll, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | paper item', function(hooks) {
  setupRenderingTest(hooks);

  test('single action checkboxes should react to checkbox clicks', async function(assert) {
    assert.expect(1);
    this.set('checkboxEnabled', false);
    await render(hbs`
      <PaperList>
        <PaperItem as |controls|>
          <p>Checkbox 1</p>
          <controls.checkbox @value={{this.checkboxEnabled}} @onChange={{fn (mut this.checkboxEnabled)}} />
        </PaperItem>
      </PaperList>
    `);

    await settled();
    await click('md-checkbox');

    assert.ok(this.checkboxEnabled);

  });

  test('single action checkboxes should not react to item clicks when disabled', async function(assert) {
    assert.expect(1);
    this.set('checkboxEnabled', false);
    await render(hbs`
      <PaperList>
        <PaperItem as |controls|>
          <p>Checkbox 1</p>
          <controls.checkbox @disabled={{true}} @value={{this.checkboxEnabled}} @onChange={{fn (mut this.checkboxEnabled)}} />
        </PaperItem>
      </PaperList>
    `);

    await settled();
    await click('.md-list-item-inner');

    assert.notOk(this.checkboxEnabled);

  });

  test('single action checkboxes should react to item clicks', async function(assert) {
    assert.expect(1);
    this.set('checkboxEnabled', false);
    await render(hbs`
      <PaperList>
        <PaperItem as |controls|>
          <p>Checkbox 1</p>
          <controls.checkbox @value={{this.checkboxEnabled}} @onChange={{fn (mut this.checkboxEnabled)}} />
        </PaperItem>
      </PaperList>
    `);
    await settled();
    await click('.md-list-item-inner');
    assert.ok(this.checkboxEnabled);
  });

  test('single action radios should react to item clicks', async function(assert) {
    assert.expect(2);

    this.set('selectedValue', null);
    await render(hbs`
      <PaperList>
        <PaperItem as |controls|>
          <p>Checkbox 1</p>
          <controls.radio @groupValue={{this.selectedValue}} @value="some value 1" @onChange={{fn (mut this.selectedValue)}} />
        </PaperItem>
        <PaperItem as |controls|>
          <p>Checkbox 2</p>
          <controls.radio @groupValue={{this.selectedValue}} @value="some value 2" @onChange={{fn (mut this.selectedValue)}} />
        </PaperItem>
      </PaperList>
    `);
    await settled();
    let items = findAll('.md-list-item-inner');

    await click(items[0]);

    assert.equal(this.selectedValue, 'some value 1');

    await click(items[1]);

    assert.equal(this.selectedValue, 'some value 2');

  });

  test('Clickable Items with Secondary Controls must not bubble main item action', function(assert) {
    // the switch test is tricky as it involves passing hammer
    // tap event.
    assert.expect(0);
  });

  test('basic paper item action tests', async function(assert) {
    this.set('primaryAction', () => {
      assert.step('primaryAction');
    });

    this.set('secondaryAction', () => {
      assert.step('secondaryAction');
    })

    this.set('mouseEnter', () => {
      assert.step('mouseEnter');
    })

    this.set('mouseLeave', () => {
      assert.step('mouseLeave');
    })

    await render(hbs`
      <PaperItem data-test-button @onClick={{this.primaryAction}} @onMouseEnter={{this.mouseEnter}} @onMouseLeave={{this.mouseLeave}} as |controls|>
          <controls.checkbox @value={{this.checked}} @onChange={{fn (mut this.checked)}} />
          <p>Item with checkbox and secondary action</p>
          <controls.button @secondary={{true}} @iconButton={{true}} @onClick={{this.secondaryAction}}>
            {{paper-icon "message"}}
          </controls.button>
        </PaperItem>
    `);

    await click('button');
    await click('md-icon');
    await triggerEvent('button', 'mouseenter');
    await triggerEvent('button', 'mouseleave');

    assert.verifySteps([
      'primaryAction',
      'secondaryAction',
      // I'm not sure why we have duplicates here - it's ok for now
      'mouseEnter',
      'mouseEnter',
      'mouseLeave',
      'mouseLeave',
    ]);
  })

  test('Item checkbox with secondary action and no primary action is toggled by checkbox click', async function(assert) {
    assert.expect(2);
    this.set('secondaryValue', false);
    this.set('checked', false);

    await render(hbs`
      <PaperList>
        <PaperItem as |controls|>
          <controls.checkbox @value={{this.checked}} @onChange={{fn (mut this.checked)}} />
          <p>Item with checkbox and secondary action</p>
          <controls.button @iconButton={{true}} @onClick={{fn (mut this.secondaryValue)}}>
            {{paper-icon "message"}}
          </controls.button>
        </PaperItem>
      </PaperList>
    `);

    await settled();

    await click('md-checkbox');
    assert.ok(this.checked);
    assert.notOk(this.secondaryValue);
  });

  test('Item checkbox with secondary action and no primary action is toggled by primary click', async function(assert) {
    assert.expect(2);
    this.set('secondaryValue', false);
    this.set('checked', false);

    await render(hbs`
      <PaperList>
        <PaperItem as |controls|>
          <controls.checkbox @value={{this.checked}} @onChange={{fn (mut this.checked)}} />
          <p>Item with checkbox and secondary action</p>
          <controls.button @iconButton={{true}} @onClick={{fn (mut this.secondaryValue)}}>
            {{paper-icon "message"}}
          </controls.button>
        </PaperItem>
      </PaperList>
    `);
    await settled();

    await click('.md-list-item-inner');
    assert.ok(this.checked);
    assert.notOk(this.secondaryValue);

  });

  test('Item checkbox with secondary action and primary action dont bubble secondary event', async function(assert) {
    assert.expect(3);
    this.set('secondaryValue', false);
    this.set('checked', false);
    this.set('primaryValue', false);
    this.set('primaryAction', () => {
      this.set('primaryValue', !this.primaryValue);
    });

    await render(hbs`
      <PaperList>
        <PaperItem @onClick={{this.primaryAction}} as |controls|>
          <controls.checkbox @value={{this.checked}} @onChange={{fn (mut this.checked)}} />
          <p>Item with checkbox and secondary action</p>
          <controls.button @secondary={{true}} @iconButton={{true}} @onClick={{fn (mut this.secondaryValue)}}>
            {{paper-icon "message"}}
          </controls.button>
        </PaperItem>
      </PaperList>
    `);
    await settled();

    await click('button.md-secondary');
    assert.ok(this.secondaryValue);
    assert.notOk(this.primaryValue);
    assert.notOk(this.checked);
  });

  test('Item checkbox with secondary action and primary action dont bubble primary action on checkbox click when checkbox action exists', async function(assert) {
    assert.expect(6);
    this.set('secondaryValue', false);
    this.set('checked', false);
    this.set('primaryValue', false);
    this.set('primaryAction', () => {
      this.set('primaryValue', !this.primaryValue);
    });

    await render(hbs`
      <PaperList>
        <PaperItem @onClick={{this.primaryAction}} as |controls|>
          <controls.checkbox @value={{this.checked}} @onChange={{fn (mut this.checked)}} />
          <p>Item with checkbox and secondary action</p>
          <controls.button @iconButton={{true}} @onClick={{fn (mut this.secondaryValue)}}>
            {{paper-icon "message"}}
          </controls.button>
        </PaperItem>
      </PaperList>
    `);

    await settled();

    await click('md-checkbox');

    assert.ok(this.checked);
    assert.notOk(this.primaryValue);
    assert.notOk(this.secondaryValue);

    await click('button');

    assert.ok(this.checked);
    assert.ok(this.primaryValue);
    assert.notOk(this.secondaryValue);

  });
});
