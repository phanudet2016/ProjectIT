<template>
  <div>
    <div class="nav-header">
      <ul>
        <li class="topic">
          <p style="font-size:25px;border-bottom: 2px solid #ffffff;"><b>ประวัติการยืม</b></p>
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
        <li class="selected">
          <i class="fa fa-clipboard" style="font-size:25px;"></i>
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
          <router-link to="/noti">การแจ้งเตือน</router-link>
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
                ประวัติการยืม
                <div class="button-add">
                  <input type="text" v-model="search" placeholder="ค้นหา..." v-on:keypress="" style="" class="searchEqm">
                </div>
              </h4>
              <!-- <p class="card-text">รวม : {{realtimeplus}} รายการ</p> !-->
              <!--TABLE!-->
              <br>
              <table class="table">
                <thead>
                  <tr scope="row">
                    <th style="text-align: left;width:300px;">ชื่ออุปกรณ์</th>
                    <th style="text-align: center;width:150px;">เลขที่การยืม</th>
                    <th style="text-align: center;width:150px;">วันที่ยืม</th>
                    <th style="text-align: center;width:150px;">ยืมถึงวันที่</th>
                    <th style="text-align: center;width:150px;">ชื่อผู้ยืม</th>
                    <th style="text-align: center;width:150px;">แผนก</th>
                    <th style="text-align: center;width:150px;">จำนวนที่ยืม</th>
                    <th style="text-align: center;width:150px;">คืนแล้ว</th>
                    <th style="text-align: center;width:150px;">ถูกยืมต่อ</th>
                    <th style="text-align: center;width:150px;">แจ้งกําหนดการคืน</th>
                    <th style="text-align: center;width:150px;">คืนอุปกรณ์</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(history, index) of searchEqm" v-bind:key="history['.key']">
                    <td style="text-align: left;"><router-link :to="'/lendhistoryeqm/' + history['.key']">{{history.nameEqm}}</router-link></td>
                    <td style="text-align: center;">{{history.idLend}}</td>
                    <td style="text-align: center;">{{history.date}}</td>
                    <td style="text-align: center;">{{history.timeLength}}</td>
                    <td style="text-align: center;">{{history.firstname}} {{history.lastname}}</td>
                    <td style="text-align: center;">{{history.department}}</td>
                    <td style="text-align: center;">{{history.amount}}</td>
                    <td style="text-align: center;">{{history.returnedEqm}}</td>
                    <td style="text-align: center;">{{history.borrowedTo}}</td>
                    <td style="text-align: center;">
                      <button class="BTNreturn" style="color:#ffffff;" data-toggle="modal" data-target="#sendEmail" @click="setDate(history['.key']), setDatatoEmail(history.email, history.nameEqm, history.firstname, history.lastname, history.department, history.idLend)">แจ้ง</button>
                    
                    {{tokensss}}
                    </td>
                    <td v-if="history.amount !== history.returnedEqm + history.borrowedTo * 1" style="text-align: center;"><button @click="returnItem(history['.key'], history.nameEqm, history.returnKey)" class="btn btn-primary dropdown-toggle BTNreturn" type="button" data-toggle="modal" data-target="#returnItem" style="background:rgb(92, 184, 92);;width:100px;">คืนอุปกรณ์</button></td>
                    <td v-if="history.amount === history.returnedEqm + history.borrowedTo * 1" style="text-align: center;"><b>คืนอุปกรณ์ครบแล้ว</b></td>
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

    <!-- ADD returnItem !-->
    <div class="modal fade" id="returnItem" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title" style="font-size:25px"><b>{{nameEqm}}</b></h4>
          </div>
          <div class="modal-body">
            <table class="table">
              <thead>
                <tr>
                  <th width="700px">หมายเลขเครื่อง</th>
                  <th width="700px">สถานะ</th>
                  <th width="700px" style="text-align: center;">คืน</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(arrayReturnItems, index) in arrayReturnItem" v-if="arrayReturnItems.number !== ''">
                  <td>{{arrayReturnItems.number}}</td>
                  <td>{{arrayReturnItems.status}}</td>
                  <td style="text-align: center;" v-if="arrayReturnItems.status === 'ยังไม่ส่งคืน'">
                    <button @click="getReturnItem(index, arrayReturnItems.indexReturn)" class="btn btn-primary BTNreturn" type="button" style="background:rgb(92, 184, 92);;width:100px;" data-dismiss="modal">คืนอุปกรณ์</button>
                  </td>
                  <td v-if="arrayReturnItems.status === 'ส่งคืนแล้ว'" style="text-align: center;">
                    <button class="btn btn-primary" type="button" style="background: #9968db; color: #ffffff;font-size:20px;">คืนอุปกรณ์แล้ว</button>
                  </td>              
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" style="width:100px;" class="btn btn-default BTNreturn" data-dismiss="modal">ปิด</button>
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

    <!-- sendEmail !-->
    <div class="modal fade" id="sendEmail" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title" style="font-size:25px"><b>แจ้งคืนอุปกรณ์</b></h4>
          </div>
          <div class="modal-body">
            <input id="myDate" type="date" class="inputDate" v-model="send_Date">
          </div>
          <div class="modal-footer">
            <button @click="sendDate()" type="button" style="width:100px;" class="btn btn-default BTNreturn" data-dismiss="modal">ตกลง</button>
          </div>
        </div>
      </div>
    </div>    
    <!-- sendEmail !-->

  </div>
