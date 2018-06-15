<template>
  <div>
    <div class="nav-header">
      <ul>
        <li class="topic">
          <p style="font-size:25px;border-bottom: 2px solid #ffffff"><b>หน้าหลัก (Dashboard)</b></p>
          <a style="font-size:0px;">{{balanceStoreCal}}{{borrowedStoreCal}}{{repairStoreCal}}{{BarChartCal}}{{topTenBorrowed}}{{overDeadline}}</a>
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
        <li class="selected">
          <i class="fa fa-pie-chart" style="font-size:25px;"></i>
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

    <!--<div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-4">
          <div class="card">
            <div class="card-block">
              <h4 class="card-title" style="font-size:20px">dd</h4>
              <hr style="border-width: 2px;">
              <center>
                <canvas id="myChart" width="400" height="400"></canvas>
              </center>
            </div>
          </div>
          </div>
          <div class="col-sm-4" style="margin-left:250px;">
          <div class="card">
            <div class="card-block">
              <h4 class="card-title" style="font-size:20px">dd</h4>
              <hr style="border-width: 2px;">
              <center><canvas id="DoughnutChart" width="400" height="400"></canvas></center>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div> !-->
    <div class="container">
      <ul>
        <li>
          <div class="title">อุปกรณ์ทั้งหมด</div>
          <center><canvas id="pieChart" width="770" height="360" style="display: block; width: 770px; height: 385px;"></canvas></center>         
        </li>
        <li>
          <div class="title">อุปกรณ์ทั้งหมด</div>
          <center><canvas id="lineChart" width="770" height="360" style="display: block; width: 770px; height: 385px;"></canvas></center>
        </li>
        <li>
          <div class="title">10 อันดับอุปกรณ์ที่ถูกยืมมากที่สุด</div>
          <center><canvas id="horizontalBar" width="770" height="360" style="display: block; width: 770px; height: 385px;"></canvas></center>       
        </li>
        <li>
          <div class="title">อุปกรณ์ที่ไม่ส่งคืนตามกำหนด</div>
          <center><canvas id="mybarChart" width="770" height="360" style="display: block; width: 770px; height: 385px;"></canvas></center>
        </li>
      </ul>
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


  </div>
</template>

<script>
import {equipmentRef, auth, userRef, historyRef, notiRef} from './firebase'
import Chart from 'chart.js'

