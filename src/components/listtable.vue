<template>
  <div>
    <div class="nav-header">
      <ul>
        <li class="topic">
          <p style="font-size:25px;border-bottom: 2px solid #ffffff"><b>รายการอุปกรณ์</b></p>
        </li>
        <li style="font-size:15px;color:#2c3e50;float:right;">
          <div class="dropdown" style="float:right;">
            <span class="dropbtn glyphicon glyphicon-chevron-down" style="color:#ffffff;"></span>
            <div class="dropdown-content">
              <a href="#" data-toggle="modal" data-target="#addAdmin"><span class="glyphicon glyphicon-user"></span> เพิ่มผู้จัดการระบบ</a>
              <a href="#" @click="submitLogout()"><span class="glyphicon glyphicon-log-out"></span> ออกจากระบบ</a>
            </div>
          </div>
        </li>
        <li class="user-login">
          <p style="font-size:28px;margin-top:-15px;color:#ffffff;">{{firstname}} {{lastname}}</p>
          <p style="font-size:20px;margin-top:-45px;font-style:italic;color:#ffffff;">Administrator</p>
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
          <i class="fa fa-list-alt" style="font-size:25px;"></i>
          <router-link to="/listtable">รายการอุปกรณ์</router-link>
        </li>
        <li>
          <i class="fa fa-check-square-o" style="color:#ffffff;font-size:25px;"></i>
          <button v-if="noti.approveNoti !== 0" v-for="noti of notis" class="noti" style="margin-left:-12px;">
            <p style="margin-top: -4px;"><b>{{noti.approveNoti}}</b></p>
          </button>
          <router-link to="/approve">รายการรออนุมัติ</router-link>
        </li>
        <li>
          <i class="glyphicon glyphicon-send" style="color:#ffffff;font-size:25px;"></i>
          <router-link to="/borrowedlist">รายการอุปกรณ์ที่ถูกยืมไป</router-link>       
        </li>
        <li>
          <i class="fa fa-clipboard" style="color:#ffffff;font-size:25px;"></i>
          <router-link to="/lendhistory">ประวัติการยืม</router-link>
        </li>
        <li>
          <i class="fa fa-bar-chart" style="color:#ffffff;font-size:25px;"></i>
          <button v-if="requestNoti.requestNoti !== 0" v-for="requestNoti of requestNotis" class="noti" style="margin-left:-12px;">
            <p style="margin-top: -4px;"><b>{{requestNoti.requestNoti}}</b></p>
          </button>
          <router-link to="/report">รายงานสถิติ</router-link>
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
                  <span></span>
                  
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
              </h4>
              <br><br>
             <!-- <p class="card-text">รวม : {{realtimeplus}} รายการ</p> !-->
              <!--TABLE!-->
              <br>
     
              <table class="table">
                <thead>
                  <tr>
                    <th width="700px">ชื่ออุปกรณ์</th>
                    <th width="118px" style="text-align: center;">จำนวน</th>
                    <th width="118px" style="text-align: center;">ถูกยืม</th>
                    <th width="118px" style="text-align: center;">ส่งซ่อม</th>
                    <th width="118px" style="text-align: center; background: rgb(3,155,229);; color: #ffffff;">คงเหลือ</th>
                    <th width="100px">หน่วย</th>
                    <th width="140px" style="text-align: center;">ประเภท</th>
                    <th width="150px">ราคา (ต่อหน่วย)</th>
                    <th width="100px">วันที่ซ่อมบำรุง (Maintenance)</th>
                    <th width="200px">วันที่ตรวจเช็คความเรียบร้อย (Calibration)</th>
                    <th width="80px" style="text-align: center;">แก้ไข</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="category === '' && equipment.statusLend === 'เปิด'" v-for="(equipment, key) of searchEqm" v-bind:key="equipment['.key']">
                      <td><router-link :to="'/eqmtable/' + equipment['.key']">{{equipment.nameEqm}}</router-link></td>
                      <td style="text-align: center;">{{equipment.amountEqm}}</td>
                      <td style="text-align: center;">{{equipment.borrowedEqm}}</td>
                      <td style="text-align: center;">{{equipment.amountRepair}}</td>
                      <td style="text-align: center; background: rgb(3,155,229);; color: #ffffff;">{{equipment.balanceEqm}}</td>
                      <td>{{equipment.unitEqm}}</td>
                      <td style="text-align: center;">{{equipment.categoryEqm}}</td>
                      <td style="text-align: center;">{{equipment.priceUnit}}</td>
                      <td>{{equipment.dateRepair}}</td>
                      <td>{{equipment.dateCalibrate}}</td>
                      <td style="text-align: center;"><span class="glyphicon glyphicon-edit" style="color:#9968db;" data-toggle="modal" data-target="#myModall" @click="editEqm(equipment['.key'], equipment.unitEqm, equipment.dateRepair, equipment.dateCheckRepair, equipment.dateCalibrate, equipment.dateCheckCalibrate)"></span></td>
                  </tr>
                  <tr v-if="equipment.categoryEqm == category && equipment.statusLend === 'เปิด'" v-for="(equipment, key) of searchEqm" v-bind:key="equipment['.key']">
                      <td><router-link :to="'/eqmtable/' + equipment['.key']">{{equipment.nameEqm}}</router-link></td>
                      <td style="text-align: center;">{{equipment.amountEqm}}</td>
                      <td style="text-align: center;">{{equipment.borrowedEqm}}</td>
                      <td style="text-align: center;">{{equipment.amountRepair}}</td>
                      <td style="text-align: center; background: rgb(3,155,229);rgb(3,155,229); color: #ffffff;">{{equipment.balanceEqm}}</td>
                      <td>{{equipment.unitEqm}}</td>
                      <td style="text-align: center;">{{equipment.categoryEqm}}</td>
                      <td style="text-align: center;">{{equipment.priceUnit}}</td>
                      <td>{{equipment.dateRepair}}</td>
                      <td>{{equipment.dateCalibrate}}</td>
                      <td style="text-align: center;"><span class="glyphicon glyphicon-edit" style="color:#9968db;" data-toggle="modal" data-target="#myModall" @click="editEqm(equipment['.key'], equipment.unitEqm, equipment.dateRepair, equipment.dateCheckRepair, equipment.dateCalibrate, equipment.dateCheckCalibrate)"></span></td>
                  </tr>
                  <tr v-if="category === 'ทั้งหมด' && equipment.statusLend === 'เปิด'" v-for="(equipment, key) of searchEqm" v-bind:key="equipment['.key']">
                      <td><router-link :to="'/eqmtable/' + equipment['.key']">{{equipment.nameEqm}}</router-link></td>
                      <td style="text-align: center;">{{equipment.amountEqm}}</td>
                      <td style="text-align: center;">{{equipment.borrowedEqm}}</td>
                      <td style="text-align: center;">{{equipment.amountRepair}}</td>
                      <td style="text-align: center; background: rgb(3,155,229); color: #ffffff;">{{equipment.balanceEqm}}</td>
                      <td>{{equipment.unitEqm}}</td>
                      <td style="text-align: center;">{{equipment.categoryEqm}}</td>
                      <td style="text-align: center;">{{equipment.priceUnit}}</td>
                      <td>{{equipment.dateRepair}}</td>
                      <td>{{equipment.dateCalibrate}}</td>
                      <td style="text-align: center;"><span class="glyphicon glyphicon-edit" style="color:#9968db;" data-toggle="modal" data-target="#myModall" @click="editEqm(equipment['.key'], equipment.unitEqm, equipment.dateRepair, equipment.dateCheckRepair, equipment.dateCalibrate, equipment.dateCheckCalibrate)"></span></td>
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
                      <h4>วันที่ซ่อมบำรุงของอุปกรณ์ (Maintenance):</h4>
                      <input id="myDate" type="date" class="form-control" min="" v-model="today" style="font-size:20px;"><br>
                      <h4>วันที่ตรวจเช็คความเรียบร้อยของอุปกรณ์ (Calibration):</h4>
                      <input id="myDate" type="date" class="form-control" min="" v-model="todayC" style="font-size:20px;"><br>
                      <select class="selectBox" v-model="editUnitEqm" style="font-size:16px">
                        <option disabled value="">หน่วย</option>
                        <option>เครื่อง</option>
                        <option>ตัว</option>
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
import {equipmentRef, auth, userRef, notiRef, scanRef, historyRef, requestNotiRef} from './firebase'
import moment from 'moment'
import dateFormat from 'dateformat'

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
      search: '',

      firstnameAdmin: '',
      lastnameAdmin: '',
      email: '',
      password: '',
      confirmpassword: '',
      department: '',
      phoneNumber: '',
      statusCheck: '',
      today: '',
      pushDateRepair: '',
      pushDateCheckRepair: '',
      dateRepair: '',
      dateCheckRepairScanKey: '',
      dateCheckRepairHitKey: '',
      dateCalibrate: '',
      todayC: '',
      pushDateCalibrate: '',
      pushDateCheckCalibrate: ''
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
    console.log(new Date('5/5/2018').getTime())
    console.log(new Date('5/10/2018').getTime())
    console.log(new Date('5/7/2018').getTime() + 259200000)
  },
  firebase: {
    equipments: equipmentRef,
    users: userRef,
    notis: notiRef,
    scans: scanRef,
    historys: historyRef,
    requestNotis: requestNotiRef
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
    editEqm (key, unitEqm, dateRepair, dateCheckRepair, dateCalibrate, dateCheckCalibrate) {
      this.editName = this.equipments.find(equipments => equipments['.key'] === key).nameEqm
      this.editID = this.equipments.find(equipments => equipments['.key'] === key).equipmentID
      this.editAmountEqm = this.equipments.find(equipments => equipments['.key'] === key).amountEqm
      this.editBalanceEqm = this.equipments.find(equipments => equipments['.key'] === key).balanceEqm
      this.key = key
      console.log(this.editID.length)
      this.check = ''
      this.btnAddAmount = 'เพิ่มจำนวน'
      this.editCategory = ''
      this.editUnitEqm = unitEqm
      this.addAmount = ''
      this.dateRepair = dateRepair
      this.dateCalibrate = dateCalibrate
      // this.today = new Date().toISOString().substr(0, 10)
      if (dateRepair !== '-') {
        this.today = ''
        var day = new Date(dateCheckRepair)
        this.today = dateFormat(day, 'yyyy-mm-dd')
        document.querySelector('#myDate').value = this.today
      } else {
        this.today = ''
        this.pushDateRepair = '-'
        this.pushDateCheckRepair = '-'
      }

      if (dateCalibrate !== '-') {
        this.todayC = ''
        var dayC = new Date(dateCheckCalibrate)
        this.todayC = dateFormat(dayC, 'yyyy-mm-dd')
        document.querySelector('#myDate').value = this.todayC
      } else {
        this.todayC = ''
        this.pushDateCalibrate = '-'
        this.pushDateCheckCalibrate = '-'
      }
    },
    submitEditEqm () {
      this.count = this.addAmount * 1 + 1
      this.num = this.editID.length + 1
      this.idDecive = this.editID.length + 1
      for (var i = 1; i < this.count; i++) {
        var getRandomInt = Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000
        var insertID = {
          id: 'RX' + getRandomInt,
          number: this.num++,
          lastnameLend: '',
          nameLend: '',
          status: 'พร้อมใช้งาน'
        }
        this.editID.push(insertID)
      }
      this.editAmountEqm = this.editAmountEqm * 1 + this.addAmount * 1
      this.editBalanceEqm = this.editBalanceEqm * 1 + this.addAmount * 1
      if (this.dateRepair !== '-' || this.today !== '') {
        this.pushDateRepair = moment(this.today).format('DD/MM/YYYY')
        this.pushDateCheckRepair = moment(this.today).format('MM/DD/YYYY')
      }
      if (this.dateCalibrate !== '-' || this.todayC !== '') {
        this.pushDateCalibrate = moment(this.todayC).format('DD/MM/YYYY')
        this.pushDateCheckCalibrate = moment(this.todayC).format('MM/DD/YYYY')
      }
      if (this.editUnitEqm !== '') {
        equipmentRef.child(this.key).update({
          nameEqm: this.editName,
          unitEqm: this.editUnitEqm,
          equipmentID: this.editID,
          amountEqm: this.editAmountEqm,
          balanceEqm: this.editBalanceEqm,
          dateRepair: this.pushDateRepair,
          dateCheckRepair: this.pushDateCheckRepair,
          dateCalibrate: this.pushDateCalibrate,
          dateCheckCalibrate: this.pushDateCheckCalibrate
        })
      }
      equipmentRef.child(this.key).update({
        equipmentID: this.editID,
        amountEqm: this.editAmountEqm,
        balanceEqm: this.editBalanceEqm
      })
      for (let i = 0; i < this.scans.length; i++) {
        if (this.scans[i].nameLend === this.editName) {
          scanRef.child(this.scans[i]['.key']).update({
            dateCheckRepair: this.pushDateCheckRepair,
            dateCheckCalibrate: this.pushDateCheckCalibrate
          })
        }
      }
      for (let i = 0; i < this.historys.length; i++) {
        if (this.historys[i].nameEqm === this.editName) {
          historyRef.child(this.historys[i]['.key']).update({
            dateCheckRepair: this.pushDateCheckRepair,
            dateCheckCalibrate: this.pushDateCheckCalibrate
          })
        }
      }
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
  margin-right: 24px;
  margin-left: 48px;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1), 0 1px 20px 0 rgba(0, 0, 0, 0.19);
}

