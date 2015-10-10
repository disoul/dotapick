#!/usr/bin/env python
import redis
import sys

def main():
    try:
        keywords = sys.argv[1]
        number = sys.argv[2]
    except IndexError:
        print 'error argv'
        return

    db = redis.StrictRedis(db=number)
    for key in db.keys(keywords+'*'):
        db.delete(key)
    print 'OK'
    
if __name__ == '__main__':
    main()
