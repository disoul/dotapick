import scrapy
import redis

class HeroWinrateSpider(scrapy.Spider):
    name = 'herowinrate'
    allowed_domains = ['dotamax.com']
    start_urls = []

    def __init__(self):
    #get urls from redis
        db = redis.StrictRedis(db=1)
        for url in db.lrange('herourls', 0, 999):
            self.start_urls.append('http://dotamax.com/' + url.split('/')[1] + 
                              '/detail/match_up_anti/' + url.split('/')[3])


    def parse(self, response):
        matchup = response.css('.sortable tr td:nth-child(2) div:first-child').re(r'\">([0-9\.\-]+)%</div>')
        opponent_names = response.css('.hero-name-list').re(r'list\">([a-zA-Z \-\']+)</span>')
        name = response.css('.hero-title').re(r'\">\n *([a-zA-Z \-\']+?) *</span>')[0]
        db = redis.StrictRedis(db=1)
        for index,item in enumerate(matchup):
            db.set('dphw_'+name+'_'+opponent_names[index], item);
