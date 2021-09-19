const fs = require("fs");
const input = fs.readFileSync("input.txt").toString().split("\r\n");

function solution(dwarves) {
	let answer;
	const SEVEN = 7;
	const TARGET = 100;

	const combis = getCombination(dwarves, SEVEN);
	for (let i = 0; i < combis.length; i++) {
		if (sum(combis[i]) === TARGET) answer = combis[i];
	}

	answer = answer.sort((a, b) => Number(a) - Number(b)).map(el => Number(el));
	console.log(answer);
}

function sum(arr) {
	return arr.reduce((acc, cur) => {
		return (acc += Number(cur));
	}, 0);
}

function getCombination(arr, r) {
	const result = [];
	if (r === 1) return arr.map(el => [el]);

	arr.forEach((fixed, idx, origin) => {
		const rest = origin.slice(idx + 1);
		const combination = getCombination(rest, r - 1);
		const attached = combination.map(el => [fixed, ...el]);
		result.push(...attached);
	});

	return result;
}

solution(input);
