//TO-DO
//1. fix element boxes -- punctuation
//2. add metronome to see if i'm getting the rhythm right

//FFMPEG command
//ffmpeg -r 30 -f image2 -s 1840x1100 -i %07d.png -vcodec libx264 -crf 25  -pix_fmt yuv420p test.mp4
//WHAT YOU MAY HAVE TO CHANGE
//number after -r is frame rate
//number after -s is resolution
//number after -crf is quality (25 is "high" but i'm not sure if it's max)
//the thing after -pix_fmt is pixel format -- don't know anything about this 
//the %07d is the filename -- it just means the first one is 0000000


//PRESERVE TRANSPARENCY
//ffmpeg -r 30 -f image2 -s 1840x1100 -i %07d.png -vcodec png -crf 25 test.mov
//ffmpeg  -vcodec png z.mov

//VIDEO NOTES
//on becca's computer, captures at about 2s/beat
//678 beats -- that's 23 minutes
//seems to be slower if i'm doing other things
//
//is it possible to get higher resolution?


let capturer;
let btn;
let counter = 1;

var elements = [];
var boxxWidths = [];
var boxxElements = [];
var lyricsIndex = 0;
var g = (0, 255, 0, 255);
//var version = 2; 		//1 = Funky Funk, 2 = Tom Lehrer Elements

function setup() {
  	
  	//youTube aspect ratio is 16:9
  	//var scale = 70;
  	frameRate(30);

  	if (canvasMode == 0) createCanvas(1840 * GSP, 880 * GSP);
  	else if (canvasMode == 1) createCanvas(1840 * GSP, 120 * GSP);
  	else if (canvasMode == 2) createCanvas(1840 * GSP, 1100 * GSP);


  	/*
	btn = document.createElement('button');
  	btn.textContent = "start recording";
  	document.body.appendChild(btn);
  	btn.onclick = record;
  	*/


 	pixelDensity(1);
 	

 	//create array of element objects
 	var numElements = elementList.length;
    for (var i = 0; i < numElements; i++) {
      elements[i] = new Element(i);
    }  

    //set x and y values for each element on the screen
	setCoords();

  	//TODO: get canvas to scale to fit screen despite low resolution
}

