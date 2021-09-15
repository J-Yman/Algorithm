function solution(files) {
	files.sort((a, b) => {
		const aHeadAndNum = getHeadAndNum(a);
		const bHeadAndNum = getHeadAndNum(b);
		const sortByHead = aHeadAndNum[0].localeCompare(bHeadAndNum[0]);
		return sortByHead === 0 ? aHeadAndNum[1] - bHeadAndNum[1] : sortByHead;
	});

	return files;
}

// head와 num 분리해서 배열로 리턴
function getHeadAndNum(fileName) {
	let head = "";
	let numStack = "";
	let headEndFlag = false;
	let numEndFlag = false;

	// 주어진 파일이름 (ex: 'img12.png' 를 순회하며 파싱)
	for (const char of fileName) {
		if (char === " ") {
			if (headEndFlag) numEndFlag = true;
			else head += char;
		} else if (!isNaN(char) && !numEndFlag) {
			numStack += char;
			headEndFlag = true;
		} else if (isNaN(char) && !headEndFlag) head += char;
		else if (isNaN(char) && headEndFlag) numEndFlag = true;
	}
	return [head.toLowerCase(), Number(numStack)];
}
