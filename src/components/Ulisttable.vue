<template>
  <div>
    <div class="nav-header">
      <ul>
        <li class="topic">
          <p style="font-size:25px;border-bottom: 2px solid #ffffff"><b>รายการเครื่องมือที่ยืมมา</b></p>
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
          <p style="font-size:20px;margin-top:-45px;font-style:italic;color:#ffffff;">General user</p>
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
        <li>
          <i class="glyphicon glyphicon-wrench" style="font-size:25px;color:#ffffff;"></i>
          <router-link to="/ubookeqm">ยืมเครื่องมือแพทย์</router-link>
        </li>
        <li>
          <i class="fa fa-check-square-o" style="color:#ffffff;font-size:25px;"></i>
          <router-link to="/uapprove">รายการรออนุมัติ</router-link>
        </li>
        <li class="selected">
          <i class="glyphicon glyphicon-book" style="font-size:25px;"></i>
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
                  รายการเครื่องมือที่ยืมมา
                </h4>
                <!--TABLE!-->
                <br>
                <table class="table">
                  <thead>
                    <tr>
                      <th width="300px">ชื่ออุปกรณ์</th>
                      <th width="300px"  style="text-align: center;">เลขที่การยืม</th>
                      <th width="300px" style="text-align: center;">วันที่ยืม</th>
                      <th width="300px" style="text-align: center;">ยืมถึงวันที่</th>
                      <th width="300px" style="text-align: center;">หมายเลขเครื่อง</th>
                      <th width="300px" style="text-align: center;">สถานะ</th>
                      <th width="300px" style="text-align: center;">เลื่อนระยะวันยืม</th>
                      <th width="300px" style="text-align: center;">ส่งต่อให้กับผู้ใช้อื่น</th>
                      <th width="300px" style="text-align: center;">
                        <i class="fa fa-bell-o" style="font-size:25px;"></i>
                        <button v-if="user.noteNoti !== 0 && user.email === emailAuth" v-for="user of users" class="noti" style="margin-left:-12px;">
                          <p style="margin-top: -4px;">{{user.noteNoti}}</p>
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="scan.firstname == firstname && scan.lastname == lastname" v-for="(scan, index) of scans" v-bind:key="scan['.key']">
                        <td>{{scan.nameLend}}</td>
                        <td style="text-align: center;">{{scan.idLend}}</td>
                        <td style="text-align: center;">{{scan.dateLend}}</td>
                        <td style="text-align: center;" v-if="scan.updateTimeLength === ''">{{scan.timeLength}}</td>
                        <td style="text-align: center;color:black;" v-if="scan.updateTimeLength !== ''">{{scan.updateTimeLength}} <button v-bind:title="msg" @click="showUpdateTime(scan.dateLend, scan.timeLength, scan.updateTimeLength, scan.note, scan['.key'])" class="glyphicon glyphicon-exclamation-sign" data-toggle="modal" data-target="#updateTime" style="font-size:18px;border:none;background: #ffffff;"></button></td>
                        <td style="text-align: center;">{{scan.numberShow}}</td>
                        <td style="text-align: center;"><p v-if="scan.accepted === 0">ยังไม่รับ</p><p v-if="scan.accepted !== 0">รับแล้ว</p></td>
                        <td style="text-align: center;"><button @click="setDate(scan['.key'], scan.number, scan.idLend, scan.dateLend, scan.nameLend, scan.numberShow)" class="btn btn-primary dropdown-toggle BTNstatus" data-toggle="modal" data-target="#myModal">เลื่อนวัน</button></td>
                        <td style="text-align: center;"><button @click="forward(scan.idLend, scan.nameLend, scan.categoryLend, scan.keyRecive, scan.amountLend, scan.accepted, scan.forwardCound, scan['.key'], scan.dateCheckReturn, scan.dateCheckRepair, scan.amountDate, scan.month, scan.year, scan.dateCheckCalibrate, scan.numberShow, scan.timeLengthTs, scan.dateLendTs, scan.updateTimeLength, scan.timeLength)" class="glyphicon glyphicon-send" style="font-size:25px;background-color:#ffffff;border:none;color:rgb(79,195,247);" data-toggle="modal" data-target="#forward"></button></td>
                        <td style="text-align: center;" v-if="scan.agree !== ''">
                          <i @click="setAgree(scan['.key'], scan.email, scan.agree, scan.idLend, scan.nameLend, scan.noteReturn)" class="glyphicon glyphicon-list-alt" style="font-size:25px;background-color:#ffffff;border:none;color:rgb(79,195,247);" data-toggle="modal" data-target="#agree"></i>
                          <button v-if="scan.agree === 'ยังไม่รับทราบ'" class="noti2" style="margin-left:-12px;">
                           <i @click="setAgree(scan['.key'], scan.email, scan.agree, scan.idLend, scan.nameLend, scan.noteReturn)" style="margin-top: -4px;color:#d9534f;" class="glyphicon glyphicon-exclamation-sign" data-toggle="modal" data-target="#agree"></i>
                         </button>
                        </td>
                        <td v-if="scan.agree === ''" style="text-align: center;">
                          <i class="glyphicon glyphicon-list-alt" style="font-size:25px;background-color:#ffffff;border:none;color:rgb(79,195,247);"></i>
                        </td>
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

    <!-- เลื่อนวันยืม !-->
              <div class="modal fade" id="myModalnot" role="dialog">
                <div class="modal-dialog">
                  <!-- Modal content-->
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      <h4 class="modal-title" style="font-size:25px"><b>เลื่อนระยะวันยืม</b></h4>
                    </div>
                    <div class="modal-body">
                      <p style="color:#9A9A9A;font-size:20px;">วันที่ </p><h4 style="font-size:21px"></h4>
                      <input id="myDate" type="date" style="width:150px;border-radius:4px;border:none;font-size:21px;" min="" v-model="today"><br><br>

                      <p style="color:#9A9A9A;font-size:20px;">เหตุผล:</p>
                      <textarea style="width:300px;height:100px;font-size:20px;" v-model="note"></textarea>
                      <br><br>
                    </div>
                    <div class="modal-footer">
                      <!-- <button @click="updateTimeLengthFn()" type="button" class="btn btn-default BTNstatus" data-dismiss="modal">ตกลง</button> -->
                      <button @click="updateTimeLengthFn()" type="button" class="btn btn-default BTNstatus" data-dismiss="modal"><span class="glyphicon glyphicon-floppy-disk" style="font-size:16px;"></span> ตกลง</button>
                      <button type="button" class="btn btn-default BTNcancel" data-dismiss="modal"><span class="glyphicon glyphicon-remove" style="font-size:16px;"></span> ยกเลิก</button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- เลื่อนวันยืม !-->

              <!-- แสดงเลื่อนวันยืม !-->
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
                      <h4 style="font-size:21px">{{dateLend}} ถึง {{updateTime}}</h4><br>
                      <p style="color:#9A9A9A;font-size:20px;">เหตุผล:</p>
                      <textarea disabled style="width:300px;height:100px;font-size:20px;" v-model="note"></textarea>
                      <br><br>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-default BTNstatus" data-dismiss="modal">ปิด</button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- แสดงเลื่อนวันยืม !-->

              <!-- รับทราบเรียกคืนอุปกรณ์ !-->
              <div class="modal fade" id="agree" role="dialog">
                <div class="modal-dialog">
                  <!-- Modal content-->
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      <h4 class="modal-title" style="font-size:25px"><b>แจ้งคืนอุปกรณ์</b></h4>
                    </div>
                    <div class="modal-body">
                      <p style="color:#9A9A9A;font-size:20px;">เลขที่การยืม:</p><h4 style="font-size:21px"></h4>
                      <h4 style="font-size:21px">{{idLend}}</h4><br>
                      <p style="color:#9A9A9A;font-size:20px;">ชื่ออุปกรณ์:</p><h4 style="font-size:21px"></h4>
                      <h4 style="font-size:21px">{{nameLend}}</h4><br>
                      <p style="color:#9A9A9A;font-size:20px;">ข้อความจากศูนย์กลางเครื่องมือแพทย์:</p><h4 style="font-size:21px"></h4>
                      <textarea disabled style="width:300px;height:100px;font-size:20px;" v-model="noteReturn"></textarea>
                      <br><br>
                      <p style="color:#9A9A9A;font-size:20px;">สถานะ:</p><h4 style="font-size:21px"></h4>
                      <div class="dropdown" v-if="selectAgree === '' && agreeNoti === 'ยังไม่รับทราบ'">
                          <button class="btn btn-primary dropdown-toggle BTNstatus" type="button" data-toggle="dropdown" style="width:120px;background-color:#EF5350;">{{agreeNoti}}
                            <span class="caret"></span></button>                    
                            <ul class="dropdown-menu">                             
                              <li><a @click="selectAgreeFn('รับทราบแล้ว')" style="font-size:18px;">รับทราบ</a></li>
                            </ul>
                      </div>
                      <div v-if="selectAgree === 'รับทราบแล้ว' || agreeNoti === 'รับทราบแล้ว'"><button class="BTNstatus">รับทราบแล้ว</button></div>
                    </div>
                    <div class="modal-footer">
                      <button @click="agree()" type="button" class="btn btn-default BTNstatus" data-dismiss="modal">ตกลง</button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- รับทราบเรียกคืนอุปกรณ์ !-->

              <!-- หมด !-->
              <div class="modal fade" id="forward" role="dialog" v-if="forwardCound === 0">
                <div class="modal-dialog">
                  <!-- Modal content-->
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      <h4 class="modal-title" style="font-size:25px"><b>หมายเหตุ</b></h4>
                    </div>
                    <div class="modal-body">
                      <h4 class="modal-title" style="font-size:25px"><b>ไม่สามารถส่งต่ออุปกร์ให้กับผู้ใช้งานอืนได้ เนื่องจากยังไม่ได้ทำการรับอุปกรณ์ หรือส่งอุปกรณ์ให้กับผู้อื่นหมดแล้ว</b></h4>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-default BTNstatus" data-dismiss="modal" >ปิด</button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- หมด !-->

              <!-- ส่งต่อ (เลือกอุปกรณ์) !-->
              <div class="modal fade" id="forward" role="dialog" v-if="forwardCound !== 0">
                <div class="modal-dialog">
                  <!-- Modal content-->
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      <h4 class="modal-title" style="font-size:25px" v-if="accepted === 0"><b>หมายเหตุ</b></h4>
                      <h4 class="modal-title" style="font-size:25px" v-if="accepted !== 0"><b>ระบุจำนวน</b></h4>
                    </div>
                    <div class="modal-body">
                      <h4 class="modal-title" style="font-size:25px" v-if="accepted === 0"><b>กรุณารับอุปกรณ์ก่อน ถึงจะทำการส่งต่ออุปกรณ์ได้</b></h4>
                      <table class="table" v-if="accepted !== 0">
                        <thead>
                          <tr>
                            <th width="300">ชื่ออุปกรณ์</th>
                            <!-- <th width="150">ระยะเวลาการยืม</th> -->
                            <th width="150" style="text-align:center;">หมายเลขเครื่อง</th>
                            </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{{nameLendFoeward}}</td>
                            <!-- <td><input id="myDate2" type="date" style="width:150px;border-radius:4px;border:none;font-size:21px;" min="" v-model="dateForward"></td> -->
                            <!-- <td><input id="setAmount" min="" max="" type="number" v-model="amountLendeqm"></td> -->
                            <td style="text-align:center;">{{amountLend}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="modal-footer" v-if="accepted === 0">
                      <button type="button" class="btn btn-default BTNstatus" data-dismiss="modal" >ปิด</button>
                    </div>
                    <div class="modal-footer" v-if="accepted !== 0">
                      <button @click="nextFoeward()" type="button" class="btn btn-default BTNstatus">ถัดไป</button>
                      <i id="next" data-dismiss="modal" data-toggle="modal" data-target="#sumbitforward"></i>
                    </div>
                  </div>
                </div>
              </div>
              <!-- ส่งต่อ (เลือกอุปกรณ์) !-->

              <!-- ส่งต่อ (เลือกผู้รับ) !-->
              <div class="modal fade" id="sumbitforward" role="dialog">
                <div class="modal-dialog">
                  <!-- Modal content-->
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      <h4 class="modal-title" style="font-size:25px"><b>เลือกผู้รับ</b></h4>
                    </div>
                    <div class="modal-body">
                      <table class="table">
                        <thead>
                          <tr>
                            <th width="700px">ชื่อผู้รับ</th>
                            <th width="700px" style="text-align: center;">แผนก</th>
                            <th width="700px" style="text-align: center;">เลือก</th>
                            </tr>
                        </thead>
                        <tbody>
                          <tr v-for="user of users" v-if="user.status === 'user' && user.email !== emailAuth">
                            <td>{{user.firstname}} {{user.lastname}}</td>
                            <td style="text-align: center;">{{user.department}}</td>
                            <td style="text-align: center;"><button @click="submitForward(user.firstname, user.lastname, user.department, user.email)" type="button" class="btn btn-default BTNstatus" data-dismiss="modal">เลือก</button></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-default BTNstatus" data-dismiss="modal">ปิด</button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- ส่งต่อ (เลือกผู้รับ)!-->
                 <!-- Book (ช่วงเวลา) !-->
              <div class="modal fade" id="myModal" role="dialog">
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
                      <button @click="updateTimeLengthFn()" type="button" class="btn btn-default" data-dismiss="modal" style="width:85px;font-size: 18px;">ตกลง</button>
                      <button type="button" class="btn btn-default" data-dismiss="modal" style="width:85px;font-size: 18px;">ยกเลิก</button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Book (ช่วงเวลา)!-->

  </div>
</template>

<script>
import {equipmentRef, auth, userRef, approvetableRef, scanRef, messaging, historyRef, bookEqmRef} from './firebase'
import moment from 'moment'
import dateFormat from 'dateformat'
import 'fullcalendar/dist/locale/th'

export default {
  name: 'ulisttable',
  data () {
    return {
      category: '',
      unitEqm: '',
      categoryEqm: '',
      nameEqm: '',
      amountEqm: '',
      names: '',
      firstname: '',
      lastname: '',

      today: '',
      key: '',
      note: '',
      updateTimeLength: '',

      dateLend: '',
      updateTime: '',
      keyPushNoti: '',
      keyAgree: '',
      emailAgree: '',
      KeyemailAgree: '',
      noteNoti: '',
      emailAuth: '',
      agreeNoti: '',
      selectAgree: '',
      idLend: '',
      nameLend: '',
      noteReturn: '',
      forwardEqms: [],
      number: '',
      nameLendFoeward: '',

      dateForward: '',
      TimeLength: '',
      amountLendeqm: '',
      categoryLend: '',
      keyAppove: '',
      amountLend: '',
      accepted: '',
      formIdlend: '',
      forwardCound: '',
      forwardKey: '',
      arrayCheckReturn: '',
      idLendHit: '',
      arrayHit: [],
      keyHit: '',
      dateCheckReturn: '',
      dateCheckRepair: '',
      returnedEqm: '',
      keyHitt: '',
      amountDate: '',
      date: '',
      dateNow: '',
      month: '',
      year: '',
      dateCheckCalibrate: '',
      // fullCalendar
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
      UpdatestartEvent: '',
      UpdateendEvent: '',
      UpdatestartEventTs: '',
      UpdateEndEvent: '',
      UpdateEndEventMark: '',
      UpdateendEventTs: '',
      keyBook: '',
      numberShow: '',
      timeLengthTs: '',
      dateLendTs: '',
      updateTimeLengthSend: '',
      formBook: ''
    }
  },
  created () {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.firstname = this.users.find(users => users.email === user.email).firstname
        this.lastname = this.users.find(users => users.email === user.email).lastname
        this.keyPushNoti = this.users.find(users => users.email === user.email)['.key']
        this.emailAuth = user.email
      } else {
        console.log('not logged in')
      }
    })
  },
  firebase: {
    equipments: equipmentRef,
    users: userRef,
    approvetables: approvetableRef,
    scans: scanRef,
    historys: historyRef,
    bookEqm: bookEqmRef
  },
  computed: {
    realtimeplus: function () {
      return this.num1
    }
  },
  methods: {
    forward (idLend, nameLend, categoryLend, keyRecive, amountLend, accepted, forwardCound, forwardKey, dateCheckReturn, dateCheckRepair, amountDate, month, year, dateCheckCalibrate, numberShow, timeLengthTs, dateLendTs, updateTimeLength, timeLength) {
      this.amountLendeqm = ''
      this.categoryLend = categoryLend
      this.nameLendFoeward = nameLend
      this.keyAppove = keyRecive
      this.amountLend = amountLend
      this.accepted = accepted
      this.formIdlend = idLend
      this.forwardCound = forwardCound
      this.forwardKey = forwardKey
      this.dateCheckReturn = dateCheckReturn
      this.dateCheckRepair = dateCheckRepair
      this.dateCheckCalibrate = dateCheckCalibrate
      this.amountDate = amountDate
      this.month = month
      this.year = year

      this.numberShow = numberShow
      this.timeLengthTs = timeLengthTs
      this.dateLendTs = dateLendTs
      if (updateTimeLength === '') {
        this.updateTimeLengthSend = timeLength
      } else {
        this.updateTimeLengthSend = updateTimeLength
      }
      console.log(this.forwardCound)

      /* this.number = this.historys.find(historys => historys.idLend === idLend).returnedDate
      this.forwardEqms = this.number */

      this.dateForward = new Date().toISOString().substr(0, 10)
      document.querySelector('#myDate').value = this.dateForward
      console.log(this.dateForward)
      document.getElementById('myDate2').setAttribute('min', this.dateForward)
      document.getElementById('setAmount').setAttribute('min', 1)
      document.getElementById('setAmount').setAttribute('max', forwardCound)
       // this.dateForward = dateForward
      // this.returnedEqm = this.historys.find(history => history.idLend === this.formIdlend).returnedEqm
      // this.keyHitt = this.historys.find(history => history.idLend === this.formIdlend)['.key']
      // console.log(this.returnedEqm, this.keyHitt)
    },
    nextFoeward () {
      this.amountLendeqm = 1
      console.log(this.amountLend)
      if (this.amountLendeqm > this.accepted * 1) {
        alert('กรอกจำนวนเกิน')
      } else if (this.amountLendeqm <= 0 || this.amountLendeqm === '') {
        alert('กรุณากรอกข้อมูลให้ถูกต้อง')
      } else if (this.amountLendeqm > this.accepted) {
        alert('กรอกจำนวนเกิน')
      } else { document.getElementById('next').click() }
    },
    submitForward (firstname, lastname, department, email) {
      if (this.amountLendeqm <= 0) {
        alert('กรุณากรอกข้อมูลให้ถูกต้อง')
      } else {
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
        // สร้างเลขที่การยืม
        if (this.amountLendeqm > this.amountLend) {
          alert('กรุณากรอกข้อมูลให้ถูกต้อง')
        } else {
          var getRandomInt = Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000
          var timestamp = new Date().getUTCMilliseconds()
          var id = getRandomInt + timestamp
          var idLend = s + id
          // setDate
          var dd = this.dateForward.substr(8, 2)
          var mm = this.dateForward.substr(5, 2)
          var yyyy = this.dateForward.substr(0, 4)
          this.TimeLength = dd + '/' + mm + '/' + yyyy
          this.forwardCound = this.forwardCound - this.amountLendeqm

          // this.returnedEqm = this.returnedEqm * 1 + this.amountLendeqm * 1
          // console.log(this.returnedEqm, this.keyHitt)
          // historyRef.child(this.keyHitt).update({
          //   returnedEqm: this.returnedEqm
          // })
          scanRef.child(this.forwardKey).update({
            forwardCound: this.forwardCound
          })
          scanRef.push({
            HnNo: '-',
            amountLend: this.amountLendeqm,
            amountDate: this.amountDate,
            month: this.month,
            year: this.year,
            categoryLend: this.categoryLend,
            dateLend: moment().format('DD/MM/YYYY'),
            timeLength: this.updateTimeLengthSend,
            departmentLend: department,
            firstname: firstname,
            lastname: lastname,
            nameLend: this.nameLendFoeward,
            balance: this.amountLendeqm,
            accepted: 0,
            keyRecive: this.keyAppove,
            idLend: idLend,
            forwardCound: 0,
            borrowedTo: 0,
            updateTimeLength: '',
            email: email,
            agree: '',
            dateCheckReturn: this.dateCheckReturn,
            dateCheckRepair: this.dateCheckRepair,
            dateCheckCalibrate: this.dateCheckCalibrate,
            formIdlend: this.formIdlend,
            number: [
              {number: ''}
            ],
            dateLendTs: this.dateLendTs,
            timeLengthTs: this.timeLengthTs,
            numberShow: this.numberShow
          })
          this.formBook = this.bookEqm.find(bookEqm => bookEqm.idLend === this.formIdlend)['.key']
          bookEqmRef.child(this.formBook).update({
            idLend: idLend,
            status: 'อนุมัติ',
            firstname: firstname,
            lastname: lastname,
            department: department
          })
        }
      }
    },
    setAgree (key, email, agree, idLend, nameLend, noteReturn) {
      this.keyAgree = key
      this.KeyemailAgree = this.users.find(users => users.email === email)['.key']
      this.noteNoti = this.users.find(users => users.email === email).noteNoti
      this.agreeNoti = agree
      this.selectAgree = ''
      this.idLend = idLend
      this.nameLend = nameLend
      this.noteReturn = noteReturn
    },
    selectAgreeFn (selectAgree) {
      this.selectAgree = selectAgree
      console.log(this.selectAgree)
    },
    agree () {
      if (this.selectAgree !== '') {
        scanRef.child(this.keyAgree).update({
          agree: this.selectAgree
        })
      }
      if (this.agreeNoti === 'ยังไม่รับทราบ' && this.selectAgree !== '') {
        this.noteNoti = this.noteNoti - 1
        console.log(this.noteNoti)
        userRef.child(this.KeyemailAgree).update({
          noteNoti: this.noteNoti
        })
      }
    },
    showUpdateTime (dateLend, timeLength, updateTimeLength, note, key) {
      this.dateLend = dateLend.substr(0, 10)
      this.timeLength = timeLength
      this.updateTime = updateTimeLength
      this.note = note
      this.key = key
    },
    setDate (key, number, idLend, dateLend, nameLend, numberShow) {
      this.dateNow = ''
      this.today = new Date().toISOString().substr(0, 10)
      document.querySelector('#myDate').value = this.today
      document.getElementById('myDate').setAttribute('min', this.today)
      this.key = key
      this.note = ''
      this.arrayCheckReturn = number
      this.idLendHit = idLend

      this.date = dateLend
      this.nameLend = nameLend
      this.numberEqm = numberShow
      // //////////////////////
      this.events = []
      this.arrayEvent = []
      console.log(idLend)
      for (let i = 0; i < this.bookEqm.length; i++) {
        if (this.bookEqm[i].number === this.numberEqm && this.bookEqm[i].nameEqm === this.nameLend && this.idLendHit === this.bookEqm[i].idLend) {
          this.arrayEvent.push({
            title: 'ชื่อ-สกุล: ' + this.bookEqm[i].firstname + ' ' + this.bookEqm[i].lastname + ' แผนก: ' + this.bookEqm[i].department,
            start: this.bookEqm[i].startEvent,
            end: this.bookEqm[i].endEventMark,
            editable: false,
            backgroundColor: 'red',
            borderColor: 'red'
          })
          this.UpdatestartEvent = this.bookEqm[i].startEvent
          this.UpdateEndEventMark = this.bookEqm[i].endEventMark
          this.UpdateEndEvent = this.bookEqm[i].endEvent
          this.UpdatestartEventTs = this.bookEqm[i].timestampStart
          this.UpdateendEventTs = this.bookEqm[i].timestampEnd
        } else if (this.bookEqm[i].number === this.numberEqm && this.bookEqm[i].nameEqm === this.nameLend) {
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
      this.keyBook = this.bookEqm.find(bookEqm => bookEqm.idLend === this.idLendHit)['.key']
      console.log(this.keyBook)
      this.arrayHit = this.historys.find(historys => historys.idLend === this.idLendHit).returnedDate
      this.keyHit = this.historys.find(historys => historys.idLend === this.idLendHit)['.key']
    },
    eventCreated (...test) {
      this.checkMark = true
      this.events = test
      console.log(this.events)
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
      console.log(this.UpdatestartEventTs)
      // push Timestamp
      // this.timestamp = []
      // for (let i = this.timestampStart; i < this.timestampEnd; i += 86400000) {
      //   this.timestamp.push({
      //     timeS: i,
      //     date: dateFormat(i, 'yyyy-mm-dd')
      //   })
      // }
      // push Timestamp
      this.timestamp = []
      for (let i = this.UpdatestartEventTs; i < this.timestampEnd; i += 86400000) {
        this.timestamp.push({
          timeS: i,
          date: dateFormat(i, 'yyyy-mm-dd')
        })
      }
      // ตรวจสอบวันซ้ำ
      var breakLoop = true
      console.log()
      var todayTS = new Date(this.todayCheck).getTime()
      var startTs = new Date(this.startEvent).getTime()
      if (startTs < todayTS || this.timestampStart < this.UpdatestartEventTs) {
        alert('กรุณาเลือกช่วงวันที่ตั้งแต่ ปัจจุบันเป็นต้นไป')
        // var i = this.timestamp.length - 1
        this.endEvent = this.UpdateEndEventMark
        this.endEventMark = this.UpdateEndEventMark
        // this.timestamp[i].date = 12
        console.log(this.endEvent)
        this.timestamp = []
        for (let i = this.UpdatestartEventTs; i <= this.UpdateendEventTs; i += 86400000) {
          this.timestamp.push({
            timeS: i,
            date: dateFormat(i, 'yyyy-mm-dd')
          })
        }
        console.log(this.timestamp, 55)
      } else {
        for (let i = 0; i < this.bookEqm.length; i++) {
          if (this.bookEqm[i].number === this.numberEqm && this.bookEqm[i].nameEqm === this.nameLend && this.bookEqm[i].idLend !== this.idLendHit) {
            for (let j = 0; j < this.timestamp.length; j++) {
              if (breakLoop) {
                for (let p = 0; p < this.bookEqm[i].timestamp.length; p++) {
                  if (startTs < todayTS) {
                    alert('กรุณาเลือกช่วงวันที่ตั้งแต่ ปัจจุบันเป็นต้นไป')
                    this.checkMark = false
                    this.checkPush = false
                    breakLoop = false
                    break
                  } else if (this.timestamp[j].date === this.bookEqm[i].timestamp[p].date) {
                    alert('ช่วงวันที่นี้ มีการจองแล้ว กรุณาจองช่วงอื่น')
                    this.checkMark = false
                    this.checkPush = false
                    breakLoop = false
                    this.endEvent = this.UpdateEndEventMark
                    for (let i = this.UpdatestartEventTs; i <= this.UpdateendEventTs; i += 86400000) {
                      this.timestamp.push({
                        timeS: i,
                        date: dateFormat(i, 'yyyy-mm-dd')
                      })
                    }
                    break
                  }
                }
              }
            }
          }
        }
      }
      // มาควัน
      if (this.checkMark) {
        // แสดงช่วงเวลา เริ่มต้น - สิ้นสุด
        for (let i = 0; i < this.bookEqm.length; i++) {
          if (this.bookEqm[i].number === this.numberEqm && this.bookEqm[i].nameEqm === this.nameLend && this.idLendHit === this.bookEqm[i].idLend) {
            this.arrayEvent.push({
              title: 'ชื่อ-สกุล: ' + this.bookEqm[i].firstname + ' ' + this.bookEqm[i].lastname + ' แผนก: ' + this.bookEqm[i].department,
              start: this.UpdatestartEvent,
              end: this.endEvent, // ***
              editable: false,
              backgroundColor: 'red',
              borderColor: 'red'
            })
          } else if (this.bookEqm[i].number === this.numberEqm && this.bookEqm[i].nameEqm === this.nameLend) {
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
        this.checkPush = true
      } else {
        for (let i = 0; i < this.bookEqm.length; i++) {
          if (this.bookEqm[i].number === this.numberEqm && this.bookEqm[i].nameEqm === this.nameLend && this.idLendHit === this.bookEqm[i].idLend) {
            this.arrayEvent.push({
              title: 'ชื่อ-สกุล: ' + this.bookEqm[i].firstname + ' ' + this.bookEqm[i].lastname + ' แผนก: ' + this.bookEqm[i].department,
              start: this.bookEqm[i].startEvent,
              end: this.bookEqm[i].endEventMark,
              editable: false,
              backgroundColor: 'red',
              borderColor: 'red'
            })
            // this.endEvent = this.bookEqm[i].endEventMark
          } else if (this.bookEqm[i].number === this.numberEqm && this.bookEqm[i].nameEqm === this.nameLend) {
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
      }
      this.events = this.arrayEvent
      // var ii = this.timestamp.length - 1
      console.log(this.endEvent, 555555)
    },
    updateTimeLengthFn () {
      // setDate
      var dd = this.today.substr(8, 2)
      var mm = this.today.substr(5, 2)
      var yyyy = this.today.substr(0, 4)
      this.updateTimeLength = dd + '/' + mm + '/' + yyyy
      this.dateCheckReturn = mm + '/' + dd + '/' + yyyy

      var ii = this.timestamp.length - 1
      var y = dateFormat(this.timestamp[ii].timeS, 'yyyy') * 1
      var m = dateFormat(this.timestamp[ii].timeS, 'mm') * 1
      var d = dateFormat(this.timestamp[ii].timeS, 'dd') * 1
      var dNow = this.date.substr(0, 2)
      var mNow = this.date.substr(3, 2)
      var yNow = this.date.substr(6, 4)
      this.dateNow = mNow + '/' + dNow + '/' + yNow
      var ydif = dateFormat(this.timestamp[0].timeS, 'yyyy') * 1
      var mdif = dateFormat(this.timestamp[0].timeS, 'mm') * 1
      var ddif = dateFormat(this.timestamp[0].timeS, 'dd') * 1
      var a = moment([y, m, d])
      var b = moment([ydif, mdif, ddif])
      this.amountDate = a.diff(b, 'days') + 1

      scanRef.child(this.key).update({
        updateTimeLength: dateFormat(this.timestamp[ii].timeS, 'dd/mm/yyyy'),
        dateCheckReturn: dateFormat(this.timestamp[ii].timeS, 'mm/dd/yyyy'),
        note: this.note,
        yessir: 'R',
        amountDate: this.amountDate,
        timeLengthTs: this.timestamp[ii].timeS
      })
      historyRef.child(this.keyHit).update({
        timeLength: dateFormat(this.timestamp[ii].timeS, 'dd/mm/yyyy'),
        dateCheckReturn: dateFormat(this.timestamp[ii].timeS, 'mm/dd/yyyy'),
        amountDate: this.amountDate,
        timeLengthTs: this.timestamp[ii].timeS
      })

      for (let i = 1; i < this.arrayCheckReturn.length; i++) {
        scanRef.child(this.key + '/number/' + [i]).update({
          dateCheckReturn: dateFormat(this.timestamp[ii].timeS, 'mm/dd/yyyy')
        })
      }
      for (let i = 1; i < this.arrayHit.length; i++) {
        historyRef.child(this.keyHit + '/returnedDate/' + [i]).update({
          dateCheckReturn: dateFormat(this.timestamp[ii].timeS, 'mm/dd/yyyy')
        })
      }
      // update BookEqm
      bookEqmRef.child(this.keyBook).update({
        timestamp: this.timestamp,
        timestampEnd: this.timestamp[ii].timeS,
        endEvent: this.timestamp[ii].date,
        endEventMark: this.endEvent
      })
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
      messaging.getToken().then((token) => messaging.deleteToken(token))
      userRef.child(this.keyPushNoti).update({
        keyPushNoti: ''
      })
      auth.signOut()
      this.$router.push('/')
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

.noti2 {
  height:20px;
  width:20px;
  border-radius:60px;
  border:none;
  color:#ffffff;
  background:#ffffff;
  font-size:16px;
  position:absolute;
  margin-left:-10px;
  margin-top:-5px;
}

input[type="number"] {
   width:50px;
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
