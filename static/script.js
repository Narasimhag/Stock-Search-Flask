var myForm = document.getElementById('my-form');
var resultArea = document.getElementById("result-area");
var result = document.getElementById("result");
var errRes = document.getElementById("error");
var search = document.getElementById("search-btn");
var clear = document.getElementById("clear-btn");

var co = document.getElementById("co-tab");
var ss = document.getElementById("ss-tab");
var ch = document.getElementById("ch-tab");
var nw = document.getElementById("nw-tab");

var coData, ssData, chData, nwData;

search.onmouseover = function() {search.style.backgroundColor = '#dbdbdb';}
search.onmouseout = function() {search.style.backgroundColor = '#f9f9f9';}
clear.onmouseover = function() {clear.style.backgroundColor = '#dbdbdb';}
clear.onmouseout = function() {clear.style.backgroundColor = '#f9f9f9';}


myForm.addEventListener('submit', function (e) {

    e.preventDefault();
    var keyword = document.getElementById("search-text").value;
    // console.log(keyword)
    let url1 = "https://wthw6nrg.azurewebsites.net/company_outlook?keyword=" + keyword;
    let url2 = "https://wthw6nrg.azurewebsites.net/summary?keyword=" + keyword;
    let url3 = "https://wthw6nrg.azurewebsites.net/charts?keyword=" + keyword;
    let url4 = "https://wthw6nrg.azurewebsites.net/news?keyword=" + keyword;

    async function fetchCO(url) {
        // let response = await fetch(url);
        fetch(url).then((response) => {
            if (response.ok) {
              return response.json();
              
            } else {
                errRes.innerHTML = "<h3 style='text-align: center'>Error : No record has been found, please enter a valid symbol.</h3>";
                result.style.visibility = 'hidden';
                resultArea.style.visibility = 'hidden';
                errRes.style.display = 'block';
            }
          })
          .then((responseJson) => {

            if(responseJson === 'error'){
                console.log(responseJson);
                errRes.innerHTML = "<h3 style='text-align: center'>Error : No record has been found, please enter a valid symbol.</h3>";
                result.style.visibility = 'hidden';
                resultArea.style.visibility = 'hidden';
                errRes.style.display = 'block';
            }
            else{
            drawCO(responseJson);
            coData = responseJson;
            }
          })
          .catch((error) => {
            console.log(error)
          });


    }
    

    async function fetchSS(url) {
        // let response = await fetch(url);
        // if (response.status == 200) {
        //     let data = await response.json();  
            
        //     ssData = data;
        // }

        fetch(url).then((response) => {
            if (response.ok) {
              return response.json();
              
            } else {
                errRes.innerHTML = "<h3 style='text-align: center'>Error : No record has been found, please enter a valid symbol.</h3>";
                result.style.visibility = 'hidden';
                resultArea.style.visibility = 'hidden';
                errRes.style.display = 'block';
            }
          })
          .then((responseJson) => {
            if(responseJson === 'error'){
                console.log(responseJson);
                errRes.innerHTML = "<h3 style='text-align: center'>Error : No record has been found, please enter a valid symbol.</h3>";
                result.style.visibility = 'hidden';
                resultArea.style.visibility = 'hidden';
                errRes.style.display = 'block';
            }
            else{
            ssData = responseJson;
            }
          })
          .catch((error) => {
            console.log(error)
          });

    }

    async function fetchCH(url) {
        // let response = await fetch(url);
        // if (response.status == 200) {
        //     let data = await response.json();  
            
        //     chData = data;
        // }

        fetch(url).then((response) => {
            if (response.ok) {
              return response.json();
              
            } else {
                errRes.innerHTML = "<h3 style='text-align: center'>Error : No record has been found, please enter a valid symbol.</h3>";
                result.style.visibility = 'hidden';
                resultArea.style.visibility = 'hidden';
                errRes.style.display = 'block';
            }
          })
          .then((responseJson) => {
            if(responseJson === 'error'){
                console.log(responseJson);
                errRes.innerHTML = "<h3 style='text-align: center'>Error : No record has been found, please enter a valid symbol.</h3>";
                result.style.visibility = 'hidden';
                resultArea.style.visibility = 'hidden';
                errRes.style.display = 'block';
            }
            else{
            chData = responseJson;
            }
          })
          .catch((error) => {
            console.log(error)
          });

    }

    async function fetchNW(url) {
        // let response = await fetch(url);
        // if (response.status == 200) {
        //     let data = await response.json();  
            
        //     nwData = data;
        // }
        fetch(url).then((response) => {
            if (response.ok) {
              return response.json();
              
            } else {
                errRes.innerHTML = "<h3 style='text-align: center'>Error : No record has been found, please enter a valid symbol.</h3>";
                result.style.visibility = 'hidden';
                resultArea.style.visibility = 'hidden';
                errRes.style.display = 'block';
            }
          })
          .then((responseJson) => {
            if(responseJson === 'error'){
                console.log(responseJson);
                errRes.innerHTML = "<h3 style='text-align: center'>Error : No record has been found, please enter a valid symbol.</h3>";
                result.style.visibility = 'hidden';
                resultArea.style.visibility = 'hidden';
                errRes.style.display = 'block';
            }
            else{
            nwData = responseJson;
            }
          })
          .catch((error) => {
            console.log(error)
          });

    }

    fetchCO(url1);  
    fetchSS(url2);
    fetchCH(url3);
    fetchNW(url4);
    
});

