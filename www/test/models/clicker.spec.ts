'use strict';

import { Clicker } from '../../app/models/clicker';

describe('Clicker', () => {
  it('is called testClicker', () => {
    let clicker = new Clicker('12434', 'testClicker');
    expect(clicker.name).toEqual('testClicker');
  });
});
