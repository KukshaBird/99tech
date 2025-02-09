/**
 * This is most readable way. Execution time grows proportionally with the input size. (O(n))
 * @param num
 */
function sumToNWayA(num: number): number {
	checkNumIsNatural(num);

	const safeLimit = num; // for readability
	let result = 0;

	for (let i = 1; i <= safeLimit; i++) {
		result += i;
	}

	return result;
}

/**
 * This is slimmer and ordinary way. Also with weak efficiency (O(n))
 * @param num
 */
function sumToNWayB(num: number): number {
	checkNumIsNatural(num);
	return Array.from({ length: num }, (_, i) => i + 1).reduce((acc: number, n: number) => acc + n, 0);
}

/**
 * Use Sum of Natural Numbers formula to increase efficiency to O(1). Fastest way.
 * @param num
 */
function sumToNWayC(num: number): number {
	checkNumIsNatural(num);
	return (num * (num + 1)) / 2;
}

const checkNumIsNatural = (num: any): void => {
	// I have restricted negative numbers as task about the sum. However, this not mentioned in description.
	if (!(Number.isInteger(num) && num >= 0)) {
		throw new RangeError("Number must be a positive integer");
	}
	return;
}

const checkFunctions = (num: number): void => {
	const resultOne = sumToNWayA(num);
	const resultTwo = sumToNWayB(num);
	const resultThree = sumToNWayC(num);

	console.log(resultOne);
	console.log(resultTwo);
	console.log(resultThree);
	return;
}

checkFunctions(5);