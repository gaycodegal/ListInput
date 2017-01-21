/**
I created this library as part of 
this assignment in order to make
my life easier.

Note: Nullable fields require no 
argument or undefined to be passed
if they are to be nulled. null not allowed.
  
@namespace lib
*/
var lib = {
  /**
  Swaps two items in an array.
  @param {Array} list Where we swap
  @param {int} a First index of swap
  @param {int} b Second index of swap
  @return {Array} passed list.
  */
  swap: function (list, a, b) {
    var t = list[a];
    list[a] = list[b];
    list[b] = t;
    return list;
  },
  /**
  Creates a html element.
  @param {string} tag The tagName of the
  element to create.
  @param {string?} className The className of the
  element to create.
  @param {string?} innerHTML The innerHTML of the
  element to create.
  */
  make: function (tag, className, innerHTML) {
    var element = document.createElement(tag);
    if (className !== undefined)
      element.className = className;
    if (innerHTML !== undefined)
      element.innerHTML = innerHTML;
    return element;
  },
  /**
  Makes a HTML element setting the textContent
  instead of innerHTML.
  @param {string} tag The tagName of the
  element to create.
  @param {string?} className The className of the
  element to create.
  @param {string?} textContent The textContent of the
  element to create.
  */
  makeText: function (tag, className, textContent) {
    var element = document.createElement(tag);
    if (className !== undefined)
      element.className = className;
    if (textContent !== undefined)
      element.textContent = textContent;
    return element;
  },
  /**
  Makes a DIV element.
  @param {string?} className The className of the
  element to create.
  @param {string?} innerHTML The innerHTML of the
  element to create.
  */
  div: function (className, innerHTML) {
    return lib.make("div", className, innerHTML);
  },
  /**
  Makes a BUTTON element.
  @param {function?} onclick The event to be triggered
  on button click.
  @param {string?} className The className of the
  element to create.
  @param {string?} innerHTML The innerHTML of the
  element to create.
  */
  button: function (onclick, className, innerHTML) {
    var b = lib.make("button", className, innerHTML);
    if (onclick !== undefined)
      b.onclick = onclick;
    b.type = "button";
    return b;
  },
  /**
  Makes a SPAN element.
  @param {string?} className The className of the
  element to create.
  @param {string?} innerHTML The innerHTML of the
  element to create.
  */
  span: function (className, innerHTML) {
    return lib.make("span", className, innerHTML);
  },
  /**
  Makes a SPAN element.
  @param {string?} className The className of the
  element to create.
  @param {string?} textContent The textContent of the
  element to create.
  */
  text: function (className, textContent) {
    return lib.makeText("span", className, textContent);
  },
  /**
  Makes an INPUT element.
  @param {string?} type The type of the
  element to create.
  @param {string?} className The className of the
  element to create.
  @param {string?} innerHTML The innerHTML of the
  element to create.
  */
  input: function (type, className, innerHTML) {
    var input = lib.make("input", className, innerHTML);
    if (type !== undefined)
      input.type = type;
    return input;
  },
  /**
  Similar to jQuery's $(...) function
  for getting elements.
  @param {string} tag A string of format
  "#id" OR ".classname" OR "tagname" to specify
  the type and identifying information of the tag(s)
  you wish to get.
  @return {HTMLCollection|HTMLElement|null} the result of
  calling the related document.getElementXXX
  */
  get: function (tag) {
    var identity = tag.charAt(0)
    if (identity == "#") {
      tag = tag.substring(1);
      return document.getElementById(tag);
    } else if (identity == ".") {
      tag = tag.substring(1);
      return document.getElementsByClassName(tag);
    } else {
      return document.getElementsByTagName(tag);
    }
  },
  /**
  Similar to jQuery's $(...) function
  for getting elements.
  @param {string} tag A string of format
  "#id" OR ".classname" OR "tagname" to specify
  the type and identifying information of the tag(s)
  you wish to get.
  @return {lib.Object} the result of
  calling the related document.getElementXXX,
  but encased inside a lib.Object that is
  identified as either a single HTMLElement or
  a full HTMLCollection.
  */
  getObject: function (tag) {
    var identity = tag.charAt(0)
    if (identity == "#") {
      tag = tag.substring(1);
      return new lib.Object(document.getElementById(tag), true);
    } else if (identity == ".") {
      tag = tag.substring(1);
      return new lib.Object(document.getElementsByClassName(tag), false);
    } else {
      return new lib.Object(document.getElementsByTagName(tag), false);
    }
  },
  /**
  Attach an element to another at an index or the end
  @param {HTMLElement|Contained} parent The parent where
  the child must be placed.
  @param {HTMLElement|Contained} element The child
  to place.
  @param {int?} index Where to place the element. undefined
  will result in simple appending to the parent
  */
  append: function (parent, element, index) {
    element.container && (element = element.container);
    parent.container && (parent = parent.container);
    if (element.constructor == Array) {
      for (var i = 0; i < element.length; ++i) {
        lib.append(parent, element[i], index);
      }
      return;
    }
    if (index === undefined || index >= parent.children.length) {
      parent.appendChild(element);
    } else {
      parent.insertBefore(element, parent.children[index]);
    }
  },
  /**
  Remove an element from another
  @param {HTMLElement|Contained} parent The parent where
  the child must be taken from.
  @param {HTMLElement|Contained} element The child
  to remove.
  */
  remove: function (parent, element) {
    element.container && (element = element.container);
    parent.container && (parent = parent.container);
    if (element.constructor == Array) {
      for (var i = 0; i < element.length; ++i) {
        lib.remove(parent, element[i]);
      }
      return;
    }
    parent.removeChild(element);
  },
  /**
  Remove an element from another
  @param {HTMLElement|Contained} parent The parent where
  the child must be placed.
  @param {HTMLElement|Contained} element The child
  to add.
  @param {HTMLElement|Contained} element The child
  to place something in front of.
  */
  insertBefore: function (parent, newEle, beforeEle) {
    newEle.container && (newEle = newEle.container);
    parent.container && (parent = parent.container);
    if (newEle.constructor == Array) {
      for (var i = newEle.length - 1; i >= 0; --i) {
        lib.insertBefore(parent, newEle[i], beforeEle);
      }
      return;
    }
    parent.insertBefore(newEle, beforeEle);
  },
  /**
  Bind fields of a context to the context
  @param {object} context The object to bind fields to.
  @param {Array.<string>} fields The fields to bind.
  */
  bind: function (context, fields) {
    for (var i = 0; i < fields.length; ++i) {
      var f = fields[i];
      context[f] = context[f].bind(context);
    }
  },
  document: function () {
    return document.body || document.documentElement;
  }
};

