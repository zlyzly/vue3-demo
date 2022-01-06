<template>
  <draggable
    :list="list"
    :disabled="!enabled"
    item-key="name"
    class="list-group img"
    ghost-class="ghost"
    :move="checkMove"
    @start="dragging = true"
    @end="dragging = false"
  >
    <template #item="{ element }">
      <div class="list-group-item" :class="{ 'not-draggable': !enabled }">
        {{ element.name }}
        <!-- <a-image :width="200" :src="element.name" /> -->
      </div>
    </template>
  </draggable>
  <a-list size="large" bordered :data-source="data">
    <draggable
      :list="data"
      :disabled="!enabled"
      item-key="name"
      class="list-group"
      ghost-class="ghost"
      :move="checkMove"
      @start="dragging = true"
      @end="dragging = false"
    >
      <template #item="{ element, index }">
        <div class="list-group-item" :class="{ 'not-draggable': !enabled }">
          <a-list-item>
            <a-row>
              <a-col :span="6">{{ element.name }}</a-col>
              <a-col :span="6">{{ element.age }}</a-col>
              <a-col :span="6">{{ element.address }}</a-col>
              <a-col :span="6"><MenuOutlined /></a-col>
            </a-row>
          </a-list-item>
          <a-list-item v-show="addFlg && addRow.length && index === data.length - 1">
            <a-form ref="formRef" layout="inline" :model="modelRef" :wrapper-col="{ span: 6 }">
              <a-row>
                <a-col :span="6">
                  <a-form-item name="price">
                    <a-input v-model:value="modelRef.price" placeholder="价格" @change="handleInput('price')" />
                  </a-form-item>
                </a-col>
                <a-col :span="6">
                  <p class="diamond">{{ modelRef.price * 6 }}</p>
                </a-col>
                <a-col :span="6">
                  <a-form-item name="price2">
                    <a-input v-model:value="modelRef.price2" placeholder="价格" @change="handleInput('price2')" />
                  </a-form-item>
                </a-col>
                <a-col :span="6"><a-button type="primary" size="small" @click="addConfig">保存</a-button></a-col>
              </a-row>
            </a-form>
          </a-list-item>
        </div>
      </template>
    </draggable>
    <template #header>
      <a-row>
        <a-col :span="6">名字</a-col>
        <a-col :span="6">年龄</a-col>
        <a-col :span="6">地址</a-col>
        <a-col :span="6">操作</a-col>
      </a-row>
    </template>
  </a-list>
  <a-button class="editable-add-btn" @click="handleAdd" style="margin-bottom: 8px">Add</a-button>

  <table class="table table-striped">
    <thead class="thead-dark">
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Name</th>
        <th scope="col">Sport</th>
      </tr>
    </thead>
    <draggable
      v-model="dataList"
      tag="tbody"
      item-key="id"
    >
      <template #item="{ element }">
        <tr>
          <td scope="row">{{ element.id }}</td>
          <td>{{ element.name }}</td>
          <td>{{ element.sport }}</td>
        </tr>
      </template>
    </draggable>
  </table>
  <a-button class="editable-add-btn" @click="handleAdds" style="margin-bottom: 8px">保存</a-button>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, computed, ref } from 'vue'
import draggable from 'vuedraggable'
import { MenuOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  // display: 'Transition',
  // order: 0,
  // display: 'Table',
  // order: 8,
  components: {
    draggable,
    MenuOutlined
  },
  setup() {
    const state = reactive({
      enabled: true,
      list: [
        { name: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', id: 1 },
        { name: 'https://cdn-image.onemicroworld.com/F50EA0DC-4115-C35B-C6B7-9DDB4C90DA7E?UCloudPublicKey=qgchM9CFzaKL9XWizIjY4EXmtmtDqPoFCr69qE5P&Signature=yssHGYUgfP5hmVokLMTb12T9O1A%3D&iopcmd=thumbnail&type=6&width=900&height=1000', id: 2 },
        { name: 'https://cdn-image.onemicroworld.com/26D8B6A0-C836-68E8-4E56-D4B9BC65331F?UCloudPublicKey=qgchM9CFzaKL9XWizIjY4EXmtmtDqPoFCr69qE5P&Signature=zsq7%2F4KhJSYRLw%2FiWdosrpKQ2R4%3D&iopcmd=thumbnail&type=6&width=900&height=1000', id: 3 }
      ],
      columns: [
        {
          title: '名字',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age'
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address'
        },
        {
          title: 'Action',
          key: 'action',
          slots: { customRender: 'action' }
        }
      ],
      data: [
        { name: '1111', age: 15, address: '哈哈哈哈哈1' },
        { name: '2222', age: 16, address: '哈哈哈哈哈2' },
        { name: '3333', age: 17, address: '哈哈哈哈哈3' }
      ],
      dataList: [
        { id: 1, name: 'Abby', sport: 'basket' },
        { id: 2, name: 'Brooke', sport: 'foot' },
        { id: 3, name: 'Courtenay', sport: 'volley' },
        { id: 4, name: 'David', sport: 'rugby' }
      ],
      addRow: [] as any,
      dragging: false,
      addFlg: false,
      isAdd: true
    })
    const formRef = ref()
    const modelRef = reactive({
      price: 0,
      price1: 0,
      price2: 0
    })
    const checkMove = (e: any) => {
      window.console.log('Future index: ' + e.draggedContext.futureIndex)
      console.log(state.data)
    }
    const count = computed(() => state.data.length + 1)
    const handleAdd = () => {
      if (!state.isAdd) return
      state.isAdd = false
      state.addFlg = true
      state.addRow.push(modelRef)
    }
    const addConfig = () => {
      state.isAdd = true
    }
    const handleAdds = () => {
      console.log('dataList', state.dataList)
    }
    return {
      ...toRefs(state),
      count,
      checkMove,
      handleAdd,
      formRef,
      modelRef,
      addConfig,
      handleAdds
    }
  }
})
</script>
<style lang="less" scoped>
.img .list-group-item {
  display: inline-block;
}

.ant-row, .ant-form {
  width: 100%;
}
.table {
  width: 100%;
  th {
    background: cornsilk;
  }
  tr {
    height: 36px;
    line-height: 36px;
    border-bottom: 1px solid #f0f0f0;
  }
}
</style>

