const ApiError = require("./Apierrors");

const weburlValidationRegx = /^https?:\/\/[^\s/$.?#].[^\s]*$/;
function isValidHttpUrl(string) {
    try {
      const newUrl = new URL(string);
      return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
    } catch (err) {
      return false;
    }
  }
const validation = (str, type) => {
    if (!str) {
        throw new ApiError(400, `Invalid input: ${str}`);
    }

    if (type === "string" && str.length === 0) {
        throw new ApiError(400, `Invalid input: ${str}`);
    }

    if (type === "weburl" && !isValidHttpUrl(str)) {
        throw new ApiError(400, `Invalid URL: ${str}`);
    }

    if(type == "shortId" && str.length != 10) throw new ApiError(400, `Invalid URL: ${str}`);

    return true
};

module.exports = validation;
