export const zeroPad = function (value: number) {
	let strValue = value.toString();
	if (strValue.length < 2) {
		strValue = "0" + strValue;
	}
	return strValue;
};
