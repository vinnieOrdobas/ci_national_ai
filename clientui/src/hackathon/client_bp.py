
import time
import os

from flask import Blueprint
from flask import render_template
from flask import current_app
from flask import request
from flask import jsonify

import vertexai
from vertexai.preview.generative_models import GenerativeModel, ChatSession


client_bp = Blueprint('clientui', __name__, template_folder='templates',
                      static_folder='static', url_prefix='/clientui')


project_id = os.environ["PROJECT_ID"]
location = os.environ["LOCATION"]
endpoint_id = os.environ["ENDPOINT_ID"]

vertexai.init(project=project_id, location=location)


@client_bp.route("/", methods=['GET'])
def client_root():
    return render_template('index.html')


@client_bp.route("/api/chat", methods=['POST'])
def send_prompt():
    data = request.json
    print("Got %s" % (data,))

    model = GenerativeModel(f"projects/{project_id}/locations/{location}/endpoints/{endpoint_id}")

    response = model.generate_content([p['text'] for p in data['history']] + [data['prompt']])

    return jsonify({"reply": response.text})
