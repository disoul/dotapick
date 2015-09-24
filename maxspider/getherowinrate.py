#!/usr/bin/env python
import redis
import json

def main():
    db = redis.StrictRedis(db=1)
    names = db.keys('dphw*')
    winrate = {}
    for name in names:
        winrate[name[5:]] = db.get(name)

    with open('../app/public/js/winrate.json','w') as f:
        json.dump(winrate, f)
        print('OK');



if __name__ == '__main__':
    main()
