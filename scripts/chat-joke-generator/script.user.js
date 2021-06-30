function getJoke() {
  var xhttp;
  xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      joke = JSON.parse(this.responseText);
	  message = joke.setup+" "+joke.punchline;
	  sendMessage(message);
    }
  };
  xhttp.open("GET", "https://official-joke-api.appspot.com/random_joke", true);
  xhttp.send();
}

function sendMessage(message){
	$('#input').val(message);
	$('#sayit-button').click();
}
function alertGithub(){
	sendMessage("**Want to make your own joke generator?** Check out the source code on [Github](https://github.com/SpectricSO/stack-scripts/blob/main/scripts/chat-joke-generator/script.js)");
}
function alertCredits(){
	sendMessage("*Joke Generator is made possible by [Appspot Joke API](https://github.com/15Dkatz/official_joke_api)*");	
}
setInterval(getJoke, 20000);
setInterval(alertGithub, 60000);
setInterval(alertCredits, 480000);
