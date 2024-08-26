
from flask import Flask
from flask import redirect, url_for

from hackathon.client_bp import client_bp


app = Flask(__name__)
app.register_blueprint(client_bp)


@app.route("/")
def root():
    return redirect(url_for('clientui.client_root'))
