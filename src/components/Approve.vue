<template>
  <div>
    <div class="nav-header">
      <ul>
        <li class="topic">
          <p style="font-size:25px;border-bottom: 2px solid #ffffff"><b>รายการรออนุมัติ</b></p>
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
          <p style="font-size:20px;margin-top:-45px;font-style:italic;color: #ffffff;">Administrator</p>
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
        <li>
          <i class="fa fa-list-alt" style="color:#ffffff;font-size:25px;"></i>
          <router-link to="/listtable">รายการอุปกรณ์</router-link>
        </li>
        <li  class="selected">
          <i class="fa fa-check-square-o" style="font-size:25px;"></i>
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
          <div class="card">
            <div class="card-block">
              <h4 class="card-title" style="font-size:20px">
                แสดงรายการรออนุมัติ
              </h4>
              <!-- <p class="card-text">รวม : {{realtimeplus}} รายการ</p> !-->
              <!--TABLE!-->
              <br>
              <table class="table">
                <thead>
                  <tr>
                    <th width="250px">ชื่ออุปกรณ์</th>
                    <th width="150px" style="text-align: center;">เลขที่การยืม</th>
                    <th width="150px" style="text-align: center;">วันที่ยืม</th>
                    <th width="150px" style="text-align: center;">ยืมถึงวันที่</th>
                    <th width="150px" style="text-align: center;">ผู้ยืม</th>
                    <th width="150px" style="text-align: center;">แผนก</th>
                    <!-- <th width="150px" style="text-align: center;">HN No.</th> !-->
                    <th width="150px" style="text-align: center;">เลขเครื่อง</th>
                    <th width="150px" style="text-align: center;">สถานะการยืม</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(approvetable, index) of approvetables.slice().reverse()" v-bind:key="approvetable['.key']">
                      <td>{{approvetable.nameLend}}</td>
                      <td style="text-align: center;">{{approvetable.idLend}}</td>
                      <td style="text-align: center;">{{approvetable.dateLend}}</td>
                      <td style="text-align: center;">{{approvetable.timeLength}} <i class="glyphicon glyphicon-calendar" style="font-size:16px;" data-toggle="modal" data-target="#calendar" @click="bookEqmFn(approvetable.number, approvetable.nameLend, approvetable.idLend)"></i></td>
                      <td style="text-align: center;">{{approvetable.firstname}} {{approvetable.lastname}}</td>
                      <td style="text-align: center;">{{approvetable.departmentLend}}</td>
                      <!-- <td style="text-align: center;">{{approvetable.HnNo}}</td> !-->
                      <td style="text-align: center;">{{approvetable.number}}</td>
                      <td v-if="approvetable.statusLend === 'รออนุมัติ'" style="text-align:center;">
                        <div class="dropdown">
                          <button class="btn btn-primary dropdown-toggle BTNreturn" type="button" data-toggle="dropdown">{{approvetable.statusLend}}
                            <span class="caret"></span></button>                    
                            <ul class="dropdown-menu">                             
                              <li><a @click="status('อนุมัติ',approvetable['.key'])" style="font-size:18px;">อนุมัติ</a></li>
                              <li><a @click="status('ไม่อนุมัติ',approvetable['.key'])" style="font-size:18px;">ไม่อนุมัติ</a></li>
                            </ul>
                          </div>
                      </td>
                      <td v-if="approvetable.statusLend === 'อนุมัติ'" style="text-align:center;">  
                        <button class="btn btn-primary dropdown-toggle BTNreturn" style="background-color:rgb(92, 184, 92);"><span class="glyphicon glyphicon-ok" style="font-size:16px;"></span> {{approvetable.statusLend}}</button> 
                      </td>
                      <td v-if="approvetable.statusLend === 'ไม่อนุมัติ'" style="text-align:center;">
                        <button class="btn btn-primary dropdown-toggle BTNreturn" style="background-color:#EF5350;"><span class="glyphicon glyphicon-remove" style="font-size:16px;"></span>  {{approvetable.statusLend}}</button>
                      </td>
                  </tr>
                </tbody>
              </table>
            <!--TABLE!-->
            
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

                  <!-- Book (ช่วงเวลา) !-->
              <div class="modal fade" id="calendar" role="dialog">
                <div class="modal-dialog" style="width:1000px;">
                  <!-- Modal content-->
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      <h4 class="modal-title" style="font-size:25px"><b>เลือกช่วงวันที่</b></h4>
                    </div>
                    <div class="modal-body">
                      <div class="comp-full-calendar test-fc">
                        <full-calendar ref="calendar" @event-created="eventCreated" :config="config" :events="events" :header="header" :defaultView="defaultView"></full-calendar>
                      </div>
                      <!-- <input id="myDate" type="date" style="width:150px;border-radius:4px;border:none;font-size:21px;" min="" v-model="today">  -->
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-default" data-dismiss="modal" style="width:85px;font-size: 16px;">ปิด</button>
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
import {equipmentRef, auth, userRef, approvetableRef, lendRef, scanRef, notiRef, bookEqmRef, requestNotiRef} from './firebase'
// import moment from 'moment'
import 'fullcalendar/dist/locale/th'

