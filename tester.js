/*eslint no-var: "error"*/
/*eslint-env es6, browser*/
/*eslint no-console: ["error", { allow: ["log", "error"] }]*/

let TESTER = {};

(function () {
    
    "use strict";
    
    let tests = [],
        currentTest = parseInt(window.localStorage.getItem("Tests-currentTest") || "0");
    
    const nextTest = function () {
        if (tests[currentTest].type === "test") {

            tests[currentTest].func(onTestComplete);

        } else if (tests[currentTest].type === "run") {

            // Increase currentTest in advance, in-case page reloads
            currentTest++;
            window.localStorage.setItem("Tests-currentTest", currentTest.toString());
            tests[currentTest - 1].func(function () {
                nextTest();
            });

        }
    };
    
    const onTestComplete = function (passed, message) {
        if (passed) {
            console.log("%cTEST PASSED: " + message, "color: green");
            currentTest++;
            if (currentTest < tests.length) {
                window.localStorage.setItem("Tests-currentTest", currentTest.toString());
                nextTest();
            } else {
                console.log("%cALL " + tests.filter(function (test) {return test.type === "test"}).length + " TESTS COMPLETE", "color: green");
                currentTest = 0;
                window.localStorage.setItem("Tests-currentTest", "0");
            }
        } else {
            console.error("TEST FAILED: " + message);
        }
        
    };

    TESTER.test = function (testFunc) {
        tests.push({func: testFunc, type: "test"});
    };

    TESTER.run = function (testFunc) {
        tests.push({func: testFunc, type: "run"});
    };

    TESTER.start = function () {
        nextTest();
    };
    
    TESTER.reset = function () {
        currentTest = 0;
        window.localStorage.setItem("Tests-currentTest", "0");
        console.log("%cTesting reset", "color: green");
    }
    
    // Init
    if (currentTest > 0) {
        console.log("%cTESTING CONTINUED...", "color: green");
        window.setTimeout(TESTER.start, 1000); // delay, to give time for tests to load
    }
    
}());
