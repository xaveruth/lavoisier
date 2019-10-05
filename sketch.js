//TO-DO
//1. fix element boxes -- punctuation
//2. add metronome to see if i'm getting the rhythm right
//3. get video download working



var elements = [];
var boxxWidths = [];
var boxxElements = [];
var lyricsIndex = 0;
var g = (0, 255, 0, 255);
//var version = 2; 		//1 = Funky Funk, 2 = Tom Lehrer Elements

function setup() {
  	
  	//youTube aspect ratio is 16:9
  	//var scale = 70;
  	createCanvas(windowWidth, windowHeight);
 	pixelDensity(1);
 	frameRate(30);

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
  	clear();
  	background(100);
  	noFill();

	var numFrames, modFrames;
	numFrames = floor(getTime()/1000 * 30);
	var numBeats = getTime()/1000 * bpm * (1/60) + startAheadBy;



  	
	//draw periodic table in off state for all
	for (i = 0; i < elementList.length; i++) elements[i].drawBox('off');


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


				boxxWidths[boxxIndex] = boxxWidth;
				boxxWidth+=5;
				boxxElements[boxxIndex] = elements[correctedIndex].atomicNumber;
				boxxIndex++;
				//print(elements[correctedIndex].text, extraCharacter, boxxWidth);
				
				//print(textQueue, boxxWidth);
				


			

				colourQueue += str(lyrics[2][i]);				//add current colour to colour queue
				
				//BOXES
				elements[correctedIndex].drawBox('on');
			}
		}

	}	

	//-----CAPTION-----//

	//get total charWidth of current string
	var totalCharWidth = getTotalCharWidth(textQueue);
	//get rid of the below function?
	//var totalBoxxWidth = getTotalBoxxWidth(boxxWidths);		
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
			rect(rightAlign - totalBoxxWidth + cumWidth, boxxYcoord, boxxWidthCorrection * boxxWidths[i], boxxHeight);
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
		var currSpacing = getCurrSpacing(textQueue, i);
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
			setAestheticParameters('caption');
			text(textQueue[i], rightAlign - charWidthCorrection * (totalCharWidth - spacing), captionYcoord);

			//rect(rightAlign - boxWidthCorrection * (totalBoxxWidth - boxxWidth), 590, boxWidthCorrection * boxxWidth, 50);
			//rect(rightAlign - boxxWidthCum, 590, boxWidthCorrection * boxxWidth, 50);
		}
	}


	//print beats
	if (beatToggle == true) {
		fill(0, 0, 0, 255);
		text(floor(numBeats), 20, 20, 300, 100);
	}

	//asterisk text
	printAsteriskText(numBeats);

	//metronome
	//runMetronome(numBeats);
}


function getTime() {
  var m = millis();
  return m;
}

function setAestheticParameters(element) {
	if (element == 'caption') {
		noStroke();
		textSize(captionSize);
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
		fill(0);
	}

	if (element == 'technicalNotes') {
		stroke(50);
		fill(0);
		strokeWeight(2);
		textSize(noteSize);
	}
}

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


function runMetronome(numBeats) {
	var osc;
	osc = new p5.Oscillator();
 	osc.setType('sine');
  	osc.freq(240);
  	osc.start();

  	//if (mouseClicked()) {
  		if (abs(numBeats - round(numBeats) < 0.1)) {
			if ((round(numBeats) - 1) % 4 == 0) {
				osc.amp(1);
			}	
  		}

  		else {
  			osc.amp(0);
  		}
  	//}
}


