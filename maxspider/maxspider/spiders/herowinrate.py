import scrapy
import redis

class HeroWinrateSpider(scrapy.Spider):
    name = 'herowinrate'
    allowed_domains = ['dotamax.com']
    start_urls = [
        
    ]
