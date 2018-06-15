<template>
  <div>
    <div class="nav-header">
      <ul>
        <li class="topic">
          <p><router-link to="/lendhistory" style="font-size:25px;color:#ffffff;">ประวัติการยืม  </router-link></p>
        </li>
        <li class="topic" style="padding-left: 10px;">
          <p style="font-size:25px; border-bottom: 2px solid #ffffff"><b>{{nameEqm}}</b></p>
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
          <i class="fa fa-bar-chart" style="color:#ffffff;font-size:25px;"></i>
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
          <div class="col-md-9">
          <div class="card">
            <div class="card-block">
              <h4 class="card-title" style="font-size:20px">
                {{nameEqm}}
              </h4>

              <br>
              <table class="table">
                <thead>
                  <tr>
                    <th width="100px">วันที่คืน</th>
                    <th width="100px" style="text-align:center;">หมายเลขเครื่อง</th>
                    <th width="100px" style="text-align:center;">สถานะ</th>
                    <!-- <th width="100px" style="text-align:center;">แจ้งคืนอุปกรณ์</th> !-->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="arrayEqms in arrayEqm" v-if="arrayEqms.number !== ''">
                    <td>{{arrayEqms.date}}</td>
                    <td style="text-align:center;">{{arrayEqms.number}}</td>
                    <td style="text-align:center;">{{arrayEqms.status}}</td>
                    <!-- <td style="text-align:center;">
                      <button class="btn btn-primary dropdown-toggle BTNreturn" data-toggle="modal" data-target="#sendEmail" @click="setDate(), setDatatoEmail(arrayEqms.number)">แจ้งคืน</button>
                    </td> !-->
                  </tr>
                </tbody>
              </table>

            </div>
          </div>
          </div>
          <!--
          <div class="col-sm-3">
          <div class="card">
            <div class="card-block">
              <h4 class="card-title">
                แสดงรายการเครื่องมือที่เปิดให้ยืมss
              </h4>
            </div>
          </div>
          </div>!-->
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
            <button @click="sendDate()" type="button" style="width:100px;font-size:16px" class="btn btn-default" data-dismiss="modal">ตกลง</button>
          </div>
        </div>
      </div>
    </div>    
    <!-- sendEmail !-->

  </div>
</template>

<script>
import {equipmentRef, auth, userRef, historyRef} from './firebase'
import PostsService from '@/services/PostsService'

export default {
  name: 'lendhistoryeqm',
  data () {
    return {
      name: '',
      category: '',
      amountEqm: '',
      count: '',
      nameEqm: '',
      unitEqm: '',
      categoryEqm: '',
      firstname: '',
      lastname: '',
      editName: '',
      editCategory: '',
      editID: '',
      key: '',
      arrayEqm: [],
      msgLogout: 'ออกจากระบบ',

      firstnameAdmin: '',
      lastnameAdmin: '',
      email: '',
      password: '',
      confirmpassword: '',
      department: '',
      phoneNumber: '',
      statusCheck: '',

      send_Date: '',
      today: '',
      keyDate: '',
      // sendMail data
      sendNameEqm: '',
      sendFirstname: '',
      sendLastname: '',
      sendDepartment: '',
      sendIdLend: '',
      subject: '',
      description: '',
      numberEqm: ''
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
    this.arrayEqm = this.historys.find(historys => historys['.key'] === this.$route.params.id).returnedDate
    this.nameEqm = this.historys.find(historys => historys['.key'] === this.$route.params.id).nameEqm
  },
  firebase: {
    equipments: equipmentRef,
    users: userRef,
    historys: historyRef
  },
  methods: {
    async sendEmail () {
      await PostsService.sendEmail({
        to: this.email,
        subject: this.subject,
        description: this.description
      })
    },
    setDate () {
      this.today = new Date().toISOString().substr(0, 10)
      document.querySelector('#myDate').value = this.today
    },
    setDatatoEmail (number) {
      this.email = this.historys.find(historys => historys['.key'] === this.$route.params.id).email
      this.sendNameEqm = this.historys.find(historys => historys['.key'] === this.$route.params.id).nameEqm
      this.sendFirstname = this.historys.find(historys => historys['.key'] === this.$route.params.id).firstname
      this.sendLastname = this.historys.find(historys => historys['.key'] === this.$route.params.id).lastname
      this.sendDepartment = this.historys.find(historys => historys['.key'] === this.$route.params.id).department
      this.sendIdLend = this.historys.find(historys => historys['.key'] === this.$route.params.id).idLend
      this.subject = 'แจ้งกำหนดการคืนอุปกรณ์ทางการแพทย์'
      this.numberEqm = number
    },
    sendDate () {
      if (this.send_Date === '') {
        historyRef.child(this.$route.params.id).update({
          dateReturn: this.today
        })
        this.description = 'เรียนคุณ: ' + this.sendFirstname + ' ' + this.sendLastname + '<br>' + ' แผนก: ' + this.sendDepartment + '<br><br>' + 'เลขที่การยืม: ' + this.sendIdLend + '<br>' + 'หมายเลขเครื่อง: ' + this.numberEqm + '<br> ' + 'ชื่ออุปกรณ์: ' + this.sendNameEqm + '<br> ' + ' ครบกำหนดการคืนในวันที่ ' + this.today + ' กรุณานำอุปกรณ์มาส่งคืนภายในวันที่กำหนด'
        this.sendEmail()
        this.send_Date = ''
      } else if (this.send_Date !== '') {
        historyRef.child(this.$route.params.id).update({
          dateReturn: this.send_Date
        })
        this.description = 'เรียนคุณ: ' + this.sendFirstname + ' ' + this.sendLastname + '<br>' + ' แผนก: ' + this.sendDepartment + '<br><br>' + 'เลขที่การยืม: ' + this.sendIdLend + '<br>' + 'หมายเลขเครื่อง: ' + this.numberEqm + '<br> ' + 'ชื่ออุปกรณ์: ' + this.sendNameEqm + '<br> ' + ' ครบกำหนดการคืนในวันที่ ' + this.send_Date + ' กรุณานำอุปกรณ์มาส่งคืนภายในวันที่กำหนด'
        this.sendEmail()
        this.send_Date = ''
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
    }
  }
}
</script>

<style scoped>
/*--------------------------------------- CONTENT ----------------------------------*/
.row {
  width: 80%;
}
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
