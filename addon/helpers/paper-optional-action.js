import { helper } from '@ember/component/helper';

function noop() {
  // this is a noop because we always need to return a function
}

export default helper(function paperOptionalAction(positional /*, named*/) {
  return positional[0] || noop;
});
