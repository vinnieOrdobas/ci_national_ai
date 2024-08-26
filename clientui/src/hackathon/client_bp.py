
from flask import Blueprint
from flask import render_template
from flask import current_app
from flask import request
from flask import jsonify
import time


client_bp = Blueprint('clientui', __name__, template_folder='templates',
                      static_folder='static', url_prefix='/clientui')


@client_bp.route("/", methods=['GET'])
def client_root():
    return render_template('index.html')


@client_bp.route("/api/chat", methods=['POST'])
def send_prompt():
    data = request.json
    print("Got %s" % (data,))
    time.sleep(1.5)
    return jsonify({"reply": "dummy response for " + data['prompt']})
