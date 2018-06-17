<template>
  <div>
    <div class="nav-header">
      <ul>
        <li class="topic">
          <p style="font-size:25px;border-bottom: 2px solid #ffffff"><b>แจ้งความต้องการใช้อุปกรณ์ (กรณีอุปกรณ์ไม่เพียงพอ)</b></p>
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
        <li>
          <i class="glyphicon glyphicon-book" style="color:#ffffff;font-size:25px;"></i>
          <button v-if="user.noteNoti !== 0 && user.email === emailAuth" v-for="user of users" class="noti" style="margin-left:-12px;">
            <p style="margin-top: -4px;">{{user.noteNoti}}</p>
          </button>
          <router-link to="/ulisttable">รายการเครื่องมือที่ยืมมา</router-link>
        </li>
        <li class="selected">
          <i class="glyphicon glyphicon-send" style="font-size:25px;"></i>
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
                  แสดงรายการที่แจ้ง
                  <div class="button-add">
                    <button @click="setReuest()" type="button" class="BTNstatus" style="color:#ffffff;font-size:18px;width:150px;" data-toggle="modal" data-target="#myModal">
                    <span class="glyphicon glyphicon-plus"></span> แจ้งความต้องการ
                </button>

                  </div>
                </h4>
                <!--TABLE!-->
                <br>
                <table class="table">
                  <thead>
                    <tr>
                      <th width="100px">เลขที่การแจ้ง</th>
                      <th width="150px">วันที่แจ้ง</th>
                      <th width="300px">ชื่ออุปกรณ์</th>
                      <th width="150px" style="text-align: center;">ประเภท</th>
                      <th width="150px" style="text-align: center;">จำนวน</th>
                      <th width="150px" style="text-align: center;">ชื่อ - สกุล ผู้แจ้ง</th>
                      <th width="150px" style="text-align: center;">แผนก</th>
                      <th width="150px" style="text-align: center;">หมายเหตุ</th>
                      <th width="150px" style="text-align: center;">เบอร์ติดต่อ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="request of requests" v-if="request.firstname === firstname && request.lastname === lastname">
                      <td width="100px">{{request.idRequest}}</td>
                      <td width="150px">{{request.date}}</td>
                      <td>{{request.nameEqm}}</td>
                      <td width="150px" style="text-align: center;">{{request.category}}</td>
                      <td width="150px" style="text-align: center;">{{request.amountEqm}}</td>
                      <td width="150px" style="text-align: center;">{{request.firstname}} {{request.lastname}}</td>
                      <td width="150px" style="text-align: center;">{{request.department}}</td>
                      <td width="150px" style="text-align: center;">{{request.note}}</td>
                      <td width="150px" style="text-align: center;">{{request.contact}}</td>
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


              <div class="modal fade" id="myModal" role="dialog">
                <div class="modal-dialog">
                  <!-- Modal content-->
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      <h4 class="modal-title" style="font-size:25px"><b><i class="glyphicon glyphicon-send" style="font-size:25px;color:#000000;"></i> แจ้งความต้องการใช้อุปกรณ์</b></h4>
                    </div>
                    <div class="modal-body">
                      <p style="color:#9A9A9A;font-size:20px;margin-left:25px;">ชื่ออุปกรณ์  </p>
                      <input list="browsers" name="browser" class="" type="text" placeholder="" style="margin-left:25px;width:515px;border-radius:4px;border:1px solid #ccc;font-size:21px;" v-model="nameRequest"/><br><br>               
                      <datalist id="browsers">
                        <option v-for="equipment of equipments">{{equipment.nameEqm}}</option>
                      </datalist>
                      
                      
                      <p style="color:#9A9A9A;font-size:20px;margin-left:25px;">จำนวน</p>
                      <input class="" id="myAmount" type="number" placeholder="" style="margin-left:25px;width:515px;border-radius:4px;border:1px solid #ccc;font-size:21px;" v-model="amountRequest"/><br><br>

                      <p style="color:#9A9A9A;font-size:20px;margin-left:25px;">หมายเหตุ</p>
                      <textarea style="margin-left:25px;width:515px;height:90px;font-size:20px;" v-model="noteRequest"></textarea><br><br>

                      <p style="color:#9A9A9A;font-size:20px;margin-left:25px;">เบอร์ติดต่อ</p>
                      <input class="" id="myAmount" type="text" placeholder="" style="margin-left:25px;width:515px;border-radius:4px;border:1px solid #ccc;font-size:21px;" v-model="phoneNumber"/><br><br>
                    </div>
                    <div class="modal-footer">
                      <button @click="submitReuest()" type="button" class="btn btn-default BTNlend" data-dismiss="modal"><span class="glyphicon glyphicon-floppy-disk" style="font-size:16px;"></span> ตกลง</button>
                      <button type="button" class="btn btn-default BTNcancel" data-dismiss="modal"><span class="glyphicon glyphicon-remove" style="font-size:16px;"></span> ยกเลิก</button>
                    </div>
                  </div>
                </div>
              </div>

  </div>