/**
an object container for array like or single objects
that maintains a reference to the array-like 
or single object and whether it is holding a single
element or multiple. Can apply a function to all
held elements.
@param {Array.<Object>|Object} set The set of objects
that are held.
@param {boolean} single Whether we hold one object or many.
@property {Array.<Object>|Object} set The set of objects
that are held.
@property {boolean} single Whether we hold one object or many.
@constructor
@this {lib.Object}
*/
lib.Object = function (set, single) {
  this.single = single;
  this.set = set;
};

/**
an object container for array like or single objects
that maintains a reference to the array-like 
or single object and whether it is holding a single
element or multiple. Can apply a function to all
held elements.
@param {function} fn The function to apply to each
element. Called like fn(element)
*/
lib.Object.prototype.each = function (fn) {
  if (this.single) {
    fn(this.set);
  } else {
    for (var i = 0, s = this.set; i < s.length; ++i) {
      fn(s[i]);
    }
  }
};

/**
A point object
@param {number} x The x coordinate.
@param {number} y The y coordinate.
@property {number} x The x coordinate.
@property {number} y The y coordinate.
@constructor
@this {lib.Point}
*/
lib.Point = function (x, y) {
  this.x = x;
  this.y = y;
};
/**
Subtract another point from this.
Update own fields.
@param {lib.Point} other How much to subtract
@return {lib.Point} this
*/
lib.Point.prototype.subtract = function (other) {
  this.x -= other.x;
  this.y -= other.y;
  return this;
};
/**
Add another point to this.
Update own fields.
@param {lib.Point} other How much to add
@return {lib.Point} this
*/
lib.Point.prototype.add = function (other) {
  this.x += other.x;
  this.y += other.y;
  return this;
};
/**
Create a point from a mouse event
in onscreen coordinates.
@return {lib.Point} created point
*/
lib.Point.fromEvent = function (event) {
  event.touches && (event = event.touches[event.touches.length - 1]);
  return new lib.Point(event.clientX, event.clientY);
};
/**
Create a point from a mouse event
in the coordinates of the HTMLDocument
@return {lib.Point} created point
*/
lib.Point.fromView = function (event) {
  event.touches && (event = event.touches[event.touches.length - 1]);
  return new lib.Point(event.clientX + window.pageXOffset, event.clientY + window.pageYOffset);
};

