function solution(enroll, referral, seller, amount) {
	var answer = [];
	const PRICE = 100;
	const members = {};

	// members 에 추천인, 원래 인덱스와 함께 등록
	for (let i = 0; i < enroll.length; i++) {
		const name = enroll[i];
		members[name] = {
			boss: referral[i],
			revenue: 0,
			idx: i,
		};
	}

	const distributeIncome = (name, income) => {
		const fee = income / 10 < 1 ? 0 : Math.floor(income / 10);
		const revenue = income - fee;
		members[name].revenue += revenue;
		if (fee === 0) return;
		if (members[name].boss === "-") return;
		distributeIncome(members[name].boss, fee);
	};

	for (let i = 0; i < seller.length; i++) {
		const sellerName = seller[i];
		const income = amount[i] * PRICE;
		distributeIncome(sellerName, income);
	}

	const revenueWithIdx = [];
	for (const [key, value] of Object.entries(members)) {
		const revenue = value.revenue;
		const idx = value.idx;
		revenueWithIdx.push([revenue, idx]);
	}

	const result = revenueWithIdx.sort((a, b) => a[1] - b[1]).map((el) => el[0]);

	return result;
}
