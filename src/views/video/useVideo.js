import { ref, onMounted } from "vue"
import { createImgeApi } from "@/api/index"

import { KLingAdapter, ViduAdapter } from "@/adapter"
export const useVideo = (url) => {
  // const adapter = new KLingAdapter()
  const adapter = ref(new ViduAdapter())

  const uploadImage = ref({
    filename: "WechatIMG417.jpg",
    url: "https://uploads.cf.vidu.studio/tmp/vidu/2369821374817716/24/0812/232301-5k5L8TGcXOD2XS5q?Expires=1723508581&Signature=IuUiM-VGIptAWevL8LICm-r8GI0h-RBROS4JsOFgVqcdcARbMEFt8zK8RPf8ItFxcbR2tivDHS6LH6Sh3G2Vtcj5d3TJHs8cNje~bUmgIyh5OMoL81-8ogZWsAboGeLxkqgtsmapVgsPCs7Z0cmEOfhctyuSs2tT06eh80yuYeShtWVVIFySuntz6HhenvUU4uloUaxNo3PoNJRqG54tB55RsQLGxBcriqf23mtkabZQFHij2L9UMPGx8v-nlmGtrz5nHeN~PM9Hnlq38yEAto~KBWsVtYSqTggfuVmiMO1G1JuLj33ACWz5yWaPNPejZwtrbV-q8Y7bLdvukkACYA__&Key-Pair-Id=KNW0SL0E7LV4E",
  })
  const onUploading = (loading) => {
    console.log("onUploading loading", loading)
  }
  const onUploadSuccess = (data) => {
    //   {
    //     "id": "2386627486944977",
    //     "bytes": 270233,
    //     "created_at": 1723504979,
    //     "filename": "WechatIMG417.jpg",
    //     "object": "file",
    //     "purpose": "vidu",
    //     "status": "uploaded",
    //     "status_details": null,
    //     "url": "https://uploads.cf.vidu.studio/tmp/vidu/2369821374817716/24/0812/232301-5k5L8TGcXOD2XS5q?Expires=1723508581&Signature=IuUiM-VGIptAWevL8LICm-r8GI0h-RBROS4JsOFgVqcdcARbMEFt8zK8RPf8ItFxcbR2tivDHS6LH6Sh3G2Vtcj5d3TJHs8cNje~bUmgIyh5OMoL81-8ogZWsAboGeLxkqgtsmapVgsPCs7Z0cmEOfhctyuSs2tT06eh80yuYeShtWVVIFySuntz6HhenvUU4uloUaxNo3PoNJRqG54tB55RsQLGxBcriqf23mtkabZQFHij2L9UMPGx8v-nlmGtrz5nHeN~PM9Hnlq38yEAto~KBWsVtYSqTggfuVmiMO1G1JuLj33ACWz5yWaPNPejZwtrbV-q8Y7bLdvukkACYA__&Key-Pair-Id=KNW0SL0E7LV4E",
    //     "data": null
    // }
    uploadImage.value = data
    console.log("onUploadSuccess res", res)
  }

  return {
    adapter,
    uploadImage,
    onUploading,
    onUploadSuccess,
  }
}
