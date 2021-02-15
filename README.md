# GammJS
A Javascript framework/Library that I will be using for most projects.

Author Uri: http://www.gamm.website <br>
Documentation: http://www.gamm.website/gammjs

<hr> 

# Introduction
## Welcome To GammJS
A simple library that you can use to create block templates that can easily be manipulated and add methods or events to a certain element in the document.

This library also helps you to learn a few tricks to create a good user-interface website that can easily be designed using this library.

This library is mostly used to create my projects and will help me to easily integrate javascript events to my HTML codes. This library is powered purely by javascript but you can combine both HTML and javascript integration on a said syntax that I will be showing you on this document so sit back and read!

This library might be familiar to you like famous frameworks out there on the internet like Angular.js by Google, React.js by Facebook, and Vue.js by Evan You. This library is almost similar to these 3 famous frameworks but this one like Vue.js doesn't need any complications on installing or integrating into your projects. It is light and easy to use than these 3 famous frameworks already in the market.


## Integration
Integration is as easy us this:
```html
<script type="text/javascript" src="[path_to_library]/gamm.js"></script>
```
You can also use the minify/compressed version:
```html
<script type="text/javascript" src="[path_to_library]/gamm.min.js"></script>
```


## Disclaimer
It might be it may have similar to any Javascript framework or library it does not copy any library existing in the market or on the internet. The code can be easily read and you can check if there is some copied code there. This library was made from scratch and not copied by any source.

This library also comes from my logic if there is such code that is much better than my code, I don't intend to compete to any of the best framework or library. This code is only developed to aid me from my projects and made out of my intellectual capability only.

Thank you and if you like my library feel free to at least credit me or send me an email at prefikes@gmail.com for issues that could help my library to be much better, faster, and optimized.

<hr>

# HTML Render
To render or pass variable data like the other frameworks you can use double open and close brackets and inside is the data name or variable name.
```html
<div id="main-content">		

    <h1>{{welcome_message}}</h1>					

</div>		
```
And to use the library you can use the class new "Gamm" with object parameters element on which element you want to parse and compile the results.
<br>
<br>
<b>Initialization:</b>
```js
new Gamm({
    element : "#main-content",
    data : {
        welcome_message : "Hello Gamm.js"
    }
});
```
The said code will generate this result in HTML and will insert to the element value on the parameters object "element". But will also include and enclose the inner HTML with (&lt;div&gt;) tag with a random id generated as a template-id for the parse HTML code.
```html
<div id="main-content">		
    <div id="template-id-random-generated">
        <h1>Hello Gamm.js</h1>					
    </div>
</div>	
```


## The Gamm Tag
The use of gamm tag is usually for loop and conditional syntax. For more examples you can check loops and coditions pages. but below is a little example of usage of it.
```html
<div id="main-content">		
    <#gamm
        //Javascript code...
    #>
</div>
```

A little more sample.
```html
<div id="main-content">		
    <#gamm
        var display_this_var = 'Hello Gamm.js';
        <h1>
        {{display_this_var}}
        </h1>
    #>
</div>	
```

<br>
<b>Initialize:</b>

```js
new Gamm({
    element : "#main-content"
});
```

<br>
<b>Result:</b> 

```html
<div id="main-content">	
    <div id="random-id">
        <h1>
        Hello Gamm.js
        </h1>
    </div>
</div>
```

<hr>

# Data And Models
Data and models in this library can be declared via user input forms by the "name" attribute. No need to use another custom attributes we can just use the already built-in "name" attribute.

```html
<div id="main-content">		

    <input type="text" name="firstname">

</div>
```
<br>
<b>Initialize:</b>

```js
new Gamm({
    element : "#main-content",
    data : {
        firstname : "John Doe"
    }
});
```
<br>
<b>Result:</b>

```html
<div id="main-content">
    <div id="random-id">
        <input type="text" name="firstname" value="John Doe">
    </div>
</div>
```


## Data Binding
When you change value of a model or data. It will also change the data which you have put on the brackets and even in the inputs. The forms has a watcher that detects change of value and also changes the values related to that data or model.

```html
<div id="main-content">		
    <label>Try to change the input value: </label> 	
    <br> 	
    <input type="text" name="firstname"> 
    <br> 
    My first name is : {{firstname}}
    <select name="gender"> 
        <option value="Male">Male</option> 
        <option value="Female">Female</option> 
    </select> 
    <br> 
    My Gender is: {{gender}}
</div>	
```

<b>Initialize:</b>

```js
new Gamm({
    element : "#main-content",
    data : {
        firstname : "Jose Marie",
        gender : ""
    }
});
```

<b>Result:</b>

```html
<div id="main-content">
    <div id="random-id">
        <label>Try to change the input value: </label> 
        <br>
        <input type="text" name="firstname" value="Jose Marie">
        <br>
        My first name is : Jose Marie
        <br>
        <select name="gender">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
        </select>
        <br>
        My Gender is:         
    </div>
</div>
```

## Data Binding On Radio And Check Boxes

