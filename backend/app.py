from flask import Flask, jsonify
from flask import request
from flask_cors import CORS
import pymongo
from werkzeug.datastructures import ImmutableMultiDict

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["overlayDB"]
mycol = mydb["overlays"]

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/add", methods=['POST'])
def insert():
    # data = ImmutableMultiDict([('text', 'Chinmay Annadate'), ('top', '100'), ('left', '380'), ('size', '')])
    data = request.form

    mydict = data.to_dict()
    mydict['top'] = int(mydict['top'])
    mydict['left'] = int(mydict['left'])
    mydict['size'] = int(mydict['size'])

    mycol.insert_one(mydict)

    return jsonify({"status": "OK"})


@app.route("/read", methods=['GET'])
def read():
    data = mycol.find({})
    z = [item for item in data]

    for item in z:
        del item['_id']

    return jsonify(z)


@app.route("/delete", methods=['POST'])
def delete():
    data = request.form
    text = data.get('text')
    mycol.delete_many({"text": text})
    return jsonify({"status": "OK"})


@app.route("/update", methods=['PUT'])
def update():
    data = request.form
    print(data.to_dict())

    mydict = data.to_dict()
    if 'top' in mydict:
        mydict['top'] = int(mydict['top'])

    if 'left' in mydict:
        mydict['left'] = int(mydict['left'])

    if 'size' in mydict:
        mydict['size'] = int(mydict['size'])

    query = {'text': mydict['key']}
    del mydict['key']

    mycol.update_many(query, {"$set": mydict})

    return jsonify({"status": "OK"})


if __name__ == '__main__':
    app.run(debug=True)
