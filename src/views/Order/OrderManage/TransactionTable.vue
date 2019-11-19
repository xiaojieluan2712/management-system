<template>
  <div>
  <el-table :data="list" style="width:100%;padding-top: 15px;">
    <el-table-column label="Order_No">
      <template slot-scope="scope" width="120">
        {{scope.row.order_no}}
      </template>
    </el-table-column>
    <el-table-column label="User_name" width="200">
      <template slot-scope="scope">
        {{scope.row.username}}
      </template>
    </el-table-column>
    <el-table-column label="Price" width="150" align="center">
      <template slot-scope="scope">
        ¥{{scope.row.price | toThousandslsFilter}}
      </template>
    </el-table-column>
    <el-table-column label="Status" width="120" align="center">
      <template slot-scope="scope">
        <el-tag :type="scope.row.status | statusFilter"> {{scope.row.status}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column align="center" :label="$t('table.actions')" width="330" class-name="small-padding fixed-width">
      <template slot-scope="scope">
        <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('table.edit')}}</el-button>
        <el-button v-if="scope.row.status!='published'" size="mini" type="success" @click="handleModifyStatus(scope.row,'published')">{{$t('table.publish')}}
        </el-button>
        <el-button v-if="scope.row.status!='draft'" size="mini" @click="handleModifyStatus(scope.row,'draft')">{{$t('table.draft')}}
        </el-button>
        <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">{{$t('table.delete')}}
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
    <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="100px" style='width: 400px; margin-left:50px;'>
      <el-form-item :label="$t('table.order_no')" prop="order_no">
        <el-input v-model="temp.order_no"></el-input>
      </el-form-item>
      <el-form-item :label="$t('table.username')" prop="username">
        <el-input v-model="temp.username"></el-input>
      </el-form-item>
      <el-form-item :label="$t('table.price')">
        <el-input v-model="temp.price" placeholder="please enter the price"></el-input>
      </el-form-item>
      <el-form-item :label="$t('table.status')" prop="status">
        <el-select class="filter-item" v-model="temp.status" placeholder="Please pick a status">
          <el-option v-for="item in  statusOptions" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
      <el-button type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
    </div>
   </el-dialog>

</div>
</template>

<script>
import { fetchList,updateArticle } from '@/api/transaction'

export default {
  data() {
    return {
      list: null,
      temp: {
        order_no:+new Date(),
        //timestamp: +Mock.Random.date('T'),
        username:'',
        price:'',
        status:undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      statusOptions:['pendding','success'],
      rules: {
        order_no: [{ required: true, message: 'order_no is required', trigger: 'change' }],
        username: [{ required: true, message: 'username is required', trigger: 'change' }],
        price: [{ required: true, message: 'price is required', trigger: 'blur' }]
      },
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetchList().then(response => {
        this.list = response.data.items
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          //tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.order_no === this.temp.order_no) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
  }
}
</script>
