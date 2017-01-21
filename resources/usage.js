//convert all inputs of type listinput into actual ListInput.Inputs
ListInput.convert();

var singleSample = lib.get("#single-sample"),
  multiSample = lib.get("#multi-sample");

lib.append(singleSample, ListInput.make(undefined, "myname"));
lib.append(singleSample, lib.input("submit"));

//setting up a multiple form
//creating one with pre-established values.
lib.append(multiSample, ListInput.make(undefined, "trees",["The Larch","Pine Tree","Oak"]));
//again a simple named field
lib.append(multiSample, ListInput.make(undefined, "created"));

//note the above the same as:
//multiSample.appendChild(ListInput.make(undefined, "created").container);

//now from an element
var myinput = lib.input("listinput");
lib.append(multiSample, myinput);
ListInput.make(myinput, "myinput");
//now from an with values
var myinputvalues = lib.input("listinput");
myinputvalues.value = JSON.stringify(["Dog","Cat","Bear"]);
lib.append(multiSample, myinputvalues);
ListInput.make(myinputvalues, "valueinput");
//an example for setting the data later
var myinputsetvals = ListInput.make(undefined, "fruits");
lib.append(multiSample, myinputsetvals);
//this will wipe the list's current content
myinputsetvals.setData(["Banana","Apple","Pear"]);
//longer text
lib.append(multiSample, ListInput.make(undefined, "long things",["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz","Something Short","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."]));

lib.append(multiSample, lib.input("submit"));


lib.getObject("input").each(function(o){
  o.style.display = null;
});