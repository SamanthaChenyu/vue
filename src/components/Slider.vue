<template>
  <div class="box" v-if="fetchData.length > 0">
    <div class="boxInner">
      <div class="content">
        <span class="tag">▶ 影音</span>
        <span class="hastag">{{ fetchData?.[currentSlide].name }}</span>
        <span class="hastag">常見治療問題</span>
        <p class="desc">{{ fetchData?.[currentSlide].description }}</p>
      </div>
      <swiper
        :effect="'cards'"
        :grabCursor="true"
        :pagination="pagination"
        :modules="modules"
        :navigation="true"
        class="mySwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide v-for="item in fetchData">
          <img :src="item.img" :alt="item.name" />
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
import 'swiper/css'

export default {
  components: {
    Swiper,
    SwiperSlide,
    IconArrow
  },
  data() {
    const getData = () => {
      return apiService.get(
        `newsapi.org/v2/top-headlines/sources?apiKey=bd1a6c049f5b48fd86b525e20ada4404&country=ca`
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
      modules: [Pagination, EffectCards, Navigation]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const res = await this.getData(100)
      if (res.status === 'ok') {
        this.fetchData = res.sources.map((item) => {
          return {
            id: item.id,
            name: item.name,
            description: item.description,
            url: item.url,
            img: 'https://picsum.photos/768/432'
          }
        })
      }
    },
    onSlideChange(val) {
      this.currentSlide = val.activeIndex
      console.log(val.activeIndex)
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  background-color: #f9f8f7;
  .boxInner {
    display: flex;
    max-width: var(--max-width-desktop);
    min-width: var(--max-width-desktop);
    margin: auto;
    padding: 64px 0px;
  }
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

@media (max-width: 1200px) {
.swiper,
.content {
  width: 85%;
  margin: auto;
}
.content {
    margin-top: 16px;
}
  .box {
    .boxInner {
        flex-direction: column-reverse;
    }
  }
}
</style>
