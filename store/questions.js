export const state = () => ({
    questions: [],
    detailQuestion: {},
    pagination: {
        total: 0,
        page: 0,
        perPage: 0,
    },
});

export const mutations = {
    SET_STATE(state, { prop, data }) {
        state[prop] = data;
    },

};

export const actions = {
    async fetchQuestions({ commit }, payload) {
        const { data: { question, pagination } } = await this.$api.questions.getAll(payload);
        commit('SET_STATE', { prop: 'questions', data: question || [] });
        commit('SET_STATE', { prop: 'pagination', data: pagination || {} });
    },
    async fetchDetailQuestion({ commit }, payload) {
        const { data: { question } } = await this.$api.questions.detail(payload);
        commit('SET_STATE', { prop: 'detailQuestion', data: question || {} });
    },
};
