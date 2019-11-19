<template>
  <div class="app-container">
    <!--<div style="margin-bottom:15px;">{{$t('permission.roles')}}： {{roles}}</div>-->
   <complex-table></complex-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import complexTable from './complexTable'

export default{
  name: 'ProManage',
  components:{
    complexTable
  },
  data() {
    return {
      switchRoles: ''
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  watch: {
    switchRoles(val) {
      this.$store.dispatch('ChangeRoles', val).then(() => {
        this.$router.push({ path: '/permission/index?' + +new Date() })
      })
    }
  }
}
</script>