</template>

<script>
import {equipmentRef, auth, userRef, approvetableRef, requestRef, yearRef, messaging, notiRef, requestNotiRef} from './firebase'
import moment from 'moment'

export default {
  name: 'urequest',
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
      keyPushNoti: '',
      emailAuth: '',

      amountRequest: '',
      nameRequest: '',
      noteRequest: '',
      department: '',
      phoneNumber: '',
      year: '',
      requestNoti: ''
    }
  },
  created () {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.firstname = this.users.find(users => users.email === user.email).firstname
        this.lastname = this.users.find(users => users.email === user.email).lastname
        this.department = this.users.find(users => users.email === user.email).department
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
    requests: requestRef,
    years: yearRef,
    notis: notiRef,
    requestNotis: requestNotiRef
  },
  computed: {
    realtimeplus: function () {
      return this.num1
    }
  },
  methods: {
    setReuest () {
      this.amountRequest = ''
      this.nameRequest = ''
      this.noteRequest = ''
      document.getElementById('myAmount').setAttribute('min', 1)
      this.phoneNumber = this.users.find(users => users.email === this.emailAuth).phoneNumber
      this.year = this.years[this.years.length - 1].year

      this.requestNoti = this.requestNotis[0].requestNoti
      this.requestNoti = this.requestNoti * 1
      // this.notiKeyUpdate = this.notis.find(notis => notis['.key'])['.key']
      console.log(this.requestNoti)
    },
    submitReuest () {
      console.log(this.nameRequest)
      this.category = this.equipments.find(equipment => equipment.nameEqm === this.nameRequest).categoryEqm
      var s = ''
      if (this.category === 'สนับสนุน') {
        s = 'SUP'
      } else if (this.category === 'วินิจฉัยและรักษา') {
        s = 'DXRX'
      } else if (this.category === 'รักษา') {
        s = 'RX'
      } else if (this.category === 'วินิจฉัย') {
        s = 'DX'
      }
      var getRandomInt = Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000
      var timestamp = new Date().getUTCMilliseconds()
      var id = getRandomInt + timestamp
      var idRequest = s + id

      if (this.noteRequest === '') {
        this.noteRequest = '-'
      }
      if (this.amountRequest === '' || this.nameRequest === '' || this.amountRequest <= 0) {
        alert('กรุณากรอกข้อมูลให้ถูกต้อง')
      } else {
        requestRef.push({
          year: moment().format('YYYY'),
          month: moment().format('MM'),
          date: moment().format('DD/MM/YYYY LTS'),
          nameEqm: this.nameRequest,
          amountEqm: this.amountRequest * 1,
          note: this.noteRequest,
          category: this.category,
          idRequest: idRequest,
          department: this.department,
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.emailAuth,
          contact: this.phoneNumber,
          status: 'ยังไม่รับทราบ',
          check: 0
        })
      }
      this.sumAmount = 0

      // for (let i = 0; i < this.searchEqm.length; i++) {
      //   if (this.searchEqm[i].check === 0) {
      //     for (let p = 0; p < this.searchEqm.length; p++) {
      //       if (this.searchEqm[i].nameEqm === this.searchEqm[p].nameEqm) {
      //         this.sumAmount = this.sumAmount + this.searchEqm[p].amountEqm

      //         var key = this.searchEqm[p]['.key']
      //         requestRef.child(key).update({
      //           check: 1
      //         })
      //       }
      //     }
      //   }
      // }
      // for (let i = 0; i < this.requests.length; i++) {
      //   var keyUpdate = this.requests[i]['.key']
      //   requestRef.child(keyUpdate).update({
      //     check: 0
      //   })
      // }
      // year
      if (this.year === '') {
        yearRef.push({
          year: moment().format('YYYY')
        })
      } else if (this.year !== moment().format('YYYY')) {
        yearRef.push({
          year: moment().format('YYYY')
        })
      }
       // End year
      this.year = 0

      if (this.requestNoti === '') {
        requestNotiRef.child('requestNoti').set({
          requestNoti: this.requestNoti + 1
        })
      } else {
        requestNotiRef.child('requestNoti').set({
          requestNoti: this.requestNoti + 1
        })
      }
        // EndNoti
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
/*--------------------------------------- CONTENT ----------------------------------*/
.card {
  padding: .75rem 1.25rem;
  margin-bottom: 0;
  background-color: #ffffff;
  border-bottom: 1px solid rgba(0,0,0,.125);
  border-radius: 4px;
  margin-right: 24px;
  margin-left: 48px;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1), 0 1px 20px 0 rgba(0, 0, 0, 0.19);;
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
</style>
