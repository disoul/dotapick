import scrapy
import redis

class HeroWinrateSpider(scrapy.Spider):
    name = 'herowinrate'
    allowed_domains = ['dotamax.com']
    start_urls = []
    select = 'vcv'

    def __init__(self):
    #get urls from redis
        db = redis.StrictRedis(db=1)
        for url in db.lrange('herourls', 0, 999):
            self.start_urls.append('http://dotamax.com/' + url.split('/')[1] + 
                              '/detail/match_up_anti/' + url.split('/')[3] + '?skill=vh&time=v685&server=cn')


    def parse(self, response):
        matchup = response.css('.sortable tr td:nth-child(2) div:first-child').re(r'\">([0-9\.\-]+)%</div>')
        opponent_names = response.css('.hero-name-list').re(r'list\">([a-zA-Z \-\']+)</span>')
        name = response.css('.hero-title').re(r'\">\n *([a-zA-Z \-\']+?) *</span>')[0]
        db = redis.StrictRedis(db=1)
        self.save_winrate(matchup, opponent_names, name)


    def save_winrate(self, matchup, opponent_names, name):
        db = redis.StrictRedis(db=1)
        for index,item in enumerate(matchup):
            key = 'dphw_'+self.select+'_'+opponent_names[index]+'_'+name
            if db.get(key) != None:
                # if alreday have B_A key, update B_A key to average value
                # else create A_B key
                db.set(key, (float(db.get(key))-float(item)) / 2)
            else:
                db.set('dphw_'+self.select+'_'+name+'_'+opponent_names[index], item)