```html
<div id="main-content">		
    <label>I like to: </label> 	
    <br> 	
    <input type="checkbox" name="hobby" value="Work"> Work
    <br> 
    <input type="checkbox" name="hobby" value="Play"> Play
    <br> 
    <label>Select Gender: </label> 	
    <br> 	
    <input type="radio" name="gender" value="Male" >  Male
    <br> 	
    <input type="radio" name="gender" value="Female" >  Female
    <br>
    {{hobby}}
    <br> 			
    {{gender}}
</div>	
```

<b>Initialize:</b>

```js
new Gamm({
    element : "#main-content",
    data : {
        hobby : [],
        gender : "",
    }
});
```

<b>Result:</b>

```html
<div id="main-content">		
    <div id="random-id">
        <label>I like to: </label> 	
        <br> 	
        <input type="checkbox" name="hobby" value="Work" checked> Work
        <br> 
        <input type="checkbox" name="hobby" value="Play" checked> Play
        <br> 
        <label>Select Gender: </label> 	
        <br> 	
        <input type="radio" name="gender" value="Male" >  Male
        <br> 	
        <input type="radio" name="gender" value="Female" checked>  Female
        <br>
        Work,Play
        <br> 			
        Female
    </div>
</div>
```

## Data Updates After An Event Is Triggered
When a data is manipulated inside the function it will also update the template object base on the code execution or syntax you composed.

```html
<div id="main-content">		
    Press this button then this will count: {{counter}}
    <br>
    <button gamm-events="{'click' : 'increment_counter'}">Increment Data Counter</button>
</div>	
```

<b>Initialize:</b>

```js
new Gamm({
    element : "#main-content",
    data : {
        counter : 0
    },
    events : {
        increment_counter : function(){

            this.data.counter++;

        }
    }
});
```

<b>Result:</b>

```html
<div id="main-content">
    <div id="random-id">
        Press this button then this will count: 0
        <br>
        <button data-gamm_click="parent_id_0">Increment Data Counter</button>
    </div>
</div>
```

## Displaying Global Data/Variables
To display global variables you can add a dollar sign($) on the open and close brackets({{}}) like we display on the variables/data.

```html
<div id="main-content">
    {{$global_variable}}
</div>
```

<b>Initialize:</b>

```js
window.global_variable = "Hello Gamm.JS";

new Gamm({
    element : "#main-content"
});
```

<b>Result:</b>

```html
<div id="main-content">
    <div id="random-id">
    Hello Gamm.JS
    </div>
</div>
```

<hr>

# Events Or Methods
Adding events to the element is easier just by addding an attribute "gamm-events" with a JSON data starts with the key as the name of the event and value as the function inside "events" parameters in the library class.

As the element has an attribute "gamm-events" will be compiled to attribute base on the event you added. For example a "click" event will converted to "data-gamm_click" with a value of the template_id and "_" with the number base on the number of the element compiled start to zero(0).

```html
<div id="main-content">		
    <button gamm-events="{'click':'show_output'}" >Click Me For Output!</button>
</div>
```

Here you can see we add a JSON format data inside "gamm-events" with the key as "click" and the value is the function name "show_output".

<b>Initialize:</b>

```js
new Gamm({
    element : "#main-content",
    events : {
        show_output : function(){

            console.log("Hello Gamm.js");

        }
    }
});
```

<b>Result:</b>

```html
<div id="main-content">
    <div id="random-id">
        <button data-gamm_click="parent_id_0">Click Me For Output!</button>
	</div>
</div>
```

```bash
Hello Gamm.js
```

## Get Element Data Or Properties On Events
To get the element properties of the attached event you will need to add a first parameter to your function. Through this you will able to see all the information you needed.

```html
<div id="main-content">		
    <button gamm-events="{'click':'show_output'}" data-my_information="This is what you output please!">
        I will show what's on the attribute 'data-my_information'.
    </button>
</div>	
```

<b>Initialize:</b>

```js
new Gamm({
    element : "#main-content",
    events : {
        show_output : function(el){

            console.log(el.getAttribute("data-my_information"));

        }
    }
});
```
```html
<div id="main-content">
    <div id="random-id">
        <button data-gamm_click="parent_id_0" data-my_information="This is what you output please!">
        I will show what's on the attribute 'data-my_information'.
        </button>
	</div>
</div>
```

```bash
This is what you output please!
```


## Get Element Mouse Event
This time to get the mouse events of a element that you have attached a method/event you just need to add a second parameter to your function. See example.

```html
<div id="main-content">		
    <div style="border:1px solid black; width:300px; height:100px;" gamm-events="{'mouseover':'show_mouse_x_y'}" >
        {{mouse_x}},{{mouse_y}}
    </div>
</div>	
```

```js
new Gamm({
    element : "#main-content",
    data : {
        mouse_x : 0,
        mouse_y : 0
    },
    events : {
        show_mouse_x_y : function(el,mev){

            this.data.mouse_x = mev.clientX;
            this.data.mouse_y = mev.clientY;

        }
    }
});
```

<b>Result:</b>

```html
<div id="main-content">		
    <div id="random-id">
        <div style="border:1px solid black; width:300px; height:100px;" data-gamm_mouseover="parent_id_0" >
            0,0
        </div>
    </div>
</div>
```

