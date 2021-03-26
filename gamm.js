/*
* Author: Angelo Octavio
 * Version: 1.1
 * Author Url: http://gamm.website/gammjs
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
*/

window.GAMM_IDS = [];
function Gamm(args){

    this.template = "wew";

    this.element = null;
    this.template_id = "";
    this.template = "";
    this.compiled_template = "";
    this.data = {};
    this.gamm_events = {};
    this.options = [];
    
    this.stored_events = {};
    this.compiled_events = {};
    this.load = null;
    
    this.textareas = {};
    this.properties = {};
    this.gamm_element_and_events = {};

	this.last_compiled_before_error = [];
	this.debug = false;

    

    this.make_template_id = function(){
		var result           = '';
		var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
		var charactersLength = characters.length;
		for ( var i = 0; i < 10; i++ ) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		
		if( window.GAMM_IDS.indexOf(result) > -1 ){
			this.make_template_id();
		}
		else{
			this.template_id = result;
			window.GAMM_IDS[ window.GAMM_IDS.length ] = result;
		}
		
	}

    this.convert_to_html = function(){
		
		var parser = new DOMParser();
		var doc = parser.parseFromString(this.template, 'text/html');		
		this.template = doc.body.innerHTML;
		
	}
	
	this.convert_to_text = function(str){
		var parser = new DOMParser();
		var doc = parser.parseFromString(this.template, 'text/html');
		var text = doc.body.innerText;
		return text;
		
    }

    this.init_element = function(){
		
		if(this.load != null){
			this.load.call(this);
		}
		
		
		this.compile_codes();
		this.compile_events(); 						
		this.compile_datas(); 		
		try{
			
			document.querySelector(this.element).innerHTML = "<div id='" + this.template_id + "'>" + this.compiled_template + "</div>";
			
		}
		catch(gamm_html_error){
			this.template = "";
		}
				
		this.distribute_events();
		this.compile_models();
		
    };

    this.insert_to = function(selector){
		
		if(this.load != null){
			this.load.call(this);
		}
		
		this.compile_codes();
		this.compile_events(); 				
		this.compile_datas();		
		try{
			
			document.querySelector(selector).innerHTML = "<div id='" + this.template_id + "'>" + this.compiled_template + "</div>";
		}
		catch(gamm_html_error){
			this.template = "";
		}
		this.distribute_events();
		this.compile_models();
		
	};

	this.component = function(selector){

		if(this.load != null){
			this.load.call(this);
		}
		
		this.compile_codes();
		this.compile_events(); 				
		this.compile_datas();		
		try{
			
			var $$$gamm_comp = document.querySelectorAll(selector);
			
			for(var $$$comp_i = 0; $$$comp_i < $$$gamm_comp.length; $$$comp_i++){
				$$$gamm_comp[$$$comp_i].innerHTML = "<div id='" + this.template_id + "'>" + this.compiled_template + "</div>";
			}

		}
		catch(gamm_html_error){
			console.log(gamm_html_error);
			this.template = "";
		}
		this.distribute_events();
		this.compile_models();

	}
    

    this.compile_codes = function(){
		
		try{
			
			this.compiled_template = this.template;
			var gamm_start_identifier = "&lt;#gamm";
			var gamm_end_identifier = "#&gt;";
			// console.log(this.compiled_template);
			
			
			var gamm_el_codes = this.parse_data(this.compiled_template,gamm_start_identifier,gamm_end_identifier);
			var gamm_temp_code = "";
			var final_code_compiled = "";
			var gamm_final_code = "";
			// alert(0);
			
			// final replacements
			var gamm_lt_tag_string = new RegExp("&lt;","g");
			var gamm_gt_tag_string = new RegExp("&gt;","g");
			var gamm_ampersand_string = new RegExp("&amp;","g");
			var gamm_double_quotes = new RegExp("\"","g");
			
			var gamm_start_brackets = new RegExp("{{","g");
			var gamm_end_brackets = new RegExp("}}","g");
			
			var table = "table";
			var tr = "tr";
			var td = "td";
			var tbody = "tbody";
			var thead = "thead";
			var th = "th";

			function gamm_echo(str){
				gamm_final_code += str;
			}
			
			function tag(str){
				gamm_final_code += "<" + str + ">";
			}

			function $(str){
				gamm_final_code += "<" + str + ">";
			}

			function $$(str){
				gamm_final_code += "</" + str + ">";
			}
			
			while(gamm_el_codes.length > 0){
				
				try{
					
					gamm_final_code = "";
					final_code_compiled = "";

					gamm_temp_code = gamm_el_codes[0];
					
					
					gamm_temp_code = gamm_temp_code.replace(gamm_double_quotes,'\\"');

					this.last_compiled_before_error[this.last_compiled_before_error.length] = {
						function : "GAMM_TAGG",
						code : gamm_temp_code
					};

					
					var start_lt_tag = false;
					for(var i = 0; i < gamm_temp_code.length; i++){
						
						var str_1 = gamm_temp_code[i];
						
						
						if(str_1 == "<" && start_lt_tag == false){
							
							
							final_code_compiled += ' gamm_echo(\"' + str_1 ;
							start_lt_tag = true;
						}
						else if(start_lt_tag == true && str_1 == "\n"){
							final_code_compiled += '");' + str_1;
							start_lt_tag = false;
						}
						else{
							final_code_compiled += str_1;
						}

						this.last_compiled_before_error[this.last_compiled_before_error.length] = {
							function : "GAMM_TAGG",
							code : final_code_compiled
						};
							
					}
					
					var tags_with_brackets_compile = this.parse_data(final_code_compiled,"<",">");
					while( tags_with_brackets_compile.length > 0 ){
						
						var replacement_string = "&lt;" + tags_with_brackets_compile[0].replace(gamm_start_brackets,'" + ').replace(gamm_end_brackets,' + "') + "&gt;";
						
						final_code_compiled = final_code_compiled.replace("<" + tags_with_brackets_compile[0] + ">",replacement_string);
						tags_with_brackets_compile = this.parse_data(final_code_compiled,"<",">");
						
					}
					
					
					final_code_compiled = final_code_compiled
								.replace(gamm_lt_tag_string,"<")
								.replace(gamm_gt_tag_string,">")
								.replace(gamm_ampersand_string,"&")
								.replace(gamm_start_brackets,"gamm_echo(")
								.replace(gamm_end_brackets,");");
					

					// console.log(final_code_compiled);

					this.last_compiled_before_error[this.last_compiled_before_error.length] = {
						function : "GAMM_EVAL",
						code : final_code_compiled
					};
					eval(final_code_compiled);
					
					this.compiled_template = this.compiled_template.replace(gamm_start_identifier + gamm_el_codes[0] + gamm_end_identifier,  gamm_final_code);
					
					gamm_el_codes = this.parse_data(this.compiled_template,gamm_start_identifier,gamm_end_identifier);
					
				}
				catch(gamm_code_error){
					// console.log("ERROR CODE: " + gamm_code_error);
					this.compiled_template = this.compiled_template.replace(gamm_start_identifier + gamm_el_codes[0] + gamm_end_identifier,"[object-undefined]");
					gamm_el_codes = this.parse_data(this.compiled_template,gamm_start_identifier,gamm_end_identifier);

					this.last_compiled_before_error[this.last_compiled_before_error.length - 1]["error"] = gamm_code_error;
					console.log( this.last_compiled_before_error[this.last_compiled_before_error.length - 1] );

				}
				
			}
			
			


		}
		catch(gamm_codes_error){
			console.log("ERROR CODES: " + gamm_codes_error);
		}
    };
    
    this.compile_events = function(){
		
		try{
			
			var gamm_el_events = "";
			
			gamm_el_events = this.parse_data(this.compiled_template,"gamm-events=\"","\"");
			
			
			var gamm_el_events_counter = 0;
			var quote_regex =  new RegExp("\'","g");
			
			while(gamm_el_events.length > 0){
				
				try{
					var gamm_events = "";
					
		
					gamm_events = JSON.parse(gamm_el_events[0].replace(quote_regex,'"') );
						
					this.last_compiled_before_error[this.last_compiled_before_error.length] = {
						function : "GAMM_EVENTS",
						code : gamm_events
					};
					
					var gamm_temp_data = "";
					
					for(var gamm_key in gamm_events){
						
						try{

							
							var gamm_temp_element_attribute = 'data-gamm_' + gamm_key + '="' + '' + this.template_id + '_' + gamm_el_events_counter + '"';
							var gamm_temp_element_attribute_key = 'data_gamm_' + gamm_key + '_' + '' + this.template_id + '_' + gamm_el_events_counter ;
							gamm_temp_data += gamm_temp_element_attribute + ' ';

							this.last_compiled_before_error[this.last_compiled_before_error.length] = {
								function : "GAMM_EVENTS",
								code : gamm_temp_data
							};
							
							this.gamm_element_and_events[ gamm_temp_element_attribute_key ] = {
								
								element : "[" + gamm_temp_element_attribute + "]",
								event : gamm_events[gamm_key],
								on : gamm_key
								
							};
						}
						catch(gamm_event_error){

							this.last_compiled_before_error[this.last_compiled_before_error.length - 1]["error"] = gamm_event_error;
							console.log(this.last_compiled_before_error[this.last_compiled_before_error.length - 1]);
						}
						
						
						
						gamm_el_events_counter++;
					}
					
					
					
					
					this.last_compiled_before_error[this.last_compiled_before_error.length] = {
						function : "GAMM_EVENTS",
						code : gamm_temp_data
					};
						
					this.compiled_template = this.compiled_template.replace("gamm-events=\"" + gamm_el_events[0] + "\"",gamm_temp_data);
					gamm_el_events = this.parse_data(this.compiled_template,"gamm-events=\"","\"");
					
					
				}
				catch(gamm_err){

					this.last_compiled_before_error[this.last_compiled_before_error.length - 1]["error"] = gamm_err;
					console.log(this.last_compiled_before_error[this.last_compiled_before_error.length - 1]);
					
						
					this.compiled_template = this.compiled_template.replace("gamm-events=\"" + gamm_el_events[0] + "\"","data-gamm='"+gamm_err+"'");
					gamm_el_events = this.parse_data(this.compiled_template,"gamm-events=\"","\"");
						
					
				}
				
			}
			
			
			
			
		}
		catch(gamm_err){

			this.last_compiled_before_error[this.last_compiled_before_error.length - 1]["error"] = gamm_err;
			console.log(this.last_compiled_before_error[this.last_compiled_before_error.length - 1]);
			
		}
		
		
    };
    
    this.compile_datas = function(){

		try{
	
			// this.compiled_template = this.compiled_template;
			var gamm_el_global_datas = this.parse_data(this.compiled_template,"{{$","}}");
			
			while(gamm_el_global_datas.length > 0){
				
				try{
					
					this.last_compiled_before_error[this.last_compiled_before_error.length] = {
						function : "GAMM_GLOBAL_DATA",
						code : gamm_el_global_datas[0]
					};

					this.compiled_template = this.compiled_template.replace("{{$" + gamm_el_global_datas[0] + "}}", eval( gamm_el_global_datas[0] ) );
					gamm_el_global_datas = this.parse_data(this.compiled_template,"{{$","}}");
					
				}
				catch(gamm_data_error){
					

					this.last_compiled_before_error[this.last_compiled_before_error.length - 1]["error"] = gamm_data_error;
					console.log(this.last_compiled_before_error[this.last_compiled_before_error.length - 1]);

					this.compiled_template = this.compiled_template.replace("{{$" + gamm_el_global_datas[0] + "}}","[object-undefined]");
					gamm_el_global_datas = this.parse_data(this.compiled_template,"{{$","}}");
				}
				
			}
			
			
		}
		catch(gamm_datas_error){

			this.last_compiled_before_error[this.last_compiled_before_error.length - 1]["error"] = gamm_datas_error;
			console.log(this.last_compiled_before_error[this.last_compiled_before_error.length - 1]);
		}
		
		try{
	
			// this.compiled_template = this.compiled_template;
			var gamm_el_datas = this.parse_data(this.compiled_template,"{{","}}");
			
			while(gamm_el_datas.length > 0){
				
				try{

					this.last_compiled_before_error[this.last_compiled_before_error.length] = {
						function : "GAMM_DATA",
						code : gamm_el_datas[0]
					};
					
					this.compiled_template = this.compiled_template.replace("{{" + gamm_el_datas[0] + "}}", eval( "this.data." + gamm_el_datas[0] ) );
					gamm_el_datas = this.parse_data(this.compiled_template,"{{","}}");
					
				}
				catch(gamm_data_error){
					

					this.last_compiled_before_error[this.last_compiled_before_error.length - 1]["error"] = gamm_data_error;
					console.log(this.last_compiled_before_error[this.last_compiled_before_error.length - 1]);

					this.compiled_template = this.compiled_template.replace("{{" + gamm_el_datas[0] + "}}","[object-undefined]");
					gamm_el_datas = this.parse_data(this.compiled_template,"{{","}}");
				}
				
			}
			
			
		}
		catch(gamm_datas_error){

			this.last_compiled_before_error[this.last_compiled_before_error.length - 1]["error"] = gamm_datas_error;
			console.log(this.last_compiled_before_error[this.last_compiled_before_error.length - 1]);
			
		}

		
		
    };
    
    this.distribute_events = function(){
		
		var $this = this;
		
		try{
			
			for(var index in this.gamm_element_and_events){
				
				eval(
					"var $gamm_doc = document.querySelectorAll('" + this.gamm_element_and_events[index].element + "'); \
					for(var $gamm_kkk in $gamm_doc){	\
							$gamm_doc[$gamm_kkk].on" + this.gamm_element_and_events[index].on + " = function($event){ \
							$this.gamm_events." + this.gamm_element_and_events[index].event + ".call($this,this,$event); \
							if($this.element != null){ \
								$this.init_element.call($this); \
							}else{ \
								$this.reload.call($this); \
							} \
						}; \
					}"
				);
				
			}
			
		}
		catch(gamm_events_error){
			console.log("ERROR EVENT: " + gamm_events_error);
		}
		
	};

    this.compile_models = function(){
		
		try{
			

			var $this = this;
			var gamm_models = document.querySelectorAll("#" + this.template_id + " [name]");
			
			for(var i = 0; i < gamm_models.length; i++){
				
				var gamm_value = "";
				var gamm_model = gamm_models[i];

				this.last_compiled_before_error[this.last_compiled_before_error.length] = {
					function : "GAMM_MODELS",
					code : gamm_model
				};

				gamm_value = eval("this.data." + gamm_model.name );

				if(gamm_model.tagName == "INPUT" && (gamm_model.type =="radio" || gamm_model.type == "checkbox") ){

					if(gamm_model.type == "checkbox" || gamm_model.type == "radio"){

						var boxes = document.querySelectorAll("#" + this.template_id + " [name='" + gamm_model.name + "']");
						for(var j = 0; j < boxes.length; j++){

							if(gamm_value.indexOf(boxes[j].value) > -1){
								boxes[j].checked = true;
							}
							else{
								boxes[j].checked = false;
							}

						}

					}


				}
				else{
					gamm_model.value = gamm_value;
				}
				
				
				
				try{
					
					if(gamm_model.tagName == "TEXTAREA"){
					
						if( this.textareas[gamm_model.name] !== undefined){
							
							document.querySelectorAll("#" + this.template_id + " [name='" + gamm_model.name + "']")[0].style.width = this.textareas[gamm_model.name].width;
							document.querySelectorAll("#" + this.template_id + " [name='" + gamm_model.name + "']")[0].style.height = this.textareas[gamm_model.name].height;
							
						}
						
						
						
					}
					
					
				}
				catch(ta_init_error){
					console.log(ta_init_error);
				}
				
				if(gamm_model.tagName == "TEXTAREA"){

					gamm_model.onmouseup = function(){

						
						
						if( $this.textareas[this.name] === undefined){
							
							$this.textareas[this.name] = {
								width: this.style.width,
								height : this.style.height
							};
							
						}
						
						if( this.style.width != $this.textareas[this.name].width || this.style.height != $this.textareas[this.name].height ){
							$this.textareas[this.name].height = this.style.height;
							$this.textareas[this.name].width = this.style.width;
						}
						
					};
					
				}
				
				
				gamm_model.onkeyup = function(){

					
					
					var similiar_elems = document.querySelectorAll("#" + $this.template_id + " [name='" + this.name + "']");
					var index_elem = 0;
					var gamm_data = eval("$this.data." + this.name + "");

					for(var elem_i = 0; elem_i < similiar_elems.length; elem_i++){
						if(this == similiar_elems[i]){
							index_elem = i;
						}
					}

					if(this.type == "radio" || this.type == "checkbox" ){

						if(this.type == "radio"){

							if(this.checked){
								
								eval("$this.data." + this.name + " = this.value;");
								// $this.data[this.name] = this.value;
								
							}

						}
						else{
							
							if(this.checked){

								if(gamm_data.indexOf(this.value) < 0 ){

									// $this.data[this.name].push(this.value);
									eval("$this.data." + this.name + ".push(this.value);");

								}
								
								

							}
							else{
								
								var index = gamm_data.indexOf(this.value);									
								eval("$this.data." + this.name + ".splice(index,1);");
								
							}

							

						}

						var gamm_x_position = window.scrollX;
						var gamm_y_position = window.scrollY;

						$this.reload.call($this);						
						$this.focus( document.querySelectorAll("#" + $this.template_id + " [name='" + this.name + "']")[index_elem] );			
						window.scrollTo(gamm_x_position,gamm_y_position);

					}
					else{
						
						if(this.value != gamm_data){
							
							var gamm_x_position = window.scrollX;
							var gamm_y_position = window.scrollY;

							var caret = this.selectionStart;
							eval("$this.data." + this.name + "= this.value;");

							$this.reload.call($this);							
							$this.focus( document.querySelectorAll("#" + $this.template_id + " [name='" + this.name + "']")[index_elem] , caret);
							window.scrollTo(gamm_x_position,gamm_y_position);
							

						}

					}
					
					
					
					
				};
				
				gamm_model.onchange = function(){
					
					var similiar_elems = document.querySelectorAll("#" + $this.template_id + " [name='" + this.name + "']");
					var index_elem = 0;
					var gamm_data = eval("$this.data." + this.name + "");

					for(var elem_i = 0; elem_i < similiar_elems.length; elem_i++){
						if(this == similiar_elems[i]){
							index_elem = i;
						}
					}

					if(this.type == "radio" || this.type == "checkbox" ){

						if(this.type == "radio"){

							if(this.checked){
								
								eval("$this.data." + this.name + " = this.value;");
								// $this.data[this.name] = this.value;
								
							}

						}
						else{
							
							if(this.checked){

								if(gamm_data.indexOf(this.value) < 0 ){

									// $this.data[this.name].push(this.value);
									eval("$this.data." + this.name + ".push(this.value);");

								}
								
								

							}
							else{
								
								var index = gamm_data.indexOf(this.value);									
								eval("$this.data." + this.name + ".splice(index,1);");
								
							}

							

						}

						var gamm_x_position = window.scrollX;
						var gamm_y_position = window.scrollY;

						$this.reload.call($this);						
						$this.focus( document.querySelectorAll("#" + $this.template_id + " [name='" + this.name + "']")[index_elem] );			
						window.scrollTo(gamm_x_position,gamm_y_position);

					}
					else{
						
						if(this.value != gamm_data){

							var caret = this.selectionStart;
							eval("$this.data." + this.name + "= this.value;");


							var gamm_x_position = window.scrollX;
							var gamm_y_position = window.scrollY;

							$this.reload.call($this);							
							$this.focus( document.querySelectorAll("#" + $this.template_id + " [name='" + this.name + "']")[index_elem] , caret);
							window.scrollTo(gamm_x_position,gamm_y_position);
						}

					}

					
				};
				
			}
			
		}
		catch(gamm_models_error){

			this.last_compiled_before_error[this.last_compiled_before_error.length - 1]["error"]= gamm_models_error;
			console.log(this.last_compiled_before_error[this.last_compiled_before_error.length - 1]);
		}
		
    };
    
    this.parse_data = function($data,$first_pattern,$second_pattern){

		var $length = $data.length;
		var $return_data = [];
		var $ctr = 0;
		var $length1 = $first_pattern.length;
		var $length2 = $second_pattern.length;

		for(var $i = 0; $i < $length; $i++){

			if($length1 != 0 ){

				var $str1 = $data.substr($i,$length1);

				if($str1 == $first_pattern){

					var $ctr_length = 0;

					for(var $j = ($i + $length1); $j < $length; $j++){

						$ctr_length++;

						if($j < $length){

							var $str2 = $data.substr($j,$length2);

							if($str2 == $second_pattern){
								var $data_value = $data.substr($i + $length1, $ctr_length - 1);
								$return_data[$ctr] = $data_value;
								$ctr++;

								$i = $i + $length1 + ($ctr_length - 1);
								$j = $length;
							}

						}
					}

				}

			}

		}

		return $return_data;
    };
    
    this.read_template = function(path,method){
		
		var xhttp = null;
        var data = "";
        
        if(method === undefined){
            method = "GET";
        }

		if (window.XMLHttpRequest) {
			// code for modern browsers
			xhttp = new XMLHttpRequest();
		 } else {
			// code for old IE browsers
			xhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		
		
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {			   
			   data = xhttp.responseText;
			}
		};
		xhttp.open(method, path, false);
		xhttp.send();
		
		return data;
    };
    
    this.prepend_to = function(selector){
		
		if(this.load != null){
			this.load.call(this);
		}
		
		this.compile_codes();
		this.compile_events(); 				
		this.compile_datas();		
		try{
			
			var template_div = document.createElement("div");
			template_div.id = this.template_id;
			template_div.innerHTML = this.compiled_template;


			document.querySelector(selector).prepend(template_div);
		}
		catch(gamm_html_error){
			this.template = "";
		}
		this.distribute_events();
		this.compile_models();
		
    };
    
    this.append_to = function(selector){
		
		if(this.load != null){
			this.load.call(this);
		}
		
		this.compile_codes();
		this.compile_events(); 				
		this.compile_datas();		
		try{
			
			var template_div = document.createElement("div");
			template_div.id = this.template_id;
			template_div.innerHTML = this.compiled_template;


			document.querySelector(selector).append(template_div);
		}
		catch(gamm_html_error){
			this.template = "";
		}
		this.distribute_events();
		this.compile_models();
    };
    
    this.init_element = function(){
		
		if(this.load != null){
			this.load.call(this);
		}
		
		
		this.compile_codes();
		this.compile_events(); 						
		this.compile_datas(); 		
		try{
			
			document.querySelector(this.element).innerHTML = "<div id='" + this.template_id + "'>" + this.compiled_template + "</div>";
			
		}
		catch(gamm_html_error){
			this.template = "";
		}
				
		this.distribute_events();
		this.compile_models();
		
    }
    
    this.reload = function(){
		
		try{

			this.compile_codes();
			this.compile_events(); 		
			this.compile_datas(); 				
			document.querySelector("#" + this.template_id).innerHTML = this.compiled_template ;
			this.distribute_events();
			this.compile_models();

		}
		catch(gamm_err){

		}
			
    };
    
    this.get_data = function(){
		return "<div id='" + this.template_id + "'>" + this.compiled_template + "</div>";
    };
    
    this.other = function($class,$data,$value){
		
		eval("$class." + $data + " = $value");
		$class.reload.call($class);
		
    };
    
    this.focus = function(element,caret = 0) {
		var eventType = "onfocusin" in element ? "focusin" : "focus",
			bubbles = "onfocusin" in element,
			event;

		if ("createEvent" in document) {
			event = document.createEvent("Event");
			event.initEvent(eventType, bubbles, true);
		}
		else if ("Event" in window) {
			event = new Event(eventType, { bubbles: bubbles, cancelable: true });
		}

		element.focus();
		element.dispatchEvent(event);

		if( (element.tagName.toLowerCase() == "input" && element.type == "text") || element.tagName.toLowerCase() == "textarea"){
			element.setSelectionRange(caret,caret);
		}
    };
    
    this.q = function($query){

		function gamm_elment($query){
				
				var $index = null;
				var $d = null;
				if(typeof $query == "string"){

					if( $query.indexOf(":index(") > 0 ){
						var $q_str = $query.split(":index(");
						

						$index = $q_str[1].replace(")","");

					
						$d = document.querySelectorAll($q_str[0]);
					}
					else{
						$d = document.querySelectorAll($query);
					}

					
				}
				else{
					$d = $query;
					
				}
				// console.log($d);
				
			

				this.size = $d.length;
				
				this.on = function($event,$func){

					if($index != null){
						
						eval("$d[$index].on" + $event + " = $func;");

					}
					else{

						if($d.length > 0){

							for(var $i = 0; $i < $d.length; $i++){
								eval("$d[$i].on" + $event + " = $func;");
							}
	
						}
						else{
							eval("$d.on" + $event + " = $func;");
						}

					}
					
					
				};

				this.prop = function($prop,$val){

					if($val !== undefined){

						if($index != null){
						
							eval("$d[$index]." + $prop + " = $val;");
	
						}
						else{
	
							if($d.length > 0){
	
								for(var $i = 0; $i < $d.length; $i++){
									eval("$d[$i]." + $prop + " = $val;");
								}
		
							}
							else{
								eval("$d." + $prop + " = $val;");
							}
	
						}

					}
					else{

						var $return_value = "";

						if($index != null){
						
							eval("$return_value = $d[$index]." + $prop + ";");
	
						}
						else{

							if($d.length > 0){
		
								for(var $i = 0; $i < $d.length; $i++){
									eval("$return_value = $d[$i]." + $prop + ";");
								}
		
							}
							else{
								eval("$return_value = $d." + $prop + ";");
							}
						}

						return $return_value;

					}
					


				};

				this.html = function($val){

					if($val !== undefined){

						if($index != null){
						
							eval("$d[$index].innerHTML = $val;");
	
						}
						else{
	
							if($d.length > 0){
	
								for(var $i = 0; $i < $d.length; $i++){
									eval("$d[$i].innerHTML = $val;");
								}
		
							}
							else{
								eval("$d.innerHTML = $val;");
							}
	
						}

					}
					else{

						var $return_value = "";

						if($index != null){
						
							eval("$return_value = $d[$index].innerHTML;");
	
						}
						else{

							if($d.length > 0){
		
								for(var $i = 0; $i < $d.length; $i++){
									eval("$return_value = $d[$i].innerHTML;");
								}
		
							}
							else{
								eval("$return_value = $d.innerHTML;");
							}
						}

						return $return_value;

					}

				};

				this.text = function($val){

					if($val !== undefined){

						if($index != null){
						
							eval("$d[$index].innerText = $val;");
	
						}
						else{
	
							if($d.length > 0){
	
								for(var $i = 0; $i < $d.length; $i++){
									eval("$d[$i].innerText = $val;");
								}
		
							}
							else{
								eval("$d.innerText = $val;");
							}
	
						}

					}
					else{

						var $return_value = "";

						if($index != null){
						
							eval("$return_value = $d[$index].innerText;");
	
						}
						else{

							if($d.length > 0){
		
								for(var $i = 0; $i < $d.length; $i++){
									eval("$return_value = $d[$i].innerText;");
								}
		
							}
							else{
								eval("$return_value = $d.innerText;");
							}
						}

						return $return_value;

					}

				};

				this.val = function($val){

					if($val !== undefined){

						if($index != null){
						
							eval("$d[$index].value = $val;");
	
						}
						else{
	
							if($d.length > 0){
	
								for(var $i = 0; $i < $d.length; $i++){
									eval("$d[$i].value = $val;");
								}
		
							}
							else{
								eval("$d.value = $val;");
							}
	
						}

					}
					else{

						var $return_value = "";

						if($index != null){
						
							eval("$return_value = $d[$index].value;");
	
						}
						else{

							if($d.length > 0){
		
								for(var $i = 0; $i < $d.length; $i++){
									eval("$return_value = $d[$i].value;");
								}
		
							}
							else{
								eval("$return_value = $d.value;");
							}
						}

						return $return_value;

					}

				};

				this.attr = function($attr,$val){

					if($val !== undefined){

						if($index != null){
						
							eval("$d[$index].setAttribute($attr,$val);");
	
						}
						else{
	
							if($d.length > 0){
	
								for(var $i = 0; $i < $d.length; $i++){
									eval("$d[$i].setAttribute($attr,$val)");
								}
		
							}
							else{
								eval("$d.setAttribute($attr,$val);");
							}
	
						}

					}
					else{

						var $return_value = "";

						if($index != null){
						
							eval("$return_value = $d[$index].getAttribute($attr);");
	
						}
						else{

							if($d.length > 0){
		
								for(var $i = 0; $i < $d.length; $i++){
									eval("$return_value = $d[$i].getAttribute($attr);");
								}
		
							}
							else{
								eval("$return_value = $d.getAttribute($attr);");
							}
						}

						return $return_value;

					}

				};

				this.data = function($data,$val){

					if($val !== undefined){

						if($index != null){
						
							eval("$d[$index].setAttribute('data-' + $data,$val);");
	
						}
						else{
	
							if($d.length > 0){
	
								for(var $i = 0; $i < $d.length; $i++){
									eval("$d[$i].setAttribute('data-' + $data,$val)");
								}
		
							}
							else{
								eval("$d.setAttribute('data-' + $data,$val);");
							}
	
						}

					}
					else{

						var $return_value = "";

						if($index != null){
						
							eval("$return_value = $d[$index].getAttribute('data-' + $data);");
	
						}
						else{

							if($d.length > 0){
		
								for(var $i = 0; $i < $d.length; $i++){
									eval("$return_value = $d[$i].getAttribute('data-' + $data);");
								}
		
							}
							else{
								eval("$return_value = $d.getAttribute('data-' + $data);");
							}
						}

						return $return_value;

					}

				};


				
				this.element = $d;

			
			
			
			

            return this;
		}

		return new gamm_elment($query);


	};

    //main----------------------------------------

    
    if(args !== undefined){

        if(args.element !== undefined){
				
            try{
                this.template = document.querySelectorAll(args.element)[0].innerHTML;
            }
            catch(gamm_html_error){
                this.template = "";
            }
            
            this.element = args.element;
            this.convert_to_html();
            
		}
		else if(args.file !== undefined){
			this.template = this.read_template(args.file);
			this.convert_to_html();
		}
		else if(args.html !== undefined){
			var temp_template = this.parse_data(args.html + "","/*","*/");
			this.template = temp_template[0];
			this.convert_to_html();
		}
        else{

            this.template = args.template;
            this.convert_to_html();
        }

        if(args.data !== undefined){
            this.data = args.data;
        }
        
        if(args.events !== undefined){
            this.gamm_events = args.events;
        }

		if(args.load !== undefined){
            this.load = args.load;
        }

        this.make_template_id();


        if(this.element != null){
            this.init_element();			
        }

		if(args.block !== undefined){
			
			this.component(args.block);
		}

		

    }

    this.http = {

        post : function(url,options){

            var method = "POST";
            var path = url;
            var async_bool = false;
            
            var xhttp = null;
        
            var data = "";
            var params = "";

            if(options.async !== undefined){
                async_bool = options.async;
            }
            

            if(options.data !== undefined){
                
                if(typeof options.data === "object"){
                    // console.log(typeof options.data );
                    for(var k in options.data){
        
                        params += k + "=" + encodeURI(options.data[k]) + "&";
            
                    }
                    params = params.substring(0,params.length - 1);
        
                }
                else{
                    params = options.data;
                }
            }
        
        
            if (window.XMLHttpRequest) {
                // code for modern browsers
                xhttp = new XMLHttpRequest();
            } else {
                // code for old IE browsers
                xhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            
            
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {			   
                    if(!async_bool){
                        data = xhttp;
                    }
                    
                    if(options.success !== undefined){
                        options.success(xhttp);
                    }
                }
                else if(this.readyState == 4 && this.status != 200){
                    if(options.error !== undefined){
                        options.error(xhttp);
                    }
                }
            };
            
            
            xhttp.open(method, path, async_bool);
            var has_content_type = false;
            if(options.headers !== undefined){
                
                for(var k in options.headers){
                    
                    xhttp.setRequestHeader(k,options.headers[k]);
                    if(k.toLowerCase().indexOf("content-type") > -1 && has_content_type == false){
                        has_content_type = true;
                    }
                }
                
            }
            
            if(options.data !== undefined){
                if(!has_content_type){
                    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                }					
                xhttp.send(params);
            }
            else{
                xhttp.send();
            }
            
            
            if(!async_bool){
                return data;
            }

        },

        get : function(url,options){

            var method = "GET";
            var path = url;
            var async_bool = false;
            
            var xhttp = null;
        
            var data = "";
            var params = "";

            if(options.async !== undefined){
                async_bool = options.async;
            }

            if(options.data !== undefined){
                
                if(typeof options.data === "object"){
                    // console.log(typeof options.data );
                    for(var k in options.data){
        
                        params += k + "=" + encodeURI(options.data[k]) + "&";
            
                    }
                    params = params.substring(0,params.length - 1);
        
                }
                else{
                    params = options.data;
                }
            }
        
        
            if (window.XMLHttpRequest) {
                // code for modern browsers
                xhttp = new XMLHttpRequest();
            } else {
                // code for old IE browsers
                xhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            
            
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {			   
                    if(!async_bool){
                        data = xhttp;
                    }
                    
                    if(options.success !== undefined){
                        options.success(xhttp);
                    }
                }
                else if(this.readyState == 4 && this.status != 200){
                    if(options.error !== undefined){
                        options.error(xhttp);
                    }
                }
            };
            
            
            xhttp.open(method, path, async_bool);
            var has_content_type = false;
            if(options.headers !== undefined){
                
                for(var k in options.headers){
                    
                    xhttp.setRequestHeader(k,options.headers[k]);
                    if(k.toLowerCase().indexOf("content-type") > -1 && has_content_type == false){
                        has_content_type = true;
                    }
                }
                
            }
            
            if(options.data !== undefined){
                if(!has_content_type){
                    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                }					
                xhttp.send(params);
            }
            else{
                xhttp.send();
            }
            
            
            if(!async_bool){
                return data;
            }

        },
        
        request : function(url,options){

            var method = "POST";
            var path = url;
            var async_bool = false;
            
            var xhttp = null;
        
            var data = "";
            var params = "";

            if(options.async !== undefined){
                async_bool = options.async;
            }

            if(options.method !== undefined){
                method = options.method;
            }
            

            if(options.data !== undefined){
                
                if(typeof options.data === "object"){
                    // console.log(typeof options.data );
                    for(var k in options.data){
        
                        params += k + "=" + encodeURI(options.data[k]) + "&";
            
                    }
                    params = params.substring(0,params.length - 1);
        
                }
                else{
                    params = options.data;
                }
            }
        
        
            if (window.XMLHttpRequest) {
                // code for modern browsers
                xhttp = new XMLHttpRequest();
            } else {
                // code for old IE browsers
                xhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            
            
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {			   
                    if(!async_bool){
                        data = xhttp;
                    }
                    
                    if(options.success !== undefined){
                        options.success(xhttp);
                    }
                }
                else if(this.readyState == 4 && this.status != 200){
                    if(options.error !== undefined){
                        options.error(xhttp);
                    }
                }
            };
            
            
            xhttp.open(method, path, async_bool);
            var has_content_type = false;
            if(options.headers !== undefined){
                
                for(var k in options.headers){
                    
                    xhttp.setRequestHeader(k,options.headers[k]);
                    if(k.toLowerCase().indexOf("content-type") > -1 && has_content_type == false){
                        has_content_type = true;
                    }
                }
                
            }
            
            if(options.data !== undefined){
                if(!has_content_type){
                    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                }					
                xhttp.send(params);
            }
            else{
                xhttp.send();
            }
            
            
            if(!async_bool){
                return data;
            }

        }

    };

    return this;

}