from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import requests, datetime, json
from dateutil.relativedelta import *
from collections import defaultdict
from _datetime import date

app = Flask(__name__)
tiingo_api_key = '1e71f73a22514c52b9db4ecaecce49f9591c3170'
news_api_key = '2e7017b773464037b9fdd634ca5c79ec'


if __name__ == '__main__':
    app.debug =True
    app.run()

@app.route('/')   
def home():
    return app.send_static_file("index.html") 

@app.route('/company_outlook', methods=['GET'])
@cross_origin()
def get_tiingo_data():
    keyword = request.args.get('keyword')
    output_json = {}
    url = ('https://api.tiingo.com/tiingo/daily/' + str(keyword) + '?token=' + tiingo_api_key)
    response = requests.get(url)
    error = 'error'
    if(response.status_code==200):
        # print(response.text)
        response_json = response.json()

        if response.json():       
            output_json['ticker'] = response_json['ticker']
            output_json['name'] = response_json['name']
            output_json['description'] = response_json['description']
            output_json['exchangeCode'] = response_json['exchangeCode']
            output_json['startDate'] = response_json['startDate']
            
            # print(jsonify(output_json))
            return jsonify(output_json)
        else:
            return 0
    else:
        return jsonify(error)


@app.route('/summary', methods=['GET'])
@cross_origin()
def get_stock_summary():
    error = 'error'
    keyword = request.args.get('keyword')
    url = ('https://api.tiingo.com/iex/' + keyword + '?token=' + tiingo_api_key)
    response = requests.get(url)

    if(response.status_code==200):
        output_json = {}
        response_json = response.json()
        if response_json:
                    
            output_json['ticker'] = response_json[0]['ticker']
            output_json['timestamp'] = response_json[0]['timestamp'][:10]
            output_json['prevClose'] = response_json[0]['prevClose']
            output_json['open'] = response_json[0]['open']
            output_json['high'] = response_json[0]['high']
            output_json['low'] = response_json[0]['low']
            output_json['last'] = response_json[0]['last']
            temp = float(output_json['last']) - float(output_json['prevClose'])
            output_json['change'] = temp
            output_json['changepercent'] = temp / float(output_json['prevClose']) * 100
            output_json['volume'] = response_json[0]['volume']
            
            return jsonify(output_json)
            
        else:
            return 0
    elif(response.status_code==500):
        return jsonify(error)

@app.route('/charts', methods=['GET'])
@cross_origin()
def call_high_charts():
    error = 'error'
    keyword = request.args.get('keyword')
    today = date.today()
    startDate = today + relativedelta(months=-6)
    url = ('https://api.tiingo.com/iex/' + keyword +'/prices?startDate=' + str(startDate) + 
            '&resampleFreq=12hour&columns=open,high,low,close,volume&token=' + tiingo_api_key)
    output_json = defaultdict(dict)
    response = requests.get(url)
    response_json = response.json()
    if(response.status_code==200):
        if response_json:
            for i, ant in enumerate(response_json):
                output_json[i]['date'] = ant['date'][:10]
                output_json[i]['close'] = ant['close']
                output_json[i]['volume'] = ant['volume']
            
            return jsonify(output_json)
        else:
            return 0
    else:
        return jsonify(error)

@app.route('/news', methods=['GET'])
@cross_origin()
def call_news_api():
    error = 'error'
    keyword = request.args.get('keyword')
    url = ('https://newsapi.org/v2/everything?q=' + keyword + '&apiKey=' + news_api_key)
    output_json = defaultdict(dict)
    response = requests.get(url)
    response_json = response.json()
    if(response.status_code==200):
        if response: 
            if len(response_json['articles']) == 0:
                return -1
            top_five = [] #response_json['articles'][:5]
            for art in response_json['articles']:
                if art['urlToImage'] == "" or art['title'] == "" or art['publishedAt'] == "" or art['url']== "":
                    continue
                else:
                    top_five.append(art)
                
                top_five = top_five[:5]

            for i, art in enumerate(top_five):
                output_json[i]['image'] = art['urlToImage']
                output_json[i]['title'] = art['title']
                output_json[i]['date'] = art['publishedAt'][:10]
                output_json[i]['url'] = art['url']
            
            return jsonify(output_json)
        else:
            return 0
    elif(response.status_code==500):
        return jsonify(error)

