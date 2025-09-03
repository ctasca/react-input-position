// Jest test setup for non-DOM environment

// Provide a minimal window shim for tests that spy on window APIs
if (typeof global.window === 'undefined') {
  global.window = global;
}

// Ensure clearTimeout and setTimeout exist on window
if (typeof window.clearTimeout === 'undefined') {
  window.clearTimeout = clearTimeout;
}
if (typeof window.setTimeout === 'undefined') {
  window.setTimeout = setTimeout;
}

// Provide a very light TouchEvent polyfill if referenced by code/tests
if (typeof window.TouchEvent === 'undefined') {
  class TouchEventPolyfill extends Event {
    constructor(type, params = {}) {
      super(type, params);
      this.touches = params.touches || [];
      this.targetTouches = params.targetTouches || [];
      this.changedTouches = params.changedTouches || [];
      this.altKey = !!params.altKey;
      this.metaKey = !!params.metaKey;
      this.ctrlKey = !!params.ctrlKey;
      this.shiftKey = !!params.shiftKey;
      this.cancelable = params.cancelable !== undefined ? params.cancelable : true;
    }
  }
  window.TouchEvent = TouchEventPolyfill;
  global.TouchEvent = TouchEventPolyfill;
}
