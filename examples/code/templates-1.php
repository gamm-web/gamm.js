<!DOCTYPE html>
<html>

<head>
	<title>
		Gamm.js Documentation - HTML Render
	</title>
	
	<script type="text/javascript" src="../../gamm.js"></script>

	<link rel="icon" href="../logo.jpg" sizes="32x32" />

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width">
	<!-- meta tags -->
<!-- Google / Search Engine Tags -->
<meta itemprop="name" content="GAMM-JS">
<meta itemprop="description" content="A Personal Javascript Library Alternative!">
<meta itemprop="image" content="logo.jpg">

<meta name="title" content="GAMM-JS">
<meta name="description" content="A Personal Javascript Library Alternative!">
<meta name="keywords" content="Javascript,HTML,Library">
<meta name="author" content="">

<!-- Facebook Meta Tags -->
<meta property="og:title" content="GAMM-JS" >
<meta property="og:description" content="A Personal Javascript Library Alternative!">
<meta property="og:image" content="../logo.jpg">
<meta property="og:url" content="https://www.juztpost.net/" >
<meta property="og:type" content="website">

<!-- Twitter Meta Tags -->
<meta name="twitter:title" content="GAMM-JS">
<meta name="twitter:description" content="A Personal Javascript Library Alternative!">
<meta name="twitter:image" content="../logo.jpg">
<meta name="twitter:card" content="summary_large_image">

</head>

<body>
	
<div id="main-content">		
		<div id="form-wrapper" style="width:30%; margin:10px; border:1px solid #333; padding:5px; float:left;">
		</div>

        <div id="form-results" style="width:30%; margin:10px; border:1px solid #333; padding:5px; float:left;">
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
	
	
    <script type="text/javascript">

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
				this.other(Result,"result",this.data);
			}
		}
	});

	FormTemplate.insert_to("#form-wrapper");

    </script>
</body>

</html>