function drawCO(data) {

    let htmltext = "<table style='width:100%'> <tr><td class='left-cell'>Company Name</td><td class='right-cell'>"+data['name'] + "</td></tr> \
            <tr><td class='left-cell'>Stock Ticker Symbol</td><td class='right-cell'>"+data['ticker'] + "</td></tr> \
            <tr><td class='left-cell'>Stock Exchange Code</td><td class='right-cell'>"+data['exchangeCode'] + "</td></tr> \
            <tr><td class='left-cell'>Company Start Date</td><td class='right-cell'>"+data['startDate'] + "</td></tr> \
            <tr><td class='left-cell'>Description</td><td class='right-cell text'>"+data['description'] + "</td></tr> \
            </table>";
    
    errRes.style.display = 'none';
    resultArea.innerHTML = htmltext;
    resultArea.style.visibility = 'visible';
    result.style.visibility = 'visible';
    result.style.fontFamily = 'Sarabun';

    co.classList.add('active');
    ch.classList.remove('active');
    ss.classList.remove('active');
    nw.classList.remove('active');

}

function drawSS(data) {
    var htmltext;
    let change = data['change'].toFixed(2)
    let changepercent = data['changepercent'].toFixed(2)
    if (data['change'] < 0) {
        
    htmltext = "<table style='width:100%'> <tr><td class='left-cell'>Stock Ticker Symbol</td><td class='right-cell'>"+data['ticker'] + "</td></tr> \
    <tr><td class='left-cell'>Trading Day</td><td class='right-cell'>"+data['timestamp'] + "</td></tr> \
    <tr><td class='left-cell'>Previous Closing Price</td><td class='right-cell'>"+data['prevClose'] + "</td></tr> \
    <tr><td class='left-cell'>Opening Price</td><td class='right-cell'>"+data['open'] + "</td></tr> \
    <tr><td class='left-cell'>High Price</td><td class='right-cell'>"+data['high'] + "</td></tr> \
    <tr><td class='left-cell'>Low Price</td><td class='right-cell'>"+data['low'] + "</td></tr> \
    <tr><td class='left-cell'>Last Price</td><td class='right-cell'>"+data['last'] + "</td></tr> \
    <tr><td class='left-cell'>Change</td><td class='right-cell'>"+change + "&nbsp;<img class='icon' src='https://csci571.com/hw/hw6/images/RedArrowDown.jpg'></td></tr> \
    <tr><td class='left-cell'>Change Percent</td><td class='right-cell'>"+changepercent + "% &nbsp;<img class='icon' src='https://csci571.com/hw/hw6/images/RedArrowDown.jpg'></td></tr> \
    <tr><td class='left-cell'>Number of Shares Traded</td><td class='right-cell'>"+data['volume'] + "</td></tr> \
    </table>";
    }
    else if(data['change'] > 0) {
    htmltext = "<table style='width:100%'> <tr><td class='left-cell'>Stock Ticker Symbol</td><td class='right-cell'>"+data['ticker'] + "</td></tr> \
    <tr><td class='left-cell'>Trading Day</td><td class='right-cell'>"+data['timestamp'] + "</td></tr> \
    <tr><td class='left-cell'>Previous Closing Price</td><td class='right-cell'>"+data['prevClose'] + "</td></tr> \
    <tr><td class='left-cell'>Opening Price</td><td class='right-cell'>"+data['open'] + "</td></tr> \
    <tr><td class='left-cell'>High Price</td><td class='right-cell'>"+data['high'] + "</td></tr> \
    <tr><td class='left-cell'>Low Price</td><td class='right-cell'>"+data['low'] + "</td></tr> \
    <tr><td class='left-cell'>Last Price</td><td class='right-cell'>"+data['last'] + "</td></tr> \
    <tr><td class='left-cell'>Change</td><td class='right-cell'>"+change + "&nbsp;<img class='icon' src='https://csci571.com/hw/hw6/images/GreenArrowUp.jpg'></td></tr> \
    <tr><td class='left-cell'>Change Percent</td><td class='right-cell'>"+changepercent + "% &nbsp;<img class='icon' src='https://csci571.com/hw/hw6/images/GreenArrowUp.jpg'></td></tr> \
    <tr><td class='left-cell'>Number of Shares Traded</td><td class='right-cell'>"+data['volume'] + "</td></tr> \
    </table>";
    }
    else {
        htmltext = "<table style='width:100%'> <tr><td class='left-cell'>Stock Ticker Symbol</td><td class='right-cell'>"+data['ticker'] + "</td></tr> \
        <tr><td class='left-cell'>Trading Day</td><td class='right-cell'>"+data['timestamp'] + "</td></tr> \
        <tr><td class='left-cell'>Previous Closing Price</td><td class='right-cell'>"+data['prevClose'] + "</td></tr> \
        <tr><td class='left-cell'>Opening Price</td><td class='right-cell'>"+data['open'] + "</td></tr> \
        <tr><td class='left-cell'>High Price</td><td class='right-cell'>"+data['high'] + "</td></tr> \
        <tr><td class='left-cell'>Low Price</td><td class='right-cell'>"+data['low'] + "</td></tr> \
        <tr><td class='left-cell'>Last Price</td><td class='right-cell'>"+data['last'] + "</td></tr> \
        <tr><td class='left-cell'>Change</td><td class='right-cell'>"+change + "</td></tr> \
        <tr><td class='left-cell'>Change Percent</td><td class='right-cell'>"+changepercent + "%</td></tr> \
        <tr><td class='left-cell'>Number of Shares Traded</td><td class='right-cell'>"+data['volume'] + "</td></tr> \
        </table>";
    }

    errRes.style.display = 'none';
    resultArea.innerHTML = htmltext;
    resultArea.style.visibility = 'visible';
    result.style.visibility = 'visible';
    result.style.fontFamily = 'Sarabun';

}

