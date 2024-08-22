<template>
	<div class="popup_page">
		<h2>比较文本，请区分两个输入框文本</h2>
		<div class="input_box">
			<!-- <a-textarea
			v-model:value="oldText"
			placeholder="请输入比较文本"
			/> -->
			<NInput
				type="textarea"
				v-model:value="oldText"
				placeholder="请输入比较文本"
			></NInput>
			<!-- <a-textarea
				v-model:value="newText"
				placeholder="请输入比较文本"
				/> -->
			<NInput
				type="textarea"
				v-model:value="newText"
				placeholder="请输入比较文本"
			></NInput>
		</div>
		<br/>
		<h2>比较结果</h2>
		<div class="diff_box">
			<code-diff
				:old-string="oldText"
				:new-string="newText"
				file-name="demo.txt"
				output-format="side-by-side"
			></code-diff>
		</div>
	</div>
</template>

<script setup>
/**
 * 插件
 * https://github.com/Shimada666/v-code-diff
 */
import { onMounted, ref, computed} from 'vue'
import { CodeDiff } from 'v-code-diff'

const oldText = ref('')
const newText = ref('')

</script>

<style lang="less" scoped>
.popup_page{
	width: calc(100% - 32px);
	height: calc(100% - 100px);
	margin: 16px;
	overflow: auto;
	.input_box {
		display: flex;
		width: 100%;
	}
	.diff_box {
		height: 50%;
	}
}
</style>