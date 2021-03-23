# GammJS
A Javascript framework/Library that I will be using for most projects.

Author Uri: http://gamm.website <br>
Full Documentation: http://gamm.website/gammjs

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
>Hello Gamm.js
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
>This is what you output please!
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

<hr>

# Loops
This is a common thing in data handling when you want to display same html format and the only changing is the value of a given lists. For the loop to work we don't need to add any attribute but use what Javascript already offers.

```html
<div id="main-content">		
		
    <#gamm 
        <ul>	
        for(var k in this.data.menus){
            var menu_name = this.data.menus[k];
            <li>	
                <a href="#">	
                {{menu_name}}
                </a>	
            </li>	

        }
        </ul>	
    #>	

</div>	
```

```js
new Gamm({
    element : "#main-content",
    data : {
        menus : [
            "Home",
            "About Us",
            "Contact Us"
        ]
    }
});
```

<b>Result:</b>

```html
<div id="main-content">		
    <div id="random-id">
        <ul>
            <li>
                <a href="#">
                    Home
                </a>
            </li>
            <li>
                <a href="#">
                    About Us
                </a>
            </li>
            <li>
                <a href="#">
                    Contact Us
                </a>
            </li>
        </ul>
    </div>
</div>
```

## Object Loop
Like the above loop we can also use "For" Loop method already in Javascript.

```html
<div id="main-content">		
		
    <#gamm 
        <ul>	
        for(var key in this.data.menus){
            var menu = this.data.menus[key];
            
            <li>	
                <a href="{{menu.link}}">	
                {{menu.name}}
                </a>	
            </li>	

        }
        </ul>	
    #>	

</div>
```

```js
new Gamm({
    element : "#main-content",
    data : {
        menus : [
            {
                name : "Home",
                link : "home.html"
            },
            {
                name : "About",
                link : "about.html"
            },
            {
                name : "Contact",
                link : "contact.html"
            }
        ]
    }
});
```

<b>Result:</b>

```html
<div id="main-content">		
    <div id="random-id">
        <ul>
            <li>
                <a href="home.html">
                    Home
                </a>
            </li>
            <li>
                <a href="about.html">
                    About
                </a>
            </li>
            <li>
                <a href="contact.html">
                    Contact
                </a>
            </li>
        </ul>
    </div>
</div>
```

<hr>

# Conditions
Condition is very important for us developers to limit something we want to display, execution, time, etc... So in this page I will show that it is easy to use those conditions because this library is already using Javascript syntax. See example.

```html
<div id="main-content">		
		
    <#gamm 
        if(this.data.show_me == true){
            <h1>	
            {{'Show Me'}}
            </h1>	
        }
        else{
        
            {{'Nothing To See Here.'}}
            
        }
    #>

</div>
```

```js
new Gamm({
    element : "#main-content",
    data : {
        show_me : false
    }
});
```

<b>Result:</b>

```html
<div id="main-content">		
    <div id="random-id">		
        Noting To See Here.
    </div>
</div>
```


## Play With Events And Conditions

```html
<div id="main-content">		
		
    <#gamm 
        if(this.data.show_me == true){
            <h1>	
            {{'Show Me'}}
            </h1>	
        }
        else{
        
            {{'Nothing To See Here.'}}
            
        }
    #>
    <br>
    <button gamm-events="{'click' : 'button_is_click'}">{{button_text}}</button>
</div>		
```

```js
new Gamm({
    element : "#main-content",
    data : {
        show_me : false,
        button_text : "Show H1"
    },
    events : {
        button_is_click : function(){

            if(this.data.button_text == "Show H1"){
                this.data.show_me = true;
                this.data.button_text = "Hide H1";
            }
            else{
                this.data.show_me = false;
                this.data.button_text = "Show H1";
            }

        }
    }
});
```

<b>Result:</b>

```html
<div id="main-content">
    <div id="random-id">
    
        <h1>Show Me</h1>	
        <br>
        <button data-gamm_click="parent_id_0">Hide H1</button>

    </div>
</div>
```


## Arithmetic Condition
Arithmetic condition is also very important so we can identify values that needed to be process or execute a given code. See Example.

```html
<div id="main-content">		
		
    <#gamm 
        for(var i = 0; i < this.data.numbers.length; i++){
            var number = this.data.numbers[i];

            if( (number % 2) == 0){
                {{number + ' is even.'}}
            }
            else{
                {{number + ' is odd.'}}
            }
            
            <br>

        }
    #>		
</div>		
```

