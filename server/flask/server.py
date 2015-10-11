from flask import Flask
from flask import request
from suggest import SuggestedHero

app = Flask('dotapick')


@app.route('/suggest', methods=['POST'])
def suggest():
    if request.method == 'POST':
        suggestheros = SuggestedHero(request.form['enemy'],
                                     request.form['teammate'],
                                     request.form['select'])

        return suggestheros.GetSuggestedHeros()


if __name__ == '__main__':
    app.run(port=2333)
