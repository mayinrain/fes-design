<template>
    <FSpace vertical>
        change事件
        <FInput placeholder="请输入" @change="textChange"></FInput>
        keydown事件
        <FInput placeholder="请输入" @keydown="keyDown"></FInput>
        Input事件
        <FInput placeholder="请输入" @input="inputChange"></FInput>
    </FSpace>
</template>

<script setup lang="ts">
const textChange = (e) => {
    console.log('text change', e);
};

const keyDown = (e) => {
    console.log('keyDown', e);
};

const inputChange = (e) => {
    console.log('inputChange', e);
};
</script>
