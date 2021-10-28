/**
 * @file source code from: https://www.chartjs.org/docs/latest/, data source from: https://coronavirus.data.gov.uk/
 */
/** 
 * theNumberOfCases
 * @type {undefined} 
 * @description this is used to change text in html to show the total number of cases.
 */
const theNumberOfCases = document.querySelector(".totalCases .totalNumber");
/**
 * theNumberOfDeaths
 * @type {undefined} 
 * @description this is used to change text in html to show the total number of deaths.
 */
const theNumberOfDeaths = document.querySelector(".totalDeaths .totalNumber");
/**
 * theNumberOfDeaths
 * @type {undefined} 
 * @description this is used to change text in html to show the total number of deaths.
 */
const theNumberOfPatients = document.querySelector(".totalPatients .totalNumber");
/**
 * information
 * @type {undefined} 
 * @description this is used to change text in html to show where the place.
 * @example This is data in the UK.
 */
const information = document.querySelector(".infor");
/**
 * ctx
 * @type {chartElemnet} 
 * @description this is to help draw graph by using chart.js, source:https://www.chartjs.org/docs/latest/
 */
const ctx = document.getElementById('UkChartTotal').getContext('2d');
/**
 * date
 * @type {Array} 
 * @description store total history date
 * 
 * dailydeaths
 * @type {Array} 
 * @description store total deaths in last 28 days
 * 
 * dailyconfirmed
 * @type {Array}
 * @description store total confirmed
 * 
 * dailyPatients
 * @type {Array}
 * @description store total patients in hospital
 * 
 * chartMap
 * @type {chartMaker} 
 * @description this is for drawing chart by using chart.js, source:https://www.chartjs.org/docs/latest/
 */
let date = [],
    dailydeaths = [],
    dailyconfirmed = [],
    dailyPatients = [],
    chartMap;
