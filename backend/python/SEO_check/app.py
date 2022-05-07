from flask import Flask,jsonify,request
from seoanalyzer import analyze

# result=analyze('https://aman-codes.github.io', analyze_headings=True, analyze_extra_tags=True)
# print(result)
app = Flask(__name__)

@app.route('/', methods=["POST"])
def index():    
    input_json = request.get_json(force=True)
    url=input_json['URL']
    result=analyze(url, analyze_headings=True, analyze_extra_tags=True,follow_links=False)
    return jsonify(result)