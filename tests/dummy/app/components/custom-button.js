// BEGIN-SNIPPET buttons.component
// app/components/custom-button.js
import Component from '@glimmer/component';

export default class extends Component {
  targetButton() {
    alert('You pressed a target button. -from component');
  }
}
// END-SNIPPET
