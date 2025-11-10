/* eslint-disable no-undef */
self.deprecationWorkflow = self.deprecationWorkflow || {};
self.deprecationWorkflow.config = {
  workflow: [
    {
      handler: 'throw',
      matchId: 'deprecated-run-loop-and-computed-dot-access',
    },
    { handler: 'throw', matchId: 'ember-global' },
    { handler: 'throw', matchId: 'ember-metal.get-with-default' },
    { handler: 'throw', matchId: 'ember-modifier.no-args-property' },
    { handler: 'throw', matchId: 'ember-modifier.no-element-property' },
    { handler: 'throw', matchId: 'ember-modifier.use-destroyables' },
    { handler: 'throw', matchId: 'ember-modifier.use-modify' },
    { handler: 'throw', matchId: 'ember-string.loc' },
    { handler: 'throw', matchId: 'ember-utils.try-invoke' },
    { handler: 'throw', matchId: 'ensure-safe-component.string' },
    { handler: 'throw', matchId: 'this-property-fallback' },
    { handler: 'throw', matchId: 'computed-property.override' },
    { handler: 'silence', matchId: 'ember-string.add-package' },
    { handler: 'silence', matchId: 'remove-owner-inject' },
  ],
};
