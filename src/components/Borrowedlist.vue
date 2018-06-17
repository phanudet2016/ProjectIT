<template>
  <div>
    <div class="nav-header">
      <ul>
        <li class="topic">
          <p style="font-size:25px;border-bottom: 2px solid #ffffff"><b>รายการอุปกรณ์ที่ถูกยืมไป</b></p>
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
        <li>
          <i class="fa fa-check-square-o" style="color:#ffffff;font-size:25px;"></i>
          <button v-if="noti.approveNoti !== 0" v-for="noti of notis" class="noti" style="margin-left:-12px;">
            <p style="margin-top: -4px;"><b>{{noti.approveNoti}}</b></p>
          </button>
          <router-link to="/approve">รายการรออนุมัติ</router-link>
        </li>
        <li  class="selected">
          <i class="glyphicon glyphicon-send" style="font-size:25px;"></i>
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
                  รายการอุปกรณ์ที่ถูกยืมไป
                </h4>
                <!--TABLE!-->
                <br>
                <table class="table">
                  <thead>
                    <tr>
                      <th width="300px" style="text-align: left;">ชื่ออุปกรณ์</th>
                      <th width="150px" style="text-align: center;">เลขที่การยืม</th>
                      <th width="150px" style="text-align: center;">วันที่ยืม</th>
                      <th width="150px" style="text-align: center;">ยืมถึงวันที่</th>
                      <!-- <th width="150px" style="text-align: center;">ปฏิทิน</th> -->
                      <th width="150px" style="text-align: center;">ชื่อผู้ยืม</th>
                      <th width="150px" style="text-align: center;">หมายเลขเครื่อง</th>
                      <!-- <th width="150px" style="text-align: center;">รับแล้ว</th> -->
                      <th width="150px" style="text-align: center;">รับอุปกรณ์</th>
                      <th width="150px" style="text-align: center;">แจ้งคืนอุปกรณ์</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="scan of scans" v-bind:key="scan['.key']">
                        <td style="text-align: left;">{{scan.nameLend}}</td>
                        <td style="text-align: center;">{{scan.idLend}}</td>
                        <td style="text-align: center;">{{scan.dateLend}}</td>
                        <td style="text-align: center;" v-if="scan.updateTimeLength === ''">{{scan.timeLength}} </td>
                        <td style="text-align: center;color:red;" v-if="scan.updateTimeLength !== '' && scan.yessir === 'R'">{{scan.updateTimeLength}} <button v-bind:title="msg" @click="showUpdateTime(scan.dateLend, scan.timeLength, scan.updateTimeLength, scan.note, scan['.key'])" class="glyphicon glyphicon-exclamation-sign" data-toggle="modal" data-target="#updateTime" style="font-size:18px;border:none;background: #ffffff;"></button></td>
                        <td style="text-align: center;color:black;" v-if="scan.updateTimeLength !== '' && scan.yessir ==='B'">{{scan.updateTimeLength}} <button v-bind:title="msg" @click="showUpdateTime(scan.dateLend, scan.timeLength, scan.updateTimeLength, scan.note, scan['.key'])" class="glyphicon glyphicon-exclamation-sign" data-toggle="modal" data-target="#updateTime" style="font-size:18px;border:none;background: #ffffff;"></button></td>
                        <!-- <td style="text-align: center;"><i class="glyphicon glyphicon-calendar" style="font-size:16px;" data-toggle="modal" data-target="#calendar" @click="bookEqmFn(scan.numberShow, scan.nameLend, scan.idLend)"></i></td> -->
                        <td style="text-align: center;">{{scan.firstname}} {{scan.lastname}}</td>
                        <td style="text-align: center;">{{scan.numberShow}}</td>
                        <!-- <td style="text-align: center;"><p v-if="scan.accepted === 0">ยังไม่รับ</p><p v-if="scan.accepted !== 0">รับแล้ว</p></td> -->
                        <td v-if="scan.accepted !== scan.amountLend * 1" style="text-align: center;">
                          <button v-if="todayCheckTs < scan.dateLendTs" class="btn btn-primary dropdown-toggle BTNnotGet" type="button">ยังไม่ถึงวันรับ</button>
                          <button v-else-if="todayCheckTs > scan.timeLengthTs" class="btn btn-primary dropdown-toggle BTNnotGet" type="button" style="width:110px;">ไม่มารับอุปกรณ์</button>
                          <button v-else-if="todayCheckTs >= scan.dateLendTs" @click="receiveItem(scan.nameLend, scan.keyRecive, scan.firstname, scan.lastname, scan.email, scan['.key'], scan.formIdlend, scan.dateCheckReturn, scan.dateCheckRepair, scan.dateCheckCalibrate, scan.numberShow)" class="btn btn-primary dropdown-toggle BTNreturn" type="button" data-toggle="modal" data-target="#receiveItem" style="background:#5cb85c;">รับอุปกรณ์</button>
                        </td>

                        <td v-if="scan.accepted === scan.amountLend * 1" style="text-align: center;">
                           <!-- <button class="btn btn-primary dropdown-toggle BTNnotGet" type="button" v-if="todayCheckTs > scan.timeLengthTs && scan.accepted !== scan.amountLend * 1">ยังไม่ส่งคืน</button> -->
                           <b>รับอุปกรณ์แล้ว</b>
                        </td>
                        <td style="text-align: center;"><button class="BTNreturn" @click="setPushNoti(scan.email, scan.idLend, scan['.key'], scan.nameLend, scan.agree, scan.firstname, scan.lastname)" data-toggle="modal" data-target="#sendNoti" >แจ้งคืน</button></td>
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


   
    <div class="modal fade" role="dialog" id="receiveItem">
      <div class="modal-dialog" style="width:700px;">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title" style="font-size:25px"><b>{{nameEqm}}</b></h4>
          </div>
          <div class="modal-body">
            <table class="table" v-if="formIdlend === ''">
              <thead>
                <tr>
                  <th width="300px">รหัสอุปกรณ์</th>
                  <th width="700px" style="text-align: center;">หมายเลขเครื่อง</th>
                  <th width="700px">สถานะ</th>
                  <th width="400px">ผู้รับ (กรณีมารับแทน) <i @click="cancelRecipient()" class="glyphicon glyphicon-remove-circle" style="color:red;" v-if="removeIcon"></i></th>
                  <th width="300px" style="text-align: center;">รับ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(arrayEqms, index) in arrayEqm" v-if="arrayEqms.number === numberShow">
                  <td>{{arrayEqms.id}}</td>
                  <td style="text-align: center;">{{arrayEqms.number}}</td>
                  <td>{{arrayEqms.status}}</td>
                  <td>
                    <button v-if="hideButton" @click="recipientCheck()" class="btn btn-primary BTNreturn" type="button" style="background:#5cb85c;margin-left:20px;">คลิก</button>
                    <input type="text" class="form-control" style="font-size:20px;width:150px;" v-if="recipientBox" v-model="recipient">
                    <!-- <input type="text" class="form-control" style="font-size:20px" v-model="recipient" v-else-if="recipientBox"> -->
                  </td>
                  <td style="text-align: center;" v-if="arrayEqms.status === 'พร้อมใช้งาน'">
                    <button @click="getItem(index)" class="btn btn-primary BTNreturn" type="button" style="background:#5cb85c;" data-dismiss="modal">รับ</button>
                  </td>
                  <td v-if="arrayEqms.status === 'ถูกยืม'" style="text-align: center;">
                    <button class="btn btn-primary BTNreturn" style="background: #9968db; color: #ffffff;">รับแล้ว</button>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <table class="table" v-if="formIdlend !==''">
              <thead>
                <tr>
                  <th width="700px">หมายเลขเครื่อง</th>
                  <th width="700px" style="text-align: center;">รับ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(arrayEqms, index) in arrayEqm" v-if="arrayEqms.number !== ''">
                  <td>{{arrayEqms.number}}</td>
                  <td style="text-align: center;" v-if="arrayEqms.status === 'ยังไม่ส่งคืน'">
                    <button @click="getItem(arrayEqms.indexReturn, arrayEqms.number)" class="btn btn-primary BTNreturn" type="button" style="background:#5cb85c;" data-dismiss="modal">รับ</button>
                  </td>
                  <td v-if="arrayEqms.status === 'ถูกยืมต่อ'" style="text-align: center;">
                    <button class="btn btn-primary BTNreturn" style="background: #9968db; color: #ffffff;">รับแล้ว</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default BTNreturn" data-dismiss="modal">ปิด</button>
          </div>
        </div>
      </div>
    </div> 
 
    <!-- เลื่อนวันยืม !-->
              <div class="modal fade" id="updateTime" role="dialog">
                <div class="modal-dialog">
                  <!-- Modal content-->
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      <h4 class="modal-title" style="font-size:25px"><b>เลื่อนระยะวันยืม</b></h4>
                    </div>
                    <div class="modal-body">
                      <p style="color:#9A9A9A;font-size:20px;">จากเดิม: </p><h4 style="font-size:21px"></h4>
                      <h4 style="font-size:21px">{{dateLend}} ถึง {{timeLength}}</h4>
                      <p style="color:#9A9A9A;font-size:20px;">เป็นวันที่: </p><h4 style="font-size:21px"></h4>
                      <h4 style="font-size:21px">{{dateLend}} ถึง {{updateTimeLength}}</h4><br>
                      <!-- <p style="color:#9A9A9A;font-size:20px;">เหตุผล:</p>
                      <textarea disabled style="width:300px;height:100px;font-size:20px;" v-model="note"></textarea> -->
                      <br><br>
                    </div>
                    <div class="modal-footer">
                      <button @click="yesSir()" type="button" class="btn btn-default BTNreturn" data-dismiss="modal">รับทราบ</button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- เลื่อนวันยืม !-->
      
       <!-- แจ้งคืนอุปกรณ์ !-->
              <div class="modal fade" id="sendNoti" role="dialog">
                <div class="modal-dialog">
                  <!-- Modal content-->
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      <h4 class="modal-title" style="font-size:25px"><b>แจ้งคืนอุปกรณ์</b></h4>
                    </div>
                    <div class="modal-body">
                      <p style="color:#9A9A9A;font-size:20px;">เลขที่การยืม: </p><h4 style="font-size:21px">{{showIdLend}}</h4>
                      <h4 style="font-size:21px"></h4><br>
                      <p style="color:#9A9A9A;font-size:20px;">ชื่ออุปกรณ์: </p><h4 style="font-size:21px">{{nameLend}}</h4>
                      <h4 style="font-size:21px"></h4><br>
                      <p style="color:#9A9A9A;font-size:20px;">ชื่อผู้ยืม: </p><h4 style="font-size:21px">{{firstnameCont}} {{lastnameCont}}</h4>
                      <h4 style="font-size:21px"></h4><br>
                      <p style="color:#9A9A9A;font-size:20px;">เบอร์ติดต่อ: </p><h4 style="font-size:21px">{{phoneNumber}}</h4>
                      <h4 style="font-size:21px"></h4><br>
                      <p style="color:#9A9A9A;font-size:20px;">ข้อความ:</p><h4 style="font-size:21px"></h4>
                      <textarea style="width:300px;height:100px;font-size:20px;" v-model="noteReturn"></textarea>
                      <p style="color:#9A9A9A;font-size:20px;">สถานะ: </p><h4 style="font-size:21px">
                        <button class="btn btn-default BTNnotGet" v-if="statusAgree === 'ยังไม่รับทราบ'">{{statusAgree}}</button>
                        <button class="btn btn-default BTNreturn " v-if="statusAgree === 'รับทราบแล้ว'">{{statusAgree}}</button>
                      </h4>
                      <h4 style="font-size:21px"></h4><br>
                      <br><br>
                    </div>
                    <div class="modal-footer">
                      <button @click="sendNoti()" type="button" class="btn btn-default BTNreturn" data-dismiss="modal">ตกลง</button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- แจ้งคืนอุปกรณ์ !-->
                  <!-- Book (ช่วงเวลา) !-->

  </div>
