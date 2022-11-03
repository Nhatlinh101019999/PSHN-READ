export const state = () => ({
    checklist: [],
});

export const getters = {
};

export const mutations = {
    SET_STATE(state, { prop, data }) {
        state[prop] = data;
    },

};

export const actions = {
    async fetchChecklist({ commit }) {
        const { data: { checklists } } = await this.$api.checklist.getAll();
        console.log(checklists);
        commit('SET_STATE', { prop: 'checklist', data: checklists });
    },

};
