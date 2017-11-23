<template>
  <div>
    <div class="nav-header">
      <ul>
        <li class="topic">
          <p>รายการรออนุมัติ</p>
        </li>
        <li class="user-login">
          <p><a><span class="glyphicon glyphicon-log-in" style="padding-right:10px;color:#9A9A9A;"></span></a>{{firstname}} {{lastname}}</p>
        </li>
      </ul>
    </div>

    <nav>
      <p class="navbar-brand">UI SERVICE CARE</p>
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
        <li class="selected">
          <i class="fa fa-check-square-o" style="color:#ffffff;font-size:25px;"></i>
          <router-link to="/approve">รายการรออนุมัติ</router-link>
        </li>
        <li>
          <i class="fa fa-clipboard" style="color:#ffffff;font-size:25px;"></i>
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
          <a href="#">การแจ้งเตือน</a>
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
              <h4 class="card-title">
                แสดงรายการรออนุมัติ
              </h4>
              <!-- <p class="card-text">รวม : {{realtimeplus}} รายการ</p> !-->
              <!--TABLE!-->
              <br>
              <table class="table table-hover table-striped">
                <thead>
                  <tr>
                    <th width="700px">ชื่ออุปกรณ์</th>
                    <th width="118px">วันที่</th>
                    <th width="100px">ผู้ยืม</th>
                    <th width="100px">แผนก</th>
                    <th width="100px">HN No.</th>
                    <th width="100px">จำนวน</th>
                    <th width="100px" style="text-align: center;background: #9968db; color: #ffffff;">สถานะการยืม</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(approvetable, index) of approvetables" v-bind:key="approvetable['.key']">
                      <td>{{approvetable.nameLend}}</td>
                      <td>{{approvetable.dateLend}}</td>
                      <td>{{approvetable.firstname}} {{approvetable.lastname}}</td>
                      <td>{{approvetable.departmentLend}}</td>
                      <td>{{approvetable.HnNo}}</td>
                      <td>{{approvetable.amountLend}}</td>
                      <td>
                        <div class="dropdown">
                          <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style="background:#5cb85c;">{{approvetable.statusLend}}
                            <span class="caret"></span></button>
                            <ul class="dropdown-menu">
                              <li><a @click="status('อนุมัติ',approvetable['.key'])">อนุมัติ</a></li>
                              <li><a @click="status('ไม่อนุมัติ',approvetable['.key'])">ไม่อนุมัติ</a></li>
                            </ul>
                          </div>
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

  </div>
</template>

<script>
import {equipmentRef, auth, userRef, approvetableRef, lendRef, scanRef} from './firebase'

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

      nameLendeqm: '',
      dateLendeqm: '',
      firstnameeqm: '',
      lastnameeqm: '',
      departmentLendeqm: '',
      HnNoeqm: '',
      amountLendeqm: '',
      categoryLendeqm: ''
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
    lendeqm: lendRef
  },
  computed: {
    realtimeplus: function () {
      return this.num1
    }
  },
  methods: {
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
      this.nameLendeqm = this.approvetables.find(approvetables => approvetables['.key'] === key).nameLend
      this.dateLendeqm = this.approvetables.find(approvetables => approvetables['.key'] === key).dateLend
      this.firstnameeqm = this.approvetables.find(approvetables => approvetables['.key'] === key).firstname
      this.lastnameeqm = this.approvetables.find(approvetables => approvetables['.key'] === key).lastname
      this.departmentLendeqm = this.approvetables.find(approvetables => approvetables['.key'] === key).departmentLend
      this.HnNoeqm = this.approvetables.find(approvetables => approvetables['.key'] === key).HnNo
      this.amountLendeqm = this.approvetables.find(approvetables => approvetables['.key'] === key).amountLend
      if (status === 'อนุมัติ') {
        scanRef.push({
          HnNo: this.HnNoeqm,
          amountLend: this.amountLendeqm,
          categoryLend: this.categoryLendeqm,
          dateLend: this.dateLendeqm,
          departmentLend: this.departmentLendeqm,
          firstname: this.firstnameeqm,
          lastname: this.lastnameeqm,
          nameLend: this.nameLendeqm,
          balance: this.amountLendeqm,
          accepted: 0
        })
      }
    },
    removeEqm (key) {
      equipmentRef.child(key).remove()
    },
    submitLogout () {
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
  width: 82%;
  margin-left: 35px;
  border: 1px solid #dddddd;
}

.button-add {
  float: right;
  margin-left: 10px;
}

.content {
  margin-top: 60px;
  margin-left: 275px;
  width: 100%;
  padding: 20px 0px;
}
/*----------------------------------------------------------------------------------*/

/*------------------------------------- HEADER -------------------------------------*/
.nav-header {
  height: 60px;
  width: 100%;
  background: #ffffff;
  padding-left: 20px;
  display: inline-block;
  line-height: 60px;
  border: 1px solid #dddddd;
  bottom: 0;
  position: fixed;
  top: 0;
}

.nav-header ul li p {
  font-family: arial, sans-serif;
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
  padding-left: 270px;
  float: left;
  color: #9A9A9A;
}

.nav-header ul .user-login p {
  font-size: 16px;
}

.nav-header ul .topic p {
  font-size: 20px;
  color: #2c3e50;
}

.navbar-brand {
  color: #FFFFFF;
  line-height: 30px;
  padding-left: 50px;
  border-bottom: 1px solid #525d63;
  width: 100%;
  height: auto;
}
/*----------------------------------------------------------------------------------*/

/*--------------------------------------- MENU -------------------------------------*/
nav {
  width: 275px;
  background: #273238;
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
  margin-left: 10px;
  padding: 15px;
  width: 253px;
  border-radius: 4px;
}

.active-loguot {
  position: absolute;
  margin-left: 10px;
  width: 253px;
  bottom: 20px;
  background: rgba(255, 255, 255, 0.14);
  opacity: 1;
  color: #FFFFFF;
  border-radius: 4px;
}

nav ul li:hover {
  background: #434d52;
  transition: linear all 0.30s;
}

nav ul li a:hover {
  margin-left: 10px;
  transition: linear all 0.50s;
}

.selected {
  background: #596166;

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
  font-size: 14px;
}
</style>
