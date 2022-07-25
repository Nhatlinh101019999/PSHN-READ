export const state = () => ({
    questionCategories: [],
});

export const mutations = {
    SET_STATE(state, { prop, data }) {
        state[prop] = data;
    },
};

export const actions = {
    async fetchQuestionCategories({ commit }) {
        const { data: { questionCategories } } = await this.$api.questionCategories.getAll();
        commit('SET_STATE', { prop: 'questionCategories', data: questionCategories });
    },

};
