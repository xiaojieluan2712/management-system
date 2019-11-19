<template>
	<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
		<sidebar class="sidebar-container">
    </sidebar>
		<div class="main-container">
      <div class="top-banner">
        <div class="right-menu">
          <lang-select class="international right-menu-item"></lang-select>

          <el-dropdown class="avatar-container right-menu-item" trigger="click">
            <div class="avatar-wrapper">
              <img class="user-avatar" :src="avatarImg">
              <i class="el-icon-caret-bottom"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <router-link to="/">
                <el-dropdown-item>
                  {{$t('navbar.dashboard')}}
                </el-dropdown-item>
              </router-link>
              <el-dropdown-item divided>
                <span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="main-area">
        <navbar></navbar>
        <tags-view></tags-view>
        <app-main></app-main>
      </div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Navbar, Sidebar, AppMain, TagsView } from './components'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'

export default {
  name: 'layout',
  data () {
    return {
      avatarImg:'/static/img/4.jpg'
    }
  },
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
    LangSelect,
    ThemePicker
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    ...mapGetters([
      'sidebar',
      'name',
      'avatar'
    ])
  },
  methods:{
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "src/styles/mixin.scss";
	.app-wrapper {
	  @include clearfix;
	  position: relative;
	  height: 100%;
	  width: 100%;
	}
  .main-container{
    background-color: #eee;
  }
  .top-banner{
    background-image:linear-gradient(to right,#a36dcc,#543e9a);
    width:100%;
    height:300px;
    .right-menu {
      float: right;
      height: 60px;
      //line-height: 30px;
      &:focus{
        outline: none;
      }
      .right-menu-item {
        display: inline-block;
        margin: 0 8px;
      }
      .international{
        vertical-align: top;
        margin-top:20px;
      }
      .avatar-container {
        height: 50px;
        margin-right: 30px;
        .avatar-wrapper {
          cursor: pointer;
          margin-top: 5px;
          position: relative;
          .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            border:1px solid #eee;
          }
          .el-icon-caret-bottom {
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
            color:#eee;
          }
        }
      }
    }
  }
  .main-area{
    border-radius: 20px;
    margin-top: -240px;
    margin-left:15px;
    margin-right:15px;
    background-color: #fff;
    padding:20px;
  }
</style>
