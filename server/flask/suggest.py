import redis

class SuggestedHero(object):
    suggestHeros = {}

    def __init__(self, enemys, teammates, select):
        self.enemys = enemys
        self.teammates = teammates
        self.select = select

    def GetWinrate(self, hero1, hero2, isAnti):
        key = hero1 + '_' + hero2
        if isAnti:
            select = 'a' + self.select
        else:
            select = 'c' + self.select 
        db = redis.StrictRedis(db=1)

        try:
            return float(db.get(select+key))
        except(TypeError):
            key = hero2 + '_' + hero1
            if isAnti:
                return float(db.get(select+key))
            else:
                return 0 - float(db.get(select+key))
        return 0


    def SortHeros(self):
        sortedheros = sorted(self.suggestHeros, key=lambda key:key[0], reverse=True)
        return [ hero[1] for hero in sortedheros ]

    def GetSuggestedHeros(self, options):
        db = redis.StrictRedis(db=1)
        heronames = db.keys('dpw')

        for heroname in heronames:
            herowinrate = 0
            for enemy in self.enemys:
                if enemy == '':
                    return
                herowinrate = herowinrate + self.GetWinrate(heroname, enemy, True)

            for teammate in self.teammates:
                if teammate == '':
                    return
                herowinrate = herowinrate + self.GetWinrate(heroname, teammate, False)
            self.suggestHeros[heroname] = herowinrate

        return self.SortHeros()
