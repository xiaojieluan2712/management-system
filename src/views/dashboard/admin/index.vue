<template>
  <div class="dashboard-editor-container">

    <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>

    <el-row>
      <el-col :span="24">
        <todo-list></todo-list>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import TodoList from './components/TodoList'

export default {
  name: 'dashboard-admin',
  components: {
    PanelGroup,
    TodoList
  },
  data() {
    return {
    }
  }
 }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
}
</style>
