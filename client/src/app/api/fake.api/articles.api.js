const articles = [
    {
        _id: "67rdca3eeb7f6fg",
        userId: "6383870c5bed33bd78192188",
        pageId: "67rdca3eeb7f6fgeed471815",
        content: "Lorem ipsum dolor",
        title: "Lorem ttt",
        themes: "Something",
        cover: "/images/fff.jpeg",
        created_at: Date.now()
    },
    {
        _id: "67rdca3eeb7f6fgdasd",
        pageId: "67rdca3eeb7f6fgeed471815",
        userId: "6383870c5bed33bd78192188",
        content: "Lorem ipsum dolor and etc",
        title: "Lorem adad",
        themes: "Something",
        cover: "/images/fff.jpeg",
        created_at: Date.now()
    },
    {
        _id: "67rdca3eeb7f6fgdaasd",
        pageId: "67rdca3eeb7f6fgeed471817",
        userId: "6383870c5bed33bd78192188",
        content: "Lorem ipsum dolor and etc",
        title: "Lorem G",
        themes: "Something",
        cover: "/images/fff.jpeg",
        created_at: Date.now()
    },
    {
        _id: "67rdca3eeb7f6fgdaasd67rdca3",
        pageId: "67rdca3eeb7f6fgeed471817",
        userId: "6383870c5bed33bd78192188",
        content: "Lorem ipsum dolor and etc",
        title: "Lorem impus",
        themes: "Something",
        cover: "/images/fff.jpeg",
        created_at: Date.now()
    },
    {
        _id: "67rdca3eeb7f6fgdaasd67rdca3adadasdad",
        pageId: "67rdca3eeb7f6fgeed471817",
        userId: "6383870c5bed33bd78192188",
        content: "Lorem ipsum dolor and etc",
        title: "Lorem i",
        themes: "Something",
        cover: "/images/fff.jpeg",
        created_at: Date.now()
    }
];

if (!localStorage.getItem("articles")) {
    localStorage.setItem("articles", JSON.stringify(articles));
}

function arrayRandElement(arr) {
    const rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}

const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(articles);
        }, 200);
    });

const fetchRandomArticles = () => {
    const randomArticles = [];
    for (let i = 0; i < 3; i++) {
        randomArticles.push(arrayRandElement(articles));
    }
    if (randomArticles.length > 0) {
        return new Promise((resolve) => {
            window.setTimeout(function () {
                resolve(randomArticles);
            }, 200);
        });
    }
};

const fetchArticlesForUser = (userId) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(
                JSON.parse(localStorage.getItem("articles")).filter(
                    (c) => c.pageId === userId
                )
            );
        }, 200);
    });

const add = (data) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            const articles = JSON.parse(localStorage.getItem("articles"));
            const newArticle = {
                ...data,
                created_at: Date.now(),
                _id: Math.random().toString(36).substr(2, 9)
            };
            articles.push(newArticle);
            localStorage.setItem("articles", JSON.stringify(articles));
            resolve(newArticle);
        }, 200);
    });

const remove = (id) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            const articles = JSON.parse(localStorage.getItem("articles"));
            const newArticles = articles.filter((x) => x._id !== id);
            localStorage.setItem("articles", JSON.stringify(newArticles));
            resolve(id);
        }, 200);
    });

export default {
    fetchAll,
    fetchRandomArticles,
    fetchArticlesForUser,
    add,
    remove
};
