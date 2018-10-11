# Tester.js
A library for in-browser automated testing

## Creating Tests
Add your tests using this syntax:
```javascript
TESTER.test(function (onComplete, args) {
    let testPassed = true;
    onComplete(testPassed, "Description of test");
});
```
"args" is an array of arguments you pass in to the start function (see below). The tests will be run in order.

## Running Tests
To start testing run this from the console:
```javascript
TESTER.start();
```
You can also pass in any number of arguments into this function, which can then be accessed in the tests. This can be useful for passing in usernames, passwords etc.

If something goes wrong you may need to run:
```javascript
TESTER.reset();
```

## Page reloads
Any code which loads a new page or causes a page reload should be run like this, so the tests can pick up where they left off:
```javascript
TESTER.run(function (onComplete, args) {
    window.location.reload();
});
```
