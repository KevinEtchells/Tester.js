/*eslint no-var: "error"*/
/*eslint-env es6, browser*/
/*eslint no-console: ["error", { allow: ["log", "error"] }]*/

let TESTER = {};

(function () {
    
    "use strict";
    
    let tests = [],
        currentTest = parseInt(window.localStorage.getItem("Tests-currentTest") || "0"),
        args;
    
    const nextTest = function () {
        if (tests[currentTest].type === "test") {

            tests[currentTest].func(onTestComplete, args);

        } else if (tests[currentTest].type === "run") {

            // Increase currentTest in advance, in-case page reloads
            currentTest++;
            window.localStorage.setItem("Tests-currentTest", currentTest.toString());
            tests[currentTest - 1].func(function () {
                nextTest();
            }, args);

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
                TESTER.reset(true);
            }
        } else {
            console.error("TEST FAILED: " + message);
            TESTER.reset(true);
        }
        
    };

    TESTER.test = function (testFunc) {
        tests.push({func: testFunc, type: "test"});
    };

    TESTER.run = function (testFunc) {
        tests.push({func: testFunc, type: "run"});
    };

    TESTER.start = function () {
        args = Array.from(arguments);
        window.localStorage.setItem("Tests-args", JSON.stringify(args));
        nextTest();
    };
    
    TESTER.reset = function (hideMessage) {
        currentTest = 0;
        window.localStorage.setItem("Tests-currentTest", "0");
        window.localStorage.removeItem("Tests-args");
        if (!hideMessage) {
            console.log("%cTesting reset", "color: green");   
        }
    }
    
    // Init
    if (currentTest > 0) {
        console.log("%cTESTING CONTINUED...", "color: green");
        args = JSON.parse(window.localStorage.getItem("Tests-args") || "[]");
        window.setTimeout(nextTest, 1000); // delay, to give time for tests to load
    }
    
}());
