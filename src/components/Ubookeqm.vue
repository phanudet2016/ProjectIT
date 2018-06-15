<template>
  <div>
    <div class="nav-header">
      <ul>
        <li class="topic">
          <p style="font-size:25px;border-bottom: 2px solid #ffffff"><b>จองเครื่องมือแพทย์</b></p>
        </li>
        <li style="font-size:15px;color:#2c3e50;float:right;">
          <div class="dropdown" style="float:right;">
            <span class="dropbtn glyphicon glyphicon-chevron-down" style="color:#ffffff;"></span>
            <div class="dropdown-content">
              <a href="#" @click="submitLogout()"><span class="glyphicon glyphicon-log-out"></span> ออกจากระบบ</a>
            </div>
          </div>
        </li>
        <li class="user-login">
          <p style="font-size:28px;margin-top:-15px;color:#ffffff;">{{firstname}} {{lastname}}</p>
          <p style="font-size:20px;margin-top:-45px;font-style:italic;color: #ffffff">General user</p>
        </li>
      </ul>
    </div>

    <nav>
      <img src="../assets/196127.png" style="margin-top:22px;margin-left:20px;width:40%;">
      <p class="navbar-brand">ระบบจัดการ<br>อุปกรณ์ทางการแพทย์</p>
      <br><br><br><br><br>
      <ul>
        <!-- <li>
          <i class="glyphicon glyphicon-wrench" style="font-size:25px;"></i>
          <router-link to="/uhome">ยืมเครื่องมือแพทย์</router-link>
        </li> -->
        <li class="selected">
          <i class="glyphicon glyphicon-wrench" style="font-size:25px;"></i>
          <router-link to="/ubookeqm">ยืมเครื่องมือแพทย์</router-link>
        </li>
        <li>
          <i class="fa fa-check-square-o" style="color:#ffffff;font-size:25px;"></i>
          <router-link to="/uapprove">รายการรออนุมัติ</router-link>
        </li>
        <li>
          <i class="glyphicon glyphicon-book" style="color:#ffffff;font-size:25px;"></i>
          <button v-if="user.noteNoti !== 0 && user.email === emailAuth" v-for="user of users" class="noti" style="margin-left:-12px;">
            <p style="margin-top: -4px;">{{user.noteNoti}}</p>
          </button>
          <router-link to="/ulisttable">รายการเครื่องมือที่ยืมมา</router-link>
        </li>
        <li>
          <i class="glyphicon glyphicon-send" style="color:#ffffff;font-size:25px;"></i>
          <router-link to="/urequest">แจ้งความต้องการใช้อุปกรณ์</router-link>
        </li>
        <li>
          <i class="fa fa-clipboard" style="color:#ffffff;font-size:25px;"></i>
          <router-link to="/ulendhistory">ประวัติการยืม</router-link>
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
            <div class="card">
              <div class="card-block">
                <h4 class="card-title" style="font-size:20px">
                  แสดงรายการเครื่องมือที่เปิดให้ยืม
                  <div class="button-add">
                    <input type="text" v-model="search" placeholder="ค้นหา..." v-on:keypress="" style="" class="searchEqm">
                    <select v-model="category" class="selectBox" style="font-size:20px">
                      <option disabled value="">ประเภท</option>
                      <option>สนับสนุน</option>
                      <option>วินิจฉัยและรักษา</option>
                      <option>รักษา</option>
                      <option>วินิจฉัย</option>
                      <option>ทั้งหมด</option>
                    </select>

                  </div>
                </h4>
                <!--TABLE!-->
                <br>
                <table class="table">
                  <thead>
                    <tr>
                      <th width="300px">ชื่ออุปกรณ์</th>
                      <th width="150px" style="text-align: center;">จำนวน</th>
                      <th width="150px" style="text-align: center;">หน่วย</th>
                      <th width="150px" style="text-align: center;">ยืมอุปกรณ์</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="category === '' && equipment.statusLend === 'เปิด'" v-for="(equipment, key) of searchEqm" v-bind:key="equipment['.key']">
                        <td>{{equipment.nameEqm}}</td>
                        <td style="text-align: center;">{{equipment.balanceEqm}}</td>
                        <td style="text-align: center;">{{equipment.unitEqm}}</td>
                        <td style="text-align: center;"><button class="BTNlend" style="color:#ffffff;" data-toggle="modal" data-target="#myModal" @click="setDate(), lend(equipment['.key'], equipment.countTopTen, equipment.dateCheckRepair, equipment.dateCheckCalibrate)">ยืม</button></td>
                      </tr>
                      <tr v-if="equipment.categoryEqm == category && equipment.statusLend === 'เปิด'" v-for="(equipment, key) of searchEqm" v-bind:key="equipment['.key']">
                        <td>{{equipment.nameEqm}}</td>
                        <td style="text-align: center;">{{equipment.balanceEqm}}</td>
                        <td style="text-align: center;">{{equipment.unitEqm}}</td>
                        <td style="text-align: center;"><button class="BTNlend" style="color:#ffffff;" data-toggle="modal" data-target="#myModal" @click="lend(equipment['.key'], equipment.countTopTen, equipment.dateCheckRepair, equipment.dateCheckCalibrate), setDate()">ยืม</button></td>
                      </tr>
                      <tr v-if="category === 'ทั้งหมด' && equipment.statusLend === 'เปิด'" v-for="(equipment, key) of searchEqm" v-bind:key="equipment['.key']">
                        <td>{{equipment.nameEqm}}</td>
                        <td style="text-align: center;">{{equipment.balanceEqm}}</td>
                        <td style="text-align: center;">{{equipment.unitEqm}}</td>
                        <td style="text-align: center;"><button class="BTNlend" style="color:#ffffff;" data-toggle="modal" data-target="#myModal" @click="lend(equipment['.key'], equipment.countTopTen, equipment.dateCheckRepair, equipment.dateCheckCalibrate)">ยืม</button></td>
                      </tr>
                    </tbody>
                  </table>
              <!--TABLE!-->

              <!-- Book Device !-->
              <div class="modal fade" id="myModal" role="dialog">
                <div class="modal-dialog" style="height:5000px;">
                  <!-- Modal content-->
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      <h4 class="modal-title" style="font-size:25px"><b>ยืมเครื่องมือแพทย์</b></h4>
                    </div>
                    <div class="modal-body">
                      <p style="color:#9A9A9A;font-size:20px;">ชื่ออุปกรณ์  </p><h4 style="font-size:21px">{{nameLend}}</h4> <br>
                      <p style="color:#9A9A9A;font-size:20px;">ประเภท  </p><h4 style="font-size:21px">{{categoryLend}}</h4><br>
                      <center>
                      <table class="table">
                        <thead>
                          <tr>
                            <th width="700px" style="text-align:center;">หมายเลขเครื่อง</th>
                            <th width="700px" style="text-align: center;">ยืม</th>
                          </tr>
                        </thead>
                        <tbody v-for="equipment in equipments" v-if="equipment.nameEqm === nameLend">
                          <tr v-for="(eqm, index) in equipment.equipmentID" v-if="eqm.status !== 'ส่งซ่อม'">
                            <td style="text-align:center;">{{eqm.number}}</td>
                            <td style="text-align:center;">
                              <button @click="bookEqmFn(eqm.number, index)" type="button" class="btn btn-default BTNlend">
                                ยืม
                              </button>
                              <i id="next" data-dismiss="modal" data-toggle="modal" data-target="#nextBookeqm"></i>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      </center>
                      <!-- <p style="color:#9A9A9A;font-size:20px;">ระยะเวลาการยืม</p>
                      <input id="myDate" type="date" style="width:150px;border-radius:4px;border:none;font-size:21px;" min="" v-model="today"> -->
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-default BTNcancel" data-dismiss="modal"><span class="glyphicon glyphicon-remove" style="font-size:16px;"></span> ยกเลิก</button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Book Device !-->

              <!-- Book (ช่วงเวลา) !-->
              <div class="modal fade" id="nextBookeqm" role="dialog">
                <div class="modal-dialog" style="width:1000px;">
                  <!-- Modal content-->
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      <h4 class="modal-title" style="font-size:25px"><b>จองช่วงวันที่ยืม</b></h4>
                    </div>
                    <div class="modal-body">
                      <div class="comp-full-calendar test-fc">
                        <full-calendar ref="calendar" @event-created="eventCreated" :config="config" :events="events" :header="header" :defaultView="defaultView"></full-calendar>
                      </div>
                      <!-- <input id="myDate" type="date" style="width:150px;border-radius:4px;border:none;font-size:21px;" min="" v-model="today">  -->
                    </div>
                    <div class="modal-footer">
                      <button @click="submitBook()" type="button" class="btn btn-default" data-dismiss="modal" style="width:85px;font-size: 18px;">ตกลง</button>
                      <button type="button" class="btn btn-default" data-dismiss="modal" style="width:85px;font-size: 18px;">ยกเลิก</button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Book (ช่วงเวลา)!-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {equipmentRef, auth, userRef, approvetableRef, scanRef, notiRef, yearRef, historyDepartmentRef, messaging, lendMaxRef, bookEqmRef} from './firebase'
