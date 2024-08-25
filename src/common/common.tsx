
export interface Article {
    image: string;
    header: string;
    date: string;
    href: string;
}

export const zeroPad = function (value: number) {
	let strValue = value.toString();
	if (strValue.length < 2) {
		strValue = "0" + strValue;
	}
	return strValue;
};


export interface PriceValue {
    Timestamp: string;
    Value: number;
}

export interface PriceData {
    data: Array<PriceValue>;
    date: string;
    error?: string;
}

export interface  TimeSeriesPrice {
    Timestamp: string;
    Value: number;
}

export interface Result {
    header: string;
    href: string;
    image: string;
    imagealt?: string;
    date?: string;
}