```js
new Gamm({
    element : "#main-content",
    data : {
        numbers : [1,2,3,4,5,6,7,8,9,10]	
    }		
});
```

<b>Result:</b>

```html
<div id="main-content">
    <div id="random-id">
        1 is odd.<br>
        2 is even.<br>
        3 is odd.<br>
        4 is even.<br>
        5 is odd.<br>
        6 is even.<br>
        7 is odd.<br>
        8 is even.<br>
        9 is odd.<br>
        10 is even.<br>		
    </div>
</div>
```

<hr>

# Styling
Styling in this library is not far from we already have in Javascript, we can use style tag, CSS or even the style attribute and put values on it. As the library is flexible, we can directly associate object/variables/data into the attributes itself. See Example.

```html
<div id="main-content">		
    <button gamm-events="{'click':'change_color'}" style="background-color:{{button_color}}; color:{{text_color}}">
        {{button_text}}
    </button>
</div>	
```

```js
new Gamm({
    element : "#main-content",
    data : {
        button_color : "white",
        text_color : "black",
        button_text : "Change Me Into Black"
    },
    events : {
        change_color : function(){

            if(this.data.button_text == "Change Me Into Black"){
                this.data.button_color = "black";
                this.data.text_color = "white";
                this.data.button_text = "Change Me Into White";
            }
            else{
                this.data.button_color = "white";
                this.data.text_color = "black";
                this.data.button_text = "Change Me Into Black";
            }

        }
    }
});
```

<b>Result:</b>

```html
<div id="main-content">
    <div id="random-id">
        <button data-gamm_click="parent_id_0" style="background-color:white; color:black">
			Change Me Into Black
		</button>
    </div>
</div>
```

## Styling Techniques
As the library always says, we can already use Javascript functions that is built-in, this is what makes this library easy to use because we already have Javascript documentations and to make everything faster.

```html
<div id="main-content">		
    <div style="width:{{width}}px; height:100px; border:1px solid #000; ">			
    </div>
    <br>
    <button gamm-events="{'click' : 'increase_width'}">Increase Width</button> 		
    <button gamm-events="{'click' : 'decrease_width'}">Decrease Width</button>

</div>	
```

```js
new Gamm({
    element : "#main-content",
    data : {
        width : 10
    },
    events : {
        increase_width : function(){
            this.data.width += 5;
        },
        decrease_width : function(){
            this.data.width -= 5;
        }
    }
});
```

<b>Result:</b>

```html
<div id="main-content">
    <div id="random-id">
        <div style="width:0px; height:100px; border:1px solid #000; ">			
		</div>
		<br>
		<button data-gamm_click="parent_id_0">Increase Width</button> 
		<button data-gamm_click="parent_id_1">Decrease Width</button>

    </div>
</div>
```

<hr>

# Templates
This library also offers to call a file to easly make your own templates if you want a seperate a certain are of your project. You can make blocks or modular template so you can easily fix which part may cause the problem or issue.

<b>HTML FILE:</b>

```html
<div id="form-template">	
    <b>File Template</b>
    <br>	
    <label>Firstname: </label> <input type="text" name="firstname">
    <br>	
    <label>Lastname: </label> <input type="text" name="lastname">
    <br>
    <label>Gender: </label> 
    <input type="radio" name="gender" value="Male"> Male 
    <input type="radio" name="gender" value="Female"> Female
    <br>
    <label>Field Work: </label> 
    <select name="field_work">
        <#gamm
            for(var k in this.data.options){
                var option = this.data.options[k];
                <option value="{{option}}">
                {{option}}
                </option>
            }
        #>
    </select>
    <button gamm-events="{'click' : 'submit_result'}">Submit</button>
</div>	
```

<b>MAIN HTML FILE:</b>

```html
<div id="main-content">		
    <div id="form-wrapper" style="width:30%; margin:10px; border:1px solid #333; padding:5px; float:left;">
    </div>

    <div id="form-results" style="width:30%; margin:10px; padding:5px; float:left;">
        <b>Other Template</b>
        <table border="1">
            <tbody>

                <tr>
                    <th>
                        Firstname
                    </th>
                    <td>
                        {{result.firstname}}
                    </td>
                </tr>

                <tr>
                    <th>
                        Lastname
                    </th>
                    <td>
                        {{result.lastname}}
                    </td>
                </tr>

                <tr>
                    <th>
                        Gender
                    </th>
                    <td>
                        {{result.gender}}
                    </td>
                </tr>

                <tr>
                    <th>
                        Field Work
                    </th>
                    <td>
                        {{result.field_work}}
                    </td>
                </tr>

            </tbody>
        </table>
    </div>
</div>				
```