/**
@namespace ListInput
*/
var ListInput = {
  /**
  The input type that we search for if we're changing all
  inputs of a type to ListInput.Inputs
  */
  inputType: "listinput",
  /**
  Convert an object at an id, all elements
  of a tagName, all elements of a class,
  or a passed element to ListInput.Inputs.
  @param {HTMLElement|string} element What to make
  into a ListInput.Input.
  @return {Array.<ListInput.Input>|ListInput.Input} the converted
  versions of the specified element(s).
  */
  make: function (element, name, value) {
    if (typeof element === "string") {
      element = lib.getObject(element);
      if (!element.single) {
        var set = element.set,
          length = set.length,
          inputs = new Array(length);
        for (var i = 0; i < length; ++i) {
          inputs[i] = ListInput.make(set[i], name, value);
        }
        return inputs;
      }
    }
    return new ListInput.Input(element, name, value);
  },
  /**
  Convert all inputs with type=ListInput.inputType
  into ListInput.Inputs.
  @return {Array.<ListInput.Input>|ListInput.Input} the converted
  versions of the specified element(s).
  */
  convert: function () {
    var all = lib.getObject("*");
    var set = all.set,
      inputs = new Array(set.length);
    for (var i = 0; i < set.length; ++i) {
      var element = set[i];
      if (element.getAttribute("type") == ListInput.inputType && element.style.display != "none") {
        inputs[i] = ListInput.make(element);
      }
    }
    return inputs;
  }
};

/**
An input list element that starts off as a simple
text input with an ADD button (+). You can enter
terms into this box and press return/enter or press
the ADD button to add an item to the list.
You can delete elements from the list by pressing
the REMOVE (x) button and reorder them by dragging
items around. If you drag a list item near the top or
bottom of the screen, the page will scroll. This
can be disabled by removing all calls to moveScreen,
but it is not recommended.

@param {HTMLElement?} element The element to replace.
@param {string?} name The name the list input is to have
within the form.
@param {Array?} value The values to use as the
default for this list.

@property {HTMLElement} container The element that contains the entirety
of the list input.
@property {HTMLElement} displayArea Contains the added items of the list.
@property {HTMLElement} inputArea Contains the text input box.
@property {HTMLElement} sourceElement The input that forms use to get
the value of a list input on submission.
@property {HTMLElement} children The list items that are
members of the current list.
@property {HTMLElement} data The text variants of those
list items.

@constructor
@this {ListInput.Input}
*/
ListInput.Input = function (element, name, value) {
  this.container = lib.div("list-input");
  this.container.linkedComponent = this;
  this.displayArea = new ListInput.DisplayArea(this);
  this.inputArea = new ListInput.InputArea(this);
  this.children = [];
  this.data = [];
  lib.append(this.container, [this.displayArea, this.inputArea]);
  if (element && element.parentElement && element.parentElement != element) {
    var parent = element.parentElement;
    parent.insertBefore(this.container, element);
    element.style.display = "none";
  } else {
    element = lib.input("listinput");
    element.style.display = "none";
    lib.append(this, element);
  }
  if (name !== undefined)
    element.name = name;
  this.sourceElement = element;
  element.linkedComponent = this;
  if (value !== undefined) {
    this.setData(value);
  } else {
    var data = element && element.value;
    if (data && data.trim() != "") {
      try {
        data = JSON.parse(data);
        var children = new Array(data.length);
        for (var i = 0; i < data.length; ++i) {
          var text = data[i];
          children[i] = new ListInput.Label(this.displayArea, text);
        }
        this.children = children;
        this.data = data;

      } catch (e) {
        console.error(e);
      }
    }
    lib.append(this.displayArea, this.children);
    this.updateValue();
  }

};
/**
Set the contents of the listinput to a new data
set.
@param {Array?} value The values to use as the
default for this list.
*/
ListInput.Input.prototype.setData = function (value) {
  this.removeAll();
  var len = value.length;
  var children = new Array(len);
  this.data = new Array(len);
  for (var i = 0; i < len; ++i) {
    this.data[i] = value[i];
    children[i] = new ListInput.Label(this.displayArea, value[i]);
  }
  this.children = children;
  lib.append(this.displayArea, this.children);
  this.updateValue();
};
/**
Removes all list items of this.
*/
ListInput.Input.prototype.removeAll = function () {
  this.displayArea.removeAll();
  this.data = [];
  this.children = [];
  this.updateValue();
};
/**
updates the held element's input to reflect
the current values
*/
ListInput.Input.prototype.updateValue = function () {
  this.sourceElement.value = this.toString();
  var eventChange = new Event("change", {
    'view': window,
    'target': this.sourceElement,
    'bubbles': false,
    'cancelable': false
  });
  var eventInput = new Event("input", {
    'view': window,
    'target': this.sourceElement,
    'bubbles': false,
    'cancelable': false
  });
  this.sourceElement.dispatchEvent(eventInput);
  this.sourceElement.dispatchEvent(eventChange);
};
/**
converts the current values into a JSON formatted array
*/
ListInput.Input.prototype.toString = function () {
  return JSON.stringify(this.data);
};
/**
Remove something from the list. Will update the data.
@param {ListInput.Label} label The label to remove.
*/
ListInput.Input.prototype.remove = function (label) {
  var index = this.children.indexOf(label);
  if (index >= 0) {
    this.children.splice(index, 1);
    this.data.splice(index, 1);
  }
  this.updateValue();
};
/**
Add something to the list. Will update the data.
@param {string} text The string to add. Multiple spaces
will be shortened to one due to CSS rules used.
@param {number?} index Where to add this string within
the current data.
*/
ListInput.Input.prototype.add = function (text, index) {
  var label = new ListInput.Label(this.displayArea, text);
  if (index === undefined) {
    this.children.push(label);
    this.data.push(text);
  } else {
    this.children.splice(index, 0, label);
    this.data.splice(index, 0, text);
  }
  lib.append(this.displayArea, label, index);
  this.updateValue();
};

