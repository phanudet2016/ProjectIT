<template>
  <div>
    <div class="nav-header">
      <ul>
        <li class="topic">
          <p style="font-size:25px;border-bottom: 2px solid #ffffff"><b>ยืมเครื่องมือแพทย์</b></p>
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
        <li  class="selected">
          <i class="glyphicon glyphicon-wrench" style="font-size:25px;"></i>
          <router-link to="/uhome">ยืมเครื่องมือแพทย์</router-link>
        </li>
        <li>
          <i class="glyphicon glyphicon-calendar" style="font-size:25px;"></i>
          <router-link to="/ubookeqm">จองเครื่องมือแพทย์</router-link>
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
                      <th width="150px" style="text-align: center;">ยืม</th>
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
                        <td style="text-align: center;"><button class="BTNlend" style="color:#ffffff;" data-toggle="modal" data-target="#myModal" @click="lend(equipment['.key'], equipment.countTopTen, equipment.dateCheckRepair, equipment.dateCheckCalibrate), setDate()">ยืม</button></td>
                      </tr>
                    </tbody>
                  </table>
              <!--TABLE!-->

              <!-- lend Device !-->
              <div class="modal fade" id="myModal" role="dialog">
                <div class="modal-dialog">
                  <!-- Modal content-->
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      <h4 class="modal-title" style="font-size:25px"><b>ยืมเครื่องมือแพทย์</b></h4>
                    </div>
                    <div class="modal-body">
                      <p style="color:#9A9A9A;font-size:20px;">ชื่ออุปกรณ์  </p><h4 style="font-size:21px">{{nameLend}}</h4> <br>
                      <p style="color:#9A9A9A;font-size:20px;">ประเภท  </p><h4 style="font-size:21px">{{categoryLend}}</h4><br>

                      <!--<p style="color:#9A9A9A;font-size:20px;">HN No.</p>
                      <input class="" type="text" placeholder="" style="width:300px;border-radius:4px;border:1px solid #ccc;font-size:21px;" v-model="HnNo"/><br><br> !-->

                      <p style="color:#9A9A9A;font-size:20px;">จำนวน</p>
                      <input class="" type="number" placeholder="" style="width:300px;border-radius:4px;border:1px solid #ccc;font-size:21px;" v-model="amountLend"/><br><br>

                      <p style="color:#9A9A9A;font-size:20px;">ระยะเวลาการยืม</p>
                      <input id="myDate" type="date" style="width:150px;border-radius:4px;border:none;font-size:21px;" min="" v-model="today">
                    </div>
                    <div class="modal-footer">
                      <button @click="submitLend()" type="button" class="btn btn-default BTNlend" data-dismiss="modal"><span class="glyphicon glyphicon-floppy-disk" style="font-size:16px;"></span> ตกลง</button>
                      <button type="button" class="btn btn-default BTNcancel" data-dismiss="modal"><span class="glyphicon glyphicon-remove" style="font-size:16px;"></span> ยกเลิก</button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- lend Device !-->

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {equipmentRef, auth, userRef, approvetableRef, scanRef, notiRef, yearRef, historyDepartmentRef, messaging, lendMaxRef} from './firebase'
import moment from 'moment'
import dateFormat from 'dateformat'

