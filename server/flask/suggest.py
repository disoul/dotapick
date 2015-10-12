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
            return float(db.get('dphw_'+select+'_'+key))
        except(TypeError):
            key = hero2 + '_' + hero1
            if isAnti:
                return 0 - float(db.get('dphw_'+select+'_'+key) or 0)
            else:
                return float(db.get('dphw_'+select+'_'+key) or 0)

    def SortHeros(self):
        sortedheros = sorted(self.suggestHeros.iteritems(),
                             key=lambda key: key[1], reverse=True)
        return [hero[0] for hero in sortedheros]

    def GetSuggestedHeros(self):
        db = redis.StrictRedis(db=1)
        heronames = db.keys('dpw*')

        for heroname in heronames:
            herowinrate = 0
            for enemy in self.enemys:
                if enemy != '':
                    herowinrate = herowinrate + self.GetWinrate(heroname[4:],
                                                                enemy, True)

            for teammate in self.teammates:
                if teammate != '':
                    herowinrate = herowinrate + self.GetWinrate(heroname[4:],
                                                                teammate, False)
            self.suggestHeros[heroname[4:]] = herowinrate

        return self.SortHeros()
