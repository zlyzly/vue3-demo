<template>
  <!-- 表单组件 -->
  <strong>form表单使用</strong>
  <div>
    <input v-model="message" placeholder="edit me" />
    <p>Message is: {{ message }}</p>
    <a-form
      layout="inline"
      :model="formInline"
      @submit="handleSubmit"
      @submit.prevent
    >
      <a-form-item>
        <a-input v-model:value="formInline.user" placeholder="Username">
          <template #prefix
            ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
          /></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-model:value="formInline.password"
          type="password"
          placeholder="Password"
        >
          <template #prefix
            ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
          /></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          :disabled="formInline.user === '' || formInline.password === ''"
        >
          Log in
        </a-button>
      </a-form-item>
    </a-form>

    <!-- <a-form
      name="custom-validation"
      ref="ruleForm"
      :model="forms"
      :rules="rules"
      v-bind="{
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      }"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
    >
      <a-form-item required has-feedback label="Password" name="pass">
        <a-input v-model:value="forms.pass" type="password" autocomplete="off" />
      </a-form-item>
      <a-form-item has-feedback label="Confirm" name="checkPass">
        <a-input v-model:value="forms.checkPass" type="password" autocomplete="off" />
      </a-form-item>
      <a-form-item has-feedback label="Age" name="age">
        <a-input-number v-model:value="forms.age" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" html-type="submit"> Submit </a-button>
        <a-button style="margin-left: 10px" @click="resetForm">
          Reset
        </a-button>
      </a-form-item>
    </a-form> -->

    <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="Activity name" v-bind="validateInfos.name">
        <a-input
          v-model:value="modelRef.name"
          @blur="validate('name', { trigger: 'blur' }).catch(() => {})"
        />
      </a-form-item>
      <a-form-item label="Activity zone" v-bind="validateInfos.region">
        <a-select
          v-model:value="modelRef.region"
          placeholder="please select your zone"
        >
          <a-select-option value="shanghai"> Zone one </a-select-option>
          <a-select-option value="beijing"> Zone two </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Activity type" v-bind="validateInfos.type">
        <a-checkbox-group v-model:value="modelRef.type">
          <a-checkbox value="1" name="type"> Online </a-checkbox>
          <a-checkbox value="2" name="type"> Promotion </a-checkbox>
          <a-checkbox value="3" name="type"> Offline </a-checkbox>
        </a-checkbox-group>
      </a-form-item>
      <a-form-item label="Activity type" v-bind="validateInfos.date">
        <a-range-picker v-model:value="modelRef.date" @change="onChange" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit"> Create </a-button>
        <a-button style="margin-left: 10px" @click="resetFields">
          Reset
        </a-button>
      </a-form-item>
    </a-form>

    <div>
      <table-list />
    </div>
  </div>
</template>

<script lang="ts">
// onBeforeUpdate
import { defineComponent, ref, reactive, toRaw } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { useForm } from '@ant-design-vue/use'
import TableList from '../components/TableList/index.vue'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
    TableList
  },
  setup() {
    interface Model {
      user: string;
      password: string;
    }
    interface Form {
      pass: string;
      checkPass: string;
      age: number;
    }
    interface Rules {
      pass: Array<object>;
      checkPass: Array<object>;
      age: Array<object>;
    }
    interface ModelRef {
      name: string;
      region: undefined;
      type: Array<string>;
      date: Array<string>;
    }
    interface RulesRef {
      name: Array<object>;
      region: Array<object>;
      type: Array<object>;
      date: Array<object>;
    }
    const message = ref('')
    const formInline: Model = reactive({
      user: '',
      password: '',
    })
    const handleSubmit = ((e: object) => {
      console.log(e)
      // console.log(formInline)
    })

    // let forms: Form = reactive({
    //   pass: '',
    //   checkPass: '',
    //   age: 1,
    // })
    // const checkAge = async (rule: object, value: number) => {
    //   if (!value) {
    //     return Promise.reject('age必填')
    //   }
    //   if (!Number.isInteger(value)) {
    //     return Promise.reject('请输入数字')
    //   } else {
    //     if (value < 18) {
    //       return Promise.reject('年龄必须大于18岁')
    //     } else {
    //       return Promise.resolve()
    //     }
    //   }
    // }
    // const validatePass = async (rule: object, value: string) => {
    //   if (value === '') {
    //     return Promise.reject('请输入密码')
    //   } else {
    //     if (forms.checkPass !== '') {
    //       // this.$refs.ruleForm.validateField('checkPass')
    //     }
    //     return Promise.resolve()
    //   }
    // }
    // const validatePass2 = async (rule: object, value: string) => {
    //   if (value === '') {
    //     return Promise.reject('请重新输入密码')
    //   } else if (value !== forms.pass) {
    //     return Promise.reject("两个输入不匹配!")
    //   } else {
    //     return Promise.resolve()
    //   }
    // }
    // const ruleForm: Rules = reactive({
    //   pass: [{ validator: validatePass, trigger: 'change' }],
    //   checkPass: [{ validator: validatePass2, trigger: 'change' }],
    //   age: [{ validator: checkAge, trigger: 'blur' }],
    // })
    // const handleFinish = (values: string) => {
    //   console.log(values)
    // }
    // const handleFinishFailed = (errors: object) => {
    //   console.log(errors)
    // }
    // const resetForm = () => {
    //   // 确保在每次更新之前重置ref
    //   onBeforeUpdate(() => {
    //     forms = {
    //       pass: '',
    //       checkPass: '',
    //       age: 1,
    //     }
    //   })
    // }

    const nameValidator = async (rule: object, value: string) => {
      // console.log(rule, value, callback)
      if (value === '') return Promise.reject('Please input Activity name')
      if (value.length < 3 || value.length > 5) return Promise.reject('Length should be 3 to 5')
      else Promise.resolve()
    }
    const modelRef: ModelRef = reactive({
      name: '',
      region: undefined,
      type: [],
      date: []
    })
    const rulesRef: RulesRef = reactive({
      name: [
        // {
        //   required: true,
        //   message: 'Please input Activity name',
        // },
        // {
        //   min: 3,
        //   max: 5,
        //   message: 'Length should be 3 to 5',
        //   trigger: 'blur',
        // }
        {
          validator: nameValidator, trigger: 'blur', required: true
        }
      ],
      region: [
        {
          required: true,
          message: 'Please select region',
        }
      ],
      type: [
        {
          required: true,
          message: 'Please select type',
          type: 'array',
        }
      ],
      date: [
        {
          required: true,
          message: 'Please select date',
          type: 'array',
        }
      ]
    })
    const onChange = (date: object, dateString: Array<string>) => {
      console.log('error', date, dateString)
    }
    const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef)
    const onSubmit = (e: any) => {
      e.preventDefault()
      validate()
        .then(() => {
          console.log('modelRef', modelRef, toRaw(modelRef))
        })
        .catch((err: object) => {
          console.log('error', err)
        })
    }
    return {
      message,
      formInline,
      handleSubmit,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      validate,
      validateInfos,
      resetFields,
      modelRef,
      onSubmit,
      onChange
      // forms,
      // ruleForm,
      // checkAge,
      // validatePass2,
      // validatePass,
      // handleFinish,
      // handleFinishFailed,
      // resetForm,
    }
  }
})
</script>
