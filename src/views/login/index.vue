<template>
  <div class="login_box">
    <h3 class="login_title">登录</h3>
    <a-form
      name="custom-validation"
      v-bind="{ labelCol: { span: 6 }, wrapperCol: { span: 14 } }"
    >
      <a-form-item required label="账号" v-bind="validateInfos.account">
        <a-input v-model:value="form.account" type="text" autocomplete="off" />
      </a-form-item>
      <a-form-item required label="密码" v-bind="validateInfos.password">
        <a-input
          v-model:value="form.password"
          type="password"
          autocomplete="off"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" html-type="submit" @click="onSubmit">
          Login
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useForm } from '@ant-design-vue/use'
import { setAdminName } from '../../utils/auth'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
export default defineComponent({
  name: 'Login',
  components: {},
  // watch: {
  //   $route: {
  //     handler: function(route) {
  //       const redirect = ref('')
  //       redirect.value = route.query && route.query.redirect
  //       console.log(redirect)
  //     },
  //     immediate: true
  //   }
  // },
  setup() {
    interface ModelRef {
      account: string;
      password: string;
    }
    interface RulesRef {
      account: object[];
      password: object[];
    }
    const form: ModelRef = reactive({
      account: '',
      password: ''
    })
    const validatePass = async (rule: object, value: string) => {
      // console.log(rule)
      if (value === '') {
        return Promise.reject('密码必填')
      } else {
        if (form.password !== '') {
          return Promise.resolve()
        }
        return Promise.resolve()
      }
    }
    const validateAccount = async (rule: object, value: string) => {
      if (value === '') {
        return Promise.reject('账号必填')
      } else {
        if (form.account !== '') {
          return Promise.resolve()
        }
        return Promise.resolve()
      }
    }

    const rules: RulesRef = reactive({
      account: [{ validator: validateAccount, trigger: 'blur' }],
      password: [{ validator: validatePass, trigger: 'blur' }]
    })
    const { validateInfos, validate } = useForm(form, rules)
    const store = useStore()
    const router = useRouter()
    // const route = useRoute()
    // const path = ref('')
    // path.value = route.query && route.query.redirect
    // console.log('login', path, store, route)
    const onSubmit = () => {
      validate().then(() => {
        store.dispatch('user/login', form).then(() => {
          router.push({ path: '/' })
          setAdminName(form.account.trim())
          // this.loading = false
        }).catch((error: any) => {
          // this.loading = false
          if (error.status !== 500) {
            let msg = '请检查输入的信息'
            if (error.status !== 400) 
            msg = '非管理员账号！'
            message.error(msg)
          }
        })
      })
        .catch((err: object) => {
          console.log('error', err)
        })
    }
    return { form, rules, onSubmit, validateInfos }
  }
})
</script>
<style lang="scss" scoped>
.login_box {
  width: 500px;
  height: 360px;
  border: lightblue 1px solid;
  box-shadow: 1px 5px 5px 5px rgba(196, 231, 243, 1);
  position: absolute;
  top: calc(50% - 250px);
  left: calc(50% - 180px);
  padding: 40px 20px 20px;
  text-align: center;
}
.login_title {
  font-size: 20px;
  font-weight: bold;
  color: cornflowerblue;
}
</style>
