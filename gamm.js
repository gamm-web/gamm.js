window.GAMM_IDS = [];
class Gamm{
	
	element = null;
	template_id = "";
	template = "";
	compiled_template = "";
	data = {};
	gamm_events = {};
	options = [];
	
	stored_events = {};
	compiled_events = {};
	
	
	gamm_element_and_events = {};
	
	
	constructor(args){
		
		this.template = "";
		
		if(args.file !== undefined){
			
			this.template = this.read_template(args.file);
			
		}
		else if(args.element !== undefined){
			
			this.template = document.querySelectorAll(args.element)[0].innerHTML;
			this.element = args.element;
			
		}
		else{
			
			this.template = args.template;
			
		}
		
		if(args.data !== undefined){
			this.data = args.data;
		}
		
		if(args.events !== undefined){
			this.gamm_events = args.events;
		}
		
		
		
		this.make_template_id();
		this.compile_events();
		this.compile_datas();
		
		if(this.element != null){
			this.init_element();
			this.distribute_events();
		}
		
		
		
	}
	
	compile_events(){
		
		try{
			
			this.compiled_template = this.template;
			var gamm_el_events = "";
			
			if(this.element != null){
				gamm_el_events = this.parse_data(this.compiled_template,"gamm-events=\"","\"");
			}
			else{
				gamm_el_events = this.parse_data(this.compiled_template,"gamm-events={","}");
			}
			
			var gamm_el_events_counter = 0;
			var quote_regex =  new RegExp("\'","g");
			
			while(gamm_el_events.length > 0){
				
				try{
					var gamm_events = "";
					
					if( gamm_el_events[0].indexOf("'") > 0){
						
						gamm_events = JSON.parse(gamm_el_events[0].replace(quote_regex,'"') );
						// console.log(gamm_events);
					}
					else{
						gamm_events = JSON.parse("{" + gamm_el_events[0] + "}");
					}
					
					
					
					var gamm_temp_data = "";
					
					for(var gamm_key in gamm_events){
						
						try{
							var gamm_temp_element_attribute = 'data-gamm_' + gamm_key + '="' + '' + this.template_id + '_' + gamm_el_events_counter + '"';
							var gamm_temp_element_attribute_key = 'data_gamm_' + gamm_key + '_' + '' + this.template_id + '_' + gamm_el_events_counter ;
							gamm_temp_data += gamm_temp_element_attribute + ' ';
							
							this.gamm_element_and_events[ gamm_temp_element_attribute_key ] = {
								
								element : "[" + gamm_temp_element_attribute + "]",
								event : gamm_events[gamm_key],
								on : gamm_key
								
							};
						}
						catch(gamm_event_error){
							console.log("ERROR EVENT: " + gamm_event_error);
						}
						
						
						
						gamm_el_events_counter++;
					}
					
					
					
					
					if(this.element != null){
						
						this.compiled_template = this.compiled_template.replace("gamm-events=\"" + gamm_el_events[0] + "\"",gamm_temp_data);
						gamm_el_events = this.parse_data(this.compiled_template,"gamm-events=\"","\"");
					}
					else{
						
						this.compiled_template = this.compiled_template.replace("gamm-events={" + gamm_el_events[0] + "}",gamm_temp_data);
						gamm_el_events = this.parse_data(this.compiled_template,"gamm-events={","}");
					}
					
				}
				catch(gamm_err){
					console.log(gamm_err);
					
					
					if(this.element != null){
						
						this.compiled_template = this.compiled_template.replace("gamm-events=\"" + gamm_el_events[0] + "\"","data-gamm='"+gamm_err+"'");
						gamm_el_events = this.parse_data(this.compiled_template,"gamm-events=\"","\"");
						
					}
					else{
						
						this.compiled_template = this.compiled_template.replace("gamm-events={" + gamm_el_events[0] + "}",gamm_temp_data);
						gamm_el_events = this.parse_data(this.compiled_template,"gamm-events={","}");
					}
				}
				
			}
			
			
			
			
		}
		catch(gamm_err){
			console.log(gamm_err);
		}
		
		
	}
	
	compile_datas(){
		
		try{
	
			this.compiled_template = this.compiled_template;
			var gamm_el_datas = this.parse_data(this.compiled_template,"{{","}}");
			
			while(gamm_el_datas.length > 0){
				
				try{
					
					this.compiled_template = this.compiled_template.replace("{{" + gamm_el_datas[0] + "}}", this.data[gamm_el_datas[0]] );
					gamm_el_datas = this.parse_data(this.compiled_template,"{{","}}");
					
				}
				catch(gamm_data_error){
					console.log("ERROR DATA: " + gamm_data_error);
					this.compiled_template = this.compiled_template.replace("{{" + gamm_el_datas[0] + "}}","[object-undefined]");
					gamm_el_datas = this.parse_data(this.compiled_template,"{{","}}");
				}
				
			}
			
			


		}
		catch(gamm_datas_error){
			console.log("ERROR DATA: " + gamm_datas_error);
		}
		
	}
	
	distribute_events(){
		"use strict";
		var $this = this;
		
		try{
			
			// var gamm_element_and_events = this.gamm_element_and_events;
			
			
			for(var index in this.gamm_element_and_events){
				
				
				
				
				eval("document.querySelector('" + this.gamm_element_and_events[index].element + "').on" + this.gamm_element_and_events[index].on + " = function(){ $this.gamm_events." + this.gamm_element_and_events[index].event + ".call($this); $this.compile_events.call($this); $this.compile_datas.call($this); $this.init_element.call($this); $this.distribute_events.call($this); };");
				// console.log(index, gamm_event);
				
				// this.stored_events[index] = function(){
					
					// console.log(this);
					// console.log(gamm_event);
					// $this.events[gamm_event].call($this); 
					// $this.events[gamm_event].call($this);
					
				
					// $this.compile_datas.call($this); 
					// $this.compile_events.call($this); 
					// if($this.element != null){ 
						// $this.init_element.call($this); 
					// }
					
					
				// };
				
				
				// this.compiled_events[ index ] = "document.querySelector( '" + gamm_element +  "' ).on" + gamm_on + " = this.stored_events['" + index + "'];";
				// console.log(this.compiled_events[ index ]);
				
			}
			
			// for(var gamm_key in this.compiled_events){
				// eval( this.compiled_events[gamm_key] );
			// }
			
			
		}
		catch(gamm_events_error){
			console.log("ERROR EVENT: " + gamm_events_error);
		}
		
	}
	
	parse_data($data,$first_pattern,$second_pattern){

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
	}
	
	read_template(path,method = "GET"){
		
		var xhttp = null;
		var data = "";
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
	}
	
	make_template_id(){
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
		}
		
	}
	
	
	
	append_template(selector){
		document.querySelector(selector).innerHTML += "<div id='" + this.template_id + "'>" + this.compiled_template + "</div>";
		
	}
	
	init_element(){
		
		document.querySelector(this.element).innerHTML = "<div id='" + this.template_id + "'>" + this.compiled_template + "</div>";
		
		
	}
	
	refresh_datas(){
		console.log(this);
		document.querySelector("#" + this.template_id).innerHTML = this.compiled_template ;
		
	}
	
	
	
	get_data(){
		return "<div id='" + this.template_id + "'>" + this.compiled_template + "</div>";
	}
	
	
	
	//statics
	static append(selector,value){
		
		document.querySelector(selector).innerHTML += value;
		
	}
	
	
	
}