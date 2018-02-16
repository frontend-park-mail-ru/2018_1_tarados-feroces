const regExp = /<[a-z0-9 _\-"=(){}]+>|<\/[a-z0-9 _\-"=(){}]+>/ig;
const regExpBegin = /<([a-z0-9 _\-"=(){}]+)>/i;
// const regExpEnd = /<\/([a-z0-9 _\-"=(){}]+)>/i;

let parsedHtml = [];
let tagStack = [];

const testStr = '<a>abc<b><c class="login-block"></c></b><d><f></f></d><e></e></a>';


const handleCloseTag = () => {
    let obj = tagStack.pop();
    if (tagStack.length === 0) {
        parsedHtml.push(obj);
        return;
    }

    tagStack[tagStack.length - 1].children.push(obj);
};

const handleOpenTag = (tag) => {
    let obj = {
        object: tag.slice(1, -1),
        children: [],
    };

    tagStack.push(obj);
};

const handleTag = (tag) => {
    let result = regExpBegin.exec(tag);
    result ? handleOpenTag(tag) : handleCloseTag(tag);
};

const parse = (input) => {
    let compareResult = '';
    let previousIndex = 0;

    while (compareResult = regExp.exec(input)) {
        if (previousIndex < compareResult.index) {
            tagStack[tagStack.length - 1].text = input.slice(previousIndex, compareResult.index);
        }

        handleTag(compareResult[0]);

        previousIndex = compareResult.index + compareResult[0].length;
    }

    console.log(parsedHtml);

    return parsedHtml;

parse(testStr);