async function fetchDataUK(){
  /**
  * @method fetchDataUK
  * @description this is to load covid data from json file, source from: https://coronavirus.data.gov.uk/
  */
  /**
   * @function reset
   * @description reset data to empty array, avoid data massy.
   */
    reset();
  /**
   * response
   * @global
   * @description - promise from json file, give the response.
   */
    const response = await fetch('UkHistoryCases.json');
  /**
   * wholeJson
   * @global
   * @description - json content form json file
   */
    const wholeJson = await response.json();
  /**
   * wholeData
   * @global
   * @description - whole data about cases in the UK
   */
    const wholeData = await wholeJson.data;
  /**
   * @method getData
   * @description this is to find each value and put it in each array, then put values as correct order.
   * @param element -each element in wholeData array.
   * @property {newDate} - get a array about data.
   * @property {newCases} - get a array about cases.
   */
    // getData
    wholeData.forEach(element => {
      /**
       * @global
       * @type {Array}
       * @description get history date from json file
       */
        const newDate = element.date;
        date.push(newDate); //push value in
      /**
       * @global
       * @type {Array}
       * @description get total new cases from json file
       */
        const newCases = element.newCasesBySpecimenDate;
        dailyconfirmed.push(newCases); //push value in
    })
    date = date.reverse(); // set as correct order
    dailyconfirmed = dailyconfirmed.reverse(); // set as correct order
    
    /**
     * @global
     * @type {response}
     */
    const responsee = await fetch('UkHistoryDeaths.json'); 
    /**
     * @global
     * @type {wholeJson}
     */
    const wholeJsonn = await responsee.json();
    /**
     * @global
     * @type {wholeData}
     */
    const wholeDataa = await wholeJsonn.data;
    /**
   * @method getDataa
   * @type {getData}
   */
    //getDataa
    wholeDataa.forEach(element => {
      /**
       * @global
       * @type {Array}
       * @description get total deaths from json file
       */
        const cumDeaths = element.cumDeaths28DaysByDeathDate;
        dailydeaths.push(cumDeaths); // get the value
    })
    dailydeaths = dailydeaths.reverse(); // get right order
    /**
     * @global
     * @type {response}
     */
    const responseee = await fetch('UkHistoryHospital.json');
    /**
     * @global
     * @type {wholeJson}
     */
    const wholeJsonnn = await responseee.json();
    /**
     * @global
     * @type {wholeData}
     */ 
    const wholeDataaa = await wholeJsonnn.data;
    /**
     * @method getDataaa
     * @type {getData}
     */
    //getDataaa
    wholeDataaa.forEach(element => {
        /**
         * @global
         * @type {Array}
         * @description get total patients from json file
         */
        const cumPatients = element.cumAdmissions;
        dailyPatients.push(cumPatients); // get the value
    })
    dailyPatients = dailyPatients.reverse(); // get right order
}
// data in the England history
// same function as fetchDataUK()
async function fetchDataEngland(){
  /**
   * @method fetchDataEngland
   * @type {fetchDataUK}
   * @description source from: https://coronavirus.data.gov.uk/,https://covid-19-uk-data-by-zt.p.rapidapi.com/GetAllHistoricalDataForEngland
   */
    reset();
    const response = await fetch("https://covid-19-uk-data-by-zt.p.rapidapi.com/GetAllHistoricalDataForEngland", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "0e7d0e152bmsh32eface8021f33bp17995cjsnb49e50de38dd",
            "x-rapidapi-host": "covid-19-uk-data-by-zt.p.rapidapi.com"
        }
    })
    const wholeArray = await response.json();
    const WholeData = await wholeArray.records;
    WholeData.forEach(element => {
        const newDate = element.dateofrecord;
        date.push(newDate);
        const WholeCases = element.cases;
        const newDailyCases = WholeCases.dailyconfirmed;
        dailyconfirmed.push(newDailyCases);
        const newDeaths = WholeCases.dailydeceased;
        dailydeaths.push(newDeaths);
    })
    const responsee = await fetch('EnglandHistoryHospital.json')
    const WholeList = await responsee.json();
    const WholeDataa = await WholeList.data;
    WholeDataa.forEach(element => {
        const newDailyPatients = element.newAdmissions;
        dailyPatients.push(newDailyPatients);
    })
    dailyPatients = dailyPatients.reverse();
}
// data in the NorthernIreland history
async function fetchDataNorthernIreland(){
  /**
   * @method fetchDataNorthernIreland
   * @type {fetchDataUK}
   * @description source from: https://coronavirus.data.gov.uk/
   */
    reset();
    const response = await fetch('NorthHistoryCases.json');
    const wholeJson = await response.json();
    const wholeData = await wholeJson.data;
    wholeData.forEach(element => {
        const newDate = element.date;
        date.push(newDate);
        const newCases = element.newCasesBySpecimenDate;
        dailyconfirmed.push(newCases);
    })
    date = date.reverse();
    dailyconfirmed = dailyconfirmed.reverse();
    const responsee = await fetch('NorthHistoryDeaths.json'); 
    const wholeJsonn = await responsee.json();
    const wholeDataa = await wholeJsonn.data;
    wholeDataa.forEach(element => {
        const newDeaths = element.newDeaths28DaysByDeathDate;
        dailydeaths.push(newDeaths);
    })
    dailydeaths = dailydeaths.reverse();
    const responseee = await fetch('NorthHistoryHosipital.json');
    const wholeJsonnn = await responseee.json();
    const wholeDataaa = await wholeJsonnn.data;
    wholeDataaa.forEach(element => {
        const newPatients = element.newAdmissions;
        dailyPatients.push(newPatients);
    })
    dailyPatients = dailyPatients.reverse();
}
// data in the Scotland history
async function fetchDataScotland(){
  /**
   * @method fetchDataScotland
   * @type {fetchDataUK}
   * @description source from: https://coronavirus.data.gov.uk/
   */
    reset();
    const response = await fetch('ScotlandHistoryCases.json');
    const wholeJson = await response.json();
    const wholeData = await wholeJson.data;
    wholeData.forEach(element => {
        const newDate = element.date;
        date.push(newDate);
        const newCases = element.newCasesBySpecimenDate;
        dailyconfirmed.push(newCases);
    })
    date = date.reverse();
    dailyconfirmed = dailyconfirmed.reverse();
    const responsee = await fetch('ScotlandHistoryDeaths.json'); 
    const wholeJsonn = await responsee.json();
    const wholeDataa = await wholeJsonn.data;
    wholeDataa.forEach(element => {
        const newDeaths = element.newDeaths28DaysByDeathDate;
        dailydeaths.push(newDeaths);
    })
    dailydeaths = dailydeaths.reverse();
    const responseee = await fetch('ScotlandHistoryHospital.json');
    const wholeJsonnn = await responseee.json();
    const wholeDataaa = await wholeJsonnn.data;
    wholeDataaa.forEach(element => {
        const newPatients = element.newAdmissions;
        dailyPatients.push(newPatients);
    })
    dailyPatients = dailyPatients.reverse();
}
// data in the Scoland
async function fetchDataWales(){
  /**
   * @method fetchDataWales
   * @type {fetchDataUK}
   * @description source from: https://coronavirus.data.gov.uk/
   */
    reset();
    const response = await fetch('WalesHistoryCases.json');
    const wholeJson = await response.json();
    const wholeData = await wholeJson.data;
    wholeData.forEach(element => {
        const newDate = element.date;
        date.push(newDate);
        const newCases = element.newCasesBySpecimenDate;
        dailyconfirmed.push(newCases);
    })
    date = date.reverse();
    dailyconfirmed = dailyconfirmed.reverse();
    const responsee = await fetch('WalesHistoryDeaths.json'); 
    const wholeJsonn = await responsee.json();
    const wholeDataa = await wholeJsonn.data;
    wholeDataa.forEach(element => {
        const newDeaths = element.newDeaths28DaysByDeathDate;
        dailydeaths.push(newDeaths);
    })
    dailydeaths = dailydeaths.reverse();
    const responseee = await fetch('WalesHistoryHospital.json');
    const wholeJsonnn = await responseee.json();
    const wholeDataaa = await wholeJsonnn.data;
    wholeDataaa.forEach(element => {
        const newPatients = element.newAdmissions;
        dailyPatients.push(newPatients);
    })
    dailyPatients = dailyPatients.reverse();
}
// data in the total UK
async function fetchTotalUKData(){
  /**
   * @method fetchTotalUKData
   * @type {fetchDataUK}
   * @description source from: https://coronavirus.data.gov.uk/,https://covid-19-uk-data-by-zt.p.rapidapi.com/GetUKTotalCounts
   */
    const response = await fetch("https://covid-19-uk-data-by-zt.p.rapidapi.com/GetUKTotalCounts", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "0e7d0e152bmsh32eface8021f33bp17995cjsnb49e50de38dd",
            "x-rapidapi-host": "covid-19-uk-data-by-zt.p.rapidapi.com"
        }
    })
    const wholeArray = await response.json();
    const wholeDataArray = await wholeArray.data[0];
        theNumberOfCases.innerHTML = wholeDataArray.confirmed;
        theNumberOfDeaths.innerHTML = wholeDataArray.deaths;
    theNumberOfPatients.innerHTML = '359247';
}
async function fetchTotalEngland(){
  /**
   * @method fetchTotalEngland
   * @type {fetchDataUK}
   * @description source from: https://coronavirus.data.gov.uk/,https://covid-19-uk-data-by-zt.p.rapidapi.com/GetUKCountryWiseData
   */
    const response = await fetch("https://covid-19-uk-data-by-zt.p.rapidapi.com/GetUKCountryWiseData", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "0e7d0e152bmsh32eface8021f33bp17995cjsnb49e50de38dd",
		"x-rapidapi-host": "covid-19-uk-data-by-zt.p.rapidapi.com"
    }
    })
    const wholeArray = await response.json();
    const wholeDataArray = await wholeArray.data[0]
        theNumberOfCases.innerHTML = wholeDataArray.confirmed;
        theNumberOfDeaths.innerHTML = wholeDataArray.deaths;
    theNumberOfPatients.innerHTML = '311064';
}
async function fetchTotalNorthData(){
  /**
   * @method fetchTotalNorthData
   * @type {fetchDataUK}
   * @description source from: https://coronavirus.data.gov.uk/,https://covid-19-uk-data-by-zt.p.rapidapi.com/GetUKCountryWiseData
   */
  const response = await fetch("https://covid-19-uk-data-by-zt.p.rapidapi.com/GetUKCountryWiseData", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "0e7d0e152bmsh32eface8021f33bp17995cjsnb49e50de38dd",
		"x-rapidapi-host": "covid-19-uk-data-by-zt.p.rapidapi.com"
    }
    })
    const wholeArray = await response.json();
    const wholeDataArray = await wholeArray.data[1]
        theNumberOfCases.innerHTML = wholeDataArray.confirmed;
        theNumberOfDeaths.innerHTML = wholeDataArray.deaths;
    theNumberOfPatients.innerHTML = '7281';
}
async function fetchTotalScotland(){
  /**
   * @method fetchTotalScotland
   * @type {fetchDataUK}
   * @description source from: https://coronavirus.data.gov.uk/,https://covid-19-uk-data-by-zt.p.rapidapi.com/GetUKCountryWiseData
   */
    const response = await fetch("https://covid-19-uk-data-by-zt.p.rapidapi.com/GetUKCountryWiseData", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "0e7d0e152bmsh32eface8021f33bp17995cjsnb49e50de38dd",
		"x-rapidapi-host": "covid-19-uk-data-by-zt.p.rapidapi.com"
    }
    })
    const wholeArray = await response.json();
    const wholeDataArray = await wholeArray.data[2]
        theNumberOfCases.innerHTML = wholeDataArray.confirmed;
        theNumberOfDeaths.innerHTML = wholeDataArray.deaths;
    theNumberOfPatients.innerHTML = '18481';
}
async function fetchTotalWales(){
  /**
   * @method fetchTotalWales
   * @type {fetchDataUK}
   * @description source from: https://coronavirus.data.gov.uk/,https://covid-19-uk-data-by-zt.p.rapidapi.com/GetUKCountryWiseData
   */
    const response = await fetch("https://covid-19-uk-data-by-zt.p.rapidapi.com/GetUKCountryWiseData", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "0e7d0e152bmsh32eface8021f33bp17995cjsnb49e50de38dd",
		"x-rapidapi-host": "covid-19-uk-data-by-zt.p.rapidapi.com"
    }
    })
    const wholeArray = await response.json();
    const wholeDataArray = await wholeArray.data[0]
        theNumberOfCases.innerHTML = wholeDataArray.confirmed;
        theNumberOfDeaths.innerHTML = wholeDataArray.deaths;
    theNumberOfPatients.innerHTML = '26627';
}
function reset(){
  /**
   * @method reset
   * @description make data as empty array
   */
    date = [],
    dailydeaths = [],
    dailyconfirmed = [],
    dailyPatients = [];
}
function UK(){
  /**
   * @method UK
   * @description draw the chart when click the button.
   */
    information.innerHTML = '<span class="infor"><h2>This is data in the UK.</h2></span>';
    DrawUkChart();
}
function England(){
  /**
   * @method England
   * @type {UK}
   * @description draw the chart when click the button.
   */
    DrawEnglandChart();
}
function North(){
  /**
   * @method North
   * @type {UK}
   * @description draw the chart when click the button.
   */
    information.innerHTML = '<span class="infor"><h2>This is data in NorthernIreland.</h2></span>';
    DrawNorthChart();
}
function Scoland(){
  /**
   * @method Scoland
   * @type {UK}
   * @description draw the chart when click the button.
   */
    information.innerHTML = '<span class="infor"><h2>This is data in Schotland.</h2></span>';
    DrawScoChart();
}
function Wales(){
  /**
   * @method Wales
   * @type {UK}
   * @description draw the chart when click the button.
   */
    information.innerHTML = '<span class="infor"><h2>This is data in Wales.</h2></span>';
    DrawWalesChart();
}
async function DrawUkChart(){
  /**
   * @method DrawUkChart
   * @description draw UK chart by using chart.js, sourse from:https://www.chartjs.org/docs/latest/
   */
    await fetchDataUK();
    await fetchTotalUKData();
    chartMap = new Chart(ctx, {
        type: "line",
        data: {
          datasets: [
            {
                label: "DailyCases",
                data: dailyconfirmed,
                fill: false,
                borderColor: "#ff9900",
                backgroundColor: "#ff9900",
                borderWidth: 1,
              },
            {
              label: "TotalPatients",
              data: dailyPatients,
              fill: false,
              borderColor: "#009688",
              backgroundColor: "#009688",
              borderWidth: 1,
            },
            {
              label: "TotalDeaths",
              data: dailydeaths,
              fill: false,
              borderColor: "#f44336",
              backgroundColor: "#f44336",
              borderWidth: 1,
            },
          ],
          labels: date,
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
        },
      });
}
async function DrawEnglandChart(){
  /**
   * @method DrawEnglandChart
   * @type {DrawUkChart}
   * @description sourse from:https://www.chartjs.org/docs/latest/
   */
    await fetchDataEngland();
    await fetchTotalEngland();
    chartMap = new Chart(ctx, {
        type: "line",
        data: {
          datasets: [
            {
              label: "DailyConfirmed",
              data: dailyconfirmed,
              fill: false,
              borderColor: "#ff9900",
              backgroundColor: "#ff9900",
              borderWidth: 1,
            },
            {
              label: "TotalDeaths",
              data: dailydeaths,
              fill: false,
              borderColor: "#009688",
              backgroundColor: "#009688",
              borderWidth: 1,
            },
            {
              label: "TotalPatients",
              data: dailyPatients,
              fill: false,
              borderColor: "#f44336",
              backgroundColor: "#f44336",
              borderWidth: 1,
            },
          ],
          labels: date,
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
        },
      });
}
async function DrawNorthChart(){
  /**
   * @method DrawNorthChart
   * @type {DrawUkChart}
   * @description sourse from: https://www.chartjs.org/docs/latest/
   */
    await fetchDataNorthernIreland();
    await fetchTotalNorthData();
    chartMap = new Chart(ctx, {
        type: "line",
        data: {
          datasets: [
            {
              label: "DailyConfirmed",
              data: dailyconfirmed,
              fill: false,
              borderColor: "#ff9900",
              backgroundColor: "#ff9900",
              borderWidth: 1,
            },
            {
              label: "TotalDeaths",
              data: dailydeaths,
              fill: false,
              borderColor: "#009688",
              backgroundColor: "#009688",
              borderWidth: 1,
            },
            {
              label: "TotalPatients",
              data: dailyPatients,
              fill: false,
              borderColor: "#f44336",
              backgroundColor: "#f44336",
              borderWidth: 1,
            },
          ],
          labels: date,
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
        },
      });
}
async function DrawWalesChart(){
  /**
   * @method DrawWalesChart
   * @type {DrawUkChart}
   * @description sourse from:https://www.chartjs.org/docs/latest/
   */
    await fetchDataWales();
    await fetchTotalWales();
    chartMap = new Chart(ctx, {
        type: "line",
        data: {
          datasets: [
            {
              label: "DailyConfirmed",
              data: dailyconfirmed,
              fill: false,
              borderColor: "#ff9900",
              backgroundColor: "#ff9900",
              borderWidth: 1,
            },
            {
              label: "TotalDeaths",
              data: dailydeaths,
              fill: false,
              borderColor: "#009688",
              backgroundColor: "#009688",
              borderWidth: 1,
            },
            {
              label: "TotalPatients",
              data: dailyPatients,
              fill: false,
              borderColor: "#f44336",
              backgroundColor: "#f44336",
              borderWidth: 1,
            },
          ],
          labels: date,
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
        },
      });
}
async function DrawScoChart(){
  /**
   * @method DrawScoChart
   * @type {DrawUkChart}
   * @description sourse from:https://www.chartjs.org/docs/latest/
   */
    await fetchDataScotland();
    await fetchTotalScotland();
    chartMap = new Chart(ctx, {
        type: "line",
        data: {
          datasets: [
            {
              label: "DailyConfirmed",
              data: dailyconfirmed,
              fill: false,
              borderColor: "#ff9900",
              backgroundColor: "#ff9900",
              borderWidth: 1,
            },
            {
              label: "TotalDeaths",
              data: dailydeaths,
              fill: false,
              borderColor: "#009688",
              backgroundColor: "#009688",
              borderWidth: 1,
            },
            {
              label: "TotalPatients",
              data: dailyPatients,
              fill: false,
              borderColor: "#f44336",
              backgroundColor: "#f44336",
              borderWidth: 1,
            },
          ],
          labels: date,
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
        },
      });
}
DrawUkChart();