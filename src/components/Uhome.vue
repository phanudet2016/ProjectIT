<template>
  <div>
    <div class="nav-header">
      <ul>
        <li class="topic">
          <p style="font-size:25px"><b>ยืมเครื่องมือแพทย์</b></p>
        </li>
        <li class="user-login">
          <p style="font-size:25px"><a><span class="glyphicon glyphicon-log-in" style="padding-right:10px;color:#9A9A9A;font-size:15px" @click="submitLogout()" v-bind:title="msgLogout"></span></a>{{firstname}} {{lastname}}</p>
        </li>
      </ul>
    </div>

    <nav>
      <img src="../assets/196127.png" style="margin-top:22px;margin-left:20px;width:40%;">
      <p class="navbar-brand">ระบบจัดการ<br>อุปกรณ์ทางการแพทย์</p>
      <br><br><br><br><br>
      <ul>
        <li class="selected">
          <i class="glyphicon glyphicon-wrench" style="color:#ffffff;font-size:25px;"></i>
          <router-link to="/uhome">ยืมเครื่องแพทย์</router-link>
        </li>
        <li>
          <i class="fa fa-check-square-o" style="color:#ffffff;font-size:25px;"></i>
          <router-link to="/uapprove">รายการรออนุมัติ</router-link>
        </li>
        <li>
          <i class="fa fa-list-alt" style="color:#ffffff;font-size:25px;"></i>
          <router-link to="/ulisttable">รายการเครื่องมือที่ยืมมา</router-link>
        </li>
        <li>
          <i class="fa fa-clipboard" style="color:#ffffff;font-size:25px;"></i>
          <router-link to="/ulendhistory">ประวัติการยืม</router-link>
        </li>
        <li>
          <i class="glyphicon glyphicon-send" style="color:#ffffff;font-size:25px;"></i>
          <router-link to="">แจ้งความต้องการใช้อุปกรณ์</router-link>
        </li>
        <li>
          <i class="fa fa-bell-o" style="color:#ffffff;font-size:25px;"></i>
          <router-link to="">การแจ้งเตือน</router-link>
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
                <table class="table table-hover table-striped">
                  <thead>
                    <tr>
                      <th width="800px">ชื่ออุปกรณ์</th>
                      <th width="118px" style="text-align: center;background: #9968db; color: #ffffff;">จำนวน</th>
                      <th width="100px">หน่วย</th>
                      <th width="100px">ราคา (ต่อหน่วย)</th>
                      <th width="100px" style="text-align: center;">ยืม</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="category === ''" v-for="(equipment, key) of searchEqm" v-bind:key="equipment['.key']">
                        <td>{{equipment.nameEqm}}</td>
                        <td style="text-align: center;background: #9968db; color: #ffffff;">{{equipment.balanceEqm}}</td>
                        <td>{{equipment.unitEqm}}</td>
                        <td style="text-align: center;">{{equipment.priceUnit}}</td>
                        <td style="text-align: center;"><span class="glyphicon glyphicon-paperclip" style="color:#9968db;" data-toggle="modal" data-target="#myModal" @click="lend(equipment['.key'])"></span></td>
                      </tr>
                      <tr v-if="equipment.categoryEqm == category" v-for="(equipment, key) of searchEqm" v-bind:key="equipment['.key']">
                        <td>{{equipment.nameEqm}}</td>
                        <td style="text-align: center;background: #9968db; color: #ffffff;">{{equipment.balanceEqm}}</td>
                        <td>{{equipment.unitEqm}}</td>
                        <td style="text-align: center;">{{equipment.priceUnit}}</td>
                        <td style="text-align: center;"><span class="glyphicon glyphicon-paperclip" style="color:#9968db;" data-toggle="modal" data-target="#myModal" @click="lend(equipment['.key'])"></span></td>
                      </tr>
                      <tr v-if="category === 'ทั้งหมด'" v-for="(equipment, key) of searchEqm" v-bind:key="equipment['.key']">
                        <td>{{equipment.nameEqm}}</td>
                        <td style="text-align: center;background: #9968db; color: #ffffff;">{{equipment.balanceEqm}}</td>
                        <td>{{equipment.unitEqm}}</td>
                        <td style="text-align: center;">{{equipment.priceUnit}}</td>
                        <td style="text-align: center;"><span class="glyphicon glyphicon-paperclip" style="color:#9968db;" data-toggle="modal" data-target="#myModal" @click="lend(equipment['.key'])"></span></td>
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

                      <p style="color:#9A9A9A;font-size:20px;">HN No.</p>
                      <input class="" type="text" placeholder="" style="width:300px;border-radius:4px;border:1px solid #ccc;font-size:21px;" v-model="HnNo"/><br><br>

                      <p style="color:#9A9A9A;font-size:20px;">จำนวน</p>
                      <input class="" type="number" placeholder="" style="width:300px;border-radius:4px;border:1px solid #ccc;font-size:21px;" v-model="amountLend"/>
                    </div>
                    <div class="modal-footer">
                      <button @click="submitLend()" type="button" class="btn btn-default" data-dismiss="modal" style="width:100px;font-size:16px">ตกลง</button>
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
import {equipmentRef, auth, userRef, approvetableRef, scanRef} from './firebase'

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
      search: ''
    }
  },
  created () {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.firstname = this.users.find(users => users.email === user.email).firstname
        this.lastname = this.users.find(users => users.email === user.email).lastname
        this.department = this.users.find(users => users.email === user.email).department
      } else {
        console.log('not logged in')
      }
      console.log(user)
    })
  },
  firebase: {
    equipments: equipmentRef,
    users: userRef,
    scan: scanRef
  },
  methods: {
    submitLend () {
      this.user = auth.currentUser
      this.firstname = this.users.find(users => users.email === this.user.email).firstname
      this.lastname = this.users.find(users => users.email === this.user.email).lastname
      this.department = this.users.find(users => users.email === this.user.email).department
      if (this.amountLend < 0) {
        alert('กรุณากรอกข้อมูลให้ถูกต้อง')
      } else if (this.amountLend === '0' || this.amountLend === '' || this.HnNo === '') {
        alert('กรุณากรอกข้อมูลให้ถูกต้อง')
      } else if (this.amountLend > this.balanceLend) {
        alert('กรอกจำนวนเกิน')
      } else if (this.amountLend <= this.balanceLend) {
        this.balanceLend = this.balanceLend * 1 - this.amountLend * 1
        this.borrowedLend = this.borrowedLend * 1 + this.amountLend * 1
        approvetableRef.push({
          HnNo: this.HnNo,
          nameLend: this.nameLend,
          amountLend: this.amountLend,
          categoryLend: this.categoryLend,
          dateLend: new Date().toLocaleString(),
          firstname: this.firstname,
          lastname: this.lastname,
          statusLend: this.statusLend,
          departmentLend: this.department
        })
        equipmentRef.child(this.key).update({borrowedEqm: this.borrowedLend})
        equipmentRef.child(this.key).update({balanceEqm: this.balanceLend})
      } else {
        alert('กรุณากรอกข้อมูลให้ถูกต้อง')
      }
    },
    lend (key) {
      this.nameLend = this.equipments.find(equipments => equipments['.key'] === key).nameEqm
      this.categoryLend = this.equipments.find(equipments => equipments['.key'] === key).categoryEqm
      this.unitLend = this.equipments.find(equipments => equipments['.key'] === key).unitEqm
      this.borrowedLend = this.equipments.find(equipments => equipments['.key'] === key).borrowedEqm
      this.balanceLend = this.equipments.find(equipments => equipments['.key'] === key).balanceEqm
      this.key = key
      console.log(this.balanceLend)
      this.amountLend = ''
      this.HnNo = ''
    },
    removeEqm (key) {
      equipmentRef.child(key).remove()
    },
    submitLogout () {
      auth.signOut()
      this.$router.push('/')
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
  padding-left: 147px;
  /*border-bottom: 1px solid #525d63;*/
  width: 100%;
  height: auto;
  font-weight: bold;
  font-size: 23px;
  margin-top: -120px;
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
  font-size: 20px;
}

nav ul {
  margin-top: -50px;
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
</style>
