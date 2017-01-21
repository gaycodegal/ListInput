# ListInput
A reusable single include form component -
a "ListInput" that I was required to build
according to a set of requirements. This
is the result of that project.

- The initial state:
  * The initial state is an empty input box and an ADD (+) button.
    + Can be created via the factory method (ListInput.make).
    + Can be created with values already in them
      via the factory method (ListInput.make).
    + Values can be wiped if desired.
    + Values can be overwritten if desired.
  * ListInputs can be constructed from existing inputs, and thus:
    + The initial state can be set to a value for any given input by setting
      the value attribute of an input to be converted into a ListInput to
      a JSON encoded string.
  * ListInputs can be set to a specific value by providing a javascript array
    to the factory method (ListInput.make). 
- If the user enters input text to the box, clicking ADD should add that text to a list.
  * A user may additionally add entries by pressing the main return/enter key.
- There should be a way to delete a list element.
  * Items can be removed by clicking the REMOVE (x) button.
- On form submit, the list elements should be submitted as an array.
  * List elements are submitted as a JSON formatted array
- Please provide documentation on how to implement your component.
  * Implementation can be done automatically via the ListInput.convert() method.
  * Implementation is able to be done via usage of the factory method.
  * See usage.js for examples of use
  * See [index.html](../index.html) for demonstration of use
- Reusability - How easily reusable is the component?
  * .removeAll() method provided
  * .setData() method provided
  * Basically as easy to reuse as standard HTMLElements
- Design - Does the component look nice? Is the user experience pleasant?
  * Component CSS provided by listinput.css
    + CSS classes for listinputs prefixed with list- so that this won't
      conflict with anything in any project that uses it.
  * Design created so that large amounts of text in a
    list-item will simply make that item taller.
- Style & Documentation
  * Documented using jsdoc format.
  * Documentation also provided in pretty format having
    been compiled via jsdoc and included in a compressed
    zip folder for ease of use.
- Additional Interactions
  * List elements can be re-ordered by dragging.
  * List elements dragged to the top of the
    screen will cause the page to scroll
    to ease dragging functionality.
  * Dragging only supported for mouse events
    because this is a demo product.
  * Triggers "change" and "input" events on
    it's input element
- Testing
  * Testing passes on latest Chrome, Firefox,
    Safari, and Chrome's mobile emulator.