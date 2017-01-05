/*--------------- Ice Breaker JS.  A Simple Framework for writing responsive JavaScript. -------------------------------*/
/*--------------- Copyright Nick Freese 2016 ---------------------------------------------------------------------------*/

//global class list
var iceBreakerList = [];
// sorts and organizes in reverse order by width.
var listHandler = function(){
iceBreakerList.sort(function(obj1, obj2) {
	return obj1.breakpoint - obj2.breakpoint;
});
iceBreakerList.reverse();
}
//class definition
class iceBreaker{
	constructor(settings){
		this.repeatState = 0;
		if(settings.enableLandscape === true){
		this.enableLandscape = settings.enableLandscape;
		}
		if(settings.enablePortrait === true){
		this.enablePortrait = settings.enablePortrait;
		}
		if(typeof settings.css === 'string'){
		this.css = settings.css;
		iceBreakerCss(this);
		}
		if(typeof settings.myFunction !== "undefined"){
		
		if(typeof settings.min === "number"){
		this.min = settings.min;
		}
		else{
		this.min = 0;
		}
		
		this.params = settings.params;
		this.onresize = settings.onresize;
		if(onresize === false){
			this.repeatState = 0;
		}
		this.breakpoint = settings.breakpoint;
		this.myFunction = settings.myFunction;
		iceBreakerList.push(this);
		listHandler();
		}
	}
}
var iceBreakerCss = function(cssInject){
var insertCSS = document.createElement("STYLE");
insertCSS.innerHTML = cssInject.css;
document.body.appendChild(insertCSS);
}

//method checks if function should call, then calls it.
iceBreaker.prototype.listenerFunc = function(breaker, repeatState, up, down){
var this_ = this;
var check = function(){
if(this_.onresize === true){
	if(window.innerWidth < this_.breakpoint && window.innerWidth < up && window.innerWidth > this_.min){
		if(repeatState <= 0){
			//call the function
			this_.myFunction.apply(this_.myFunction, this_.params);
				if(this_.onresize === false){
					this_.repeatState = 1;
				}
				else{
					this_.repeatState = 0;
				}
		}
	}
}
if(this_.onresize === false){
	if(window.innerWidth <= this_.breakpoint && window.innerWidth < up && window.innerWidth > this_.min){
		if(repeatState <= 0 || window.innerWidth > down){
			//call the function
			this_.myFunction.apply(this_.myFunction, this_.params);
			if(this_.onresize === false){
				this_.repeatState = 1;
			}
			else{
				this_.repeatState = 0;
			}
		}
}
else{
	this_.repeatState = 0;
}
}
}

if(this.enableLandscape === true && this.enablePortrait === true){
this.enablePortrait = false;
}
if(this.enableLandscape === true){
if(window.innerWidth > window.innerHeight){
check();
}
}
else if(this.enablePortrait === true){
if(window.innerWidth < window.innerHeight){
check();
}
}
else{
check();
}

}

//global listener function
var iceBreakerListener = function(){
listHandler();
if(iceBreakerList.length > 0){
var initialize = function(){
	for(i=0;i<iceBreakerList.length;i++){
		if(i == iceBreakerList.length-1){
			iceBreakerList[i].listenerFunc(iceBreakerList[i].breakpoint, iceBreakerList[i].repeatState, iceBreakerList[i-1].breakpoint, 0);
		}
		else if(i == 0){
			iceBreakerList[i].listenerFunc(iceBreakerList[i].breakpoint, iceBreakerList[i].repeatState, iceBreakerList[i].breakpoint+1, iceBreakerList[i+1].breakpoint);
		}
		else{
			iceBreakerList[i].listenerFunc(iceBreakerList[i].breakpoint, iceBreakerList[i].repeatState, iceBreakerList[i-1].breakpoint, iceBreakerList[i+1].breakpoint);
		}
		}
		}
var findNewFunctions = setInterval(initialize, 16);
var intervalIsOn = true;

window.addEventListener("resize", function(e){
if(intervalIsOn === true){
clearInterval(findNewFunctions);
intervalIsOn = false;
}
	for(i=0;i<iceBreakerList.length;i++){
		if(i == iceBreakerList.length-1){
			iceBreakerList[i].listenerFunc(iceBreakerList[i].breakpoint, iceBreakerList[i].repeatState, iceBreakerList[i-1].breakpoint, 0);
		}
		else if(i == 0){
			iceBreakerList[i].listenerFunc(iceBreakerList[i].breakpoint, iceBreakerList[i].repeatState, iceBreakerList[i].breakpoint+1, iceBreakerList[i+1].breakpoint);
		}
		else{
			iceBreakerList[i].listenerFunc(iceBreakerList[i].breakpoint, iceBreakerList[i].repeatState, iceBreakerList[i-1].breakpoint, iceBreakerList[i+1].breakpoint);
		}
	}
});
}
else{

}
}