export default {
  name: 'approve',
  data () {
    return {
      category: '',
      unitEqm: '',
      categoryEqm: '',
      user: '',
      firstname: '',
      lastname: '',
      statusLend: '',

      timeLengthTs: '',
      nameLendeqm: '',
      dateLendeqm: '',
      datetimeLength: '',
      firstnameeqm: '',
      lastnameeqm: '',
      departmentLendeqm: '',
      HnNoeqm: '',
      amountLendeqm: '',
      categoryLendeqm: '',
      keyAppove: '',
      balanceEqm: '',
      borrowedLend: '',

      firstnameAdmin: '',
      lastnameAdmin: '',
      email: '',
      password: '',
      confirmpassword: '',
      department: '',
      phoneNumber: '',
      statusCheck: '',
      idLend: '',
      sendMail: '',

      dateLendTs: '',
      numberShow: '',
      approveNoti: '',
      notiKeyUpdate: '',
      clearNotiApprove: '',
      dateCheckReturn: '',
      dateCheckRepair: '',
      amountDate: '',
      month: '',
      year: '',
      dateCheckCalibrate: '',
      keyBook: '',
      // fullCalendar
      defaultView: 'month',
      header: {
        left: 'prev, next today',
        center: 'title',
        right: 'month'
      },
      events: [],
      selected: [],
      arrayEvent: []
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
    approvetables: approvetableRef,
    lendeqm: lendRef,
    notis: notiRef,
    bookEqm: bookEqmRef,
    requestNotis: requestNotiRef
  },
  computed: {
    realtimeplus: function () {
      return this.num1
    }
  },
  methods: {
    bookEqmFn (number, nameEqm, idLend) {
      this.numberEqm = number
      this.events = []
      this.arrayEvent = []
      console.log(number, nameEqm)
      for (let i = 0; i < this.bookEqm.length; i++) {
        if (this.bookEqm[i].number === this.numberEqm && this.bookEqm[i].nameEqm === nameEqm && idLend === this.bookEqm[i].idLend) {
          this.arrayEvent.push({
            title: 'ชื่อ-สกุล: ' + this.bookEqm[i].firstname + ' ' + this.bookEqm[i].lastname + ' แผนก: ' + this.bookEqm[i].department,
            start: this.bookEqm[i].startEvent,
            end: this.bookEqm[i].endEventMark,
            editable: false,
            backgroundColor: 'red',
            borderColor: 'red'
          })
        } else if (this.bookEqm[i].number === this.numberEqm && this.bookEqm[i].nameEqm === nameEqm) {
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
    status (status, key) {
      approvetableRef.child(key).update({statusLend: status})

      this.categoryLendeqm = this.approvetables.find(approvetables => approvetables['.key'] === key).categoryLend
      this.idLend = this.approvetables.find(approvetables => approvetables['.key'] === key).idLend
      this.nameLendeqm = this.approvetables.find(approvetables => approvetables['.key'] === key).nameLend
      this.dateLendeqm = this.approvetables.find(approvetables => approvetables['.key'] === key).dateLend
      this.datetimeLength = this.approvetables.find(approvetables => approvetables['.key'] === key).timeLength
      this.firstnameeqm = this.approvetables.find(approvetables => approvetables['.key'] === key).firstname
      this.lastnameeqm = this.approvetables.find(approvetables => approvetables['.key'] === key).lastname
      this.sendMail = this.approvetables.find(approvetables => approvetables['.key'] === key).email
      this.departmentLendeqm = this.approvetables.find(approvetables => approvetables['.key'] === key).departmentLend
      this.HnNoeqm = this.approvetables.find(approvetables => approvetables['.key'] === key).HnNo
      this.amountLendeqm = this.approvetables.find(approvetables => approvetables['.key'] === key).amountLend
      this.keyAppove = this.approvetables.find(approvetables => approvetables['.key'] === key).keyAppove
      this.dateCheckReturn = this.approvetables.find(approvetables => approvetables['.key'] === key).dateCheckReturn
      this.dateCheckRepair = this.approvetables.find(approvetables => approvetables['.key'] === key).dateCheckRepair
      this.dateCheckCalibrate = this.approvetables.find(approvetables => approvetables['.key'] === key).dateCheckCalibrate
      this.amountDate = this.approvetables.find(approvetables => approvetables['.key'] === key).amountDate
      this.month = this.approvetables.find(approvetables => approvetables['.key'] === key).month
      this.year = this.approvetables.find(approvetables => approvetables['.key'] === key).year
      this.numberShow = this.approvetables.find(approvetables => approvetables['.key'] === key).number
      this.dateLendTs = this.approvetables.find(approvetables => approvetables['.key'] === key).dateLendTs
      this.timeLengthTs = this.approvetables.find(approvetables => approvetables['.key'] === key).timeLengthTs
      this.keyBook = this.bookEqm.find(bookEqm => bookEqm.idLend === this.idLend)['.key']
      if (status === 'อนุมัติ') {
        scanRef.push({
          HnNo: this.HnNoeqm,
          amountLend: this.amountLendeqm,
          amountDate: this.amountDate,
          categoryLend: this.categoryLendeqm,
          dateLend: this.dateLendeqm,
          timeLength: this.datetimeLength,
          departmentLend: this.departmentLendeqm,
          firstname: this.firstnameeqm,
          lastname: this.lastnameeqm,
          nameLend: this.nameLendeqm,
          balance: this.amountLendeqm,
          accepted: 0,
          keyRecive: this.keyAppove,
          formIdlend: '',
          forwardCound: 0,
          borrowedTo: 0,
          idLend: this.idLend,
          updateTimeLength: '',
          email: this.sendMail,
          agree: '',
          dateCheckReturn: this.dateCheckReturn,
          dateCheckRepair: this.dateCheckRepair,
          dateCheckCalibrate: this.dateCheckCalibrate,
          month: this.month,
          year: this.year,
          numberShow: this.numberShow,
          dateLendTs: this.dateLendTs,
          timeLengthTs: this.timeLengthTs,
          number: [
            {number: ''}
          ]
        })
        bookEqmRef.child(this.keyBook).update({
          status: status
        })
      } else {
        // this.balanceEqm = this.equipments.find(equipments => equipments['.key'] === this.keyAppove).balanceEqm
        // this.borrowedLend = this.equipments.find(equipments => equipments['.key'] === this.keyAppove).borrowedEqm
        // this.balanceEqm = this.balanceEqm * 1 + this.amountLendeqm * 1
        // this.borrowedLend = this.borrowedLend * 1 - this.amountLendeqm * 1
        console.log(this.keyBook)
        bookEqmRef.child(this.keyBook).remove()
        // equipmentRef.child(this.keyAppove).update({
        //   balanceEqm: this.balanceEqm,
        //   borrowedEqm: this.borrowedLend
        // })
      }
      this.approveNoti = this.notis.find(notis => notis).approveNoti
      this.notiKeyUpdate = this.notis.find(notis => notis['.key'])['.key']
      notiRef.child(this.notiKeyUpdate).update({
        approveNoti: this.approveNoti - 1
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
  width: 100px;
  height: 34px;
  border-radius: 4px;
  font-size: 14px;
  background: #5cb85c;
  color: #ffffff;
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

.BTNreturn {
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
</style>
