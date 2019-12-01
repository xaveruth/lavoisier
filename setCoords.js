function setCoords () {

	var topRightX = topLeftX + 17 * boxWidth;
	var topRightY = topLeftY;
	var index = 0;
	var x, y;


	//first row
	x = topLeftX; y = topLeftY; 
	index = elements[index].setCoords(x, y, index);
	
	x = topRightX; y = topRightY; 
	index = elements[index].setCoords(x, y, index);

	//second and third row
	for (j = 1; j <= 2; j++) {
		x = topLeftX; y = topLeftY + boxHeight * j; 
		index = elements[index].setCoords(x, y, index);
		x = topLeftX + boxWidth; y = topLeftY + boxHeight * j; 
		index = elements[index].setCoords(x, y, index);

		//six in a row
		for (i = 0; i <= 5; i++) { 
			x = topRightX - 5 * boxWidth + i * boxWidth; y = topRightY + boxHeight * j; 
			index = elements[index].setCoords(x, y, index);
		}
	}

	//fourth and fifth row
	for (j = 3; j <= 4; j++) {
		for (i = 0; i <= 17; i++) { 
			x = topLeftX + i * boxWidth; 
			y = topLeftY + boxHeight * j;
			index = elements[index].setCoords(x, y, index);
		}
	}

	//sixth and seventh row
	for (j = 5; j <= 6; j++) {

		//first two in each row
		x = topLeftX; y = topLeftY + boxHeight * j; 
		index = elements[index].setCoords(x, y, index);
		x = topLeftX + boxWidth; y = topLeftY + boxHeight * j; 
		index = elements[index].setCoords(x, y, index);

		//Lanthanides and Actinides
		for (i = 2; i <= 16; i++) { 
			x = topLeftX + i * boxWidth;
			y = topLeftY + boxHeight * (j + 2.5);
			index = elements[index].setCoords(x, y, index);
		}

		//rest of each row
		for (i = 3; i <= 17; i++) { 
			x = topLeftX + i * boxWidth;
			y = topRightY + boxHeight * j;
			index = elements[index].setCoords(x, y, index);
		}
	}	
}