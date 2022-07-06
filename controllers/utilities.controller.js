const languagesList = require('../static/json/languages.json');
const statusCode = require('../utilities/statusCode');

exports.languages = (_request, response) => {
	'use strict';

	const languagesObject = {};

	for (const lang in languagesList) {
		if (Object.hasOwnProperty.call(languagesList, lang)) {
			languagesObject[lang] = {
				...languagesList[lang],

				// image: `http://purecatamphetamine.github.io/country-flag-icons/3x2/${lang.toUpperCase()}.svg`,
			};
		}
	}

	response.status(statusCode.success.ok).json(languagesObject);
};
