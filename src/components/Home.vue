<template>
  <div>
    <div class="nav-header">
      <ul>
        <li class="topic">
          <p>รายการอุปกรณ์</p>
        </li>
        <li class="user-login">
          <p>Login : {{user}}</p>
        </li>
      </ul>
    </div>

    <nav>
      <p class="navbar-brand">UI SERVICE CARE</p>
      <br><br><br><br><br>
      <ul>
        <li>
          <i class="fa fa-pie-chart" style="color:#ffffff;font-size:25px;"></i>
          <a href="#">หน้าหลัก</a>
        </li>
        <li  class="selected">
          <i class="fa fa-list-alt" style="color:#ffffff;font-size:25px;"></i>
          <a href="#">รายการอุปกรณ์</a>
        </li>
        <li>
          <i class="fa fa-clipboard" style="color:#ffffff;font-size:25px;"></i>
          <a href="#">ประวัติการยืม</a>
        </li>
        <li>
          <i class="fa fa-check-square-o" style="color:#ffffff;font-size:25px;"></i>
          <a href="#">รายการรออนุมัติ</a>
        </li>
        <li>
          <i class="material-icons" style="color:#ffffff;font-size:25px;">pin_drop</i>
          <a href="#">Locations</a>
        </li>
        <li>
          <i class="fa fa-bar-chart" style="color:#ffffff;font-size:25px;"></i>
          <a href="#">สถิติ</a>
        </li>
        <li>
          <i class="fa fa-bell-o" style="color:#ffffff;font-size:25px;"></i>
          <a href="#">การแจ้งเตือน</a>
        </li>
        <li class="active-loguot">
          <i class="glyphicon glyphicon-off" style="color:red;font-size:25px;"></i>
          <a href="#">ออกจากระบบ</a>
        </li>
      </ul>
    </nav>

    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md">
          <div class="card">
            <div class="card-block">
              <h4 class="card-title">
                แสดงรายการเครื่องมือที่เปิดให้ยืม
                <div class="button-add">
                  <select v-model="category" class="selectpicker">
                    <option disabled value="">ประเภท</option>
                    <option>สนับสนุน</option>
                    <option>วินิจฉัยและรักษา</option>
                    <option>รักษา</option>
                    <option>วินิจฉัย</option>
                  </select>
                  <button class="button-add btn btn-success"><b>+</b> เพิ่มรายการ</button>
                </div>

              </h4>
              <p class="card-text">รวม : {{num}} รายการ</p>
              <!--TABLE!-->
              <br>
              <table class="table table-hover table-striped">
                <thead>
                  <tr>
                    <th width="100px">ลำดับ</th>
                    <th width="800px">ชื่ออุปกรณ์</th>
                    <th width="118px" style="text-align: center;">จำนวน</th>
                    <th width="118px" style="text-align: center;">ถูกยืม</th>
                    <th width="118px" style="text-align: center; background: #9968db; color: #ffffff;">คงเหลือ</th>
                    <th width="100px">หน่วย</th>
                    <th width="80px" style="text-align: center;">แก้ไข</th>
                    <th width="80px" style="text-align: center;">ลบ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#</td>
                    <td>#</td>
                    <td style="text-align: center;">#</td>
                    <td style="text-align: center;">#</td>
                    <td style="text-align: center; background: #9968db; color: #ffffff;">#</td>
                    <td>#</td>
                    <td style="text-align: center;"><span class="glyphicon glyphicon-edit" style="color:#9968db;"></span></td>
                    <td style="text-align: center;"><span class="glyphicon glyphicon-trash" style="color:red;"></span></td>
                  </tr>
                </tbody>
              </table>
              <!--TABLE!-->
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      user: 'Admin',
      num: 0,
      category: ''
    }
  }
}
</script>

<style scoped>
/*--------------------------------------- CONTENT ----------------------------------*/
.card {
  padding: .75rem 1.25rem;
  margin-bottom: 0;
  background-color: #ffffff;
  border-bottom: 1px solid rgba(0,0,0,.125);
  border-radius: 4px;
  width: 82%;
  margin-left: 35px;
  border: 1px solid #dddddd;
}

.button-add {
  float: right;
  margin-left: 10px;
}

.content {
  background: #f6f7fb;
  margin-top: 60px;
  margin-left: 275px;
  width: 100%;
  padding: 20px 0px;
}
/*----------------------------------------------------------------------------------*/

/*------------------------------------- HEADER -------------------------------------*/
.nav-header {
  height: 60px;
  width: 100%;
  background: #ffffff;
  padding-left: 20px;
  display: inline-block;
  line-height: 60px;
  border: 1px solid #dddddd;
  bottom: 0;
  position: fixed;
  top: 0;
}

.nav-header ul li p {
  font-family: arial, sans-serif;
  font-weight: 400;
  font-size: 20px;
}

.nav-header ul li {
  display: inline-block;
}
.nav-header ul .user-login {
  float: right;
  padding-right: 10px;
  color: #9A9A9A;
}

.nav-header ul .topic {
  padding-left: 270px;
  float: left;
  color: #9A9A9A;
}

.nav-header ul .user-login p {
  font-size: 16px;
}

.nav-header ul .topic p {
  font-size: 20px;
  color: #2c3e50;
}

.navbar-brand {
  color: #FFFFFF;
  line-height: 30px;
  padding-left: 50px;
  border-bottom: 1px solid #525d63;
  width: 100%;
  height: auto;
}
/*----------------------------------------------------------------------------------*/

/*--------------------------------------- MENU -------------------------------------*/
nav {
  width: 275px;
  background: #273238;
  position: fixed;
  z-index: 1000;
  top: 0;
  bottom: 0;
}

nav a {
  text-decoration: none;
  color:  #ffffff;
  padding: 20px;
  padding-right: 100px;
}

nav ul li {
  list-style-type: none;
  display: block;
  margin-left: 10px;
  padding: 15px;
  width: 253px;
  border-radius: 4px;
}

.active-loguot {
  position: absolute;
  margin-left: 10px;
  width: 253px;
  bottom: 20px;
  background: rgba(255, 255, 255, 0.14);
  opacity: 1;
  color: #FFFFFF;
  border-radius: 4px;
}

nav ul li:hover {
  background: #434d52;
  transition: linear all 0.30s;
}

nav ul li a:hover {
  margin-left: 10px;
  transition: linear all 0.50s;
}

.selected {
  background: #596166;

}
/*----------------------------------------------------------------------------------*/
</style>
