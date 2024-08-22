<template>
	<div class="popup_page">
		<v-md-editor v-model="mdText" height="100%"></v-md-editor>
	</div>
</template>

<script setup>
/**
 * MD组件
 * https://code-farmer-i.github.io/vue-markdown-editor/zh/examples/base-editor.html#%E5%9C%A8-vue3-%E4%B8%AD%E5%BC%95%E5%85%A5
 * 
 */
import { onMounted, ref, computed} from 'vue'

let mdText = ref('')


onMounted(() => {
})


</script>

<style lang="less" scoped>
.popup_page{
	width: calc(100% - 32px);
	height: calc(100% - 100px);
	margin: 16px;
}
</style>