export default {
  name: 'home',
  data () {
    return {
      user: 'Admin',
      num: 0,
      num1: 1,
      num2: 2,
      category: '',
      unitEqm: '',
      categoryEqm: '',
      nameEqm: '',
      amountEqm: '',
      firstname: '',
      lastname: '',
      chartData: [],
      gg: '',
      aa: '',
      cc: [],
      ee: '',
      equipmentArray: [],

      sumAmount: '',
      sumBalance: '',
      balanceStore: '',
      balanceStorePercent: '',

      borrowedStore: '',
      borrowedStorePercent: '',
      sumBorrowed: '',

      repairStore: '',
      repairStorePercent: '',

      borrowedBarChartTreat: '',
      inStoreBarChartTreat: '',
      repairBarChartTreat: '',
      supportInStoreBarChart: '',
      supportBorrowedBarChart: '',
      supportRepairBarChart: '',
      diagnoseInStoreBarChart: '',
      diagnoseBorrowedBarChart: '',
      diagnoseRepairBarChart: '',
      diagnoseAndTreatInStoreBarChart: '',
      diagnoseAndTreatBorrowedBarChart: '',
      diagnoseAndTreatRepairBarChart: '',

      arryBarCharts: [],
      arryAmountBarChart: [],
      arrayNameEqmBarchart: [],
      bb: '',
      t: 1,
      overTimeReturnDiagnose: '',
      overTimeReturnSupport: '',
      overTimeReturnDiagnoseAndTreat: '',
      overTimeReturnTreat: ''
    }
  },
  mounted () {
    /* this.test()
    this.setPieCharts()
    this.setHorizontalBar()
    this.setLineChart()
    this.setBarChart() */
  },
  components: {
  },
  created () {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.firstname = this.users.find(users => users.email === user.email).firstname
        this.lastname = this.users.find(users => users.email === user.email).lastname
      } else {
        console.log('not logged in')
      }
      console.log(user)
    })
  },
  firebase: {
    equipments: equipmentRef,
    historys: historyRef,
    users: userRef,
    notis: notiRef
  },
  computed: {
    balanceStoreCal: function () {
      this.sumAmount = 0
      this.balanceStore = 0
      this.balanceStorePercent = 0
      this.borrowedStore = 0
      this.borrowedStorePercent = 0
      this.repairStore = 0
      this.repairStorePercent = 0
      this.equipments.forEach(equipments => {
        // หาผลรวมอุปกรณ์ทั้งหมดในคลัง
        this.sumAmount = this.sumAmount * 1 + equipments.amountEqm * 1
        // หาผลรวมอุปกรณ์ทั้งหมดในคลัง คิดเป็นเปอร์เซ็น
        for (let i = 0; i < equipments.equipmentID.length; i++) {
          if (equipments.equipmentID[i].status === 'พร้อมใช้งาน') {
            this.balanceStore = this.balanceStore * 1 + 1
          }
          if (equipments.equipmentID[i].status === 'ถูกยืม') {
            this.borrowedStore = this.borrowedStore * 1 + 1
          }
          if (equipments.equipmentID[i].status === 'ส่งซ่อม') {
            this.repairStore = this.repairStore * 1 + 1
          }
        }
      })
      this.balanceStorePercent = this.balanceStore * 100 / this.sumAmount
      this.borrowedStorePercent = this.borrowedStore * 100 / this.sumAmount
      this.repairStorePercent = this.repairStore * 100 / this.sumAmount
      return this.balanceStorePercent
    },
    /* borrowedStoreCal: function () {
      this.sumAmount = 0
      this.borrowedStore = 0
      this.borrowedStorePercent = 0
      this.equipments.forEach(equipments => {
        // หาผลรวมอุปกรณ์ทั้งหมดในคลัง
        this.sumAmount = this.sumAmount * 1 + equipments.amountEqm * 1
        // หาจวนที่ถูกยืม คิดเป็นเปอร์เซ็น
        for (let i = 0; i < equipments.equipmentID.length; i++) {
          if (equipments.equipmentID[i].status === 'ถูกยืม') {
            this.borrowedStore = this.borrowedStore * 1 + 1
          }
        }
      })
      this.borrowedStorePercent = this.borrowedStore * 100 / this.sumAmount
      return this.borrowedStorePercent
    },
    repairStoreCal: function () {
      this.sumAmount = 0
      this.repairStore = 0
      this.repairStorePercent = 0
      this.equipments.forEach(equipments => {
        // หาผลรวมอุปกรณ์ทั้งหมดในคลัง
        this.sumAmount = this.sumAmount * 1 + equipments.amountEqm * 1
        // หาจวนที่ส่งซ่อม คิดเป็นเปอร์เซ็น
        for (let i = 0; i < equipments.equipmentID.length; i++) {
          if (equipments.equipmentID[i].status === 'ส่งซ่อม') {
            this.repairStore = this.repairStore * 1 + 1
          }
        }
      })
      this.repairStorePercent = this.repairStore * 100 / this.sumAmount
      return this.repairStorePercent
    }, */
    // หาจำนวน ที่อยู่ในคลัง ที่ถูกยืม ส่งซ่อม ของแต่ละประเภท
    BarChartCal: function () {
      this.borrowedBarChartTreat = 0
      this.inStoreBarChartTreat = 0
      this.repairBarChartTreat = 0
      this.supportInStoreBarChart = 0
      this.supportBorrowedBarChart = 0
      this.supportRepairBarChart = 0
      this.diagnoseInStoreBarChart = 0
      this.diagnoseBorrowedBarChart = 0
      this.diagnoseRepairBarChart = 0
      this.diagnoseAndTreatInStoreBarChart = 0
      this.diagnoseAndTreatBorrowedBarChart = 0
      this.diagnoseAndTreatRepairBarChart = 0
      this.equipments.forEach(equipments => {
        for (let i = 0; i < equipments.equipmentID.length; i++) {
          // รักษา
          if (equipments.categoryEqm === 'รักษา' && equipments.equipmentID[i].status === 'พร้อมใช้งาน') {
            this.inStoreBarChartTreat = this.inStoreBarChartTreat * 1 + 1
          }
          if (equipments.categoryEqm === 'รักษา' && equipments.equipmentID[i].status === 'ถูกยืม') {
            this.borrowedBarChartTreat = this.borrowedBarChartTreat * 1 + 1
          }
          if (equipments.categoryEqm === 'รักษา' && equipments.equipmentID[i].status === 'ส่งซ่อม') {
            this.repairBarChartTreat = this.repairBarChartTreat * 1 + 1
          }
          // สนับสนุน
          if (equipments.categoryEqm === 'สนับสนุน' && equipments.equipmentID[i].status === 'พร้อมใช้งาน') {
            this.supportInStoreBarChart = this.supportInStoreBarChart * 1 + 1
          }
          if (equipments.categoryEqm === 'สนับสนุน' && equipments.equipmentID[i].status === 'ถูกยืม') {
            this.supportBorrowedBarChart = this.supportInStoreBarChart * 1 + 1
          }
          if (equipments.categoryEqm === 'สนับสนุน' && equipments.equipmentID[i].status === 'ส่งซ่อม') {
            this.supportRepairBarChart = this.supportInStoreBarChart * 1 + 1
          }
          // วินิจฉัย
          if (equipments.categoryEqm === 'วินิจฉัย' && equipments.equipmentID[i].status === 'พร้อมใช้งาน') {
            this.diagnoseInStoreBarChart = this.diagnoseInStoreBarChart * 1 + 1
          }
          if (equipments.categoryEqm === 'วินิจฉัย' && equipments.equipmentID[i].status === 'ถูกยืม') {
            this.diagnoseBorrowedBarChart = this.diagnoseBorrowedBarChart * 1 + 1
          }
          if (equipments.categoryEqm === 'วินิจฉัย' && equipments.equipmentID[i].status === 'ส่งซ่อม') {
            this.diagnoseRepairBarChart = this.diagnoseRepairBarChart * 1 + 1
          }
          // วินิจฉัยและรักษา
          if (equipments.categoryEqm === 'วินิจฉัยและรักษา' && equipments.equipmentID[i].status === 'พร้อมใช้งาน') {
            this.diagnoseAndTreatInStoreBarChart = this.diagnoseAndTreatInStoreBarChart * 1 + 1
          }
          if (equipments.categoryEqm === 'วินิจฉัยและรักษา' && equipments.equipmentID[i].status === 'ถูกยืม') {
            this.diagnoseAndTreatBorrowedBarChart = this.diagnoseAndTreatBorrowedBarChart * 1 + 1
          }
          if (equipments.categoryEqm === 'วินิจฉัยและรักษา' && equipments.equipmentID[i].status === 'ส่งซ่อม') {
            this.diagnoseAndTreatRepairBarChart = this.diagnoseAndTreatRepairBarChart * 1 + 1
          }
        }
      })
      return this.inStoreBarChartTreat // เมื่อตัวแปลเปลี่ยน watch จะทำงาน
    },
    topTenBorrowed: function () {
      var count = 0
      var arry = []
      this.arryBarCharts = []
      var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'})
      this.equipments.forEach(equipments => {
        if (equipments.countTopTen !== 0) {
          arry.push(equipments.countTopTen + ' ' + equipments.nameEqm)
        } else { arry.push('') }
      })
      // เรียงอันดับ 10 - 1
      var arraySort = arry.sort(collator.compare)
      for (let i = arraySort.length - 1; i > 0; i--) {
        this.arryBarCharts.push(arraySort[i])
        if (count++ === 9) {
          break
        }
      }
      // ซับจำนวน และซับชื่อ
      this.arryAmountBarChart = []
      this.arrayNameEqmBarchart = []
      for (let i = 0; i < this.arryBarCharts.length; i++) {
        var str = this.arryBarCharts[i]
        var n = str.indexOf(' ')
        this.arryAmountBarChart.push(str.substring(0, n) * 1)
        this.arrayNameEqmBarchart.push(str.substring(n + 1))
      }
      return this.arryAmountBarChart
    },
    overDeadline: function () {
      var day = new Date().getDate()
      var mount = new Date().getMonth() + 1
      var year = new Date().getFullYear()
      var date = mount + '/' + day + '/' + year
      var timeNow = new Date(date).getTime()

      this.overTimeReturnTreat = 0
      this.overTimeReturnDiagnoseAndTreat = 0
      this.overTimeReturnSupport = 0
      this.overTimeReturnDiagnose = 0
      this.historys.forEach(historys => {
        if (historys.status === 'ถูกยืม') {
          for (let i = 0; i < historys.returnedDate.length; i++) {
            if (historys.category === 'วินิจฉัย' && historys.returnedDate[i].status === 'ยังไม่ส่งคืน') {
              var timeReturnDiagnose = new Date(historys.returnedDate[i].dateCheckReturn).getTime()
              if (timeNow > timeReturnDiagnose) {
                this.overTimeReturnDiagnose = this.overTimeReturnDiagnose * 1 + 1
              }
            }
            if (historys.category === 'รักษา' && historys.returnedDate[i].status === 'ยังไม่ส่งคืน') {
              var timeReturnTreat = new Date(historys.returnedDate[i].dateCheckReturn).getTime()
              if (timeNow > timeReturnTreat) {
                this.overTimeReturnTreat = this.overTimeReturnTreat * 1 + 1
              }
            }
            if (historys.category === 'วินิจฉัยและรักษา' && historys.returnedDate[i].status === 'ยังไม่ส่งคืน') {
              var timeReturnDiagnoseAndTreat = new Date(historys.returnedDate[i].dateCheckReturn).getTime()
              if (timeNow > timeReturnDiagnoseAndTreat) {
                this.overTimeReturnDiagnoseAndTreat = this.overTimeReturnDiagnoseAndTreat * 1 + 1
              }
            }
            if (historys.category === 'สนับสนุน' && historys.returnedDate[i].status === 'ยังไม่ส่งคืน') {
              var timeReturnSupport = new Date(historys.returnedDate[i].dateCheckReturn).getTime()
              if (timeNow > timeReturnSupport) {
                this.overTimeReturnSupport = this.overTimeReturnSupport * 1 + 1
              }
            }
          }
        }
      })
      return this.overTimeReturnTreat
    }
  },
  watch: {
    // value PieCharts
    balanceStorePercent: function () {
      this.setPieCharts()
    },
    borrowedStorePercent: function () {
      this.setPieCharts()
    },
    repairStorePercent: function () {
      this.setPieCharts()
    },
    // value LineCharts
    // ประเภท รักษา
    inStoreBarChartTreat: function () {
      this.setLineChart()
    },
    borrowedBarChartTreat: function () {
      this.setLineChart()
    },
    repairBarChartTreat: function () {
      this.setLineChart()
    },
    // ประเภท สนับสนุน
    supportBorrowedBarChart: function () {
      this.setLineChart()
    },
    supportInStoreBarChart: function () {
      this.setLineChart()
    },
    supportRepairBarChart: function () {
      this.setLineChart()
    },
    // ประเภท วินิจฉัย
    diagnoseInStoreBarChart: function () {
      this.setLineChart()
    },
    diagnoseBorrowedBarChart: function () {
      this.setLineChart()
    },
    diagnoseIRepairBarChart: function () {
      this.setLineChart()
    },
    // ประเถทวินิจฉัยและรักษา
    diagnoseAndTreatInStoreBarChart: function () {
      this.setLineChart()
    },
    diagnoseAndTreatBorrowedBarChart: function () {
      this.setLineChart()
    },
    diagnoseAndTreatRepairBarChart: function () {
      this.setLineChart()
    },
    // value BarCharts
    arryBarCharts: function () {
      this.setHorizontalBar()
    },
    arryAmountBarChart: function () {
      this.setHorizontalBar()
    },
    arrayNameEqmBarchart: function () {
      this.setHorizontalBar()
    },
    overTimeReturnDiagnose: function () {
      this.setBarChart()
    },
    overTimeReturnSupport: function () {
      this.setBarChart()
    },
    overTimeReturnDiagnoseAndTreat: function () {
      this.setBarChart()
    },
    overTimeReturnTreat: function () {
      this.setBarChart()
    }
  },
  methods: {
    test () {
    },
    setPieCharts () {
      var ctx = document.getElementById('pieChart')
      var data = {
        datasets: [{
          data: [this.balanceStorePercent.toFixed(2), this.borrowedStorePercent.toFixed(2), this.repairStorePercent.toFixed(2)],
          backgroundColor: [
            'rgb(46,204,113)',
            'rgb(52,152,219)',
            'rgb(231,76,60)'
          ],
          label: 'My dataset' // for legend
        }],
        labels: [
          'ในคลัง',
          'ถูกยืม',
          'ซ่อมบำรุง'
        ],
        amount: [
          this.balanceStore,
          this.borrowedStore,
          this.repairStore
        ]
      }
      var myChart = new Chart(ctx, {
        data: data,
        type: 'pie',
        options: {
          tooltips: {
            bodyFontSize: 15,
            callbacks: {
              label: function (tooltipItem, data) {
                var label = data.labels[tooltipItem.index]
                var amount = data.amount[tooltipItem.index]
                var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
                return label + ' ' + amount + ' : ' + value + '%'
              }
            }
          }
        }
      })
      console.log(myChart)
    },
    setHorizontalBar () {
      var ctx = document.getElementById('horizontalBar')
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [this.arrayNameEqmBarchart[0], this.arrayNameEqmBarchart[1], this.arrayNameEqmBarchart[2], this.arrayNameEqmBarchart[3], this.arrayNameEqmBarchart[4], this.arrayNameEqmBarchart[5], this.arrayNameEqmBarchart[6], this.arrayNameEqmBarchart[7], this.arrayNameEqmBarchart[8], this.arrayNameEqmBarchart[9]],
          datasets: [{
            label: 'จำนวนอุปกรณ์ที่ถูกยืม',
            backgroundColor: 'rgb(0,152,221)',
            // borderColor: 'rgba(123,104,238,1)',
            // borderWidth: 1,
            data: [this.arryAmountBarChart[0], this.arryAmountBarChart[1], this.arryAmountBarChart[2], this.arryAmountBarChart[3], this.arryAmountBarChart[4], this.arryAmountBarChart[5], this.arryAmountBarChart[6], this.arryAmountBarChart[7], this.arryAmountBarChart[8], this.arryAmountBarChart[9]]
          }]
        },

        options: {
          scales: {
            // xAxes: [{
            //   ticks: {
            //     beginAtZero: true,
            //     // suggestedMax: 50
            //     userCallback: function (label, index, labels) {
            //       // when the floored value is the same as the value we have a whole number
            //       if (Math.floor(label) === label) {
            //         return label
            //       }
            //     }
            //   }
            // }],
            // yAxes: [{
            //   ticks: {
            //     callback: function (value) {
            //       if (value.length > 4) {
            //         return value.substr(0, 8) + '...'
            //       } else {
            //         return value
            //       }
            //     }
            //   }
            // }]
            yAxes: [{
              ticks: {
                beginAtZero: true,
                userCallback: function (label, index, labels) {
                  // when the floored value is the same as the value we have a whole number
                  if (Math.floor(label) === label) {
                    return label
                  }
                }
              }
            }],
            xAxes: [{
              ticks: {
                callback: function (value) {
                  if (value.length > 4) {
                    return value.substr(0, 8) + '...'
                  } else {
                    return value
                  }
                }
              }
            }]
          },
          tooltips: {
            bodyFontSize: 12,
            callbacks: {
              title: function (tooltipItems, data) {
                var idx = tooltipItems[0].index
                return data.labels[idx]
              },
              label: function (tooltipItem, data) {
                var label = data.datasets[0].data[tooltipItem.index]
                return 'จำนวนที่ถูกยืม' + ' ' + label
              }
            }
          }
        }
      })
      console.log(myChart)
    },
    setLineChart () {
      var ctx = document.getElementById('lineChart')
      var lineChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['สนับสนุน', 'วินิจฉัยและรักษา', 'รักษา', 'วินิจฉัย'],
          datasets: [{
            label: 'ในคลัง',
            backgroundColor: 'rgb(46,204,113)',
            // borderColor: 'rgba(38, 185, 154, 0.7)',
            // pointBorderColor: 'rgba(38, 185, 154, 0.7)',
            // pointBackgroundColor: 'rgba(38, 185, 154, 0.7)',
            // pointHoverBackgroundColor: '#fff',
            // pointHoverBorderColor: 'rgba(22,22,22,1)',
            // pointBorderWidth: 3,
            data: [this.supportInStoreBarChart, this.diagnoseAndTreatInStoreBarChart, this.inStoreBarChartTreat, this.diagnoseInStoreBarChart]
          }, {
            label: 'ถูกยืม',
            backgroundColor: 'rgb(52,152,219)',
            // borderColor: 'rgba(3, 88, 106, 0.70)',
            // pointBorderColor: 'rgba(3, 88, 106, 0.70)',
            // pointBackgroundColor: 'rgba(3, 88, 106, 0.70)',
            // pointHoverBackgroundColor: '#fff',
            // pointHoverBorderColor: 'rgba(151,187,205,1)',
            // pointBorderWidth: 1,
            data: [this.supportBorrowedBarChart, this.diagnoseAndTreatBorrowedBarChart, this.borrowedBarChartTreat, this.diagnoseBorrowedBarChart]
          }, {
            label: 'ซ่อมบำรุง',
            backgroundColor: 'rgb(231,76,60)',
            // borderColor: 'rgba(255, 0, 0, 0.2)',
            // pointBorderColor: 'rgba(255, 0, 0, 0.2)',
            // pointBackgroundColor: 'rgba(255, 0, 0, 0.2)',
            // pointHoverBackgroundColor: '#fff',
            // pointHoverBorderColor: 'rgba(151,187,205,1)',
            // pointBorderWidth: 1,
            data: [this.supportRepairBarChart, this.diagnoseAndTreatRepairBarChart, this.repairBarChartTreat, this.diagnoseRepairBarChart]
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
      console.log(lineChart)
    },
    setBarChart () {
      var ctx = document.getElementById('mybarChart')
      var mybarChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['สนับสนุน', 'วินิจฉัยและรักษา', 'รักษา', 'วินิจฉัย'],
          datasets: [{
            label: 'จำนวนอุปกรณ์',
            backgroundColor: 'rgb(239,78,73)',
            // borderColor: ['rgba(38, 185, 154, 0.5)', 'rgba(52, 152, 219, 0.5)', 'rgba(69, 92, 115, 0.5)', 'rgba(189, 195, 199, 0.5)'],
            borderWidth: 3,
            data: [this.overTimeReturnSupport, this.overTimeReturnDiagnoseAndTreat, this.overTimeReturnTreat, this.overTimeReturnDiagnose]
          }]
        },

        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                userCallback: function (label, index, labels) {
                  // when the floored value is the same as the value we have a whole number
                  if (Math.floor(label) === label) {
                    return label
                  }
                }
              }
            }]
          }
        }
      })
      console.log(mybarChart)
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
.card {
  padding: .75rem 1.25rem;
  margin-bottom: 0;
  background-color: #ffffff;
  border-bottom: 1px solid rgba(0,0,0,.125);
  border-radius: 4px;
  margin-left: 30px;
  width: 780px;
  height: 470px;
  border: 1px solid #dddddd;
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
  /*border: 1px solid #dddddd;*/
  bottom: 0;
  position: fixed;
  top: 0;
  margin-top: -1px;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.5), 0 1px 20px 0 rgba(0, 0, 0, 0.19); 
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

.chart{
    width: 100%;
    height: 500px;
    font-size: 18px;
  }

  .dropbtn {
    color: #337ab7;
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
  width: 47%;
  height: 415px;
  background: white;
  margin: 40px 10px -10px 20px;
  box-sizing: border-box;
  border: 1px solid #dddddd;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1), 0 1px 20px 0 rgba(0, 0, 0, 0.19);
}

.container ul li .title {
  font-size: 28px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: white;
  text-align: center;
  /* padding-left: 30px; */
  border-bottom: 2px solid #dddddd;
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
</style>
