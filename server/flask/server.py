import json
from flask import Flask
from flask import request
from flask import jsonify
from suggest import SuggestedHero

app = Flask('dotapick')


@app.route('/suggest', methods=['POST'])
def suggest():
    if request.method == 'POST':
        data = json.loads(request.data)
        suggestheros = SuggestedHero(data["enemy"],
                                     data["teammate"],
                                     data["select"])
        return jsonify({'hero': suggestheros.GetSuggestedHeros()})