Use of built-in Gamm method "other" To pass data values to other Gamm classes. Read more on <a href="#gamm-methods"> Gamm methods </a>.

```js
var Result = new Gamm({
    element : "#form-results",
    data : {
        result : {
            firstname : "",
            lastname : "",
            gender : "",
            field_work : ""
        }
    }
});

var FormTemplate = new Gamm({
    file : "form.html",
    data : {
        firstname : "",
        lastname : "",
        gender : "",
        field_work : "",
        options : ["Computer Science","Information Technology","Information System"]
    },
    events : {
        submit_result : function(){
            this.other(Result,"data.result",this.data);
        }
    }
});

FormTemplate.insert_to("#form-wrapper");
```

<b>Result:</b>

```html
<div id="main-content">		

    <div id="form-wrapper" style="width:30%; margin:10px; border:1px solid #333; padding:5px; float:left;">
        <div id="random-id">

            <div id="form-template">
                <b>File Template</b>
                <br>
                <label>Firstname: </label> 
                <input type="text" name="firstname" value="John">
                <br>	
                <label>Lastname: </label> 
                <input type="text" name="lastname" value="Doe">
                <br>
                <label>Gender: </label> 
                <input type="radio" name="gender" value="Male" checked> Male 
                <input type="radio" name="gender" value="Female"> Female
                <br>
                <label>Field Work: </label> 
                <select name="field_work">
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology" selected>Information Technology</option>
                    <option value="Information System">Information System</option>
                </select>
                <button data-gamm_click="parent_id_0">Submit</button>
            </div>

        </div>
    </div>

    <div id="form-results" style="width:30%; margin:10px; border:1px solid #333; padding:5px; float:left;">
        <div id="random-id">
            <b>Other Template</b>
            <table border="1">
                <tbody>

                    <tr>
                        <th>
                            Firstname
                        </th>
                        <td>
                            John
                        </td>
                    </tr>

                    <tr>
                        <th>
                            Lastname
                        </th>
                        <td>
                            Doe
                        </td>
                    </tr>

                    <tr>
                        <th>
                            Gender
                        </th>
                        <td>
                            Male
                        </td>
                    </tr>

                    <tr>
                        <th>
                            Field Work
                        </th>
                        <td>
                            Information Technology
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>
</div>
```

<hr>

# Component
A new feature that would be useful for creating easy integrations of a specific UI that will help creators to share there work with people who needs.

```js
Gamm({
    block : "helloworld",
    template : "<h1>Hello World</h1>"
});
```

```html
<helloworld></helloworld>
```

<b>Result:</b>

```html
<helloworld>
    <div id="random-id">
        <h1>Hello World</h1>
    </div>
</helloworld>
```

<hr>


# Gamm Methods
This methods is what we have to offer so far. But in the long run we may have to add more features to make the library more flexible and useful. This method is attached or bind into the class itself.

| Method or Function Name | Parameters | Description |
| --- | --- | --- |
| new Gamm | ({<br> <b>file</b> : "",<br> <b>template</b> : "",<br> <b>element</b> : "",<br> <b>data</b> : {},<br> <b>events</b> : {}, <br> <b>html</b> : function{/* html_code */},<br> <b>load</b> : function(){ } <br>}) | This class helps you to use all the features of the "Gamm"  <br> class to manipulate HTML code and compile it base on your parameter. <br> <b>"file"</b> object parameter - this will read the file and compile the contents inside with Gamm Syntax. <br> <b>"template"</b> object parameter - this is a string value of html code that you want to easily implement and this will still undergo same compilation of Gamm Syntax. <br> "element" object parameter - this read the selected element inner HTML and Gamm Syntax and compile the contents inside. <br> "data" object parameter - is a list of variables or models inside your Gamm Template. <br> "events" object parameter - is a list of events or methods for your Gamm Template. <br> "load" object parameter - is function that will first execute before loading your Gamm Template. |
| insert_to | (selector) | This method will put your Gamm Template to the existing inner HTML of the query selector parameters you inputted. It will replace all values inside the element that you wish to insert. | 
| append_to | (selector) | This method will append your Gamm Template to the bottom most of the existing inner HTML of the query selector parameters you inputted. |
| prepend_to | (selector) | This method will prepend your Gamm Template to the top most of the existing inner HTML of the query selector parameters you inputted. | 
| other | ($class,$data,$value) | This method let you modify or update other different Gamm Templates data. <br> $class parameter - is the class of Gamm Template you want to modify. <br> $data parameter - which data of the class you want to modify. $value parameter - what value you want to put to the data you want to modify. |

