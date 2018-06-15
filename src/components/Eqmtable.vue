<template>
  <div>
    <div  v-if="print === 'page'">
    <div class="nav-header">
      <ul>
        <li class="topic">
          <p style="font-size:25px;"><router-link to="/listtable" style="color:#ffffff;">รายการอุปกรณ์ </router-link></p>
        </li>
        <li class="topic" style="padding-left: 10px;">
          <p style="font-size:25px; border-bottom: 2px solid #ffffff"><b>{{nameEqm}}</b></p>
          <i style="color:#ffffff;">{{getLatLongNumOne}}</i>
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
        <li class="selected">
          <i class="fa fa-list-alt" style="font-size:25px;"></i>
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
    <!-- <div  class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-9">
          <div class="card">
            <div class="card-block">
              <GmapMap v-bind:center="center" v-bind:zoom="18" map-type-id="terrain" style="height: 300px">
              <GmapMarker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" :draggable="true" @click="center=m.position"/></GmapMap>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div> -->

    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-9">
          <div class="card">
            <div class="card-block">
              <h4 class="card-title" style="font-size:20px">
                {{nameEqm}}
                <div class="button-add">
                <button @click="printFn()" type="button" class="BTNstatus" style="color:#ffffff;font-size:18px;width:150px;">
                    <span class="glyphicon glyphicon-print"></span> พิมพ์ QR Code
                  </button>
                  </div>
              </h4>

              <br>
              <table class="table">
                <thead>
                  <tr>
                    <th width="200px">รหัสอุปกรณ์</th>
                    <th width="200px">หมายเลขเครื่อง</th>
                    <th width="200px" colspan="2">หมายเลขครุภัณฑ์</th>
                    <th width="200px" style="text-align: center;">ปฏิทิน</th>
                    <th width="200px" style="text-align: center;">QR Code</th>
                    <th width="200px">สถานะ</th>
                    <th width="250px">สรุปการถูกยืมไปใช้งาน</th>
                    <th width="200px" style="text-align: center;">ผู้ยืม</th>
                    <th width="200px" style="text-align: center;">ตำแหน่ง</th>
                  </tr>
                </thead>
                <!-- <tbody>
                  <tr v-for="(arrayEqms, index) in arrayEqm">
                    <td>{{arrayEqms.id}}</td>
                    <td>{{arrayEqms.number}}</td>
                    <td>{{arrayEqms.status}}</td>
                    <td>{{arrayEqms.numberOfItem}}</td>
                    <td style="text-align: center;"><i class="glyphicon glyphicon-calendar" style="font-size:20px;" data-toggle="modal" data-target="#calendar" @click="bookEqmFn(arrayEqms.number)"></i></td>
                    <td style="text-align: center;"><span class="glyphicon glyphicon-qrcode" data-toggle="modal" data-target="#myModall" @click="genQrCode(index)"></span></td>
                    <td style="text-align: center;">{{arrayEqms.nameLend}} {{arrayEqms.lastnameLend}}</td>
                    <td style="text-align: center;"><i v-if="nameEqm === 'เครื่องช่วยหายใจชนิดควบคุมด้วยปริมาตรและความดันเคลื่อนย้ายได้'"><button v-if="arrayEqms.number === 1 || arrayEqms.number === 2" style="background: #ffffff;border:none;" @click="showMap(arrayEqms.number, arrayEqms.nameLend, arrayEqms.lastnameLend, arrayEqms.status)"><i class="glyphicon glyphicon-map-marker" style="font-size:25px;color:red" data-toggle="modal" data-target="#myMap"></i></button></i>
                    </td>
                  </tr>
                </tbody> -->
                <tbody v-for="equipment in equipments" v-if="equipment.nameEqm === nameEqm">
                  <tr v-for="(equipmentID, index) in equipment.equipmentID">
                    <td>{{equipmentID.id}}</td>
                    <td>{{equipmentID.number}}</td>
                    <td>{{equipmentID.numberOfItem}}</td>
                    <td width="150px"><i class="glyphicon glyphicon-edit" @click="editNumberOfItem(index, equipmentID.numberOfItem)" v-if="editCheck" data-toggle="modal" data-target="#numberOfItem"></i></td>
                    <td style="text-align: center;"><i class="glyphicon glyphicon-calendar" style="font-size:20px;" data-toggle="modal" data-target="#calendar" @click="bookEqmFn(equipmentID.number)"></i></td>
                    <td style="text-align: center;"><span class="glyphicon glyphicon-qrcode" data-toggle="modal" data-target="#myModall" @click="genQrCode(index, equipmentID.number)"></span></td>
                    <td>{{equipmentID.status}}</td>
                    <td>
                      <button @click="printSalup(equipmentID.id, equipmentID.number, equipmentID.numberOfItem)" type="button" class="BTNstatus" style="color:#ffffff;font-size:18px;width:100px;">
                       <span class="glyphicon glyphicon-print"></span> พิมพ์
                      </button>
                    </td>
                    <td style="text-align: center;">{{equipmentID.nameLend}} {{equipmentID.lastnameLend}}</td>
                    <td style="text-align: center;"><i v-if="nameEqm === 'เครื่องช่วยหายใจชนิดควบคุมด้วยปริมาตรและความดันเคลื่อนย้ายได้'"><button v-if="equipmentID.number === 1 || equipmentID.number === 2" style="background: #ffffff;border:none;" @click="showMap(equipmentID.number, equipmentID.nameLend, equipmentID.lastnameLend, equipmentID.status)"><i class="glyphicon glyphicon-map-marker" style="font-size:25px;color:red" data-toggle="modal" data-target="#myMap"></i></button></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          </div>

          <div class="modal fade" id="myModall" role="dialog">
                <div class="modal-dialog">
                  <!-- Modal content-->
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      <h4 class="modal-title" style="font-size:25px"><b>{{nameEqm}} <br>หมายเลข: {{numberQR}}</b></h4>
                    </div>
                    <div class="modal-body" style="text-align:center;">
                      <qrcode-vue :value="valueQR" :size="250" level="H" id="myCanvas"></qrcode-vue>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-default" data-dismiss="modal" style="width:100px;font-size:16px">ปิด</button>
                    </div>
                  </div>
                </div>
          </div>

          <!-- Map -->
          <div class="modal fade" id="myMap" role="dialog">
                <div class="modal-dialog"  style="width:800px;"> <!-- 80% !-->
                  <!-- Modal content-->
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      <h4 class="modal-title" style="font-size:25px"><b>ตำแหน่งของอุปกรณ์</b></h4>
                    </div>
                    <div class="modal-body" style="text-align:center;">
                      <GmapMap v-bind:center="center" v-bind:zoom="18" map-type-id="hybrid" style="height:450px;"> <!-- 700px !-->
                      <GmapMarker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" :draggable="true" @click="center=m.position">
                      <gmap-info-window :opened.sync="infowindow">
                        <div style="text-align:left;">
                        ชื่อ: {{nameEqm}}<br>
                        หมายเลข: {{number}}<br>
                        <span v-if="firstnameLend !== '' && lastnameLend !== ''">ผู้ยืม: {{firstnameLend}} {{lastnameLend}} </span><br>
                        <span v-if="departmentLend !== ''">แผนก: {{departmentLend}} </span><br>
                        สถานะ: {{statusLend}}
                        </div>
                      </gmap-info-window>
                      </GmapMarker>
                      <gmap-polygon :paths="paths" :options="options">
                      </gmap-polygon>
                      </GmapMap>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-default BTNlend" data-dismiss="modal" style="width:100px;font-size:20px">ปิด</button>
                    </div>
                  </div>
                </div>
          </div>
          <!-- Map -->

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

              <!-- หมายเลขครุภัณฑ์ !-->
              <div class="modal fade" id="numberOfItem" role="dialog">
                <div class="modal-dialog" style="width:500px;">
                  <!-- Modal content-->
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      <h4 class="modal-title" style="font-size:25px"><b>กรอกหมายเลขครุภัณฑ์</b></h4>
                    </div>
                    <div class="modal-body">
                      <input type="text" class="form-control" style="font-size:20px;width:150px;" v-model="addNumberOfItem"/>
                    </div>
                    <div class="modal-footer">
                      <button @click="saveNumberOfItem()" type="button" class="btn btn-default" data-dismiss="modal" style="width:85px;font-size: 16px;">ตกลง</button>
                      <button type="button" class="btn btn-default" data-dismiss="modal" style="width:85px;font-size: 16px;">ยกเลิก</button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- หมายเลขครุภัณฑ์!-->
      </div>
      <div class="print" v-if="print === 'print'">
        <h1><b>{{nameEqm}}</b></h1><br>
          <div class="row" v-for="i in Math.ceil(araryQR.length / 3)" style="margin-left:85px;"><br><br><br>
            <table border="0">
              <tr>
                <td v-for="item in araryQR.slice((i - 1) * 3, i * 3)" style="width:200px;">
                  <p style="font-size:25px;margin-left:-30px;">หมายเลขเครื่อง: {{equipments.find(equipments => equipments.nameEqm === nameEqm).equipmentID[item.substring(0, 1)].number}} </p>
                  <p style="font-size:20px;margin-left:-20px;margin-top:-21px;">รหัสอุปกรณ์: {{equipments.find(equipments => equipments.nameEqm === nameEqm).equipmentID[item.substring(0, 1)].id}} </p>
                  <qrcode-vue :value="item" :size="150" level="H" id="myCanvas"></qrcode-vue>
                </td>
              </tr>
            </table>
          </div>
      </div>

      <div class="print" v-if="print === 'printSalup'">
      <p style="text-align:right;font-size:16px;"></p>
      <h1><b>สรุปการถูกยืมไปใช้งานของอุปกรณ์</b></h1><br>
      <center>
      <h3 style="text-align:left;font-size:23px;"><b>ชื่ออุปกรณ์:</b> {{nameEqm}}</h3>
      <h3 style="text-align:left;font-size:23px;"><b>ประเภทอุปกรณ์:</b> {{category}}</h3>
      <h3 style="text-align:left;font-size:23px;"><b>รหัสอุปกรณ์:</b> {{idPrint}}</h3>
      <h3 style="text-align:left;font-size:23px;"><b>หมายเลขครุภัณฑ์:</b> {{numberOfItemPrint}}</h3>
      <h3 style="text-align:left;font-size:23px;"><b>หมายเลขเครื่อง:</b> {{numberPrint}}</h3>
      <h3 style="text-align:left;font-size:23px;"><b>จำนวนที่เคยถูกยืม:</b> {{sumLend}} ครั้ง</h3>
      <h3 style="text-align:left;font-size:23px;"><b>จำนวนที่เคยส่งซ่อม:</b> {{sumRepaRepair}} ครั้ง</h3><br>
      <h3 style="text-align:left;font-size:23px;"><b>ตารางประวัติการยืม</b></h3>
      <table border="1" style="margin-top: 10px;width:100%;">
        <tr>
          <th style="width:80px;text-align: center;height:50px;">เลขที่การยืม</th>
          <th style="width:80px;text-align: center;">ชื่อ - สกุล ผู้ยืม</th>
          <th style="width:80px;text-align: center;">ชื่อ - สกุล ผู้รับ</th>
          <th style="width:80px;text-align: center;">วันที่ยืม</th>
          <th style="width:80px;text-align: center;">วันที่คืน</th>
          <th style="width:80px;text-align: center;">ระยะเวลารวม</th>
        </tr>
        <tr v-for="history in historys" v-if="history.numberShow === numberPrint && history.nameEqm === nameEqm && history.status === 'ถูกยืม'">
          <td style="width:80;text-align: center;">{{history.idLend}}</td>
          <td style="width:80;text-align: center;">{{history.firstname}} {{history.lastname}}</td>
          <th style="width:80px;text-align: center;">{{history.recipient}}</th>
          <td style="width:80;text-align: center;">{{history.date}}</td>
          <td style="width:80;text-align: center;">{{history.timeLength}}</td>
          <td style="width:80;text-align: center;">{{history.amountDate}}</td>
        </tr>
      </table><br>

      <h3 style="text-align:left;font-size:23px;"><b>ตารางประวัติการส่งซ่อม</b></h3>
      <table border="1" style="margin-top: 10px;width:100%;">
        <tr>
          <th style="width:80px;text-align: center;height:50px;">เลขที่ทำรายการ</th>
          <th style="width:80px;text-align: center;">ชื่อ - สกุล ผู้ส่งซ่อม</th>
          <th style="width:80px;text-align: center;">แผนกผู้ส่ง</th>
          <th style="width:80px;text-align: center;">วันที่ส่งซ่อม</th>
          <th style="width:80px;text-align: center;">ปัญหา / สาเหตุ</th>
        </tr>
        <tr v-for="history in historys" v-if="history.numberEqm === numberPrint && history.nameEqm === nameEqm && history.status === 'ส่งซ่อม'">
          <td style="width:80;text-align: center;">{{history.idLend}}</td>
          <td style="width:80;text-align: center;">{{history.firstname}} {{history.lastname}}</td>
          <th style="width:80px;text-align: center;">{{history.department}}</th>
          <td style="width:80;text-align: center;">{{history.date}}</td>
          <td style="width:80;text-align: center;">{{history.note}}</td>
        </tr>
      </table>
      <br>
      </center>
    </div>
      

  </div>
