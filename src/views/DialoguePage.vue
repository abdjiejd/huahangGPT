<template>
    <div class="two-body">
        <OneDialogue></OneDialogue>
        <MyInput></MyInput>
    </div>
</template>

<script>
import OneDialogue from '../views/OneDialogue.vue';
import MyInput from '../views/MyInput.vue';
export default {
    components:{
        OneDialogue,MyInput
    }
}
</script>

<style>
.two-body{
    width: 100%;
    flex:1;
    display: flex;
    flex-direction: column;
    /*border: 2px solid grey;*/
    align-items: center;
    justify-content: center;
  }
</style>