</template>

<script>
import {equipmentRef, auth, userRef, approvetableRef, scanRef, historyRef, notiRef, messaging, bookEqmRef, requestNotiRef} from './firebase'
import moment from 'moment'
import dateFormat from 'dateformat'
import 'fullcalendar/dist/locale/th'

export default {
  name: 'ulisttable',
  data () {
    return {
      check: '',
      category: '',
      unitEqm: '',
      categoryEqm: '',
      nameEqm: '',
      amountEqm: '',
      names: '',
      firstname: '',
      lastname: '',
      arrayEqm: [],
      keyRecive: '',
      firstnameScan: '',
      lastnameScan: '',

      eqmID: '',
      balanceScan: '',
      acceptedScan: '',
      keyScan: '',
      amountScan: '',
      categoryhit: '',
      nameEqmHit: '',
      departmentHit: '',
      HnnoHit: '',
      dateHit: '',
      number: [],
      indexCheck: '',
      succus: '',
      idLend: '',
      email: '',
      numberShow: '',

      dateLend: '',
      timeLength: '',
      updateTimeLength: '',
      note: '',
      msg: 'เลื่อนระยะวันยืม',
      key: '',
      idLendYesSir: '',
      idLendHistorys: '',
      timeLengthHit: '',

      emailNoti: '',
      body: '',
      keyUser: '',
      noteNoti: '',
      emailNoteNoti: '',
      agree: '',
      notAgree: '',
      nameLend: '',
      showIdLend: '',
      statusAgree: '',
      noteReturn: 'ได้ยืมครบกำหนดแล้ว กรุณานำอุปกรณ์มาส่งคืนที่ศูนย์กลางเครื่องมือแพทย์',
      formIdlend: '',
      forwardCoundScan: '',
      status: '',
      keyFormIdlen: '',
      indexForward: '',
      arrayEqmHit: [],
      borrowedTo: '',
      keyUpdateScan: '',
      arrayEqmScan: '',
      indexUpdateScan: '',
      dateCheckReturn: '',
      dateCheckRepair: '',
      amountDate: '',
      mouth: '',
      year: '',
      dateCheckCalibrate: '',
      phoneNumber: '',
      firstnameCont: '',
      lastnameCont: '',
      balanceLend: '',
      borrowedLend: '',
      keyRemoveBook: '',
      dateLendC: '08/08/2018',
      todayCheck: '',
      todayCheckTs: '',
      recipient: '',
      recipientBox: false,
      removeIcon: false,
      hideButton: true,
      // fullCalendar
      defaultView: 'month',
      header: {
        left: 'prev, next today',
        center: 'title',
        right: 'month'
      },
      events: [],
      selected: [],
      arrayEvent: [],
      dateLendTs: '',
      timeLengthTs: ''
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
    this.todayCheck = dateFormat(new Date(), 'yyyy-mm-dd')
    this.todayCheckTs = new Date(this.todayCheck).getTime()
    // this.todayCheckTs = 1529848000000
    console.log(this.todayCheckTs)

    // ยกเลิกรายการจองแล้วไม่มารับ
    for (let i = 0; i < this.bookEqm.length; i++) {
      if (this.todayCheckTs > this.bookEqm[i].timestampEnd && this.bookEqm[i].status === 'อนุมัติ') {
        var key = this.bookEqm[i]['.key']
        bookEqmRef.child(key).remove()
      }
    }
  },
  firebase: {
    equipments: equipmentRef,
    users: userRef,
    approvetables: approvetableRef,
    scans: scanRef,
    historys: historyRef,
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
    test () {
      this.check = 'open'
    },
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
    setPushNoti (email, idLend, key, nameLend, agree, firstname, lastname) {
      this.emailNoteNoti = email
      this.emailNoti = this.users.find(users => users.email === email).keyPushNoti
      this.body = 'เลขที่การยืม: ' + idLend + ' ได้ยืมครบกำหนดแล้ว กรุณานำอุปกรณ์มาส่งคืนที่ศูนย์กลางเครื่องมือแพทย์'
      this.keyUser = this.users.find(users => users.email === email)['.key']
      this.agree = this.scans.find(scans => scans.idLend === idLend).agree
      this.notAgree = this.scans.find(scans => scans.idLend === idLend)['.key']
      this.nameLend = nameLend
      this.showIdLend = idLend
      this.statusAgree = agree
      this.phoneNumber = this.users.find(users => users.email === email).phoneNumber
      this.firstnameCont = firstname
      this.lastnameCont = lastname
    },
    sendNoti () {
      // sendNoti to webpage
      this.noteNoti = this.users.find(users => users.email === this.emailNoteNoti).noteNoti
      this.noteNoti = this.noteNoti * 1
      if (this.noteNoti === 0) {
        this.noteNoti = ''
      }
      if (this.noteNoti === '' && this.agree !== 'รับทราบแล้ว') {
        userRef.child(this.keyUser).update({
          noteNoti: this.noteNoti + 1
        })
        scanRef.child(this.notAgree).update({
          agree: 'ยังไม่รับทราบ',
          noteReturn: this.noteReturn
        })
      } else {
        if (this.agree === 'รับทราบแล้ว') {
        } else if (this.agree === '') {
          userRef.child(this.keyUser).update({
            noteNoti: this.noteNoti + 1
          })
          scanRef.child(this.notAgree).update({
            agree: 'ยังไม่รับทราบ',
            noteReturn: this.noteReturn
          })
        }
      }
      this.noteNoti = 0
     // EndNoti
      var serverKey = 'AAAA4bK2kl4:APA91bFR7PZECT41pWYQombjRUs1Dt6WCEckWRvmWI188WhrgfZ5VnOoC2M_Ddn7qCOtRdtcKVDfcQBGDcG38NP6ODEoI1YKdWTG3pux-0HeJRGe0xYfkpXgeobJ7sY6NaXzQ1wXe6UK'
      var notification = {
        title: 'ศูนย์กลางเครื่องมือแพทย์',
        body: this.body,
        click_action: 'https://projectospital.firebaseapp.com/#/',
        icon: '/196127.png'
      }
      fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
          Authorization: 'key=' + serverKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          notification: notification,
          to: this.emailNoti
        })
      }).then(function (response) {
        console.log(response)
      }).catch(function (error) {
        console.error(error)
      })
      messaging.onMessage(function (payload) {
        console.log('Message received. ', payload)
      })
    },
    yesSir (idLend) {
      scanRef.child(this.key).update({
        yessir: 'B'
      })
      this.idLendYesSir = this.scans.find(scans => scans['.key'] === this.key).idLend
      this.idLendHistorys = this.historys.find(historys => historys.idLend === this.idLendYesSir)['.key']
      historyRef.child(this.idLendHistorys).update({
        timeLength: this.updateTimeLength
      })
    },
    showUpdateTime (dateLend, timeLength, updateTimeLength, note, key) {
      this.dateLend = dateLend.substr(0, 10)
      this.timeLength = timeLength
      this.updateTimeLength = updateTimeLength
      this.note = note
      this.key = key
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
    removeEqm (key) {
      equipmentRef.child(key).remove()
    },
    submitLogout () {
      auth.signOut()
      this.$router.push('/')
    },
    receiveItem (nameEqm, keyRecive, firstname, lastname, email, key, formIdlend, dateCheckReturn, dateCheckRepair, dateCheckCalibrate, numberShow) {
      this.nameEqm = nameEqm
      this.keyRecive = keyRecive // keyEqm
      this.firstnameScan = firstname
      this.lastnameScan = lastname
      this.keyScan = key
      this.email = email
      this.formIdlend = formIdlend
      this.dateCheckReturn = dateCheckReturn
      this.dateCheckRepair = dateCheckRepair
      this.dateCheckCalibrate = dateCheckCalibrate
      this.numberShow = numberShow

      if (this.formIdlend !== '') {
        this.arrayEqm = this.scans.find(scans => scans.idLend === this.formIdlend).number
      } else {
        this.arrayEqm = this.equipments.find(equipments => equipments.nameEqm === nameEqm).equipmentID
      }
      this.recipientBox = false
      this.removeIcon = false
      this.hideButton = true
      this.recipient = ''
    },
    getItem (index, number) {
      console.log(index)
      equipmentRef.child(this.keyRecive + '/equipmentID/' + [index]).update({
        status: 'ถูกยืม',
        nameLend: this.firstnameScan,
        lastnameLend: this.lastnameScan
      })
      this.indexCheck = index
      this.eqmID = this.equipments.find(equipments => equipments['.key'] === this.keyRecive).equipmentID[index].number
      this.balanceScan = this.scans.find(scan => scan['.key'] === this.keyScan).balance
      this.acceptedScan = this.scans.find(scan => scan['.key'] === this.keyScan).accepted
      this.forwardCoundScan = this.scans.find(scan => scan['.key'] === this.keyScan).forwardCound
      // push history
      this.amountScan = this.scans.find(scan => scan['.key'] === this.keyScan).amountLend
      this.categoryhit = this.scans.find(scan => scan['.key'] === this.keyScan).categoryLend
      this.nameEqmHit = this.scans.find(scan => scan['.key'] === this.keyScan).nameLend
      this.departmentHit = this.scans.find(scan => scan['.key'] === this.keyScan).departmentLend
      this.HnnoHit = this.scans.find(scan => scan['.key'] === this.keyScan).HnNo
      this.dateHit = this.scans.find(scan => scan['.key'] === this.keyScan).dateLend
      this.timeLengthHit = this.scans.find(scan => scan['.key'] === this.keyScan).timeLength
      this.idLend = this.scans.find(scan => scan['.key'] === this.keyScan).idLend
      this.email = this.scans.find(scan => scan['.key'] === this.keyScan).email
      this.amountDate = this.scans.find(scan => scan['.key'] === this.keyScan).amountDate
      this.month = this.scans.find(scan => scan['.key'] === this.keyScan).month
      this.year = this.scans.find(scan => scan['.key'] === this.keyScan).year
      this.dateLendTs = this.scans.find(scan => scan['.key'] === this.keyScan).dateLendTs
      this.timeLengthTs = this.scans.find(scan => scan['.key'] === this.keyScan).timeLengthTs

      if (this.formIdlend !== '') {
        this.keyFormIdlen = this.historys.find(historys => historys.idLend === this.formIdlend)['.key']
        this.borrowedTo = this.historys.find(historys => historys.idLend === this.formIdlend).borrowedTo
        this.arrayEqmHit = this.historys.find(historys => historys.idLend === this.formIdlend).returnedDate
        this.indexForward = this.arrayEqmHit.findIndex(arrayEqmHit => arrayEqmHit.number === number)

        this.keyUpdateScan = this.scans.find(scans => scans.idLend === this.formIdlend)['.key']
        this.arrayEqmScan = this.scans.find(scans => scans.idLend === this.formIdlend).number
        this.indexUpdateScan = this.arrayEqmScan.findIndex(arrayEqmScan => arrayEqmScan.number === number)

        this.borrowedTo = this.borrowedTo + 1
        console.log(this.borrowedTo)
        historyRef.child(this.keyFormIdlen + '/returnedDate/' + [this.indexForward]).update({
          date: moment().format('DD/MM/YYYY LTS'),
          status: 'ถูกยืมต่อ'
        })
        scanRef.child(this.keyUpdateScan + '/number/' + [this.indexUpdateScan]).update({
          date: moment().format('DD/MM/YYYY LTS'),
          status: 'ถูกยืมต่อ'
        })
        historyRef.child(this.keyFormIdlen).update({
          borrowedTo: this.borrowedTo
        })
      }
      this.number = this.scans.find(scan => scan['.key'] === this.keyScan).number
      var insertNumber = {
        number: this.eqmID,
        date: '',
        status: 'ยังไม่ส่งคืน',
        indexReturn: this.indexCheck,
        dateCheckReturn: this.dateCheckReturn
      }
      this.number.push(insertNumber)

      // ////////////////////////////////////////////////////////////
      if (this.recipient === '') {
        this.recipient = this.firstnameScan + ' ' + this.lastnameScan
      } else {
        this.recipient = this.recipient
      }
      // ////////////////////////////////////////////////////////////

      this.amountScan = this.amountScan * 1
      this.acceptedScan = this.acceptedScan + 1
      this.balanceScan = this.balanceScan * 1 - 1
      this.forwardCoundScan = this.forwardCoundScan * 1 + 1
      if (this.acceptedScan >= this.amountScan) {
        this.acceptedSucsess = true
        historyRef.push({
          date: this.dateHit,
          nameEqm: this.nameEqmHit,
          firstname: this.firstnameScan,
          lastname: this.lastnameScan,
          amount: this.amountScan,
          category: this.categoryhit,
          department: this.departmentHit,
          HnNo: this.HnnoHit,
          returnedEqm: 0,
          borrowedTo: 0,
          returnedDate: this.number,
          returnKey: this.keyRecive,
          idLend: this.idLend,
          email: this.email,
          timeLength: this.timeLengthHit,
          dateCheckReturn: this.dateCheckReturn,
          dateCheckRepair: this.dateCheckRepair,
          dateCheckCalibrate: this.dateCheckCalibrate,
          status: 'ถูกยืม',
          amountDate: this.amountDate,
          month: this.month,
          year: this.year,
          numberShow: this.numberShow,
          recipient: this.recipient,
          dateLendTs: this.dateLendTs,
          timeLengthTs: this.timeLengthTs
        })
      }
      if (this.acceptedScan <= this.amountScan) {
        scanRef.child(this.keyScan).update({
          balance: this.balanceScan,
          accepted: this.acceptedScan,
          number: this.number,
          forwardCound: this.forwardCoundScan
        })
      }
      var keyUpdate = this.keyRecive
      this.balanceLend = this.equipments.find(equipments => equipments['.key'] === keyUpdate).balanceEqm
      this.borrowedLend = this.equipments.find(equipments => equipments['.key'] === keyUpdate).borrowedEqm
      this.keyRemoveBook = this.bookEqm.find(bookEqm => bookEqm.idLend === this.idLend)['.key']
      if (this.formIdlend === '') {
        this.balanceLend = this.balanceLend * 1 - 1
        this.borrowedLend = this.borrowedLend * 1 + 1
        equipmentRef.child(keyUpdate).update({borrowedEqm: this.borrowedLend})
        equipmentRef.child(keyUpdate).update({balanceEqm: this.balanceLend})
      }
      bookEqmRef.child(this.keyRemoveBook).update({status: 'รับแล้ว'})
    },
    recipientCheck () {
      this.recipientBox = true
      this.removeIcon = true
      this.hideButton = false
      this.recipient = ''
    },
    cancelRecipient () {
      this.recipientBox = false
      this.removeIcon = false
      this.hideButton = true
      this.recipient = this.firstnameScan + ' ' + this.lastnameScan
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
  margin-left: 48px;
  margin-right: 24px;
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

mark { 
    background-color: rgb(255,195,63);
    color: #ffffff;
}

.BTNnotGet {
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
}

.comp-full-calendar {
  padding: 20px;
  background: #fff;
  max-width: 960px;
  margin: 0 auto;
  font-size: 18px;
}
</style>
