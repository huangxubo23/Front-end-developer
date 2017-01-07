/**
 * @function add an Event Listener to the object or element
 * @param object: the element or window object
 * @param type: resize, scroll (event type)
 * @callback: the function reference
 */
export function addEvent(object, type, callback) {
    if (object == null || typeof (object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on" + type] = callback;
    }
}

/**
 * dispatch event
 */
try {
    // chrome
    window.dispatchEvent(new Event('resize'));
} catch (error) {
    // IE
    var evt = window.document.createEvent('UIEvents');
    evt.initUIEvent('resize', true, false, window, 0);
    window.dispatchEvent(evt);
}