## Below functions only works inside the Gamm Template Content. 
| Method or Function Name | Parameters | Description |
| --- | --- | --- |
| tag | (str) | the parameter value is use to display a content inside the template. This is usually use to a limitations. Read more on Limitations. | 

```js  
if(i == 0){ 
    tag('h1'); 
    {{i}} 
    tag('/h1'); 
} 
``` 

| Method or Function Name | Parameters | Description |
| --- | --- | --- |
| $ | (str) | the parameter value is use to display a opening HTML tag. | 

```js
if(i == 0){
    $('h1');
    {{i}}
    tag('/h1');
}
```

| Method or Function Name | Parameters | Description |
| --- | --- | --- |
| $$ | (str) | the parameter value is use to display a closing HTML tag. | 

```js
if(i == 0){
    $('h1');
    {{i}}
    $$('h1');
}
```

| Method or Function Name | Parameters | Description |
| --- | --- | --- |
| this.http.post | (url,options = {}) | This object function is use for sending request via "POST METHOD". To send data you can use options object "data". this function can be use inside the events properties inside the functions, otherwise you can use or pass it on different variable. | 

```js
new Gamm({
    events : {
        test_func : function(){

            var result = this.http.post(url,{ 
                data : {
                    message : "the message value"
                }
            });
        }
    }
});

//or
var post_req = new Gamm({});

var result = post_req.http.post(url,{ 
    data : {
        message : "the message value"
    }
});
```

| Method or Function Name | Parameters | Description |
| --- | --- | --- |
| this.http.get | (url,options = {}) | This object function is use for sending request via "GET METHOD". To send data you can use options object "data". this function can be use inside the events properties inside the functions, otherwise you can use or pass it on different variable. | 

```js
new Gamm({
    events : {
        test_func : function(){

            var result = this.http.get(url);
        }
    }
});

//or
var post_req = new Gamm({});
var result = post_req.http.get(url);
```

| Method or Function Name | Parameters | Description |
| --- | --- | --- |
| this.http.request | (url,options = {}) | This object function is use for sending request via "ANY METHOD". To send any method you can use options object "method" To send data you can use options object "data". this function can be use inside the events properties inside the functions, otherwise you can use or pass it on different variable. | 

```js
new Gamm({
    events : {
        test_func : function(){

            var result = this.http.request(url,{
                method : "fetch"
            });
        }
    }
});

//or
var post_req = new Gamm({});
var result = this.http.request(url,{
    method : "fetch"
});
```

<hr>

# Limitations
As all library or framework all has limitations and flaws. This flaws may be fixed along the way or it will be the limit and we make Alternatives to make remove this limitations.

## Table Tags
table tag (&lt;table&gt;) is having issue on this library because when you create table and put a Gamm Syntax inside the browsers auto seperate the contents inside the table that is not necessary for its content. So to fix this solution we have the method "tag", "$", and "$$". This is by if you really want to use table inside the Gamm Templates.

<b>Example:</b>

```html
<table>
	<#gamm 
		//Javascript code..
	#>
</table>

<#gamm 
		<table>
			<thead></thead>
			<tbody>
				for(var i = 0; i < 10; i++){
				<tr>
					{{i}}
				</tr>
				}
			</tbody>
		</table>
#>
```

<b>Result:</b>

```html
<#gamm 
		//Javascript code..
	#>
<table>	
</table>

<#gamm 
for(var i = 0; i < 10; i++){
	{{i}}
}
		<table>
			<thead></thead>
			<tbody>
				
				<tr>
					
				</tr>
				
			</tbody>
		</table>
#>
````

-So in this case it will cause many errors on the Gamm Template.

<b>Solution So Far:</b>

```html
<div id="main-content">	
<#gamm 
	$('table border="1"');
		$('tbody');
			for(var i = 0; i < 10; i++){

				$('tr');
					$('td');
						{{i}}
					$$('td');
				$$('tr');

			}
		$$('tbody');
	$$('table');
