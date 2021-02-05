<template>
  <a-modal
    title="添加"
    ok-text="确定"
    cancel-text="取消"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <!-- <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
      <a-form-item label="Activity name" v-bind="validateInfos.name">
        <a-input v-model:value="info.name" />
      </a-form-item>
      <a-form-item label="Activity zone" v-bind="validateInfos.region">
        <a-select
          v-model:value="info.region"
          placeholder="please select your zone"
        >
          <a-select-option value="shanghai"> Zone one </a-select-option>
          <a-select-option value="beijing"> Zone two </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Activity type" v-bind="validateInfos.type">
        <a-checkbox-group v-model:value="info.type">
          <a-checkbox value="1" name="type"> Online </a-checkbox>
          <a-checkbox value="2" name="type"> Promotion </a-checkbox>
          <a-checkbox value="3" name="type"> Offline </a-checkbox>
        </a-checkbox-group>
      </a-form-item>
    </a-form> -->
  </a-modal>
</template>
<script>
import { defineComponent, toRefs, reactive, toRaw, toRef } from 'vue'
import { useForm } from '@ant-design-vue/use'
export default defineComponent({
  props: {
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
    console.log(props)
    const { info } = toRefs(props)
    console.log(info)
    const handleCancel = () => {
      context.emit('handleCancel')
    }
    // const { form } = toRef(modal)
    // console.log(form)
    // const modelRef = toRaw(modal).form
    // console.log(modelRef)
    const rulesRef = reactive({
      name: [
        {
          required: true,
          message: 'Please input name',
        },
      ],
      region: [
        {
          required: true,
          message: 'Please select region',
        },
      ],
      type: [
        {
          required: true,
          message: 'Please select type',
          type: 'array',
        },
      ],
    })
    // const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef)
    const handleOk = (e) => {
      e.preventDefault()
      // validate()
      //   .then(() => {
      //     console.log(toRaw(modelRef))
      //   })
      //   .catch(err => {
      //     console.log('error', err)
      //   })
      context.emit('handleOk', '哈哈哈')
    }
    return { handleOk, handleCancel, rulesRef }
  }
})
</script>