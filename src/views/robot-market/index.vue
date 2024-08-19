<template>
  <div class="robot">
    <div class="list">
      <div class="robot-card relative" v-for="item in list" :key="item.labelId">
        <div class="top">
          <div class="right">
            <img :src="item.headImg" />
          </div>
          <div class="left">
            <p class="title" :title="item.robotName">{{ item.robotName }}</p>
            <p class="desc" :title="item.robotDesc">{{ item.robotDesc }}</p>
          </div>
        </div>
        <SvgIcon
          class="absolute right-4 top-4"
          :width="15"
          :height="15"
          hover
          icon="icon-park-outline:copy"
          @click="handlerAction('copy', item)"
        ></SvgIcon>
      </div>
    </div>
    <RobotDialog ref="robotDialogRef" @submit="submit"></RobotDialog>
  </div>
</template>

<script setup>
import { robotList } from "@/utils"
import { copy } from "@/utils"

const handlerAction = (type, item) => {
  if (type == "copy") {
    copy(item.prompt)
    $message.success("复制成功")
  }
}

const list = ref(robotList)
</script>
<style lang="scss" scoped>
.robot {
  height: calc(100% - 60px);
  overflow: auto;
  padding: 20px;
  .list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  .robot-card {
    padding: 20px 30px;
    width: 300px;
    border-radius: 8px;
    background: linear-gradient(
      196.58deg,
      rgba(57, 84, 90, 0.6) 2.65%,
      rgb(23, 27, 33),
      rgb(25, 36, 44) 90.18%
    );
    .top {
      gap: 10px;
      .right img {
        width: 80px;
        height: 80px;
      }
      .left {
        .title {
          font-size: 20px;
          font-weight: bold;
          overflow: hidden;
          margin-bottom: 10px;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        .desc {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          line-height: 22px;
        }
      }
    }
  }
}
</style>
