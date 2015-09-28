import scrapy
import redis
import re

class HeroWinrateSpider(scrapy.Spider):
    name = 'herowinrate'
    allowed_domains = ['dotamax.com']
    start_urls = []
    selects = {
        'skill': ['all', 'n', 'h', 'vh'],
        'time': ['month', 'v685'],
        'server': ['all', 'cn']
    } 

    def __init__(self):
    #get urls from redis
        db = redis.StrictRedis(db=1)
        for skill in self.selects['skill']:
            for time in self.selects['time']:
                for server in self.selects['server']:
                    for url in db.lrange('herourls', 0, 999):
                        self.start_urls.append('http://dotamax.com/' + url.split('/')[1] + '/detail/match_up_anti/' + url.split('/')[3] +'?time='+ time +'&server='+server+'&skill='+skill)
                        self.start_urls.append('http://dotamax.com/' + url.split('/')[1] + '/detail/match_up_comb/' + url.split('/')[3] +'?time='+ time +'&server='+server+'&skill='+skill)


    def parse(self, response):
        matchup = response.css('.sortable tr td:nth-child(2) div:first-child').re(r'\">([0-9\.\-]+)%</div>')
        opponent_names = response.css('.hero-name-list').re(r'list\">([a-zA-Z \-\']+)</span>')
        name = response.css('.hero-title').re(r'\">\n *([a-zA-Z \-\']+?) *</span>')[0]

        select = re.match(r'.*match\_up\_(.*?)\/.*\?time\=(.*)\&server\=(.*)\&skill\=(.*)',response.url)
        self.save_winrate(matchup, opponent_names, name, select.group(1)[0]+select.group(2)[0]+select.group(3)[0]+select.group(4)[0])


    def save_winrate(self, matchup, opponent_names, name, select):
        print select
        db = redis.StrictRedis(db=1)
        for index,item in enumerate(matchup):
            key = 'dphw_'+select+'_'+opponent_names[index]+'_'+name
            if db.get(key) != None:
                # if alreday have B_A key, update B_A key to average value
                # else create A_B key
                if select[0] == 'a':
                    db.set(key, (float(db.get(key))-float(item)) / 2)
                else:
                    db.set(key, (float(db.get(key))+float(item)) / 2)
            else:
                db.set('dphw_'+select+'_'+name+'_'+opponent_names[index], item)
