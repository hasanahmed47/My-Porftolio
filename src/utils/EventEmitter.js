var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
class EventEmitter {
  static {
    __name(this, "EventEmitter");
  }
  events = {};
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  once(event, callback) {
    const onceCallback = /* @__PURE__ */ __name((data) => {
      callback(data);
      this.off(event, onceCallback);
    }, "onceCallback");
    this.on(event, onceCallback);
  }
  emit(event, data) {
    this.events[event]?.forEach((cb) => cb(data || {}));
  }
  off(event, callback) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter((cb) => cb !== callback);
  }
  destroyEmitter() {
    this.events = {};
  }
}
export {
  EventEmitter as default
};
