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
  type
} from "../src/general";

import { Chromeless } from "chromeless";

describe("General browser functions", () => {

  const chromeless = new Chromeless();
  const mapToFn = (...args) => args.map(fn => ` ${fn}`);

  beforeAll(async () => {
    await chromeless.evaluate(args => {
      eval(`window.general = {}`);

      for (var i = 0; i < args.length; i++) {
        const regex = /function\s(.*)\(/g;
        const match = regex.exec(args[i]);

        if(match)
          eval(`window.general['${match[1]}'] = ${args[i]}`);
      }

      return true;
    }, mapToFn(
      addListener, breakpoints, cleanQueryParams, count, 
      getQueryParams, getQueryValue, getSize, goTo, isDevice, 
      isDocReady, now, removeListener, rmQueryParam, 
      serialize, setQueryParam, toHTML, type
    ));
  });

  afterAll(async () => {
    await chromeless.end();
    return true
  });


  // In progress
  it("Should return the string lenght", async () => {
    expect(true).toEqual(true);
  });

});
