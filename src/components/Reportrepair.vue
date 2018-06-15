<template>
  <div>
    <div  v-if="print === 'page'">
    <div class="nav-header">
      <ul>
        <li class="topic">
          <p style="font-size:25px;border-bottom: 2px solid #ffffff"><b>รายงานการยืม<i style="font-size:0px;">{{ggg}}</i></b></p>
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
        <li>
          <i class="fa fa-clipboard" style="color:#ffffff;font-size:25px;"></i>
          <router-link to="/lendhistory">ประวัติการยืม</router-link>
        </li>
        <li class="selected">
          <i class="fa fa-bar-chart" style="font-size:25px;"></i>
          <router-link to="/report">รายงานสถิติ</router-link>
        </li>
        <li class="active-loguot">
          <i class="glyphicon glyphicon-off" style="color:red;font-size:25px;"></i>
          <a href="#" @click="submitLogout()">ออกจากระบบ</a>
        </li>
      </ul>
    </nav>
    <!-- <div class="container">
      <ul>
        <li>
          <div class="title">อุปกรณ์ที่เลยกำหนดการคืน</div>
          <center><canvas id="mybarChart" width="770" height="385" style="display: block; width: 770px; height: 385px;"></canvas></center>
        </li>
      </ul>
    </div> -->

    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md">
            <router-link to="/report">
              <button style="margin-left:62px;border:1px solid #dddddd;height:40px;width:140px;color:#000000;background:#E0E0E0;font-size:16px">
                <span></span>
                <b>รายงานการยืม</b>
              </button>
            </router-link>
            <router-link to="/reportrepair">
              <button style="margin-left:2px;background:#ffffff;border:1px solid #dddddd;height:40px;background:#ffffff;width:130px;color:#000000;font-size:16px">
                <span></span>
                <b>รายงานการส่งซ่อม</b>
              </button>
            </router-link>
            <router-link to="/reportlack">
              <button style="margin-left:2px;border:1px solid #dddddd;height:40px;background:#E0E0E0;width:180px;color:#000000;font-size:16px">
                <span></span>
                <b>รายงานการขาดแคลนอุปกรณ์</b>
              </button>
            </router-link>
            <router-link to="/reportmax">
              <button style="margin-left:2px;background:#E0E0E0;border:1px solid #dddddd;height:40px;width:180px;color:#000000;font-size:16px">
                <span></span>
                <b>รายงานการยืมของแผนก</b>
              </button>
            </router-link>
          <div class="card">
            <div class="card-block">
              <h4 class="card-title">
                รายงานข้อมูลการส่งซ่อมอุปกรณ์ทางการแพทย์ ของแต่ละอุปกรณ์
                <div class="button-add">
                  <select class="selectBox" v-model="search" style="font-size:20px">
                    <option disabled value="">เดือน</option>
                    <option value="01">มกราคม</option>
                    <option value="02">กุมภาพันธ์</option>
                    <option value="03">มีนาคม</option>
                    <option value="04">เมษายน</option>
                    <option value="05">พฤษภาคม </option>
                    <option value="06">มิถุนายน</option>
                    <option value="07">กรกฎาคม</option>
                    <option value="08">สิงหาคม</option>
                    <option value="09">กันยายน</option>
                    <option value="10">ตุลาคม</option>
                    <option value="11">พฤศจิกายน</option>
                    <option value="12">ธันวาคม</option>
                    <option value="">ทั้งหมด</option>
                  </select>
                  <select class="selectBox" v-model="searchYear" style="font-size:20px">
                    <option disabled value="">ปี</option>
                    <option v-for="year of years">{{year.year}}</option>
                    <option value="">ทั้งหมด</option>
                  </select>
                  <span></span>
                  <button @click="printFn()" type="button" class="BTNstatus" style="color:#ffffff;font-size:18px;width:120px;">
                    <span class="glyphicon glyphicon-print"></span> พิมพ์
                  </button>
                  
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
                </div>
              </h4>
              <br><br>
             <!-- <p class="card-text">รวม : {{realtimeplus}} รายการ</p> !-->
              <!--TABLE!-->
              <br>   
              <table class="table">
                <thead>
                  <tr>
                    <th>รหัสการทำรายการ</th>
                    <th>ชื่ออุปกรณ์</th>
                    <th>หมายเลขอุปกรณ์</th>
                    <th>ประเภทอุปกรณ์</th>
                    <th>ชื่อ - สกุล ผู้ส่งซ่อม</th>
                    <th>แผนก</th>
                    <th>วันที่ส่งซ่อม</th>
                    <th>ปัญหา / สาเหตุ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="history of searchEqm" v-if="history.status === 'ส่งซ่อม'">
                    <td>{{history.idLend}}</td>
                    <td>{{history.nameEqm}}</td>
                    <td>{{history.numberEqm}}</td>
                    <td>{{history.category}}</td>
                    <td>{{history.firstname}} {{history.lastname}}</td>
                    <td>{{history.department}}</td>
                    <td>{{history.date}}</td>
                    <td>{{history.note}}</td>
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
    
    <div class="print" v-if="print === 'print'">
      <p style="text-align:right;font-size:16px;">วันที่ออกรายงาน: {{dateReport}} เวลา: {{timeReport}} น.</p>
      <h1><b>รายงานข้อมูลการส่งซ่อมอุปกรณ์</b></h1><br>
      <h2 v-if="searchShow !== '' && searchYear !== ''"><b>ประจำเดือน {{searchShow}} ปี {{searchYear}}</b></h2><br>
      <h2 v-if="searchShow !== '' && searchYear === ''"><b>ประจำเดือน {{searchShow}}</b></h2><br>
      <h2 v-if="searchYear !== '' && searchShow === ''"><b>ปี {{searchYear}}</b></h2><br>
      <h2 v-if="searchShow === ''"></h2><br>
      <center>
      <h3 style="text-align:left;">รายงานข้อมูลการส่งซ่อมแยกตามประเภท</h3>
      <table border="1" style="margin-top: 10px;">
        <tr>
          <th style="width:250px;text-align: center;height:50px;">ประเภท</th>
          <th style="width:80px;text-align: center;">จำนวน</th>
        </tr>
        <tr>
          <td style="text-align: center;">สนับสนุน</td>
          <td style="width:80;text-align: center;">{{support}}</td>
        </tr>
        <tr>
          <td style="text-align: center;">วินิจฉัยและรักษา</td>
          <td style="width:80;text-align: center;">{{diagnoseAndtreat}}</td>
        </tr>
        <tr>
          <td style="text-align: center;">รักษา</td>
          <td style="width:80;text-align: center;">{{treat}}</td>
        </tr>
        <tr>
          <td style="text-align: center;">วินิจฉัย</td>
          <td style="width:80;text-align: center;">{{diagnose}}</td>
        </tr>
      </table>
      <br>
      <h3 style="text-align:left;">รายงานข้อมูลการส่งซ่อมของแต่ละอุปกรณ์</h3>
      <table border="1" style="margin-top: 10px;">
        <tr>
          <th style="width:80px;text-align: center;height:50px;">รหัสการทำรายการ</th>
          <th style="width:250px;text-align: center;">ชื่ออุปกรณ์</th>
          <th style="text-align: center;">หมายเลขอุปกรณ์</th>
          <th style="text-align: center;">ประเภทอุปกรณ์</th>
          <th style="text-align: center;">ชื่อ - สกุล ผู้ส่งซ่อม</th>
          <th style="text-align: center;">แผนก ที่ยืม</th>
          <th style="text-align: center;">วันที่ส่งซ่อม</th>
          <th style="text-align: center;">ปัญหา / สาเหตุ</th>
        </tr>
        <tr v-for="history of searchEqm"  v-if="history.status === 'ส่งซ่อม'">
          <td style="text-align: center;">{{history.idLend}}</td>
          <td>{{history.nameEqm}}</td>
          <td style="text-align: center;">{{history.numberEqm}}</td>
          <td style="text-align: center;">{{history.category}}</td>
          <td style="text-align: center;">{{history.firstname}} {{history.lastname}}</td>
          <td style="text-align: center;">{{history.department}}</td>
          <td style="text-align: center;">{{history.date}}</td>
          <td style="text-align: center;">{{history.note}}</td>
        </tr>
      </table>
      </center>
    </div>
  </div>
