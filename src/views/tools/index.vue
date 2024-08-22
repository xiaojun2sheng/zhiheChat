<template>
	<div class="newtab_page">
		<!-- <a-menu v-model:selectedKeys="current" mode="horizontal" class="nav_box">
			<a-menu-item
				v-for="mItem in MenuList"
				:key="mItem.key"
				@click="pageVal=mItem.page">
				{{ mItem.title }}
			</a-menu-item>
		</a-menu> -->

		<n-tabs
			v-model:value="current"
			type="line"
			animated
			@update:value="seletedTools"
			>
			<n-tab-pane
				v-for="mItem in MenuList"
				:key="mItem.key"
				:name="mItem.title"
				:tab="mItem.title"
			>
			</n-tab-pane>
		</n-tabs>

		<KeepAlive>
			<component :is="pageVal"></component>
		</KeepAlive>

		<!-- <div class="contact_me">
			<a href="dingtalk://dingtalkclient/action/sendmsg?dingtalk_id=qbgskcd"></a>
		</div> -->
	</div>
</template>

<script setup>
import { onMounted, ref, computed} from 'vue'
import Diff from './components/diff.vue'
import MarkDown from './components/markDown.vue'
import CompressImg from './components/compressImg.vue'
import JsonFormat from './components/jsonFormat.vue';

let pageVal = ref(Diff)

const MenuList = [
	{key: 'diff', title: 'diff比对', page: Diff},
	{key: 'markDown', title: 'MarkDown转换', page: MarkDown},
	{key: 'compressImg', title: '图片压缩', page: CompressImg},
	{key: 'jsonFormat', title: 'JSON格式化', page: JsonFormat},
]

const seletedTools = (tool) => {
	let toolInfo = MenuList.find(item => {
		return item.title == tool
	})
	pageVal.value = toolInfo.page
}

</script>

<style lang="less" scoped>
.newtab_page{
	width: 100%;
	height: 100%;
	overflow: hidden;
	.nav_box {
		width: calc(100% - 32px);
		height: 42px;
		float: left;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 16px;
	}
	.contact_me {
		position: fixed;
		bottom: 10%;
		right: 100px;
		.anticon-question-circle {
			font-size: 30px;
		}
	}
}
</style>