function draw() {
  	background(230);
  	//noFill();

	var numFrames, modFrames;
	numFrames = floor(getTime()/1000 * 30);
	var numBeats = getTime()/1000 * bpm * (1/60) + startAheadBy;


  	//RECORDING
  	if (videoCapture == true) {
  		if (numBeats >= recStart && numBeats <= recEnd && alreadyStarted == false) {
  			alreadyStarted = true;
  			capturer = new CCapture({ format: 'png' , framerate: 30} );
  			capturer.start();
  		}

	  	//STOP RECORDING
	  	if (numBeats > recEnd && alreadyStarted == true) {
	  		alreadyStarted = false;
	  		capturer.stop();
	  		capturer.save();
	    	capturer = null;
	  	}
	}

  	
	//draw periodic table in off state for all
	if (canvasMode == 0 || canvasMode == 2) {
		for (i = 0; i < elementList.length; i++) elements[i].drawBox('off');
	}

	if (lyricsIndex < lyrics[0].length) {

		//-----PRINT LYRICS-----//
		var colourQueue = "";

		//get current text
		var textQueue = "";
		var prevBreak = getPrevBreak(numBeats);
		var nextBreak = getNextBreak(numBeats);
		var boxxWidthCum = 0;
		var boxxCount = 0;

		//initialize boxxwidths and boxxElements to 0
		for (var i = 0; i < 50; i++) boxxWidths[i] = 0;
		for (var i = 0; i < 50; i++) boxxElements[i] = 0;

		var boxxIndex = 0;

		//iterate from prevbreak to nextbreak, add all lyrics to queue
		for (var i = prevBreak; i < nextBreak; i++) {
			if (lyrics[0][i] != 119 && lyrics[1][i] <= numBeats) {
				var currIndex = lyrics[0][i] - 1;
				var correctedIndex = floor(currIndex);
				var characterCorrection = round(100 * (currIndex - correctedIndex)) / 100; //make correction for special corrections like comma, apostrophe, etc.
				var boxxWidth = 0;
				var extraCharacter = "";
				var numCheck = false;

				//0: nothing weird
				if (characterCorrection == 0) {
					textQueue += elements[lyrics[0][i] - 1].text;	//add current element to queue
				}

				//0.1: apostrophe in middle of two-letter symbol
				else if (characterCorrection == 0.1) {
					textQueue += elements[correctedIndex].text.substring(0,1);
					textQueue += "'";
					textQueue += elements[correctedIndex].text.substring(1,2);
					extraCharacter = "'";
				}

				//0.11: dot dot dot after symbol
				else if (characterCorrection == 0.11) {
					textQueue += elements[correctedIndex].text;
					textQueue += '...';
					extraCharacter = '...';
				}

				//0.12: hyphen after symbol
				else if (characterCorrection == 0.12) {
					textQueue += elements[correctedIndex].text;
					textQueue += '-';
					extraCharacter = '-';
				}

				//0.13: asterisk after symbol with é
				else if (characterCorrection == 0.13) {
					textQueue += elements[correctedIndex].text.substring(0,1);
					textQueue += 'é';
					textQueue += '*';
					extraCharacter = '*';
				}

				//0.15: asterisk after symbol
				else if (characterCorrection == 0.15) {
					textQueue += elements[correctedIndex].text;
					textQueue += '*';
					extraCharacter = '*';
				}

				//0.2: apostrophe after one-letter symbol
				else if (characterCorrection == 0.2) {
					textQueue += elements[correctedIndex].text;
					textQueue += "'";
					extraCharacter = "'";

				}

				//0.25: open bracket before symbol
				else if (characterCorrection == 0.25) {
					textQueue += '(';
					textQueue += elements[correctedIndex].text;
					extraCharacter = '(';
				}

				//0.25: open bracket before symbol
				else if (characterCorrection == 0.25) {
					textQueue += '(';
					textQueue += elements[correctedIndex].text;
				}

				//0.3: exclamation point in middle of two-letter symbol
				else if (characterCorrection == 0.3) {
					textQueue += elements[correctedIndex].text.substring(0,1);
					textQueue += '!';
					textQueue += elements[correctedIndex].text.substring(1,2);
					extraCharacter = '!';
				}

				//0.35: closed bracket after symbol
				else if (characterCorrection == 0.35) {
					textQueue += elements[correctedIndex].text;
					textQueue += ')';
					extraCharacter = ')';
				}

				//0.35: close bracket after symbol
				else if (characterCorrection == 0.35) {
					textQueue += elements[correctedIndex].text;
					textQueue += ')';
					extraCharacter = ')';
				}

				//0.4: second letter of symbol is é
				else if (characterCorrection == 0.4) {
					textQueue += elements[correctedIndex].text.substring(0,1);
					textQueue += 'é';
				}

				//0.45: question mark in middle of two-letter symbol
				else if (characterCorrection == 0.45) {
					textQueue += elements[correctedIndex].text.substring(0,1);
					textQueue += "?";
					textQueue += elements[correctedIndex].text.substring(1,2);
					extraCharacter = '?';
				}

				//0.5: exclamation point after symbol
				else if (characterCorrection == 0.5) {
					textQueue += elements[correctedIndex].text;
					textQueue += '!';
					extraCharacter = '!';
				}

				//0.55: question mark after symbol
				else if (characterCorrection == 0.55) {
					textQueue += elements[correctedIndex].text;
					textQueue += '?';
					extraCharacter = '?';

				}

				//0.6: comma after symbol
				else if (characterCorrection == 0.6) {
					textQueue += elements[correctedIndex].text;
					textQueue += ',';
					extraCharacter = ',';
				}

				//0.65: dash before symbol
				else if (characterCorrection == 0.65) {
					textQueue += '-';
					textQueue += elements[correctedIndex].text;
					extraCharacter = '-';

				}

				//0.7: quotation marks before symbol
				else if (characterCorrection == 0.7) {
					textQueue += '"';
					textQueue += elements[correctedIndex].text;
					extraCharacter = '"';
				}

				//0.75: period after symbol
				else if (characterCorrection == 0.75) {
					textQueue += elements[correctedIndex].text;
					textQueue += '.';
					extraCharacter = '.';
				}

				//0.8: quotation marks after symbol
				else if (characterCorrection == 0.8) {
					textQueue += elements[correctedIndex].text;
					textQueue += '"';
					extraCharacter = '"';
				}

				//0.85: quotation marks after symbol
				else if (characterCorrection == 0.8) {
					textQueue += elements[correctedIndex].text;
					textQueue += '?)';
					extraCharacter = '?)';

				}

				//0.9: comma in middle of two-letter symbol
				else if (characterCorrection == 0.9) {
					textQueue += elements[correctedIndex].text.substring(0,1);
					textQueue += ',';
					textQueue += elements[correctedIndex].text.substring(1,2);
					extraCharacter = ',';
				}

				//0.95: colon after symbol
				else if (characterCorrection == 0.95) {
					textQueue += elements[correctedIndex].text;
					textQueue += ':';
					extraCharacter = ':';
				}

				//0.999: switch atomic symbol and number
				else if (characterCorrection == 0.99) {
					var s = elements[correctedIndex].atomicNumber.toString();
					textQueue += s;
					var numCheck = true;
				}


				//print(elements[correctedIndex].text.substring(0,1));
				//find boxx width

				//print(elements[correctedIndex].text);
				

				//GET BOXXWIDTH
				for (var j = 0; j < charWidthsAlpha.length; j++) {

					//case where it prints number instead of symbol
					if (numCheck == true) {
						for (var k = 0; k < s.length; k++) {	
							if (s.substring(k, k + 1) == charWidthsAlpha[j]) {
								boxxWidth += charWidthsNum[j];
							}
						}
					}

					//regular cases
					else {
						for (var k = 0; k < elements[correctedIndex].text.length; k++) {	
							if (elements[correctedIndex].text.substring(k, k + 1) == charWidthsAlpha[j]) {
								boxxWidth += charWidthsNum[j];
							}
						}					
					}

					if (extraCharacter == charWidthsAlpha[j]) {
						boxxWidth += charWidthsNum[j];
					}
				}

				//flexibly change caption size based on array in parameters.js
				var captionSF = 1;
				for (var m = 0; m <= captionSizeArray.length; m++) {
					if (numBeats > captionSizeArray[0][m]) captionSF = captionSizeArray[1][m];
				}
				print(numBeats, captionSF);


				boxxWidths[boxxIndex] = boxxWidth * captionSF;
				boxxWidth+=5 * captionSF;
				boxxElements[boxxIndex] = elements[correctedIndex].atomicNumber;
				boxxIndex++;

				//add current colour to colour queue
				colourQueue += str(lyrics[2][i]);				
				
				//BOXES
				elements[correctedIndex].drawBox('on');
				if (canvasMode == 1) {
					clear();
					background(bg);
				}
			}
		}
	}	

	//-----CAPTION-----//
	if (canvasMode == 1 || canvasMode == 2) {

		//get total charWidth of current string
		var totalCharWidth = getTotalCharWidth(textQueue) * captionSF;		
		var totalBoxxWidth = totalCharWidth;


		//draw boxxes
		if (boxxToggle == true) {
			//determine number of boxxes to be drawn
			for (var i = 0; i < boxxWidths.length; i++) {
				if (boxxWidths[i] > 0) boxxCount++;
			}

			//draw boxxes
			var cumWidth = 0;
			totalBoxxWidth *= boxxWidthCorrection;
			for (var i = 0; i < boxxCount; i++) {
				setAestheticParameters('boxx');
				rect(rightAlign - totalBoxxWidth + cumWidth, boxxYcoord, boxxWidthCorrection * boxxWidths[i], captionSF * boxxHeight);
				cumWidth += boxxWidthCorrection * boxxWidths[i];

				//print atomic number
				setAestheticParameters('boxxElement');
				if (characterCorrection == 0.99) {
					text(elements[boxxElements[i] - 1].text, rightAlign - totalBoxxWidth + cumWidth - boxxElementCF, boxxYcoord + boxxElementCF);
				}
				else {
					text(boxxElements[i], rightAlign - totalBoxxWidth + cumWidth - boxxElementCF, boxxYcoord + boxxElementCF);
				}
			}
		}
			

		//iterate through all characters in string
		var spacing = 0;
		for (var i = 0; i < textQueue.length; i++) {

			//get spacing of current character to be printed]
			var currSpacing = getCurrSpacing(textQueue, i) * captionSF;
			spacing += currSpacing;

			//set colour
			if (int(colourQueue[i]) == 1) fill(255, 0, 0, 255);
			else if (int(colourQueue[i]) == 2) fill(0, 0, 255, 255);
			else if (int(colourQueue[i]) == 3) fill(0, 0, 0, 100);

			//print character
			if (captionAlign == 'left') {
				text(textQueue[i], 50 + charWidthCorrection * spacing, 600);
			}

			else if (captionAlign == 'right') {
				setAestheticParameters('caption', captionSF);
				text(textQueue[i], rightAlign - charWidthCorrection * (totalCharWidth - spacing), captionYcoord);
			}
		}
	}

	//print beats
	if (beatToggle == true) {
		fill(100, 100, 100, 100);
		text(floor(numBeats), 500, 1000);
	}

	//asterisk text
	//printAsteriskText(numBeats);

	//metronome
	//runMetronome(numBeats);

	//turn on video recording button
	if(videoCapture == true) {
		if(capturer){
    		capturer.capture(document.getElementById('defaultCanvas0'));  
    		if(counter == 8){
      			frameRate(0);
      			btn.click();
    		}
  		}
  	}
}


