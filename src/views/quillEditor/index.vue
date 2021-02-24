
<template>
  <!-- 暂未适配vue3 报错Cannot read property '_c' of undefined-->
  暂未适配vue3 报错Cannot read property '_c' of undefined（待作者更新）
  <!-- <div class="edit_container">
    <quill-editor
      v-model="data.content"
      ref="myQuillEditor"
      :options="data.editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    >
    </quill-editor>
  </div> -->
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
// import { quillEditor } from "vue-quill-editor" //调用编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default defineComponent({
  components: {
    // quillEditor
  },
  setup() {
    const data: any = reactive({
      content: `<h2>I am Example</h2>`,
      editorOption: {
        placeholder: "请在这里输入",
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
            ['blockquote', 'code-block'],     //引用，代码块
            [{ 'header': 1 }, { 'header': 2 }],        // 标题，键值对的形式；1、2表示字体大小
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],     //列表
            [{ 'script': 'sub' }, { 'script': 'super' }],   // 上下标
            [{ 'indent': '-1' }, { 'indent': '+1' }],     // 缩进
            [{ 'direction': 'rtl' }],             // 文本方向
            [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],     //几级标题
            [{ 'color': [] }, { 'background': [] }],     // 字体颜色，字体背景颜色
            [{ 'font': [] }],     //字体
            [{ 'align': [] }],    //对齐方式
            ['clean'],    //清除字体样式
            ['image', 'video']    //上传图片、上传视频
          ]
        }
      }
    })
    const onEditorReady = (editor) => {
      console.log('准备编辑器', editor)
    }
    const onEditorFocus = () => {
      console.log('获得焦点事件')
    }
    const onEditorBlur = () => {
      console.log('失去焦点事件')
    }
    const onEditorChange = ((quill: any, html: any, text: any) => {
      console.log('内容改变事件')
    })
    return {
      data,
      onEditorReady,
      onEditorFocus,
      onEditorBlur,
      onEditorChange
    }
  }
})
</script>
<style lang="less" scoped>
</style>
