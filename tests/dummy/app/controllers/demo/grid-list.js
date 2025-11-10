import Controller from '@ember/controller';
import { later } from '@ember/runloop';
import { buildGridModel, randomColor, randomSpan } from '../../utils/grid-list';
import { isTesting } from '@embroider/macros';
import { tracked } from '@glimmer/tracking';

export default class extends Controller {
  constructor() {
    super(...arguments);

    // start timer, which recalculates the color tiles every 10 seconds
    this.setupTimer();
    this.recalculateColorTiles();
  }

  @tracked
  basicRows = 6;

  @tracked
  colorTiles = [];

  setupTimer() {
    // this will cause test waiters to never complete in tests
    if (!isTesting()) {
      later(
        this,
        () => {
          this.recalculateColorTiles();

          later(this, this.setupTimer);
        },
        10 * 1000
      );
    }
  }

  get tiles() {
    let tiles = buildGridModel({
      title: 'Svg-',
      background: '',
    });

    return tiles;
  }

  recalculateColorTiles() {
    let tiles = [];

    for (let i = 0; i < 46; i++) {
      tiles.push({
        style: randomColor(),
        colspan: randomSpan(),
        rowspan: randomSpan(),
      });
    }

    this.colorTiles = tiles;
  }
}
