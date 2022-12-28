<template>
  <ContentField>
    <div class="row justify-content-md-center">
        <div class="col-3">
            <form @submit.prevent="login">
                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input v-model="username" type="text" class="form-control" id="username" placeholder="username">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input v-model="password" type="password" class="form-control" id="password" placeholder="password">
                </div>
                <div class="error_massage">{{ error_massage }}</div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
  </ContentField>
</template>

<script>
import ContentField from '@/components/ContentField.vue'
import { useStore } from 'vuex';
import { ref } from 'vue';
import router from '@/router/index'

export default {
    components: {
        ContentField
    },
    setup() {
        const store = useStore();
        let username = ref('');
        let password = ref('');
        let error_massage = ref('');

        const login = () => {
            error_massage.value = "";

            store.dispatch("login", {
                username: username.value,
                password: password.value,
                success() {
                    store.dispatch("getInfo", {
                        success() {
                            router.push({ name: "home" });
                            console.log(store.state.user);
                        }
                    })
                    
                },
                error() {
                    error_massage.value = "failed to login";
                }
            })
        }

        return {
            username,
            password,
            error_massage,
            login,
        }
    }
}
</script>

<style>
button {
    width: 100%;
}

div.error_massage {
    color:red;
}
</style>