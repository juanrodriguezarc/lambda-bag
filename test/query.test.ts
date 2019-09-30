/* eslint-disable no-undef */
import {
  addClass,
  after,
  animate,
  append,
  appendHtml,
  before,
  clone,
  closest,
  contains,
  dataset,
  docFilter,
  empty,
  getAttr,
  getHtml,
  getStyle,
  getText,
  getViewPort,
  hasClass,
  hide,
  last,
  match,
  nextSibling,
  opacity,
  outerHtml,
  prepend,
  prevSibling,
  remove,
  replaceHtml,
  rmAttr,
  rmChild,
  rmClass,
  scrollToElem,
  select,
  selectAll,
  setAttr,
  setHtml,
  setStyles,
  setText,
  show,
  siblings,
  submit,
  toggleAttr,
  toggleClass,
  trigger,
  value
} from "../src/query";

import { Chromeless } from "chromeless";

describe("General DOM functions", () => {
  const chromeless = new Chromeless();
  const mapToFn = (...args) => args.map(fn => ` ${fn}`);

  // Populate browser with functions 
  beforeAll(async () => {
    await chromeless.evaluate(args => {
      eval(`window.query = {}`);
      
      for (var i = 0; i < args.length; i++) {
        const regex = /function\s(.*)\(/g
        const match = regex.exec(args[i])
        if(match)
          eval(`window.query['${match[1]}'] = ${args[i]}`)
      }

      return true;
    }, mapToFn(
      addClass, after, animate, append, appendHtml, before, 
      clone, closest, contains, dataset, docFilter, empty, 
      getAttr, getHtml, getStyle, getText, getViewPort, 
      hasClass, hide, last, match, nextSibling, opacity, 
      outerHtml, prepend, prevSibling, remove, replaceHtml, 
      rmAttr, rmChild, rmClass, scrollToElem, select, selectAll, 
      setAttr, setHtml, setStyles, setText, show, siblings, submit, 
      toggleAttr, toggleClass, trigger, value
    ));
  });

  it("Should toggle the selector class", async () => {
    const result = await chromeless.evaluate(args => {
      const { toggleClass } = window.query
      const body = document.querySelector("body");
      toggleClass("active")(body);
      return body.classList.contains("active");
    }, mapToFn(toggleClass));

    expect(result).toBeTruthy();
  });

  it("Should toggle attribute", async () => {
    const result = await chromeless.evaluate(args => {
      const { toggleAttr } = window.query
      const body = document.querySelector("body");
      toggleAttr('attribute')(body);
      return body.hasAttribute("attribute");
    }, mapToFn(toggleAttr));

    expect(result).toBeTruthy();
  });
});