</template>

<script>
import {equipmentRef, auth, userRef, notiRef, scanRef, historyRef, yearRef} from './firebase'
import Chart from 'chart.js'
// import moment from 'moment'
import dateFormat from 'dateformat'

export default {
  name: 'reportrepair',
  data () {
    return {
      firstname: '',
      lastname: '',
      statusCheck: '',
      search: '',
      searchYear: '',
      print: 'page',
      searchShow: '',

      firstnameAdmin: '',
      lastnameAdmin: '',
      department: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmpassword: '',
      support: '',
      diagnose: '',
      diagnoseAndtreat: '',
      treat: '',
      dateReport: '',
      timeReport: ''
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
  mounted () {
    // this.setBarChart()
  },
  watch: {
    // value PieCharts
    support: function () {
    },
    treat: function () {
    },
    diagnoseAndtreat: function () {
    },
    diagnose: function () {
    }
  },
  firebase: {
    equipments: equipmentRef,
    users: userRef,
    notis: notiRef,
    scans: scanRef,
    historys: historyRef,
    years: yearRef
  },
  methods: {
    printFn () {
      this.print = 'print'
      if (this.search === '01') {
        this.searchShow = 'มกราคม '
      } else if (this.search === '02') {
        this.searchShow = 'กุมภาพันธ์'
      } else if (this.search === '03') {
        this.searchShow = 'มีนาคม'
      } else if (this.search === '04') {
        this.searchShow = 'เมษายน'
      } else if (this.search === '05') {
        this.searchShow = 'พฤษภาคม'
      } else if (this.search === '06') {
        this.searchShow = 'มิถุนายน'
      } else if (this.search === '07') {
        this.searchShow = 'กรกฎาคม'
      } else if (this.search === '08') {
        this.searchShow = 'สิงหาคม'
      } else if (this.search === '09') {
        this.searchShow = 'กันยายน '
      } else if (this.search === '10') {
        this.searchShow = 'ตุลาคม'
      } else if (this.search === '11') {
        this.searchShow = 'พฤศจิกายน'
      } else if (this.search === '12') {
        this.searchShow = 'ธันวาคม'
      }
      this.dateReport = dateFormat(new Date(), 'dd/mm/yyyy')
      this.timeReport = dateFormat(new Date(), 'HH:MM')
      setTimeout(() => {
        window.print()
        window.close()
        location.reload()
      }, 1000)
      // var printContents = document.getElementById('print').innerHTML
      // w.document.write(printContents)
      // var w = window.open()
      // w.print()
      // w.close()
      // location.reload()
    },
    addAdmin (statusAdd, key) {
      userRef.child(key).update({status: statusAdd})
      this.statusCheck = this.users.find(users => users.firstname === this.firstname && users.lastname === this.lastname).status
      if (this.statusCheck === 'user') {
        this.$router.push('/')
        location.reload()
      }
    },
    setBarChart () {
      var ctx = document.getElementById('mybarChart')
      var mybarChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['สนับสนุน', 'วินิจฉัยและรักษา', 'รักษา', 'วินิจฉัย'],
          datasets: [{
            label: 'จำนวนอุปกรณ์',
            backgroundColor: 'rgb(34, 177, 76)',
            // borderColor: ['rgba(38, 185, 154, 0.5)', 'rgba(52, 152, 219, 0.5)', 'rgba(69, 92, 115, 0.5)', 'rgba(189, 195, 199, 0.5)'],
            borderWidth: 3,
            data: [5, 4, 3, 2]
          }]
        },

        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      })
      console.log(mybarChart)
    }
  },
  computed: {
    searchEqm () {
      return this.historys.filter((historys) => {
        return historys.month.indexOf(this.search) > -1 && historys.year.indexOf(this.searchYear) > -1
      })
    },
    ggg () {
      this.support = 0
      this.treat = 0
      this.diagnoseAndtreat = 0
      this.diagnose = 0
      for (let i = 0; i < this.searchEqm.length; i++) {
        if (this.searchEqm[i].status === 'ส่งซ่อม') {
          if (this.searchEqm[i].category === 'วินิจฉัย') {
            this.diagnose = this.diagnose + this.searchEqm[i].amount * 1
          }
          if (this.searchEqm[i].category === 'สนับสนุน') {
            this.support = this.support + this.searchEqm[i].amount * 1
          }
          if (this.searchEqm[i].category === 'วินิจฉัยและรักษา') {
            this.diagnoseAndtreat = this.diagnoseAndtreat + this.searchEqm[i].amount * 1
          }
          if (this.searchEqm[i].category === 'รักษา') {
            this.treat = this.treat + this.searchEqm[i].amount * 1
          }
        }
      }
      return this.support
    }
  }
}
</script>

