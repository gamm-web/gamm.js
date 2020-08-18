window.GAMM_IDS = [];
class Gamm{
	
	element = null;
	template_id = "";
	template = "";
	compiled_template = "";
	data = {};
	events = {};
	options = [];
	
	stored_events = [];
	
	gamm_element_and_events = [];
	
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
			this.events = args.events;
		}
		
		
		
		this.make_template_id();
		this.compile_events();
		this.compile_datas();
		
		if(this.element != null){
			this.init_element();
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
			
			while(gamm_el_events.length > 0){
				
				try{
					var gamm_events = "";
					
					if( gamm_el_events[0].indexOf("'") > 0){
						var quote_regex =  new RegExp("\'","g");
						gamm_events = JSON.parse(gamm_el_events[0].replace(quote_regex,'"') );
					}
					else{
						gamm_events = JSON.parse("{" + gamm_el_events[0] + "}");
					}
					
					
					
					var gamm_temp_data = "";
					
					for(var gamm_key in gamm_events){
						
						try{
							var gamm_temp_element_attribute = 'data-gamm_' + gamm_key + '="' + '' + this.template_id + '_' + gamm_el_events_counter + '"';
							var gamm_temp_element_attribute_key = 'data_gamm_' + gamm_key + '_' + '' + this.template_id + '_' + gamm_el_events_counter + '"';
							gamm_temp_data += gamm_temp_element_attribute + ' ';
							
							this.gamm_element_and_events[ this.gamm_element_and_events.length ] = {
								
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
						gamm_el_events = this.parse_data(this.compiled_template,"gamm-events=\"","\"");
						this.compiled_template = this.compiled_template.replace("gamm-events=\"" + gamm_el_events[0] + "\"",gamm_temp_data);
					}
					else{
						gamm_el_events = this.parse_data(this.compiled_template,"gamm-events={","}");
						this.compiled_template = this.compiled_template.replace("gamm-events={" + gamm_el_events[0] + "}",gamm_temp_data);
					}
					
				}
				catch(gamm_err){
					console.log(gamm_err);
					
					
					if(this.element != null){
						gamm_el_events = this.parse_data(this.compiled_template,"gamm-events=\"","\"");
						this.compiled_template = this.compiled_template.replace("gamm-events=\"" + gamm_el_events[0] + "\"","data-gamm='"+gamm_err+"'");
					}
					else{
						gamm_el_events = this.parse_data(this.compiled_template,"gamm-events={","}");
						this.compiled_template = this.compiled_template.replace("gamm-events={" + gamm_el_events[0] + "}",gamm_temp_data);
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
		
		var $this = this;
		
		try{
			
			var gamm_element_and_events = this.gamm_element_and_events;
			
			
			for(var index in gamm_element_and_events){
				
				// console.log(gamm_key_event);
				
				var this_event = gamm_element_and_events[index];
				
				var gamm_element = this_event.element;
				var gamm_on = this_event.on;
				var gamm_event = this_event.event;
				
				console.log(gamm_element, $this.events[gamm_event] );
				eval( "document.querySelector( gamm_element ).on" + gamm_on + " = function(){ $this.events[gamm_event].call($this); $this.compile_datas.call($this); }; ");
				
				
			}
			console.log(this);
			
			
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
		this.distribute_events();
	}
	
	init_element(){
		
		document.querySelector(this.element).innerHTML = "<div id='" + this.template_id + "'>" + this.compiled_template + "</div>";
		this.distribute_events();
		
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