</template>

<script>
import {equipmentRef, auth, userRef, notiRef, locationRef, bookEqmRef, historyRef} from './firebase'
import QrcodeVue from 'qrcode.vue'
import axios from 'axios'
import 'fullcalendar/dist/locale/th'

export default {
  name: 'eqmtable',
  data () {
    return {
      sumLend: '',
      sumRepaRepair: '',
      print: 'page',
      name: '',
      category: '',
      amountEqm: '',
      count: '',
      nameEqm: '',
      unitEqm: '',
      categoryEqm: '',
      firstname: '',
      lastname: '',
      msgLogout: 'ออกจากระบบ',
      editName: '',
      editCategory: '',
      editID: '',
      key: '',
      arrayEqm: [],
      valueQR: '',
      numberQR: '',
      dateReport: '',
      timeReport: '',

      firstnameAdmin: '',
      lastnameAdmin: '',
      email: '',
      password: '',
      confirmpassword: '',
      department: '',
      phoneNumber: '',
      statusCheck: '',
      center: '',
      markers: '',
      datas: '',
      longitude: '',
      latitude: '',

      indexEqm: '',
      addNumberOfItemBox: false,
      editCheck: true,
      saveCheck: false,
      addNumberOfItem: '',
      number: '',
      firstnameLend: '',
      lastnameLend: '',
      departmentLend: '',
      statusLend: '',
      options: {
        strokeColor: 'rgb(66,103,178)',
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: 'rgb(3,155,229)',
        fillOpacity: 0.35
      },
      paths: [
        [ {lat: 14.054447, lng: 101.394627}, {lat: 14.055360, lng: 101.396547}, {lat: 14.055115, lng: 101.396627}, {lat: 14.055110, lng: 101.397097}, {lat: 14.054957, lng: 101.397113}, {lat: 14.054631, lng: 101.396349}, {lat: 14.054327, lng: 101.396501},
          {lat: 14.053861, lng: 101.395493}, {lat: 14.054080, lng: 101.395386}, {lat: 14.053903, lng: 101.395002}, {lat: 14.053981, lng: 101.394964}, {lat: 14.053931, lng: 101.394820}, {lat: 14.054447, lng: 101.394627}]
      ],
      // center: {lat: 14.15918, lng: 101.34518},
      // markers: [
      //   {
      //     position: {lat: 14.15918, lng: 101.34518}
      //   }
      // ]
      // fullCalendar
      idPrint: '',
      numberPrint: '',
      numberOfItemPrint: '',

      defaultView: 'month',
      header: {
        left: 'prev, next today',
        center: 'title',
        right: 'month'
      },
      events: [],
      selected: [],
      arrayEvent: [],
      items: [
        '0 asdasd',
        '1 asdasd',
        '2 asdasd',
        '3 asdads'
      ],
      araryQR: []
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
    this.arrayEqm = this.equipments.find(equipments => equipments['.key'] === this.$route.params.id).equipmentID
    this.nameEqm = this.equipments.find(equipments => equipments['.key'] === this.$route.params.id).nameEqm
    this.category = this.equipments.find(equipments => equipments['.key'] === this.$route.params.id).categoryEqm

    this.araryQR = []
    for (let i = 0; i < this.arrayEqm.length; i++) {
      this.araryQR.push(i + ' ' + this.$route.params.id)
    }
  },
  firebase: {
    equipments: equipmentRef,
    users: userRef,
    notis: notiRef,
    locations: locationRef,
    bookEqm: bookEqmRef,
    historys: historyRef
  },
  mounted () {
    // device 1
    axios.get('https://dweet.io/get/latest/dweet/for/5d788b90-4ead-11e8-bd62-15911fb825ae')
    .then((response) => {
      if (response.data.this === 'succeeded') {
        locationRef.child('device1').set({
          lat: response.data.with[0].content.latitude,
          long: response.data.with[0].content.longitude
        })
      }
    })
    // device 2
    axios.get('https://dweet.io/get/latest/dweet/for/a6545d30-5425-11e8-ae7f-0dec994a5930')
    .then((response) => {
      if (response.data.this === 'succeeded') {
        locationRef.child('device2').set({
          lat: response.data.with[0].content.latitude,
          long: response.data.with[0].content.longitude
        })
      }
    })
  },
  computed: {
    getLatLongNumOne: function () {
      if (this.number === 1) {
        this.latitude = this.locations[0].lat
        this.longitude = this.locations[0].long
        this.center = {lat: this.latitude, lng: this.longitude}
        this.markers = [
          {
            position: {lat: this.latitude, lng: this.longitude}
          }
        ]
      } else if (this.number === 2) {
        this.latitude = this.locations[1].lat
        this.longitude = this.locations[1].long
        console.log(this.latitude, this.longitude)
        this.center = {lat: this.latitude, lng: this.longitude}
        this.markers = [
          {
            position: {lat: this.latitude, lng: this.longitude}
          }
        ]
      } else {
        this.center = {lat: 0, lng: 0}
        this.markers = ''
      }
      // axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
      // .then(response => (this.info = response)
      return this.latitude
    }
  },
  watch: {
  },
  methods: {
    printSalup (id, number, numberOfItem) {
      this.print = 'printSalup'
      this.idPrint = id
      this.numberPrint = number
      this.numberOfItemPrint = numberOfItem

      this.sumRepaRepair = 0
      this.sumLend = 0
      // sumRepaRepair
      for (let i = 0; i < this.historys.length; i++) {
        if (this.historys[i].numberShow === number && this.historys[i].nameEqm === this.nameEqm && this.historys[i].status === 'ถูกยืม') {
          this.sumLend = this.sumLend + this.historys[i].amount
        }
        if (this.historys[i].numberEqm === number && this.historys[i].nameEqm === this.nameEqm && this.historys[i].status === 'ส่งซ่อม') {
          this.sumRepaRepair = this.sumRepaRepair + this.historys[i].amount
        }
      }
      setTimeout(() => {
        window.print()
        window.close()
        location.reload()
      }, 1000)
    },
    printFn () {
      this.print = 'print'
      setTimeout(() => {
        window.print()
        window.close()
        location.reload()
      }, 1000)
    },
    bookEqmFn (number) {
      this.numberEqm = number
      this.events = []
      this.arrayEvent = []
      for (let i = 0; i < this.bookEqm.length; i++) {
        if (this.bookEqm[i].number === this.numberEqm && this.bookEqm[i].nameEqm === this.nameEqm && this.bookEqm[i].status === 'รับแล้ว') {
          this.arrayEvent.push({
            title: 'ชื่อ-สกุล: ' + this.bookEqm[i].firstname + ' ' + this.bookEqm[i].lastname + ' แผนก: ' + this.bookEqm[i].department,
            start: this.bookEqm[i].startEvent,
            end: this.bookEqm[i].endEventMark,
            editable: false,
            backgroundColor: 'red',
            borderColor: 'red'
          })
        } else if (this.bookEqm[i].number === this.numberEqm && this.bookEqm[i].nameEqm === this.nameEqm) {
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
    showMap (number, nameLend, lastnameLend, status) {
      this.number = number
      this.firstnameLend = nameLend
      this.lastnameLend = lastnameLend
      this.statusLend = status
      this.departmentLend = ''
      this.departmentLend = this.users.find(users => users.firstname === nameLend && users.lastname === lastnameLend).department
    },
    removeEqm (key) {
      equipmentRef.child(key).remove()
    },
    submitLogout () {
      auth.signOut()
      this.$router.push('/')
    },
    genQrCode (index, number) {
      this.valueQR = index + ' ' + this.$route.params.id
      this.numberQR = number
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
    editNumberOfItem (index, numberOfItem) {
      this.indexEqm = index
      this.addNumberOfItem = numberOfItem
      console.log(numberOfItem)
    },
    saveNumberOfItem () {
      var key = this.$route.params.id
      equipmentRef.child(key + '/equipmentID/' + [this.indexEqm]).update({
        numberOfItem: this.addNumberOfItem
      })
    }
  },
  components: {
    QrcodeVue
  }
}
</script>

<style scoped>
@import '~fullcalendar/dist/fullcalendar.css';
/*--------------------------------------- CONTENT ----------------------------------*/
.row {
  width: 80%;
}
.card {
  padding: .75rem 1.25rem;
  margin-bottom: 0;
  background-color: #ffffff;
  border-bottom: 1px solid rgba(0,0,0,.125);
  margin-left: 48px;
  border: 1px solid #dddddd;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1), 0 1px 20px 0 rgba(0, 0, 0, 0.19);
  width: 1300px;
  z-index: 1;
}

.button-add {
  float: right;
  margin-left: 10px;
}

.content {
  margin-top: 60px;
  margin-left: 275px;
  /* width: 100%; */
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
  z-index: 2;
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

.Status {
  background-color: red;
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
.comp-full-calendar {
  padding: 20px;
  background: #fff;
  max-width: 960px;
  margin: 0 auto;
  font-size: 18px;
}

.print {
  font-family: Angsana New;
  text-align: center;
  max-width: 1000px;
  margin: auto;
  background: white;
  padding: 10px;
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
</style>
