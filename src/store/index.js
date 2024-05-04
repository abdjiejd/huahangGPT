import Vue from "vue";
import Vuex from 'vuex';
Vue.use(Vuex);



const store = new Vuex.Store({  
    state: initState(),
});

function initState(){
    const state = JSON.parse(localStorage.getItem('vue-x'));
    if (state) {
        return state;
    }else {
      var defaultState = {
            userInf:{
                token:'',
                userId:0,
                username:'',
                post:0
            },
            localDialogue:[]
        }
        return defaultState;
    }
}



export  default store;