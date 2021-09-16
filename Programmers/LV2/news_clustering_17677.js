function solution(str1, str2) {
	const BYTE_4_MAXIMUM = 65536;
	const str1Elems = getElements(str1);
	const str2Elems = getElements(str2);

	// 얕은 복사 방지위해 스프레드 연산자 사용
	const interSection = getIntersection([...str1Elems], [...str2Elems]);
	const union = getUnion([...str1Elems], [...str2Elems]);

	let jakad =
		!interSection.length && !union.length
			? 1
			: interSection.length / union.length;
	jakad *= BYTE_4_MAXIMUM;

	return Math.floor(jakad);
}

// 주어진 두 배열의 합집합을 구하는 함수
function getUnion(elems1, elems2) {
	const result = [];
	const numMap1 = new Map();
	const numMap2 = new Map();
	const unionArray = [];

	// 주어진 두 배열을 각자 순환하면서 각자의 맵을 만든다.
	for (const elem of elems1) {
		const lowElem = elem.toLowerCase();

		if (numMap1.has(lowElem)) numMap1.set(lowElem, numMap1.get(lowElem) + 1);
		else numMap1.set(lowElem, 1);
	}

	for (const elem of elems2) {
		const lowElem = elem.toLowerCase();
		if (numMap2.has(lowElem)) numMap2.set(lowElem, numMap2.get(lowElem) + 1);
		else numMap2.set(lowElem, 1);
	}

	// 만들어진 두 맵 중 키가 겹치는 경우 값(카운트)이 큰 애를 기준으로 두 맵을 합쳐 새로운 맵을 만든다.
	for (const [key, value] of numMap1) {
		if (numMap2.has(key)) {
			const finalValue = value > numMap2.get(key) ? value : numMap2.get(key);
			unionArray.push([key, finalValue]);
		} else {
			unionArray.push([key, value]);
		}
	}

	for (const [key, value] of numMap2) {
		if (numMap1.has(key)) {
			continue;
		} else {
			unionArray.push([key, value]);
		}
	}

	// 합쳐진 새로운 맵을 순환하며 값(카운트) 이 0이 될때까지 결과 배열에 키를 push한다.
	for (let i = 0; i < unionArray.length; i++) {
		while (unionArray[i][1] !== 0) {
			result.push(unionArray[i][0]);
			unionArray[i][1]--;
		}
	}

	return result;
}

// 주어진 두 배열의 교집합을 구하는 함수
function getIntersection(elems1, elems2) {
	const result = [];

	for (let i = 0; i < elems1.length; i++) {
		const lowElem1 = elems1[i].toLowerCase();

		for (let j = 0; j < elems2.length; j++) {
			const lowElem2 = elems2[j].toLowerCase();
			if (lowElem1 === lowElem2) {
				result.push(elems1[i]);
				elems2.splice(j, 1); // 중복 방지위해 splice로 원소를 삭제해준다.
				break;
			}
		}
	}

	return result;
}

function getElements(str) {
	const result = [];
	const ENG_REGEX = /^[a-zA-Z]*$/gm;

	for (let i = 0; i < str.length - 1; i++) {
		if (str[i].match(ENG_REGEX) && str[i + 1].match(ENG_REGEX)) {
			result.push(str[i] + str[i + 1]);
		}
	}

	return result;
}
