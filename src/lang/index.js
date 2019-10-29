import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang，引入英文语言包
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang，引入中文语言包
import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n)

const messages = {
  en: { // 英文语言包
    ...enLocale,
    ...elementEnLocale
  },
  zh: { // 中文语言包
    ...zhLocale,
    ...elementZhLocale
  }
}

const i18n = new VueI18n({
  locale: Cookies.get('language') || 'en', // set locale，默认显示语言
  messages // set locale messages，切换的语言集合
})

export default i18n