function drawNW(data) {
    var htmltext = "";
    // console.log(data)
    for(var i=0; i<Object.keys(data).length; i++){
        // console.log(data[i]);
        
        var date = data[i]['date'].slice(5, 7) + "/" + data[i]['date'].slice(8, ) + "/" + data[i]['date'].slice(0, 4);
        htmltext += "<div class='pill'><img class='newsImage' src='"+ data[i]['image'] +"' alt='no image'> \
        <div class='nwtitle'>"+data[i]['title'] + "</div> \
        <div class='nwsubtitle'>Published Date: "+date+"</div> \
        <a style='float: left' target='_blank' href='"+data[i]['url']+"'>See Original Post</a></div>";
    }
    errRes.style.display = 'none';
    resultArea.innerHTML = htmltext;
    result.style.visibility = 'visible';
    result.style.fontFamily = 'Sarabun';

}

function drawCH(data) {
    
    data1 = [];
    data2 = [];

    errRes.style.display = 'none';
    for(var i=0; i<Object.keys(data).length; i++){
        date = data[i]['date']

        data1.push([Date.UTC(date.slice(0,4), parseInt(date.slice(5,7), 10) - 1, date.slice(8,)), data[i]['close']]);
        data2.push([Date.UTC(date.slice(0,4), parseInt(date.slice(5,7), 10) -1, date.slice(8,)), data[i]['volume']]);
    }
    
    var keyword = (document.getElementById("search-text").value).toUpperCase();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    var title = 'Stock Price ' + keyword + ' ' + today;
    var htmltext = "<figure style='min-width:1010px; ' class='highcharts-figure'><div id='container-ch'></div></figure>";
    resultArea.innerHTML = htmltext;
    var linktotiingo = "<a href='https://api.tiingo.com/' style='font-size: 0.8rem;'target='_blank' >Source: Tiingo</a>"
    Highcharts.stockChart('container-ch', {
    
        rangeSelector: {
            inputEnabled: false,
            selected: 4,
            buttons: [{
                type: 'day',
                count: 7,
                text: '7d'
            },
            {
                type: 'day',
                count: 15,
                text: '15d'
            },
            {
                type: 'month',
                count: 1,
                text: '1m'
            },
            {
                type: 'month',
                count: 3,
                text: '3m'
            },{
                type: 'month',
                count: 6,
                text: '6m'
            }]
        },

        title: {
            text: title,
            
        },

        subtitle: {
            text: linktotiingo,
            useHTML: true,
            y: 40
        },

        yAxis: [{
            title: {
                text: 'Stock Price'
            },
            opposite: false 
        },
        {   
            title: {
                text: 'Volume'
            }
                
            
        }],
        series: [{
            name:'Stock Price',
            type: 'area',
            name: keyword,
            data: data1,
            tooltip: {
                valueDecimals: 2
            }
        },
        {   
            name: 'Volume',
            type: 'column',
            name: keyword + ' Volume',
            data: data2,
            yAxis: 1,
            pointWidth: 4
        }
        ]
    });


    
}

co.onclick = function() {drawCO(coData);
    co.classList.add('active');
    ch.classList.remove('active');
    ss.classList.remove('active');
    nw.classList.remove('active');
};
ss.onclick = function() {drawSS(ssData);
    ss.classList.add('active');
    co.classList.remove('active');
    ch.classList.remove('active');
    nw.classList.remove('active');
};
nw.onclick = function() {drawNW(nwData);
    nw.classList.add('active');
    co.classList.remove('active');
    ss.classList.remove('active');
    ch.classList.remove('active');
};
ch.onclick = function() {drawCH(chData);
ch.classList.add('active');
co.classList.remove('active');
ss.classList.remove('active');
nw.classList.remove('active');
};
function clearResults(){
    resultArea.innerHTML = "";
    result.style.visibility = "hidden"
}


