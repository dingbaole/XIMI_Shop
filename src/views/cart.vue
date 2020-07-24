<template>
  <div>
    <table border="0">
      <thead>
        <tr>
          <td>
            全选
            <input type="checkbox" @click="checkedAll" v-model="checked" />
          </td>
          <td>商品</td>
          <td>单价</td>
          <td>数量</td>
          <td>小计</td>
          <td>删除</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in list " :key="index">
          <td>
            <input type="checkbox" v-model="item.checked" />
          </td>
          <td>
            <img :src="`/img/${item.productImage}`" alt />
            <p>{{ item.productName }}</p>
          </td>
          <td>{{ item.salePrice }}</td>
          <td>
            <button @click="item.num++">+</button>
            <input type="text" v-model="item.num" />
            <button @click="item.num--">-</button>
          </td>
          <td>{{ item.salePrice*item.num }}</td>
          <td>
            <i class="el-icon-delete-solid" @click="remove(index)"></i>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="footer">
      <p>总价：{{ sum }}</p>
      <el-button type="primary" @click="$router.push('/')">返回继续购物</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    this.list = this.$store.state.list;
  },
  data() {
    return {
      list: [],
      checked: true,
    };
  },
  components: {},
  computed: {
    sum() {
      let content = 0;
      this.list.forEach((item) => {
        if (item.checked == true) {
          content += item.salePrice * item.num;
        }
      });
      return content;
    },
  },
  methods: {
    checkedAll() {
      let ceked = !this.checked;
      this.list.map((item) => {
        return (item.checked = ceked);
      });
      console.log(ceked);
    },
    remove(i) {
      this.list.splice(i, 1);
    },
  },
  watch: {
    list: {
      handler(newValue) {
          
        this.$store.commit("gx", newValue);

        var arr = newValue.filter((item) => {
          return item.checked == true;
        });
        if (arr.length == newValue.length) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      },
      deep: true,
    },
  },
};
</script>

<style scoped lang="scss">
table {
  width: 90%;
  margin: 10px auto;
  border-spacing: 0;
  border-collapse: collapse;
  tr {
    border-bottom: 1px solid #f0f0f0;
    text-align: center;
    img {
      width: 70px;
    }
  }
}
.footer {
  display: flex;
  justify-content: space-between;
  p {
    flex: 1;
    text-align: center;
  }
}
</style>
