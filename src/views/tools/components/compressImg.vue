<template>
	<div class="popup_page" >
		<n-card title="原始图片" class="card">
			<div class="card_box">
				<span v-if="imgBlob?.size">图片质量：{{ imgBlob?.size / 1024 }} KB</span>
				<span v-if="imgBlob?.size">图片宽度：{{ imgInfo.width }}</span>
				<br/>
				<img style="width: 200px" :src="uploadImg" />
				<n-upload
					:showUploadList="false"
					name="file"
					@on-change="handleChange"
					>
					<n-button>
						图片上传
					</n-button>
				</n-upload>
			</div>
		</n-card>
		<div class="img_tools" v-if="uploadImg">
			<div>
				<span>压缩百分比</span>
				<a-input-number
					v-model:value="compressInfo.quality"
					:min="0"
					:max="100"
					:formatter="value => `${value}%`"
					:parser="value => value.replace('%', '')"
				/>
			</div>
			<div>
				<span>图片宽度</span>
				<a-input-number
					v-model:value="compressInfo.width"
					:min="10"
					:max="10000"
				/>
			</div>
			<a-button type="primary" @click="compressHander">
				压缩图片
			</a-button>
		</div>
		<n-card title="压缩后图片" class="card" v-if="uploadImg">
			<div class="card_box">
				<span v-if="newImageBlob?.size">图片质量：{{ newImageBlob?.size / 1024 }} KB</span>
				<span v-if="newImageBlob?.size">图片宽度： {{ compressInfo.width }}</span>
				<br/>
				<img :src="newImage" />
			</div>
		</n-card>
	</div>
</template>

<script setup>
import { onMounted, ref, computed} from 'vue'
import ImageCompressor from 'js-image-compressor';

let uploadImg = ref('')

// 图片上传
let imgBlob = ref()
let imgInfo = ref({
	width: 0,
	height: 0,
})
const handleChange = async info => {
	imgBlob.value = new Blob([info.file.originFileObj], { type: 'image/jpeg' });
	uploadImg.value = URL.createObjectURL(imgBlob.value)
	let img = new Image()
	img.src = uploadImg.value
	img.onload = function(){
		imgInfo.value.width = img.width
		compressInfo.value.width = img.width
		imgInfo.value.height = img.height
	}
};

let compressInfo = ref({
	quality: 80,
	width: imgInfo.value.width,
})

// 压缩
let newImageBlob = ref()
let newImage = ref()
const compressHander = async () => {
	newImageBlob.value = await compressTools(imgBlob.value)
	var blobURL = URL.createObjectURL(newImageBlob.value)
	newImage.value = blobURL;
}

const compressTools = (file) => {
	const size = file.size / 1024
    return new Promise((resolve, reject) => {
		const options = {
			file: file,
			quality: compressInfo.value.quality * 0.01, // 图片质量
			mimeType: 'image/jpeg',
			maxWidth: file.height,
			maxHeight: file.width,
			minWidth: 10, // 指定压缩图片最小宽度
			width: compressInfo.value.width || 1080, // 指定压缩图片宽度
			convertSize: Infinity,
			loose: true,
			redressOrientation: true,
			success: (result) => {
				resolve(result)
			},
			error: (msg) => {
				reject(msg)
			},
		}
    	new ImageCompressor(options)
  	})
}

</script>

<style lang="less" scoped>
.popup_page{
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	.card {
		width: 300px;
		.card_box {
			display: flex;
			flex-direction: column;
		}
	}
	.img_tools {
		margin: 16px;
		display: flex;
		flex-direction: column;
		div {
			display: flex;
			align-items: center;
			margin-bottom: 8px;
			span {
				width: 100px;
			}
		}
	}
	img {
		width: 200px;
		display: inline-block;
	}
}
</style>