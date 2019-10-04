function Element (index){
	//this.border = 
	//this.text = elementList[index];
	this.index = index;
	this.atomicNumber = index + 1;
	this.text = elementList[index];
	var x, y;

	//initial parameters for periodic table
	offColour = color(255, 200, 200, 255);
	onColour = color(0,0,0,255);
	black = color(0, 0, 0, 255);
	white = color(255, 255, 255, 255);
	red = color(255, 0, 0, 255);
	grey = color(226,226,226,255);
	green = color(82,252,91,255);
	lightBlue = color(141,211,254,255);
	orange = color(254,213,92,255);
	yellow = color(255,252,108,255);
	darkGreen = color(142,226,157,255);
	darkTeal = color(170,227,213,255);
	darkPink = color(225,198,198,255);
	lightRed = color(255,198,170,255);
    pink = color(241,199,227,255);
    darkRed = color(153,2,36,255);
    mediumBlue = color(33,38,221,255);
    dimGray = color(102,119,102,255);

	var colourArray = [grey, green, lightBlue, orange, yellow, darkGreen, darkTeal, darkPink, lightRed, pink];
	var captionColourArray = [darkRed, black, mediumBlue, dimGray];

	var fillColour;
	var strokeColour;
	var fontThickness;
	var boxOffThickness;
	var boxOnThickness;

	this.setCoords = function(x, y, index) {
		this.x = x;
		this.y = y;
		return index + 1;
	}

	this.drawBox = function(state) {

		if (state == 'on') {
			this.strokeColour = white;
			this.fontColour = white;
			this.fillColour = black;
			this.fontThickness = 3;
			this.boxThickness = 3;
		}
		else if (state == 'off') {
			this.fillColour = colourArray[ptableColours[this.index]];
			this.fontColour = captionColourArray[ptableCaptionColours[this.index] - 1];
			this.strokeColour = black;
			this.fontThickness = 1;
			this.boxThickness = 2
		}	

		//draw box
		fill(this.fillColour);
		stroke(this.strokeColour)
		strokeWeight(this.boxThickness);
		rect(this.x, this.y, boxWidth, boxHeight);

		//TRY FILLING TEXT?
		//type symbol
		fill(this.fontColour);
		noStroke();
		//stroke(this.strokeColour);
		//strokeWeight(this.fontThickness);
		textSize(symbolSize);
		textAlign(CENTER, CENTER);
		text(this.text, this.x, this.y, boxWidth, boxHeight);
		index++;

		//type atomic number
		textAlign(RIGHT, TOP);
		textSize(atomicNumberSize);
		text(this.atomicNumber, this.x - 1, this.y + 1, boxWidth, boxHeight);
	}


	/*
	this.play = function(duration) {

	}
*/

}