var rec;
var xhr;
var initdomian ="http://123.57.55.38:802" //"http://123.57.55.38:802";


//importScripts
var initjs="http://123.57.55.38:801/emointer";
(function(window) {
	var ver = "4.1";
	

	var s_src_record = initjs + "/front/emokitsdk/js/recordernew.js";

	var s_src_jquery = 'http://libs.baidu.com/jquery/1.11.1/jquery.min.js';

	var arr_jquery = [ 'src='
			+ 'http://libs.baidu.com/jquery/1.11.1/jquery.min.js' + '' ];
	;
	var arr = [ 'src=' + s_src_record + '' ];
	// arr.push(arr_jquery);

	/*
	 * if (document.readyState != 'complete') { document.write('<script ' +
	 * arr.join(" ") + ' ><' + '/script>'); document.write('<script ' +
	 * arr_jquery.join(" ") + ' ><' + '/script>'); } else { var s =
	 * document.createElement("script"), attr; s.type = "text/javascript"; s.src =
	 * s_src; for ( var i = arr.length; i--;) { attr = arr[i].split("="); if
	 * (attr[0] == "data-appid" || attr[0] == "data-redirecturi" || attr[0] ==
	 * "data-callback") { s.setAttribute(attr[0], attr[1].replace(/\"/g, "")); } }
	 * var h = document.getElementsByTagName("head"); if (h && h[0]) {
	 * h[0].appendChild(s); } }
	 */

	var s = document.createElement("script"), attr;
	s.type = "text/javascript";
	s.src = s_src_record;

	var s1 = document.createElement("script"), attr;
	s1.type = "text/javascript";
	s1.src = s_src_jquery;

	/*
	 * var s1; for ( var i = arr.length; i--;) {
	 * 
	 * s1='<script ' + arr.join(" ") + ' ><' + '/script>' s2='<script ' +
	 * arr_jquery.join(" ") + ' ><' + '/script>' }
	 */
	var h = document.getElementsByTagName("head");
	if (h && h[0]) {
		h[0].appendChild(s);
		h[0].appendChild(s1);
	}

	var onFail = function(e) {
		console.log('Rejected!', e);
	};

	var onSuccess = function(s) {
		audioContext = window.AudioContext || window.webkitAudioContext;
		var context = new audioContext();
		var mediaStreamSource = context.createMediaStreamSource(s);
		rec = new Recorder(mediaStreamSource);
		// rec.record();
		// audio loopback
		// mediaStreamSource.connect(context.destination);
	}
	navigator.getUserMedia = navigator.getUserMedia
			|| navigator.webkitGetUserMedia || navigator.mozGetUserMedia
			|| navigator.msGetUserMedia;
	 // var audio=$("#audiox");
	function startRecording() {
		if (navigator.getUserMedia) {
			navigator.getUserMedia({
				'audio' : true
			}, onSuccess, onFail);
		
		} else {
			console.log('navigator.getUserMedia not present');
		}
	}
	startRecording();
	// --------------------
	/*
	$('#export').click(function() {
		rec.stop();
		rec.exportWAV(function(blob) {
			rec.clear();
			audio.src = URL.createObjectURL(blob);
			var fd = new FormData();
			fd.append('audioData', blob);
			var xhr = new XMLHttpRequest();
			var url = initdomian + "/emoface/Voiceemo.do";
			var async = true;
			xhr.open('POST', url, async);
			xhr.send(fd);
		})
	});
	 */
})(window);
/*
 * $('#record').click(function() { rec.record(); $("#message").text("begin to
 * record info ...");
 * 
 * });
 */

function analysis(audio,GetVoiceRes,appid,key,platid,uid) {
	rec.stop();
	var retinfo="";
	rec.exportWAV(function(blob) {
		rec.clear();
		audio.src = URL.createObjectURL(blob);
		var fd = new FormData();
		fd.append('audioData', blob);
		
		/*
		fd.append('appid', appid);
		fd.append('key', key);
		fd.append('platid', platid);
		fd.append('uid', uid);
		*/
		alert("THE fd is"+fd);
		
		paraminit="?appid="+appid+"&key="+key+"&platid="+platid+"&uid="+uid;
		xhr = new XMLHttpRequest();
		var url = initdomian + "/emoface/Voiceemo.do"+paraminit;
		var async = true;
		xhr.open('POST', url, async);
		
	
		var resemo=(function loadEmo(){
            
			  if (xhr.readyState == 4) { 
		             //alert("---"+JSON.stringify(xhr));
		             var  jsonres = eval("(" + xhr.responseText + ")");
		             alert( JSON.stringify( jsonres.infovoice));
		             if(jsonres.status==0)
		             {
		            	 GetVoiceRes(jsonres.infovoice);
		               // $("#emotext").text(jsonres.Emo);
		                // audio.load(jsonres.songurl);
		                // audio.play();
		                //$("#myaudioxx").src=jsonres.songurl;
		               /* var myAuto = document.getElementByIdx_x('myaudio');
		                myAuto.src=jsonres.songurl;
		                myAuto.play();*/
		               // audio.load(jsonres.songurl);
		             }
		   }
		 });
			
			
			//loadEmo(GetVoiceRes);
		
		xhr.onreadystatechange=resemo;//loadEmo;
		xhr.send(fd);
	})
	//return retinfo;

}


/*
function loadEmo(GetVoiceRes ){
	  if (xhr.readyState == 4) { 
	             alert("---"+JSON.stringify(xhr));
	             var  jsonres = eval("(" + xhr.responseText + ")");
	             alert(jsonres.Emo);
	             if(jsonres.retcode==0)
	             {
	            	 GetVoiceRes(jsonres);
	    
	             }
	   }
	 }
*/


function startrecord() {
	rec.record();
}
