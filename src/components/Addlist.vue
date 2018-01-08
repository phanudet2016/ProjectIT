<template>
  <div>
    <div class="nav-header">
      <ul>
        <li class="topic">
          <p style="font-size:25px"><b>รายการอุปกรณ์</b></p>
        </li>
        <li style="font-size:15px;color:#2c3e50;float:right;">
          <div class="dropdown" style="float:right;">
            <span class="dropbtn glyphicon glyphicon-chevron-down"></span>
            <div class="dropdown-content">
              <a href="#" data-toggle="modal" data-target="#addAdmin"><span class="glyphicon glyphicon-user"></span> เพิ่มผู้จัดการระบบ</a>
              <a href="#" @click="submitLogout()"><span class="glyphicon glyphicon-log-out"></span> ออกจากระบบ</a>
            </div>
          </div>
        </li>
        <li class="user-login">
          <p style="font-size:28px;margin-top:-15px;color:#337ab7;">{{firstname}} {{lastname}}</p>
          <p style="font-size:20px;margin-top:-45px;font-style:italic;color: rgb(66, 79, 99);">Administrator</p>
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
          <i class="	glyphicon glyphicon-send" style="color:#ffffff;font-size:25px;"></i>
          <router-link to="/borrowedlist">รายการอุปกรณ์ที่ถูกยืมไป</router-link>
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
              <button style="margin-left:62px;background:#ffffff;border:1px solid #dddddd;height:40px;width:140px;background:#E0E0E0;color:#000000;font-size:16px">
                <span class="glyphicon glyphicon-menu-hamburger"></span>
                <b>รายการอุปกรณ์</b>
              </button>
            </router-link>
            <router-link to="/addlist">
              <button style="margin-left:2px;background:#ffffff;border:1px solid #dddddd;height:40px;width:130px;color:#000000;font-size:16px">
                <span class="glyphicon glyphicon-plus-sign"></span>
                <b>เพิ่มรายการ</b>
              </button>
            </router-link>
          <div class="card">
            <div class="card-block">
              <h4 class="card-title">
                <div class="button-add">
                  <span></span>
                  <!-- ADD Device !-->
                  <router-link to="/datalist">
                    <button type="button" class="btn button-add btn btn-success" style="color:#ffffff;font-size:18px">
                      <span class="glyphicon glyphicon-plus-sign"></span> เพิ่มรายการจากบัญชีรายการครุภัณฑ์
                    </button>
                 </router-link>
                  <div class="modal fade" id="myModal" role="dialog">
                    <div class="modal-dialog">
                      <!-- Modal content-->
                      <div class="modal-content">
                        <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal">&times;</button>
                          <h4 class="modal-title">นำเข้ารายการ</h4>
                        </div>
                        <div class="modal-body">
                          <input type="file" id="fileUpload">
                          <!-- v-on:change !-->
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-default" data-dismiss="modal">อัปโหลด</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- ADD Device !-->

                </div>
              </h4>
              <br><br>
             <!-- <p class="card-text">รวม : {{realtimeplus}} รายการ</p> !-->
              <!--TABLE!-->
              <br>
              <table>
                <thead>
                  <tr>
                    <th width="400px" style="text-align:right;"></th>
                    <th width="600px"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                      <td style="text-align:right;height:50px;"><h4 style="margin-right:10px;font-size:20px">ชื่ออุปกรณ์</h4></td>
                      <td><input type="text" class="form-control" style="font-size:20px" v-model="nameEqm"/></td>
                  </tr>
                  <tr>
                      <td style="text-align:right;height:50px;"><h4 style="margin-right:10px;font-size:20px">จำนวน</h4></td>
                      <td><input type="number" class="form-control" style="font-size:20px" v-model="amountEqm"/></td>
                  </tr>
                  <tr>
                      <td style="text-align:right;height:50px;"><h4 style="margin-right:10px;font-size:20px">ราคา (ต่อหน่วย)</h4></td>
                      <td><input type="number" class="form-control" style="font-size:20px" v-model="priceUnit"/></td>
                  </tr>
                  <tr>
                      <td style="text-align:right;height:50px;"></td>
                      <td>
                        <select class="selectBox" v-model="unitEqm" style="font-size:16px">
                            <option disabled value="">หน่วย</option>
                            <option>เครื่อง</option>
                            <option>ตัว</option>
                            <option>ชุด</option>
                        </select>
                        <select class="selectBox" v-model="categoryEqm" style="font-size:16px">
                            <option disabled value="">ประเภท</option>
                            <option>สนับสนุน</option>
                            <option>วินิจฉัยและรักษา</option>
                            <option>รักษา</option>
                            <option>วินิจฉัย</option>
                        </select>
                      </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td style="text-align:right;"><br><br>
                      <div class="modal-footer">
                          <button @click="submitEqm()" type="button" class="btn btn-default" data-dismiss="modal" style="width:100px;font-size:16px">ตกลง</button>
                      </div>
                    </td>
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
                      <h4 class="modal-title">เพิ่มรายการใหม่</h4>
                    </div>
                    <div class="modal-body">
                      <input class="form-control" type="text" placeholder="ชื่ออุปกรณ์" v-model="editName"/><br>
                      <select class="selectBox" v-model="editUnitEqm">
                        <option disabled value="">หน่วย</option>
                        <option>เครื่อง</option>
                        <option>ชุด</option>
                      </select>
                      <select class="selectBox" v-model="editCategory">
                        <option disabled value="">ประเภท</option>
                        <option>สนับสนุน</option>
                        <option>วินิจฉัยและรักษา</option>
                        <option>รักษา</option>
                        <option>วินิจฉัย</option>
                      </select>
                    </div>
                    <div class="modal-footer">
                      <button @click="submitEditEqm()" type="button" class="btn btn-default" data-dismiss="modal">ตกลง</button>
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
    
    <!-- ADD ADMIN !-->
    <div class="modal fade" id="addAdmin" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title" style="font-size:25px"><b>เพิ่มผู้จัดการระบบ</b></h4>
              </div>
              <div class="modal-body">
                <table class="table table-hover table-striped">
                  <thead>
                    <tr>
                      <th width="700px">ชื่อ</th>
                      <th width="700px">นามสกุล</th>
                      <th width="700px" style="text-align: center;">สถานะ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user of users" v-if="user.firstname !== 'Phanudet' && user.lastname !== 'Kawilai'">
                        <td>{{user.firstname}}</td>
                        <td>{{user.lastname}}</td>
                        <td style="text-align: center;">
                          <div class="dropdown">
                            <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style="background:#5cb85c;font-size:20px;width:100px;">{{user.status}}
                              <span class="caret"></span></button>                    
                                <ul class="dropdown-menu">                             
                                  <li><a @click="addAdmin('user',user['.key'])" style="font-size:18px;">user</a></li>
                                  <li><a @click="addAdmin('admin',user['.key'])" style="font-size:18px;">admin</a></li>
                                </ul>
                          </div>
                        </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="modal-footer">
                <button type="button" style="width:100px;font-size:16px" class="btn btn-default" data-dismiss="modal" data-toggle="modal" data-target="#myModal">ลงทะเบียนใหม่</button>
                <button type="button" style="width:100px;font-size:16px" class="btn btn-default" data-dismiss="modal">ปิด</button>
              </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="myModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title" style="font-size:25px"><b>เพิ่มผู้จัดการระบบ</b></h4>
          </div>
          <div class="modal-body">
            <input class="form-control" type="text" placeholder="Firstname" style="font-size:20px" v-model="firstnameAdmin"/><br>
            <input class="form-control" type="text" placeholder="Lastname" style="font-size:20px" v-model="lastnameAdmin"/><br>
            <input class="form-control" type="text" placeholder="Department" style="font-size:20px" v-model="department"/><br>
            <input class="form-control" type="text" placeholder="Email Address" style="font-size:20px" v-model="email"/><br>
            <input class="form-control" type="text" placeholder="Phone Number" style="font-size:20px" v-model="phoneNumber"/><br>
            <input class="form-control" type="Password" placeholder="Password" style="font-size:20px" v-model="password"/><br>
            <input class="form-control" type="Password" placeholder="Confirm Password" style="font-size:20px" v-model="confirmpassword"/><br>
          </div>
          <div class="modal-footer">
            <button @click="submitRegisterAdmin()" type="button" style="width:100px;font-size:16px" class="btn btn-default" data-dismiss="modal">ตกลง</button>
          </div>
        </div>
      </div>
    </div>    
    <!-- ADD ADMIN !-->

  </div>
