function Obsever(data) {
  Object.keys(data).forEach(key => defineReactive(data, key, data[key]));
}

function observe(data) {
  if (typeof data !== 'object' || data === null) {
    return;
  }
  return new Obsever(data);
}

function defineReactive(obj, key, val) {
  observe(val);
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    configurable: false,
    enumerable: true,
    get() {
      Dep.target && dep.add(Dep.target);
      return val;
    },
    set(newValue) {
      if (newValue !== val) {
        val = newValue;
        dep.notify(newValue);
      }
    },
  });
}

function Dep() {
  this.subs = [];
}

Dep.target = null;

Dep.prototype = {
  constructor: Dep,
  add(sub) {
    this.subs.push(sub);
  },
  notify(value) {
    this.subs.forEach(sub => sub.update(value));
  },
};
