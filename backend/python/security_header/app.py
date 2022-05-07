from flask import Flask,jsonify,request
from flask_cors import CORS, cross_origin
import shcheck
from sslscan import SSLChecker
from urllib.parse import urlparse
app = Flask(__name__)

@app.route('/securityheader', methods=["POST"])
@cross_origin(supports_credentials=True)
def securityheader():    
    input_json = request.get_json(force=True)
    url=[]
    url.append(input_json['URL'])
    result=shcheck.main(url)
    return jsonify(result)

@app.route('/ssl', methods=["POST"])
@cross_origin(supports_credentials=True)
def ssl():
    input_json = request.get_json(force=True)
    url=input_json['URL']    
    parsed_uri = urlparse(url)
    result = '{uri.scheme}://{uri.netloc}/'.format(uri=parsed_uri)
    print(result)
    args = {'hosts': [result]}
    result=SSLChecker().show_result(SSLChecker().get_args(json_args=args))
    return result

if __name__ == '__main__':
    app.run(port=8000)