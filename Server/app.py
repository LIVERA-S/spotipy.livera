import spotipy
from flask import Flask, render_template, request, jsonify, Response
from flask_cors import CORS
from flask_restful import Resource , Api ,reqparse
from spotipy.oauth2 import SpotifyClientCredentials


app = Flask(__name__)

birdy_uri = 'spotify:artist:2WX2uTcsvV5OnS0inACecP'
spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(
    client_id='c0b1eb0b7a7848eb8436567d5871b8c2', client_secret='33394ae9bebc434b8ad0ff3acfb11640'))

CORS(app)
api = Api(app)


@app.route('/')
def index():
    return ("ciao")


@app.route('/link')
def tab():
    results = spotify.artist_albums(birdy_uri, album_type='album')


albums = results['items']
while results['next']:
    results = spotify.next(results)
    albums.extend(results['items'])

for album in albums:

    resp = json_util.dumps(album)
    return Response(resp, mimetype='application/json')


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
