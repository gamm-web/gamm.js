# GammJS
A Javascript framework/Library that I will be using for most projects.
Author Uri: http://www.gamm.website
Documentation: http://www.gamm.website/gammjs

<hr>

## Welcome To GammJS
A simple library that you can use to create block templates that can easily be manipulated and add methods or events to a certain element in the document.

This library also helps you to learn a few tricks to create a good user-interface website that can easily be designed using this library.

This library is mostly used to create my projects and will help me to easily integrate javascript events to my HTML codes. This library is powered purely by javascript but you can combine both HTML and javascript integration on a said syntax that I will be showing you on this document so sit back and read!

This library might be familiar to you like famous frameworks out there on the internet like Angular.js by Google, React.js by Facebook, and Vue.js by Evan You. This library is almost similar to these 3 famous frameworks but this one like Vue.js doesn't need any complications on installing or integrating into your projects. It is light and easy to use than these 3 famous frameworks already in the market.

<hr>

## Integration
Integration is as easy us this:
```html
<script type="text/javascript" src="[path_to_library]/gamm.js"></script>
```
You can also use the minify/compressed version:
```html
<script type="text/javascript" src="[path_to_library]/gamm.min.js"></script>
```

<hr>

## Disclaimer
It might be it may have similar to any Javascript framework or library it does not copy any library existing in the market or on the internet. The code can be easily read and you can check if there is some copied code there. This library was made from scratch and not copied by any source.

This library also comes from my logic if there is such code that is much better than my code, I don't intend to compete to any of the best framework or library. This code is only developed to aid me from my projects and made out of my intellectual capability only.

Thank you and if you like my library feel free to at least credit me or send me an email at prefikes@gmail.com for issues that could help my library to be much better, faster, and optimized.

<hr>

## HTML Render
To render or pass variable data like the other frameworks you can use double open and close brackets and inside is the data name or variable name.
```html
<div id="main-content">		

    <h1>{{welcome_message}}</h1>					

</div>		
```
And to use the library you can use the class new "Gamm" with object parameters element on which element you want to parse and compile the results.
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

<hr>

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
<b>Initialize</b>
```js
new Gamm({
    element : "#main-content"
});
```
<br>
<b>Result:</b>
```html
<div id="main-content">	
    <h1>
    Hello Gamm.js
    </h1>
</div>
```

<hr>

## Data And Models
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