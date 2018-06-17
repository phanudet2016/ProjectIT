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
                  <!-- ADD Device !-->
                  <button type="button" class="BTNstatus" style="color:#ffffff;font-size:18px;width:150px;" data-toggle="modal" data-target="#myModal">
                      <span class="glyphicon glyphicon-import"></span> นำเข้ารายการ
                    </button>
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
                          <button @click="Upload()" type="button" class="btn btn-default BTNstatus" data-dismiss="modal">อัปโหลด</button>
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
              <table class="table">
                <thead>
                  <tr>
                    <th width="500px">ชื่ออุปกรณ์</th>
                    <th width="400px" style="text-align: center;">คำอธิบาย</th>
                    <th width="118px" style="text-align: center;">ราคา (ต่อหน่วย)</th>
                    <th width="118px" style="text-align: center;">จำนวน</th>
                    <th width="118px" style="text-align: center;">ประเภท</th>
                    <th width="118px" style="text-align: center;">ปิด/เปิด ให้บริการ</th>
                    <th width="118px" style="text-align: center;">ลบ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="category === ''" v-for="equipment of searchEqm" v-bind:key="equipment['.key']">
                      <td>{{equipment.nameEqm}}</td>
                      <td style="text-align: center;">{{equipment.description}}</td>
                      <td style="text-align: center;">{{equipment.priceUnit}}</td>
                      <td style="text-align: center;">{{equipment.amountEqm}}</td>
                      <td style="text-align: center;">{{equipment.categoryEqm}}</td>
                      <td style="text-align: center;">
                        <div class="dropdown">
                          <button v-if="equipment.statusLend === 'เปิด'" class="btn btn-primary dropdown-toggle BTNstatus" type="button" data-toggle="dropdown">{{equipment.statusLend}}
                            <span class="caret"></span></button>
                          <button v-if="equipment.statusLend === 'ปิด'" class="btn btn-primary dropdown-toggle BTNstatus" type="button" data-toggle="dropdown" style="background-color: #EF5350;">{{equipment.statusLend}}
                            <span class="caret"></span></button>                  
                            <ul class="dropdown-menu">                             
                              <li><a @click="onOff('เปิด',equipment['.key'])" style="font-size:18px;">เปิด</a></li>
                              <li><a @click="onOff('ปิด',equipment['.key'])" style="font-size:18px;">ปิด</a></li>
                            </ul>
                        </div>
                      </td>
                      <td style="text-align: center;">
                        <button @click="sendDelete(equipment['.key'], equipment.nameEqm, equipment.categoryEqm)" class="btn btn-primary dropdown-toggle BTNdelete" type="button" data-toggle="modal" data-target="#deleteList">
                          <span class="glyphicon glyphicon-trash"></span>
                        </button>
                      </td>
                  </tr>
                  <tr v-if="equipment.categoryEqm == category" v-for="equipment of searchEqm" v-bind:key="equipment['.key']">
                      <td>{{equipment.nameEqm}}</td>
                      <td style="text-align: center;">{{equipment.description}}</td>
                      <td style="text-align: center;">{{equipment.priceUnit}}</td>
                      <td style="text-align: center;">{{equipment.amountEqm}}</td>
                      <td style="text-align: center;">{{equipment.categoryEqm}}</td>
                      <td style="text-align: center;">
                        <div class="dropdown">
                          <button v-if="equipment.statusLend === 'เปิด'" class="btn btn-primary dropdown-toggle BTNstatus" type="button" data-toggle="dropdown">{{equipment.statusLend}}
                            <span class="caret"></span></button>
                          <button v-if="equipment.statusLend === 'ปิด'" class="btn btn-primary dropdown-toggle BTNstatus" type="button" data-toggle="dropdown" style="background-color: #EF5350;">{{equipment.statusLend}}
                            <span class="caret"></span></button>                  
                            <ul class="dropdown-menu">                             
                              <li><a @click="onOff('เปิด',equipment['.key'])" style="font-size:18px;">เปิด</a></li>
                              <li><a @click="onOff('ปิด',equipment['.key'])" style="font-size:18px;">ปิด</a></li>
                            </ul>
                        </div>
                      </td>
                      <td style="text-align: center;">
                        <button @click="sendDelete(equipment['.key'], equipment.nameEqm, equipment.categoryEqm)" class="btn btn-primary dropdown-toggle BTNdelete" type="button" data-toggle="modal" data-target="#deleteList">
                          <span class="glyphicon glyphicon-trash"></span>
                        </button>
                      </td>         
                  </tr>
                  <tr v-if="category === 'ทั้งหมด'" v-for="equipment of searchEqm" v-bind:key="equipment['.key']">
                      <td>{{equipment.nameEqm}}</td>
                      <td style="text-align: center;">{{equipment.description}}</td>
                      <td style="text-align: center;">{{equipment.priceUnit}}</td>
                      <td style="text-align: center;">{{equipment.amountEqm}}</td>
                      <td style="text-align: center;">{{equipment.categoryEqm}}</td>
                      <td style="text-align: center;">
                        <div class="dropdown">
                          <button v-if="equipment.statusLend === 'เปิด'" class="btn btn-primary dropdown-toggle BTNstatus" type="button" data-toggle="dropdown">{{equipment.statusLend}}
                            <span class="caret"></span></button>
                          <button v-if="equipment.statusLend === 'ปิด'" class="btn btn-primary dropdown-toggle BTNstatus" type="button" data-toggle="dropdown" style="background-color: #EF5350;">{{equipment.statusLend}}
                            <span class="caret"></span></button>                  
                            <ul class="dropdown-menu">                             
                              <li><a @click="onOff('เปิด',equipment['.key'])" style="font-size:18px;">เปิด</a></li>
                              <li><a @click="onOff('ปิด',equipment['.key'])" style="font-size:18px;">ปิด</a></li>
                            </ul>
                        </div>
                      </td>
                      <td style="text-align: center;">
                        <button @click="sendDelete(equipment['.key'], equipment.nameEqm, equipment.categoryEqm)" class="btn btn-primary dropdown-toggle BTNdelete" type="button" data-toggle="modal" data-target="#deleteList">
                          <span class="glyphicon glyphicon-trash"></span>
                        </button>
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
                      <h4 class="modal-title" style="font-size: 25px;"><b>เพิ่มรายการใหม่</b></h4>
                    </div>
                    <div class="modal-body">
                      <p style="color:#9A9A9A;font-size:20px;">ชื่ออุปกรณ์</p> <h4 style="font-size:21px">{{addNameEqm}}</h4><br>
                      <p style="color:#9A9A9A;font-size:20px;">ประเภท</p> <h4 style="font-size:21px">{{categoryEqm}}</h4><br>
                      <p style="color:#9A9A9A;font-size:20px;">หน่วย</p>
                      <select class="selectBox" v-model="unitEqm" style="font-size:16px">
                            <option disabled value="">หน่วย</option>
                            <option>เครื่อง</option>
                            <option>ตัว</option>
                            <option>ชุด</option>
                      </select><br><br>
                      <p style="color:#9A9A9A;font-size:20px;">จำนวน</p>
                      <input class="form-control" type="number" placeholder="" v-model="amountEqm" style="width:150px;font-size:20px"><br>
                    </div>
                    <div class="modal-footer">
                      <button @click="submitEqm()" type="button" class="btn btn-default" data-dismiss="modal" style="width:100px;font-size:16px">ตกลง</button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Edit Device !-->
              <!-- ลบข้อมูล !-->
              <div class="modal fade" id="deleteList" role="dialog">
                <div class="modal-dialog">
                  <!-- Modal content-->
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      <h4 class="modal-title" style="font-size: 25px;"><b>ลบรายการอุปกรณ์</b></h4>
                    </div>
                    <div class="modal-body">
                      <p style="color:#9A9A9A;font-size:20px;">ชื่ออุปกรณ์</p> <h4 style="font-size:21px">{{nameRemove}}</h4><br>
                      <p style="color:#9A9A9A;font-size:20px;">ประเภท</p> <h4 style="font-size:21px">{{categoryRemove}}</h4><br>
                    </div>
                    <div class="modal-footer">
                      <button @click="removeEqm()" type="button" class="btn btn-default" data-dismiss="modal" style="width:100px;font-size:16px">ตกลง</button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- ลบข้อมูล !-->
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
                <table class="table">
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
                            <button class="btn btn-primary dropdown-toggle BTNstatus" type="button" data-toggle="dropdown" style="background:#5cb85c;font-size:20px;width:100px;">{{user.status}}
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
                <button type="button" style="width:100px;" class="btn btn-default BTNstatus" data-dismiss="modal" data-toggle="modal" data-target="#myModal">ลงทะเบียนใหม่</button>
                <button type="button" style="width:100px;" class="btn btn-default BTNdelete" data-dismiss="modal">ปิด</button>
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
import {equipmentRef, auth, userRef, dataRef, notiRef, requestNotiRef} from './firebase'
import moment from 'moment'

