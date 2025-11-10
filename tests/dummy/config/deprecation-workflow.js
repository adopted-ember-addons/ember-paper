/* eslint-disable no-undef, prettier/prettier */
self.deprecationWorkflow = self.deprecationWorkflow || {};
self.deprecationWorkflow.config = {
  workflow: [
    { handler: "throw", matchId: "deprecated-run-loop-and-computed-dot-access" },
    { handler: "throw", matchId: "ember-global" },
    { handler: "throw", matchId: "ember-metal.get-with-default" },
    { handler: "throw", matchId: "ember-modifier.no-args-property" },
    { handler: "throw", matchId: "ember-modifier.no-element-property" },
    { handler: "throw", matchId: "ember-modifier.use-destroyables" },
    { handler: "throw", matchId: "ember-modifier.use-modify" },
    { handler: "throw", matchId: "ember-string.loc" },
    { handler: "silence", matchId: "ember-utils.try-invoke" },
    { handler: "silence", matchId: "ensure-safe-component.string" },
    { handler: "silence", matchId: "this-property-fallback" },
  ]
};
