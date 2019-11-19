<template>
  <div class="dashboard-editor-container">
    <div class="todo-area">
      <el-row>
        <el-col :span="24">
          <todo-list></todo-list>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TodoList from './components/TodoList'

export default {
  name: 'dashboard-editor',
  components: { TodoList },
  data() {
    return {
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

	.dashboard-editor-container {
		background-color: #e3e3e3;
		min-height: 100vh;
		margin-top: -50px;
		padding: 100px 60px 0;
	}
  .todo-area{
    margin:-20px;
    padding:-20px;
  }
</style>