/**
@param {ListInput.Input} parent The ListInput.Input
that contains this.

@property {ListInput.Input} parent The list input that
this display area is for.
@property {HTMLElement} container Contains the list items
@property {HTMLElement} isdown Whether the mouse is pressed
@property {lib.Point} point The last point where the mouse touched.
@property {HTMLElement} targetshadow The element that represents the space
where a dragged item will fall when placed.
@property {HTMLElement} target The list item being moved
@property {ClientRect} targetbox The bounds of the target
@property {ClientRect} abovebox The bounds of previous
@property {ClientRect} belowbox The bounds of next
@property {HTMLElement} next The next list item after target
@property {HTMLElement} previous The previous list item before target
@property {int} index The index of target
@property {Interval} interval Used for moving the screen around
when you're near the edge.

@constructor
@this {ListInput.DisplayArea}
*/
ListInput.DisplayArea = function (parent) {
  lib.bind(this, ["ondown", "onmove", "onup", "moveScreen"]);
  this.parent = parent;
  this.container = lib.div("list-display-area");
  this.container.linkedComponent = this;
  this.container.onmousedown = this.ondown;
  this.container.addEventListener("touchstart", this.ondown);
  this.isdown = false;
  this.interval = -1;
  this.point = null;
  this.targetshadow = null;
  this.targetbox = null;
  this.target = null;
  this.abovebox = null;
  this.belowbox = null;
  this.next = null;
  this.previous = null;
  this.index = null;
};

/**
Due to browser compatibility, touch start doesn't work with 
`element.ontouchstart` so we may have to remove the listener
manually if we want element recycling
*/
ListInput.Input.prototype.removeTouchListener = function () {
  window.removeEventListener("touchstart", this.ondown);
};

