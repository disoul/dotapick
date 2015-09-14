import scrapy

class WinrateSpider(scrapy.Spider):
    name = 'winrate'
    allowed_domains = ['dotamax.com']
    start_urls = [
        'http://dotamax.com/hero/rate/?time=v684&server=cn&skill=n'        
    ]
    herodict = {}
    herolist = []

    def parse(self, response):
        heroname_list = (name for name in response.css(".hero-name-list").re(r'(\w+)<'))
        herowinrate_list = (winrate for winrate in response.css(".sortable .segment-green::attr(style)").re(r'width:([0-9.]+)'))

        while True:
            try:
                self.herodict[heroname_list.next()] = float(herowinrate_list.next())
            except:
                break

        self.herolist = sorted(self.herodict.iteritems(), key=lambda d:d[1], reverse = True)
        for key, value in self.herolist:
            print key, value
