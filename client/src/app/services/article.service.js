import httpService from "./http.service";

const articleEndPoint = "article/";

const articleService = {
    createArticle: async (payload) => {
        const { data } = await httpService.post(articleEndPoint, payload);
        return data;
    },
    getArticles: async () => {
        const { data } = await httpService.get(articleEndPoint);
        return data;
    },
    getArticlesForUser: async (userId) => {
        const { data } = await httpService.get(articleEndPoint + userId);
        return data;
    },
    removeArticle: async (articleId) => {
        const { data } = await httpService.delete(articleEndPoint + articleId);
        return data;
    }
};

export default articleService;
