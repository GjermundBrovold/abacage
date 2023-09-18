// import puppeteer from 'puppeteer';

// export const getProfilePicUrl = async (username) => {
// 	// Start a Puppeteer session with:
// 	// - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
// 	// - no default viewport (`defaultViewport: null` - website page will in full width and height)
// 	const browser = await puppeteer.launch({
// 		headless: false,
// 		defaultViewport: null
// 	});

// 	// Open a new page
// 	const page = await browser.newPage();

// 	// On this new page:
// 	// - open the "http://quotes.toscrape.com/" website
// 	// - wait until the dom content is loaded (HTML is ready)
// 	let url = 'https://abakus.no/users/' + username;
// 	await page.goto(url, {
// 		waitUntil: 'domcontentloaded'
// 	});

// 	// Get page data
// 	const src = await page.evaluate(() => {
// 		const images = document.querySelectorAll('img:is([alt*="profile picture"])');

// 		if (images.length > 0) {
// 			let src = images[images.length - 1].src;
// 		} else {
// 			return 'https:thumbor.abakus.no/vTeRbni7WlbNvx1nmEbALGOAOSg=/200x200/default_male_avatar.png';
// 		}

// 		return src;
// 	});

// 	// Display the quotes
// 	console.log(src);

// 	// Close the browser
// 	await browser.close();

// 	// return
// 	return src;
// };
