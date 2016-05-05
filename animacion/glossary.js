var timerForClose = null;
var openedGlossary = null;
function loadGlossary(){
	workDefinition();
	workGlossary();
}
function workDefinition(){
	var refIds = {};
	var body = document.getElementsByTagName("BODY")[0];
	var defs = document.getElementsByTagName("definition");
	for(var i=defs.length-1; i>-1; i--){
		var def = defs[i];
		var id = def.getAttribute("id");
		if(!refIds[id]){
			var div = document.createElement("DIV");
			div.innerHTML = def.innerHTML;
			div.setAttribute("id", id);
			div.setAttribute("class", "definition_off");
			refIds[def.getAttribute("id")] = true;
			body.appendChild(div);
		}
		def.parentNode.removeChild(def);
	}
}

function workGlossary(){
	var links = document.getElementsByTagName("glossary");
	for(var i=0; i<links.length; i++){
		span = links[i];
		var id = span.getAttribute("name");
		var content = span.innerHTML;
		
		span.removeAttribute("name");
		
		var div = document.getElementById(id);
		if(div){
			var newContent = "<a class='bulle_companion' href='#' onclick='return false' onmouseover='tryOpenGlossary(this, \"" + id + "\")'  onmouseout='tryCloseGlossary()'>" + content + "</a>";
			span.innerHTML = newContent;
			
			div.setAttribute("onmouseover", "keepGlossaryOpen();");
			div.setAttribute("onmouseout", "tryCloseGlossary();");
		}
	}
}

function openGlossary(link, id){
	clearTimeout(timerForClose);
	closeGlossary();
	openedGlossary = document.getElementById(id);
	if(openedGlossary){
		openedGlossary.setAttribute("class", "definition_on");
		
		{
			var pageTop = window.pageYOffset;
			if(!pageTop){
				pageTop = document.documentElement.scrollTop;
			}
			var pageBottom = pageTop + window.innerHeight -20;
			var top = link.offsetTop;
			var divTop = top + link.offsetHeight - 1;
			var divHeight = openedGlossary.offsetHeight;
			if(divTop + divHeight > pageBottom){
				var divBottom = top;
				openedGlossary.style.setProperty("top", (top - divHeight) + "px");
			}
			else {
				openedGlossary.style.setProperty("top", divTop + "px");			
			}
		}

		{
			var pageLeft = window.pageXOffset;
			if(!pageLeft){
				pageLeft = document.documentElement.scrollLeft;
			}
			var pageRight = pageLeft + window.innerWidth - 20;
			var left = link.offsetLeft;
			var divWidth = openedGlossary.offsetWidth;
			var divLeft = Math.max(pageLeft, left - parseInt(divWidth/2));
			if(divLeft+divWidth>pageRight){
				openedGlossary.style.setProperty("left", (pageRight-divWidth-16) + "px");
			}
			else {
				openedGlossary.style.setProperty("left", divLeft + 20 + "px");
			}
		}
	}
}

function keepGlossaryOpen(){
	clearTimeout(timerForClose);
}

function tryOpenGlossary(link, id){
	clearTimeout(timerForClose);
	closeGlossary();
	timerForClose = setTimeout(function(){
		openGlossary(link, id)
	}, 300);
}

function tryCloseGlossary(){
	clearTimeout(timerForClose);
	timerForClose = setTimeout(closeGlossary, 300);
}


function closeGlossary(){
	if(openedGlossary){
		openedGlossary.setAttribute("class", "definition_off");
		openedGlossary = null;
	}
}

loadGlossary();
