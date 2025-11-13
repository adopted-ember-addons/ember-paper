import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';

const LOREM = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Nulla venenatis ante augue. Phasellus volutpat neque ac dui mattis
  vulputate. Etiam consequat aliquam cursus. In sodales pretium ultrices.
  Maecenas lectus est, sollicitudin consectetur felis nec, feugiat ultricies mi.\n
`;

let tabs = A();
for (let i = 1; i < 5; i++) {
  tabs.push({
    index: i,
    title: `Chapter ${i}`,
    body: LOREM.repeat(i),
  });
}

export default class extends Controller {
  @service router;

  @tracked borderBottom = true;
  @tracked selectedBasicTab = 0;
  @tracked showBasicUsageSourceCode = false;
  @tracked showDynamicUsageSourceCode = false;
  @tracked showRoutableUsageSourceCode = false;
  @tracked selectedChapter = tabs[0];
  @tracked newTitle = '';
  @tracked newContent = '';
  @tracked chapters = tabs;

  toggle = (propName) => {
    this[propName] = !this[propName];
  };

  addChapter = () => {
    let index = Math.max(...this.chapters.mapBy('index')) + 1;
    let chapter = {
      index,
      title: this.newTitle,
      body: this.newContent,
    };
    this.chapters = [...this.chapters, chapter];
    this.selectedChapter = chapter;

    this.newTitle = '';
    this.newContent = '';
  };

  removeChapter = (t) => {
    if (this.selectedChapter === t) {
      let index = this.chapters.indexOf(t);
      let newSelection = this.chapters[index + 1] || this.chapters[index - 1];
      this.selectedChapter = newSelection;
    }
    this.chapters = this.chapters.filter((item) => item !== t);
  };

  noop() {}
}
