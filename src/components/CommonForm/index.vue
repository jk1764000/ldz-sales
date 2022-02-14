<template>
  <div class="common-form">
    <el-form
      size="small"
      :labelWidth="labelWidth + 'px'"
      :inline="inline"
      ref="form"
      class="className"
      :model="data"
    >
      <el-row :gutter="10">
        <el-col
          :md="
            item.type === 'datetimerange' || item.type == 'daterange' ? 12 : 6
          "
          :lg="
            item.type === 'datetimerange' || item.type == 'daterange' ? 8 : 4
          "
          v-for="(item, index) in formConfig.formItemList"
          :key="index"
        >
          <el-form-item
            class="mt"
            :rules="item.rules"
            :prop="item.value"
            :label="item.label"
          >
            <!-- solt -->
            <template v-if="item.type === 'slot'">
              <slot :name="'form-' + item.value"> </slot>
            </template>
            <!-- 普通输入框 -->
            <el-input
              class="mt"
              v-if="
                item.type === 'input' ||
                item.type === 'number' ||
                item.type === 'password'
              "
              v-model="data[item.value]"
              :clearable="item.clearable"
              :type="item.type"
              :disabled="item.disabled"
              :placeholder="item.placeholder"
            />
            <!-- 文本输入框 -->
            <el-input
              class="mt"
              v-if="item.type === 'textarea'"
              v-model.trim="data[item.value]"
              :type="item.type"
              :clearable="item.clearable"
              :disabled="item.disabled"
              :placeholder="item.placeholder"
              :autosize="item.autosize"
            />
            <!-- 选择框 -->
            <el-select
              class="mt"
              style="width: 100%"
              v-if="item.type === 'select'"
              v-model="data[item.value]"
              :disabled="item.disabled"
              :clearable="item.clearable"
              :placeholder="item.placeholder"
            >
              <el-option
                v-for="(childItem, childIndex) in item.options"
                :key="childIndex"
                :label="childItem.label"
                :value="childItem.value"
              />
            </el-select>
            <!-- 日期选择框 -->
            <el-date-picker
              class="mt"
              style="width: 100%"
              v-if="item.type === 'datetimerange'"
              :picker-options="item.pickerOptions"
              :size="item.size"
              id="timees"
              v-model="data[item.value]"
              :type="item.type"
              :value-format="item.dateFormate"
              :start-placeholder="item.startPlaceholder || '选择开始时间'"
              :end-placeholder="item.endPlaceholder || '选择结束时间'"
            ></el-date-picker>
            <el-date-picker
              class="mt"
              style="width: 100%"
              v-if="item.type === 'daterange'"
              :size="item.size"
              :picker-options="item.pickerOptions"
              v-model="data[item.value]"
              :type="item.type"
              :value-format="item.dateFormate"
              :start-placeholder="item.startPlaceholder || '选择开始时间'"
              :end-placeholder="item.endPlaceholder || '选择结束时间'"
            ></el-date-picker>
            <el-date-picker
              class="mt"
              style="width: 100%"
              v-if="item.type === 'date'"
              :size="item.size"
              v-model="data[item.value]"
              :picker-options="item.pickerOptions"
              :type="item.type"
              :value-format="item.dateFormate"
              :placeholder="item.placeholder || '选择日期'"
            ></el-date-picker>
            <el-date-picker
              class="mt"
              style="width: 100%"
              v-if="item.type === 'datetime'"
              :size="item.size"
              :picker-options="item.pickerOptions"
              v-model="data[item.value]"
              :type="item.type"
              :value-format="item.dateFormate"
              :placeholder="item.placeholder || '选择日期'"
            ></el-date-picker>
            <el-date-picker
              class="mt"
              style="width: 100%"
              v-if="item.type === 'month'"
              :size="item.size"
              :picker-options="item.pickerOptions"
              v-model="data[item.value]"
              :type="item.type"
              :value-format="item.dateFormate"
              :placeholder="item.placeholder || '选择日期'"
            ></el-date-picker>
            <!-- <el-date-picker v-model="search.month" type="month" value-format="yyyy-MM" placeholder="结算月份">
      </el-date-picker> -->
            <el-button
              class="mt"
              v-if="item.type === 'button'"
              :type="item.value"
              :size="item.size"
              @click="item.handleClick"
              >{{ item.name }}</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
      <div>
        <el-form-item v-for="(item, index) in formConfig.operate" :key="index">
          <el-button
            class="mt"
            v-if="item.authBtn && item.type === 'button'"
            :type="item.value"
            :size="item.size"
            @click="item.handleClick"
            >{{ item.name }}</el-button
          >
          <template v-if="item.authBtn && item.type === 'slot'">
            <slot :name="'form-' + item.value"> </slot>
          </template>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    formConfig: {
      type: Object,
      default: () => {},
    },
    inline: {
      type: Boolean,
      default: false,
    },
    labelWidth: {
      type: Number,
      default: 100,
    },
  },
  created() {},
  methods: {
    search() {
      this.$emit("search", data);
    },
    clearInput() {
      this.$emit("clearInput");
    },
  },
};
</script>
<style lang="scss" scoped>
.common-form {
  max-width: 1280px;
  border: 1px solid #dcdfe6;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
}
.mt {
  margin-bottom: 10px;
}
</style>
<style>
.el-table thead {
  color: #666;
}
/* 去掉默认number上下箭头 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="‘number’"] {
  -moz-appearance: textfield;
}
</style>
