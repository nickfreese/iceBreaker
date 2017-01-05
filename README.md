

*Ice Breaker Spec*

iceBreaker is a Javascript Class which allows developers to control the calling of JS functions based on the users window width.
Functions are called in a cascading effect from largest width to smallest.  widths are minimum widths.  The lowest width which is greater than the window size will be called last, thus taking priority. 

*Orientation based settings will be added in the future.

the required parameters for the class constructor are as follows:

************************************************
Settings

1.  breakpoint - the window width at which the function should call. - OPTIONAL

2.  myFunction - just the name.  no parameters or parentheses.  Unless entering an anaonymouse function,  in which case write the function out in whole but still place the parameters in a parameter array. example of anaonymouse function:   function(butt, butts){console.log(butt);}  - REQUIRED

3.  params - this should be an array of the parameters for this function call.  - REQUIRED

4.  onresize - booleen, true makes the function call on resize.  False makes it only call once when the breakpoint is passed.  - REQUIRED

5.  EnablePortrait - Booleen, if true, function only fires in portarait.  If both enableLandscape and enablePortrait are true then enableLandscape will take priority - OPTIONAL

6.  EnableLandscape - Booleen, if true, function only fires in landscape.  If both enableLandscape and enablePortrait are true then enableLandscape will take priority - OPTIONAL

7.  min - number value.  min width that the function can be call at.  - OPTIONAL

8.  css - fill out with css to be injected.  This does not read the the orientation settings.  media queries must be made inside the css setting.  - OPTIONAL

************************************************
Setup

example class definition - var testIceBreaker = new iceBreaker({breakpoint:1000, myFunction: testFunc3, params: params3, onresize: false});

launch the listener - iceBreakerListener();
************************************************




example usage below.
--------------------------------------------------------------------

//Test functions
var testFunc = function(banana, butt){
	document.getElementById("blup").style.width = window.innerWidth + "px";
	document.getElementById("blup").style.background = "#333333";
}

//set up parameter arrays
var params1 = [20, 5];

//create iceBreaker Objects
var testIceBreaker = new iceBreaker({breakpoint: 900, myFunction: testFunc, params: params1, onresize: true, enablePortrait: true, min: 700});


//run ice breaker with above objects
iceBreakerListener();


//new objects can be added dynamically at any time

var testIceBreaker4 = new iceBreaker({breakpoint:1400, myFunction: testFunc4 , params: params3, onresize:false, enableLandscape: true, css: "@media all and (max-width: 699px) and (min-width: 520px) {#blup{border:3px solid yellow;}}", min:600});


-------------------End Example---------------------------------

For questions regarding usage or bugs please contact nickfreese@nickfreese.com
