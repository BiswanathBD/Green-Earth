## Create a README file to answer the following question:

### 1) What is the difference between var, let, and const?

        var:
                - var was the only way to declare variable before ES6.
                - var is hoisted but before declaration the value is undefine.
                - var allowed to reassign it's value.

ES6 introduced let and const as the alternative of var. Now in modern js developers used let and const most of the time. But some rare case also used var, like if we need to assign variable value before declare variable we have to use var.

        let:
                - ES6 introduced two way to declare variable, one of those is let.
                - let not hoisted, and redeclare in same scope not allowed.
                - let allowed to reassign it's value.

        const:
                - const is the most uses variable declaration way after ES6
                - const not hoisted, and redeclare in same scope not allowed.
                - const not allowed to reassign it's value.

<br><br>

### 2) What is the difference between map(), forEach(), and filter()?

        map():
                - map() is loops through an array, modify each element with a same condition and return a new array with modified value.
                - map() don't change original array.

                - Example:
                        const numbers = [1, 2, 3, 4, 5]
                        const newNumbers = numbers.map(num => num + 2)
                        Result: numbers = [1, 2, 3, 4, 5]
                                newNumbers = [3, 4, 5, 6, 7]

        forEach():
                - forEach() is loops through an array, modify each element with a same condition but don't return new array.
                - forEach() can modify original array.

                - Example:
                        const numbers = [1, 2, 3, 4, 5]
                        numbers.forEach((num, i, numbers) => {
                                numbers[i] = num + 2
                                })
                        Result: Numbers = [3, 4, 5, 6, 7]

        filter():
                - filter() is loops through an array, find all element with a condition and return a new array of fined element.
                - filter() don't change original array.

                - Example:
                        const numbers = [1, 2, 3, 4, 5, 2, 4, 2, 1]
                        const filteredNumbers = numbers.filter(num => num === 2)
                        result: filteredNumbers = [2, 2, 2]

<br><br>

### 3) What are arrow functions in ES6?

        Arrow function: ES6 introduces arrow function. It's the short form of function.

        There are two types of arrow function: single line and multiline.
        - Single-line arrow function automatically returns.
        - Multiline function has to use `return` manually if needed.

        Example: const sum = (a, b) => a + b;

<br><br>

### 4) How does destructuring assignment work in ES6?

        Destructing assignment extract values form an array or object by it's position or key and assign them into a variable.

        - Example:
                const numbers = [1, 2, 3, 4, 5]
                const [a, b, c] = numbers
                result: [a, b, c] = [1, 2, 3]

<br><br>

### 5) Explain template literals in ES6. How are they different from string concatenation?

        Template literals or template string is a new way to define string by using backticks (``) which support multiline string and can get values inside stings by using ${}. It's make codes clean.

        - Example: const person = {
                name: "Biswanath",
                age: 30,
                }
        console.log(`Hi i'm ${person.name}, my age is ${person.age}.)
        output: Hi i'm Biswanath, my age is 30.
