import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import "./index.css";
import { MdPerson } from "react-icons/md";
import { ref, set } from "firebase/database";
import { database } from "../../Firebase";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const MainPage = () => {
  const userId = localStorage.getItem("userInfo");
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const [userName, setuserName] = useState("");
  const [genPopUp, setGenPopUp] = useState(false);
  const [userLink, setUserLink] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [buttonsPopUp, setButtonsPopUp] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const commandss = [
    {
      command: "Introduction",
      text: `<p>Hello! My name is [Your Name], and I'm excited to interview for the front-end developer position.</p>
    
            <p>For the past five years, I've been dedicated to crafting user-friendly and visually appealing web applications as a front-end developer. My primary focus has been on utilizing React.js to build interactive and dynamic user interfaces.</p>
            
            <p>I have a strong understanding of HTML, CSS, and JavaScript, which are the building blocks of web development. With React.js, I've been able to create reusable components, manage state efficiently, and ensure high performance in web applications.</p>
            
            <p>Throughout my career, I've worked on various projects where I've collaborated closely with designers and backend developers to turn concepts into reality. I'm experienced in translating design mockups into responsive and pixel-perfect layouts, ensuring a seamless user experience across different devices and screen sizes.</p>
            
            <p>Additionally, I'm familiar with modern front-end development tools and technologies such as Redux, Webpack, and CSS preprocessors like Sass. I'm always eager to stay updated with the latest trends and best practices in front-end development to deliver the best possible solutions.</p>
            
            <p>I'm passionate about creating intuitive and user-friendly interfaces that enhance the overall user experience. I thrive in environments that foster creativity, collaboration, and continuous learning.</p>
            
            <p>I'm looking forward to discussing how my skills and experience can contribute to the success of your team and projects. Thank you for considering my application!</p>
         `,
    },
    {
      command: "HTML5 Features",
      text: `
            <ol>
              <li><strong>Semantics:</strong> HTML5 introduced new semantic elements like &lt;header&gt;, &lt;footer&gt;, &lt;nav&gt;, &lt;article&gt;, &lt;section&gt;, &lt;aside&gt;, etc., which provide better structure and meaning to web pages.</li>
              <li><strong>Audio and Video Support:</strong> HTML5 includes native support for embedding audio and video content using the &lt;audio&gt; and &lt;video&gt; elements.</li>
              <li><strong>Canvas and SVG:</strong> HTML5 introduced the &lt;canvas&gt; element for dynamic, scriptable rendering of 2D shapes and bitmap images, and integrated SVG for vector graphics directly in the markup.</li>
              <li><strong>Form Improvements:</strong> HTML5 introduced new input types and attributes for form elements, making form validation and user interaction more robust and user-friendly.</li>
              <li><strong>Local Storage:</strong> HTML5 introduced the localStorage and sessionStorage APIs for storing data locally on the client's browser.</li>
              <li><strong>Web Storage:</strong> HTML5 introduced the Web Storage API, providing a more powerful mechanism for storing key-value pairs in the browser.</li>
              <li><strong>Web Workers:</strong> HTML5 introduced Web Workers for running JavaScript code in background threads.</li>
              <li><strong>Geolocation API:</strong> HTML5 introduced the Geolocation API for accessing the user's geographical location.</li>
              <li><strong>Responsive Images:</strong> HTML5 introduced the &lt;picture&gt; and &lt;source&gt; elements for providing multiple image sources and specifying different image resolutions based on device characteristics.</li>
              <li><strong>Improved Accessibility:</strong> HTML5 includes features aimed at improving web accessibility, such as native support for ARIA attributes and landmark roles.</li>
            </ol>
          `,
    },
    {
      command: "state definition",
      text: `
          <p>State is an object that allows components to keep track of changing data within themselves. It represents the current state of the component and determines how it renders and behaves.</p>
          <ol>
            <li><strong>Declaring State:</strong> You can declare state in a React component by using the useState hook (for functional components) or by extending the React.Component class and defining a state property (for class components).</li>
            <li><strong>Accessing State:</strong> You can access the state of a component using this.state in class components or directly by using the state variable returned by the useState hook in functional components.</li>
            <li><strong>Updating State:</strong> State should never be modified directly. Instead, you should use the setter function provided by useState hook (setCount in the example above) or setState method in class components to update the state. React will then re-render the component with the updated state.</li>
            <li><strong>Asynchronous State Updates:</strong> State updates in React are asynchronous. If you need to update the state based on its previous value, you should use the functional form of setState in class components or functional updates with the useState hook.</li>
            <li><strong>Passing State as Props:</strong> You can pass state down to child components as props to share the state between components.</li>
            <li><strong>Local Component State:</strong> State is local and scoped to the component that declares it. It cannot be directly accessed or modified by other components.</li>
          </ol>
        `,
    },
    {
      command: "class and functional difference",
      text: `
          <ol>
            <li><strong>Syntax:</strong> 
              <ul>
                <li><strong>Class Components:</strong> Defined using ES6 classes that extend from React.Component.</li>
                <li><strong>Functional Components:</strong> Defined as JavaScript functions that return JSX.</li>
              </ul>
            </li>
            <li><strong>State:</strong> 
              <ul>
                <li><strong>Class Components:</strong> Have state and lifecycle methods.</li>
                <li><strong>Functional Components:</strong> Initially did not have state or lifecycle methods prior to React 16.8.</li>
              </ul>
            </li>
            <li><strong>Lifecycle Methods:</strong> 
              <ul>
                <li><strong>Class Components:</strong> Have lifecycle methods such as componentDidMount, componentDidUpdate, etc.</li>
                <li><strong>Functional Components:</strong> Before hooks, functional components didn't have lifecycle methods. With hooks, they now have access to equivalent functionalities.</li>
              </ul>
            </li>
            <li><strong>this Keyword:</strong> 
              <ul>
                <li><strong>Class Components:</strong> Require the use of this to access props and state within the component.</li>
                <li><strong>Functional Components:</strong> Do not use this. Props are passed directly as function arguments.</li>
              </ul>
            </li>
            <li><strong>Readability and Conciseness:</strong> 
              <ul>
                <li><strong>Functional Components:</strong> Tend to be more concise and easier to read, especially for simpler components.</li>
                <li><strong>Class Components:</strong> Can be more verbose due to the use of class syntax and lifecycle methods.</li>
              </ul>
            </li>
            <li><strong>Performance:</strong> 
              <ul>
                <li><strong>Functional Components:</strong> Are generally more performant than class components, especially when using React's memoization techniques and optimizations like React.memo.</li>
                <li><strong>Class Components:</strong> Can have a slightly higher performance overhead due to the nature of class instantiation and lifecycle methods.</li>
              </ul>
            </li>
            <li><strong>Hooks:</strong> 
              <ul>
                <li><strong>Functional Components:</strong> With the introduction of hooks in React 16.8, functional components gained the ability to use state and other React features previously only available in class components.</li>
                <li><strong>Class Components:</strong> Will likely be phased out over time as functional components with hooks offer a more modern and flexible way to write React components.</li>
              </ul>
            </li>
          </ol>
        `,
    },
    {
      command: "features of react",
      text: `
          <ol>
            <li><strong>Declarative:</strong> React allows you to describe how your UI should look at any given point in time, and it automatically manages the rendering of components based on changes in state or props.</li>
            <li><strong>Component-Based:</strong> React follows a component-based architecture, where UIs are broken down into small, reusable components.</li>
            <li><strong>Virtual DOM:</strong> React uses a virtual DOM to efficiently update the UI.</li>
            <li><strong>JSX:</strong> JSX is a syntax extension for JavaScript that allows you to write HTML-like code within your JavaScript files.</li>
            <li><strong>Unidirectional Data Flow:</strong> React follows a unidirectional data flow, where data flows downward from parent components to child components via props.</li>
            <li><strong>State Management:</strong> React allows components to have internal state, which can be updated using setState().</li>
            <li><strong>Lifecycle Methods:</strong> React components have lifecycle methods that allow you to hook into various stages of a component's lifecycle.</li>
            <li><strong>Reusable Components:</strong> React's component-based architecture encourages the creation of reusable UI components.</li>
            <li><strong>Developer Tools:</strong> React comes with a set of developer tools (React DevTools) that provide insights into the component hierarchy, state, and props.</li>
            <li><strong>Ecosystem:</strong> React has a rich ecosystem of libraries and tools.</li>
          </ol>
        `,
    },
    {
      command: "Virtual DOM",
      text: `
            <p>The Virtual DOM is a lightweight, in-memory representation of the actual DOM. In React, instead of directly manipulating the browser's DOM to update the UI, changes are first made to the Virtual DOM. React then compares the Virtual DOM with the previous version (referred to as reconciliation) and calculates the most efficient way to update the actual DOM.</p>
        
            <h3>How Does the Virtual DOM Work?</h3>
            <ol>
              <li><strong>Initial Render:</strong> When a React component is first rendered, React creates a Virtual DOM representation of the component's UI hierarchy.</li>
              <li><strong>Updates:</strong> When a component's state or props change, React re-renders the component and generates a new Virtual DOM representation.</li>
              <li><strong>Virtual DOM Diffing:</strong> React compares the new Virtual DOM with the previous one to determine which parts of the UI have changed.</li>
              <li><strong>Efficient Updates:</strong> React identifies the minimal set of changes needed to update the actual DOM and applies those changes, minimizing the number of DOM manipulations.</li>
              <li><strong>Updating the Actual DOM:</strong> Finally, React updates the browser's DOM with the changes calculated during the Virtual DOM diffing process.</li>
            </ol>
        
            <h3>Benefits of the Virtual DOM:</h3>
            <ul>
              <li><strong>Performance:</strong> By minimizing the number of DOM manipulations, React's Virtual DOM approach improves performance and reduces rendering time, especially for complex and dynamic UIs.</li>
              <li><strong>Efficiency:</strong> Virtual DOM diffing allows React to efficiently determine which parts of the UI need to be updated, resulting in faster rendering and a smoother user experience.</li>
              <li><strong>Abstraction:</strong> The Virtual DOM abstracts away the complexity of directly interacting with the browser's DOM API, making it easier to reason about and manage UI updates in React applications.</li>
              <li><strong>Platform Independence:</strong> Since the Virtual DOM is a JavaScript representation of the DOM, it is platform-independent and can be used in both browser and server environments.</li>
            </ul>
          `,
    },
    {
      command: "ES 6 Features",
      text: `
          <ol>
            <li><strong>Arrow Functions:</strong> Provides a more concise syntax for writing anonymous functions.</li>
            <li><strong>let and const:</strong> Introduced block-scoped variables (let) and constants (const).</li>
            <li><strong>Template Literals:</strong> Allow embedding expressions within string literals using \`\${}\` syntax.</li>
            <li><strong>Destructuring Assignment:</strong> Enables extracting values from arrays or objects into variables.</li>
            <li><strong>Default Parameters:</strong> Allows defining default values for function parameters.</li>
            <li><strong>Rest and Spread Operators:</strong> The rest operator (...) allows gathering remaining arguments into an array, while the spread operator (...) allows expanding arrays or iterable objects into individual elements.</li>
            <li><strong>Object Literal Enhancements:</strong> Shorthand property and method syntax, computed property names, and method definitions within object literals.</li>
            <li><strong>Classes:</strong> Introduces class syntax for defining constructor functions and inheritance.</li>
            <li><strong>Modules:</strong> ES6 introduced native support for modules, allowing JavaScript files to export and import functions, objects, or variables.</li>
            <li><strong>Promises:</strong> Provides a built-in mechanism for handling asynchronous operations.</li>
            <li><strong>Symbol:</strong> Introduces a new primitive data type for creating unique identifiers.</li>
            <li><strong>Iterators and Generators:</strong> Iterators allow defining custom iteration behavior for objects, while generators simplify the creation of iterators.</li>
            <li><strong>Map and Set:</strong> New built-in data structures for storing collections of unique keys or values.</li>
            </ol>
        `,
    },
    {
      command: "Difference between var, let and const",
      text: `
            <p><strong>var:</strong></p>
            <ul>
              <li><code>var</code> was traditionally used to declare variables in JavaScript before the introduction of <code>let</code> and <code>const</code>.</li>
              <li>Variables declared with <code>var</code> are function-scoped, meaning they are visible within the function in which they are declared or globally if declared outside any function.</li>
              <li>Variables declared with <code>var</code> can be redeclared and reassigned.</li>
            </ul>
        
            <p><strong>let:</strong></p>
            <ul>
              <li><code>let</code> was introduced in ES6 (ECMAScript 2015) to provide block-scoped variables in JavaScript.</li>
              <li>Variables declared with <code>let</code> are block-scoped, meaning they are only visible within the block (e.g., within a loop or conditional statement) in which they are declared.</li>
              <li>Variables declared with <code>let</code> can be reassigned but not redeclared within the same scope.</li>
            </ul>
        
            <p><strong>const:</strong></p>
            <ul>
              <li><code>const</code> was also introduced in ES6 and is used to declare constants in JavaScript.</li>
              <li>Variables declared with <code>const</code> are block-scoped like <code>let</code>.</li>
              <li>Variables declared with <code>const</code> cannot be reassigned once they are initialized. However, the value of a <code>const</code> variable that is an object or array can still be modified (i.e., the variable's reference cannot be changed, but its properties can).</li>
            </ul>
        
            <p><strong>Differences:</strong></p>
            <ul>
              <li><strong>Scope:</strong> 
                <ul>
                  <li><code>var</code>: Function-scoped</li>
                  <li><code>let</code> and <code>const</code>: Block-scoped</li>
                </ul>
              </li>
              <li><strong>Reassignment:</strong> 
                <ul>
                  <li><code>var</code> and <code>let</code>: Can be reassigned</li>
                  <li><code>const</code>: Cannot be reassigned (except for objects and arrays)</li>
                </ul>
              </li>
              <li><strong>Redeclaration:</strong> 
                <ul>
                  <li><code>var</code>: Can be redeclared within the same scope</li>
                  <li><code>let</code> and <code>const</code>: Cannot be redeclared within the same scope</li>
                </ul>
              </li>
            </ul>
        
            <p><strong>Use Cases:</strong></p>
            <ul>
              <li>Use <code>var</code> if you need function-scoped variables (rarely used in modern JavaScript).</li>
              <li>Use <code>let</code> for variables that may be reassigned but are block-scoped.</li>
              <li>Use <code>const</code> for variables that should not be reassigned and are intended to be constant.</li>
            </ul>`,
    },
    {
      command: "IIFE",
      text: `
            <p><strong>IIFE (Immediately Invoked Function Expression):</strong></p>
            <ul>
              <li>An IIFE is a JavaScript function that is declared and invoked immediately after its definition.</li>
              <li>It is wrapped within parentheses to ensure that it is treated as an expression and not a declaration.</li>
              <li>IIFEs are commonly used to create a new scope for variables and functions, helping to prevent polluting the global namespace.</li>
              <li>They are also used to encapsulate code and prevent conflicts with other scripts or libraries.</li>
            </ul>
        
            <p><strong>Benefits of IIFE:</strong></p>
            <ol>
              <li><strong>Encapsulation:</strong> IIFEs create a new scope, allowing variables and functions defined within them to be encapsulated and not accessible from outside.</li>
              <li><strong>Avoiding Globals:</strong> By encapsulating code within an IIFE, you can prevent variables and functions from polluting the global namespace, reducing the risk of naming conflicts.</li>
              <li><strong>Self-Execution:</strong> IIFEs are immediately invoked, meaning they execute their code as soon as they are defined. This can be useful for executing initialization code or creating self-contained modules.</li>
            </ol>
        
            <p><strong>Use Cases:</strong></p>
            <ul>
              <li><strong>Singleton Pattern:</strong> Creating a singleton object using an IIFE to ensure only one instance is created.</li>
              <li><strong>Module Pattern:</strong> Implementing modules in JavaScript by encapsulating related functions and variables within an IIFE.</li>
              <li><strong>Polluting Global Namespace Prevention:</strong> Wrapping third-party library code in an IIFE to prevent conflicts with other scripts.</li>
            </ul>`,
    },
    {
      command: "Props",
      text: `
            <p><strong>Props (Properties):</strong></p>
            <ul>
              <li>Props are a way of passing data from parent components to child components in React.</li>
              <li>They are read-only and cannot be modified within the child component.</li>
              <li>Props allow components to be customizable and reusable by allowing different data to be passed to them.</li>
              <li>Props are passed as attributes to components in JSX.</li>
            </ul>
        
            <p><strong>Passing Props:</strong></p>
            <ul>
              <li>Props are passed to a component as attributes in JSX, and they are accessible within the component as an object called <code>props</code>.</li>
              <li>Props can be of any data type, including strings, numbers, arrays, objects, functions, etc.</li>
            </ul>
        
            <p><strong>Accessing Props:</strong></p>
            <ul>
              <li>Props are accessed within a component via the <code>props</code> object.</li>
            </ul>
        
            <p><strong>Default Props:</strong></p>
            <ul>
              <li>Components can define default props using the <code>defaultProps</code> property.</li>
              <li>Default props are used if a prop is not explicitly provided when the component is used.</li>
            </ul>
        
            <p><strong>Use Cases:</strong></p>
            <ul>
              <li>Passing data from parent components to child components.</li>
              <li>Configuring and customizing child components.</li>
              <li>Providing callback functions to child components for event handling.</li>
            </ul>`,
    },
    {
      command: "State and Props Difference",
      text: `
            <p><strong>State vs Props:</strong></p>
            <p>In React, both state and props are used to pass data from one component to another, but they have different purposes and usage:</p>
        
            <p><strong>State:</strong></p>
            <ul>
              <li>State is a built-in feature of React components that represents the current state of the component.</li>
              <li>State is managed internally by the component itself and can be updated using the <code>setState()</code> method.</li>
              <li>State is mutable and can be changed over time, typically in response to user actions or other events.</li>
              <li>State is local and confined to the component in which it is declared, meaning it cannot be accessed or modified by other components.</li>
              <li>State changes trigger re-rendering of the component, updating the UI to reflect the new state.</li>
            </ul>
        
            <p><strong>Props:</strong></p>
            <ul>
              <li>Props (short for properties) are used to pass data from parent components to child components.</li>
              <li>Props are immutable and read-only, meaning they cannot be modified within the component that receives them.</li>
              <li>Props are passed as attributes to components in JSX and are accessed via the <code>props</code> object within the component.</li>
              <li>Props provide a way to customize and configure child components based on the data passed from their parent components.</li>
              <li>Changes to props trigger re-rendering of the component, allowing it to reflect the updated data.</li>
            </ul>`,
    },
    {
      command: "Hoisting",
      text: `
            <p><strong>What is Hoisting?</strong></p>
            <p>Hoisting is a JavaScript behavior where variable and function declarations are moved to the top of their containing scope during the compilation phase, regardless of where they are actually declared in the code.</p>
        
            <p><strong>How Does Hoisting Work?</strong></p>
            <ol>
              <li><strong>Variable Hoisting:</strong> Variable declarations (var) are hoisted to the top of their containing scope, but not their initializations.</li>
              <li><strong>Function Hoisting:</strong> Function declarations are hoisted to the top of their containing scope, including their definitions.</li>
            </ol>
            <ul>
              <li><strong>Function Expressions:</strong> Function expressions (e.g., anonymous functions assigned to variables) are not hoisted in the same way as function declarations.</li>
              <li><strong>Block Scope:</strong> let and const declarations are hoisted to the top of their containing block, but are not initialized.</li>
            </ul>`,
    },
    {
      command: "Temporal dead zone",
      text: `
            <p>The temporal dead zone is a concept in JavaScript related to the behavior of variables declared with <code>let</code> and <code>const</code> keywords in ES6 (ECMAScript 2015).</p>
            <p>When a variable is declared with <code>let</code> or <code>const</code>, it is hoisted to the top of its scope, similar to variables declared with <code>var</code>. However, unlike <code>var</code> variables, which are initialized with a value of <code>undefined</code> during the hoisting phase, variables declared with <code>let</code> or <code>const</code> remain uninitialized in the temporal dead zone until the point where they are actually declared.</p>
            <p>This means that if you try to access the variable before its declaration point in the code, you'll encounter a <code>ReferenceError</code>. The "dead zone" refers to this period in the code where the variable exists, but is in an inaccessible state due to being uninitialized.</p>
            <p>For example:</p>
            <pre><code>console.log(x); // ReferenceError: Cannot access 'x' before initialization
            let x = 10;
            </code></pre>
            <p>In this code snippet, <code>x</code> is in the temporal dead zone until the line where it's declared with <code>let</code>. Trying to access <code>x</code> before that line results in a <code>ReferenceError</code>. This behavior encourages better coding practices by making it clearer where variables are being used before they're initialized.</p>
          `,
    },
    {
      command: "map, filter, find difference",
      text: `In JavaScript, map, filter, and find are array methods used for different purposes. map transforms each element of an array into a new value based on a callback function and returns a new array with these transformed values. filter creates a new array containing only the elements that pass a certain condition specified by a callback function. find returns the first element in the array that satisfies a given condition specified by a callback function, or undefined if no such element is found. While map and filter always return arrays, find returns a single value (or undefined), making it useful for locating a specific element in an array.`,
    },
    {
      command: "Arrow vs Normal function",
      text: `
            <p><strong>Arrow Functions:</strong></p>
            <ol>
              <li><strong>Syntax:</strong> Arrow functions have a shorter and more concise syntax compared to normal functions.</li>
              <li><strong>Lexical this Binding:</strong> Arrow functions inherit the 'this' value from the surrounding lexical scope.</li>
              <li><strong>No 'arguments' Object:</strong> Arrow functions do not have their own 'arguments' object.</li>
              <li><strong>Cannot be Used as Constructors:</strong> Arrow functions cannot be used as constructors with the 'new' keyword.</li>
              <li><strong>Cannot be Used with call(), apply(), or bind():</strong> Arrow functions do not have their own 'this' context, so they cannot be explicitly bound using call(), apply(), or bind().</li>
            </ol>
        
            <p><strong>Normal Functions:</strong></p>
            <ol>
              <li><strong>Syntax:</strong> Normal functions are defined using the 'function' keyword followed by a function name and a block of code.</li>
              <li><strong>'this' Binding:</strong> Normal functions have their own 'this' context, which is determined by how they are called.</li>
              <li><strong>'arguments' Object:</strong> Normal functions have their own 'arguments' object, which contains the arguments passed to the function.</li>
              <li><strong>Can be Used as Constructors:</strong> Normal functions can be used as constructors with the 'new' keyword to create new objects.</li>
              <li><strong>Can be Used with call(), apply(), or bind():</strong> Normal functions can be explicitly bound to a specific 'this' context using the call(), apply(), or bind() methods.</li>
            </ol>
          `,
    },
    {
      command: "Call, Apply, Bind",
      text: `
            <p><strong>call()</strong></p>
            <ul>
              <li>The call() method is a function method that allows you to call a function with a specified this value and arguments provided individually.</li>
              <li>Syntax: function.call(thisArg, arg1, arg2, ...)</li>
              <li>call() executes the function immediately.</li>
            </ul>
        
            <p><strong>apply()</strong></p>
            <ul>
              <li>The apply() method is similar to call(), but it accepts arguments as an array.</li>
              <li>Syntax: function.apply(thisArg, [argsArray])</li>
              <li>apply() executes the function immediately.</li>
            </ul>
        
            <p><strong>bind()</strong></p>
            <ul>
              <li>The bind() method creates a new function with a specified this value and optionally, initial arguments.</li>
              <li>Syntax: function.bind(thisArg[, arg1[, arg2[, ...]]])</li>
              <li>bind() returns a new function without executing it immediately.</li>
            </ul>
          `,
    },
    {
      command: "Spread and rest operators",
      text: `
            <p><strong>Spread Operator (\`...\`)</strong></p>
            <ul>
              <li>The spread operator (\`...\`) allows an iterable (like an array or string) to be expanded into individual elements.</li>
              <li>When used with arrays, it can be used to:
                <ul>
                  <li>Concatenate arrays: \`[...arr1, ...arr2]\`</li>
                  <li>Copy arrays: \`[...arr]\`</li>
                  <li>Convert array-like objects into arrays: \`[...arrayLike]\`</li>
                </ul>
              </li>
              <li>When used with objects, it can be used to:
                <ul>
                  <li>Copy object properties into a new object: \`{...obj}\`</li>
                  <li>Merge objects: \`{...obj1, ...obj2}\` (properties of \`obj2\` override properties of \`obj1\` if they have the same key)</li>
                </ul>
              </li>
            </ul>
        
            <p><strong>Rest Parameter (\`...\`)</strong></p>
            <ul>
              <li>The rest parameter (\`...\`) allows a function to accept an indefinite number of arguments as an array.</li>
              <li>It collects all remaining arguments into an array.</li>
              <li>It must be the last parameter in the function's parameter list.</li>
            </ul>
          `,
    },
    {
      command: "redux",
      text: `
            <h1>Understanding Redux with React</h1>
            <p>Redux is a predictable state container for JavaScript apps, often used with React to manage the application's state in a single, centralized place. It helps in managing complex state interactions that are hard to express with local state within React components. Redux introduces several key components to achieve this:</p>
            <ul>
              <li><strong>Store</strong>: The single source of truth for the application state. It is created using the <code>createStore</code> method from Redux, and it houses the entire state tree of the application.</li>
              <li><strong>Actions</strong>: Plain JavaScript objects that represent an intention to change the state. Actions have a type field that tells what kind of action to perform, and all other fields contain information or data necessary for the action.</li>
              <li><strong>Reducers</strong>: Pure functions that take the current state and an action as arguments and return a new state. They specify how the application's state changes in response to actions sent to the store.</li>
              <li><strong>Dispatch</strong>: Redux store's method used to dispatch actions. It is the only way to trigger a state change.</li>
              <li><strong>Middleware</strong>: It provides a way to interact with actions that have been dispatched to the store before they reach the store's reducers. Middleware can be used for logging, crash reporting, asynchronous actions, etc.</li>
            </ul>
            <p>The workflow in a React-Redux application typically follows these steps:</p>
            <ol>
              <li>A React component triggers an action to be dispatched.</li>
              <li>The Redux store uses the reducer functions to determine how the state should change based on the action.</li>
              <li>The store updates the state based on the return value of the reducer.</li>
              <li>The store then notifies all subscribed components of the state change.</li>
              <li>React components that are subscribed to the store (usually via <code>connect</code> function from <code>react-redux</code> or <code>useSelector</code> hook in modern Redux) will re-render with the new state.</li>
            </ol>
            <p>This architecture ensures that state changes are predictable and traceable, making the application easier to understand, debug, and scale.</p>
          `,
    },
    {
      command: "Event Loop",
      text: `
            <p><strong>Event Loop:</strong></p>
            <ul>
              <li>The event loop is a key concept in JavaScript's concurrency model, responsible for handling asynchronous operations and managing the execution of code.</li>
              <li>It allows JavaScript to perform non-blocking I/O operations, such as fetching data from a server or waiting for user input, without freezing the execution of the entire program.</li>
            </ul>
        
            <p><strong>How it Works:</strong></p>
            <ol>
              <li><strong>Call Stack:</strong> JavaScript is single-threaded, meaning it can only execute one piece of code at a time. The call stack records the execution context of function calls in the program.</li>
              <li><strong>Web APIs:</strong> Provided by the browser environment, Web APIs allow JavaScript to perform asynchronous operations.</li>
              <li><strong>Callback Queue:</strong> When an asynchronous operation completes, a corresponding event is placed in the callback queue.</li>
              <li><strong>Event Loop:</strong> The event loop continuously checks the call stack and the callback queue. If the call stack is empty and there are callbacks in the callback queue, the event loop moves callbacks from the callback queue to the call stack for execution.</li>
            </ol>
        
            <p><strong>Use Cases:</strong></p>
            <ul>
              <li>Asynchronous operations: Performing tasks that may take time to complete, such as fetching data from a server, handling user input, or executing timers.</li>
              <li>Event-driven programming: Responding to user interactions, DOM events, or other external events in a non-blocking manner.</li>
            </ul>`,
    },
    {
      command: "Event Bubbling and event capturing",
      text: `
            <p><strong>Event Bubbling:</strong></p>
            <ul>
              <li>Event bubbling is the default behavior in JavaScript where an event triggered on a nested element "bubbles up" through its ancestors in the DOM tree.</li>
              <li>When an event occurs on an element, it first triggers the event handlers attached to the innermost element and then propagates to its parent elements in the DOM hierarchy.</li>
              <li>This allows for handling events at higher levels of the DOM hierarchy without explicitly attaching event handlers to each individual element.</li>
            </ul>
        
            <p><strong>Event Capturing:</strong></p>
            <ul>
              <li>Event capturing is the opposite of event bubbling, where the event is first captured by the outermost ancestor element and then propagated down through its descendants to the target element.</li>
              <li>In event capturing, the event starts at the top of the DOM tree and moves down to the target element.</li>
              <li>Event capturing is less commonly used than event bubbling but can be useful in certain scenarios, especially when you want to intercept events before they reach the target element.</li>
            </ul>
        
            <p><strong>Differences:</strong></p>
            <ul>
              <li><strong>Event Bubbling:</strong>
                <ul>
                  <li>Default behavior in JavaScript.</li>
                  <li>Event starts at the target element and propagates up to its ancestors.</li>
                  <li>Event handlers attached to parent elements can handle events triggered by their descendants.</li>
                </ul>
              </li>
              <li><strong>Event Capturing:</strong>
                <ul>
                  <li>Less commonly used but can be explicitly enabled by setting the useCapture parameter to true in the addEventListener() method.</li>
                  <li>Event starts at the top of the DOM tree and propagates down to the target element.</li>
                  <li>Useful for intercepting events at higher levels of the DOM hierarchy before they reach the target element.</li>
                </ul>
              </li>
            </ul>
        
            <p><strong>Use Cases:</strong></p>
            <ul>
              <li><strong>Event Bubbling:</strong>
                <ul>
                  <li>Delegating event handling to parent elements.</li>
                  <li>Simplifying event management by attaching event handlers to common parent elements instead of individual elements.</li>
                </ul>
              </li>
              <li><strong>Event Capturing:</strong>
                <ul>
                  <li>Intercepting events at higher levels of the DOM hierarchy before they reach the target element.</li>
                  <li>Implementing advanced event handling logic that requires capturing events before they bubble up.</li>
                </ul>
              </li>
            </ul>`,
    },
    {
      command: "Undefined and null difference",
      text: `
            <p><strong>undefined:</strong></p>
            <ul>
              <li><code>undefined</code> represents a variable that has been declared but has not been assigned a value.</li>
              <li>It is a primitive value in JavaScript.</li>
              <li>When a variable is declared but not initialized, or when a function does not explicitly return a value, JavaScript assigns <code>undefined</code> to that variable or function.</li>
            </ul>
        
            <p><strong>null:</strong></p>
            <ul>
              <li><code>null</code> represents an intentional absence of any value or object.</li>
              <li>It is also a primitive value in JavaScript.</li>
              <li>It is often used to indicate that a variable or object does not have a value or that it has been explicitly set to represent nothing.</li>
            </ul>
        
            <p><strong>Differences:</strong></p>
            <ol>
              <li><strong>Assignment:</strong> <code>undefined</code> is automatically assigned to variables that have been declared but not initialized, while <code>null</code> must be assigned explicitly.</li>
              <li><strong>Type:</strong> Both <code>undefined</code> and <code>null</code> are primitive values, but they represent different concepts: absence of value (<code>undefined</code>) and intentional absence or null value (<code>null</code>).</li>
              <li><strong>Behavior:</strong> <code>undefined</code> typically indicates a programming error or unintentional absence of value, while <code>null</code> is often used to represent an intentional absence of value or as a placeholder.</li>
            </ol>
        
            <p><strong>Use Cases:</strong></p>
            <ul>
              <li>Use <code>undefined</code> for variables that have not been initialized or when a function does not return a value.</li>
              <li>Use <code>null</code> to explicitly indicate that a variable or object has no value, or as a placeholder for a value that has not been determined yet.</li>
            </ul>`,
    },
    {
      command: "Closure",
      text: `
            <p><strong>Closure:</strong></p>
            <ul>
              <li>A closure is a combination of a function and the lexical environment within which that function was declared.</li>
              <li>It allows a function to access variables from its outer scope even after that scope has finished executing.</li>
              <li>Closures are created every time a function is created, and they provide a way to maintain state across multiple function calls.</li>
              <li>Closures are commonly used to create private variables and functions in JavaScript.</li>
            </ul>
        
            <p><strong>Example:</strong></p>
            <pre>
              <code>
                function outer() {
                  let count = 0;
        
                  function inner() {
                    count++;
                    console.log(count);
                  }
        
                  return inner;
                }
        
                const increment = outer();
                increment(); // Output: 1
                increment(); // Output: 2
                increment(); // Output: 3
              </code>
            </pre>
        
            <p>In this example, the <code>inner</code> function has access to the <code>count</code> variable from its outer scope, even though the <code>outer</code> function has already finished executing. This is possible because <code>inner</code> forms a closure over the <code>count</code> variable, preserving its value between function calls.</p>
        
            <p><strong>Benefits of Closures:</strong></p>
            <ol>
              <li><strong>Data Encapsulation:</strong> Closures allow you to encapsulate variables and functions, providing a way to hide implementation details and create private members.</li>
              <li><strong>Maintaining State:</strong> Closures enable functions to maintain state across multiple invocations, allowing for more flexible and powerful behavior.</li>
              <li><strong>Callback Functions:</strong> Closures are often used to create callback functions with access to variables from their containing scope, providing a way to pass data between different parts of a program.</li>
            </ol>
        
            <p><strong>Common Use Cases:</strong></p>
            <ul>
              <li><strong>Private Variables and Functions:</strong> Creating private members within an object or module to prevent external access.</li>
              <li><strong>Function Factories:</strong> Generating functions with pre-configured behavior based on input parameters.</li>
              <li><strong>Memoization:</strong> Caching the results of expensive function calls to improve performance.</li>
            </ul>`,
    },
    {
      command: "Asynchronous Javascript",
      text: `
            <p><strong>Asynchronous JavaScript:</strong></p>
            <ul>
              <li>Asynchronous JavaScript refers to code execution that allows other code to run in parallel without blocking the execution of the main program.</li>
              <li>JavaScript is inherently single-threaded, meaning it can only execute one task at a time. However, asynchronous operations allow JavaScript to perform tasks such as I/O operations, network requests, and timers without blocking the main thread.</li>
              <li>Asynchronous operations are essential for building responsive and efficient web applications, especially when dealing with tasks that may take time to complete, such as fetching data from a server or handling user input.</li>
            </ul>
        
            <p><strong>Asynchronous Patterns:</strong></p>
            <ol>
              <li><strong>Callback Functions:</strong> Callback functions are a common pattern for handling asynchronous operations in JavaScript. A callback function is passed as an argument to an asynchronous function and is executed once the operation is complete.</li>
              <li><strong>Promises:</strong> Promises provide a cleaner and more flexible way to handle asynchronous operations compared to callback functions. A Promise represents a value that may be available now, in the future, or never.</li>
              <li><strong>Async/Await:</strong> Async functions and the <code>await</code> keyword provide a more readable and synchronous-like syntax for writing asynchronous code. Async functions return a Promise, and the <code>await</code> keyword pauses the execution of the function until the Promise is settled (resolved or rejected).</li>
            </ol>
        
            <p><strong>Use Cases:</strong></p>
            <ul>
              <li>Performing network requests (e.g., fetching data from an API).</li>
              <li>Handling user input and interactions.</li>
              <li>Timers and scheduling tasks (e.g., setTimeout, setInterval).</li>
            </ul>`,
    },
    {
      command: "Display:None and Visibility:Hidden",
      text: `
            <p><strong>display: none vs visibility: hidden:</strong></p>
            <p>Both <code>display: none</code> and <code>visibility: hidden</code> are CSS properties used to hide elements from view, but they behave differently:</p>
        
            <p><strong>display: none:</strong></p>
            <ul>
              <li><code>display: none</code> removes the element from the document flow, making it completely invisible and taking up no space on the page.</li>
              <li>The element is not rendered at all, and its dimensions (width, height) are zero.</li>
              <li>Elements with <code>display: none</code> are not accessible by assistive technologies and cannot be interacted with.</li>
              <li>Changing an element's display property to <code>none</code> will trigger a reflow and repaint of the page.</li>
            </ul>
        
            <p><strong>visibility: hidden:</strong></p>
            <ul>
              <li><code>visibility: hidden</code> hides the element from view while still occupying space in the document flow.</li>
              <li>The element remains in the DOM and retains its dimensions (width, height).</li>
              <li>Elements with <code>visibility: hidden</code> are still accessible by assistive technologies and can be interacted with (e.g., clicked).</li>
              <li>Changing an element's visibility property to <code>hidden</code> will not trigger a reflow and repaint of the page.</li>
            </ul>
        
            <p>When deciding between <code>display: none</code> and <code>visibility: hidden</code>, consider whether you want the element to be completely removed from the document flow or if you want it to remain in the flow but hidden from view.</p>
          `,
    },
    {
      command: "Css Box Model",
      text: `
            <p><strong>CSS Box Model:</strong></p>
            <p>The CSS Box Model describes the layout and rendering of elements in a web page. It consists of the following components:</p>
        
            <ul>
              <li><strong>Content:</strong> The actual content of the element, such as text, images, or other media.</li>
              <li><strong>Padding:</strong> The space between the content and the element's border. Padding is transparent by default.</li>
              <li><strong>Border:</strong> The border surrounding the padding and content. It can have a width, style, and color.</li>
              <li><strong>Margin:</strong> The space between the element's border and adjacent elements. Margins do not have a background color and do not display any content.</li>
            </ul>`,
    },
    {
      command: "CSS Selectors",
      text: `
            <p><strong>CSS Selectors:</strong></p>
            <p>CSS selectors are patterns used to select and style elements in HTML documents. They specify which elements to target and apply CSS styles to.</p>
        
            <p><strong>Types of CSS Selectors:</strong></p>
            <ul>
              <li><strong>Element Selector:</strong> Selects all elements of a specific type.
                <pre>
                  <code>
                    p &#123;
                      color: blue;
                    &#125;
                  </code>
                </pre>
              </li>
              <li><strong>Class Selector:</strong> Selects elements with a specific class attribute.
                <pre>
                  <code>
                    .example &#123;
                      font-weight: bold;
                    &#125;
                  </code>
                </pre>
              </li>
              <li><strong>ID Selector:</strong> Selects a single element with a specific ID attribute.
                <pre>
                  <code>
                    #header &#123;
                      background-color: gray;
                    &#125;
                  </code>
                </pre>
              </li>
              <li><strong>Attribute Selector:</strong> Selects elements with a specific attribute or attribute value.
                <pre>
                  <code>
                    input[type="text"] &#123;
                      border: 1px solid #ccc;
                    &#125;
                  </code>
                </pre>
              </li>
              <li><strong>Descendant Selector:</strong> Selects elements that are descendants of another element.
                <pre>
                  <code>
                    div p &#123;
                      margin: 0;
                    &#125;
                  </code>
                </pre>
              </li>
              <li><strong>Child Selector:</strong> Selects elements that are direct children of another element.
                <pre>
                  <code>
                    ul > li &#123;
                      list-style-type: none;
                    &#125;
                  </code>
                </pre>
              </li>
            </ul>`,
    },
    {
      command: "CSS Positions",
      text: `
            <p><strong>CSS Positions:</strong></p>
            <p>CSS provides several properties for positioning elements within a document. The most commonly used positions are:</p>
        
            <p><strong>Static:</strong></p>
            <ul>
              <li>The default position value of an element is <code>static</code>.</li>
              <li>Static elements are positioned according to the normal flow of the document.</li>
              <li>They are not affected by the <code>top</code>, <code>right</code>, <code>bottom</code>, and <code>left</code> properties.</li>
            </ul>
        
            <p><strong>Relative:</strong></p>
            <ul>
              <li>Relative positioning moves an element relative to its normal position in the document flow.</li>
              <li>Relative elements can be shifted using the <code>top</code>, <code>right</code>, <code>bottom</code>, and <code>left</code> properties.</li>
              <li>Other elements in the document flow are not affected by the relative positioning of a relative element.</li>
            </ul>
        
            <p><strong>Absolute:</strong></p>
            <ul>
              <li>Absolute positioning removes an element from the normal document flow and positions it relative to its closest positioned ancestor.</li>
              <li>Absolute elements are positioned using the <code>top</code>, <code>right</code>, <code>bottom</code>, and <code>left</code> properties.</li>
              <li>They are not affected by other elements in the document flow.</li>
            </ul>
        
            <p><strong>Fixed:</strong></p>
            <ul>
              <li>Fixed positioning positions an element relative to the viewport (the browser window).</li>
              <li>Fixed elements do not move when the page is scrolled.</li>
              <li>They are commonly used for headers, footers, or navigation bars that should remain visible as the user scrolls.</li>
            </ul>
        
            <p><strong>Sticky:</strong></p>
            <ul>
              <li>Sticky positioning is a hybrid of relative and fixed positioning.</li>
              <li>It acts like relative positioning until the element reaches a specified scroll position, then it "sticks" in place like fixed positioning.</li>
              <li>Sticky elements are positioned using the <code>top</code>, <code>right</code>, <code>bottom</code>, and <code>left</code> properties.</li>
            </ul>`,
    },
    {
      command: "Z-Index",
      text: `
            <p><strong>CSS z-index:</strong></p>
            <p>The <code>z-index</code> property in CSS controls the stacking order of positioned elements.</p>
            <p>Elements with a higher <code>z-index</code> value are stacked above elements with a lower <code>z-index</code> value.</p>
            <p>The <code>z-index</code> property only affects elements that have a <code>position</code> value other than <code>static</code> (the default).</p>
            <p>By default, elements are stacked in the order they appear in the HTML document. However, the <code>z-index</code> property allows you to change the stacking order and control which elements appear on top.</p>
            <p>When two elements overlap, the one with the higher <code>z-index</code> value will appear on top.</p>
            <p>Elements with a higher <code>z-index</code> value are said to have a higher stacking context, which means they can also affect the stacking order of their descendants.</p>`,
    },
    {
      command: "CSS Units",
      text: `
            <p><strong>CSS Units and Differences:</strong></p>
            <p>CSS provides various units for specifying lengths and sizes. Each unit has its own characteristics and use cases:</p>
        
            <p><strong>Absolute Units:</strong></p>
            <ul>
              <li><strong>px (Pixels):</strong> Represents a single dot on a screen. Pixel values do not change with the size of the viewport.</li>
              <li><strong>pt (Points):</strong> Equal to 1/72 of an inch. Used primarily for print stylesheets and typography.</li>
              <li><strong>cm (Centimeters):</strong> Equal to 1/100 of a meter. Provides a real-world measurement unit for lengths.</li>
              <li><strong>mm (Millimeters):</strong> Equal to 1/1000 of a meter. Used for finer real-world measurements.</li>
            </ul>
        
            <p><strong>Relative Units:</strong></p>
            <ul>
              <li><strong>% (Percentage):</strong> Represents a proportion of another value, typically relative to the parent element's size.</li>
              <li><strong>em:</strong> Equal to the computed font-size of the element. Can be used for defining lengths relative to the font size of the element itself.</li>
              <li><strong>rem:</strong> Equal to the computed font-size of the root element (<code>&lt;html&gt;</code>). Provides a way to define lengths relative to the root font size.</li>
              <li><strong>vw (Viewport Width):</strong> Equal to 1% of the width of the viewport. Useful for creating responsive layouts based on the viewport size.</li>
              <li><strong>vh (Viewport Height):</strong> Equal to 1% of the height of the viewport. Similar to <code>vw</code>, but based on viewport height instead of width.</li>
              <li><strong>vmin (Viewport Minimum):</strong> Equal to the smaller value between <code>vw</code> and <code>vh</code>. Useful for ensuring elements fit within the viewport regardless of orientation.</li>
              <li><strong>vmax (Viewport Maximum):</strong> Equal to the larger value between <code>vw</code> and <code>vh</code>. Useful for ensuring elements expand to fill the viewport in either dimension.</li>
            </ul>
        
            <p><strong>Use Cases:</strong></p>
            <ul>
              <li>Absolute units are suitable for defining fixed sizes or dimensions that should remain constant regardless of the context.</li>
              <li>Relative units are more flexible and responsive, adapting to changes in the layout or viewport size.</li>
              <li>Choosing the appropriate unit depends on the specific use case and design requirements.</li>
            </ul>`,
    },
    {
      command: "doctype",
      text: `
            <p><strong>HTML5 Doctype:</strong></p>
            <p>The HTML5 doctype declaration is used to specify the document type and version of HTML being used in a web page. It is placed at the beginning of an HTML document and informs the browser that the page is written using HTML5 syntax.</p>
            <pre>&lt;!DOCTYPE html&gt;</pre>
            <p>It is a simple, standardized declaration that tells the browser to interpret the document as HTML5, enabling modern features and ensuring consistent rendering across different browsers.</p>
            <p>Unlike previous versions of HTML, the HTML5 doctype declaration does not require a document type definition (DTD) reference, making it simpler and easier to use.</p>
            <p>By including the HTML5 doctype declaration at the beginning of your HTML documents, you ensure that the browser renders the page in standards mode, providing a more predictable and consistent rendering behavior.</p>
          `,
    },
    {
      command: "Psuedo Classes and Psuedo elements",
      text: `<p><strong>Pseudo-classes and Pseudo-elements:</strong></p>
            <p>In CSS, pseudo-classes and pseudo-elements are used to style elements based on their state or position in the document:</p>
        
            <p><strong>Pseudo-classes:</strong></p>
            <ul>
              <li>Pseudo-classes are keywords that specify a special state of the selected element(s).</li>
              <li>They are preceded by a colon (<code>:</code>) and are used to style elements based on user interaction or document structure.</li>
              <li>Common pseudo-classes include <code>:hover</code>, <code>:active</code>, <code>:focus</code>, <code>:nth-child()</code>, etc.</li>
              <li>Example: <code>a:hover { color: red; }</code></li>
            </ul>
        
            <p><strong>Pseudo-elements:</strong></p>
            <ul>
              <li>Pseudo-elements create virtual elements in the document tree that can be styled separately from the actual content.</li>
              <li>They are preceded by two colons (<code>::</code>) and are used to style specific parts of an element, such as the first line, first letter, or before/after content.</li>
              <li>Common pseudo-elements include <code>::first-line</code>, <code>::first-letter</code>, <code>::before</code>, <code>::after</code>, etc.</li>
              <li>Example: <code>p::first-line { font-weight: bold; }</code></li>
            </ul>
        
            <p>Pseudo-classes and pseudo-elements provide powerful tools for styling web documents and creating visually appealing user interfaces. Understanding their usage and applying them appropriately can enhance the design and user experience of web pages.</p>
          `,
    },
    {
      command: "Context Api vs Redux",
      text: `
            <p><strong>Context API vs Redux:</strong></p>
            <p>Both Context API and Redux are state management solutions for React applications, but they have different use cases and characteristics:</p>
        
            <p><strong>Context API:</strong></p>
            <ul>
              <li>The Context API is a built-in feature of React that provides a way to share data between components without having to pass props manually through every level of the component tree.</li>
              <li>It allows you to create a global state that can be accessed and updated by any component within the same context.</li>
              <li>Context API is useful for managing global application state, such as user authentication, theme, or language preferences.</li>
              <li>It is simpler and lighter-weight compared to Redux, making it a good choice for smaller applications with less complex state management needs.</li>
            </ul>
        
            <p><strong>Redux:</strong></p>
            <ul>
              <li>Redux is a predictable state container for JavaScript applications, commonly used with React but also compatible with other frameworks and libraries.</li>
              <li>It follows the principles of Flux architecture and provides a centralized store to manage application state, making it easier to maintain and debug large-scale applications.</li>
              <li>Redux uses a unidirectional data flow, where data flows from the store to the components via props, and actions are dispatched to update the state.</li>
              <li>It introduces concepts like actions, reducers, and middleware, which may have a steeper learning curve but offer more control and flexibility over state management.</li>
            </ul>`,
    },
    {
      command: "Pure Component",
      text: `
            <p><strong>Pure Component in React:</strong></p>
            <p>A Pure Component in React is similar to a regular component, but it automatically implements <code>shouldComponentUpdate()</code> with a shallow prop and state comparison.</p>
            
            <p><strong>Characteristics of Pure Components:</strong></p>
            <ul>
              <li>A Pure Component only re-renders if its props or state change.</li>
              <li>It performs a shallow comparison of props and state to determine whether to re-render.</li>
              <li>Shallow comparison means it compares only the references of props and state, not their contents.</li>
              <li>Pure Components are suitable for optimizing performance in React applications by reducing unnecessary re-renders.</li>
              <li>To use a Pure Component, you can extend the <code>React.PureComponent</code> class instead of <code>React.Component</code>.</li>
            </ul>
            
            <p><strong>When to Use Pure Components:</strong></p>
            <ul>
              <li>Use Pure Components when the component's render output depends only on its props and state, and it doesn't rely on any other context or external data.</li>
              <li>They are particularly useful in scenarios where a component frequently re-renders with the same props and state, and you want to avoid unnecessary re-renders.</li>
            </ul>`,
    },
    {
      command: "Controlled and UnControlled Components",
      text: `
            <p><strong>Controlled vs Uncontrolled Components in React:</strong></p>
            <p>Controlled and uncontrolled components are two different approaches to handling form elements in React:</p>
        
            <p><strong>Controlled Components:</strong></p>
            <ul>
              <li>In controlled components, form data is handled by React component state.</li>
              <li>The value of the form elements (such as input, textarea, select) is controlled by the component state, and any changes to the input are handled by React event handlers.</li>
              <li>Controlled components provide a single source of truth for the form data, making it easier to manage and manipulate the data.</li>
              <li>Example: 
                <pre>
                  <code>
                    class ControlledComponent extends React.Component {
                      constructor(props) {
                        super(props);
                        this.state = { value: '' };
                      }
        
                      handleChange = (event) => {
                        this.setState({ value: event.target.value });
                      };
        
                      render() {
                        return (
                          <input 
                            type="text" 
                            value={this.state.value} 
                            onChange={this.handleChange} 
                          />
                        );
                      }
                    }
                  </code>
                </pre>
              </li>
            </ul>
        
            <p><strong>Uncontrolled Components:</strong></p>
            <ul>
              <li>In uncontrolled components, form data is handled by the DOM itself.</li>
              <li>The value of the form elements is not controlled by React component state, but rather by the DOM, using the <code>ref</code> attribute to access the DOM element directly.</li>
              <li>Uncontrolled components are useful when you need to integrate with non-React code or when you want to handle form data imperatively.</li>
              <li>Example:
                <pre>
                  <code>
                    class UncontrolledComponent extends React.Component {
                      constructor(props) {
                        super(props);
                        this.inputRef = React.createRef();
                      }
        
                      handleSubmit = (event) => {
                        event.preventDefault();
                        console.log('Input value:', this.inputRef.current.value);
                      };
        
                      render() {
                        return (
                          <form onSubmit={this.handleSubmit}>
                            <input type="text" ref={this.inputRef} />
                            <button type="submit">Submit</button>
                          </form>
                        );
                      }
                    }
                  </code>
                </pre>
              </li>
            </ul>`,
    },
    {
      command: "Hooks in react",
      text: `
            <p><strong>React Hooks:</strong></p>
            <p>React Hooks are functions that enable functional components to use state and other React features without writing a class.</p>
        
            <p><strong>useState:</strong></p>
            <p>The useState hook allows functional components to manage state. It returns a stateful value and a function to update it.</p>
        
            <p><strong>useEffect:</strong></p>
            <p>The useEffect hook allows functional components to perform side effects in function components. It is similar to componentDidMount, componentDidUpdate, and componentWillUnmount in class components.</p>
        
            <p><strong>useContext:</strong></p>
            <p>The useContext hook allows functional components to consume context that has been created by the useContext Provider component.</p>
        
            <p><strong>useReducer:</strong></p>
            <p>The useReducer hook is an alternative to useState for managing complex state logic. It is similar to the reducer function used in Redux.</p>
        
            <p><strong>useCallback:</strong></p>
            <p>The useCallback hook returns a memoized callback function that only changes if one of the dependencies has changed. It is useful for optimizing performance.</p>
        
            <p><strong>useMemo:</strong></p>
            <p>The useMemo hook returns a memoized value that only recalculates when one of the dependencies has changed. It is useful for optimizing performance.</p>
        
            <p><strong>useRef:</strong></p>
            <p>The useRef hook returns a mutable ref object whose current property is initialized to the passed argument. It is useful for accessing DOM elements or persisting values across renders without causing re-renders.</p>
        
            <p><strong>useImperativeHandle:</strong></p>
            <p>The useImperativeHandle hook customizes the instance value that is exposed to parent components when using the ref attribute with forwardRef.</p>
        
            <p><strong>useLayoutEffect:</strong></p>
            <p>The useLayoutEffect hook is similar to useEffect but fires synchronously after all DOM mutations. It is useful for performing DOM measurements or animations.</p>`,
    },
    {
      command: "Life Cycle Methods",
      text: `
            <p><strong>Lifecycle Methods in React:</strong></p>
            <p>React components have lifecycle methods that allow developers to hook into various points in the component's lifecycle. These methods can be used to perform actions such as initializing state, fetching data, and cleaning up resources.</p>
        
            <p><strong>Mounting Phase:</strong></p>
            <ul>
              <li><code>constructor()</code>: The constructor is called before a component is mounted. It is used for initializing state and binding event handlers.</li>
              <li><code>render()</code>: The render method is called to render the component's UI. It returns JSX representing the component's UI.</li>
              <li><code>componentDidMount()</code>: This method is called after the component has been mounted to the DOM. It is used for performing actions such as fetching data from a server.</li>
            </ul>
        
            <p><strong>Updating Phase:</strong></p>
            <ul>
              <li><code>shouldComponentUpdate()</code>: This method is called before rendering when new props or state are received. It determines whether the component should re-render or not based on the changes in props or state.</li>
              <li><code>render()</code>: The render method is called again to re-render the component's UI if <code>shouldComponentUpdate()</code> returns true.</li>
              <li><code>componentDidUpdate()</code>: This method is called after the component has been updated in the DOM. It is used for performing actions such as updating the DOM in response to prop or state changes.</li>
            </ul>
        
            <p><strong>Unmounting Phase:</strong></p>
            <ul>
              <li><code>componentWillUnmount()</code>: This method is called immediately before a component is unmounted from the DOM. It is used for cleaning up resources such as event listeners or timers.</li>
            </ul>`,
    },
    {
      command: "UseMemo vs UseEffect",
      text: `
            <p><strong>useMemo vs useEffect:</strong></p>
            <p>In React, both useMemo and useEffect are hooks used for managing side effects, but they serve different purposes and have different use cases:</p>
        
            <p><strong>useMemo:</strong></p>
            <ul>
              <li>useMemo is a hook used for memoizing expensive computations and optimizing performance.</li>
              <li>It takes a function and an array of dependencies and returns a memoized value that is computed only when one of the dependencies changes.</li>
              <li>useMemo is useful for preventing unnecessary re-computation of values in situations where the computation is expensive or resource-intensive.</li>
              <li>It is typically used to optimize rendering performance by memoizing the result of a computation and avoiding re-execution of the computation on every render.</li>
            </ul>
        
            <p><strong>useEffect:</strong></p>
            <ul>
              <li>useEffect is a hook used for managing side effects in functional components.</li>
              <li>It runs after every render and allows performing tasks such as data fetching, subscriptions, or manually updating the DOM.</li>
              <li>useEffect takes a function (the effect) and an optional array of dependencies. The effect is re-run if any of the dependencies change.</li>
              <li>useEffect is useful for handling asynchronous operations, performing cleanup, or synchronizing with external APIs.</li>
            </ul>
        
            <p>While useMemo is primarily used for optimizing performance by memoizing values, useEffect is used for managing side effects and performing asynchronous operations in functional components.</p>
          `,
    },
    {
      command: "UseMemo vs UseCallback",
      text: `
            <p><strong>useMemo vs useCallback in React:</strong></p>
            <p>In React, both <code>useMemo</code> and <code>useCallback</code> are hooks used to optimize performance by memoizing values or functions, respectively. While they are similar in purpose, they have different use cases:</p>
        
            <p><strong>useMemo:</strong></p>
            <ul>
              <li><code>useMemo</code> is a hook used to memoize values and avoid unnecessary re-computations.</li>
              <li>It takes a function and an array of dependencies as arguments, and it memoizes the result of the function based on the dependencies.</li>
              <li>The memoized value is computed only when one of the dependencies has changed, preventing unnecessary re-computations.</li>
              <li>Use <code>useMemo</code> when you need to memoize expensive calculations or when you want to optimize the performance of a component by avoiding unnecessary re-renders.</li>
            </ul>
        
            <p><strong>useCallback:</strong></p>
            <ul>
              <li><code>useCallback</code> is a hook used to memoize functions and prevent unnecessary re-creations of function instances.</li>
              <li>It takes a function and an array of dependencies as arguments, and it memoizes the function instance based on the dependencies.</li>
              <li>The memoized function instance is re-created only when one of the dependencies has changed, preventing unnecessary re-renders of components that use the function.</li>
              <li>Use <code>useCallback</code> when you need to optimize the performance of a component by avoiding unnecessary re-creations of function instances, especially when passing functions as props to child components.</li>
            </ul>
        
            <p>While <code>useMemo</code> and <code>useCallback</code> are similar in functionality, they serve different purposes and should be used based on the specific optimization needs of your React components.</p>
          `,
    },
    {
      command: "UseEffect life cycle events",
      text: `
            <p><strong>useEffect with Lifecycle Events in React:</strong></p>
            <p>The useEffect hook in React is used to perform side effects in functional components. It is similar to lifecycle methods in class components, but it's more flexible and concise.</p>
        
            <p><strong>ComponentDidMount:</strong></p>
            <p>Equivalent useEffect with an empty dependency array. It runs once after the first render.</p>
            <pre>
              <code>
                useEffect(() => {
                  // ComponentDidMount logic
                }, []);
              </code>
            </pre>
        
            <p><strong>ComponentDidUpdate:</strong></p>
            <p>Equivalent useEffect with a dependency array. It runs after every render except the first one.</p>
            <pre>
              <code>
                useEffect(() => {
                  // ComponentDidUpdate logic
                });
              </code>
            </pre>
        
            <p><strong>ComponentWillUnmount:</strong></p>
            <p>Equivalent useEffect with a cleanup function. It runs before the component unmounts.</p>
            <pre>
              <code>
                useEffect(() => {
                  return () => {
                    // ComponentWillUnmount logic
                  };
                });
              </code>
            </pre>
        
            <p>With useEffect, you can manage side effects such as data fetching, subscriptions, or manually changing the DOM, making it a powerful tool for working with React components.</p>
          `,
    },
    {
      command: "UseEffect without dependency",
      text: `
            <p><strong>useEffect without Dependency Array:</strong></p>
            <p>In React, the <code>useEffect</code> hook is used to perform side effects in function components. When using <code>useEffect</code> without a dependency array, the effect runs after every render of the component.</p>
        
            <p><strong>Usage:</strong></p>
        
            <p>When <code>useEffect</code> is called without a dependency array, the effect function is executed after every render of the component, including the initial render and subsequent re-renders triggered by state or props changes.</p>
        
            <p>It's important to note that this can lead to performance issues if the effect performs expensive operations or updates the state in a way that causes re-renders. In such cases, it's recommended to specify dependencies to control when the effect should run.</p>
          `,
    },
    {
      command: "Optimization in React",
      text: `
            <p><strong>Optimization Techniques in React:</strong></p>
            <p>React applications can benefit from various optimization techniques to improve performance, reduce rendering time, and enhance the user experience:</p>
        
            <p><strong>1. Memoization:</strong></p>
            <ul>
              <li>Memoization is the process of caching the results of expensive function calls and returning the cached result when the same inputs occur again.</li>
              <li>In React, the <code>React.memo()</code> higher-order component can be used to memoize functional components, preventing unnecessary re-renders.</li>
            </ul>
        
            <p><strong>2. PureComponent and shouldComponentUpdate:</strong></p>
            <ul>
              <li><code>PureComponent</code> is a base class for React components that automatically implements a shallow comparison of props and state to determine if the component should re-render.</li>
              <li><code>shouldComponentUpdate()</code> is a lifecycle method that allows components to control whether they should re-render based on changes in props or state.</li>
            </ul>
        
            <p><strong>3. Virtualized Lists:</strong></p>
            <ul>
              <li>Virtualized lists are used to render large lists efficiently by only rendering the items that are currently visible in the viewport.</li>
              <li>Libraries like react-virtualized and react-window provide components for efficiently rendering large datasets with minimal performance impact.</li>
            </ul>
        
            <p><strong>4. Code Splitting:</strong></p>
            <ul>
              <li>Code splitting is the process of splitting a JavaScript bundle into smaller chunks that can be loaded on demand.</li>
              <li>React.lazy() and Suspense allow components to be loaded asynchronously, reducing the initial bundle size and improving load times.</li>
            </ul>`,
    },
    {
      command: "UseSelector and UseDispatch",
      text: `
            <p><strong>useSelector and useDispatch:</strong></p>
            <p>In React Redux, the <code>useSelector</code> and <code>useDispatch</code> hooks are used to interact with the Redux store:</p>
        
            <p><strong>useSelector:</strong></p>
            <ul>
              <li><code>useSelector</code> is a hook provided by React Redux that allows components to extract data from the Redux store state.</li>
              <li>It accepts a selector function as an argument, which specifies which part of the state should be extracted.</li>
              <li>When the Redux store state changes, the component using <code>useSelector</code> will re-render to reflect the updated data.</li>
            </ul>
        
            <p><strong>useDispatch:</strong></p>
            <ul>
              <li><code>useDispatch</code> is a hook provided by React Redux that returns a reference to the <code>dispatch</code> function of the Redux store.</li>
              <li>It allows components to dispatch actions to update the Redux store state.</li>
              <li>Components can call the <code>dispatch</code> function with an action object as an argument, which typically includes a type and payload.</li>
            </ul>`,
    },
    {
      command: "Higher Order Components",
      text: `
            <p><strong>Higher Order Components (HOCs) in React:</strong></p>
            <p>Higher Order Components (HOCs) are a pattern in React used to enhance the functionality of components by wrapping them with other components.</p>
        
            <p><strong>Characteristics of HOCs:</strong></p>
            <ul>
              <li>HOCs are functions that accept a component as an argument and return a new component with additional functionality.</li>
              <li>HOCs allow for code reuse and abstraction by separating concerns into smaller, reusable components.</li>
              <li>HOCs are used for cross-cutting concerns such as authentication, logging, and code splitting.</li>
              <li>HOCs do not modify the original component; instead, they create a new component that wraps the original one.</li>
              <li>HOCs can be composed together to create complex behaviors by chaining multiple HOCs.</li>
            </ul>`,
    },
    {
      command: "Routing V6",
      text: `
            <p><strong>Routing in React Router v6:</strong></p>
            <p>React Router v6 introduced some changes and improvements over previous versions:</p>
        
            <p><strong>Declarative Routes:</strong></p>
            <ul>
              <li>Routes are now declared using the <code>&lt;Routes&gt;</code> component instead of the <code>&lt;Route&gt;</code> component.</li>
              <li>Nesting routes is more intuitive with the use of nested <code>&lt;Routes&gt;</code> components.</li>
              <li>Routes can be conditionally rendered using the <code>element</code> or <code>children</code> props of the <code>&lt;Route&gt;</code> component.</li>
            </ul>
        
            <p><strong>Route Matching:</strong></p>
            <ul>
              <li>Route matching is now based on the first match found, allowing for more predictable route resolution.</li>
              <li>Exact matching is no longer necessary, and routes are matched in order of declaration.</li>
            </ul>
        
            <p><strong>Navigation:</strong></p>
            <ul>
              <li>Navigation is performed using the <code>useNavigate()</code> hook or the <code>&lt;Link&gt;</code> component.</li>
              <li>Relative navigation is supported, making it easier to navigate within nested routes.</li>
            </ul>`,
    },
    {
      command: "Routing",
      text: `
            <p><strong>Routing in React:</strong></p>
            <p>Routing is the process of navigating between different pages or views in a web application. In React, routing allows us to build single-page applications (SPAs) with multiple views without reloading the page.</p>
        
            <p><strong>React Router:</strong></p>
            <p>React Router is a popular library for handling routing in React applications. It provides a declarative way to define routes and map them to corresponding components.</p>
        
            <p><strong>Key Concepts:</strong></p>
            <ul>
              <li><strong>Route Configuration:</strong> Define routes and their corresponding components using the <code>Route</code> component provided by React Router.</li>
              <li><strong>Route Matching:</strong> React Router uses a matching algorithm to determine which route's component to render based on the current URL.</li>
              <li><strong>Navigation:</strong> Use the <code>Link</code> component provided by React Router to navigate between different routes without reloading the page.</li>
              <li><strong>Route Parameters:</strong> Pass parameters in the URL path to create dynamic routes and access them within the component using the <code>useParams</code> hook.</li>
              <li><strong>Programmatic Navigation:</strong> Navigate to different routes programmatically using history manipulation methods provided by React Router.</li>
            </ul>`,
    },
    {
      command: "Synthetic Events",
      text: `
            <p><strong>Synthetic Events in React:</strong></p>
            <p>In React, synthetic events are a cross-browser wrapper around the browser's native events. They are called "synthetic" because they behave like the native events but are implemented independently to ensure consistent behavior across different browsers.</p>
        
            <p><strong>Key Features of Synthetic Events:</strong></p>
            <ul>
              <li>Synthetic events provide a unified interface for handling events across different browsers, abstracting away the differences in their implementations.</li>
              <li>They are designed to closely resemble the native DOM events, making them familiar to developers who are already familiar with JavaScript event handling.</li>
              <li>Synthetic events automatically handle event delegation and event pooling to optimize performance and memory usage.</li>
              <li>They are compatible with React's component-based architecture and integrate seamlessly with JSX syntax.</li>
            </ul>`,
    },
    {
      command: "Key Prop in react",
      text: `
            <p><strong>Key Prop in React:</strong></p>
            <p>The <code>key</code> prop is a special attribute that is used to uniquely identify elements in a React component's list.</p>
        
            <p><strong>Purpose:</strong></p>
            <ul>
              <li>The <code>key</code> prop helps React identify which items have changed, are added, or are removed from a list, enabling efficient updates to the UI.</li>
              <li>When rendering a list of elements in React, each element should have a unique <code>key</code> prop assigned to it.</li>
            </ul>
        
            <p><strong>Usage:</strong></p>
            <ul>
              <li>The <code>key</code> prop should be assigned a value that uniquely identifies each element in the list, such as an ID or a unique attribute.</li>
              <li>Keys should be stable, predictable, and consistent across renders. Avoid using indexes as keys if the order of items may change.</li>
            </ul>`,
    },
    {
      command: "React routing different from conventional routing",
      text: `
            <p><strong>React Routing vs Conventional Routing:</strong></p>
            <p>In React, routing refers to the navigation between different components or pages within a single-page application (SPA). While React does not have built-in routing functionality, it provides libraries like React Router for handling routing.</p>
        
            <p><strong>React Routing:</strong></p>
            <ul>
              <li>React routing involves managing the UI state of a single-page application to display different components based on the URL or user navigation.</li>
              <li>It uses a declarative approach, where routes are defined as components and rendered based on the current URL.</li>
              <li>React Router is the most commonly used library for implementing routing in React applications. It provides components like <code>BrowserRouter</code>, <code>Route</code>, and <code>Link</code> for defining and navigating between routes.</li>
              <li>React routing allows for a seamless user experience by updating the URL and rendering components dynamically without full-page reloads.</li>
            </ul>
        
            <p><strong>Conventional Routing:</strong></p>
            <ul>
              <li>In conventional web development, routing typically involves server-side routing, where different URLs correspond to different server-side routes that serve HTML pages.</li>
              <li>Each URL typically corresponds to a separate HTML page or endpoint on the server, and navigation between pages involves full-page reloads.</li>
              <li>Conventional routing requires server-side logic to handle routing and serve the appropriate content based on the requested URL.</li>
              <li>It is less common in modern web development, especially for SPAs, where React routing or similar client-side routing libraries are preferred for their improved performance and user experience.</li>
            </ul>`,
    },
    {
      command: "Typescript with React",
      text: `<p><strong>TypeScript:</strong></p>
            <p>TypeScript is a superset of JavaScript that adds static type-checking and other features to the language.</p>
            
            <p><strong>Features of TypeScript:</strong></p>
            <ul>
              <li><strong>Static Typing:</strong> TypeScript allows developers to define types for variables, function parameters, return values, and more. This helps catch type-related errors at compile time.</li>
              <li><strong>Interfaces:</strong> TypeScript introduces the concept of interfaces, which define the structure of objects. Interfaces can be used to enforce consistency and provide documentation.</li>
              <li><strong>Enums:</strong> TypeScript supports enums, which allow developers to define a set of named constants. Enums improve code readability and maintainability.</li>
              <li><strong>Generics:</strong> TypeScript provides support for generics, allowing developers to write reusable code that works with a variety of data types.</li>
              <li><strong>Access Modifiers:</strong> TypeScript introduces access modifiers such as <code>public</code>, <code>private</code>, and <code>protected</code>, which control the visibility of class members.</li>
              <li><strong>Nullability:</strong> TypeScript has built-in support for null and undefined types, helping to avoid common runtime errors.</li>
            </ul>
            
            <p><strong>Usage of TypeScript in React:</strong></p>
            <ul>
              <li><strong>Creating React Components:</strong> TypeScript can be used to define the props and state interfaces for React components, providing type safety and documentation.</li>
              <li><strong>Handling Events:</strong> TypeScript helps ensure that event handlers receive the correct event objects and prevent common errors.</li>
              <li><strong>Managing State:</strong> TypeScript allows developers to define types for state variables, ensuring consistency and catching potential errors.</li>
              <li><strong>Working with APIs:</strong> TypeScript provides type definitions for many popular libraries and APIs, making it easier to work with external data sources.</li>
              <li><strong>Enforcing Contracts:</strong> TypeScript's static type-checking helps enforce contracts between components, improving code reliability and maintainability.</li>
            </ul>`,
    },
    {
      command: "Axios vs Fetch",
      text: `
            <p><strong>Axios vs Fetch:</strong></p>
            <p>Axios and Fetch are both JavaScript libraries used for making HTTP requests in web applications, but they have some differences:</p>
        
            <p><strong>Axios:</strong></p>
            <ul>
              <li>Axios is a popular Promise-based HTTP client for making AJAX requests in modern JavaScript applications.</li>
              <li>It provides a simple and easy-to-use API for making HTTP requests, with support for features like request and response interceptors, automatic JSON data parsing, and error handling.</li>
              <li>Axios works in both browser environments and Node.js, making it a versatile choice for building full-stack applications.</li>
              <li>It has built-in support for handling cross-origin requests and sending requests with different HTTP methods.</li>
              <li>Axios provides a consistent interface for making requests across different browsers and environments.</li>
            </ul>
        
            <p><strong>Fetch:</strong></p>
            <ul>
              <li>Fetch is a built-in web API in modern browsers for making HTTP requests, introduced as part of the Fetch API specification.</li>
              <li>It is a lower-level API compared to Axios and provides a more primitive interface for making requests.</li>
              <li>Fetch uses Promises for handling asynchronous operations, but it lacks some features compared to Axios, such as built-in support for request cancellation, timeout handling, and progress events.</li>
              <li>Fetch has native support for streaming and working with different types of data, including FormData, Blobs, and ArrayBuffers.</li>
              <li>It is recommended for use in modern web applications where browser compatibility is not a concern and when a lightweight solution for making HTTP requests is sufficient.</li>
            </ul>`,
    },
    {
      command: "Axios Interceptors",
      text: `
            <p><strong>Axios Interceptors:</strong></p>
            <p>Axios interceptors allow you to intercept requests or responses before they are handled by the 'axios' instance.</p>
        
            <p><strong>Request Interceptors:</strong></p>
            <ul>
              <li>Request interceptors are functions that are executed before sending a request to the server.</li>
              <li>They can be used to modify the request config, add headers, or perform any other preprocessing.</li>
              <li>Request interceptors can be added using the <code>axios.interceptors.request.use()</code> method.</li>
            </ul>
        
            <p><strong>Response Interceptors:</strong></p>
            <ul>
              <li>Response interceptors are functions that are executed after receiving a response from the server.</li>
              <li>They can be used to modify the response data, handle errors, or perform any other postprocessing.</li>
              <li>Response interceptors can be added using the <code>axios.interceptors.response.use()</code> method.</li>
            </ul>
        
            <p><strong>Use Cases:</strong></p>
            <ul>
              <li><strong>Error Handling:</strong> Intercepting error responses and performing error handling logic.</li>
              <li><strong>Authentication:</strong> Adding authentication headers to requests before they are sent.</li>
              <li><strong>Logging:</strong> Logging request and response data for debugging purposes.</li>
            </ul>
        
            <p>Axios interceptors provide a powerful mechanism for intercepting and modifying HTTP requests and responses in your application.</p>
          `,
    },
    {
      command: "Redux Toolkit",
      text: ` <p><strong>Redux Toolkit:</strong></p>
            <p>Redux Toolkit is the official, recommended way to write Redux logic. It is designed to simplify the process of writing Redux code, making it more efficient and less error-prone.</p>
        
            <p><strong>Features of Redux Toolkit:</strong></p>
            <ul>
              <li><strong>Slice:</strong> Redux Toolkit introduces the concept of "slices," which are predefined collections of reducer logic and actions for a specific slice of the Redux store state. Slices encapsulate related reducer logic and actions, making it easier to manage and organize Redux code.</li>
              <li><strong>createSlice:</strong> The <code>createSlice</code> function is used to define a slice of the Redux store state. It automatically generates action creators and action types based on the reducer logic provided, reducing boilerplate code.</li>
              <li><strong>configureStore:</strong> Redux Toolkit provides the <code>configureStore</code> function, which simplifies the process of creating a Redux store by automatically configuring middleware, including Redux DevTools Extension support, and enabling additional Redux Toolkit features.</li>
              <li><strong>Immutable Updates:</strong> Redux Toolkit uses the Immer library internally to enable immutable updates to the Redux store state. This allows developers to write simpler, more readable code when updating the state, without having to worry about mutating the original state.</li>
              <li><strong>Thunks:</strong> Redux Toolkit includes built-in support for thunks, which are asynchronous action creators. Thunks provide a convenient way to handle asynchronous logic, such as making API requests, and dispatching multiple actions in response to asynchronous events.</li>
            </ul>
        `,
    },
    {
      command: "Promise",
      text: ` <p><strong>Promises in JavaScript:</strong></p>
            <p>A promise is an object representing the eventual completion or failure of an asynchronous operation. It allows you to handle asynchronous code more easily and avoid callback hell.</p>
        
            <p><strong>Promise States:</strong></p>
            <ul>
              <li><strong>Pending:</strong> Initial state, neither fulfilled nor rejected.</li>
              <li><strong>Fulfilled:</strong> The operation completed successfully.</li>
              <li><strong>Rejected:</strong> The operation failed.</li>
            </ul>
        
            <p><strong>Promise Methods:</strong></p>
            <ul>
              <li><strong>Promise.resolve(value):</strong> Creates a resolved promise with the specified value.</li>
              <li><strong>Promise.reject(reason):</strong> Creates a rejected promise with the specified reason.</li>
              <li><strong>Promise.all(iterable):</strong> Returns a single promise that resolves when all of the promises in the iterable argument have resolved or when the iterable contains no promises.</li>
              <li><strong>Promise.race(iterable):</strong> Returns a promise that resolves or rejects as soon as one of the promises in the iterable resolves or rejects, with the value or reason from that promise.</li>
              <li><strong>then(onFulfilled, onRejected):</strong> Adds fulfillment and rejection handlers to the promise.</li>
              <li><strong>catch(onRejected):</strong> Adds a rejection handler to the promise.</li>
              <li><strong>finally(onFinally):</strong> Adds a handler to be called when the promise is settled (fulfilled or rejected).</li>
            </ul>`,
    },
    {
      command: "Async/Await",
      text: ` <p><strong>Async/Await in JavaScript:</strong></p>
            <p>Async/await is a modern JavaScript feature that makes asynchronous code easier to read, write, and maintain.</p>
        
            <p><strong>Async Functions:</strong></p>
            <ul>
              <li>An async function is a function that operates asynchronously via the event loop, using the <code>async</code> keyword.</li>
              <li>Async functions always return a Promise, which resolves with the value returned by the async function or rejects with an error thrown from the function.</li>
              <li>Inside an async function, you can use the <code>await</code> keyword to pause the execution of the function until a Promise is settled (resolved or rejected).</li>
            </ul>
        
            <p><strong>await Keyword:</strong></p>
            <ul>
              <li>The <code>await</code> keyword is used to pause the execution of an async function until a Promise is settled.</li>
              <li>It can only be used inside an async function.</li>
              <li>When <code>await</code> is used, the execution of the async function is paused until the awaited Promise settles, and then the result is returned.</li>
            </ul>
        
            <p><strong>Benefits of Async/Await:</strong></p>
            <ul>
              <li><strong>Readability:</strong> Async/await code is more readable and easier to understand compared to nested callbacks or Promise chains.</li>
              <li><strong>Simplicity:</strong> Async/await simplifies error handling and control flow in asynchronous code.</li>
              <li><strong>Debugging:</strong> Debugging async/await code is easier because it looks and behaves like synchronous code.</li>
            </ul>`,
    },
    {
      command: "Promises vs Async/Await",
      text: `<p><strong>Async/Await vs Promises:</strong></p>
            <p>Async/Await and Promises are both used in JavaScript to handle asynchronous code execution, but they have different syntax and usage:</p>
        
            <p><strong>Promises:</strong></p>
            <ul>
              <li>Promises are objects representing the eventual completion or failure of an asynchronous operation.</li>
              <li>Promises provide a cleaner and more flexible way to handle asynchronous code compared to callback functions.</li>
              <li>Promises have built-in methods (<code>then</code>, <code>catch</code>, <code>finally</code>) for handling success, failure, and completion of asynchronous tasks.</li>
              <li>Promises are chainable, allowing multiple asynchronous operations to be sequenced one after another.</li>
              <li>Example:
                <pre>
                  <code>
                    fetchData(url)
                      .then((data) => {
                        console.log(data);
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  </code>
                </pre>
              </li>
            </ul>
        
            <p><strong>Async/Await:</strong></p>
            <ul>
              <li>Async/Await is a modern syntax introduced in ES8 (ECMAScript 2017) for writing asynchronous code in a synchronous style.</li>
              <li>Async functions return a Promise, and the <code>await</code> keyword is used to pause the execution of the function until the Promise is settled (resolved or rejected).</li>
              <li>Async/Await simplifies error handling and readability of asynchronous code compared to Promises and callback functions.</li>
              <li>Async/Await is especially useful for writing sequential, readable code that performs multiple asynchronous operations.</li>
              <li>Example:
                <pre>
                  <code>
                    async function fetchData() {
                      try {
                        const data = await fetchData(url);
                        console.log(data);
                      } catch (error) {
                        console.error(error);
                      }
                    }
                  </code>
                </pre>
              </li>
            </ul>`,
    },
    {
      command: "Index.js in react",
      text: `<p><strong>index.js in React Root File:</strong></p>
            <p><code>index.js</code> is the entry point for a React application, located in the root directory of the project.</p>
            <p>It is responsible for rendering the root component of the application into the DOM.</p>
            <p>The <code>ReactDOM.render()</code> function is called to render the root component (typically the <code>&lt;App /&gt;</code> component) into a specified HTML element in the DOM.</p>
            <p>Any changes to the root component or its child components will trigger React's virtual DOM reconciliation process, updating the UI as necessary.</p>
            <p><strong>Use Case:</strong></p>
            <p><code>index.js</code> is typically not modified frequently and serves as the entry point for the React application. It sets up the initial rendering of the application and establishes the relationship between React components and the DOM.</p>
          `,
    },
    {
      command: "Authentication using JWT",
      text: ` <p><strong>Implementing Authentication Using JWT Tokens in React:</strong></p>
            <ol>
              <li><strong>User Authentication:</strong> When a user logs in with valid credentials, the server generates a JWT token and sends it back to the client. The client stores the JWT token, usually in local storage or a cookie.</li>
              <li><strong>Sending JWT with Requests:</strong> For subsequent requests to protected routes, the client includes the JWT token in the request headers (commonly in the <code>Authorization</code> header).</li>
              <li><strong>Server-Side Validation:</strong> The server receives the JWT token with each request and verifies its authenticity and validity. If the token is valid, the server responds with the requested data.</li>
              <li><strong>Handling Expired Tokens:</strong> If a JWT token expires, the client needs to handle it by either refreshing the token (if supported by the server) or redirecting the user to the login page to reauthenticate.</li>
            </ol>`,
    },
    {
      command: "Handling sessions in react",
      text: `<p><strong>Handling Sessions in React:</strong></p>
            <ul>
              <li>React is a client-side JavaScript library and does not have built-in support for server-side sessions like traditional server-side frameworks.</li>
              <li>Sessions can still be managed in React applications by leveraging browser features such as localStorage, sessionStorage, or cookies.</li>
              <li>localStorage and sessionStorage are part of the Web Storage API and allow storing key-value pairs in the browser.</li>
              <li>Cookies are small pieces of data stored in the browser and sent with every HTTP request to the server.</li>
            </ul>
        
            <p><strong>Web Storage (localStorage and sessionStorage):</strong></p>
            <ul>
              <li>localStorage and sessionStorage provide simple key-value storage mechanisms in the browser.</li>
              <li>Data stored in localStorage persists even after the browser is closed, while data stored in sessionStorage is cleared when the browser session ends.</li>
            </ul>
        
            <p><strong>Cookies:</strong></p>
            <ul>
              <li>Cookies are widely used for session management in web applications.</li>
              <li>They can be set, retrieved, and deleted using JavaScript or server-side code.</li>
              <li>Cookies have expiration dates and can be set to expire after a certain period.</li>
            </ul>
        
            <p><strong>Security Considerations:</strong></p>
            <ul>
              <li>When storing sensitive data such as authentication tokens, it's essential to consider security implications.</li>
              <li>Always use HTTPS to encrypt data transmitted between the client and server.</li>
              <li>Avoid storing sensitive information in localStorage as it is accessible to JavaScript code running on the same domain.</li>
              <li>Consider using HTTP-only cookies for storing authentication tokens to prevent them from being accessed by client-side JavaScript.</li>
            </ul>`,
    },
    {
      command: "React Portals",
      text: `<p><strong>React Portals:</strong></p>
            <ul>
              <li>React Portals provide a way to render children components into a different part of the DOM hierarchy that is outside of the parent component's DOM hierarchy.</li>
              <li>This allows you to render components into a different DOM element, such as one that is a sibling or ancestor of the parent component.</li>
              <li>Portals are useful for scenarios where you need to render content outside of the normal document flow, such as modals, tooltips, or dropdown menus.</li>
            </ul>
        
            <p><strong>Usage:</strong></p>
            <ol>
              <li>Import the <code>ReactDOM</code> package.</li>
              <li>Create a portal using the <code>ReactDOM.createPortal()</code> method.</li>
              <li>Specify the content to render and the target DOM element to render into.</li>
            </ol>`,
    },
    {
      command: "Fragment vs Div",
      text: `<p><strong>React Fragments vs. <code>&lt;div&gt;</code>:</strong></p>
            <p>React Fragments provide a way to group multiple React elements without introducing an extra DOM element.</p>
            <ul>
              <li><strong>React Fragments:</strong>
                <ul>
                  <li>React Fragments allow grouping elements without adding an extra node to the DOM.</li>
                  <li>They are useful when you need to return multiple elements from a component, but you don't want to add extra divs to the DOM.</li>
                  <li>Syntax: <code>&lt;React.Fragment&gt;</code> or shorthand <code>&lt;&gt;</code>.</li>
                </ul>
              </li>
              <li><strong>&lt;div&gt;:</strong>
                <ul>
                  <li>Using <code>&lt;div&gt;</code> is the traditional way to group elements in React.</li>
                  <li>Each <code>&lt;div&gt;</code> adds an extra node to the DOM, which can affect CSS and JavaScript interactions.</li>
                  <li>It's a valid choice when you need a container element with additional styling or functionality.</li>
                </ul>
              </li>
            </ul>`,
    },
    {
      command: "React.memo",
      text: ` <p><strong>React.memo:</strong></p>
            <ul>
              <li><code>React.memo</code> is a higher-order component in React that memoizes the rendered output of a component.</li>
              <li>It improves the performance of functional components by preventing unnecessary re-renders when the component's props remain the same.</li>
              <li>It is similar to <code>React.PureComponent</code> for class components.</li>
            </ul>
            <p><strong>When to Use:</strong></p>
            <ul>
              <li>Use <code>React.memo</code> for functional components that render the same output given the same input props.</li>
              <li>It is especially useful for optimizing performance in components that receive frequent updates with the same props.</li>
            </ul>
            `,
    },
    {
      command: "Optimization of heavy data in react",
      text: `<p><strong>Optimization of Rendering Large Amounts of Data in React:</strong></p>
            <ul>
              <li><strong>Virtualization:</strong> Use techniques like virtualization to render only the visible portion of the data. Libraries like React Virtualized or react-window can efficiently handle large lists by rendering only the items that are currently in view.</li>
              <li><strong>Pagination:</strong> Implement pagination to fetch and display data in smaller chunks, reducing the initial load time and memory consumption.</li>
              <li><strong>Memoization:</strong> Memoize expensive calculations or data transformations using libraries like React.memo or useMemo to prevent unnecessary re-renders.</li>
              <li><strong>Server-side Rendering (SSR):</strong> Utilize server-side rendering to pre-render the initial page content on the server and send it to the client, reducing the time-to-interactive and improving SEO.</li>
              <li><strong>Optimized Component Lifecycle:</strong> Optimize component lifecycle methods such as shouldComponentUpdate or PureComponent to prevent unnecessary re-renders of components.</li>
            </ul>`,
    },
    {
      command: "SSR VS CSR server side vs client side rendering",
      text: ` <p><strong>SSR (Server-Side Rendering) vs CSR (Client-Side Rendering) in React:</strong></p>
            <p>SSR (Server-Side Rendering) and CSR (Client-Side Rendering) are two different approaches to rendering web pages in React.</p>
        
            <p><strong>SSR (Server-Side Rendering):</strong></p>
            <ul>
              <li>With SSR, the initial HTML content of the web page is generated on the server and sent to the client.</li>
              <li>This means that the server sends a fully rendered HTML page to the browser, including the content of the React components.</li>
              <li>SSR improves performance by reducing the time to first paint and improving SEO, as search engines can crawl the HTML content more easily.</li>
              <li>However, SSR can increase server load and latency, especially for complex web applications.</li>
            </ul>
        
            <p><strong>CSR (Client-Side Rendering):</strong></p>
            <ul>
              <li>With CSR, the initial HTML content of the web page is minimal, usually just a loading spinner or a static placeholder.</li>
              <li>The JavaScript code of the React application is then downloaded and executed in the browser.</li>
              <li>The React components are rendered on the client-side, and the page content is updated dynamically.</li>
              <li>CSR provides a better user experience for interactive web applications, as it allows for faster navigation and dynamic content updates without full page reloads.</li>
              <li>However, CSR can lead to slower initial load times and issues with SEO, as search engines may have difficulty crawling dynamically generated content.</li>
            </ul>`,
    },
    {
      command: "Lazy Loading and code Splitting",
      text: `<p><strong>Lazy Loading and Code Splitting in React:</strong></p>
            <ul>
              <li>Lazy loading and code splitting are techniques used in React to improve performance by reducing the initial bundle size of an application.</li>
              <li><strong>Lazy Loading:</strong> Lazy loading involves delaying the loading of certain parts of the application until they are needed. This can help reduce the initial load time of the application by only loading the necessary code when it is required.</li>
              <li><strong>Code Splitting:</strong> Code splitting involves breaking the application's bundle into smaller chunks, or "chunks," and only loading the required chunks when they are needed. This can help reduce the initial bundle size and improve loading times, especially for larger applications.</li>
              <li>React provides built-in support for lazy loading and code splitting through the <code>React.lazy</code> function and the <code>import()</code> syntax.</li>
              <li>The <code>React.lazy</code> function allows you to dynamically import a component only when it is needed, while the <code>import()</code> syntax allows you to dynamically import other modules and assets.</li>
            </ul>`,
    },
    {
      command: "Primitive vs Referential",
      text: ` <p><strong>Primitive Data Types:</strong></p>
            <ul>
              <li>Primitive data types are immutable and stored directly in memory.</li>
              <li>JavaScript has six primitive data types: <code>string</code>, <code>number</code>, <code>boolean</code>, <code>null</code>, <code>undefined</code>, and <code>symbol</code>.</li>
              <li>Operations on primitive data types directly manipulate the value itself.</li>
            </ul>
        
            <p><strong>Referential Data Types:</strong></p>
            <ul>
              <li>Referential data types are mutable and stored by reference in memory.</li>
              <li>JavaScript has one referential data type: <code>object</code>. and Array is also considered as an object only</code></li>
              <li>Operations on referential data types affect the reference to the value, not the value itself.</li>
            </ul>`,
    },
    {
      command: "scss",
      text: ` <p><strong>SCSS (Sassy CSS):</strong></p>
            <p>SCSS is a superset of CSS that adds powerful features like variables, nesting, mixins, and inheritance. It provides a more structured and efficient way to write CSS code, making stylesheets easier to maintain and manage.</p>
        
            <p><strong>Features of SCSS:</strong></p>
            <ol>
              <li><strong>Variables:</strong> SCSS allows you to define variables to store reusable values, such as colors, font sizes, or spacing. This makes it easy to maintain consistency throughout your stylesheets.</li>
              <li><strong>Nesting:</strong> SCSS allows you to nest CSS selectors within one another, mirroring the HTML structure. This helps to improve readability and reduce repetition in your code.</li>
              <li><strong>Mixins:</strong> Mixins are reusable blocks of CSS that can be included in other selectors. They allow you to define styles once and apply them to multiple elements, reducing code duplication.</li>
              <li><strong>Inheritance:</strong> SCSS supports inheritance, allowing you to extend styles from one selector to another. This promotes code reuse and makes it easier to create variations of existing styles.</li>
            </ol>
        `,
    },
    {
      command: "Ways to add styling in react",
      text: ` <p><strong>All Possible Ways to Apply Styling in React:</strong></p>
            <ol>
              <li><strong>Inline Styles:</strong> Inline styles allow you to apply CSS directly to individual React elements using the <code>style</code> attribute.</li>
              <li><strong>CSS Modules:</strong> CSS Modules allow you to write CSS styles in separate files and import them into your React components. Styles are scoped locally to each component.</li>
              <li><strong>Styled Components:</strong> Styled Components is a library that allows you to write CSS directly within your JavaScript files using tagged template literals.</li>
              <li><strong>CSS-in-JS Libraries:</strong> There are several CSS-in-JS libraries (besides Styled Components) that allow you to write CSS styles directly in JavaScript files.</li>
            </ol>`,
    },
    {
      command: "Web Storages",
      text: `
            <p><strong>Web Storage in HTML:</strong></p>
            <p>Web storage in HTML provides two mechanisms for storing data locally within the user's browser:</p>
            <ul>
              <li><strong>localStorage:</strong> Stores data with no expiration date. Data will persist even after the browser is closed and reopened.</li>
              <li><strong>sessionStorage:</strong> Stores data for one session only. Data is cleared when the browser tab or window is closed.</li>
            </ul>
        
            <p><strong>localStorage:</strong></p>
            <p>localStorage provides a simple key-value storage mechanism that allows you to store data as strings.</p>
            <p>Example:</p>
            <pre>
              <code>
                // Store data
                localStorage.setItem('key', 'value');
        
                // Retrieve data
                const data = localStorage.getItem('key');
                console.log(data); // Output: 'value'
              </code>
            </pre>
        
            <p><strong>sessionStorage:</strong></p>
            <p>sessionStorage works similar to localStorage but is limited to the current session. Data is cleared when the browser tab or window is closed.</p>
            <p>Example:</p>
            <pre>
              <code>
                // Store data
                sessionStorage.setItem('key', 'value');
        
                // Retrieve data
                const data = sessionStorage.getItem('key');
                console.log(data); // Output: 'value'
              </code>
            </pre>`,
    },
    {
      command: "Accessability in HTML5",
      text: `<p><strong>Accessibility in HTML5:</strong></p>
            <p>Accessibility refers to the design of products, devices, services, or environments for people with disabilities. In the context of web development, accessibility aims to ensure that websites and web applications are usable by all people, including those with disabilities.</p>
            <p>HTML5 introduced several features to improve accessibility and make the web more inclusive:</p>
            <ul>
              <li><strong>Semantic Elements:</strong> HTML5 introduced semantic elements such as &lt;header&gt;, &lt;nav&gt;, &lt;main&gt;, &lt;article&gt;, &lt;section&gt;, &lt;footer&gt;, etc., which provide a better structure for web content and make it easier for screen readers and other assistive technologies to interpret the page.</li>
              <li><strong>Accessibility Attributes:</strong> HTML5 added new attributes like <code>role</code>, <code>aria-*</code> attributes (e.g., <code>aria-label</code>, <code>aria-labelledby</code>, <code>aria-describedby</code>), and <code>tabindex</code> to enhance the accessibility of web elements.</li>
              <li><strong>Form Improvements:</strong> HTML5 introduced new input types (e.g., <code>email</code>, <code>tel</code>, <code>url</code>) and attributes (e.g., <code>required</code>, <code>placeholder</code>, <code>autocomplete</code>) that improve the accessibility and usability of web forms.</li>
              <li><strong>Media Elements:</strong> HTML5 media elements like &lt;audio&gt; and &lt;video&gt; support built-in accessibility features such as captions, subtitles, audio descriptions, and transcript support, making multimedia content more accessible.</li>
              <li><strong>Canvas Accessibility:</strong> HTML5 introduced accessibility features for &lt;canvas&gt; elements, allowing developers to provide alternative text descriptions and keyboard navigation for canvas-based content.</li>
              <li><strong>SVG Accessibility:</strong> HTML5 improved accessibility support for Scalable Vector Graphics (SVG), enabling developers to create accessible charts, diagrams, and graphics using SVG.</li>
            </ul>`,
    },
    {
      command: "Webpack",
      text: ` <p><strong>Webpack in React:</strong></p>
            <p>Webpack is a popular module bundler for JavaScript applications. It is commonly used in React projects to bundle and optimize the application's assets, such as JavaScript files, CSS files, and images.</p>
            <p>Webpack allows developers to organize their code into modules and then bundles these modules into a single or multiple output files, known as bundles. This helps improve performance by reducing the number of HTTP requests and optimizing the size of assets.</p>
            <p>Key features of webpack in React include:</p>
            <ul>
              <li><strong>Module Bundling:</strong> Webpack bundles JavaScript modules and their dependencies into static assets.</li>
              <li><strong>Loaders:</strong> Webpack loaders transform non-JavaScript assets, such as CSS, SASS, images, and fonts, into modules that can be used in the application.</li>
              <li><strong>Code Splitting:</strong> Webpack allows splitting the code into multiple bundles, which can be loaded asynchronously, improving the initial loading time of the application.</li>
              <li><strong>Hot Module Replacement (HMR):</strong> Webpack's HMR feature enables developers to see changes in the code reflected immediately in the browser without a full page reload, speeding up the development process.</li>
              <li><strong>Production Optimization:</strong> Webpack offers various optimization techniques, such as minification, tree shaking, and code splitting, to optimize the production build of the application for performance.</li>
            </ul>`,
    },
    {
      command: "configure webpack",
      text: `<p><strong>Configuring Webpack in a React Application:</strong></p>
            <ol>
              <li><strong>Install webpack and webpack-cli:</strong> Use npm or yarn to install webpack and webpack-cli as devDependencies.</li>
              <li><strong>Create a webpack Configuration File:</strong> Create a webpack.config.js file in the root directory of your project and define the webpack configuration.</li>
              <li><strong>Configure Entry and Output:</strong> Specify the entry point and output configuration for bundled files.</li>
              <li><strong>Configure Loaders:</strong> Use loaders to preprocess files before bundling, such as babel-loader for JavaScript files and style-loader/css-loader for CSS files.</li>
              <li><strong>Configure Resolve Extensions:</strong> Ensure webpack can resolve import statements without file extensions.</li>
              <li><strong>Create Scripts in package.json:</strong> Define scripts for building and running the application using webpack.</li>
              <li><strong>Run webpack:</strong> Use npm or yarn scripts to run webpack for development or production builds.</li>
            </ol>`,
    },
    {
      command: "JSX in react",
      text: ` <p><strong>JSX in React:</strong></p>
            <ul>
              <li><strong>Syntax Extension:</strong> JSX allows developers to write XML-like syntax within JavaScript code.</li>
              <li><strong>Familiarity:</strong> JSX resembles HTML, making it easier for developers to create and visualize the structure of their React components.</li>
              <li><strong>JavaScript Expressions:</strong> JSX allows embedding JavaScript expressions within curly braces {} to include dynamic content.</li>
              <li><strong>Transformed to JavaScript:</strong> JSX code is transformed into regular JavaScript by tools like Babel before being executed by the browser.</li>
            </ul>
        
            <p><strong>Benefits of JSX:</strong></p>
            <ol>
              <li><strong>Readability:</strong> JSX improves code readability by providing a declarative syntax for defining UI components.</li>
              <li><strong>Expressiveness:</strong> JSX allows developers to express complex UI structures more intuitively compared to plain JavaScript.</li>
              <li><strong>Integration with JavaScript:</strong> JSX seamlessly integrates with JavaScript expressions, allowing for dynamic content generation.</li>
            </ol>
        
            <p><strong>Use Cases:</strong></p>
            <ul>
              <li><strong>Component Rendering:</strong> JSX is used to define the structure and content of React components.</li>
              <li><strong>Event Handling:</strong> JSX enables the definition of event handlers for user interactions, such as onClick or onChange events.</li>
              <li><strong>Conditional Rendering:</strong> JSX supports conditional rendering using JavaScript expressions, allowing components to render different content based on certain conditions.</li>
            </ul>`,
    },
    {
      command: "Angular vs React",
      text: `<p><strong>Angular vs. React:</strong></p>
            <p>Both Angular and React are popular JavaScript frameworks/libraries for building web applications, but they have different philosophies, architectures, and ecosystems.</p>
        
            <p><strong>Angular:</strong></p>
            <ul>
              <li>Angular is a comprehensive front-end framework developed and maintained by Google.</li>
              <li>It is a full-fledged MVC (Model-View-Controller) framework with batteries included, providing a lot of built-in features and tools out of the box.</li>
              <li>Angular uses two-way data binding, which means changes to the UI are automatically reflected in the application state and vice versa.</li>
              <li>It follows a component-based architecture, where everything is a component, and components are arranged in a tree hierarchy.</li>
              <li>Angular applications are typically written in TypeScript, a superset of JavaScript that adds static typing and other advanced features.</li>
            </ul>
        
            <p><strong>React:</strong></p>
            <ul>
              <li>React is a JavaScript library developed by Facebook for building user interfaces.</li>
              <li>It is focused on the view layer of the MVC architecture, providing a simple and declarative way to create interactive UI components.</li>
              <li>React uses a virtual DOM (Document Object Model) and one-way data flow, making it highly efficient and performant.</li>
              <li>It follows a component-based architecture similar to Angular, but with a more lightweight and flexible approach.</li>
              <li>React applications can be written in plain JavaScript or using JSX (JavaScript XML), a syntax extension that allows mixing HTML-like code with JavaScript.</li>
            </ul>
        
            <p><strong>Differences:</strong></p>
            <ul>
              <li>Angular is a full-fledged framework with a steep learning curve, while React is a lightweight library that is easier to get started with.</li>
              <li>Angular uses two-way data binding, while React uses one-way data flow.</li>
              <li>Angular applications are typically written in TypeScript, while React applications can be written in plain JavaScript or JSX.</li>
              <li>Angular provides more built-in features and tools out of the box, while React relies on a rich ecosystem of third-party libraries and tools.</li>
              <li>Angular has a more opinionated architecture and convention, while React gives developers more flexibility and freedom to choose their preferred tools and patterns.</li>
            </ul>`,
    },
    {
      command: "Block and Inline",
      text: `<p><strong>Block vs Inline Elements:</strong></p>
            <p>HTML elements are categorized into two main types: block-level elements and inline elements.</p>
        
            <p><strong>Block-level Elements:</strong></p>
            <ul>
              <li>Block-level elements typically start on a new line and occupy the full width of their container.</li>
              <li>They create "blocks" of content, which means they start on a new line and stack vertically.</li>
              <li>Examples of block-level elements include &lt;div&gt;, &lt;p&gt;, &lt;h1&gt; - &lt;h6&gt;, &lt;ul&gt;, &lt;ol&gt;, and &lt;li&gt;.</li>
            </ul>
        
            <p><strong>Inline Elements:</strong></p>
            <ul>
              <li>Inline elements do not start on a new line and only occupy the width of their content.</li>
              <li>They are placed within the flow of text and do not break the flow of the content.</li>
              <li>Examples of inline elements include &lt;span&gt;, &lt;a&gt;, &lt;strong&gt;, &lt;em&gt;, and &lt;img&gt;.</li>
            </ul>
        
            <p><strong>Differences:</strong></p>
            <ul>
              <li>Block-level elements start on a new line and occupy the full width of their container, while inline elements do not start on a new line and only occupy the width of their content.</li>
              <li>Block-level elements stack vertically, creating "blocks" of content, whereas inline elements are placed within the flow of text.</li>
              <li>Block-level elements can contain other block-level and inline elements, while inline elements cannot contain block-level elements.</li>
            </ul>
        `,
    },
    {
      command: "Callback hell",
      text: `<p><strong>Callback Hell:</strong></p>
            <ul>
              <li>Callback hell, also known as "pyramid of doom," refers to the situation in JavaScript where multiple nested callback functions create unreadable and difficult-to-maintain code.</li>
              <li>It typically occurs when dealing with asynchronous operations that depend on each other or have complex dependencies.</li>
              <li>Asynchronous functions often use callbacks to handle the result of an operation. When multiple asynchronous operations are nested inside each other, it can lead to deeply nested callbacks, making the code difficult to understand and manage.</li>
            </ul>
        
            <p><strong>Issues with Callback Hell:</strong></p>
            <ul>
              <li><strong>Readability:</strong> Code becomes hard to read and understand due to excessive indentation and nesting.</li>
              <li><strong>Maintainability:</strong> Making changes or debugging nested callback functions can be challenging and error-prone.</li>
              <li><strong>Error Handling:</strong> Error handling becomes more complex and error-prone, leading to potential bugs and unexpected behavior.</li>
            </ul>
        
            <p><strong>Solutions:</strong></p>
            <ol>
              <li><strong>Use Promises:</strong> Promises provide a cleaner and more structured way to handle asynchronous operations, avoiding callback hell.</li>
              <li><strong>Async/Await:</strong> Async functions and the <code>await</code> keyword provide a more readable and synchronous-like syntax for writing asynchronous code, reducing the nesting of callbacks.</li>
              <li><strong>Modularization:</strong> Break down complex operations into smaller, more manageable functions to reduce nesting and improve readability.</li>
            </ol>
        `,
    },
    {
      command: "Currying",
      text: `<p><strong>Currying in JavaScript:</strong></p>
            <p>Currying is a technique in functional programming where a function with multiple arguments is transformed into a sequence of nested functions, each taking a single argument.</p>
            <p>Curried functions allow for partial application, meaning you can create specialized versions of the original function with some of its arguments pre-filled.</p>
            <p>Currying can be implemented manually or using built-in methods like <code>bind()</code> or libraries like lodash.</p>
            `,
    },
    {
      command: "Errors in Javascript",
      text: ` <p><strong>Errors in JavaScript:</strong></p>
            <p>In JavaScript, errors occur when something unexpected happens during the execution of code. Errors can occur due to various reasons, including syntax errors, runtime errors, and logical errors.</p>
            
            <p><strong>Types of Errors:</strong></p>
            <ol>
              <li><strong>Syntax Errors:</strong> Syntax errors occur when the syntax of the code is incorrect and prevents the code from being parsed by the JavaScript engine. These errors are typically detected during the compilation phase.</li>
              <li><strong>Runtime Errors:</strong> Runtime errors occur during the execution of the code when an operation cannot be performed as expected. This can happen due to various reasons, such as division by zero, accessing undefined variables, or calling a method on an undefined object.</li>
              <li><strong>Logical Errors:</strong> Logical errors occur when the code does not produce the expected result due to incorrect logic or algorithmic mistakes. These errors are often challenging to detect and debug because the code runs without throwing any errors.</li>
            </ol>`,
    },
    {
      command: "Implicit type conversion",
      text: `<p><strong>Implicit Type Conversion in JavaScript:</strong></p>
            <ul>
              <li>Implicit type conversion, also known as type coercion, is the automatic conversion of values from one data type to another by the JavaScript engine.</li>
              <li>It occurs when an operator or function expects one data type but receives another, causing JavaScript to convert the values to the expected type.</li>
              <li>Implicit type conversion can lead to unexpected behavior if not understood properly, so it's important to be aware of how JavaScript handles different data types.</li>
            </ul>
        
            <p><strong>Examples of Implicit Type Conversion:</strong></p>
            <ul>
              <li><code>String + Number</code>: The <code>+</code> operator can concatenate strings and numbers, resulting in a string.</li>
              <li><code>Boolean + Number</code>: When a boolean value is used in a numerical context, it is converted to a number (0 for false, 1 for true).</li>
              <li><code>String == Number</code>: The <code>==</code> operator performs type coercion if the operands are of different types, attempting to make them the same type before comparison.</li>
            </ul>
        
            <p>Understanding implicit type conversion is crucial for writing JavaScript code that behaves predictably and avoids common pitfalls.</p>
          `,
    },
    {
      command: "Empty elements in HTML",
      text: ` <p><strong>Empty Elements in HTML5:</strong></p>
            <p>In HTML5, some elements do not require closing tags and are called empty elements or self-closing tags.</p>
            <p>These elements are used to insert content or provide functionality without any inner content.</p>
            <p>Empty elements are written with a single tag, followed by a slash before the closing angle bracket.</p>
            <ul>
              <li><code>&lt;br&gt;</code>: Line break</li>
              <li><code>&lt;img src="..." alt="..."&gt;</code>: Image</li>
              <li><code>&lt;input type="text"&gt;</code>: Input field</li>
              <li><code>&lt;hr&gt;</code>: Horizontal rule</li>
              <li><code>&lt;meta charset="utf-8"&gt;</code>: Metadata</li>
            </ul>
            <p>These elements are used when there is no need for inner content, and they provide specific functionality or display.</p>
        `,
    },
    {
      command: "Lists in HTML5",
      text: `<p><strong>Lists in HTML5:</strong></p>
            <p>HTML5 provides three types of lists:</p>
            <ol>
              <li><strong>Ordered Lists (<code>&lt;ol&gt;</code>):</strong> Ordered lists are lists where each list item is numbered.</li>
              <li><strong>Unordered Lists (<code>&lt;ul&gt;</code>):</strong> Unordered lists are lists where each list item is marked with a bullet point (disc, circle, or square).</li>
              <li><strong>Description Lists (<code>&lt;dl&gt;</code>):</strong> Description lists are lists of term-description pairs, with each term followed by its description.</li>
            </ol>`,
    },
    {
      command: "white space",
      text: `<p><strong>Whitespace in JSX:</strong></p>
            <ul>
              <li>Whitespace in JSX is treated differently from regular HTML.</li>
              <li>In JSX, whitespace between elements and within elements is preserved.</li>
              <li>However, leading and trailing whitespace in multiline JSX expressions is typically ignored.</li>
              <li>Whitespace within HTML tags, such as spaces or line breaks, is also preserved.</li>
            </ul>`,
    },
    {
      command: "Responsive Web Design",
      text: `<p><strong>Responsive Web Design:</strong></p>
            <p>Responsive web design (RWD) is an approach to designing and coding websites to provide an optimal viewing and interaction experience across a wide range of devices, from desktop computers to mobile phones.</p>
            
            <p><strong>Key Principles of Responsive Web Design:</strong></p>
            <ol>
              <li><strong>Fluid Grids:</strong> Designing layouts using relative units like percentages rather than fixed units like pixels to ensure content adapts fluidly to different screen sizes.</li>
              <li><strong>Flexible Images and Media:</strong> Using CSS techniques such as <code>max-width: 100%</code> to ensure images and media scale proportionally within their containing elements.</li>
              <li><strong>Media Queries:</strong> Applying CSS rules conditionally based on characteristics of the device, such as screen width, orientation, and resolution, to adjust the layout and styling accordingly.</li>
            </ol>
        
            <p><strong>Advantages of Responsive Web Design:</strong></p>
            <ul>
              <li><strong>Improved User Experience:</strong> Responsive websites adapt to the user's device, providing an optimal viewing experience and reducing the need for resizing, panning, and scrolling.</li>
              <li><strong>Accessibility:</strong> Responsive design ensures that content is accessible on a wide range of devices, including smartphones, tablets, and desktop computers, enhancing accessibility for users with diverse needs and preferences.</li>
              <li><strong>SEO Benefits:</strong> Google recommends responsive web design as a best practice, and responsive sites tend to perform better in search engine rankings compared to separate mobile and desktop versions.</li>
            </ul>
        
            <p><strong>Conclusion:</strong></p>
            <p>Responsive web design is essential for creating modern websites that provide a seamless and user-friendly experience across various devices. By implementing responsive design principles, developers can ensure that their websites are accessible, visually appealing, and performant on any screen size or device.</p>
        `,
    },
    {
      command: "Specificity",
      text: ` <p><strong>Specificity:</strong></p>
            <p>In CSS, specificity determines which styles are applied to an element when multiple conflicting CSS rules target the same element.</p>
            <p>Specificity is calculated based on the combination of selectors used in a CSS rule.</p>
            <p>The following factors contribute to specificity:</p>
            <ul>
              <li><strong>Inline Styles:</strong> Styles defined directly on an element with the 'style' attribute have the highest specificity.</li>
              <li><strong>ID Selectors:</strong> Selectors targeting an element by its ID (e.g., '#myElement') have higher specificity compared to class selectors and type selectors.</li>
              <li><strong>Class Selectors and Attribute Selectors:</strong> Selectors targeting an element by its class (e.g., '.myClass') or attributes have lower specificity compared to ID selectors but higher than type selectors.</li>
              <li><strong>Type Selectors:</strong> Selectors targeting elements by their type (e.g., 'div', 'p') have the lowest specificity.</li>
            </ul>
            <p>When multiple CSS rules apply to the same element, the rule with the highest specificity takes precedence.</p>
            <p>If two rules have the same specificity, the one that appears last in the CSS file is applied.</p>
        `,
    },
    {
      command: "Clearfix",
      text: `<p><strong>Clearfix:</strong></p>
            <ul>
              <li>Clearfix is a CSS technique used to fix issues related to floated elements within a container.</li>
              <li>When elements are floated within a container, the container may collapse and not expand to contain the floated elements.</li>
              <li>Clearfix involves adding an element with the CSS <code>clear: both;</code> property after the floated elements to force the container to expand and enclose the floated elements.</li>
              <li>It is commonly used to ensure proper layout and prevent layout issues caused by floated elements.</li>
            </ul>
        
            <p><strong>Example:</strong></p>
            <pre>
              <code>
                .container:after {
                  content: "";
                  display: table;
                  clear: both;
                }
        
                &lt;div class="container"&gt;
                  &lt;div class="floated-element" style="float: left;"&gt;Floated Element 1&lt;/div&gt;
                  &lt;div class="floated-element" style="float: right;"&gt;Floated Element 2&lt;/div&gt;
                &lt;/div&gt;
              </code>
            </pre>`,
    },
    {
      command: "Floats",
      text: `<p><strong>Floats in CSS:</strong></p>
            <ul>
              <li>Floats in CSS are used to position elements horizontally within their containing element.</li>
              <li>When an element is floated, it is taken out of the normal flow of the document and shifted to the left or right until it reaches the edge of its containing element or another floated element.</li>
              <li>Floats are commonly used for creating layouts, such as multi-column designs or positioning elements beside each other.</li>
              <li>Floating elements can cause the containing element to collapse, so it's often necessary to clear the float to prevent layout issues.</li>
            </ul>
        
            <p><strong>Clearing Floats:</strong></p>
            <ul>
              <li>Clearing floats is the process of ensuring that a parent element expands to contain its floated children.</li>
              <li>There are several methods for clearing floats, including using the <code>clear</code> property, clearfix techniques, and modern layout methods such as Flexbox and CSS Grid.</li>
            </ul>
        
            <p><strong>Use Cases:</strong></p>
            <ul>
              <li>Creating multi-column layouts.</li>
              <li>Positioning elements beside each other.</li>
              <li>Creating complex page layouts.</li>
            </ul>`,
    },
    {
      command: "How to improve performance of page in CSS",
      text: ` <p><strong>How to Improve Performance Using CSS:</strong></p>
            <p>Improving the performance of a web page using CSS involves several techniques:</p>
            <ol>
              <li><strong>Minification:</strong> Minify CSS files to reduce their size by removing unnecessary whitespace, comments, and redundant code.</li>
              <li><strong>CSS Sprites:</strong> Combine multiple images into a single image sprite to reduce the number of HTTP requests required to load images.</li>
              <li><strong>CSS Transforms and Animations:</strong> Use hardware-accelerated CSS transforms and animations for smoother animations and transitions.</li>
              <li><strong>Lazy Loading:</strong> Lazy load CSS files for components that are not immediately visible on the page to improve initial loading performance.</li>
              <li><strong>CSS Grid and Flexbox:</strong> Use CSS grid and flexbox for layout instead of older layout techniques like floats and positioning for more efficient and responsive layouts.</li>
              <li><strong>Media Queries:</strong> Use media queries to apply different styles based on the screen size, device orientation, or other device characteristics to optimize layout and performance for different devices.</li>
              <li><strong>CSS Frameworks:</strong> Consider using lightweight CSS frameworks or customizing larger frameworks to include only the necessary styles to reduce CSS file size.</li>
              <li><strong>Inlining Critical CSS:</strong> Inline critical CSS directly into the HTML document to reduce render-blocking CSS and improve initial rendering performance.</li>
            </ol>`,
    },
    {
      command: "How many ways we can achieve responsive",
      text: `<p><strong>Responsive Web Design Techniques:</strong></p>
            <ol>
              <li><strong>CSS Media Queries:</strong> Adjust CSS styles based on the width of the viewport or device.</li>
              <li><strong>Viewport Units (vw, vh):</strong> Specify dimensions relative to the viewport size.</li>
              <li><strong>Flexbox:</strong> Create flexible layouts that adapt to different screen sizes.</li>
              <li><strong>CSS Grid:</strong> Define a grid layout for more complex and responsive designs.</li>
              <li><strong>Responsive Images:</strong> Use <code>srcset</code> and <code>sizes</code> attributes to serve different image sizes based on device resolution.</li>
              <li><strong>JavaScript Libraries/Frameworks:</strong> Utilize frameworks like Bootstrap, Material-UI, or Tailwind CSS, which offer responsive components and utilities.</li>
              <li><strong>CSS Frameworks:</strong> Use CSS frameworks like Bootstrap, Foundation, or Bulma, which provide pre-built responsive components and grid systems.</li>
            </ol>
            <p>Implementing responsive design techniques is essential for ensuring your website looks and performs well across various devices and screen sizes.</p>
        `,
    },
    {
      command: "Higher Order Functions",
      text: `<p><strong>Higher-Order Functions in JavaScript:</strong></p>
            <ul>
              <li>A higher-order function is a function that takes one or more functions as arguments or returns a function as its result.</li>
              <li>Higher-order functions enable more concise and expressive code by promoting code reusability and composability.</li>
              <li>They are a fundamental concept in functional programming and are widely used in JavaScript.</li>
            </ul>
        
            <p><strong>Examples of Higher-Order Functions:</strong></p>
            <ul>
              <li><strong>Map:</strong> The <code>map</code> method is a higher-order function that applies a callback function to each element of an array and returns a new array containing the results.</li>
              <li><strong>Filter:</strong> The <code>filter</code> method is a higher-order function that creates a new array with all elements that pass the test implemented by the provided callback function.</li>
              <li><strong>Reduce:</strong> The <code>reduce</code> method is a higher-order function that applies a function against an accumulator and each element in the array to reduce it to a single value.</li>
            </ul>
        
            <p><strong>Benefits of Higher-Order Functions:</strong></p>
            <ul>
              <li><strong>Code Reusability:</strong> Higher-order functions allow you to encapsulate common patterns and behaviors, making it easier to reuse code across different parts of your application.</li>
              <li><strong>Abstraction:</strong> Higher-order functions enable you to abstract away implementation details and focus on the higher-level logic of your program.</li>
              <li><strong>Composition:</strong> Higher-order functions promote code composition, allowing you to combine smaller functions to create more complex behavior.</li>
            </ul>`,
    },
    {
      command: "This Keyword",
      text: ` <p><strong>this Keyword:</strong></p>
            <ul>
              <li>In JavaScript, the <code>this</code> keyword refers to the context in which a function is executed.</li>
              <li>The value of <code>this</code> depends on how a function is called.</li>
              <li>In a global context or outside of any function, <code>this</code> refers to the global object (in the browser, it refers to the <code>window</code> object).</li>
              <li>Inside a function, <code>this</code> can refer to different objects depending on how the function is called.</li>
              <li>Arrow functions do not have their own <code>this</code> value. Instead, they inherit the <code>this</code> value from the enclosing lexical context (the enclosing non-arrow function).</li>
            </ul>`,
    },
    {
      command: "Constructor",
      text: `<p><strong>Constructors in JavaScript:</strong></p>
            <ul>
              <li>A constructor is a special method in JavaScript that is automatically called when an instance of a class or object is created.</li>
              <li>Constructors are typically used to initialize object properties or perform any setup required when creating an instance of a class.</li>
              <li>In JavaScript, constructors are defined using the <code>constructor</code> method within a class.</li>
              <li>The <code>constructor</code> method is called with the <code>new</code> keyword to create a new instance of the class.</li>
              <li>Constructors can take parameters to customize the initialization of objects.</li>
            </ul>`,
    },
    {
      command: "Polyfills",
      text: `  <p><strong>Polyfills in JavaScript:</strong></p>
            <ul>
              <li>Polyfills are code snippets or libraries that provide modern JavaScript features to older browsers that do not support them natively.</li>
              <li>They are used to fill the "gaps" in browser support by implementing missing functionality using JavaScript code.</li>
              <li>Polyfills are particularly useful for ensuring that web applications work consistently across different browsers and versions.</li>
              <li>Common polyfills include those for newer JavaScript features like Promises, Array.prototype.includes, and Object.assign.</li>
            </ul>
        
            <p><strong>Using Polyfills:</strong></p>
            <ul>
              <li>To use a polyfill, you typically include the polyfill script at the beginning of your JavaScript bundle or HTML document.</li>
              <li>Polyfills can be included individually for specific features or bundled together using tools like Polyfill.io.</li>
            </ul>`,
    },
    {
      command: "Treeshaking",
      text: ` <p><strong>Tree Shaking:</strong></p>
            <ul>
              <li>Tree shaking is a technique used in modern JavaScript build tools, such as Webpack, to eliminate dead code from the final bundle.</li>
              <li>It works by analyzing the codebase and only including the code that is actually used, thus reducing the size of the bundle and improving performance.</li>
              <li>Tree shaking relies on the static structure of ES6 modules, which allows tools to determine which code can be safely removed.</li>
              <li>It is particularly useful for optimizing large libraries and frameworks where not all features are used in a project.</li>
            </ul>
        
            <p><strong>How Tree Shaking Works:</strong></p>
            <ol>
              <li><strong>Static Analysis:</strong> Tree shaking tools statically analyze the codebase to determine the dependencies between modules.</li>
              <li><strong>Marking Unused Code:</strong> Unused code is marked as dead code during the analysis phase.</li>
              <li><strong>Removal of Dead Code:</strong> During the bundling process, dead code is eliminated from the final bundle, resulting in a smaller package size.</li>
            </ol>
        
            <p><strong>Benefits of Tree Shaking:</strong></p>
            <ul>
              <li><strong>Reduced Bundle Size:</strong> Eliminating dead code reduces the size of the bundle, resulting in faster load times and improved performance.</li>
              <li><strong>Improved Efficiency:</strong> Developers can focus on writing expressive code without worrying about unnecessary dependencies affecting the final bundle size.</li>
              <li><strong>Better User Experience:</strong> Smaller bundle sizes lead to faster page load times, which contributes to a better user experience.</li>
            </ul>
        
            <p><strong>Considerations:</strong></p>
            <ul>
              <li>Tree shaking works best with ES6 module syntax, as it allows for better static analysis of dependencies.</li>
              <li>Some code patterns, such as dynamic imports and CommonJS modules, may not be fully compatible with tree shaking.</li>
              <li>Regular maintenance of dependencies and keeping them up-to-date is essential to take advantage of the latest tree shaking optimizations.</li>
            </ul>`,
    },
    {
      command: "Object.freeze()",
      text: ` <p><strong>Object.freeze():</strong></p>
            <ul>
              <li><code>Object.freeze()</code> is a method in JavaScript that freezes an object, preventing new properties from being added to it, existing properties from being removed or changed, and preventing its prototype chain from being modified.</li>
              <li>Once an object is frozen, it becomes immutable.</li>
              <li>Attempts to modify a frozen object will be ignored, and an error will not be thrown in strict mode.</li>
              <li><code>Object.freeze()</code> is shallow, meaning it only freezes the immediate properties of the object and does not recursively freeze nested objects.</li>
            </ul>`,
    },
    {
      command: "Debouncing",
      text: ` <p><strong>Debouncing:</strong></p>
            <p>Debouncing is a technique used in JavaScript to ensure that a function is not executed until after a certain amount of time has passed since the last time it was invoked.</p>
            <p>It is commonly used in scenarios where a function is triggered repeatedly (e.g., user input events such as typing or scrolling) and you want to delay executing the function until the user has finished performing the action.</p>
            <p>Debouncing helps to improve performance and optimize resource usage by preventing excessive function calls.</p>
        `,
    },
    {
      command: "Throttling",
      text: `<p><strong>Throttling:</strong></p>
            <p>Throttling is a technique used to limit the rate at which a function is invoked. It ensures that the function is not called more frequently than a specified threshold, typically to improve performance or prevent excessive resource consumption.</p>
        
            <p><strong>How Throttling Works:</strong></p>
            <p>When throttling a function, only the first invocation within the specified time interval (threshold) is executed immediately. Subsequent invocations that occur before the threshold has elapsed are ignored. Once the threshold has passed, the function becomes available for invocation again.</p>
        `,
    },
    {
      command: "CORS",
      text: ` <p><strong>CORS (Cross-Origin Resource Sharing):</strong></p>
            <ul>
              <li>CORS is a security feature implemented by web browsers to restrict cross-origin HTTP requests that are initiated by scripts running on a webpage.</li>
              <li>It is a mechanism that allows servers to specify which origins are permitted to access their resources.</li>
              <li>By default, web browsers restrict cross-origin requests for security reasons. Without CORS, scripts on one origin (domain) cannot access resources on another origin.</li>
              <li>CORS policies are enforced by the browser, and they are implemented using HTTP headers exchanged between the client and server during the request-response cycle.</li>
            </ul>
        
            <p><strong>Key Concepts:</strong></p>
            <ul>
              <li><strong>Origin:</strong> An origin consists of the protocol (e.g., http://), domain (e.g., example.com), and port (if specified). Two pages have the same origin if all three parts match.</li>
              <li><strong>Same-Origin Policy:</strong> The same-origin policy is a security feature that restricts how a document or script loaded from one origin can interact with resources from another origin.</li>
              <li><strong>Cross-Origin Request:</strong> A cross-origin request occurs when a webpage from one origin attempts to fetch or interact with resources from another origin.</li>
              <li><strong>CORS Headers:</strong> CORS policies are enforced using HTTP headers, such as <code>Access-Control-Allow-Origin</code>, <code>Access-Control-Allow-Methods</code>, <code>Access-Control-Allow-Headers</code>, etc.</li>
            </ul>
        
            <p><strong>Use Cases:</strong></p>
            <ul>
              <li>Fetching data from an API hosted on a different domain.</li>
              <li>Embedding resources (e.g., fonts, scripts) from external origins.</li>
              <li>Implementing cross-origin communication between web applications.</li>
            </ul>`,
    },
    {
      command: "Real vs Virtual DOM",
      text: ` <p><strong>Virtual DOM vs Real DOM:</strong></p>
            <ul>
              <li>The <strong>Real DOM</strong> (Document Object Model) is the actual tree structure of HTML elements created by the browser when a web page is loaded.</li>
              <li>The <strong>Virtual DOM</strong> is a lightweight copy of the Real DOM maintained by frameworks like React.</li>
              <li>When changes are made to the UI in React, the changes are first made to the Virtual DOM instead of directly manipulating the Real DOM.</li>
              <li>React then compares the Virtual DOM with the previous state of the Virtual DOM (diffing) to identify the minimal set of changes needed to update the Real DOM.</li>
              <li>Finally, React updates the Real DOM with only the necessary changes, resulting in improved performance and efficiency.</li>
            </ul>
        
            <p><strong>Benefits of Virtual DOM:</strong></p>
            <ul>
              <li><strong>Performance:</strong> Updating the Virtual DOM is faster than updating the Real DOM because the Virtual DOM is an in-memory representation.</li>
              <li><strong>Efficiency:</strong> React's diffing algorithm optimizes updates to the Real DOM by minimizing the number of DOM manipulations.</li>
              <li><strong>Abstraction:</strong> Developers can work with a familiar, declarative API (React components) without worrying about low-level DOM manipulation.</li>
            </ul>
        
            <p><strong>Use Cases:</strong></p>
            <ul>
              <li>Building complex user interfaces with dynamic data and interactive components.</li>
              <li>Optimizing performance in web applications by reducing unnecessary DOM manipulations.</li>
              <li>Improving developer productivity by providing a high-level abstraction for working with the DOM.</li>
            </ul>`,
    },
    {
      command: "React Mixins",
      text: ` <p><strong>React Mixins:</strong></p>
            <ul>
              <li>React mixins are a way to share reusable code between React components.</li>
              <li>They allow you to encapsulate logic and share it across multiple components without inheritance.</li>
              <li>Mixins are defined as objects that contain reusable code and can be applied to multiple components.</li>
            </ul>
        
            <p><strong>Using Mixins:</strong></p>
            <ul>
              <li>To use a mixin in a component, you need to include it using the <code>mixins</code> property in the component's definition.</li>
              <li>Once included, the methods and properties defined in the mixin become available to the component.</li>
            </ul>`,
    },
    {
      command: "useReducer vs useRef",
      text: `<p><strong>useReducer vs useRef:</strong></p>
            <p><strong>useReducer:</strong></p>
            <ul>
              <li><code>useReducer</code> is a hook used for managing complex state logic in React.</li>
              <li>It is an alternative to <code>useState</code> when the state logic is more complex and involves multiple sub-values or when the next state depends on the previous one.</li>
              <li><code>useReducer</code> accepts a reducer function and an initial state, returning the current state and a dispatch function to dispatch actions to update the state.</li>
              <li>It is commonly used with the <code>dispatch</code> function to perform state updates based on dispatched actions.</li>
            </ul>
        
            <p><strong>useRef:</strong></p>
            <ul>
              <li><code>useRef</code> is a hook used for accessing and persisting mutable values across renders.</li>
              <li>It returns a mutable ref object whose <code>.current</code> property is initialized to the passed argument (initialValue).</li>
              <li>Unlike state variables created with <code>useState</code>, the value returned by <code>useRef</code> persists across component re-renders without causing re-renders.</li>
              <li>Common use cases for <code>useRef</code> include accessing DOM elements, storing previous values, and avoiding re-execution of effects.</li>
            </ul>
        
            <p><strong>Differences:</strong></p>
            <ul>
              <li><code>useReducer</code> is primarily used for managing state logic and performing state updates based on dispatched actions.</li>
              <li><code>useRef</code> is primarily used for accessing and persisting mutable values across renders, especially for values that should not trigger re-renders.</li>
              <li>While <code>useReducer</code> returns a state value and a dispatch function, <code>useRef</code> returns a mutable ref object.</li>
            </ul>`,
    },
    {
      command: "error boundaries in react",
      text: ` <p><strong>Error Boundaries in React:</strong></p>
          <ul>
            <li>Error boundaries are React components that catch JavaScript errors anywhere in their child component tree.</li>
            <li>They provide a way to gracefully handle errors and prevent the entire application from crashing.</li>
            <li>Error boundaries work like JavaScript catch blocks but for React components.</li>
            <li>When an error occurs in a component inside the error boundary, React will call the static method componentDidCatch(error, info) of the error boundary component.</li>
            <li>The componentDidCatch() method allows the error boundary component to log the error, display a fallback UI, and inform the user that something went wrong.</li>
            <li>Error boundaries only catch errors that occur in their own component tree. They do not catch errors in event handlers, asynchronous code (e.g., setTimeout or requestAnimationFrame callbacks), or during server-side rendering.</li>
            <li>You can define multiple error boundary components in your application to handle different sections of the UI.</li>
            <li>Error boundaries are useful for building robust and reliable React applications by gracefully handling errors and providing a better user experience.</li>
          </ul>`,
    },
    {
      command: "Hooks in redux",
      text: `<p><strong>Hooks in Redux:</strong></p>
          <p>React Redux provides hooks that allow you to interact with the Redux store and dispatch actions in functional components.</p>
      
          <p><strong>useSelector:</strong></p>
          <ul>
            <li>The useSelector hook allows you to extract data from the Redux store state in functional components.</li>
            <li>It accepts a selector function as an argument, which is called with the entire Redux store state and returns the desired data.</li>
            <li>The hook automatically subscribes to the Redux store, so it will re-render the component whenever the selected data changes.</li>
          </ul>
      
          <p><strong>useDispatch:</strong></p>
          <ul>
            <li>The useDispatch hook allows you to dispatch actions to the Redux store in functional components.</li>
            <li>It returns a reference to the dispatch function provided by the Redux store.</li>
            <li>You can use this function to dispatch actions from anywhere in your functional components.</li>
          </ul>`,
    },
    {
      command: "ways to copy object",
      text: `<p><strong>Ways to Copy Objects in JavaScript:</strong></p>
          <ol>
            <li><strong>Object.assign():</strong> Copies the values of all enumerable own properties from one or more source objects to a target object.</li>
            <li><strong>Spread Operator (...):</strong> Creates a shallow copy of an object by spreading its properties into a new object literal.</li>
            <li><strong>JSON.parse() and JSON.stringify():</strong> Converts an object to a JSON string and then parses the JSON string to create a deep copy of the object.</li>
            <li><strong>Object.create():</strong> Creates a new object with the specified prototype object and properties.</li>
            <li><strong>Looping through properties:</strong> Manually iterate over the properties of the object and copy them to a new object.</li>
          </ol>`,
    },
    {
      command: "shallow copy and deep copy",
      text: ` <p><strong>Shallow Copy:</strong></p>
          <ul>
            <li>A shallow copy of an object creates a new object with the same top-level structure as the original object.</li>
            <li>However, the properties of the new object are references to the same objects as the properties of the original object.</li>
            <li>Modifying a property of the new object will affect the corresponding property in the original object, and vice versa.</li>
            <li>Shallow copy can be achieved using various methods, such as Object.assign(), spread operator (...), or Array.prototype.slice() for arrays.</li>
          </ul>
      
          <p><strong>Deep Copy:</strong></p>
          <ul>
            <li>A deep copy of an object creates a completely new object with its own copies of all nested objects and properties.</li>
            <li>Modifying a property of the deep copy will not affect the corresponding property in the original object, and vice versa.</li>
            <li>Deep copy is more complex to implement than shallow copy and requires recursion to copy nested objects.</li>
            <li>Deep copy can be achieved using various methods, such as JSON.parse(JSON.stringify(obj)), libraries like lodash, or custom recursive functions.</li>
          </ul>
      
          <p><strong>Use Cases:</strong></p>
          <ul>
            <li><strong>Shallow Copy:</strong> Useful when you only need a surface-level copy of an object and don't want to duplicate nested objects.</li>
            <li><strong>Deep Copy:</strong> Useful when you need to create a completely independent copy of an object, including all nested objects and properties.</li>
          </ul>`,
    },
    {
      command: "Redux Thunk and redux Saga",
      text: ` <p><strong>Redux Thunk:</strong></p>
          <ul>
            <li>Redux Thunk is a middleware for Redux that allows you to write asynchronous logic in Redux action creators.</li>
            <li>It enables action creators to return functions instead of plain action objects.</li>
            <li>These functions can dispatch multiple actions and perform asynchronous operations, such as API calls, before dispatching the final action.</li>
            <li>Redux Thunk intercepts these functions and invokes them with the 'dispatch and 'getState' functions of the Redux store.</li>
          </ul>
      
          <p><strong>Redux Saga:</strong></p>
          <ul>
            <li>Redux Saga is a middleware for Redux that allows you to handle side effects, such as asynchronous operations and complex control flow, in a more structured way.</li>
            <li>It uses ES6 generator functions to define sagas, which are long-running processes that can listen for specific Redux actions and trigger other actions in response.</li>
            <li>Redux Saga provides a declarative approach to managing asynchronous operations, making it easier to test and reason about complex asynchronous behavior.</li>
            <li>It offers built-in support for handling complex scenarios like cancellation, retry, and debouncing.</li>
          </ul>
      
          <p><strong>Differences:</strong></p>
          <ul>
            <li><strong>Redux Thunk:</strong>
              <ul>
                <li>Uses functions as action creators.</li>
                <li>Allows asynchronous logic in action creators.</li>
                <li>Works well for simpler asynchronous operations.</li>
              </ul>
            </li>
            <li><strong>Redux Saga:</strong>
              <ul>
                <li>Uses ES6 generator functions to define sagas.</li>
                <li>Provides a more structured approach to handling asynchronous operations.</li>
                <li>Works well for complex asynchronous scenarios and long-running processes.</li>
              </ul>
            </li>
          </ul>
      
          <p><strong>Use Cases:</strong></p>
          <ul>
            <li><strong>Redux Thunk:</strong> Suitable for applications with simpler asynchronous logic, such as basic API calls and data fetching.</li>
            <li><strong>Redux Saga:</strong> Ideal for applications with complex asynchronous requirements, such as real-time updates, event handling, and advanced control flow.</li>
          </ul>`,
    },
    {
      command: "Generator function",
      text: `<p><strong>Generator Function in JavaScript:</strong></p>
          <ul>
            <li>A generator function is a special type of function in JavaScript that can be paused and resumed during its execution.</li>
            <li>It is defined using the function* syntax (with an asterisk after the function keyword).</li>
            <li>Generator functions use the yield keyword to pause execution and return a value to the caller.</li>
            <li>When a generator function is called, it returns a generator object that can be iterated over using a for...of loop or by calling the next() method on the generator object.</li>
            <li>Each time the next() method is called on the generator object, the generator function resumes execution from the point where it was paused.</li>
            <li>Generator functions are useful for implementing custom iteration behavior, asynchronous programming, and lazy evaluation.</li>
          </ul>`,
    },
    {
      command: "Css Grid and Flex",
      text: `<p><strong>CSS Grid and Flexbox:</strong></p>
          <p>CSS Grid and Flexbox are two powerful layout systems in CSS that allow developers to create complex and responsive layouts with ease.</p>
      
          <p><strong>CSS Grid:</strong></p>
          <ul>
            <li>Provides a two-dimensional grid-based layout system.</li>
            <li>Allows precise control over both rows and columns.</li>
            <li>Supports aligning items both horizontally and vertically.</li>
            <li>Useful for creating complex layouts, such as grids, card layouts, and multi-column designs.</li>
          </ul>
      
          <p><strong>Flexbox:</strong></p>
          <ul>
            <li>Provides a one-dimensional layout system, either in a row or a column.</li>
            <li>Allows flexible and dynamic alignment and distribution of items along the main axis and cross axis.</li>
            <li>Best suited for arranging items in a single direction, such as navigation menus, sidebars, and flexible content containers.</li>
          </ul>
      
          <p><strong>Differences:</strong></p>
          <ul>
            <li><strong>CSS Grid:</strong> Two-dimensional layout, precise control over rows and columns, best for complex layouts.</li>
            <li><strong>Flexbox:</strong> One-dimensional layout, flexible alignment and distribution, best for arranging items in a single direction.</li>
          </ul>
      
          <p><strong>Use Cases:</strong></p>
          <ul>
            <li><strong>CSS Grid:</strong> Complex layouts, grid-based designs, magazine-style layouts.</li>
            <li><strong>Flexbox:</strong> Navigation menus, sidebars, flexible content containers, centering elements.</li>
          </ul>`,
    },
    {
      command: "Selection Sort Implementation",
      text: `
          <p><strong>Selection Sort:</strong> Selection Sort is a sorting algorithm. It works by selecting the smallest (or largest) element from given array and swapping it with the element at the current position.</p>
        <p><strong>Time Complexity:</strong></p>
        <ul>
            <li><strong>Best, Worst, and Average Case:</strong> O(n²), where n is the number of elements.</li>
            <li><strong>Space Complexity:</strong> O(1) because it sorts the array in-place with no extra space required.</li>
        </ul>
       <pre style="font-size: 10px;">
    <code>
function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
    return arr;
}

// Example usage:
const arr = [55, 20, 10,28, 18];
console.log(selectionSort(arr));
// Output: [10,18,20, 28, 55]
    </code>
</pre>

          `,
    },
    {
      command: "Bubble Sort Implementation",
      text: `
      <p><strong>Bubble Sort:</strong> Bubble Sort is a simple sorting algorithm,it pushes the maximum element to the last by adjacent swaps.</p>
      <p><strong>Optimization:</strong> In the optimized version of Bubble Sort, we can stop early if no elements were swapped,indicating that the list is already sorted.</p>
      <p><strong>Time Complexity:</strong></p>
      <ul>
          <li><strong>Best Case:</strong> O(n) – When the array is already sorted, only one pass is needed.</li>
          <li><strong>Average and Worst Case:</strong> O(n²) – In the case of a completely unsorted array.</li>
      </ul>
      <pre style="font-size: 14px;">
          <code>
function bubbleSort(arr) {
  let n = arr.length;
  let swapped;

  for (let i = 0; i < n - 1; i++) {
      swapped = false;

      // Inner loop: Traverse the array from 0 to n-i-1
      // Last i elements are already sorted

      for (let j = 0; j < n - i - 1; j++) {
          if (arr[j] > arr[j + 1]) {
              // Swap if the element is greater than the next element
              [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

              swapped = true; // Mark that a swap has occurred
          }
      }

      if (!swapped) {
          break; 
      }
  }

  return arr;
}

// Example usage:
const arr = [55, 20, 10,28, 18];
console.log(bubbleSort(arr));
// Output: [10,18,20, 28, 55]
          </code>
      </pre>
  `,
    },
    {
      command: "Insertion Sort Implementation",
      text: `
      <p><strong>Insertion Sort:</strong> Insertion Sort is a sorting algorithm it going to pick an element and kept at right position by swaping.</p>
      <p><strong>Why is Insertion Sort Efficient for Almost Sorted Arrays?</strong></p>
      <ul>
          <li><strong>Efficient for nearly sorted arrays:</strong>Only outer loop was iterate once,while loop doesnt exceute.</li>
          <li><strong>Best Case (already sorted):</strong> O(n) because no shifts or swaps are needed.</li>
          <li><strong>Worst Case (reversely sorted):</strong> O(n²) because every element must be compared and shifted.</li>
      </ul>
      <pre style="font-size: 14px;margin-right:100px;">
          <code>
function insertionSort(arr) {
    let n = arr.length;
     
    for (let i = 1; i < n; i++) {
        let j = i;

        // checking is any prev ele is greater
        // than present ele
        while (j > 0 && arr[j - 1] > arr[j]) {
            // Swap prev and present ele
            let temp = arr[j - 1];
            arr[j - 1] = arr[j];
            arr[j] = temp;

            // Move to previous index
            j--;
        }
    }

    return arr;
}

// Example usage:
let arr = [12, 11, 13, 5, 6];
insertionSort(arr); 
// Output:[5,6,11,12,13]
            </code>
      </pre>
  `,
    },
  ];

  // const { listening, browserSupportsContinuousListening } =
  //   useSpeechRecognition();
  // const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
  //   useSpeechRecognition({ commandss });

    const [text, setText] = useState("");
    const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    const userId = localStorage.getItem("userInfo");
    //   const userId = Cookies.get("userInfo")
    //   const userId = sessionStorage.getItem("userInfo");
    if (!userId) {
      navigate("/login");
    }
    if (userId) {
      axios
        .get("https://gallant-69c58-default-rtdb.firebaseio.com/users.json")
        .then((response) => {
          const fetchedData = response.data;
          const userExisitingData = fetchedData[userId];
          console.log(fetchedData);

          const name = userExisitingData?.firstname;
          setuserName(name);
        });
    }
  }, [navigate]);

  const handleBeforeUnload = (event) => {
    try {
      const navigationTiming = performance.getEntriesByType("navigation")[0];
      if (
        navigationTiming.type !== "reload" &&
        navigationTiming.type !== "back_forward" &&
        navigationTiming.type !== "navigate"
      ) {
        // If the page is being unloaded (i.e., the browser window is being closed), clear localStorage
        localStorage.clear();
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  window.addEventListener("beforeunload", handleBeforeUnload);

  const chatRef = ref(database, `text${userId}`);
  set(chatRef, { transcript })
    .then(() => {
      console.log("Added Successfully to Firebase");
    })
    .catch((error) => {
      console.error("Error adding data to Firebase: ", error);
    });

  const filteredCommands =
    commandss?.filter((command) =>
      command.command.toLowerCase().includes(searchInput.toLowerCase())
    ) || commandss;

  const handleSignOut = () => {
    const user = localStorage.getItem("userInfo");
    if (user) {
      localStorage.removeItem("userInfo");
      navigate("/login");
    }
  };

  const formatTextToHTML = (text) => {
    let sentences = text.split(/[.\n]+/).filter(Boolean);
    let formattedHTML = `<ul>${sentences.map(sentence => `<li>${sentence.trim()}</li>`).join("")}</ul>`;
    return formattedHTML;
  };

  // const handleSendButton =() => {
  //   handleResetMicData()
  //   const chatInputData = text || transcript ;
  //   setButtonsPopUp(true);
  //   if (userId && chatInputData.trim() !== "") {
  //     const chatRef = ref(database, `data${userId}`);
  //     set(chatRef, { chatInputData })
  //       .then(() => {})
  //       .catch((error) => {
  //         console.error("Error adding data to Firebase: ", error);
  //       });
  //   }
  //   SpeechRecognition.stopListening()
  //   setTimeout(() => {
  //     setButtonsPopUp(false);
  //   }, 600);
  // };

  const handleSendButton = () => {
    handleResetMicData();
    let chatInputData = text || transcript;
  
    // Function to check if string contains HTML tags
    const containsHTML = (str) => /<\/?[a-z][\s\S]*>/i.test(str);
  
    // If 'text' is plain, convert it into structured HTML
    if (!containsHTML(text) && text) {
      chatInputData = formatTextToHTML(text);
    }
  
    setButtonsPopUp(true);
  
    if (userId && chatInputData.trim() !== "") {
      const chatRef = ref(database, `data${userId}`);
      set(chatRef, { chatInputData })
        .then(() => {})
        .catch((error) => {
          console.error("Error adding data to Firebase: ", error);
        });
    }
  
    SpeechRecognition.stopListening();
    setTimeout(() => {
      setButtonsPopUp(false);
    }, 600);
  };

  const handleResetButton = () => {
    const chatRef = ref(database, `data${userId}`);
    set(chatRef, { chatInputData: "" })
      .then(() => {
        setText("");
        resetTranscript();
      })
      .catch((error) => {
        console.error("Error adding data to Firebase: ", error);
      });
  };

  const handleResetMicData = () => {
    const chatRef = ref(database, `text${userId}`);
    set(chatRef, { transcript:"" })
    .then(() => {
      resetTranscript();
    })
    .catch((error) => {
      console.error("Error adding data to Firebase: ", error);
    });
  }

  const handleResetTypeData = () => {
    const chatRef = ref(database, `data${userId}`);
    set(chatRef, { chatInputData: "" })
      .then(() => {
        setText("");
      })
      .catch((error) => {
        console.error("Error adding data to Firebase: ", error);
      });
  }





  const handleGenerateLink = () => {
    if (userId) {
      const url = window.location.href;
      console.log(url);
      const containsHash = url.includes("#");
      const urlMain = url.split("#")[0];
      const domain = window.location.hostname;
      let userLink;
      if (containsHash) {
        userLink =
          domain === "localhost"
            ? `http://localhost:3000/mainPage#/user/${userId}`
            : `${urlMain}#/user/${userId}`;
      } else {
        userLink =
          domain === "localhost"
            ? `http://localhost:3000/user/${userId}`
            : `https://${domain}/user/${userId}`;
      }
      setUserLink(userLink);
      setGenPopUp(true);
    }
  };

  const handleClosePopup = () => {
    setGenPopUp(false);
    setLinkCopied(false);
    setIsOpen(false);
  };

  const handleCommand = (item) => {
    setText(item.text);
  };


  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(userLink)
      .then(() => {
        setLinkCopied(true);
      })
      .catch((error) => {
        console.error("Error copying link to clipboard:", error);
      });
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const saveTranscript = (trans) => {
    saveTranscript(trans);
    console.log(trans);
  };

  const handleStartButton = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-IN",
    });
    setIsRecording(true);
  };

  const handleStopButton = () => {
    SpeechRecognition.stopListening();
    setIsRecording(false);
  };

  const handleStartListening = () => {
    setText("")
    resetTranscript(); // Clear previous transcript
    handleResetTypeData()
    SpeechRecognition.startListening({ continuous: true, language: "en-US" });
  };

  return (
    <div className="mainPageBackgroundContainer">
      <div className="mainPleftSectionContainer">
        <h1 className="CommandBoxHeading">Questions</h1>
        <div class="search-container">
          <input
            type="search"
            placeholder="Search"
            class="search-input"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="button" class="search-button">
            <BsSearch className="search-icon" />
          </button>
        </div>
        <div className="CommandsContainer" style={{ overflowY: "scroll" }}>
          {filteredCommands?.map((item) => (
            <li
              style={{ cursor: "pointer" }}
              onClick={() => handleCommand(item)}
            >
              {item.command}
            </li>
          ))}
        </div>
      </div>
      <div className="mainPrightSectionContainer">
        <div className="mainPrightSectionTopBar">
          <h1 className="appTitle">Gallant</h1>
          <div className="mainPrightSectionTopBarInfo">
            {/* <MdPerson className="logIcon" /> */}
            {/* <h3 className="loginPName">{`${userName
              ?.slice(0, 1)
              .toUpperCase()}${userName?.slice(1)}`}</h3> */}
            <button onClick={handleSignOut} className="signoutButton">
              Sign Out
            </button>
          </div>
        </div>

        <div className="rightSectionBottomContainer">
          <div
            className="MobileCommandsContainer"
            style={{ height: "150px", display: "flex", flexDirection: "column" }}
          >
            <div class="search-container-mobile">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <ul className="questions">
            {filteredCommands?.map((item) => (
              <li
                style={{ cursor: "pointer" }}
                onClick={() => handleCommand(item)}
              >
                {item.command}
              </li>
            ))}
            </ul>
          </div>
          {/* <textarea
            placeholder="Mic"
            type="text"
            className="mainPtopInputContainer"
            value={transcript}
          /> */}

          <div className="btnTextContainer">
            {isRecording && (
              <div className="recordingIndicator">
                Recording<span className="blink">...</span>
              </div>
            )}
            {/* <div className="mainPbuttonsContainer">
              <button
                className="startButton button"
                onClick={handleStartButton}
              >
                Start
              </button>
              <button className="stopButton button" onClick={handleStopButton}>
                Stop
              </button>
              <button className="resetButton button" onClick={resetTranscript}>
                Reset
              </button>
            </div> */}
          </div>
          <textarea
            value={text || transcript}
            placeholder="Type or Speak..."
            type="text"
            className="mainPbottomInputContainer"
            onChange={(e) => setText(e.target.value)}
          />
          <div className="mainPbuttonsContainer">
            {listening ?
            <button className="startButton button" onClick={SpeechRecognition.stopListening}>Stop Listening</button>
           
            :
            <button
            onClick={handleStartListening}
            className="startButton button"
            >
             Listen
            </button>
            
            }
           
            <button
              id="sendButton"
              onClick={handleSendButton}
              className="stopButton button"
            >
              Send
            </button>
            {buttonsPopUp && (
              <div className="popup" id="popup">
                Chat Sent !
              </div>
            )}
            <button onClick={handleResetButton} className="resetButton button">
              Reset
            </button>
          </div>
        </div>
        <div className="generateLink">
          <button className="generate button" onClick={handleGenerateLink}>
            Generate Link
          </button>
        </div>
        {genPopUp && (
          <div>
            <div className="overlay" onClick={handleClosePopup}></div>
            <div className="generateLinkPop">
              <h2>Use Below Link :-</h2>
              <div className="linkContainer">
                <p className="userLink">
                  {userLink}
                  <span
                    className="copyIcon"
                    onClick={copyToClipboard}
                    title="Click here to copy"
                  >
                    📋
                  </span>
                </p>
              </div>
              {linkCopied && <p>Link copied!</p>}
              <button onClick={handleClosePopup}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
