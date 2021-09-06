const options = {legend: {labels: {  // This more specific font property overrides the global property
    fontFamily:'Poppins',
    fontSize: 0,
    },display:false,
  },
maintainAspectRatio:false,
scales: { yAxes: [{ gridLines:{
color:'rgba(0, 100, 0, 0.0)',
drawBorder:true,
zeroLineColor:'rgba(0, 100, 0, 0.1)'},
ticks: { display:true,
beginAtZero: true,
fontFamily:'Poppins',
fontColor:'#3a3a3a'},},],
xAxes:[{gridLines:{
color:'rgba(0, 100, 0, 0.0)',
zeroLineColor:'rgba(0, 100, 0, 0.1)'},
ticks: {display:true,
beginAtZero: true,
fontFamily:'Poppins',
fontColor:'#3a3a3a'},
},]},}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let date = new Date()
const alternative = month =>{
    return date.getMonth()-month < 0?date.getMonth()-month + 12 : date.getMonth()-month
}

let month = date.getMonth()+1
let day = date.getDate()
if(day<10)day = '0' + day
let year = date.getFullYear()
let shortStartDate = day + "/" + month + "/" + year 

export default {options,months, alternative, date: shortStartDate}  