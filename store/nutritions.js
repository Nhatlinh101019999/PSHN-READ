export const state = () => ({
    nutritions: [],
});

export const getters = {
};

export const mutations = {
    SET_STATE(state, { prop, data }) {
        state[prop] = data;
    },
};

export const actions = {
    async fetchNutritions({ commit }) {
        const { data: { nutritionCategories } } = await this.$api.nutritions.getAll();
        commit('SET_STATE', { prop: 'nutritions', data: nutritionCategories });
    },

};
