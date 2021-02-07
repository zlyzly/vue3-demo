<template>
  <a-modal
    :title="title"
    ok-text="确定"
    cancel-text="取消"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
      <a-form-item label="活动名称" v-bind="validateInfos.name">
        <a-input
          v-model:value="info.name"
          @blur="validate('name', { trigger: 'blur' }).catch(() => {})"
        />
      </a-form-item>
      <a-form-item label="地区" v-bind="validateInfos.region">
        <a-select
          v-model:value="info.region"
          placeholder="请选择地区"
        >
          <a-select-option value="shanghai">Zone one</a-select-option>
          <a-select-option value="beijing">Zone two</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="类型" v-bind="validateInfos.type">
        <a-checkbox-group v-model:value="info.type">
          <a-checkbox value="1" name="type">Online</a-checkbox>
          <a-checkbox value="2" name="type">Promotion</a-checkbox>
          <a-checkbox value="3" name="type">Offline</a-checkbox>
        </a-checkbox-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import { defineComponent, reactive, toRaw } from 'vue'
import { useForm } from '@ant-design-vue/use'
export default defineComponent({
  props: {
    title: {
      type: String,
      default: '添加'
    },
    visible: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => {
        return {
          name: '',
          region: undefined,
          type: []
        }
      }
    }
  },
  emits: ['handleOk', 'handleCancel'],
  setup(props, context) {
    console.log(props, props.info)
    const handleCancel = () => {
      context.emit('handleCancel')
    }
    const nameValidator = async (rule, value) => {
      // console.log(rule, value)
      if (value === '') return Promise.reject('请输入活动名称')
      if (value.length < 3 || value.length > 5) return Promise.reject('活动名称3~5个字符')
      else Promise.resolve()
    }
    const rulesRef = reactive({
      name: [{ validator: nameValidator, trigger: 'blur', required: true }],
      region: [{ required: true, message: '请选择地区' }],
      type: [{ required: true, message: '请选择类型', type: 'array' }]
    })
    const { resetFields, validate, validateInfos } = useForm(props.info, rulesRef)
    const handleOk = (e) => {
      e.preventDefault()
      validate()
        .then(() => {
          // console.log(toRaw(props.info))
          context.emit('handleOk', toRaw(props.info))
        })
        .catch(() => { return })
    }
    return { handleOk, handleCancel, rulesRef, validate, resetFields, validateInfos }
  }
})
</script>