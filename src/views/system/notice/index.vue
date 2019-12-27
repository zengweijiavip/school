<template>
  <div class="app-container">
    notice
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { listNotice, getNotice, delNotice, addNotice, updateNotice, exportNotice } from '@/api/system/notice'
import Editor from '@/components/Editor'

export default {
  name: 'Notice',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Editor
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 公告表格数据
      noticeList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 类型数据字典
      statusOptions: [],
      // 状态数据字典
      typeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        noticeTitle: undefined,
        createBy: undefined,
        status: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        noticeTitle: [
          { required: true, message: '公告标题不能为空', trigger: 'blur' }
        ],
        noticeType: [
          { required: true, message: '公告类型不能为空', trigger: 'blur' }
        ]
      }
    }
  }

}
</script>
