
export default {
    state: {
        status: "matching",
        socket: null,
        opponent_username: "competitor",
        opponent_photo: "https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png",
        gamemap: null,
    },
    getters: {
    }, 
    mutations: {
        updateSocket(state,socket) {
            state.socket = socket;
        },
        updateOpponent(state, opponent) {
            state.opponent_username = opponent.username;
            state.opponent_photo = opponent.photo;
        },
        updateStatus(state, status) {
            state.status = status;
        },
        updateGamemap(state,gamemap) {
            state.gamemap = gamemap;
        }
    },
    actions: {
        
    },

    modules: {
    }
}