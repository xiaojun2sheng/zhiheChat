<template>
	<div class="page">
		<div class="card" title="请输入文案">
			<!-- <a-textarea
				v-model:value="jsonText"
				:auto-size="{ minRows: 8, maxRows: 20 }"
				placeholder="待格式化的json文本"
			/> -->
			<NInput
				type="textarea"
				v-model:value="jsonText"
				placeholder="待格式化的json文本"
			></NInput>
		</div>
		<div class="card" title="JSON格式化">
			<vue-json-pretty 
			:data="jsonObj">
			</vue-json-pretty>
		</div>
	</div>
  </template>
  
  <script setup>
  import {ref,computed} from "vue"
  import VueJsonPretty from 'vue-json-pretty';
  import 'vue-json-pretty/lib/styles.css';
	//json文本
	let jsonText = ref("");
	//json对象
	const jsonObj = computed(() => {
		if (jsonText.value.trim() == '') {
				return {}
		} else {
			let obj = {};
			try{
				obj = JSON.parse(jsonText.value)
				console.log(obj);
			} catch (e) {
				console.log("解析出错:"+e);
			}
			return obj
		}
	})
  </script>
  
  <style scoped lang="less">
  .page {
	display: flex;
    width: 100%;
    height: 100%;
    overflow: auto;
    justify-content: center;
	.card {
		width: 40%;
		margin: 8px;
		height: 60%;
		overflow: auto;
	}
  }
  
  </style>