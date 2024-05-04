export default {
    namespaced:true,
    state(){
        return {
            userInfo :{
                token:'',
                userId:''
            }
        }
    },
    mutations:{
        setUserInf(state,obj){
            state.userInfo = obj;
        },
        getUserInf(){
            return this.state.userInfo;
        }
    }
}