<style scoped>
.print {
  font-family: Angsana New;
  text-align: center;
  max-width: 1000px;
  margin: auto;
  background: white;
  padding: 10px;
}

/*--------------------------------------- CONTENT ----------------------------------*/
.card {
  padding: .75rem 1.25rem;
  margin-bottom: 0;
  background-color: #ffffff;
  border-bottom: 1px solid rgba(0,0,0,.125);
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

.container {
  overflow: hidden;
  width: 100%;
  margin: 20px auto;
  padding: 20px;
}

.container ul {
  padding: 0px;
  margin: 0px;
  margin-left: 300px;
}

.container ul li {
  list-style: none;
  float: left;
  width: 500px;
  height: 470px;
 /* background: white;*/
  margin: 40px 10px -10px 20px;
  box-sizing: border-box;
  /* border: 1px solid #dddddd; */
}

.container ul li .title {
  font-size: 28px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  /* background: white; */
  text-align: center;
  /* padding-left: 30px; */
  /* border-bottom: 2px solid #dddddd; */
  color: #73879C;
}

@media screen and (max-width:1200px) {
  .container ul li {
    float: none;
    width: 90%;
    margin: 40px auto;
    margin-right: 50px;
  }
  .container {
    width: 100%;
    padding: 0px;
  }
}
</style>
 