function getTime() {
  var m = millis();
  return m;
}

function setAestheticParameters(element, captionSF) {
	if (element == 'caption') {
		noStroke();



		textSize(captionSize * captionSF);
		textFont('Arial');
		textAlign(RIGHT);
	}

	if (element == 'boxx') {
		strokeWeight(2);
		stroke(0);
		noFill();
		fill(200,200,200,255);
	}

	if (element == 'boxxElement') {
		textSize(boxxElementSize);
		noStroke();
		textAlign(RIGHT);
		textFont('Arial');
		fill(130);
	}

	if (element == 'technicalNotes') {
		stroke(50);
		fill(0);
		strokeWeight(2);
		textSize(noteSize);
	}
}

/*
function printAsteriskText(numBeats) {
	setAestheticParameters('technicalNotes');

	//#1: UV rays
	if (numBeats > noteOneStart && numBeats < noteOneEnd) {
		text('*TeCHNiCAl NoTe: UV RaYS POSSeSS No InHeReNT mAsS, NoR, eRgO, HeAt', noteXCoord, noteYCoord);
	}

	//#2: Revolution
	if (numBeats > noteTwoStart && numBeats < noteTwoEnd) {
		text('*NoTe: ThIS IS A tRaCK ThAt EsPOUSeS eGaLiTe, LiBErTe, AlSO FrAtErNiTe, BUT, iN FaCT, \nAH, OUR gUY LaVOISiEr WaS KINd OF WISHY-WAsHY ON THe, UH, ReVOLuTiON ThINGeE, uH SO…', noteXCoord, noteYCoord);
	}
}
*/

