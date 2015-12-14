import { Clicker } from '../models/clicker';
import { Click } from '../models/click';
import { Injectable } from 'angular2/angular2';
import { Storage, SqlStorage } from 'ionic/ionic';
import { _ } from 'underscore/underscore';

@Injectable()
export class Clickers {

  clickers: Array<Clicker>;
  ids: Array<String>; // we need to keep a separate reference to ids so we can lookup when the app loads from scratch
  storage: Storage;

  constructor() {
    this.storage = new Storage(SqlStorage);
    this.clickers = [];
    this.ids = [];
    this.initClickers();
  }

  initClickers() {
    // get all existing ids
    this.storage.get('ids')
      .then((ids) => {
        // ids are stored as stringified JSON array
        this.ids = JSON.parse(ids) || [];
        _.each(this.ids, (id) => {
          // get all existing clickers by id
          this.storage.get(id)
            .then((clicker) => {
              this.clickers.push(this.initClicker(clicker));
            });
        }, this);
      });
  }

  // initialise a clicker from a raw JSON string out of the DB
  initClicker(clicker) {
    const parsedClicker = JSON.parse(clicker);
    const newClicker = new Clicker(parsedClicker.id, parsedClicker.name);

    // add the clicks - need to re-instantiate object
    _.each(parsedClicker.clicks, (click) => {
      const newClick = new Click();
      newClick.time = click.time;
      newClick.location = click.location;
      newClicker.clicks.push(click);
    });

    return newClicker;
  }

  getClicker(id) {
    return _.find(this.clickers, (clicker) => {
      return clicker.id === id;
    });
  }

  newClicker(name) {
    const id = this.uid();
    const clicker = new Clicker(id, name);

    // add the clicker to the service
    this.clickers.push(clicker);
    // add the id to the service (need to keep a separate reference of IDs so we can cold load clickers)
    this.ids.push(id);
    // save the clicker by id
    this.storage.set(id, JSON.stringify(clicker));
    // save the service's ids array
    this.storage.set('ids', JSON.stringify(this.ids));
  }

  removeClicker(id) {
    // remove clicker from the service
    this.clickers = _.reject(this.clickers, (clicker) => {
      return clicker.id === id;
    });
    // remove from ids array
    this.ids = _.without(this.ids, id);
    // null id in db
    this.storage.set(id, null);
    // update service's ids array
    this.storage.set('ids', JSON.stringify(this.ids));
  }

  doClick(id) {
    const clicker = this.getClicker(id);
    clicker.doClick();
    // save the clicker with updated click in storage
    this.storage.set(clicker.id, JSON.stringify(clicker));
  }

  uid() {
    return Math.random().toString(35).substr(2, 10);
  }
}
