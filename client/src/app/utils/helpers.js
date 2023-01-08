function arrayRandElement(arr) {
    const rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}

export function stringToArray(string) {
    return string.split(",");
}

export function getRandomArticles(articles) {
    const randomArticles = [];
    for (let i = 0; i < 3; i++) {
        randomArticles.push(arrayRandElement(articles));
    }
    if (randomArticles.length > 0 && randomArticles.length <= 4) {
        return randomArticles;
    } else {
        return null;
    }
}
