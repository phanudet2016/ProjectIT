<template>
  <div>
    <div class="nav-header">
      <ul>
        <li class="topic">
          <p style="font-size:25px"><b>รายการอุปกรณ์</b></p>
        </li>
        <li class="user-login">
          <p style="font-size:25px"><a><span class="glyphicon glyphicon-log-in" style="padding-right:10px;color:#9A9A9A;font-size:15px" @click="submitLogout()" v-bind:title="msgLogout"></span></a>{{firstname}} {{lastname}}</p>
        </li>
      </ul>
    </div>

    <nav>
      <img src="../assets/196127.png" style="margin-top:22px;margin-left:20px;width:40%;">
      <p class="navbar-brand">ระบบจัดการ<br>อุปกรณ์ทางการแพทย์</p>
      <br><br><br><br><br>
      <ul>
        <li>
          <i class="fa fa-pie-chart" style="color:#ffffff;font-size:25px;"></i>
          <router-link to="/home">หน้าหลัก</router-link>
        </li>
        <li class="selected">
          <i class="fa fa-list-alt" style="color:#ffffff;font-size:25px;"></i>
          <router-link to="/listtable">รายการอุปกรณ์</router-link>
        </li>
        <li>
          <i class="fa fa-check-square-o" style="color:#ffffff;font-size:25px;"></i>
          <router-link to="/approve">รายการรออนุมัติ</router-link>
        </li>
        <li>
          <i class="fa fa-clipboard" style="color:#ffffff;font-size:25px;"></i>
          <router-link to="/lendhistory">ประวัติการยืม</router-link>
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
          <a href="#" @click="submitLogout()">ออกจากระบบ</a>
        </li>
      </ul>
    </nav>

    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md">
            <router-link to="/listtable">
              <button style="margin-left:62px;background:#ffffff;border:1px solid #dddddd;height:40px;width:140px;color:#000000;font-size:16px">
                <span class="glyphicon glyphicon-menu-hamburger"></span>
                <b>รายการอุปกรณ์</b>
              </button>
            </router-link>
            <router-link to="/addlist">
              <button style="margin-left:2px;background:#ffffff;border:1px solid #dddddd;height:40px;width:130px;background:#E0E0E0;color:#000000;font-size:16px">
                <span class="glyphicon glyphicon-plus-sign"></span>
                <b>เพิ่มรายการ</b>
              </button>
            </router-link>
          <div class="card">
            <div class="card-block">
              <h4 class="card-title">
                รายการอุปกรณ์ที่เปิดให้ยืม
                <div class="button-add">
                  <input type="text" v-model="search" placeholder="ค้นหา..." v-on:keypress="" style="" class="searchEqm">
                  <select class="selectBox" v-model="category" style="font-size:20px">
                    <option disabled value="">ประเภท</option>
                    <option>สนับสนุน</option>
                    <option>วินิจฉัยและรักษา</option>
                    <option>รักษา</option>
                    <option>วินิจฉัย</option>
                    <option>ทั้งหมด</option>
                  </select>
                  <select class="selectBox" v-model="ห" style="font-size:20px">
                    <option disabled value="">รายการทั้งหมด</option>
                    <option>รายการที่เปิดให้ยืม</option>
                    <option>รายการที่ไม่ได้เปิดให้ยืม</option>
                  </select>
                  <span></span>
                  
                  <!-- ADD Device !-->
                  <!--<button type="button" class="btn button-add btn btn-success" data-toggle="modal" data-target="#myModal">
                    <span class="glyphicon glyphicon-plus-sign"></span>
                    เพิ่มรายการใหม่
                  </button>
                  <div class="modal fade" id="myModal" role="dialog">
                    <div class="modal-dialog">
                      
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
                  !-->
                  <!-- ADD Device !-->
                </div>
              </h4>
              <br><br>
             <!-- <p class="card-text">รวม : {{realtimeplus}} รายการ</p> !-->
              <!--TABLE!-->
              <br>
     
              <table class="table table-hover table-striped">
                <thead>
                  <tr>
                    <th width="700px">ชื่ออุปกรณ์</th>
                    <th width="118px" style="text-align: center;">จำนวน</th>
                    <th width="118px" style="text-align: center;">ถูกยืม</th>
                    <th width="118px" style="text-align: center; background: #9968db; color: #ffffff;">คงเหลือ</th>
                    <th width="100px">หน่วย</th>
                    <th width="100px">ราคา (ต่อหน่วย)</th>
                    <th width="80px" style="text-align: center;">แก้ไข</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="category === '' && equipment.statusLend === 'ON'" v-for="(equipment, key) of searchEqm" v-bind:key="equipment['.key']">
                      <td><router-link :to="'/eqmtable/' + equipment['.key']">{{equipment.nameEqm}}</router-link></td>
                      <td style="text-align: center;">{{equipment.amountEqm}}</td>
                      <td style="text-align: center;">{{equipment.borrowedEqm}}</td>
                      <td style="text-align: center; background: #9968db; color: #ffffff;">{{equipment.balanceEqm}}</td>
                      <td>{{equipment.unitEqm}}</td>
                      <td style="text-align: center;">{{equipment.priceUnit}}</td>
                      <td style="text-align: center;"><span class="glyphicon glyphicon-edit" style="color:#9968db;" data-toggle="modal" data-target="#myModall" @click="editEqm(equipment['.key'])"></span></td>
                  </tr>
                  <tr v-if="equipment.categoryEqm == category && equipment.statusLend === 'ON'" v-for="(equipment, key) of searchEqm" v-bind:key="equipment['.key']">
                      <td><router-link :to="'/eqmtable/' + equipment['.key']">{{equipment.nameEqm}}</router-link></td>
                      <td style="text-align: center;">{{equipment.amountEqm}}</td>
                      <td style="text-align: center;">{{equipment.borrowedEqm}}</td>
                      <td style="text-align: center; background: #9968db; color: #ffffff;">{{equipment.balanceEqm}}</td>
                      <td>{{equipment.unitEqm}}</td>
                      <td style="text-align: center;">{{equipment.priceUnit}}</td>
                      <td style="text-align: center;"><span class="glyphicon glyphicon-edit" style="color:#9968db;" data-toggle="modal" data-target="#myModall" @click="editEqm(equipment['.key'])"></span></td>
                  </tr>
                  <tr v-if="category === 'ทั้งหมด' && equipment.statusLend === 'ON'" v-for="(equipment, key) of searchEqm" v-bind:key="equipment['.key']">
                      <td><router-link :to="'/eqmtable/' + equipment['.key']">{{equipment.nameEqm}}</router-link></td>
                      <td style="text-align: center;">{{equipment.amountEqm}}</td>
                      <td style="text-align: center;">{{equipment.borrowedEqm}}</td>
                      <td style="text-align: center; background: #9968db; color: #ffffff;">{{equipment.balanceEqm}}</td>
                      <td>{{equipment.unitEqm}}</td>
                      <td style="text-align: center;">{{equipment.priceUnit}}</td>
                      <td style="text-align: center;"><span class="glyphicon glyphicon-edit" style="color:#9968db;" data-toggle="modal" data-target="#myModall" @click="editEqm(equipment['.key'])"></span></td>
                  </tr>
                </tbody>
              </table>
     
              <!--TABLE!-->
              <!-- Edit Device !-->
              <div class="modal fade" id="myModall" role="dialog">
                <div class="modal-dialog">
                  <!-- Modal content-->
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      <h4 class="modal-title" style="font-size:25px"><b>แก้ไขข้อมูล</b></h4>
                    </div>
                    <div class="modal-body">
                      <input class="form-control" type="text" placeholder="ชื่ออุปกรณ์" style="font-size:20px" v-model="editName"/><br>
                      <select class="selectBox" v-model="editUnitEqm" style="font-size:16px">
                        <option disabled value="">หน่วย</option>
                        <option>เครื่อง</option>
                        <option>ชุด</option>
                      </select>
                      <!--<select class="selectBox" v-model="editCategory" style="font-size:16px">
                        <option disabled value="">ประเภท</option>
                        <option>สนับสนุน</option>
                        <option>วินิจฉัยและรักษา</option>
                        <option>รักษา</option>
                        <option>วินิจฉัย</option>
                      </select>-->
                      <br><br>
                      <input type="number" placeholder=" เพิ่มจำนวน" v-model="addAmount" style="width:100px;height:36px;border-radius:4px;border:solid 1px #dddddd;font-size:20px;" v-if="check">
                    </div>
                    <div class="modal-footer">   
                      <button @click="editAmount()" type="button" class="btn btn-default" style="width:100px;font-size:16px">{{btnAddAmount}}</button>                  
                      <button @click="submitEditEqm()" type="button" class="btn btn-default" data-dismiss="modal" style="width:100px;font-size:16px">ตกลง</button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Edit Device !-->
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {equipmentRef, auth, userRef} from './firebase'