export default {
  name: 'datalist',
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
      addNameEqm: '',
      addCategoryData: '',
      search: '',
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
      statusCheck: '',

      nameRemove: '',
      categoryRemove: '',
      keyRemove: '',
      dateCheckRepair: '',
      dateCheckCalibrate: '',
      dateCalibrate: '',
      dateRepair: ''
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
    users: userRef,
    datas: dataRef,
    notis: notiRef,
    requestNotis: requestNotiRef
  },
  methods: {
    submitEqm () {
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
          status: 'พร้อมใช้งาน'
        }
        id.push(insertID)
      }
      if (this.addNameEqm === '' || this.amountEqm === '' || this.unitEqm === '' || this.categoryEqm === '') {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน')
      } else {
        equipmentRef.push({
          nameEqm: this.addNameEqm,
          amountEqm: this.amountEqm,
          borrowedEqm: 0,
          balanceEqm: this.amountEqm,
          unitEqm: this.unitEqm,
          categoryEqm: this.categoryEqm,
          editEqm: false,
          equipmentID: id,
          priceUnit: this.priceUnit
        })
        this.$router.push('/listtable')
      }
    },
    addEqm (key) {
      this.addNameEqm = this.datas.find(datas => datas['.key'] === key).nameTH
      this.categoryEqm = this.datas.find(datas => datas['.key'] === key).categoryData
      this.priceUnit = this.datas.find(datas => datas['.key'] === key).unitPrice
      this.key = key
      console.log(this.editID)
      this.amountEqm = ''
      this.unitEqm = ''
    },
    submitEditEqm () {
      equipmentRef.child(this.key).update({
        nameEqm: this.editName,
        categoryEqm: this.editCategory,
        unitEqm: this.editUnitEqm
      })
    },
    sendDelete (key, nameEqm, categoryEqm) {
      console.log(nameEqm)
      this.categoryRemove = categoryEqm
      this.nameRemove = nameEqm
      this.keyRemove = key
    },
    removeEqm () {
      equipmentRef.child(this.keyRemove).remove()
    },
    submitLogout () {
      auth.signOut()
      this.$router.push('/')
    },
    onOff (status, key) {
      equipmentRef.child(key).update({
        statusLend: status
      })
    },
    Upload () {
      var data = this.equipments
      var fileUpload = document.getElementById('fileUpload')
      var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/
      if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) !== 'undefined') {
          var reader = new FileReader()
          reader.onload = function (e) {
            this.rows = e.target.result.split('\n')
            for (var i = 1; i < this.rows.length; i++) {
              this.strRows = this.rows[i].substring(0, this.rows[i].length - 1)
              this.cells = this.strRows.split(',')
              if (data.find(data => data.nameEqm === this.cells[0])) {
                console.log('T')
              } else {
                var amount = []
                var s
                if (this.cells[5] === 'สนับสนุน') {
                  s = 'SUP'
                } else if (this.cells[5] === 'วินิจฉัยและรักษา') {
                  s = 'DXRX'
                } else if (this.cells[5] === 'รักษา') {
                  s = 'RX'
                } else if (this.cells[5] === 'วินิจฉัย') {
                  s = 'DX'
                } else { s = 'Etc' }
                this.count = this.cells[6] * 1 + 1
                for (var c = 1; c < this.count; c++) {
                  var getRandomInt = Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000
                  var insertID = {
                    id: s + getRandomInt,
                    number: c,
                    lastnameLend: '',
                    nameLend: '',
                    status: 'พร้อมใช้งาน',
                    numberOfItem: ''
                  }
                  amount.push(insertID)
                }
                if (this.cells[7] === '' || this.cells[7] === '-') {
                  this.dateCheckRepair = '-'
                  this.dateRepair = '-'
                } else {
                  this.dateCheckRepair = moment(this.cells[7]).format('DD/MM/YYYY')
                  this.dateRepair = this.cells[7]
                }

                if (this.cells[8] === '' || this.cells[8] === '-') {
                  this.dateCheckCalibrate = '-'
                  this.dateCalibrate = '-'
                } else {
                  this.dateCheckCalibrate = moment(this.cells[8]).format('DD/MM/YYYY')
                  this.dateCalibrate = this.cells[8]
                }

                var x = this.cells[2].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                equipmentRef.push({
                  nameEqm: this.cells[0],
                  nameEng: this.cells[1],
                  description: this.cells[4],
                  amountEqm: this.cells[6],
                  balanceEqm: this.cells[6],
                  unitEqm: this.cells[3],
                  categoryEqm: this.cells[5],
                  borrowedEqm: 0,
                  priceUnit: x,
                  equipmentID: amount,
                  statusLend: 'ปิด',
                  countTopTen: 0,
                  dateRepair: this.dateRepair,
                  dateCalibrate: this.dateCalibrate,
                  dateCheckRepair: this.dateCheckRepair,
                  dateCheckCalibrate: this.dateCheckCalibrate,
                  amountRepair: 0
                })
              }
            }
          }
          reader.readAsText(fileUpload.files[0], 'tis-620') // ทำให้ภาษาไทยไม่เพี้ยน
        } else {
          alert('This browser does not support HTML5.')
        }
      } else {
        alert('กรุณาอัปโหลดไฟล์ CSV')
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
        return equipments.nameEqm.indexOf(this.search) > -1 || equipments.categoryEqm.indexOf(this.search) > -1
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
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.5), 0 1px 20px 0 rgba(0, 0, 0, 0.19);
  bottom: 0;
  position: fixed;
  top: 0;
  margin-top: -1px;
  z-index: 1000;
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
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1), 0 1px 20px 0 rgba(0, 0, 0, 0.19);
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

.BTNstatus{
  background-color: rgb(3,155,229);
  border: none;
  color: white;
  padding: 1px 1px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  cursor: pointer;
  border-radius: 2px;
  width: 85px;
  height: 35px;
  font-weight: bold;
}

.BTNdelete {
  background-color: #EF5350;
  border: none;
  color: white;
  padding: 5px 1px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 2px;
  width: 85px;
  height: 35px;
  font-weight: bold; 
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
