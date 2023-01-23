import httpService from "./http.service";

const replyEndPoint = "reply/";

const replyService = {
    createReply: async (payload) => {
        const { data } = await httpService.post(replyEndPoint, payload);
        return data;
    },
    getRepliesForPage: async (pageId) => {
        const { data } = await httpService.get(replyEndPoint, {
            params: {
                orderBy: "pageId",
                equalTo: pageId
            }
        });
        return data;
    },
    update: async ({ payload, replyId }) => {
        const { data } = await httpService.patch(
            replyEndPoint + replyId,
            payload
        );
        return data;
    },
    removeReply: async (replyId) => {
        const { data } = await httpService.delete(replyEndPoint + replyId);
        return data;
    }
};

export default replyService;