/**
Removes all list items of this.
Delegated from parent in case
this method is to made fancy later.
*/
ListInput.DisplayArea.prototype.removeAll = function () {
  this.container.innerHTML = "";
};
/**
Remove a label from the display area. Will update 
both the display and the parent's held data
@param {ListInput.Label} label The label to remove.
*/
ListInput.DisplayArea.prototype.remove = function (label) {
  lib.remove(this, label);
  this.parent.remove(label);
};
/**
When the mouse is down, if we're in a child of a list-item
that is not a button, we start moving it. If we already
have a target, we place that one back in the list and start
trying to move a new one.
@param {Event} event The ondown event.
*/
ListInput.DisplayArea.prototype.ondown = function (event) {
  if (this.target) {
    this.onup();
  }
  var target = event.target || event.srcElement;
  if (target.tagName.toLowerCase() == "button") return;
  if (target.parentElement.classList.contains("list-item"))
    target = target.parentElement;
  if (target.classList.contains("list-item")) {
    this.isdown = true;
    this.target = target;
    this.targetbox = target.getBoundingClientRect();
    this.point = lib.Point.fromEvent(event).subtract(new lib.Point(this.targetbox.width / 2, this.targetbox.height / 2));
    var temp = lib.Point.fromView(event).subtract(new lib.Point(this.targetbox.width / 2, this.targetbox.height / 2));

    this.previous = target.previousSibling;
    this.next = target.nextSibling;

    var prev = this.target,
      index = 0;
    while (prev = prev.previousSibling) {
      ++index;
    }
    this.index = index;

    this.abovebox = this.previous && this.previous.getBoundingClientRect();
    this.belowbox = this.next && this.next.getBoundingClientRect();

    this.targetshadow = lib.div("list-item-shadow");
    this.targetshadow.style.width = this.targetbox.width + "px";
    this.targetshadow.style.height = this.targetbox.height + "px";

    this.target.style.width = (this.targetbox.width - 5) + "px";
    this.target.style.height = (this.targetbox.height - 5) + "px";

    lib.insertBefore(this, this.targetshadow, this.target);
    lib.remove(this, this.target);
    lib.append(lib.document(), this.target);
    this.target.classList.add("list-moving");
    this.target.style.top = temp.y + "px";
    this.target.style.left = temp.x + "px";

  } else {
    this.isdown = false;
  }
  event.preventDefault();
  event.stopPropagation();
  window.addEventListener("mousemove", this.onmove);
  window.addEventListener("mouseup", this.onup);
  window.addEventListener("touchmove", this.onmove);
  window.addEventListener("touchend", this.onup);
};
/**
Move the element about the list. If we go above
another element, slide it up/down
the list (one at a time) - I know this
seems inefficient, but due to HTML
it's most efficient possible.
@param {Event} event The onmove event.
*/
ListInput.DisplayArea.prototype.onmove = function (event) {
  if (this.isdown && this.target) {
    var offsetPoint = new lib.Point(this.targetbox.width / 2, this.targetbox.height / 2);
    this.point = lib.Point.fromEvent(event).subtract(offsetPoint);
    var temp = lib.Point.fromView(event).subtract(offsetPoint);
    var compare = lib.Point.fromEvent(event);
    if (compare.y <= 20) {
      if (this.interval == -1)
        this.interval = setInterval(this.moveScreen, 10);
    } else if (compare.y >= window.innerHeight - 20) {
      if (this.interval == -1)
        this.interval = setInterval(this.moveScreen, 10);
    }
    this.target.style.top = temp.y + "px";
    this.target.style.left = temp.x + "px";

    var mustcheck = true;
    while (mustcheck) {
      mustcheck = false;
      if (this.abovebox && this.point.y + offsetPoint.y < this.abovebox.top + this.abovebox.height / 2) {
        lib.remove(this, this.targetshadow);
        lib.insertBefore(this, this.targetshadow, this.previous);
        this.previous = this.targetshadow.previousSibling;
        this.next = this.targetshadow.nextSibling;
        this.belowbox = this.next && this.next.getBoundingClientRect();
        this.abovebox = this.previous && this.previous.getBoundingClientRect();
        mustcheck = true;
        lib.swap(this.parent.children, this.index, this.index - 1);
        lib.swap(this.parent.data, this.index, this.index - 1);
        --this.index;
      } else if (this.belowbox && this.point.y + offsetPoint.y > this.belowbox.top + this.belowbox.height / 2) {
        lib.remove(this, this.targetshadow);
        this.next = this.next.nextSibling;
        if (this.next) {
          lib.insertBefore(this, this.targetshadow, this.next);
        } else {
          lib.append(this, this.targetshadow);
        }
        this.previous = this.targetshadow.previousSibling;
        this.next = this.targetshadow.nextSibling;

        this.abovebox = this.previous && this.previous.getBoundingClientRect();
        this.belowbox = this.next && this.next.getBoundingClientRect();
        mustcheck = true;
        lib.swap(this.parent.children, this.index, this.index + 1);
        lib.swap(this.parent.data, this.index, this.index + 1);
        ++this.index;
      }
    }
    if (event.preventDefault)
      event.preventDefault();
    if (event.stopPropagation)
      event.stopPropagation();
  }
};

