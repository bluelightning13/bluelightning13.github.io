/*JS for projects.html*/

var projects = [["hydro", "Hydroponics", ["Overview" , "Gallery" , "Custom Lights"], "#83a969"],
				["drag", "Dragonfly Project", ["Overview" , "Gallery" ], "#7099ab"],
				["Thesis", "Blood Glucose Monitoring", ["Overview" , "Conclusion" ], "#845f7f"]];



function hex2rgb(hex) {	
    hex = hex.replace(/ |#/g, '');
    if(hex.length === 3) 
	{	
		hex = hex.replace(/(.)/g, '$1$1');
	}
    hex = hex.match(/../g);    
        return [parseInt(hex[0], 16), parseInt(hex[1], 16), parseInt(hex[2], 16)];

}

function rgb2hex(rgb) {
    rgb = Array.apply(null, arguments).join().match(/\d+/g);
    rgb = ((rgb[0] << 16) + (rgb[1] << 8) + (+rgb[2])).toString(16);
    return rgb;
}

function shade(hex, scale)
{
	hex = hex.replace(/ |#/g, '');
    if(hex.length === 3) 
	{	
		hex = hex.replace(/(.)/g, '$1$1');
	}
    hex = hex.match(/../g);
	var rgb = [parseInt(hex[0], 16), parseInt(hex[1], 16), parseInt(hex[2], 16)];
	
	rgb[0] = Math.round(rgb[0] * scale);
	rgb[1] = Math.round(rgb[1] * scale);
	rgb[2] = Math.round(rgb[2] * scale);

	var rgb2hex = ((rgb[0] << 16) + (rgb[1] << 8) + (+rgb[2])).toString(16);
	return rgb2hex;
}
	
function fillProjects(elt) //this elt is the container.
{
	for(i =0; i < projects.length; i++)
	{
		var innerString = "";
		var current = projects[i];
		
		for(j=0; j<current[2].length; j++)
		{
			var sections = current[2];
			innerString += '<div class="bult">&raquo;</div><div class="subsection" id="'+current[i] + sections[j]+'">'+sections[j]+ '</div>';
			
		}
		var imgSection = '<div id="img'+current[0]+'"></div>';
		var bulletSections = '<div class="wrp4Sections">'+innerString+'</div>';
		var contentSection = '<div id="'+ current[0] +'"><div class="title">'+current[1]+'</div>'+bulletSections+'</div>';
		elt.innerHTML += '<div class="wrp" id="wrp'+current[0]+'">'+ contentSection + imgSection +'</div>';
		console.log("printed");
		
	}
	for(k =0; k < projects.length; k++)
	{
		var clur = shade(projects[k][3], .70);
		document.getElementById(projects[k][0]).style.color = "#"+clur;
		var clur2 = shade(projects[k][3], 1.15);
		document.getElementById("wrp"+projects[k][0]).style.borderColor =  "#"+clur2;
	}
}

function readStringFromFileAtPath (pathOfFileToReadFrom)
    {
        var request = new XMLHttpRequest();
        request.open("GET", pathOfFileToReadFrom, false);
        request.send(null);
        var returnValue = request.responseText;

        return returnValue;
    }


function changeToProject(elt, project)
{
	
	var text = readStringFromFileAtPath ( project + ".txt" );
	var c = document.getElementById(elt);
	var p = document.getElementById("wrp" + project);
	c.innerHTML = "";
	c.style.border = p.style.border;
	c.style.borderRadius = p.style.borderRadius;
	c.innerHTML = text;

	
	
	/*(function fade(elt){
		(function fadeouth()
		{
			console.log("here");
			var val = parseFloat(elt.style.opacity);
			if(!((val -= .05) < 0))
			{		
				elt.style.opacity = val - .05;
				setTimeout(fade,50);
			} else{
				elt.style.opacity = 0;
				var text = FileHelper.readStringFromFileAtPath ( project + ".txt" );
				var c = document.getElementById(elt);
				var p = document.getElementById("wrp" + project);
				c.style.border = p.style.border;
				c.style.borderRadius = p.style.borderRadius;
				c.innerHTML = text;
			}
		});	
	});*/
	
}




window.onload = function(){
	
	fillProjects(document.getElementById("container")); 
	document.getElementById("hydroOverview").addEventListener("click", function(){changeToProject("container", "hov")});
	};