export default {
  name: 'uhome',
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
      amountLend: '',
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
      dateCheckCalibrate: ''
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
    lendMax: lendMaxRef
  },
  methods: {
    setDate () {
      this.today = new Date().toISOString().substr(0, 10)
      document.querySelector('#myDate').value = this.today
      document.getElementById('myDate').setAttribute('min', this.today)
    },
    submitLend () {
      this.user = auth.currentUser
      this.firstname = this.users.find(users => users.email === this.user.email).firstname
      this.lastname = this.users.find(users => users.email === this.user.email).lastname
      this.department = this.users.find(users => users.email === this.user.email).department
      this.email = this.users.find(users => users.email === this.user.email).email

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

      if (this.amountLend < 0) {
        alert('กรุณากรอกข้อมูลให้ถูกต้อง')
      } else if (this.amountLend === '0' || this.amountLend === '') {
        alert('กรุณากรอกข้อมูลให้ถูกต้อง')
      } else if (this.amountLend > this.balanceLend) {
        alert('กรอกจำนวนเกิน')
      } else if (this.amountLend <= this.balanceLend) {
        // สร้างเลขที่การยืม
        var getRandomInt = Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000
        var timestamp = new Date().getUTCMilliseconds()
        var id = getRandomInt + timestamp
        var idLend = s + id

        // setDate
        var dd = this.today.substr(8, 2)
        var mm = this.today.substr(5, 2)
        var yyyy = this.today.substr(0, 4)
        this.timeLength = dd + '/' + mm + '/' + yyyy
        this.dateCheckReturn = mm + '/' + dd + '/' + yyyy

        // หาจำนวนวันว่ายืมไปกี่วัน
        var y = dateFormat(this.dateCheckReturn, 'yyyy') * 1
        var m = dateFormat(this.dateCheckReturn, 'm') * 1
        var d = dateFormat(this.dateCheckReturn, 'd') * 1
        var yNow = dateFormat(new Date(), 'yyyy') * 1
        var mNow = dateFormat(new Date(), 'm') * 1
        var dNow = dateFormat(new Date(), 'd') * 1
        var a = moment([y, m, d])
        var b = moment([yNow, mNow, dNow])
        this.amountDate = a.diff(b, 'days') + 1

        // --------------
        this.balanceLend = this.balanceLend * 1 - this.amountLend * 1
        this.borrowedLend = this.borrowedLend * 1 + this.amountLend * 1
        approvetableRef.push({
          HnNo: '-',
          nameLend: this.nameLend,
          amountLend: this.amountLend,
          categoryLend: this.categoryLend,
          dateLend: moment().format('DD/MM/YYYY'), // LTS
          firstname: this.firstname,
          lastname: this.lastname,
          statusLend: this.statusLend,
          departmentLend: this.department,
          keyAppove: this.key,
          idLend: idLend,
          email: this.email,
          timeLength: this.timeLength,
          dateCheckReturn: this.dateCheckReturn,
          dateCheckRepair: this.dateCheckRepair,
          dateCheckCalibrate: this.dateCheckCalibrate,
          amountDate: this.amountDate,
          month: moment().format('MM'),
          year: moment().format('YYYY')
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
        // End year
        // for (let i = 0; i < this.historyDepartment.length; i++) {
        //   if (this.historyDepartment[i].nameEqm === this.nameLend) {
        //     this.keyUpdateDepart = this.historyDepartment[i]['.key']
        //     this.amount = this.historyDepartment[i].amount * 1
        //     historyDepartmentRef.child(this.keyUpdateDepart).update({
        //       amount: this.amount + this.amountLend * 1
        //     })
        //     break
        //   } else if (i === this.historyDepartment.length - 1 && this.nameLend !== this.historyDepartment[i].nameEqm) {
        //     console.log(555, this.amountLend)
        //     historyDepartmentRef.push({
        //       department: this.department,
        //       nameEqm: this.nameLend,
        //       amount: this.amountLend
        //     })
        //     break
        //   }
        // }

        // this.namefind = this.historyDepartment.find(historyDepartment => historyDepartment.nameEqm === this.nameLend).nameEqm
        // if (this.namefind === null) {
        //   historyDepartmentRef.push({
        //     department: this.department,
        //     nameEqm: this.nameLend,
        //     amount: this.amountLend * 1
        //   })
        // }
        // historyDepartmentRef.push({
        //   department: this.department,
        //   nameEqm: this.nameLend,
        //   amount: this.amountLend * 1
        // })
        // year
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

        equipmentRef.child(this.key).update({borrowedEqm: this.borrowedLend})
        equipmentRef.child(this.key).update({balanceEqm: this.balanceLend})
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
      this.amountLend = ''
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
</style>
