#!/usr/bin/env python
import redis
import json

def main():
    db = redis.StrictRedis(db=1)
    names = db.keys('dpw*')
    for index,name in enumerate(names):
        names[index] = name[4:]

    with open('../app/public/js/heronames.json','w') as f:
        json.dump({'heronames': names}, f)
        print('OK');


if __name__ == '__main__':
    main()