.button-add {
  float: right;
  margin-left: 10px;
}

.content {
  margin-top: 60px;
  margin-left: 275px;
  /*width: 100%;*/
  padding: 20px 0px;
}
/*----------------------------------------------------------------------------------*/

/*------------------------------------- HEADER -------------------------------------*/
.nav-header {
  height: 60px;
  width: 100%;
  background: rgb(3,155,229);
  padding-left: 20px;
  display: inline-block;
  line-height: 60px;
  bottom: 0;
  position: fixed;
  top: 0;
  margin-top: -1px;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.5), 0 1px 20px 0 rgba(0, 0, 0, 0.19);
}

.nav-header ul li p {
  font-weight: 400;
  font-size: 20px;
  height: 58px;
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
  color: #ffffff;
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
  background: #262f3d;
  position: fixed;
  z-index: 1000;
  top: 0;
  bottom: 0;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.5), 0 1px 20px 0 rgba(0, 0, 0, 0.19);
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
 
  padding: 15px;
  padding-left: 30px;
 
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
  background: #373f4c;
  transition: linear all 0.30s;
}

nav ul li a:hover {
  transition: linear all 0.50s;
}

.selected a, i {
  color: #4fc3f7;
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

.dropbtn {
    color:#337ab7;
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

.noti {
  height:20px;
  width:20px;
  border-radius:60px;
  border:1px solid #d9534f;
  background:#d9534f;
  color:#ffffff;
  font-size:16px;
  position:absolute;
  margin-left:-10px;
  margin-top:-5px;
}

</style>
 