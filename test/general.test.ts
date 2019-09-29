/* eslint-disable no-undef */
import {
  addListener,
  breakpoints,
  cleanQueryParams,
  count,
  getQueryParams,
  getQueryValue,
  getSize,
  goTo,
  isDevice,
  isDocReady,
  now,
  removeListener,
  rmQueryParam,
  serialize,
  setQueryParam,
  toHTML,
  type,
} from '../src/general';


describe('General browser functions', () => {

  it('Should return the a valid datetime', async () => {
    const result = now()
    expect(new Date(result)).toBeTruthy();
  });

  it('Should handle the query string params', async () => { })


})