</template>

<script>
import {equipmentRef, auth, userRef, historyRef, notiRef, messaging} from './firebase'
import PostsService from '@/services/PostsService'

export default {
  name: 'lendhistory',
  data () {
    return {
      user: 'Admin',
      num: 0,
      num1: 1,
      num2: 2,
      category: '',
      unitEqm: '',
      categoryEqm: '',
      firstname: '',
      lastname: '',
      em: '',
      search: '',

      firstnameAdmin: '',
      lastnameAdmin: '',
      email: '',
      password: '',
      confirmpassword: '',
      department: '',
      phoneNumber: '',
      statusCheck: '',
      arrayReturnItem: [],

      nameEqm: '',
      returnKey: '',
      amountScan: '',
      returnedScan: '',
      balanceReturn: '',
      borrowedReturn: '',
      keyEqm: '',

      send_Date: '',
      today: '',
      keyDate: '',
      tokensss: '',
      // sendMail data
      title: '',
      subject: '',
      description: '',
      sendNameEqm: '',
      sendFirstname: '',
      sendLastname: '',
      sendDepartment: ''
    }
  },
  created () {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.em = user.email
        this.firstname = this.users.find(users => users.email === user.email).firstname
        this.lastname = this.users.find(users => users.email === user.email).lastname
      } else {
        console.log('not logged in')
      }
    })
  },
  mounted () {
  },
  firebase: {
    equipments: equipmentRef,
    users: userRef,
    historys: historyRef,
    notis: notiRef
  },
  methods: {
    async sendEmail () {
      await PostsService.sendEmail({
        to: this.email,
        subject: this.subject,
        description: this.description
      })
    },
    sss () {
      setInterval(function () {
        console.log('gg')
      }, 1000)
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
    requestPermis () {
      messaging.requestPermission()
        .then(function () {
          console.log('Notification permission granted.')
    // TODO(developer): Retrieve a Instance ID token for use with FCM.
    // …
        })
        .catch(function (err) {
          console.log('Unable to get permission to notify. ', err)
        })
    },
    showToken () {
      messaging.getToken()
        .then((token) => {
          console.log(token)
          this.tokensss = token
          console.log(this.tokensss)
        })
        // .then((token) => messaging.deleteToken(token))
        .catch(function (err) {
          console.log('An error occurred while retrieving token. ', err)
        })
    },
    unSubscribe () {
      messaging.getToken().then((token) => messaging.deleteToken(token))
    },
    pushNoti () {
      var key = 'AAAA4bK2kl4:APA91bFR7PZECT41pWYQombjRUs1Dt6WCEckWRvmWI188WhrgfZ5VnOoC2M_Ddn7qCOtRdtcKVDfcQBGDcG38NP6ODEoI1YKdWTG3pux-0HeJRGe0xYfkpXgeobJ7sY6NaXzQ1wXe6UK'
      var to = 'cpesA6EVYfA:APA91bFKyIlhhNzv8N7kXPVJk9J_NkwEtdwh6T-omLZEF6En6mQoFSn4H5KqhIT_OfNzYzuAQ74FswUZRbk11TObSJIbBj1RtmMhi4-ICPjpJ4aV0uakEl-hgadCihaOC0joiFHy_IfK'
      var notification = {
        title: 'คืน',
        body: '555',
        click_action: 'https://upim-b7cf4.firebaseapp.com/',
        icon: '/logo.png'
      }
      fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
          Authorization: 'key=' + key,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          notification: notification,
          to: to
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
    setDate (keyDate) {
      this.today = new Date().toISOString().substr(0, 10)
      document.querySelector('#myDate').value = this.today
      this.keyDate = keyDate
    },
    setDatatoEmail (email, nameEqm, firstname, lastname, department, idLend) {
      this.email = email
      this.sendNameEqm = nameEqm
      this.sendFirstname = firstname
      this.sendLastname = lastname
      this.sendDepartment = department
      this.sendIdLend = idLend
      this.subject = 'แจ้งกำหนดการคืนอุปกรณ์ทางการแพทย์'
    },
    sendDate () {
      if (this.send_Date === '') {
        historyRef.child(this.keyDate).update({
          dateReturn: this.today
        })
        this.description = this.sendNameEqm + ' ครบกำหนดการคืนในวันที่ ' + this.today + 'กรุณานำอุปกรณ์มาส่งคืนภายในวันที่กำหนด'
        this.sendEmail()
      } else if (this.send_Date !== '') {
        historyRef.child(this.keyDate).update({
          dateReturn: this.send_Date
        })
        this.description = 'เรียนคุณ ' + this.sendFirstname + ' ' + this.sendLastname + '<br>' + ' แผนก ' + this.sendDepartment + '<br><br>' + 'เลขที่การยืม ' + this.sendIdLend + '<br>' + this.sendNameEqm + ' ครบกำหนดการคืนในวันที่ ' + this.send_Date + ' กรุณานำอุปกรณ์มาส่งคืนภายในวันที่กำหนด'
        this.sendEmail()
      }
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
    },
    returnItem (key, nameEqm, returnKey) {
      this.nameEqm = nameEqm
      this.returnKey = returnKey
      this.keyEqm = key
      this.arrayReturnItem = this.historys.find(historys => historys['.key'] === key).returnedDate
    },
    getReturnItem (index, indexReturn) {
      equipmentRef.child(this.returnKey + '/equipmentID/' + [indexReturn]).update({
        status: 'พร้อมใช้งาน',
        nameLend: '',
        lastnameLend: ''
      })
      // this.eqmID = this.equipments.find(equipments => equipments['.key'] === this.returnKey).equipmentID[indexReturn].number
      this.amountScan = this.historys.find(history => history['.key'] === this.keyEqm).amount
      this.returnedScan = this.historys.find(history => history['.key'] === this.keyEqm).returnedEqm
      this.balanceReturn = this.equipments.find(equipments => equipments['.key'] === this.returnKey).balanceEqm
      this.borrowedReturn = this.equipments.find(equipments => equipments['.key'] === this.returnKey).borrowedEqm
      historyRef.child(this.keyEqm + '/returnedDate/' + [index]).update({
        // number: this.eqmID,
        date: new Date().toLocaleString(),
        status: 'ส่งคืนแล้ว'
      })
      this.borrowedReturn = this.borrowedReturn * 1 - 1
      this.balanceReturn = this.balanceReturn * 1 + 1
      this.amountScan = this.amountScan * 1
      this.returnedScan = this.returnedScan + 1
      if (this.returnedScan <= this.amountScan) {
        historyRef.child(this.keyEqm).update({
          returnedEqm: this.returnedScan
        })
        equipmentRef.child(this.returnKey).update({
          balanceEqm: this.balanceReturn,
          borrowedEqm: this.borrowedReturn
        })
      }
    }
  },
  computed: {
    searchEqm () {
      return this.historys.filter((historys) => {
        return historys.nameEqm.indexOf(this.search) > -1 || historys.firstname.indexOf(this.search) > -1 || historys.lastname.indexOf(this.search) > -1
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
  border: 1px solid #dddddd;
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
  border: 1px solid #dddddd;
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
.inputDate {
  font-family: 'PT Sans', sans-serif;
  font-size: 20px;
  display: block;
  padding: 0.5rem 1rem;
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
</style>
