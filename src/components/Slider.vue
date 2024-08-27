<template>
  <div class="box" v-if="fetchData.length > 0">
    <div class="boxInner">
      <div class="content">
        <span class="tag">▶ 影音</span>
        <span class="hastag">{{ fetchData?.[currentSlide].name }}</span>
        <span class="hastag">{{ fetchData?.[currentSlide].modifiedDate }}</span>
        <p class="desc">{{ fetchData?.[currentSlide].description }}</p>
        <div class="roundButton">
          <RoundButton @onClick="handleLink" style="padding: 12px 48px;">
            立即閱讀
          </RoundButton>
        </div>
      </div>
      <swiper
        :effect="'cards'"
        :grabCursor="true"
        :pagination="pagination"
        :modules="modules"
        :navigation="true"
        class="mySwiper"
        @slideChange="onSlideChange"
        :breakpoints="{
            '1200': {
                slidesPerView: 1,
                spaceBetween: 0,
            }
        }"
      >
        <swiper-slide v-for="item in fetchData">
          <img src="../assets/768x432.jpg" :alt="item.name" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, EffectCards } from 'swiper/modules'
import * as apiService from '../services/apiService.js'
import IconArrow from './icons/IconArrow.vue'
import RoundButton from './Buttons/RoundButton.vue'
import 'swiper/css'

export default {
  components: {
    Swiper,
    SwiperSlide,
    IconArrow,
    RoundButton
  },
  data() {
    const getData = () => {
      return apiService.get(
        `https://data.ntpc.gov.tw/api/datasets/17168616-329b-4034-9290-2114a23ab80b/json?size=3`
      )
    }
    return {
      currentSlide: 0,
      fetchData: [],
      getData,
      pagination: {
        clickable: true,
        renderBullet: function (index, className) {
          return '<p class="' + className + '"></p>'
        }
      },
      modules: [Pagination, EffectCards, Navigation],
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const res = await this.getData(100)
        this.fetchData = res && res.map((item) => {
          return {
            id: item.id,
            name: item.author,
            description: item.title,
            modifiedDate: item.modifiedDate
          }
        })
    },
    onSlideChange(val) {
      this.currentSlide = val.activeIndex
      console.log(val.activeIndex)
    },
    handleLink() {
      console.log('沒有要讓你閱讀')
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  background-color: #f9f8f7;
  .boxInner {
    display: flex;
    overflow: hidden;
    max-width: var(--max-width-desktop);
    min-width: var(--max-width-desktop);
    margin: auto;
    padding: 64px 0px;
    .mySwiper:deep(.swiper-slide-shadow-cards) {
      border-radius: 25px;
    }
  }
}
.content {
  position: relative;
}
.swiper,
.content {
  width: calc(50% - 30px);
}
.swiper {
  overflow: initial !important;
}
.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 24px;
}

.tag {
  background-color: #22222299;
  border-radius: 12px;
  padding: 4px 12px;
  font-size: 14px;
  color: #fff;
  font-weight: 400;
}
.hastag {
    &::before {
        content: '# ';
    }
    color: #B38E5B;
    margin-left: 16px;
}
p.desc {
    margin-top: 16px;
    font-size: 32px;
    line-height: 48px;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
}
.roundButton {
  position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);

}

@media (max-width: 1200px) {
  p.desc {
     text-align: justify
  }
  .roundButton {
  position: initial;
    bottom: initial;
    left: initial;
    transform: initial;
    transform: initial;
        text-align: center;
        margin-top: 48px;
}
.swiper,
.content {
  width: calc(100% - 36px);
  margin: auto;
}
.content {
    margin-top: 16px;
}
  .box {
    overflow: hidden;
    .boxInner {
        flex-direction: column-reverse;
        max-width: 100%;
        min-width: 100%;
        padding: 32px 0px;
    }
  }
}

@media (max-width: 320px) {
  .swiper,
  .content {
    width: calc(100% - 36px);
    margin: auto;
  }
}
</style>
