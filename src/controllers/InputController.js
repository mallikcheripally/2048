class InputController {
  /**
   * Initialization of Input.
   * @constructor
   * @param {number} callbackFunc - Function to be called on, after starting to listen events
   */
  constructor(callbackFunc) {
    this.callbackFunc = callbackFunc;
  }

  /**
   * Stops listening to keydown events and removes the event listener.
   */
  destroy() {
    window.removeEventListener("keydown", this.callbackFunc.bind());
  }

  /**
   * Creates an event listener and starts listening to keydown events.
   */
  listen() {
    window.addEventListener("keydown", this.callbackFunc.bind());
  }
}

export { InputController };
