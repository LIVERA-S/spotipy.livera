# Credentials you get from registering a new application
from requests.auth import HTTPBasicAuth
from requests_oauthlib import OAuth2Session

from flask import Flask, render_template, request, jsonify, Response

client_id = 'c0b1eb0b7a7848eb8436567d5871b8c2'
client_secret = '33394ae9bebc434b8ad0ff3acfb11640'
redirect_uri = 'http://127.0.0.1:8000/'

# OAuth endpoints given in the Spotify API documentation
# https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
authorization_base_url = "https://accounts.spotify.com/authorize"
token_url = "https://accounts.spotify.com/api/token"
# https://developer.spotify.com/documentation/general/guides/authorization/scopes/
scope = ["user-read-email", "playlist-read-collaborative"]

spotify = OAuth2Session(client_id, scope=scope, redirect_uri=redirect_uri)

# Redirect user to Spotify for authorization
authorization_url, state = spotify.authorization_url(authorization_base_url)
print('Please go here and authorize: ', authorization_url)

# Get the authorization verifier code from the callback url
redirect_response = input('\n\nPaste the full redirect URL here: ')


auth = HTTPBasicAuth(client_id, client_secret)

# Fetch the access token
token = spotify.fetch_token(token_url, auth=auth, authorization_response=redirect_response)

print(token)

# Fetch a protected resource, i.e. user profile
r = spotify.get('https://api.spotify.com/v1/me')
print(r.content)
