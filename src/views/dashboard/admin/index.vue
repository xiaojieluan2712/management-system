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
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'

export default {
  name: 'dashboard-admin',
  components: {
    PanelGroup,
    TransactionTable,
    TodoList,
    BoxCard
  },
  data() {
    return {
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
