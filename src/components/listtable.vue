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
          <router-link to="/">หน้าหลัก</router-link>
        </li>
        <li class="selected">
          <i class="fa fa-list-alt" style="color:#ffffff;font-size:25px;"></i>
          <router-link to="/listtable">รายการอุปกรณ์</router-link>
        </li>
        <li>
          <i class="fa fa-clipboard" style="color:#ffffff;font-size:25px;"></i>
          <router-link to="/lendhistory">ประวัติการยืม</router-link>
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
                  <select class="selectBox" v-model="category">
                    <option disabled value="">ประเภท</option>
                    <option>สนับสนุน</option>
                    <option>วินิจฉัยและรักษา</option>
                    <option>รักษา</option>
                    <option>วินิจฉัย</option>
                    <option>ทั้งหมด</option>
                  </select>
                  <span></span>
                  <!-- ADD Device !-->
                  <button type="button" class="btn button-add btn btn-success" data-toggle="modal" data-target="#myModal"><b>+</b> เพิ่มรายการ</button>
                  <div class="modal fade" id="myModal" role="dialog">
                    <div class="modal-dialog">
                      <!-- Modal content-->
                      <div class="modal-content">
                        <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal">&times;</button>
                          <h4 class="modal-title">เพิ่มรายการใหม่</h4>
                        </div>
                        <div class="modal-body">
                          <input class="form-control" type="text" placeholder="ชื่ออุปกรณ์" v-model="nameEqm"/><br>
                          <input class="form-control" type="text" placeholder="จำนวน" v-model="amountEqm"/><br>
                          <select class="selectBox" v-model="unitEqm">
                            <option disabled value="">หน่วย</option>
                            <option>เครื่อง</option>
                            <option>ชุด</option>
                          </select>
                          <select class="selectBox" v-model="categoryEqm">
                            <option disabled value="">ประเภท</option>
                            <option>สนับสนุน</option>
                            <option>วินิจฉัยและรักษา</option>
                            <option>รักษา</option>
                            <option>วินิจฉัย</option>
                          </select>
                        </div>
                        <div class="modal-footer">
                          <button @click="submitEqm()" type="button" class="btn btn-default" data-dismiss="modal">ตกลง</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- ADD Device !-->

                </div>
              </h4>
              <p class="card-text">รวม : {{realtimeplus}} รายการ</p>
              <!--TABLE!-->
              <br>
              <table class="table table-hover table-striped">
                <thead>
                  <tr>
                    <th width="100px">#</th>
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
                  <tr v-if="category === ''" v-for="(equipment, key) of equipments" v-bind:key="equipment['.key']">
                      <td>#</td>
                      <td>{{equipment.nameEqm}}</td>
                      <td style="text-align: center;">{{equipment.amountEqm}}</td>
                      <td style="text-align: center;">{{equipment.borrowedEqm}}</td>
                      <td style="text-align: center; background: #9968db; color: #ffffff;">{{equipment.balanceEqm}}</td>
                      <td>{{equipment.unitEqm}}</td>
                      <td style="text-align: center;"><span class="glyphicon glyphicon-edit" style="color:#9968db;"></span></td>
                      <td style="text-align: center;"><span @click="removeEqm(equipment['.key'])" class="glyphicon glyphicon-trash" style="color:red;"></span></td>
                  </tr>
                  <tr v-if="equipment.categoryEqm == category" v-for="(equipment, key) of equipments" v-bind:key="equipment['.key']">
                      <td>#</td>
                      <td>{{equipment.nameEqm}}</td>
                      <td style="text-align: center;">{{equipment.amountEqm}}</td>
                      <td style="text-align: center;">{{equipment.borrowedEqm}}</td>
                      <td style="text-align: center; background: #9968db; color: #ffffff;">{{equipment.balanceEqm}}</td>
                      <td>{{equipment.unitEqm}}</td>
                      <td style="text-align: center;"><span class="glyphicon glyphicon-edit" style="color:#9968db;"></span></td>
                      <td style="text-align: center;"><span @click="removeEqm(equipment['.key'])" class="glyphicon glyphicon-trash" style="color:red;"></span></td>
                  </tr>
                  <tr v-if="category === 'ทั้งหมด'" v-for="(equipment, key) of equipments" v-bind:key="equipment['.key']">
                      <td>#</td>
                      <td>{{equipment.nameEqm}}</td>
                      <td style="text-align: center;">{{equipment.amountEqm}}</td>
                      <td style="text-align: center;">{{equipment.borrowedEqm}}</td>
                      <td style="text-align: center; background: #9968db; color: #ffffff;">{{equipment.balanceEqm}}</td>
                      <td>{{equipment.unitEqm}}</td>
                      <td style="text-align: center;"><span class="glyphicon glyphicon-edit" style="color:#9968db;"></span></td>
                      <td style="text-align: center;"><span @click="removeEqm(equipment['.key'])" class="glyphicon glyphicon-trash" style="color:red;"></span></td>
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
import {equipmentRef} from './firebase'

export default {
  name: 'listtable',
  data () {
    return {
      user: 'Admin',
      num: 0,
      num1: 1,
      num2: 2,
      category: '',
      unitEqm: '',
      categoryEqm: ''
    }
  },
  firebase: {
    equipments: equipmentRef
  },
  computed: {
    realtimeplus: function () {
      return this.countIndex++
    }
  },
  methods: {
    submitEqm () {
      equipmentRef.push({
        nameEqm: this.nameEqm,
        amountEqm: this.amountEqm,
        borrowedEqm: 0,
        balanceEqm: this.amountEqm,
        unitEqm: this.unitEqm,
        categoryEqm: this.categoryEqm,
        editEqm: false
      })
    },
    removeEqm (key) {
      equipmentRef.child(key).remove()
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

/*--------------------------------------- selectBox -------------------------------------*/
.selectBox {
  width: 150px;
  height: 34px;
  border-radius: 4px;
  font-size: 14px;
}
/*----------------------------------------------------------------------------------*/
</style>
