from flask import render_template, request, escape
from app import app
# import pymysql as mdb
import MySQLdb as mdb
from a_Model import ModelIt
import csv
import os
import urllib2



@app.route('/')
@app.route('/index')
def index():
    return render_template("index.html")

@app.route('/output')
def cafes_output():
  url = request.args.get('URL')
  url = url.encode('utf_8',errors='ignore')
  # url = urllib2.quote(url,':/')

  db = mdb.connect(user="paul", passwd="aaa", host="localhost", db="coffee_shops", charset='utf8')

  # db = mdb.connect(user="root", host="localhost", db="coffee_shops", charset='utf8')
  with db:
    cur = db.cursor()
    #just select the city from the world_innodb that the user inputs
    cur.execute("SELECT biz_name, first_match, first_match_score, second_match, second_match_score, third_match,third_match_score, fourth_match, fourth_match_score, first_match_url, second_match_url, third_match_url, fourth_match_url, url FROM coffee_table WHERE url ='%s';" % url)
    query_results = cur.fetchall()


  cafes = []
  for result in query_results:
    name_clean = result[0].replace(' ','%20')
    first_match_clean = result[1].replace(' ','%20')
    second_match_clean = result[3].replace(' ','%20')
    third_match_clean = result[5].replace(' ','%20')
    fourth_match_clean = result[7].replace(' ','%20')
    cafes.append(dict(name=result[0], first_match=result[1], first_match_score=result[2], second_match=result[3], second_match_score=result[4], third_match=result[5],third_match_score=result[6], fourth_match=result[7], fourth_match_score=result[8], name_c = name_clean, first_match_c=first_match_clean, second_match_c = second_match_clean, third_match_c = third_match_clean, fourth_match_c = fourth_match_clean, first_match_url = result[9], second_match_url = result[10], third_match_url = result[11], fourth_match_url = result[12], search_url = result[13]))

  id_list = ['methods' , 'light_roast' , 'mega_chain' , 'work' , 'cozy' , 'food' , 'alcohol_text' , 'rude' , 'expensive' , 'espresso' , 'review_count' , 'price_rating' , 'rating' , 'noise_level' , 'wi_fi']
  order_list = [1.1,1.5,1.9,2.3,3.1,3.7,3.9,4.1,4.7,5,6,7,8,9,10]

  weight = [3,3,3,3,3,3,3,3,3,3,1,1,1,1,1]
  color_list = ['#9E0041', '#C32F4B', '#E1514B', '#F47245', '#FB9F59', '#FEC574', '#FAE38C', '#EAF195', '#C7E89E', '#9CD6A4','#6CC4A4', '#4D9DB4', '#4776B4', '#5E4EA1', '#4D9DB4']
  name_list = ['Methods' , 'Light Roast' , 'Mega Chain' , 'Work' , 'Cozy' , 'Food' , 'Alcohol Text' , 'Rude' , 'Expensive' , 'Espresso' , 'Review Count' , 'Price Rating' , 'Rating' , 'Noise Level' , 'Wi-Fi']
 
  url_list = [url, cafes[0]['first_match_url'], cafes[0]['second_match_url'], cafes[0]['third_match_url'], cafes[0]['fourth_match_url']]

  for index, result_url in enumerate(url_list):
    with db:
      cur = db.cursor()
      cur.execute("SELECT methods, light_roast, mega_chain, work, cozy, food, alcohol_text, rude, expensive, espresso, review_count, price_rating, rating, noise_level, wi_fi FROM coffee_table WHERE url ='%s' LIMIT 1;" % result_url)
      score1_query_results = cur.fetchall()
    score_list = score1_query_results[0]

    aster_data_list = []
    aster_data_list.append(["id","order","score","weight","color","label"])

    for i, item in enumerate(id_list):
      #When scores are close to zero they don't even show up on chart, put a floor at 5
      if (100*score_list[i]) < 5:
        temp_score = 5
      else:
        temp_score = 100 * score_list[i]
      row = [item,order_list[i],int(temp_score),weight[i],color_list[i],name_list[i]]
      
      aster_data_list.append(row)
    file = "/var/www/Flaskapp/app/static/aster_data"+str(index)+".csv"
    path=os.getcwd()+file
    myfile = open(file, 'wb')
    try:
      wr = csv.writer(myfile,quoting=csv.QUOTE_NONNUMERIC)
      for row in aster_data_list:
        wr.writerow(row)
    finally:
      myfile.close()


  # first_result_scores = []
  # for result in query_results:
  #   first_result_scores.append(dict(methods = result[0], light_roast = result[1], mega_chain = result[2], work = result[3], cozy = result[4], food = result[5], alcohol_text = result[6], rude = result[7], expensive = result[8], espresso = result[9], review_count = result[10], price_rating = result[11], rating = result[12], alcohol = result[13], noise_level = result[14], wi_fi = result[15]))

  method_color_list= []
  for index, color in enumerate(color_list):
    row = {}
    row['color'] = color
    row['method'] = name_list[index]
    method_color_list.append(row)

  return render_template("output.html", cafes = cafes, query_results = query_results, method_color_list = method_color_list)

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.errorhandler(500)
def page_not_found(e):
    return render_template('500.html'), 500
