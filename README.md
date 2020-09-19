<h1 align="center">Tracks app</h1>

<p align="center">Django  ----  React ----  GraphQL</p>

<p align="center" >
    <img width="100px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Python.svg/200px-Python.svg.png" alt="Python">
    <img width="150px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/200px-React-icon.svg.png" alt="React">
    <img width="100px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/200px-GraphQL_Logo.svg.png" alt="graphql">
</p>
<br/>

<h4 align="center">Add, Listen, and Share your favorite tracks.</h4>

<h4 align="center"><a href="https://tracksapp-django-graphql-react.herokuapp.com/">... try it out, add some tracks ...</a></h4>

___
___

<h4 align="center">Dependencies...</h4>
  
```javascript  

    // FRONT-END {Package.json   }                       // BACK-END {requirements.txt}
    "react": "^16.6.0",                                  django==3.1.1
    "react-dom": "^16.6.0",                              django-heroku==0.3.1
    "react-router": "^5.2.0",                            graphene-django==2.13.0
    "react-router-dom": "^5.2.0",                        django-graphql-jwt==0.3.1
    "react-scripts": "3.4.1"                             django-cors-headers==3.5.0
    "react-player": "^2.6.2",                            gunicorn==20.0.4
    "@material-ui/core": "^4.11.0",                      whitenoise==5.2.0
    "apollo-boost": "^0.4.9",
    "react-apollo": "^3.1.5",
    "axios": "^0.20.0",
    "graphql": "^15.3.0",
    "date-fns": "^2.16.1",
```

<p align="center">using apollo boost and graphql tracks app is able to make queries and mutations to the python/django server. the python server also uses graphql to structure the user and track data. The track files are stored seperatly to cloudinary.</p>

___
___


