function shallowCopy(obj) {
  const target = {};
  return Object.assign(target, obj);
}

function mergeObjects(objects) {
  const result = {};
  objects.forEach((obj) => {
    Object.entries(obj).forEach(([key, value]) => {
      result[key] = (result[key] || 0) + value;
    });
  });
  return result;
}

function removeProperties(obj, keys) {
  const copy = obj;
  keys.forEach((key) => {
    delete copy[key];
  });
  return copy;
}

function compareObjects(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  return keys1.every((key) => obj1[key] === obj2[key]);
}

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

function makeImmutable(obj) {
  return Object.freeze(obj);
}

function makeWord(lettersObject) {
  const result = [];
  Object.entries(lettersObject).forEach(([letter, positions]) => {
    positions.forEach((pos) => {
      result[pos] = letter;
    });
  });
  return result.join('');
}

function sellTickets(queue) {
  let bill25 = 0;
  let bill50 = 0;

  for (let i = 0; i < queue.length; i += 1) {
    const bill = queue[i];
    if (bill === 25) {
      bill25 += 1;
    } else if (bill === 50) {
      if (bill25 === 0) return false;
      bill25 -= 1;
      bill50 += 1;
    } else if (bill === 100) {
      if (bill50 > 0 && bill25 > 0) {
        bill50 -= 1;
        bill25 -= 1;
      } else if (bill25 >= 3) {
        bill25 -= 3;
      } else {
        return false;
      }
    }
  }

  return true;
}

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.getArea = function getArea() {
    return this.width * this.height;
  };
}

function getJSON(obj) {
  return JSON.stringify(obj);
}

function fromJSON(proto, json) {
  return Object.setPrototypeOf(JSON.parse(json), proto);
}

function sortCitiesArray(arr) {
  return arr.sort(
    (a, b) => a.country.localeCompare(b.country) || a.city.localeCompare(b.city)
  );
}

function group(array, keySelector, valueSelector) {
  return array.reduce((map, item) => {
    const key = keySelector(item);
    const value = valueSelector(item);
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(value);
    return map;
  }, new Map());
}

class CssSelector {
  constructor() {
    this.selector = '';
    this.order = 0;
    this.hasElement = false;
    this.hasId = false;
    this.hasPseudoElement = false;
  }

  checkOrder(order) {
    if (this.order > order) {
      throw new Error(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
      );
    }
    this.order = order;
  }

  element(value) {
    if (this.hasElement) {
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector'
      );
    }
    this.checkOrder(1);
    this.hasElement = true;
    this.selector += value;
    return this;
  }

  id(value) {
    if (this.hasId) {
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector'
      );
    }
    this.checkOrder(2);
    this.hasId = true;
    this.selector += `#${value}`;
    return this;
  }

  class(value) {
    this.checkOrder(3);
    this.selector += `.${value}`;
    return this;
  }

  attr(value) {
    this.checkOrder(4);
    this.selector += `[${value}]`;
    return this;
  }

  pseudoClass(value) {
    this.checkOrder(5);
    this.selector += `:${value}`;
    return this;
  }

  pseudoElement(value) {
    if (this.hasPseudoElement) {
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector'
      );
    }
    this.checkOrder(6);
    this.hasPseudoElement = true;
    this.selector += `::${value}`;
    return this;
  }

  combine(selector1, combinator, selector2) {
    this.selector = `${selector1.stringify()} ${combinator} ${selector2.stringify()}`;
    return this;
  }

  stringify() {
    return this.selector;
  }
}

const cssSelectorBuilder = {
  element(value) {
    return new CssSelector().element(value);
  },

  id(value) {
    return new CssSelector().id(value);
  },

  class(value) {
    return new CssSelector().class(value);
  },

  attr(value) {
    return new CssSelector().attr(value);
  },

  pseudoClass(value) {
    return new CssSelector().pseudoClass(value);
  },

  pseudoElement(value) {
    return new CssSelector().pseudoElement(value);
  },

  combine(selector1, combinator, selector2) {
    return new CssSelector().combine(selector1, combinator, selector2);
  },
};

module.exports = {
  shallowCopy,
  mergeObjects,
  removeProperties,
  compareObjects,
  isEmptyObject,
  makeImmutable,
  makeWord,
  sellTickets,
  Rectangle,
  getJSON,
  fromJSON,
  group,
  sortCitiesArray,
  cssSelectorBuilder,
};
