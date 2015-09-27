#!/usr/bin/env python
import redis
import json

selects = ['maa', 'man', 'mah', 'mav', 'mca', 'mcn', 'mch', 'mcv',
           'vaa', 'van', 'vah', 'vav', 'vca', 'vcn', 'vch', 'vcv']

def main():

    with open('../app/public/js/winrate.json','w') as f:
        db = redis.StrictRedis(db=1)
        winrate = {}
        for select in selects:
            names = db.keys('dphw_'+select+'*')
            winrate[select] = {};
            for name in names:
                winrate[select][name[9:]] = db.get(name)
        f.write('var winrate= ')
        json.dump(winrate, f)
        print('OK');



if __name__ == '__main__':
    main()
