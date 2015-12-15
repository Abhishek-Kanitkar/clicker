import { Component, View } from 'angular2/angular2';
import { Clickers } from '../../services/clickers';
import { Clicker } from '../../models/clicker';

@Component({
  selector: 'clicker-button',
  inputs: ['clicker: clicker'],
})

@View({
  templateUrl: 'app/components/clickerButton/clickerButton.html',
})

export class ClickerButton {

  clicker: Clicker;
  clickerService: Clickers;

  constructor(clickers: Clickers) {
    this.clickerService = clickers;
  }
}
