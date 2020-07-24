<template>
  <div>
    <el-container class="box">
      <el-header height="110px">
        <p></p>
        <p>
          <span @click="sort">
            <i class="el-icon-d-caret" v-if="sortIndex==0"></i>
            <i class="el-icon-caret-bottom" v-if="sortIndex==1"></i>
            <i class="el-icon-caret-top" v-if="sortIndex==2"></i>
          </span>
        </p>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <ul>
            <li
              v-for="(item,index) in navlist"
              :key="index"
              :class="{li1:navIndex==index}"
              @click="navIndex = index"
            >{{ item }}</li>
          </ul>
        </el-aside>
        <el-main id="main">
          <div v-for="(item,index) in newlist" :key="index" class="item">
            <div>
              <img :src="`/img/${item.productImage}`" alt />
            </div>
            <div>
              <p>{{ item.productName }}</p>
              <p>￥{{ item.salePrice }}</p>
            </div>
            <div>
              <el-button type="success" plain>加入购物车</el-button>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    this.getlist();
    window.addEventListener("scroll", this.jiazaigengdo);
  },
  data() {
    return {
      navlist: ["all", "0-100", "100-500", "500-1000", "1000-2000"],
      navIndex: 0, //左侧点击效果
      list: [], //数据渲染
      sortIndex: 0,
      data: 2,
      jiazai: true
    };
  },
  components: {},
  computed: {
    newlist() {
      let newlist = this.list;

      newlist.sort((a, b) => {
        if (this.sortIndex == 1) {
          return a.salePrice - b.salePrice;
        } else if (this.sortIndex == 2) {
          return b.salePrice - a.salePrice;
        }
      });

      if (this.navIndex != 0) {
        let nav = this.navlist[this.navIndex];
        let max = nav.split("-")[1];
        let min = nav.split("-")[0];
        // console.log(min,max)
        newlist = this.list.filter(item => {
          return item.salePrice > min && item.salePrice < max;
        });
      }

      return newlist;
    }
  },
  methods: {
    getlist() {
      this.$axios({
        url: "/data.json"
      }).then(res => {
        console.log(res.data.result.list);
        this.list = res.data.result.list;
      });
    },
    jiazaigengdo() {
      if (this.data > 3 || this.jiazai == false) {
        return false;
      }

      this.jiazai = false;

      this.$axios({
        url: `/data${this.data}.json`
      }).then(res => {
        this.list.push(...res.data.result.list);
        this.data++;
        this.jiazai = true;
      });
    },
    sort() {
      if (this.sortIndex == 0 || this.sortIndex == 1) {
        this.sortIndex = 2;
      } else {
        this.sortIndex = 1;
      }
    }
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.box {
  background: #f0f0f0;
  padding: 10px;
  .el-header {
    height: 100px;
    padding: 0;
    margin-bottom: 10px;
    p {
      width: 100%;
      height: 50px;
      line-height: 50px;
      background: white;
    }
    p:nth-of-type(2) {
      margin-top: 10px;
      span {
        float: right;
        margin-right: 10px;
      }
    }
  }
}

.el-aside {
  li {
    height: 40px;
    line-height: 40px;
    text-indent: 10px;
  }
  .li1 {
    background: white;
    border-left: 2px solid red;
  }
}

@media screen and (max-width: 750px) {
  .el-aside {
    display: none;
  }
}

@media screen and (max-width: 960px) {
  #main {
    display: flex;
    flex-wrap: wrap;
    div {
      width: 48%;
      margin: 1%;
      background: white;
      text-align: center;
      padding: 5px;
      box-sizing: border-box;
      img {
        width: 100%;
      }
      p {
        line-height: 30px;
      }
      p:nth-of-type(2) {
        color: red;
      }
    }
    .item:hover {
      transform: scale(1.05);
      box-shadow: 0px -4px 9px 1px rgba($color: red, $alpha: 0.3);
    }
  }
}
@media screen and (min-width: 960px) {
  #main {
    display: flex;
    flex-wrap: wrap;
    > div {
      width: 23%;
      margin: 1%;
      background: white;
      text-align: center;
      padding: 5px;
      box-sizing: border-box;
      img {
        width: 100%;
      }
      p {
        line-height: 30px;
      }
      p:nth-of-type(2) {
        color: red;
      }
    }
    .item:hover {
      transform: scale(1.05);
      box-shadow: 0px -4px 9px 1px rgba($color: red, $alpha: 0.3);
    }
  }
}
@media screen and (max-width: 750px) {
  #main {
    display: flex;
    flex-wrap: wrap;
    > div {
      width: 98%;
      margin: 1%;
      background: white;
      text-align: center;
      padding: 5px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      div {
        width: 40%;
        img {
          width: 100%;
        }
        p {
          line-height: 30px;
        }
        p:nth-of-type(2) {
          color: red;
        }
      }
    }
    .item:hover {
      transform: scale(1.05);
      box-shadow: 0px -4px 9px 1px rgba($color: red, $alpha: 0.3);
    }
  }
}
</style>