</template>

<script>
import {equipmentRef, auth, userRef} from './firebase'

export default {
  name: 'addlist',
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
      priceUnit: '',
      cells: [],
      rows: [],
      strRows: [],
      countCSV: '',

      firstnameAdmin: '',
      lastnameAdmin: '',
      email: '',
      password: '',
      confirmpassword: '',
      department: '',
      phoneNumber: '',
      statusCheck: ''
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
    submitEqm () {
      var ss
      var id = []
      if (this.categoryEqm === 'สนับสนุน') {
        ss = 'SUP'
      } else if (this.categoryEqm === 'วินิจฉัยและรักษา') {
        ss = 'DXRX'
      } else if (this.categoryEqm === 'รักษา') {
        ss = 'RX'
      } else if (this.categoryEqm === 'วินิจฉัย') {
        ss = 'DX'
      }
      this.countCSV = this.amountEqm * 1 + 1
      for (var i = 1; i < this.countCSV; i++) {
        var insertID = {
          id: ss + i,
          number: i,
          lastnameLend: '',
          nameLend: '',
          status: 'พร้อมใช้งาน'
        }
        id.push(insertID)
      }
      if (this.nameEqm === '' || this.amountEqm === '' || this.categoryEqm === '' || this.unitEqm === '') {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน')
      } else if (this.amountEqm <= 0) {
        alert('กรุณากรอกข้อมูลให้ถูกต้อง')
      } else {
        if (this.priceUnit === '') {
          equipmentRef.push({
            nameEqm: this.nameEqm,
            amountEqm: this.amountEqm,
            borrowedEqm: 0,
            balanceEqm: this.amountEqm,
            unitEqm: this.unitEqm,
            categoryEqm: this.categoryEqm,
            editEqm: false,
            equipmentID: id,
            priceUnit: '-',
            statusLend: 'ON'
          })
          this.$router.push('/listtable')
        } else {
          equipmentRef.push({
            nameEqm: this.nameEqm,
            amountEqm: this.amountEqm,
            borrowedEqm: 0,
            balanceEqm: this.amountEqm,
            unitEqm: this.unitEqm,
            categoryEqm: this.categoryEqm,
            editEqm: false,
            equipmentID: id,
            priceUnit: this.priceUnit,
            statusLend: 'ON'
          })
          this.$router.push('/listtable')
        }
      }
    },
    editEqm (key) {
      this.editName = this.equipments.find(equipments => equipments['.key'] === key).nameEqm
      this.editID = this.equipments.find(equipments => equipments['.key'] === key).equipmentID
      this.key = key
      console.log(this.editID)
    },
    submitEditEqm () {
      equipmentRef.child(this.key).update({
        nameEqm: this.editName,
        categoryEqm: this.editCategory,
        unitEqm: this.editUnitEqm
      })
    },
    removeEqm (key) {
      equipmentRef.child(key).remove()
    },
    submitLogout () {
      auth.signOut()
      this.$router.push('/')
    },
    submitRegisterAdmin () {
      if (this.password !== this.confirmpassword) {
        alert('กรุณากรอกรหัสผ่านทั้ง 2 ช่องให้ตรงกัน')
      } else if (this.firstname === '' || this.lastname === '' || this.email === '' || this.password === '' || this.confirmpassword === '' || this.department === '' || this.phoneNumber === '') {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน')
      } else {
        userRef.push({
          firstname: this.firstnameAdmin,
          lastname: this.lastnameAdmin,
          email: this.email.toLowerCase(),
          password: this.password,
          confirmpassword: this.confirmpassword,
          department: this.department,
          phoneNumber: this.phoneNumber,
          status: 'admin',
          editProfile: false
        })
        auth.createUserWithEmailAndPassword(this.email, this.password).catch((error) => {
          var errorCode = error.code
          var errorMessage = error.message
          if (errorCode === 'auth/wrong-password') {
            alert('pass 6')
          } else {
            alert(errorMessage)
          }
          console.log(error)
        })
        alert('ลงทะเบียนสำเร็จ')
        this.$router.push('/')
      }
    },
    addAdmin (statusAdd, key) {
      userRef.child(key).update({status: statusAdd})
      this.statusCheck = this.users.find(users => users.firstname === this.firstname && users.lastname === this.lastname).status
      if (this.statusCheck === 'user') {
        this.$router.push('/')
        location.reload()
      }
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

.dropbtn {
    color: #337ab7;
    padding: 16px;
    font-size: 16px;
    border: none;
    cursor: pointer;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    display: none;
    position: absolute;
    right: 0;
    background-color: #ffffff;
    min-width: 160px;
    border: 1px solid #dddddd;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
}

.dropdown-content a {
    color: #337ab7;
    padding: 1px 18px;
    text-decoration: none;
    height: 50px;
    display: block;
}

.dropdown-content a:hover {background-color: #f1f1f1}

.dropdown:hover .dropdown-content {
    display: block;
}
</style>
