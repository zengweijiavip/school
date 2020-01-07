<template>
  <div class="app-container">
    ComplexTable
    <el-checkbox-group v-model="checkList" @change="handleChange">
      <el-checkbox label="复选框 A" />
      <el-checkbox style="display: block" label="复选框 B" />
      <el-checkbox label="复选框 C" />
      <el-checkbox style="display: block; zoom: 60%" label="禁用" disabled />
      <el-checkbox label="选中且禁用" />
    </el-checkbox-group>

    <el-select v-model="value" multiple placeholder="请选择">
      <el-option label="选项1" value="选项1">
        <!-- <el-checkbox label="复选框 1"/> -->
      </el-option>
      <el-option value="选项2">
        <el-checkbox label="复选框 2"/>
      </el-option>
      <el-option label="选项3" value="选项3">
        <el-checkbox label="复选框 3"/>
      </el-option>
      <el-option label="选项4" value="选项4">
        <el-checkbox label="复选框 4"/>
      </el-option>
    </el-select>
  </div>
</template>

<script>
import waves from "@/directive/waves"; // waves directive
// eslint-disable-next-line no-unused-vars
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: "CN", display_name: "China" },
  { key: "US", display_name: "USA" },
  { key: "JP", display_name: "Japan" },
  { key: "EU", display_name: "Eurozone" }
];

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name;
  return acc;
}, {});

export default {
  name: "ComplexTable",
  // eslint-disable-next-line vue/no-unused-components
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type];
    }
  },
  data() {
    return {
      checkList: ["选中且禁用", "复选框 A", "复选框 C"],
      value: []
    };
  },
  methods: {
    handleChange(e) {
      console.log("click", e);
    }
  }
};
</script>
