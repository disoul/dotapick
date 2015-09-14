import scrapy
import redis


class WinrateSpider(scrapy.Spider):
    name = 'winrate'
    allowed_domains = ['dotamax.com']
    start_urls = [
        'http://dotamax.com/hero/rate/?time=v684&server=cn&skill=n'        
    ]
    herodict = {}


    def parse(self, response):
        heroname_list = (name for name in response.css(".hero-name-list").re(r'(\w+)<'))
        herowinrate_list = (winrate for winrate in response.css(".sortable .segment-green::attr(style)").re(r'width:([0-9.]+)'))

        while True:
            try:
                self.herodict[heroname_list.next()] = float(herowinrate_list.next())
            except:
                break

        for key in self.herodict:
            print key,self.herodict[key]

        self.savedb()

    def savedb(self):
        db = redis.StrictRedis(host='localhost', port='6379', db=0)
        for key in self.herodict:
            db.set(key,self.herodict[key])

