# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class MaxspiderItem(scrapy.Item):
    heroname1 = scrapy.Field()
    heroname2 = scrapy.Field()
    winrate = scrapy.Field()
