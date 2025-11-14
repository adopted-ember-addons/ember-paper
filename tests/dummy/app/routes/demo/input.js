import Route from '@ember/routing/route';
import { tracked } from 'tracked-built-ins';

export default class extends Route {
  model() {
    return tracked({});
  }
}