//get total character width of current string
function getTotalCharWidth(textQueue) {
	var totalCharWidth = 0;
	for (var j = 0; j < textQueue.length; j++) {
		for (var k = 0; k < charWidthsAlpha.length; k++) {
			if (textQueue[j] == charWidthsAlpha[k]) totalCharWidth += charWidthsNum[k];
		}
	}
	return totalCharWidth;
}

function getTotalBoxxWidth(boxxWidths) {
	var sum = 0;
	for (var i = 0; i < boxxWidths.length; i++) sum += boxxWidths[i];
	return sum;
}

//get spacing of current character to be printed
function getCurrSpacing(textQueue, i) {
	for (var j = 0; j < charWidthsAlpha.length; j++) {
		if (textQueue[i] == charWidthsAlpha[j]) {
			var currSpacing = charWidthsNum[j];
		}
	}
	return currSpacing;
}

function getPrevBeat(numBeats) {
	var count = 0;
	var prevBeat = 0;
	var check = false;

	while (check == false) {
		if (numBeats >= lyrics[1][count]) {
			prevBeat = lyrics[1][count];
			check = true;
		}
		else if (numBeats < 1) {
			prevBeat = 0;
			check = true;
		}
		else check = true;
		count++;
	}
	return prevBeat;
}

function getNextBreak(numBeats) {
	var check = 0;
	//iterating through lyrics array
	//lyrics[0][i] is the current element number you're looking at
	//lyrics[1][i] is the beat number of the current element you're looking at
	//you want to return the beat number of the next break
	for (var i = lyrics[0].length - 1; i >= 0; i--) {
		if (lyrics[0][i] == 119 && lyrics[1][i] >= numBeats) check = i;
	}
	if (check == 0) check = lyrics[0].length; //don't allow nextBreak to = 0, set it to last element of array
	return check;
}

function getPrevBreak(numBeats) {
	var check = 0;
	for (var i = 0; i < lyrics[0].length; i++) {
		if (lyrics[0][i] == 119 && lyrics[1][i] <= numBeats) {
			check = i;
		}
	}
	return check;
}

function windowResized() {
  	resizeCanvas(windowWidth, windowHeight);
}

//given coordinates and index of the periodic table, draw box and type symbol inside the box
function drawBox (x, y, index) {

	//draw box
	strokeWeight(boxThickness);
	rect(x, y, boxWidth, boxHeight);

	//type symbol
	textAlign(CENTER, CENTER);
	textSize(symbolSize);
	strokeWeight(symbolThickness);
	text(elementList[index], x, y, boxWidth, boxHeight);
	index++;

	//type atomic number
	textAlign(RIGHT, TOP);
	textSize(atomicNumberSize);
	text(index, x, y, boxWidth, boxHeight);

	return index;
}


/*
function record() {
 
  capturer = new CCapture({ format: 'png' , framerate: 30} );
  capturer.start();
  btn.textContent = 'stop recording';

  btn.onclick = e => {
    capturer.stop();
    capturer.save();
    capturer = null;

    btn.textContent = 'start recording';
    btn.onclick = record;
  };
  
}

*/