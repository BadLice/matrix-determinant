// var items = [
// 	[1, 2, 3, 4],
// 	[0, 0, 1, 0],
// 	[1, 2, 3, 4],
// 	[5, 3, 2, 1]
// ];

// var items = [
// 	[1, 2, 1],
// 	[3, 1, 4],
// 	[2, 1, 5]
// ];
// var items = [
// 	[0, 9, 8, 7],
// 	[6, 5, 4, 3],
// 	[2, 1, 0, 9],
// 	[8, 7, 6, 5]
// ];

var size = 0;
var state = 0; //0 = size not selected, 1 = size selected, 2 = result calculated, 3 matrix filled
var precm;

function calculate()
{
	if(isFilledMatrix())
	{		
		var items = [];
		for (var i = 0; i < size; i++)
		{
			items.push([]);
			for (var j = 0; j < size; j++)
			{
				items[i].push(document.getElementById(i + "-" + j).value);
			}
		}

		document.getElementById("result").innerHTML = determinant(items);
		state = 2;
	}
}

function determinant(mat)
{
	if (mat.length == 1 && mat[0].length == 1)
		return mat[0][0];
	else
	{
		//determinante per righe
		var i = 0;
		var det = 0;
		for (var j = 0; j < mat[0].length; j++)
			det += Math.pow(-1, (i + 1 + j + 1)) * mat[i][j] * determinant(minoreComplementare(mat, i, j));
		return det;

	}
}

function minoreComplementare(mat, ix, jx)
{
	if (ix >= mat.length || jx >= mat[0].length)
		throw "Index out of bound!";
	else
	{
		var buff = [];
		//serve per diminuire l'indice i di quante righe sono state saltate perchè da rimuovere
		var decIndex = 0;
		for (var i = 0; i < mat.length; i++)
		{
			buff.push([]);
			for (var j = 0; j < mat[0].length; j++)
			{
				if (ix !== i && jx !== j)
					buff[i - decIndex].push(mat[i][j]);
			}

			if (buff[i - decIndex].length <= 0)
			{
				buff.length--;
				decIndex++;
			}
		}
		return buff;
	}
}

function setSize(s)
{
	var s = document.getElementById("size").value;
	var m = document.getElementById("matrix");
	m.innerHTML = "";
	for (var i = 0; i < s; i++)
	{
		for (var j = 0; j < s; j++)
		{
			m.innerHTML += "<input id=\"" + i + "-" + j + "\" class=\"matrix-item\" onkeypress=\"enterPressed(event)\" />";

		}
		m.innerHTML += "<br>";
	}
	size = s;
	state = 1;

	if(size==0)
		document.getElementById("matrix").style.borderColor="transparent";
	else
		document.getElementById("matrix").style.width = size * document.getElementsByClassName("matrix-item")[0].offsetWidth
}

function writeSizes()
{
	document.write("<option value=\"0\">---</option>");
	for (var i = 1; i < 10; i++)
		document.write("<option value=" + i + ">" + i + "</option>");
	state = 0;
}

var intervalID = window.setInterval(function()
	{
		if(state === 0)
			document.getElementById("size").style.borderColor = "rgb("+getRandomColor()+","+getRandomColor()+","+getRandomColor()+")";
		if(state === 1 && size != 0)
		{
			if(isFilledMatrix())
				state=3;
			document.getElementById("matrix").style.borderColor = "rgb("+getRandomColor()+","+getRandomColor()+","+getRandomColor()+")";
		}
		if(state === 2)
			document.getElementById("result").style.borderColor = "rgb("+getRandomColor()+","+getRandomColor()+","+getRandomColor()+")";

		if(state === 3)
			document.getElementById("calc-button").style.backgroundColor = "rgb("+getRandomColor()+","+getRandomColor()+","+getRandomColor()+")";
		
		if(!isFilledMatrix())
		{
			state=1;
			clearResult();
		}
		if(isChangedMatrix())
		{
			state=3;
			clearResult();
		}
	}, 100);

function getRandomColor()
{
	return Math.floor(Math.random()*256);
}

function isFilledMatrix()
{
	for (var i = size - 1; i >= 0; i--)
	{
		for (var j = size - 1; j >= 0; j--) {
			if(document.getElementById(i + "-" + j).value.length === 0)
				return false;
		}
	}

	return true;
}

function enterPressed(event)
{
	if(event.keyCode == 13)
	{
	   calculate();
	}
}

function isChangedMatrix()
{
	
	
	if(state === 2)
	{
		var equals = true;
		var m = [];

		for (var i = size - 1; i >= 0; i--)
		{
			m.push(new Array());
			for (var j = size - 1; j >= 0; j--)
			{
				m[i].push(document.getElementById(i+'-'+j).value);
			}
		}

		if(precm !== undefined)
		{
			equals=true;
			for (var i = m.length - 1 && equals; i >= 0; i--)
			{
				for (var j = m.length - 1 && equals; j >= 0; j--)
				{
					equals = m[i][j]==precm[i][j];
				}
			}
		}

		precm = m;
		return !equals;
	}
	else
		return false;

	
}

function clearResult()
{
	document.getElementById("result").innerHTML = '&nbsp;';
}