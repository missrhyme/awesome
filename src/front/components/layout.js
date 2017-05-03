import Vue from 'vue';

Vue.component('amz-layout', {
  template: `
    <div>
      <el-col :span="4">
        <el-menu theme="dark" default-active="2" class="el-menu-vertical-demo" style="height: 1000px">
          <div class="logo">
            <img
              src="./pic/logo.png"
              alt=""
            >
          </div>
          <el-menu-item index="1"><i class="el-icon-setting"></i><a href="/shopList">店铺管理</a></el-menu-item>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>跟卖信息</template>
              <el-menu-item index="2-1">商品列表</el-menu-item>
              <el-menu-item index="2-2">白名单管理</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-message"></i>信息通知</template>
              <el-menu-item index="3-1"><a href="/mailTemplate">邮件管理</a></el-menu-item>
              <el-menu-item index="3-2"><a href="/smsTemplate">短信管理</a></el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <el-menu default-active="1" class="nav" mode="horizontal">
          <el-submenu index="2" style="float:right">
            <template slot="title">missrhyme</template>
            <el-menu-item index="2-1">个人资料</el-menu-item>
            <el-menu-item index="2-2"><a href="/">退出</a></el-menu-item>
          </el-submenu>
          <el-menu-item index="1" style="float:right">帮助中心</el-menu-item>
        </el-menu>
        <slot>
          空
        </slot>
      </el-col>
    </div>
  `,
});
