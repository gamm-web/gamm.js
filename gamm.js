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
			this.convert_to_html();
			
		}
		else if(args.element !== undefined){
			
			this.template = document.querySelectorAll(args.element)[0].innerHTML;
			this.element = args.element;
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
		
		
		
		this.make_template_id();
		
		
		if(this.element != null){
			this.init_element();			
		}
		
		
		
	}
	
	convert_to_html(){
		
		var parser = new DOMParser();
		var doc = parser.parseFromString(this.template, 'text/html');
		for(var i = 0; i < doc.querySelectorAll("body *").length; i++){
			doc.querySelectorAll("body *")[i].setAttribute("data-gamm","true");
		}
		this.template = doc.body.innerHTML;
		
	}
	
	convert_to_text(str){
		var parser = new DOMParser();
		var doc = parser.parseFromString(this.template, 'text/html');
		var text = doc.body.innerText;
		return text;
		
	}
	
	compile_events(){
		
		try{
			
			// this.compiled_template = this.template;
			var gamm_el_events = "";
			
			gamm_el_events = this.parse_data(this.compiled_template,"gamm-events=\"","\"");
			
			
			var gamm_el_events_counter = 0;
			var quote_regex =  new RegExp("\'","g");
			
			// console.log(this.compiled_template);
			
			while(gamm_el_events.length > 0){
				
				try{
					var gamm_events = "";
					
		
					gamm_events = JSON.parse(gamm_el_events[0].replace(quote_regex,'"') );
						
					
					
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
					
					
					
					
					
						
					this.compiled_template = this.compiled_template.replace("gamm-events=\"" + gamm_el_events[0] + "\"",gamm_temp_data);
					gamm_el_events = this.parse_data(this.compiled_template,"gamm-events=\"","\"");
					
					
				}
				catch(gamm_err){
					console.log(gamm_err);
					
					
					
						
					this.compiled_template = this.compiled_template.replace("gamm-events=\"" + gamm_el_events[0] + "\"","data-gamm='"+gamm_err+"'");
					gamm_el_events = this.parse_data(this.compiled_template,"gamm-events=\"","\"");
						
					
				}
				
			}
			
			
			
			
		}
		catch(gamm_err){
			console.log(gamm_err);
		}
		
		
	}
	
	compile_datas(){
		
		try{
	
			// this.compiled_template = this.compiled_template;
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
	
	compile_codes(){
		
		try{
			
			this.compiled_template = this.template;
			var gamm_start_identifier = "&lt;#gamm";
			var gamm_end_identifier = "#&gt;";
			
			
			
			var gamm_el_codes = this.parse_data(this.compiled_template,gamm_start_identifier,gamm_end_identifier);
			var gamm_temp_code = "";
			var gamm_final_code = "";
			
			
			var gamm_open_tag = new RegExp("<","g");
			var gamm_open_end_tag = new RegExp("</","g");
			
			var gamm_close_tag = new RegExp(" >","g");
			var gamm_close_quote_tag = new RegExp("\">","g");
			var gamm_close_end_tag = new RegExp(">","g");
			
			
			// final replacements
			var gamm_lt_tag_string = new RegExp("&lt;","g");
			var gamm_gt_tag_string = new RegExp("&gt;","g");
			var gamm_double_quotes = new RegExp("\"","g");
			var gamm_new_lines = new RegExp("\n","g");
			var gamm_end_lines = new RegExp("\r","g");
			var gamm_tabs = new RegExp("\t","g");
			
			var gamm_end_lt_tag = new RegExp("gamm_end_lt_tag","g");
			var gamm_end_gt_tag = new RegExp("gamm_end_gt_tag","g");
			
			var gamm_start_quote_gt_tag = new RegExp("gamm_start_quote_gt_tag","g");
			var gamm_start_gt_tag = new RegExp("gamm_start_gt_tag","g");
			var gamm_start_lt_tag = new RegExp("gamm_start_lt_tag","g");
			
			
			
			function gamm_echo(str){
				gamm_final_code += str;
			}
			
			
			 
			while(gamm_el_codes.length > 0){
				
				try{
					gamm_temp_code = gamm_el_codes[0];
					
					console.log(gamm_temp_code);
					
					// gamm_temp_code = gamm_temp_code
									// .replace(gamm_open_end_tag,"gamm_end_lt_tag")
									// .replace(gamm_close_tag,"gamm_start_gt_tag")
									// .replace(gamm_close_quote_tag,"\"gamm_start_quote_gt_tag")
									// .replace(gamm_open_tag,"gamm_start_lt_tag")
									// .replace(gamm_close_end_tag,"gamm_end_gt_tag")
									// .replace(gamm_double_quotes,'\\"');
					
					
					// gamm_temp_code = gamm_temp_code
									// ;
					
					// gamm_temp_code = gamm_temp_code
									// .replace(gamm_end_lt_tag,"); gamm_echo(\"</")
									// .replace(gamm_end_gt_tag,">\");")
									// .replace(gamm_start_quote_gt_tag,"\\\">\"); gamm_echo(")
									// .replace(gamm_start_lt_tag," gamm_echo(\"<");
									
					// gamm_temp_code = gamm_temp_code
									// .replace(gamm_lt_tag_string,"<")
									// .replace(gamm_gt_tag_string,">")
									// .replace(gamm_new_lines,"")
									// .replace(gamm_end_lines,"")
									// .replace(gamm_tabs,"")
									// .replace(/  +/g, ' ');
									
					
					
					// var check_doubles_gamm_echo = gamm_temp_code.indexOf("gamm_echo( gamm_echo(");
					// var check_doubles_end_echo = gamm_temp_code.indexOf("););");
					
					// while( check_doubles_gamm_echo > -1 || check_doubles_end_echo > -1 ){
						
						// gamm_temp_code = gamm_temp_code.replace("gamm_echo( gamm_echo(","gamm_echo(");
						// gamm_temp_code = gamm_temp_code.replace("););",");");
						// check_doubles_gamm_echo = gamm_temp_code.indexOf("gamm_echo( gamm_echo(");
						// check_doubles_end_echo = gamm_temp_code.indexOf("););");
						
					// }
					
					console.log(gamm_temp_code);
					var test_code = this.parse_data(gamm_temp_code,"{{","}}");
					
					while( test_code.length > 0 ){
						
						gamm_temp_code = gamm_temp_code.replace("{{" + test_code[0] + "}}",'" + ' + test_code[0] + '  + "');
						test_code = this.parse_data(gamm_temp_code,"{{","}}");
					}
					
					
					
				for(var i = 0; i < strlen(gamm_temp_code); i++){
					
					
					
				}
					
					
					
					
					console.log(gamm_temp_code);
					eval(gamm_temp_code);
					
					
					console.log(gamm_final_code);
					
					
					
					
					
					this.compiled_template = this.compiled_template.replace(gamm_start_identifier + gamm_el_codes[0] + gamm_end_identifier,  gamm_final_code);
					
					gamm_el_codes = this.parse_data(this.compiled_template,gamm_start_identifier,gamm_end_identifier);
					
				}
				catch(gamm_code_error){
					console.log("ERROR CODE: " + gamm_code_error);
					this.compiled_template = this.compiled_template.replace(gamm_start_identifier + gamm_el_codes[0] + gamm_end_identifier,"[object-undefined]");
					gamm_el_codes = this.parse_data(this.compiled_template,gamm_start_identifier,gamm_end_identifier);
				}
				
			}
			
			


		}
		catch(gamm_codes_error){
			console.log("ERROR CODES: " + gamm_codes_error);
		}
		
		
	}
	
	distribute_events(){
		// "use strict";
		var $this = this;
		
		try{
			
			for(var index in this.gamm_element_and_events){
				
				eval(
					"document.querySelector('" + this.gamm_element_and_events[index].element + "').on" + this.gamm_element_and_events[index].on + " = function(){ \
						$this.gamm_events." + this.gamm_element_and_events[index].event + ".call($this); \
						if($this.element != null){ \
							$this.init_element.call($this); \
						}else{ \
							$this.reload(); \
						} \
					};"
				);
				
			}
			
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
	
	
	
	append_to(selector){
		this.compile_codes();
		this.compile_events(); 
		this.compile_datas();		
		document.querySelector(selector).innerHTML += "<div id='" + this.template_id + "'>" + this.compiled_template + "</div>";
		this.distribute_events();
	}
	
	init_element(){
		this.compile_codes();
		this.compile_events(); 
		this.compile_datas(); 		
		document.querySelector(this.element).innerHTML = "<div id='" + this.template_id + "'>" + this.compiled_template + "</div>";
		this.distribute_events();
		
	}
	
	reload(){
		this.compile_codes();
		this.compile_events(); 
		this.compile_datas(); 		
		document.querySelector("#" + this.template_id).innerHTML = this.compiled_template ;
		this.distribute_events();
	}
	
	
	
	get_data(){
		return "<div id='" + this.template_id + "'>" + this.compiled_template + "</div>";
	}
	
	other($class,$data,$value){
		
		$class.data[$data] = $value;
		$class.reload.call($class);
		
	}
	
	
	
	//statics
	static append(selector,value){
		
		document.querySelector(selector).innerHTML += value;
		
	}
	
	
	
}