export default {
  name: 'listtable',
  data () {
    return {
      id: '',
      name: '',
      category: '',
      amountEqm: '',
      count: '',
      nameEqm: '',
      unitEqm: '',
      categoryEqm: '',
      firstname: '',
      lastname: '',
      msgLogout: 'ออกจากระบบ',
      editName: '',
      editCategory: '',
      editID: '',
      key: '',
      params: 'sss',
      editUnitEqm: '',
      check: '',
      btnAddAmount: 'เพิ่มจำนวน',
      addAmount: '',
      idDecive: '',
      search: ''
    }
  },
  created () {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.firstname = this.users.find(users => users.email === user.email).firstname
        this.lastname = this.users.find(users => users.email === user.email).lastname
      } else {
        console.log('not logged in')
      }
    })
  },
  firebase: {
    equipments: equipmentRef,
    users: userRef
  },
  methods: {
    subm1itEqm () {
      var s
      var id = []
      if (this.categoryEqm === 'สนับสนุน') {
        s = 'Sup'
      } else if (this.categoryEqm === 'วินิจฉัยและรักษา') {
        s = 'DxRx'
      } else if (this.categoryEqm === 'รักษา') {
        s = 'Rx'
      } else if (this.categoryEqm === 'วินิจฉัย') {
        s = 'Dx'
      }
      this.count = this.amountEqm * 1 + 1
      for (var i = 1; i < this.count; i++) {
        var insertID = {
          id: s + i,
          number: i,
          lastnameLend: '',
          nameLend: '',
          status: ''
        }
        id.push(insertID)
      }

      equipmentRef.push({
        nameEqm: this.nameEqm,
        amountEqm: this.amountEqm,
        borrowedEqm: 0,
        balanceEqm: this.amountEqm,
        unitEqm: this.unitEqm,
        categoryEqm: this.categoryEqm,
        editEqm: false,
        equipmentID: id,
        editAmountEqm: '',
        editBalanceEqm: ''
      })
    },
    editEqm (key) {
      this.editName = this.equipments.find(equipments => equipments['.key'] === key).nameEqm
      this.editID = this.equipments.find(equipments => equipments['.key'] === key).equipmentID
      this.editAmountEqm = this.equipments.find(equipments => equipments['.key'] === key).amountEqm
      this.editBalanceEqm = this.equipments.find(equipments => equipments['.key'] === key).balanceEqm
      this.key = key
      console.log(this.editID.length)
      this.check = ''
      this.btnAddAmount = 'เพิ่มจำนวน'
      this.editCategory = ''
      this.editUnitEqm = ''
      this.addAmount = ''
    },
    submitEditEqm () {
      this.count = this.addAmount * 1 + 1
      this.num = this.editID.length + 1
      this.idDecive = this.editID.length + 1
      for (var i = 1; i < this.count; i++) {
        var insertID = {
          id: 'RX' + this.idDecive++,
          number: this.num++,
          lastnameLend: '',
          nameLend: '',
          status: 'พร้อมใช้งาน'
        }
        this.editID.push(insertID)
      }
      this.editAmountEqm = this.editAmountEqm * 1 + this.addAmount * 1
      this.editBalanceEqm = this.editBalanceEqm * 1 + this.addAmount * 1
      if (this.editUnitEqm !== '') {
        equipmentRef.child(this.key).update({
          nameEqm: this.editName,
          unitEqm: this.editUnitEqm,
          equipmentID: this.editID,
          amountEqm: this.editAmountEqm,
          balanceEqm: this.editBalanceEqm
        })
      }
      equipmentRef.child(this.key).update({
        equipmentID: this.editID,
        amountEqm: this.editAmountEqm,
        balanceEqm: this.editBalanceEqm
      })
    },
    removeEqm (key) {
      equipmentRef.child(key).remove()
    },
    submitLogout () {
      auth.signOut()
      this.$router.push('/')
    },
    editAmount () {
      if (this.btnAddAmount === 'เพิ่มจำนวน') {
        this.check = true
        this.btnAddAmount = 'ยกเลิก'
      } else if (this.btnAddAmount === 'ยกเลิก') {
        this.check = false
        this.btnAddAmount = 'เพิ่มจำนวน'
        this.addAmount = ''
      }
    }
  },
  computed: {
    searchEqm () {
      return this.equipments.filter((equipments) => {
        return equipments.nameEqm.indexOf(this.search) > -1
      })
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
  margin-left: 48px;
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
  padding-left: 301px;
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
  padding-left: 147px;
  /*border-bottom: 1px solid #525d63;*/
  width: 100%;
  height: auto;
  font-weight: bold;
  font-size: 20px;
  margin-top: -108px;
}
/*----------------------------------------------------------------------------------*/

/*--------------------------------------- MENU -------------------------------------*/
nav {
  width: 301px;
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
  margin-left: 6px;
  padding: 15px;
  width: 289px;
  border-radius: 4px;
  font-size: 20px;
}
 
nav ul {
  margin-top: -50px;
}

.active-loguot {
  position: absolute;
  margin-left: 6px;
  width: 289px;
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
td {
  font-size: 20px;
}
th {
  font-size: 20px;
}
.searchEqm {
    width: 150px;
    box-sizing: border-box;
    border: 1px solid rgb(169, 169, 169);
    border-radius: 4px;
    font-size: 20px;
    background-color: white;
    background-image: url('../assets/searchicon.png');
    background-size: 17px 17px;
    background-position: 8px 8px; 
    background-repeat: no-repeat;
    padding: 12px 20px 12px 33px;
    height: 34px;
}
</style>
 