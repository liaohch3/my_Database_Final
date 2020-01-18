import os
import requests
from bs4 import BeautifulSoup
import bs4
import re
import json
import xlrd
from threading import Thread 
from queue import Queue
from multiprocessing import Process,Lock
from lxml import etree

# from CONFIG import *

base_url = 'https://nba.hupu.com/stats/players/pts/'
player_desired = 350

headers = {
    'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36',  
    "Connection" : "keep-alive",
    "Cache-Control" : "max-age=0",
    "Upgrade-Insecure-Requests" : "1",
    "Accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    "Accept-Encoding" : "gzip, deflate, br",
    "Accept-Language" : "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
}



def get_player(setu_desired, base_url):
    ply_list = []
    player_count = 0
    page = 1
    with open('./players.json','w',encoding='UTF-8') as f:
        # dump用来写入文件而不是字符串
        # indent=4规定缩进，ensure_ascii=False保护中文字符
        # 够数之前一直翻页
        while True:
            stat_list = []
            roll_url = base_url+str(page)
            demo = getHTMLText(roll_url)
            # print(demo)
            soup = BeautifulSoup(demo, "html.parser")
            # print()
            infos = soup.find('div',{'class':'tables'}).find('table',{'class':'players_table'})
            players = infos.find_all('tr',{'class':''})
            for item in players:
                stat_list = []
                # print(item)
                left = item.find('td', {'class':'left'})
                apage = left.a.get('href')
                page_text = getHTMLText(apage)
                page_soup = BeautifulSoup(page_text, "html.parser")
                img_url = page_soup.find('div',{'class':'img'}).img.get('src')
                # print(img_url)
                pos = page_soup.find('div',{'class':'font'}).find('p').get_text()
                
                height = page_soup.find('div',{'class':'font'}).find_all('p')[1].get_text()

                weight = page_soup.find('div',{'class':'font'}).find_all('p')[2].get_text()

                # print(pos)
                name = left.a.get_text()
                pts = item.find('td', {'class':'bg_b'}).get_text()
                print(name)
                stats = item.find_all('td',{'class':''})
                for ii in stats:
                    stat_list.append(ii.get_text())
                # print(stat_list)
                print(20*'-')
                try:
                    pos_ = re.findall('：(.*?)（', pos)[0]
                except:
                    pos_ = 'G'
                try:
                    pos_ = re.findall('(.*?)-', pos_)[0]
                except:
                    pass
                try:
                    num_ = re.findall('（(.*?)号）', pos)[0]
                except:
                    num_ = 0
                height_ = re.findall('：(.*?)米', height)[0]
                weight_ = re.findall('：(.*?)公斤', weight)[0]

                # print(pos_, num_)
                # print(height_, weight_)
                res = {'index':player_count, 'name':name, 'pos':pos_, 'num':int(num_), 'height':int(float(height_)*100), 'weight':float(weight_), 'photo':img_url, 'pts':float(pts), 'shooting':float(stat_list[3][:-1]), 'threepts':float(stat_list[5][:-1]), 'freethrows':float(stat_list[7][:-1])}
                json.dump(res,f,indent=4,ensure_ascii=False)

                player_count += 1
                if player_count >= player_desired:
                    break

            if player_count >= player_desired:
                break

            page += 1



def getHTMLText(url):
    try:
        r = requests.get(url, headers=headers, timeout = 30)
        r.raise_for_status()
        r.encoding = r.apparent_encoding
        return r.text
    except:
        return ""

def get_json(ply_list):
    # 若文件不存在，则获取数据并写入
    with open('./players.json','w',encoding='UTF-8') as f:
        # dump用来写入文件而不是字符串
        # indent=4规定缩进，ensure_ascii=False保护中文字符
        json.dump(ply_list,f,indent=4,ensure_ascii=False)

def main():
    get_player(player_desired, base_url)

    # myNews = get_myNews_json(news_desired, base_url, mynews_json)
    # get_news_txt(myNews)
main()