import moment from 'moment'
import dateFormat from 'dateformat'
import 'fullcalendar/dist/locale/th'

export default {
  name: 'ubookeqm',
  data () {
    return {
      user: '',
      category: '',
      unitEqm: '',
      categoryEqm: '',
      nameEqm: '',
      amountEqm: '',
      names: '',
      firstname: '',
      lastname: '',
      nameLend: '',
      categoryLend: '',
      unitLend: '',
      amountLend: 1,
      HnNo: '',
      statusLend: 'รออนุมัติ',
      department: '',
      key: '',
      borrowedLend: '',
      balanceLend: '',
      search: '',
      email: '',

      approveNoti: '',
      notiKeyUpdate: '',

      today: '',
      timeLength: '',
      keyPushNoti: '',
      emailAuth: '',
      dateCheckReturn: '',

      countTopTen: '',
      dateCheckRepair: '',
      amountDate: '',
      year: '',
      keyUpdateDepart: '',
      namefind: '',
      amountLendDp: '',
      nameHitDepart: '',

      arrayMaxDevice: [],
      arrayDevice: [],
      amountAAA: '',
      dateCheckCalibrate: '',
      // fullcalendar
      defaultView: 'month',
      header: {
        left: 'prev, next today',
        center: 'title',
        right: 'month'
      },
      events: [],
      selected: [],
      startEvent: '',
      endEvent: '',
      numberEqm: '',
      arrayEvent: [],
      nameEqmCalen: '',
      timestampStart: '',
      timestampEnd: '',
      timestamp: [],
      checkMark: true,
      checkPush: false,
      todayCheck: '',
      idLend: ''
    }
  },
  created () {
    // requestPermis
    messaging.requestPermission()
        .then(function () {
          console.log('Notification permission granted.')
        })
        .catch(function (err) {
          console.log('Unable to get permission to notify. ', err)
        })
    // firebaseAuth
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.firstname = this.users.find(users => users.email === user.email).firstname
        this.lastname = this.users.find(users => users.email === user.email).lastname
        this.department = this.users.find(users => users.email === user.email).department
        this.keyPushNoti = this.users.find(users => users.email === user.email)['.key']
        this.emailAuth = user.email
        // getTokenPushNoti
        messaging.getToken()
        .then((token) => {
          console.log(token)
          this.tokensss = token
          console.log(this.keyPushNoti)
          userRef.child(this.keyPushNoti).update({
            keyPushNoti: this.tokensss
          })
        })
        .catch(function (err) {
          console.log('An error occurred while retrieving token. ', err)
        })
      } else {
        console.log('not logged in')
      }
      console.log(user)
    })
  },
  mounted () {
    var nums = [1, 2, 3]
    console.log(Math.max.apply(Math, nums))
  },
  firebase: {
    equipments: equipmentRef,
    users: userRef,
    scan: scanRef,
    notis: notiRef,
    years: yearRef,
    historyDepartment: historyDepartmentRef,
    lendMax: lendMaxRef,
    bookEqm: bookEqmRef
  },
  methods: {
    bookEqmFnn (nameEqm) {
      console.log(nameEqm, 8888)
      this.nameEqmCalen = nameEqm
    },
    bookEqmFn (number, index) {
      this.numberEqm = number
      this.events = []
      this.arrayEvent = []
      document.getElementById('next').click()

      for (let i = 0; i < this.bookEqm.length; i++) {
        if (this.bookEqm[i].number === this.numberEqm && this.bookEqm[i].nameEqm === this.nameLend) {
          this.arrayEvent.push({
            title: 'ชื่อ-สกุล: ' + this.bookEqm[i].firstname + ' ' + this.bookEqm[i].lastname + ' แผนก: ' + this.bookEqm[i].department,
            start: this.bookEqm[i].startEvent,
            end: this.bookEqm[i].endEventMark,
            editable: false,
            backgroundColor: 'rgb(3,155,229)',
            borderColor: 'rgb(3,155,229)'
          })
        }
      }
      this.events = this.arrayEvent
    },
    eventCreated (...test) {
      this.checkMark = true
      this.events = test
      var arrayStart = []
      this.arrayEvent = []
      arrayStart = this.events[0].start
      var arrayEnd = []
      arrayEnd = this.events[0].end

      this.todayCheck = dateFormat(new Date(), 'yyyy-mm-dd')
      this.startEvent = dateFormat(arrayStart._d, 'yyyy-mm-dd')
      this.endEvent = dateFormat(arrayEnd._d, 'yyyy-mm-dd')
      this.timestampStart = arrayStart._i
      this.timestampEnd = arrayEnd._i
      // push Timestamp
      this.timestamp = []
      for (let i = this.timestampStart; i < this.timestampEnd; i += 86400000) {
        this.timestamp.push({
          timeS: i,
          date: dateFormat(i, 'yyyy-mm-dd')
        })
      }
      // แสดงช่วงเวลา เริ่มต้น - สิ้นสุด
      for (let i = 0; i < this.bookEqm.length; i++) {
        if (this.bookEqm[i].number === this.numberEqm && this.bookEqm[i].nameEqm === this.nameLend) {
          this.arrayEvent.push({
            title: 'ชื่อ-สกุล: ' + this.bookEqm[i].firstname + ' ' + this.bookEqm[i].lastname + ' แผนก: ' + this.bookEqm[i].department,
            start: this.bookEqm[i].startEvent,
            end: this.bookEqm[i].endEventMark,
            editable: false,
            backgroundColor: 'rgb(3,155,229)',
            borderColor: 'rgb(3,155,229)'
          })
        }
      }
      // ตรวจสอบวันซ้ำ
      var breakLoop = true
      console.log()
      for (let i = 0; i < this.bookEqm.length; i++) {
        if (this.bookEqm[i].number === this.numberEqm && this.bookEqm[i].nameEqm === this.nameLend) {
          for (let j = 0; j < this.timestamp.length; j++) {
            if (breakLoop) {
              for (let p = 0; p < this.bookEqm[i].timestamp.length; p++) {
                console.log(this.timestamp[j].date, this.bookEqm[i].timestamp[p].date)
                if (this.startEvent < this.todayCheck) {
                  alert('กรุณาเลือกช่วงวันที่ตั้งแต่ ปัจจุบันเป็นต้นไป')
                  this.checkMark = false
                  this.checkPush = false
                  breakLoop = false
                  break
                } else if (this.timestamp[j].date === this.bookEqm[i].timestamp[p].date) {
                  alert('ช่วงวันที่นี้ มีการจองแล้ว')
                  this.checkMark = false
                  this.checkPush = false
                  breakLoop = false
                  break
                }
              }
            }
          }
        }
      }
      // มาควัน
      if (this.checkMark) {
        this.arrayEvent.push({
          title: 'หมายเลขเครื่อง: ' + this.numberEqm,
          start: this.startEvent,
          end: this.endEvent,
          editable: false,
          backgroundColor: '#61c419',
          borderColor: '#61c419'
        })
        this.checkPush = true
      }
      this.events = this.arrayEvent
      console.log()
    },
    submitBook () {
      var iEnd = this.timestamp.length - 1
      if (this.checkPush) {
        var s = ''
        if (this.categoryLend === 'สนับสนุน') {
          s = 'SUP'
        } else if (this.categoryLend === 'วินิจฉัยและรักษา') {
          s = 'DXRX'
        } else if (this.categoryLend === 'รักษา') {
          s = 'RX'
        } else if (this.categoryLend === 'วินิจฉัย') {
          s = 'DX'
        }

        var getRandomInt = Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000
        var timestamp = new Date().getUTCMilliseconds()
        var id = getRandomInt + timestamp
        this.idLend = s + id
        bookEqmRef.push({
          idLend: this.idLend,
          title: 'หมายเลขเครื่อง: ' + this.numberEqm,
          number: this.numberEqm,
          startEvent: this.startEvent,
          endEventMark: this.endEvent,
          endEvent: this.timestamp[iEnd].date,
          nameEqm: this.nameLend,
          timestampStart: this.timestampStart,
          timestampEnd: this.timestamp[iEnd].timeS,
          timestamp: this.timestamp,
          status: 'รออนุมัติ',
          firstname: this.firstname,
          lastname: this.lastname,
          department: this.department
        })
        this.submitLend(this.idLend, this.numberEqm)
      }
    },
    setDate () {
      // this.today = new Date().toISOString().substr(0, 10)
      // document.querySelector('#myDate').value = this.today
      // document.getElementById('myDate').setAttribute('min', this.today)
    },
    submitLend (idLend, numberEqm) {
      this.user = auth.currentUser
      this.firstname = this.users.find(users => users.email === this.user.email).firstname
      this.lastname = this.users.find(users => users.email === this.user.email).lastname
      this.department = this.users.find(users => users.email === this.user.email).department
      this.email = this.users.find(users => users.email === this.user.email).email

      // var s = ''
      // if (this.categoryLend === 'สนับสนุน') {
      //   s = 'SUP'
      // } else if (this.categoryLend === 'วินิจฉัยและรักษา') {
      //   s = 'DXRX'
      // } else if (this.categoryLend === 'รักษา') {
      //   s = 'RX'
      // } else if (this.categoryLend === 'วินิจฉัย') {
      //   s = 'DX'
      // }

      if (this.amountLend < 0) {
        alert('กรุณากรอกข้อมูลให้ถูกต้อง')
      } else if (this.amountLend === '0' || this.amountLend === '') {
        alert('กรุณากรอกข้อมูลให้ถูกต้อง')
      } else if (this.amountLend > this.balanceLend) {
        alert('กรอกจำนวนเกิน')
      } else if (this.amountLend <= this.balanceLend) {
        // สร้างเลขที่การยืม
        // var getRandomInt = Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000
        // var timestamp = new Date().getUTCMilliseconds()
        // var id = getRandomInt + timestamp
        // var idLend = s + id

        // setDate
        var dd = this.today.substr(8, 2)
        var mm = this.today.substr(5, 2)
        var yyyy = this.today.substr(0, 4)
        this.timeLength = dd + '/' + mm + '/' + yyyy
        this.dateCheckReturn = mm + '/' + dd + '/' + yyyy

        // หาจำนวนวันว่ายืมไปกี่วัน
        var ii = this.timestamp.length - 1

        var y = dateFormat(this.timestamp[ii].timeS, 'yyyy') * 1
        var m = dateFormat(this.timestamp[ii].timeS, 'm') * 1
        var d = dateFormat(this.timestamp[ii].timeS, 'd') * 1
        var yNow = dateFormat(this.timestamp[0].timeS, 'yyyy') * 1
        var mNow = dateFormat(this.timestamp[0].timeS, 'm') * 1
        var dNow = dateFormat(this.timestamp[0].timeS, 'd') * 1
        var a = moment([y, m, d])
        var b = moment([yNow, mNow, dNow])
        this.amountDate = a.diff(b, 'days') + 1

        // --------------
        // this.balanceLend = this.balanceLend * 1 - this.amountLend * 1
        // this.borrowedLend = this.borrowedLend * 1 + this.amountLend * 1
        approvetableRef.push({
          HnNo: '-',
          nameLend: this.nameLend,
          amountLend: this.amountLend,
          categoryLend: this.categoryLend,
          dateLend: dateFormat(this.timestamp[0].timeS, 'dd/mm/yyyy'), // LTS
          dateBook: dateFormat(this.timestamp[ii].timeS, 'dd/mm/yyyy'),
          firstname: this.firstname,
          lastname: this.lastname,
          statusLend: this.statusLend,
          departmentLend: this.department,
          keyAppove: this.key,
          idLend: idLend,
          email: this.email,
          timeLength: dateFormat(this.timestamp[ii].timeS, 'dd/mm/yyyy'),
          dateCheckReturn: dateFormat(this.timestamp[ii].timeS, 'mm/dd/yyyy'),
          dateCheckRepair: this.dateCheckRepair,
          dateCheckCalibrate: this.dateCheckCalibrate,
          amountDate: this.amountDate,
          month: dateFormat(this.timestamp[0].timeS, 'mm'),
          year: dateFormat(this.timestamp[0].timeS, 'yyyy'),
          dateLendTs: this.timestamp[0].timeS,
          timeLengthTs: this.timestamp[ii].timeS,
          number: numberEqm
        })

        // year
        if (this.nameHitDepart === '') {
          historyDepartmentRef.push({
            department: this.department,
            nameEqm: this.nameLend,
            amount: this.amountLend * 1,
            check: 0
          })
          this.lendMaxDepart()
        } else {
          console.log('AA', this.nameHitDepart)
          for (let i = 0; i < this.historyDepartment.length; i++) {
            if (this.historyDepartment[i].nameEqm === this.nameLend && this.historyDepartment[i].department === this.department) {
              this.keyUpdateDepart = this.historyDepartment[i]['.key']
              this.amount = this.historyDepartment[i].amount * 1
              historyDepartmentRef.child(this.keyUpdateDepart).update({
                amount: this.amount + this.amountLend * 1
              })
              break
            } else if (i === this.historyDepartment.length - 1) {
              historyDepartmentRef.push({
                department: this.department,
                nameEqm: this.nameLend,
                amount: this.amountLend * 1,
                check: 0
              })
              break
            }
          }
          this.lendMaxDepart()
        }
        if (this.year === '') {
          console.log('GG')
          yearRef.push({
            year: moment().format('YYYY')
          })
        } else if (this.year !== moment().format('YYYY')) {
          console.log('AAA')
          yearRef.push({
            year: moment().format('YYYY')
          })
        }
        // End year

        // Noti
        if (this.approveNoti === '') {
          notiRef.push({
            approveNoti: this.approveNoti + 1
          })
        } else {
          notiRef.child(this.notiKeyUpdate).update({
            approveNoti: this.approveNoti + 1
          })
        }
        // EndNoti

        // equipmentRef.child(this.key).update({borrowedEqm: this.borrowedLend})
        // equipmentRef.child(this.key).update({balanceEqm: this.balanceLend})
        this.countTopTen = this.countTopTen * 1 + 1
        equipmentRef.child(this.key).update({countTopTen: this.countTopTen})
      } else {
        alert('กรุณากรอกข้อมูลให้ถูกต้อง')
      }
      this.approveNoti = 0 // clear ค่า approveNoti
      this.year = 0
    },
    lend (key, countTopTen, dateCheckRepair, dateCheckCalibrate) {
      this.nameLend = this.equipments.find(equipments => equipments['.key'] === key).nameEqm
      this.categoryLend = this.equipments.find(equipments => equipments['.key'] === key).categoryEqm
      this.unitLend = this.equipments.find(equipments => equipments['.key'] === key).unitEqm
      this.borrowedLend = this.equipments.find(equipments => equipments['.key'] === key).borrowedEqm
      this.balanceLend = this.equipments.find(equipments => equipments['.key'] === key).balanceEqm
      this.dateCheckRepair = this.equipments.find(equipments => equipments['.key'] === key).dateCheckRepair
      this.dateCheckCalibrate = this.equipments.find(equipments => equipments['.key'] === key).dateCheckCalibrate
      this.key = key
      // this.amountLend = ''
      this.HnNo = ''
      this.countTopTen = countTopTen
      this.approveNoti = this.notis.find(notis => notis).approveNoti
      this.approveNoti = this.approveNoti * 1
      this.notiKeyUpdate = this.notis.find(notis => notis['.key'])['.key']

      this.year = this.years[this.years.length - 1].year
      this.nameHitDepart = this.historyDepartment.find(historyDepartment => historyDepartment.nameEqm === this.nameLend).nameEqm
      console.log(moment().format('YYYY'), this.year)
    },
    removeEqm (key) {
      equipmentRef.child(key).remove()
    },
    submitLogout () {
      messaging.getToken().then((token) => messaging.deleteToken(token))
      userRef.child(this.keyPushNoti).update({
        keyPushNoti: ''
      })
      auth.signOut()
      this.$router.push('/')
    },
    lendMaxDepart () {
      // Sort
      var depart
      this.historyDepartment.forEach(historyDepartment => {
        if (historyDepartment.check === 0) {
          depart = historyDepartment.department
          console.log(depart)
          for (let i = 0; i < this.historyDepartment.length; i++) {
            if (this.historyDepartment[i].department === depart) {
              var key = this.historyDepartment[i]['.key']
              this.amountAAA = this.historyDepartment[i].amount
              this.arrayDevice.push({
                amount: this.amountAAA,
                department: this.historyDepartment[i].department,
                nameEqm: this.historyDepartment[i].nameEqm
              })
              historyDepartmentRef.child(key).update({
                check: 1
              })
            }
          }
        }
        if (this.arrayDevice.length !== 0) {
          this.arrayDevice.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount))
          this.arrayMaxDevice.push({
            amount: this.arrayDevice[this.arrayDevice.length - 1].amount,
            department: this.arrayDevice[this.arrayDevice.length - 1].department,
            nameEqm: this.arrayDevice[this.arrayDevice.length - 1].nameEqm
          })
        }
        this.arrayDevice = []
      })
      lendMaxRef.child('/').set(this.arrayMaxDevice)
      this.arrayMaxDevice = []

      for (let i = 0; i < this.historyDepartment.length; i++) {
        var key = this.historyDepartment[i]['.key']
        historyDepartmentRef.child(key).update({
          check: 0
        })
      }
       // End Sort
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
@import '~fullcalendar/dist/fullcalendar.css';
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

.BTNlend {
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
.BTNcancel {
  background-color: #EF5350;
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
  margin-right: 28px;
}

.comp-full-calendar {
  padding: 20px;
  background: #fff;
  max-width: 960px;
  margin: 0 auto;
  font-size: 18px;
}

.BTNstatus {
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
</style>
