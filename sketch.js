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

function calculate()
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
			m.innerHTML += "<input id=\"" + i + "-" + j + "\" >";

		}
		m.innerHTML += "<br>";
	}
	size = s;
}

function writeSizes()
{
	for (var i = 0; i < 10; i++)
		document.write("  <option value=" + i + ">" + i + "</option>");
}