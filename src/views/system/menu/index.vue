<template>
  <div class="app-container">
    菜单页
    <div class="roles">

    <!-- 添加角色按钮 -->
    <el-button type="primary" style="margin:10px 0" @click="adddialogFormVisible=true">添加角色</el-button>
    <!-- 表格 -->
    <el-table :data="roleList" style="width: 100%" border>
      <!-- type:expand:说明这一列后期可以展开 或  合并
      这列的template结构就是展开行的内容
      展开行可访问的属性与使用自定义列模板时的 Scoped slot 相同-->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- 准备进行嵌套循环生成展开行数据展示结构 -->
          <el-row
            v-for="first in scope.row.children"
            :key="first.id"
            style="margin-bottom:10px;border-bottom:1px dashed #ccc"
          >
            <el-col :span="4">
              <el-tag
                closable
                type="success"
                @close="delRightById(scope.row,first.id)"
              >{{first.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <el-row v-for="second in first.children" :key="second.id" style="margin-bottom:10px">
                <el-col :span="4">
                  <el-tag
                    closable
                    type="info"
                    @close="delRightById(scope.row,second.id)"
                  >{{second.authName}}</el-tag>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    closable
                    type="warning"
                    v-for="third in second.children"
                    :key="third.id"
                    style="margin:0px 10px 5px 0px"
                    @close="delRightById(scope.row,third.id)"
                  >{{third.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" v-show="scope.row.children.length == 0">没有任何的权限，请先分配！！</el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="roleDesc" label="描述"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="角色授权" placement="top">
            <el-button type="primary" icon="el-icon-d-caret" @click="showGrantDialog(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="primary" icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      adddialogFormVisible: false,
      addForm: {
        roleName: '',
        roleDesc: ''
      },
      roleId: '',
      grantdialogFormVisible: false,
      checkedArr: [],
      roleList: [],
      rightList: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  }
}
</script>