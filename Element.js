function Element (index){
	//this.border = 
	//this.text = elementList[index];
	this.index = index;
	this.atomicNumber = index + 1;
	this.text = elementList[index];
	var x, y;

	//initial parameters for periodic table
	onColour = color(180, 255, 200, 255);
	offColour = color(255, 200, 200, 255);
	black = color(0, 0, 0, 255);
	white = color(255, 255, 255, 255);
	red = color(255, 0, 0, 255);
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
			this.strokeColour = red;
			this.fillColour = onColour;
			this.fontThickness = 3;
			this.boxThickness = 3;
		}
		else if (state == 'off') {
			this.strokeColour = offColour;
			this.fillColour = black;
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
		fill(this.strokeColour)
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