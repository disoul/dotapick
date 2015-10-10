#!/usr/bin/env python
import redis
import json

selects = ['amaa', 'aman', 'amah', 'amav', 'amca', 'amcn', 'amch', 'amcv',
           'avaa', 'avan', 'avah', 'avav', 'avca', 'avcn', 'avch', 'avcv',
           'cmaa', 'cman', 'cmah', 'cmav', 'cmca', 'cmcn', 'cmch', 'cmcv',
           'cvaa', 'cvan', 'cvah', 'cvav', 'cvca', 'cvcn', 'cvch', 'cvcv']

def main():

    with open('../app/public/js/winrate.json','w') as f:
        db = redis.StrictRedis(db=1)
        winrate = {}
        for select in selects:
            names = db.keys('dphw_'+select+'*')
            winrate[select] = {};
            for name in names:
                winrate[select][name[10:]] = db.get(name)
        f.write('var winrate= ')
        json.dump(winrate, f)
        print('OK');



if __name__ == '__main__':
    main()
