		function openFrame(src, left, top, width, height, borderColor, onclose)
		{
			if(!window.myFrameDiv)
			{
				var body = document.getElementsByTagName("BODY")[0];
				
				if(!window.myBackgroundDiv)
				{
					window.myBackgroundDiv = document.createElement("DIV");
					body.appendChild(window.myBackgroundDiv);
					window.myBackgroundDiv.style.zIndex = "99998";
					window.myBackgroundDiv.style.position = "absolute";
					window.myBackgroundDiv.style.top = "0px";
					window.myBackgroundDiv.style.left = "0px";
					window.myBackgroundDiv.style.width = Math.max(body.offsetWidth, window.innerWidth==undefined?0:window.innerWidth) + "px";
					window.myBackgroundDiv.style.height = Math.max(body.offsetHeight, window.innerHeight==undefined?0:window.innerHeight) + "px";
					window.myBackgroundDiv.style.background = "url('/images/logos/fog.png')";
				}
				window.myFrameDiv = document.createElement("DIV");
				body.appendChild(window.myFrameDiv);
				window.myFrameDiv.style.zIndex = "99999";
				window.myFrameDiv.style.position = "absolute";
				window.myFrameDiv.style.border = "8px solid " + borderColor;
				window.myFrameDiv.style.top = top + "px";
				window.myFrameDiv.style.left = left + "px";
				window.myFrameDiv.style.backgroundColor = borderColor;
				window.myFrameDiv.onclick = function(){
					body.removeChild(window.myFrameDiv);
					if(window.myBackgroundDiv) body.removeChild(window.myBackgroundDiv);
					window.myFrameDiv = null;
					window.myBackgroundDiv = null;
					if(onclose) onclose();
				}

				var closeButtonDiv = document.createElement("DIV");
				window.myFrameDiv.appendChild(closeButtonDiv);
				closeButtonDiv.style.width = width + "px";
				closeButtonDiv.innerHTML = "<img src='/images/logos/icon-close.png' style='cursor:pointer;'>";
				closeButtonDiv.style.textAlign = "right";
				
				var myFrame = document.createElement("IFRAME");
				window.myFrameDiv.appendChild(myFrame);
				myFrame.style.position = "relative";
				myFrame.style.background = "FFFFFF";
				myFrame.style.height = height + "px";
				myFrame.style.width = width + "px";
				myFrame.src = src;
			}
		}

	function closeCurrentImg(body){
		if(window.myImgDiv)
		{
			body.removeChild(window.myImgDiv);
			if(window.myBackgroundDiv) body.removeChild(window.myBackgroundDiv);
			window.myImgDiv = null;
			window.myBackgroundDiv = null;
			if(window.myImgDivOnClose) window.myImgDivOnClose();
			window.myImgDivOnClose = null;
		}
	}

	function openImg(src, left, top, borderColor, onclose)
	{
		try{
			var body = document.getElementsByTagName("BODY")[0];

			closeCurrentImg(body);
			
			window.myImgDivOnClose = onclose;
			
			window.myImgDiv = document.createElement("DIV");
			body.appendChild(window.myImgDiv);
			window.myImgDiv.style.zIndex = "99999";
			window.myImgDiv.style.position = "absolute";
			if(borderColor){
				window.myImgDiv.style.border = "8px solid " + borderColor;
				window.myImgDiv.style.backgroundColor = borderColor;
			}
			
			var ScrollTop = document.body.scrollTop;
			if (ScrollTop == 0)
			{
			    if (window.pageYOffset)
			        ScrollTop = window.pageYOffset;
			    else
			        ScrollTop = (document.body.parentElement) ? document.body.parentElement.scrollTop : 0;
			}

			window.myImgDiv.style.top = (ScrollTop + top) + "px";
			window.myImgDiv.style.left = left + "px";
			
			var actionDiv = document.createElement("DIV");
			window.myImgDiv.appendChild(actionDiv);
			actionDiv.style.height = "22px";
			actionDiv.style.width = "100%";
			actionDiv.style.backgroundImage = "url('/images/logos/onglet.png')";
			actionDiv.style.backgroundRepeat = "no-repeat";

			var closeImg = document.createElement("IMG");
			closeImg.src = "/images/logos/icon-close.png";
			closeImg.style.cursor = "pointer";
			closeImg.style.height = "16px";
			closeImg.style.position = "absolute";
			closeImg.style.top = "4px";
			closeImg.style.left = "10px";
			closeImg.title = "Fermer";
			closeImg.onclick = function(){ closeCurrentImg(body); };
			actionDiv.appendChild(closeImg);

			var openImg = document.createElement("IMG");
			openImg.src = "/images/logos/icon-open.png";
			openImg.style.cursor = "pointer";
			openImg.style.height = "16px";
			openImg.style.position = "absolute";
			openImg.style.top = "4px";
			openImg.style.left = "38px";
			openImg.title = "Ouvrir dans une popup";

			actionDiv.appendChild(openImg);


			window.myImgDiv.style.textAlign = "left";

			var myImg = document.createElement("IMG");
			window.myImgDiv.appendChild(myImg);
			myImg.style.position = "relative";
			myImg.style.visibility = "hidden";
			myImg.onclick = function(){ closeCurrentImg(body); };
			myImg.onload = function(){
				myImg.currentWidth = myImg.offsetWidth;
				myImg.currentHeight = myImg.offsetHeight;
				if(myImg.offsetWidth>1200) myImg.width = 1200;
				myImg.style.visibility = "visible";
			};
			myImg.style.border = "3px solid #a11e23";
			myImg.src = src;

			openImg.onclick = function(){
				var name = src.substring(src.lastIndexOf("/")+1);
				name = name.substring(0, name.indexOf("."));
				var fen = window.open(src, name, 
					"height=" + Math.min(screen.height-100, myImg.currentHeight?myImg.currentHeight:myImg.offsetHeight) + 
					",width=" + Math.min(screen.width-100, (myImg.currentWidth?myImg.currentWidth:myImg.offsetWidth) + 30) + ", resizable=1, scrollbars=1"); 
				closeCurrentImg(body);
				fen.focus();
			};
		}
		catch(e){
			var txt = "";
			for(var el in e){
				txt += el + " : " + e[el] + "\n";
			}
			alert("ERROR " + txt);
		}
	}
	
