import redis
import sys

def main():
    try:
        keywords = sys.argv[1]
    except IndexError:
        print 'error argv'
        return

    db = redis.StrictRedis(db=1)
    for key in db.keys(keywords+'*'):
        db.delete(key)
    print 'OK'
    
if __name__ == '__main__':
    main()
