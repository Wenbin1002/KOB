<template>
  <div class="result-board">
    <div class="result-board-text" v-if="$store.state.pk.loser === 'all'">
        Draw
    </div>
    <div class="result-board-text" v-else-if="$store.state.pk.loser === 'A' && $store.state.pk.a_id == $store.state.user.id">
        Lose
    </div>
    <div class="result-board-text" v-else-if="$store.state.pk.loser === 'B' && $store.state.pk.b_id == $store.state.user.id">
        Lose
    </div>
    <div class="result-board-text" v-else>
        Win
    </div>
    <div class="result-board-button">
        <button @click="restart" type="button" class="btn btn-warning" style="width: 10vw;">Play again!</button>  
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();

        const restart = () => {
            store.commit("updateStatus", "matching");
            store.commit("updateLoser", "none");
        }

        return {
            restart,
        };
    }
}
</script>

<style>
div.result-board {
    height: 30vh;
    width: 30vw;
    background-color: rgba(50, 50, 50, 0.5);
    position: absolute;
    top: 30vh;
    left: 35vw;
}

div.result-board-text {
    text-align: center;
    color: white;
    font-size: 50px;
    font-weight: 600;
    font-style: italic;
    padding-top: 5vh;
}

div.result-board-button {
    text-align: center;
    padding-top: 7vh;
}

</style>