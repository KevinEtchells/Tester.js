# Tester.js
A library for in-browser automated testing

## Creating Tests
Add your tests using this syntax:
```javascript
TESTER.test(function (onComplete) {
    let testPassed = true;
    onComplete(testPassed, "Description of test");
});
```
The tests will be run in order.

## Running Tests
To start testing run this from the console:
```javascript
TESTER.START();
```
If something goes wrong you may need to run:
```javascript
TESTER.RESET();
```

## Page reloads
Any code which loads a new page or causes a page reload should be run like this, so the tests can pick up where they left off:
```javascript
TESTER.run(function () {
    window.location.reload();
});
```
