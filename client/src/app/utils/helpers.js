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

export function updateDataUser(data) {
    const updatedData = new FormData();
    updatedData.append("name", data.name);
    updatedData.append("email", data.email);
    updatedData.append("password", data.password);
    updatedData.append("typeOfBlog", data.typeOfBlog);
    updatedData.append("biography", data.biography);
    updatedData.append("instagram", data.instagram);
    updatedData.append("pinterest", data.pinterest);
    updatedData.append("github", data.github);
    updatedData.append("facebook", data.facebook);
    updatedData.append("twitter", data.twitter);
    updatedData.append("avatar", data.avatar);
    return updatedData;
}

export function updateDataArticle(data) {
    const updatedData = new FormData();
    updatedData.append("title", data.title);
    updatedData.append("description", data.description);
    updatedData.append("content", data.content);
    updatedData.append("themes", data.themes);
    updatedData.append("cover", data.cover);
    return updatedData;
}

export function filterArticles(data, searchQuery) {
    let filteredArticles;
    if (searchQuery) {
        filteredArticles = data.filter(
            (article) =>
                article.title
                    .toLowerCase()
                    .indexOf(searchQuery.toLowerCase()) !== -1
        );
        return filteredArticles;
    }
    return data;
}
