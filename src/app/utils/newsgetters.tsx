const jsdom = require("jsdom");
const { JSDOM } = jsdom;



export const getYleContent = async () => {
	const NEWSURL = "http://yle.fi"
	const IMAGEURL = "https://images.cdn.yle.fi/image/upload/w_196,h_110,ar_1.7777777777777777,dpr_1,c_fill/q_auto:eco,f_auto,fl_lossy/v420/"

    const response = await fetch("https://yle.fi/uutiset/18-205950");
    let data = await response.text();
    let results: any = [];

    let lineContent = data.split("\n");
    let initialScript = lineContent[lineContent.length - 5];
    let removedStart = initialScript.substring(initialScript.indexOf("{"));
    let removedEnd = removedStart.substring(
      0,
      removedStart.lastIndexOf("}") + 1
    );
    let initialState = JSON.parse(removedEnd);

    initialState.pageData.layout.forEach((element: any) => {
      let result = {
        header: element.texts.headline.text,
        href: NEWSURL+ element.url,
        image: IMAGEURL + element.image.id,
        imagealt: element.image.alt,
      };
      results.push(result);
    });

    return results;

};

export const getHsContent = async () => {
	const NEWSURL = "https://www.hs.fi/art-"
	const NEWSENDURL = ".html"
	
	const response = await fetch("https://www.hs.fi/aihe/sahko/");
	let data = await response.text();
	let results: any = [];

	const dom = new JSDOM(data);
	//fetching all article links
	let tags = dom.window.document.getElementsByClassName("teaser-m__border");
	
	
	let tagsArray = [...tags];
	tagsArray.forEach((element:any, index:number) => {

		let headerDom = element.getElementsByClassName("teaser-title-30");
		let imgDom = element.getElementsByTagName("img");
		if (headerDom.length != 0 && imgDom.length != 0) {
			let result = {
				header : headerDom[0].getElementsByTagName("span")[2].textContent,
				href: NEWSURL + element.getAttribute('data-id') + NEWSENDURL,
				image: imgDom[0].src
			}
			results.push(result)
		}
	});
	
	return results;
}

export const getIsContent = async () => {
	const NEWSURL = "https://www.is.fi/art-"
	const NEWSENDURL = ".html"
	
	const response = await fetch("https://www.is.fi/aihe/sahko/");
	let data = await response.text();
	let results: any = [];

	const dom = new JSDOM(data);
	//fetching all article links
	let tags = dom.window.document.getElementsByClassName("teaser-m__border");
	let images = dom.window.document.getElementsByTagName("img");
	
	let tagsArray = [...tags];
	tagsArray.forEach((element:any, index:number) => {

		let headerDom = element.getElementsByClassName("teaser-title-30");
		let imgDom = element.getElementsByTagName("img");
		if (headerDom.length != 0 && imgDom.length != 0) {
			let result = {
				header : headerDom[0].textContent,
				href: NEWSURL + element.getAttribute('data-id') + NEWSENDURL,
				image: imgDom[0].src
			}
			results.push(result)

		}

	});
	
	return results;
}

export const getIlContent = async () => {
	const NEWSURL = "https://www.iltalehti.fi/"

	const response = await fetch("https://api.il.fi/v1/articles/search?q=s%C3%A4hk%C3%B6&limit=10&image_sizes[]=size138");
	let data = await response.json();
	data = data.response;
	let results: any = [];

	
	data.forEach((element:any) => {

		let category = element.category.category_name
		let result = {
			header : element.title,
			href: NEWSURL + element.category.category_name + "/" + element.article_id,
			image: element.main_image_urls["size138"]
	}
		results.push(result)
	});

	return results;

}