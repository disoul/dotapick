#!/usr/bin/env python
import redis
import json

def main():
    db = redis.StrictRedis(db=1)
    names = db.keys('dpw*')
    for index,name in enumerate(names):
        names[index] = name[4:]

    for i in xrange(110):
        change_index = -1
        while change_index == -1:
            name = raw_input('Heroname: ')
            for index,heroname in enumerate(names):
                if name == heroname:
                    change_index = index
                    print 'getHero'
                    break
        names[i], names[change_index] = names[change_index], names[i]
        with open('../app/public/js/heronames.json','w') as f:
            json.dump({'heronames': names}, f)
            print('OK');



if __name__ == '__main__':
    main()