#>
</div>
```

```js
new Gamm({
    element : "#main-content"
});
```

<b>Result:</b>

```html
<div id="main-content">
   <div id="random-id">
      <table border="1">
         <tbody>
            <tr>
               <td>0</td>
            </tr>
            <tr>
               <td>1</td>
            </tr>
            <tr>
               <td>2</td>
            </tr>
            <tr>
               <td>3</td>
            </tr>
            <tr>
               <td>4</td>
            </tr>
            <tr>
               <td>5</td>
            </tr>
            <tr>
               <td>6</td>
            </tr>
            <tr>
               <td>7</td>
            </tr>
            <tr>
               <td>8</td>
            </tr>
            <tr>
               <td>9</td>
            </tr>
         </tbody>
      </table>
   </div>
</div>
```

## Double Quotes
This one is a very strict compliance for the Gamm Template. Double quotes cause errors because Gamm Compiler compiles everything as string. So the solution to this is only using single quote when display a string or using it on conditions. See Example.

```html
<div id="main-content">
    <#gamm 
        {{"This will cause an error"}}
    #>

</div>
```

<b>Result:</b>

```html
<div id="main-content">
    <div id="random-id">[object-undefined]
    </div>
</div>
```

<b>Another Example:</b>

```html
<div id="main-content">
    <#gamm 
        var a = "This is an error too.";
    #>

</div>
```

<b>Result:</b>

```html
<div id="main-content">
    <div id="random-id">[object-undefined]
    </div>
</div>
```

<b>Another Example:</b>

```html
<div id="main-content">
    <#gamm 
        var a = 'correct string';
        if(a == "wrong string"){
            {{'this is a right string.'}}
        }
    #>

</div>
```

<b>Result:</b>

```html
<div id="main-content">
    <div id="random-id">[object-undefined]
    </div>
</div>
```

<b>Solution So Far:</b>
Always start with a single quote(') and end with another single quote(') to display strings.

```html
<div id="main-content">
    <#gamm 
        var a = 'correct string';
        if(a == 'correct string'){
            {{'this is a right string.'}}
        }
    #>
</div>
```

<b>Result:</b>

```html
<div id="main-content">
    <div id="random-id">this is a right string.
    </div>
</div>
```


## Always Use Single Quote On Gamm Tag
If you want to put string or text inside Gamm Tag always use {{''}} this symbols. It will cause a major error in compilation if you directly put text in the Gamm Tag.

```html
<div id="main-content">
    <#gamm 
        <h1>
            this is a text.
        </h1>
    #>
</div>
```

<b>Result:</b>

```html
<div id="main-content">
    <div id="random-id">[object-undefined]
    </div>
</div>
```

<b>Correction:</b>

```html
<div id="main-content">
    <#gamm 
        <h1>
            {{'this is a text.'}}
        </h1>
    #>
</div>
```

<b>Result:</b>

```html
<div id="main-content">
   <div id="random-id">
      <h1>this is a text.</h1>
   </div>
</div>
```


## Gamm Tag Limitations
Gamm Tag limits is mostly html tags. HTML tags won't work unless they are seperated by line. Every code is good to look at if properly seperated by line, So this library may practice you to do so.

```html
<div id="main-content">
    <#gamm 
        <h1>{{'this is a text.'}}</h1>
    #>
</div>
```

<b>Result:</b>

```html
<div id="main-content">
   <div id="random-id">
      <h1>gamm_echo('this is a text.');</h1>
   </div>
</div>
```

"gamm_echo" is a method inside Gamm Tag that use in compilation. So if the html tags is not properly seperated by new line this error/issue will occur.

<b>Solution:</b>

```html
<div id="main-content">
    <#gamm 
        <h1>
            {{'this is a text.'}}
        </h1>

        <ul>
            for(var i = 1; i < 11; i++){
            <li>
                {{'Display Number: ' + i}}	
            </li>
            }
        </ul>
    #>
</div>
```

<b>Result:</b>

```html
<div id="main-content">
   <div id="random-id">
      <h1>this is a text.</h1>
      <ul>
         <li>Display Number: 1</li>
         <li>Display Number: 2</li>
         <li>Display Number: 3</li>
         <li>Display Number: 4</li>
         <li>Display Number: 5</li>
         <li>Display Number: 6</li>
         <li>Display Number: 7</li>
         <li>Display Number: 8</li>
         <li>Display Number: 9</li>
         <li>Display Number: 10</li>
      </ul>
   </div>
</div>
```