/**
When dragging an item near the top or bottom of the screen,
scroll the screen so that you can move about while
holding list items.
*/
ListInput.DisplayArea.prototype.moveScreen = function () {
  var offsetPoint = new lib.Point(this.targetbox.width / 2, this.targetbox.height / 2);
  this.point.add(offsetPoint);
  if (this.point.y <= 20) {
    window.scrollTo(window.pageXOffset,window.pageYOffset - 2);
  } else if (this.point.y >= window.innerHeight - 20) {
    window.scrollTo(window.pageXOffset,window.pageYOffset + 2);
  } else {
    clearInterval(this.interval);
    this.interval = -1;
  }
  this.belowbox = this.next && this.next.getBoundingClientRect();
  this.abovebox = this.previous && this.previous.getBoundingClientRect();
  this.onmove({
    clientX: this.point.x,
    clientY: this.point.y
  });
}

/**
Places the target back inside the list, removes
move and mouse up listeners. Nulls necessary
styles and information.

@param {Event} event The onup event.
*/
ListInput.DisplayArea.prototype.onup = function (event) {
  this.isdown = false;
  if (this.target) {
    lib.insertBefore(this, this.target, this.targetshadow);
    lib.remove(this, this.targetshadow);
    this.target.style.top = null;
    this.target.style.left = null;
    this.target.style.height = null;
    this.target.style.width = null;
    this.target.classList.remove("list-moving");
    this.target = null;
    this.point = null;
    this.targetshadow = null;
    this.targetbox = null;
    this.abovebox = null;
    this.belowbox = null;
    this.next = null;
    this.previous = null;
    if (this.interval != -1)
      clearInterval(this.interval);
    this.interval = -1;
    this.parent.updateValue();
  }
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  window.removeEventListener("mouseup", this.onup);
  window.removeEventListener("mousemove", this.onmove);
  window.removeEventListener("touchend", this.onmove);
  window.removeEventListener("touchmove", this.onmove);
};

/**
@param {ListInput.Input} parent The ListInput.Input
that contains this.

@property {ListInput.Input} parent The ListInput.Input
that contains this. 
@property {HTMLElement} container Container for the text
input and button.
@property {HTMLElement} input The text input
@property {HTMLElement} add The button that adds
new items to the list from the input's value

@constructor
@this {ListInput.InputArea}
*/
ListInput.InputArea = function (parent) {
  lib.bind(this, ["addNew", "keydown"]);
  this.parent = parent;
  this.container = lib.div("list-input-area");
  this.container.linkedComponent = this;
  this.input = lib.input("text", "list-input-box");
  this.add = lib.button(this.addNew, "list-input-add list-side-button noselect", "+");
  this.input.onkeydown = this.keydown;
  lib.append(this, [this.input, this.add]);
};

/**
Listen for the enter key being pressed, and
add items on press.
*/
ListInput.InputArea.prototype.keydown = function (event) {
  var code = event.keyCode || event.which;
  if (code == 13) {
    if (this.input.value.trim() != "")
      this.addNew();
    event.preventDefault();
    event.stopPropagation();
  }

};
/**
Add a new item (button press's bound function)
*/
ListInput.InputArea.prototype.addNew = function () {
  if (this.input.value.trim() != "")
    this.parent.add(this.input.value);
  this.input.value = "";
};

/**
@param {ListInput.DisplayArea} parent The ListInput.DisplayArea
that contains this.
@param {string} text The text content to display

@property {HTMLElement} parent The ListInput.DisplayArea
that contains this.
@property {HTMLElement} container Contains the text,
the remove button, and a decoration
@property {HTMLElement} text The text content displayed.
@property {HTMLElement} textSpan The text displayed
@property {HTMLElement} removeButton The button to remove this
from the parent

@constructor
@this {ListInput.Label}
*/
ListInput.Label = function (parent, text) {
  lib.bind(this, ["remove"]);
  this.parent = parent;
  this.container = lib.div("list-item");
  this.container.linkedComponent = this;
  this.text = text;
  this.textSpan = lib.text("list-item-text noselect", text);
  this.removeButton = lib.button(this.remove, "list-item-button list-side-button noselect", "x");
  lib.append(this, this.textSpan);
  lib.append(this, this.removeButton);
  lib.append(this, lib.div("list-item-decoration"));
};
/**
Remove this from it's parent.
*/
ListInput.Label.prototype.remove = function (event) {
  if (this.parent)
    this.parent.remove(this);
  this.parent = null;
  event.preventDefault();
  event.stopPropagation();
  return false;
};