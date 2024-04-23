import enum
from functools import wraps
import json
import os
import random
import re
import string
import uuid
from flask import Flask, Response, jsonify, redirect, render_template, request, session, url_for
from flask_sqlalchemy import SQLAlchemy
import jwt
from sqlalchemy import Enum, and_, exc, or_
from sqlalchemy import DATE, TIMESTAMP, DateTime, func
import datetime
from authlib.integrations.flask_client import OAuth
from flask import Response
from flask_api import status
from threading import Thread
from flask_cors import CORS
from flask import Response
# from flask import jsonify,make_response
import json
import uuid
import datetime
from sqlalchemy import or_, and_
from werkzeug.utils import secure_filename
import os
from cryptography.fernet import Fernet

import cloudinary
from cloudinary.uploader import upload
from cloudinary.utils import cloudinary_url

from flask_api import status
from flask import Response
import json
import uuid
from flask_mail import Mail, Message
from threading import Thread
import stripe
from sqlalchemy.engine import URL


app = Flask(__name__)
#     'mysql+pymysql://root:root@localhost:3308/db', echo=True
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'
cors = CORS(app)



# Application Configuration
 
app.config["VENUE_IMAGES_PATH"]=os.environ.get("VENUE_IMAGES_PATH", "venues")
app.config["IMAGE_CLOUD_NAME"]=os.environ.get("IMAGE_CLOUD_NAME")
app.config["IMAGE_CLOUD_API_KEY"]=os.environ.get("IMAGE_CLOUD_API_KEY")
app.config["IMAGE_CLOUD_API_SECRET"]=os.environ.get("IMAGE_CLOUD_API_SECRET")


app.config["SQL_USERNAME"]=os.environ.get("SQL_USERNAME", "root")
app.config["SQL_PASSWORD"]=os.environ.get("SQL_PASSWORD", "root")
app.config["SQL_HOST"]=os.environ.get("SQL_HOST", "localhost")
app.config["SQL_DB"]=os.environ.get("SQL_DB", "venuefinder")
app.config["SQL_PORT"] = os.environ.get("SQL_PORT",3306)

sqlURL = URL.create(
    drivername="mysql+pymysql",
    username=app.config["SQL_USERNAME"],
    password=app.config["SQL_PASSWORD"],
    host=app.config["SQL_HOST"],
    port=3306,
    database=app.config["SQL_DB"],
    # query={"ssl_ca":r".\etc\secrets\DigiCertGlobalRootCA.crt.pem"},
)

# app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://" + app.config["SQL_USERNAME"] + ":" + app.config["SQL_PASSWORD"] + "@" + app.config["SQL_HOST"] +"/" + app.config["SQL_DB"]+"?ssl_ca="+r"C:\Users\HP\Downloads\DigiCertGlobalRootCA.crt.pem"
app.config["SQLALCHEMY_DATABASE_URI"]=sqlURL

app.config['SQLALCHEMY_TRACK_MODIFICATION'] = False
app.secret_key = os.environ.get("SECRET_KEY", None)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = os.environ.get("MAIL_USERNAME", None)
app.config['MAIL_PASSWORD'] = os.environ.get("MAIL_PASSWORD", None)

app.config["CRYPTO_KEY"]=b'22oVSeEjKz49a7ToOAG_pl5qP8H4ReJFz__6D67wvxo='

GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", None)
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", None)
GOOGLE_DISCOVERY_URL = (
    "https://accounts.google.com/.well-known/openid-configuration"
)
CONF_URL = os.environ.get('CONF_URL',None)



stripe_keys = {
  'secret_key': os.environ.get('STRIPE_SECRET_KEY', None),
  'publishable_key': os.environ.get('STRIPE_PUBLISHABLE_KEY', None)
}

stripe.api_key = stripe_keys['secret_key']



oauth = OAuth(app)
db = SQLAlchemy(app)
mail = Mail(app)
cors = CORS(app)

cloudinary.config(
    cloud_name = app.config["IMAGE_CLOUD_NAME"],
    api_key = app.config["IMAGE_CLOUD_API_KEY"],
    api_secret = app.config["IMAGE_CLOUD_API_SECRET"],
)

class owner_accounts(db.Model):
    user_id = db.Column(db.Integer, primary_key = True,autoincrement = True)
    first_name = db.Column(db.String(100))
    last_name=db.Column(db.String(100))
    date_of_birth = db.Column(DateTime())
    email_id = db.Column(db.String(100),unique = True)
    contact = db.Column(db.String(10))
    bearer_token = db.Column(db.String(100))
    password = db.Column(db.String(100))
    otp= db.Column(db.Integer)
    created_at = db.Column(TIMESTAMP, nullable=False, server_default=func.now())
    updated_at = db.Column(TIMESTAMP, nullable=False, server_default=func.now()) 

    def __init__(self,first_name,last_name,date_of_birth,email,bearer_token, password="NA",contact = 0):
        self.first_name = first_name
        self.last_name = last_name
        self.date_of_birth = date_of_birth
        self.email_id = email
        self.bearer_token=bearer_token
        self.contact = contact
        self.password = password

class accounts(db.Model):
    userid = db.Column(db.Integer, primary_key = True,autoincrement = True)
    firstname = db.Column(db.String(100))
    lastname=db.Column(db.String(100))
    date_of_birth = db.Column(DateTime())
    email_id = db.Column(db.String(100),unique = True)
    contact = db.Column(db.String(10))
    bearer_token = db.Column(db.String(100))
    password = db.Column(db.String(100))
    otp= db.Column(db.Integer)
    created_at = db.Column(TIMESTAMP, nullable=False, server_default=func.now())
    updated_at = db.Column(TIMESTAMP, nullable=False, server_default=func.now()) 

    def __init__(self,firstname,lastname,date_of_birth,email,bearer_token, password="NA",contact = 0):

        self.firstname = firstname
        self.lastname = lastname
        self.date_of_birth = date_of_birth
        self.email_id = email
        self.contact = contact
        self.password = password

        self.bearer_token = bearer_token

class venue_leasing(db.Model):
    id = db.Column(db.Integer, primary_key = True,autoincrement = True)
    venue_id = db.Column(db.Integer, db.ForeignKey('venues.id'))
    payment_id = db.Column(db.String(100), db.ForeignKey('payments.transaction_id'))
    first_name = db.Column(db.String(100))
    last_name=db.Column(db.String(100))
    email_id = db.Column(db.String(100))
    contact = db.Column(db.String(10))  
    lease_from_date = db.Column(DateTime())
    lease_end_date = db.Column(DateTime()) 
    created_at = db.Column(TIMESTAMP, nullable=False, server_default=func.now())
    updated_at = db.Column(TIMESTAMP, nullable=False, server_default=func.now()) 


    def __init__(self,venueid,paymentid,firstname,lastname,email,contact):
        self.venue_id=venueid
        self.payment_id=paymentid
        self.first_name=firstname
        self.last_name= lastname
        self.email_id = email
        self.contact = contact
        # self.lease_end_date=leaseend
        # self.lease_from_date = leasefrom

class event_participation(db.Model):
    id = db.Column(db.Integer, primary_key = True,autoincrement = True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))
    payment_id = db.Column(db.String(100), db.ForeignKey('payments.transaction_id'))
    first_name = db.Column(db.String(100))
    last_name=db.Column(db.String(100))
    email_id = db.Column(db.String(100))
    contact = db.Column(db.String(10))  
    ticket_count = db.Column(db.Integer)
    created_at = db.Column(TIMESTAMP, nullable=False, server_default=func.now())

    def __init__(self,eventid,paymentid,firstname,lastname,email,contact,tc):
        self.event_id=eventid
        self.payment_id=paymentid
        self.first_name=firstname
        self.last_name= lastname
        self.email_id = email
        self.contact = contact
        self.ticket_count = tc

class ROLE(enum.Enum):
    USER = 'USER'
    OWNER = 'OWNER'



def token_required(f):
   @wraps(f)
   def decorator(*args, **kwargs):
       token = None
       if 'x-access-tokens' in request.headers:
           token = request.headers['x-access-tokens']
 
       if not token:
           return jsonify({'message': 'a valid token is missing'})
       try:
           data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
           if 'role' in request.headers:
                role = request.headers['role']
                if role == ROLE.USER.name:
                    current_user = accounts.query.filter_by(bearer_token=data['bearer_token']).first()
                else:
                    current_user= owner_accounts.query.filter_by(bearer_token=data['bearer_token']).first()
           else:
                return jsonify({'message': 'role is missing'})       
       except:
           return jsonify({'message': 'token is invalid'})
 
       return f(current_user, *args, **kwargs)
   return decorator
'''
@app.route('/google-signup/')
def google():

    
    oauth.register(
        name='google',
        client_id=GOOGLE_CLIENT_ID,
        client_secret=GOOGLE_CLIENT_SECRET,
        server_metadata_url=CONF_URL,
        client_kwargs={
            'scope': 'openid email profile'
        }
    )

    # Redirect to google_auth function
    redirect_uri = url_for('google_auth', _external=True)
    return oauth.google.authorize_redirect(redirect_uri)
'''



@app.route('/google-signup',methods=['POST', 'OPTIONS'])
def google_auth():
    if request.method == "OPTIONS":
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': '3600'
        }
        return '', 204, headers
    
    if request.method == "POST":

        print("Goole singup hit",request.form)
        response = Response(mimetype='application/json')

        firstname =  request.form['given_name']
        lastname = request.form['family_name']
        email_id =  request.form['email']
        dob = '01/01/1999'

        res = accounts.query.filter_by(email_id = email_id).first()

        if not res :
            #create acc first time google signup

            bearerToken=uuid.uuid4()

            useraccount  = accounts(firstname=firstname,lastname=lastname,bearer_token=bearerToken, email=email_id,date_of_birth=datetime.datetime.strptime(dob.strip(), '%d/%m/%Y')) 
            db.session.add(useraccount)
            db.session.commit()

            jwttoken = jwt.encode({'bearer_token' : useraccount.bearer_token, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=45)}, app.config['SECRET_KEY'], "HS256")



            response.status = status.HTTP_200_OK
            response.data = json.dumps({"message":"Google login successfull",


                "jwt_token":str(jwttoken),

                "data":{"userid":useraccount.userid,"first_name":useraccount.firstname,"last_name":useraccount.lastname}})
            return response

            


        else:
            # already exists check bearer token expiry and return else create new bearer token update in db and pass to backend

            updated_at  = res.updated_at
            print(updated_at,type(updated_at))

            differnce  = datetime.datetime.now() - updated_at
            hours = divmod(differnce.total_seconds(), 3600)[0] 
            if hours >= 24:

                bearerToken =uuid.uuid4()
                user = accounts.query.filter_by(email_id =email_id).first()
                user.updated_at = func.now()
                user.bearer_token = bearerToken
                db.session.commit()
                jwttoken = jwt.encode({'bearer_token' : user.bearer_token, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=45)}, app.config['SECRET_KEY'], "HS256")
            else:
                user = accounts.query.filter_by(email_id =email_id).first()
                jwttoken = jwt.encode({'bearer_token' : user.bearer_token, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=45)}, app.config['SECRET_KEY'], "HS256")



            response.status = status.HTTP_200_OK
            response.data = json.dumps({"message":"Google login successfull",                    
                                    "jwt_token":str(jwttoken),
                                    "data":{"userid":user.userid,"first_name":user.firstname,"last_name":user.lastname}})
            return response
    

   



@app.route('/')
def index():
    return 'HEllO VENUE FINDER'

@app.route('/user-signup',methods =[ 'POST'])
def registeruser():

    response = Response(mimetype='application/json')

    if request.method == 'POST' and 'firstname' in request.form and 'lastname' in request.form and 'password' in request.form and 'email_id' in request.form and 'date_of_birth' in request.form:
        
        firstname = request.form['firstname']
        lastname =request.form['lastname']
        email_id = request.form['email_id']
        contact_number=request.form["contact_number"]
        dob = request.form['date_of_birth']
        password = request.form['password']
        
        print(firstname,lastname,email_id,dob,password)

        if accounts.query.filter_by(email_id = email_id).all() != [] :
            # Account exists
            
            response.status = status.HTTP_400_BAD_REQUEST

            response.data = json.dumps({
                "response_message":"Account already exists"
           
                })
            return response
        
        else:
            # Create Account

            if not re.match(r'[^@]+@[^@]+\.[^@]+', email_id):



                response.status = status.HTTP_400_BAD_REQUEST

                response.data = json.dumps({
                "response_message":"Invalid EmailId"
           
                })

                return response

            
            elif not re.match(r'[A-Za-z]+', firstname):

                response.status = status.HTTP_400_BAD_REQUEST

                response.data = json.dumps({
                "response_message":"first name must contain only characters!"
           
                })

                return response

            elif not re.match(r'[A-Za-z]+', lastname):
                response.status = status.HTTP_400_BAD_REQUEST

                response.data = json.dumps({
                "response_message":"last name must contain only characters!"
           
                })

                return response

            elif not password or not email_id:
                response.status = status.HTTP_400_BAD_REQUEST

                response.data = json.dumps({
                "response_message":"Please fill out the form !"
                })

                return response
   
            else:
                hash_key=Fernet(app.config["CRYPTO_KEY"])
                hashed_pw = hash_key.encrypt(bytes(password, 'utf-8'))
                bearerToken=uuid.uuid4()
                useraccount  = accounts(firstname=firstname,lastname=lastname,bearer_token=bearerToken,email=email_id,
                                        password=hashed_pw,date_of_birth=datetime.datetime.strptime(dob.strip(), '%Y-%m-%d'),contact=contact_number) 
                db.session.add(useraccount)
                db.session.commit()

                response.status = status.HTTP_201_CREATED
                response.data = json.dumps({
                "response_message":"Account Created !"})

                return response
    else:
        # Ideally must not occur, If request method is not POST and all data is not passed then this will execute
        response.status = status.HTTP_400_BAD_REQUEST
        response.data = json.dumps({ "response_message":"Pass all the required data"})
        return response

## User Login API
@app.route('/user-login',methods =[ 'POST'])
def userLogin():
    response = Response(mimetype='application/json')

    # Request Validation
    
    # if request.method != 'POST':
    #     response['status'] = 405
    #     response['response_message'] = "Invalid Request Method"
    #     return response

    if 'email_id' not in request.form:
        # response = make_response(jsonify(message="Missing input credential: email_id"))
        response.status = status.HTTP_400_BAD_REQUEST
        response.data = json.dumps({"message":"Missing input credential: email_id"})
        return response

    if 'password' not in request.form:
        response.status = status.HTTP_400_BAD_REQUEST
        response.data = json.dumps({"message":"Missing input credential: password"})
        return response
        
    email_id = request.form['email_id']
    password = request.form['password']
    
    try:
        
        dbResult=accounts.query.filter_by(email_id = email_id).one()
    except exc.NoResultFound:
        # No user found with the input email
        response.status = status.HTTP_404_NOT_FOUND
        response.data = json.dumps({"message":"The email ID is not registered with us. Please try with a valid email ID or register a new account with it"})

        return response
    except:
        response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
        response.data = json.dumps({"message":"Encountered error during communication with database"})

        return response
    
    hash_key=Fernet(app.config["CRYPTO_KEY"])
    decrpyted_pw = hash_key.decrypt(dbResult.password)

    # Credential Validation
    if dbResult.email_id==email_id and decrpyted_pw==bytes(password, 'utf-8'):
        bearerToken=dbResult.bearer_token

        current_time=datetime.datetime.now()

        time_difference=((current_time-dbResult.updated_at).total_seconds())/3600
        print("Token last updated in hours:",time_difference)

        if time_difference>24:
            bearerToken=uuid.uuid4()

        otp=""
    
        for i in range(4):
            otp+=str(random.randint(1,9))
        
        dbResult.otp=int(otp) 

        dbResult.bearer_token=bearerToken
        dbResult.updated_at=func.now()

        db.session.commit()
        
        print('sender : ', app.config['MAIL_USERNAME'],'recipent: ',dbResult.email_id)
        msg = Message('One Time Password', sender = app.config['MAIL_USERNAME'], recipients = [dbResult.email_id])
        
        msg.body ="Dear, User\n\nPlease find the requested One Time Password(OTP): " + str(otp) +"\n\nSincerely\nVenue Finder"
        #msg.body = "Hello,\nWe've received a request to reset your password. If you want to reset your password, click the link below and enter your new password\n http://localhost:5000/resetpassword/" + check.bearer_token
        
        mail.send(msg)
        Thread(target=send_email, args=(app, msg)).start()

        jwttoken = jwt.encode({'bearer_token' : dbResult.bearer_token, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=45)}, app.config['SECRET_KEY'], "HS256")
        response.status = status.HTTP_200_OK
        response.data = json.dumps({
            "message":"User logged in successfully. Please complete the 2 factor authentication",
            "jwt_token":str(jwttoken),
            "data":{"userid":dbResult.userid,"first_name":dbResult.firstname,"last_name":dbResult.lastname}
            })
        return response
    
    # Mismatch in credentials
    response.status = status.HTTP_400_BAD_REQUEST
    response.data = json.dumps({"message":"Please enter valid credentials for login"})
        
    return response

## Owner Signup API
@app.route('/owner-signup',methods =[ 'POST'])
def registerOwner():

    response = Response(mimetype='application/json')

    if request.method == 'POST' and 'firstname' in request.form and 'lastname' in request.form and 'password' in request.form and 'email_id' in request.form and 'date_of_birth' in request.form:
        
        firstname = request.form['firstname']
        lastname =request.form['lastname']
        email_id = request.form['email_id']
        contact_number=request.form["contact_number"]
        dob = request.form['date_of_birth']
        password = request.form['password']
        
        print(firstname,lastname,email_id,dob,password)

        if owner_accounts.query.filter_by(email_id = email_id).all() != [] :
            # Account exists
            
            response.status = status.HTTP_400_BAD_REQUEST

            response.data = json.dumps({
                "response_message":"Account already exists"
           
                })
            return response
        
        else:
            # Create Account

            if not re.match(r'[^@]+@[^@]+\.[^@]+', email_id):
                response.status = status.HTTP_400_BAD_REQUEST

                response.data = json.dumps({
                "response_message":"Invalid EmailId"
           
                })

                return response

            
            elif not re.match(r'[A-Za-z]+', firstname):

                response.status = status.HTTP_400_BAD_REQUEST

                response.data = json.dumps({
                "response_message":"first name must contain only characters!"
           
                })

                return response

            elif not re.match(r'[A-Za-z]+', lastname):
                response.status = status.HTTP_400_BAD_REQUEST

                response.data = json.dumps({
                "response_message":"last name must contain only characters!"
           
                })

                return response

            elif not password or not email_id:
                response.status = status.HTTP_400_BAD_REQUEST

                response.data = json.dumps({
                "response_message":"Please fill out the form !"
                })

                return response
   
            else:
                hash_key=Fernet(app.config["CRYPTO_KEY"])
                hashed_pw = hash_key.encrypt(bytes(password, 'utf-8'))
                bearerToken=uuid.uuid4()
                ownerAccount  = owner_accounts(first_name=firstname,last_name=lastname,bearer_token=bearerToken,email=email_id,
                                               password=hashed_pw,date_of_birth=datetime.datetime.strptime(dob.strip(), '%Y-%m-%d'),contact=contact_number) 
                db.session.add(ownerAccount)
                db.session.commit()

                response.status = status.HTTP_201_CREATED
                response.data = json.dumps({
                "response_message":"Account Created Successfully"})

                return response
    else:
        # Ideally must not occur, If request method is not POST and all data is not passed then this will execute
        response.status = status.HTTP_400_BAD_REQUEST
        response.data = json.dumps({ "response_message":"Pass all the required data"})
        return response

@app.route('/user',methods =[ 'GET'])
@token_required
def getUserDetails(current_user):
    response = Response(mimetype='application/json')

    # Auth user validation
    currentTime=datetime.datetime.now()

    timeDifference=((currentTime-current_user.updated_at).total_seconds())/3600
    
    if timeDifference>24:
        response.status = status.HTTP_401_UNAUTHORIZED
        response.data = json.dumps({"message":"Bearer token is expired. Please use a valid one"})

        return response
    
    try:
        dbResult=accounts.query.filter_by(userid = current_user.userid).first()
    except exc.NoResultFound:
        response.status = status.HTTP_400_BAD_REQUEST
        response.data = json.dumps({"message":"No user found for the given authorization token. Please use a valid one"})

        return response
    except:
        response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
        response.data = json.dumps({"message":"Encountered error during communication with database"})

        return response

    userData={
        "user_id":dbResult.userid,
        "first_name":dbResult.firstname,
        "last_name":dbResult.lastname,
        "email_id": dbResult.email_id,
        "date_of_birth":str(dbResult.date_of_birth.strftime( '%Y-%m-%d')),
        "contact_number":dbResult.contact
    }

    response.status = status.HTTP_200_OK
    response.data = json.dumps({
        "message":"User data fetched successfully",
        "data":userData
        })

    return response

@app.route('/user/<id>',methods =[ 'PUT'])
@token_required
def updateUser(current_user,id):
    response = Response(mimetype='application/json')

    # Auth user validation
    currentTime=datetime.datetime.now()

    timeDifference=((currentTime-current_user.updated_at).total_seconds())/3600
    
    if timeDifference>24:
        response.status = status.HTTP_401_UNAUTHORIZED
        response.data = json.dumps({"message":"Bearer token is expired. Please use a valid one"})

        return response
    
    try:
        dbResult=accounts.query.filter_by(userid = current_user.userid).first()
        
    except exc.NoResultFound:
        response.status = status.HTTP_400_BAD_REQUEST
        response.data = json.dumps({"message":"No user found for the given authorization token. Please use a valid one"})

        return response
    except:
        response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
        response.data = json.dumps({"message":"Encountered error during communication with database"})

        return response

    dbResult.firstname=request.form["first_name"]
    dbResult.lastname=request.form["last_name"]
    dbResult.date_of_birth=request.form["date_of_birth"]
    dbResult.contact=request.form["contact_number"]

    db.session.commit()

    response.status = status.HTTP_200_OK
    response.data = json.dumps({
        "message":"User data updated successfully",
        })

    return response

## Venue/Event owner Login API
@app.route('/owner-login',methods =[ 'POST'])
def ownerLogin():
    response = Response(mimetype='application/json')
     
    # if request.method != 'POST':
    #     response['status'] = 405
    #     response['response_message'] = "Invalid Request Method"
    #     return response

    if 'email_id' not in request.form:
        # response = make_response(jsonify(message="Missing input credential: email_id"))
        response.status = status.HTTP_400_BAD_REQUEST
        response.data = json.dumps({"message":"Missing input credential: email_id"})
        return response

    if 'password' not in request.form:
        response.status = status.HTTP_400_BAD_REQUEST
        response.data = json.dumps({"message":"Missing input credential: password"})
        return response
        
    email_id = request.form['email_id']
    password = request.form['password']
    
    # DB Record Validation
    try:
        dbResult=owner_accounts.query.filter_by(email_id = email_id).one()
    except exc.NoResultFound:
        # No owner found with the input email
        response.status = status.HTTP_404_NOT_FOUND
        response.data = json.dumps({"message":"The email ID is not registered with us. Please try with a valid email ID or register a new account with it"})
        return response
    
    except:
        response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
        response.data = json.dumps({"message":"Encountered error during communication with database"})
        return response
    
    hash_key=Fernet(app.config["CRYPTO_KEY"])
    decrpyted_pw = hash_key.decrypt(dbResult.password)

    # Credential Validation
    if dbResult.email_id==email_id and decrpyted_pw==bytes(password, 'utf-8'):
        bearerToken=dbResult.bearer_token

        current_time=datetime.datetime.now()

        time_difference=((current_time-dbResult.updated_at).total_seconds())/3600
        print("Token last updated in hours:",time_difference)

        if time_difference>24:
            bearerToken=uuid.uuid4()

        otp=""
    
        for i in range(4):
            otp+=str(random.randint(1,9))
        
        dbResult.otp=int(otp) 

        dbResult.bearer_token=bearerToken
        dbResult.updated_at=func.now()

        db.session.commit()
        
        print('sender : ', app.config['MAIL_USERNAME'],'recipent: ',dbResult.email_id)
        msg = Message('One Time Password', sender = app.config['MAIL_USERNAME'], recipients = [dbResult.email_id])
        
        msg.body ="Dear Owner,\n\nPlease find the requested One Time Password(OTP): " + str(otp) +"\n\nSincerely\nVenue Finder"
        #msg.body = "Hello,\nWe've received a request to reset your password. If you want to reset your password, click the link below and enter your new password\n http://localhost:5000/resetpassword/" + check.bearer_token
        
        mail.send(msg)
        Thread(target=send_email, args=(app, msg)).start()

        jwttoken = jwt.encode({'bearer_token' : dbResult.bearer_token, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=45)}, app.config['SECRET_KEY'], "HS256")

        response.status = status.HTTP_200_OK
        response.data = json.dumps({
            "message":"Owner logged in successfully. Please complete the 2 factor authentication",
            "jwt_token":jwttoken,
            "data":{"user_id":dbResult.user_id,"first_name":dbResult.first_name,"last_name":dbResult.last_name}})
        return response
    # Mismatch in credentials
    response.status = status.HTTP_400_BAD_REQUEST
    response.data = json.dumps({"message":"Please enter valid credentials for login"})
        
    return response

@app.route('/owner',methods =[ 'GET'])
@token_required
def getOwnerDetails(current_user):
    response = Response(mimetype='application/json')

    # Auth user validation
    currentTime=datetime.datetime.now()

    timeDifference=((currentTime-current_user.updated_at).total_seconds())/3600
    
    if timeDifference>24:
        response.status = status.HTTP_401_UNAUTHORIZED
        response.data = json.dumps({"message":"Bearer token is expired. Please use a valid one"})

        return response
    
    try:
        dbResult=owner_accounts.query.filter_by(user_id = current_user.user_id).first()
    except exc.NoResultFound:
        response.status = status.HTTP_400_BAD_REQUEST
        response.data = json.dumps({"message":"No owner found for the given authorization token. Please use a valid one"})

        return response
    except:
        response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
        response.data = json.dumps({"message":"Encountered error during communication with database"})

        return response

    ownerData={
        "user_id":dbResult.user_id,
        "first_name":dbResult.first_name,
        "last_name":dbResult.last_name,
        "email_id": dbResult.email_id,
        "date_of_birth":str(dbResult.date_of_birth.strftime( '%Y-%m-%d')),
        "contact_number":dbResult.contact
    }

    response.status = status.HTTP_200_OK
    response.data = json.dumps({
        "message":"Owner data fetched successfully",
        "data":ownerData
        })

    return response


@app.route('/owner/<id>',methods =[ 'PUT'])
@token_required
def updateOwner(current_user,id):
    response = Response(mimetype='application/json')

    # Auth user validation
    currentTime=datetime.datetime.now()

    timeDifference=((currentTime-current_user.updated_at).total_seconds())/3600
    
    if timeDifference>24:
        response.status = status.HTTP_401_UNAUTHORIZED
        response.data = json.dumps({"message":"Bearer token is expired. Please use a valid one"})

        return response
    
    try:
        dbResult=owner_accounts.query.filter_by(user_id = current_user.user_id).first()
    except exc.NoResultFound:
        response.status = status.HTTP_400_BAD_REQUEST
        response.data = json.dumps({"message":"No owner found for the given authorization token. Please use a valid one"})

        return response
    except:
        response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
        response.data = json.dumps({"message":"Encountered error during communication with database"})

        return response

    dbResult.firstname=request.form["first_name"]
    dbResult.lastname=request.form["last_name"]
    dbResult.date_of_birth=request.form["date_of_birth"]
    dbResult.contact=request.form["contact_number"]

    db.session.commit()

    response.status = status.HTTP_200_OK
    response.data = json.dumps({
        "message":"Owner data updated successfully",
        })

    return response

def send_email(app, msg):
    with app.app_context():
        mail.send(msg)

@app.route('/forgotpassword',methods=["POST"])
def forgot_password():
    print('forgot password api hit')

    response = Response(mimetype='application/json')

    if request.method=="POST":
    
        email = request.form['email']
        check = accounts.query.filter_by(email_id=email).first()

    
        if check:
            
            bearerToken = uuid.uuid4()
            
            check.bearer_token = bearerToken
            
            db.session.commit()
            print('sender : ', app.config['MAIL_USERNAME'],'recipent: ',email)
            msg = Message('Confirm Password Change', sender = app.config['MAIL_USERNAME'], recipients = [email])
            jwttoken = jwt.encode({'bearer_token' : check.bearer_token, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=45)}, app.config['SECRET_KEY'], "HS256")
            msg.body ="Dear, User\n\nTo reset your password click on the following link: http://127.0.0.1:3000/resetpassword/?token=" + jwttoken +"\n\nIf you have not requested a password reset simply ignore this message.\n\nSincerely\nVenue Finder"
            #msg.body = "Hello,\nWe've received a request to reset your password. If you want to reset your password, click the link below and enter your new password\n http://localhost:5000/resetpassword/" + check.bearer_token
            
            mail.send(msg)
            Thread(target=send_email, args=(app, msg)).start()

            response.status = status.HTTP_200_OK

            response.data = json.dumps({
                "response_message":"Check your email for password reset link"   })
            return response
        else:
            response.status = status.HTTP_400_BAD_REQUEST

            response.data = json.dumps({
                "response_message":"Are you sure this is your registered emailid ?"   })
            return response

    else:
        response.status = status.HTTP_405_METHOD_NOT_ALLOWED

        response.data = json.dumps({
            "response_message":"Send a POST request"   })
        return response

@app.route('/resetpassword/',methods=["POST","GET"])
def reset_password():
    print('Reset APi hit')
    response = Response(mimetype='application/json')
    token = request.args.get('token')
    #token = request.args.get('token')
    data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
    check = accounts.query.filter_by(bearer_token=str(data['bearer_token']).strip()).first() 
    
    if check:
        if request.method == 'POST':
            passw = request.form['passw']
            cpassw = request.form['cpassw']

            print(passw,cpassw)
            if passw == cpassw:
                hash_key=Fernet(app.config["CRYPTO_KEY"])
                hashed_pw = hash_key.encrypt(bytes(passw, 'utf-8'))
                
                check.password = hashed_pw
                check.bearer_token= uuid.uuid4()
                db.session.commit()
                response.status = status.HTTP_200_OK

                response.data = json.dumps({
                    "response_message":"Password reset successfully"  })
                return response
            else:
                response.status = status.HTTP_400_BAD_REQUEST

                response.data = json.dumps({
                    "response_message":"new password and confirm password should be the same"  })
                return response
        else:            
            response.status = status.HTTP_405_METHOD_NOT_ALLOWED

            response.data = json.dumps({"response_message":"Send a POST request"   })
            return response

    else:
        response.status = status.HTTP_400_BAD_REQUEST
        response.data = json.dumps({
        "response_message":"Reset Link expired"   })
        return response

@app.route('/send-otp',methods=["POST"])
@token_required
def sendOTP(current_user):
    response = Response(mimetype='application/json')

    role = request.headers['role']

    try:
        if role==ROLE.USER.name:
            dbResult = accounts.query.filter_by(email_id=current_user.email_id).first()
        else:
            dbResult = owner_accounts.query.filter_by(email_id=current_user.email_id).first()
    
    except exc.NoResultFound:
        # No user found with the input email
        response.status = status.HTTP_404_NOT_FOUND
        response.data = json.dumps({"message":"The email ID is not registered with us. Please try with a valid email ID or register a new account with it"})

        return response
    except:
        response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
        response.data = json.dumps({"message":"Encountered error during communication with database"})

        return response
    
    bearerToken=dbResult.bearer_token

    current_time=datetime.datetime.now()

    time_difference=((current_time-dbResult.updated_at).total_seconds())/3600
    print("Token last updated in hours:",time_difference)

    if time_difference>24:
        bearerToken=uuid.uuid4()

    
    dbResult.bearer_token=bearerToken
    dbResult.updated_at=func.now()
    
    otp=""
    
    for i in range(4):
        otp+=str(random.randint(1,9))
    
    dbResult.otp=int(otp) 

    db.session.commit()
    
    print('sender : ', app.config['MAIL_USERNAME'],'recipent: ',current_user.email_id)
    msg = Message('One Time Password', sender = app.config['MAIL_USERNAME'], recipients = [current_user.email_id])
    
    msg.body ="Dear, User\n\nPlease find the requested One Time Password(OTP): " + str(otp) +"\n\nSincerely\nVenue Finder"
    #msg.body = "Hello,\nWe've received a request to reset your password. If you want to reset your password, click the link below and enter your new password\n http://localhost:5000/resetpassword/" + check.bearer_token
    
    mail.send(msg)
    Thread(target=send_email, args=(app, msg)).start()

    response.status = status.HTTP_200_OK

    response.data = json.dumps({
        "response_message":"Check your email for one time password"   
        })
    return response

@app.route('/verify-otp',methods=["POST"])
@token_required
def verifyOTP(current_user):
    response = Response(mimetype='application/json')

    role = request.headers['role']
    otp=request.form["otp"]

    userID=0
    firstName=""
    lastName=""

    try:
        if role==ROLE.USER.name:
            dbResult = accounts.query.filter_by(email_id=current_user.email_id).first()
            userID=dbResult.userid
            firstName=dbResult.firstname
            lastName=dbResult.lastname
        else:
            dbResult = owner_accounts.query.filter_by(email_id=current_user.email_id).first()
            userID=dbResult.user_id
            firstName=dbResult.first_name
            lastName=dbResult.last_name
    
    except exc.NoResultFound:
        # No user found with the input email
        response.status = status.HTTP_404_NOT_FOUND
        response.data = json.dumps({"message":"The email ID is not registered with us. Please try with a valid email ID or register a new account with it"})

        return response
    except:
        response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
        response.data = json.dumps({"message":"Encountered error during communication with database"})

        return response
    
    bearerToken=dbResult.bearer_token

    current_time=datetime.datetime.now()

    time_difference=((current_time-dbResult.updated_at).total_seconds())/3600
    print("Token last updated in hours:",time_difference)

    if time_difference>24:
        bearerToken=uuid.uuid4()

    otp_validity=((current_time-dbResult.updated_at).total_seconds())/60

    if otp_validity > 5:
        response.status = status.HTTP_400_BAD_REQUEST
        response.data = json.dumps({"message":"Please initiate a new OTP as it has exceeded 5 minutes"})

        return response
    
    if int(otp)!=current_user.otp:
        response.status = status.HTTP_401_UNAUTHORIZED
        response.data = json.dumps({"message":"Invalid OTP. Please try with a valid one"})

        return response

    dbResult.bearer_token=bearerToken
    dbResult.updated_at=func.now()
    dbResult.otp= None

    db.session.commit()
    
    jwttoken = jwt.encode({'bearer_token' : dbResult.bearer_token, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=45)}, app.config['SECRET_KEY'], "HS256")
    response.status = status.HTTP_200_OK
    response.data = json.dumps({
        "message":"User validation successful",
        "jwt_token":str(jwttoken),
        "data":{"userid":userID,"first_name":firstName,"last_name":lastName}
        })
    return response

class venues(db.Model):
    id = db.Column(db.Integer, primary_key = True,autoincrement = True)
    owner_id = db.Column(db.Integer, db.ForeignKey('owner_accounts.user_id'))
    name=db.Column(db.String(100))
    status = db.Column(db.String(30))
    lease_price=db.Column(db.Float)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    area = db.Column(db.Float)
    capacity = db.Column(db.Integer)
    about = db.Column(db.Text)
    restrictions = db.Column(db.Text)
    image_url = db.Column(db.String(250))
    construction_date = db.Column(DATE)
    created_at = db.Column(TIMESTAMP, nullable=False, server_default=func.now())
    updated_at = db.Column(TIMESTAMP, nullable=False, server_default=func.now()) 

    def __init__(self,owner_id,name,status,lease_price,latitude,longitude,area,capacity,about,restrictions,imageURL,construction_date):
        self.owner_id=owner_id
        self.name = name
        self.status = status
        self.lease_price=lease_price
        self.latitude = latitude
        self.longitude = longitude
        self.area = area
        self.capacity = capacity
        self.about=about
        self.restrictions=restrictions
        self.image_url=imageURL
        self.construction_date=construction_date

## Venue API
@app.route('/venue',methods =[ 'GET'])
def getAllVenues():
    response = Response(mimetype='application/json')

    # Request Validation
    owner=""

    pageLimit=10
    offset=0
    
    try:
        if 'status' in request.args:
            venueStatus = request.args.get('status')
        else:
            venueStatus = ""
        if 'min_price' in request.args:
            minPrice = request.args.get("min_price")
        else:
            minPrice = ""
        if 'max_price' in request.args:
            maxPrice= request.args.get("max_price")

        else:
            maxPrice = ""

        if 'min_area' in request.args:
            minArea = request.args.get("min_area")
        else:
            minArea =""
        
        if 'max_area' in request.args:
    
            maxArea = request.args.get("max_area")
        else:
            maxArea = ""
        
        if 'min_capacity' in request.args:

            minCapacity = request.args.get("min_capacity")
        else:
            minCapacity = ""
        
        if 'max_capacity' in request.args:
            maxCapacity= request.args.get("max_capacity")
        else:
            maxCapacity =""
        if 'constructed_after' in request.args:

            constructedAfter = request.args.get("constructed_after")
        else:
            constructedAfter = ""

        if 'limit' in request.args:

            pageLimit=request.args.get("limit")
        else:
            pageLimit =""
        
        if 'offset' in request.args:

            offset=request.args.get("offset")
        else:
            offset = ""

        if pageLimit!=None and pageLimit!="":
            pageLimit=int(pageLimit)
        else:
            pageLimit=10
        
        if offset!=None and offset!="":
            offset=int(offset)
        else:
            offset=0

        if minPrice==None or minPrice=="":
            minPrice=0
        else:
            minPrice=float(minPrice)

        if minArea==None or minArea=="":
            minArea=0
        else:
            minArea=float(minArea)

        if minCapacity==None or minCapacity=="":
            minCapacity=0
        else:
            minCapacity=float(minCapacity)

        if maxArea==None or maxArea=="":
            maxArea = venues.query.with_entities(func.max(venues.area)).scalar()
        else:
            maxArea=float(maxArea)

        if maxCapacity==None or maxCapacity=="":
            maxCapacity = venues.query.with_entities(func.max(venues.capacity)).scalar()
        else:
            maxCapacity=float(maxCapacity)

        if maxPrice==None or maxPrice=="":
            maxPrice = venues.query.with_entities(func.max(venues.lease_price)).scalar()
        else:
            maxPrice=float(maxPrice)

    except:
        response.status = status.HTTP_400_BAD_REQUEST
        response.data = json.dumps({"message":"Please give valid filters"})

        return response


    if 'x-access-tokens' in request.headers:
        jwtToken = request.headers['x-access-tokens']
        
        try:
            data = jwt.decode(jwtToken, app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            response.status = status.HTTP_400_BAD_REQUEST
            response.data = json.dumps({"message":"Please use a valid authorization token"})
            
            return response
        
        try:
            dbResult=owner_accounts.query.filter_by(bearer_token = data['bearer_token']).first()
            owner=dbResult.user_id
        except exc.NoResultFound:
            response.status = status.HTTP_400_BAD_REQUEST
            response.data = json.dumps({"message":"No user found for the given authorization token. Please use a valid one"})

            return response
        except:
            response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
            response.data = json.dumps({"message":"Encountered error during communication with database during user authorization"})

            return response

        # Auth user validation
        currentTime=datetime.datetime.now()

        timeDifference=((currentTime-dbResult.updated_at).total_seconds())/3600
        
        if timeDifference>24:
            response.status = status.HTTP_401_UNAUTHORIZED
            response.data = json.dumps({"message":"Bearer token is expired. Please use a valid one"})

            return response
        
        # DB Record Validation
        try:
            baseQuery=venues.query.filter_by(owner_id=owner).filter(and_(venues.lease_price>=minPrice,venues.lease_price<=maxPrice,
                                                            venues.capacity>=minCapacity,venues.capacity<=maxCapacity,
                                                            venues.area>=minArea,venues.area<=maxArea))
            
            if venueStatus=="Available" or venueStatus=="Not Available":
                baseQuery=baseQuery.filter(venues.status==venueStatus)
            if constructedAfter!=None and constructedAfter!="":
                date = datetime.datetime.strptime(constructedAfter, '%Y-%m-%d')
                baseQuery=baseQuery.filter(venues.construction_date>date)

            venueList=baseQuery.limit(pageLimit).offset(offset).all()

        except exc.NoResultFound:
            # No venues found 
            response.status = status.HTTP_404_NOT_FOUND
            response.data = json.dumps({"message":"No venues found associated with this user"})

            return response
        except:
            response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
            response.data = json.dumps({"message":"Encountered error during communication with database"})

            return response
    else:
        try:
            baseQuery=venues.query.filter(and_(venues.lease_price>=minPrice,venues.lease_price<=maxPrice,
                                                            venues.capacity>=minCapacity,venues.capacity<=maxCapacity,
                                                            venues.area>=minArea,venues.area<=maxArea))
            
            if venueStatus=="Available" or venueStatus=="Not Available":
                baseQuery=baseQuery.filter(venues.status==venueStatus)
            if constructedAfter!=None and constructedAfter!="":
                date = datetime.datetime.strptime(constructedAfter, '%Y-%m-%d')
                baseQuery=baseQuery.filter(venues.construction_date>date)

            venueList=baseQuery.limit(pageLimit).offset(offset).all()
        except exc.NoResultFound:
            # No venues found
            response.status = status.HTTP_404_NOT_FOUND
            response.data = json.dumps({"message":"No venues found"})

            return response
        except:
            response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
            response.data = json.dumps({"message":"Encountered error during communication with database"})

            return response              

    venueData=[]
    for venue in venueList:
        venueData.append({
            "id": venue.id,
            "owner_id": venue.owner_id,
            "name": venue.name,
            "status": venue.status,
            "lease_price": venue.lease_price,
            "latitude": venue.latitude,
            "longitude": venue.longitude,
            "area": venue.area,
            "capacity": venue.capacity,
            "about": venue.about,
            "restrictions": venue.restrictions,
            "image_url":venue.image_url,
            "construction_date": str(venue.construction_date),
            "created_at": str(venue.created_at),
            "updated_at": str(venue.updated_at)
        })

    response.status = status.HTTP_200_OK
    response.data = json.dumps({
        "message":"Venues data fetched successfully",
        "data":venueData
        })
        
    return response

## Venue By ID API
@app.route('/venue/<id>',methods =[ 'GET'])
def getVenueByID(id):
    response = Response(mimetype='application/json')
    if "id" not in request.view_args:
        response.status = status.HTTP_400_BAD_REQUEST
        response.data = json.dumps({"message":"Missing venue id in path parameter. Please send a valid one"})

        return response
    
    # id = request.view_args["id"]

    # Request Validation
    owner=""

    if 'x-access-tokens' in request.headers:
        jwtToken = request.headers['x-access-tokens']
        try:
            data = jwt.decode(jwtToken, app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            response.status = status.HTTP_400_BAD_REQUEST
            response.data = json.dumps({"message":"Please use a valid authorization token"})
            
            return response

        try:
            dbResult=owner_accounts.query.filter_by(bearer_token = data['bearer_token']).first()
            owner=dbResult.user_id
        except exc.NoResultFound:
            response.status = status.HTTP_400_BAD_REQUEST
            response.data = json.dumps({"message":"No user found for the given authorization token. Please use a valid one"})

            return response
        except:
            response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
            response.data = json.dumps({"message":"Encountered error during communication with database during user authorization"})

            return response

        # Auth user validation
        currentTime=datetime.datetime.now()

        timeDifference=((currentTime-dbResult.updated_at).total_seconds())/3600
        
        if timeDifference>24:
            response.status = status.HTTP_401_UNAUTHORIZED
            response.data = json.dumps({"message":"Bearer token is expired. Please use a valid one"})

            return response

        # DB Record Validation
        try:
            venueDetails=venues.query.filter_by(owner_id=owner,id=id).one()
        except exc.NoResultFound:
            # No venue found with the given ID
            response.status = status.HTTP_404_NOT_FOUND
            response.data = json.dumps({"message":"No venue found associated with this user"})

            return response
        except:
            response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
            response.data = json.dumps({"message":"Encountered error during communication with database"})

            return response
    else:
        try:
            venueDetails=venues.query.filter_by(id=id).one()
        except exc.NoResultFound:
            # No venue owner found for the venue ID
            response.status = status.HTTP_404_NOT_FOUND
            response.data = json.dumps({"message":"No venue found"})

            return response
        except:
            response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
            response.data = json.dumps({"message":"Encountered error during communication with database"})

            return response              

    venueData={
        "id": venueDetails.id,
        "owner_id": venueDetails.owner_id,
        "name": venueDetails.name,
        "status": venueDetails.status,
        "lease_price": venueDetails.lease_price,
        "latitude": venueDetails.latitude,
        "longitude": venueDetails.longitude,
        "area": venueDetails.area,
        "capacity": venueDetails.capacity,
        "about": venueDetails.about,
        "restrictions": venueDetails.restrictions,
        "construction_date": str(venueDetails.construction_date),
        "image_url":venueDetails.image_url,
        "created_at": str(venueDetails.created_at),
        "updated_at": str(venueDetails.updated_at)
    }

    response.status = status.HTTP_200_OK
    response.data = json.dumps({
        "message":"Venues data fetched successfully",
        "data":venueData
        })

    return response
        

@app.route('/venue',methods =[ 'POST'])
@token_required
def createVenue(current_user):
    response = Response(mimetype='application/json')

    owner=current_user.user_id

    # Auth user validation
    currentTime=datetime.datetime.now()

    timeDifference=((currentTime-current_user.updated_at).total_seconds())/3600
    
    if timeDifference>24:
        response.status = status.HTTP_401_UNAUTHORIZED
        response.data = json.dumps({"message":"Bearer token is expired. Please use a valid one"})

        return response

    image=request.files["image"]

    imageURL=""

    try:
        result = cloudinary.uploader.upload(image,folder=app.config["VENUE_IMAGES_PATH"])
        imageURL=result["url"]
    except Exception as e:
        print(e)
        response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
        response.data = json.dumps({"message":"Encountered error during image upload to cloud"})

        return response

    newVenue = venues(
        owner_id=owner,
        name=request.form['name'],
        lease_price=request.form['lease_price'],
        status=request.form['status'],
        latitude=request.form['latitude'],
        longitude=request.form['longitude'],
        area=request.form['area'],
        capacity=request.form['capacity'],
        about=request.form['about'],
        restrictions=request.form['restrictions'],
        imageURL=imageURL,
        construction_date=datetime.datetime.strptime(request.form['construction_date'], '%Y-%m-%d')
    )

    db.session.add(newVenue)
    db.session.commit()
    
    venueData={
            "id": newVenue.id,
            "owner_id": newVenue.owner_id,
            "name": newVenue.name,
            "status": newVenue.status,
            "lease_price": newVenue.lease_price,
            "latitude": newVenue.latitude,
            "longitude": newVenue.longitude,
            "area": newVenue.area,
            "capacity":newVenue.capacity,
            "about": newVenue.about,
            "restrictions": newVenue.restrictions,
            "image_url": newVenue.image_url,
            "construction_date": str(newVenue.construction_date),
            "created_at": str(newVenue.created_at),
            "updated_at": str(newVenue.updated_at)

    }
    response.status = status.HTTP_201_CREATED
    response.data = json.dumps({
        "message":"Venue created successfully",
        "data":venueData
        })
        
    return response

@app.route('/venue/<id>',methods =[ 'PUT'])
@token_required
def updateVenue(current_user,id):
    response = Response(mimetype='application/json')
    
    # Request Validation
    owner = current_user.user_id

    # Auth user validation
    currentTime=datetime.datetime.now()

    timeDifference=((currentTime-current_user.updated_at).total_seconds())/3600
    
    if timeDifference>24:
        response.status = status.HTTP_401_UNAUTHORIZED
        response.data = json.dumps({"message":"Bearer token is expired. Please use a valid one"})

        return response

    # Venue DB Record Validation
    try:
        venueResult=venues.query.filter_by(id=id,owner_id = owner).first()
    except exc.NoResultFound:
        response.status = status.HTTP_400_BAD_REQUEST
        response.data = json.dumps({"message":"No venue found for the given id and owner. Please use a valid one"})

        return response
    except:
        response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
        response.data = json.dumps({"message":"Encountered error during communication with database during user authorization"})

        return response

    image=request.files["image"]

    imageURL=""

    try:
        result = cloudinary.uploader.upload(image,folder=app.config["VENUE_IMAGES_PATH"])
        imageURL=result["url"]
    except Exception as e:
        print(e)
        response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
        response.data = json.dumps({"message":"Encountered error during image upload to cloud"})

        return response

    venueResult.name=request.form['name']
    venueResult.lease_price=request.form['lease_price']
    venueResult.status=request.form['status']
    venueResult.latitude=request.form['latitude']
    venueResult.longitude=request.form['longitude']
    venueResult.area=request.form['area']
    venueResult.capacity=request.form['capacity']
    venueResult.about=request.form['about']
    venueResult.restrictions=request.form['restrictions']
    venueResult.imageURL=imageURL
    venueResult.construction_date=datetime.datetime.strptime(request.form['construction_date'], '%Y-%m-%d')

    db.session.commit()
    
    venueData={
            "id": venueResult.id,
            "owner_id": venueResult.owner_id,
            "name": venueResult.name,
            "status": venueResult.status,
            "lease_price": venueResult.lease_price,
            "latitude": venueResult.latitude,
            "longitude": venueResult.longitude,
            "area": venueResult.area,
            "capacity":venueResult.capacity,
            "about": venueResult.about,
            "restrictions": venueResult.restrictions,
            "image_url": venueResult.image_url,
            "construction_date": str(venueResult.construction_date),
            "created_at": str(venueResult.created_at),
            "updated_at": str(venueResult.updated_at)

    }
    
    response.status = status.HTTP_200_OK
    response.data = json.dumps({
        "message":"Venue updated successfully",
        "data":venueData
        })
        
    return response

@app.route('/venue/<id>',methods =[ 'DELETE'])
@token_required
def deleteVenue(current_user,id):
    response = Response(mimetype='application/json')
    
    # Request Validation
    owner=current_user.user_id
    
    # Auth user validation
    currentTime=datetime.datetime.now()

    timeDifference=((currentTime-current_user.updated_at).total_seconds())/3600
    
    if timeDifference>24:
        response.status = status.HTTP_401_UNAUTHORIZED
        response.data = json.dumps({"message":"Bearer token is expired. Please use a valid one"})

        return response

    # Venue DB Record Validation
    try:
        venueResult=venues.query.filter_by(id=id,owner_id = owner).first()
    except exc.NoResultFound:
        response.status = status.HTTP_400_BAD_REQUEST
        response.data = json.dumps({"message":"No venue found for the given id and owner. Please use a valid one"})

        return response
    except:
        response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
        response.data = json.dumps({"message":"Encountered error during communication with database during user authorization"})

        return response
    
    db.session.delete(venueResult)
    db.session.commit()
    
    response.status = status.HTTP_204_NO_CONTENT
    response.data = json.dumps({
        "message":"Venue deleted successfully"
        })
        
    return response


   
class events(db.Model):
    id = db.Column(db.Integer, primary_key = True,autoincrement = True)
    host_id = db.Column(db.Integer, db.ForeignKey('owner_accounts.user_id'))
    name=db.Column(db.String(100))
    status = db.Column(db.String(30))
    entry_price = db.Column(db.Float)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    guests_count = db.Column(db.Integer)
    about = db.Column(db.Text)
    restrictions = db.Column(db.Text)
    image_url = db.Column(db.String(250))
    event_date = db.Column(DATE)
    created_at = db.Column(TIMESTAMP, nullable=False, server_default=func.now())
    updated_at = db.Column(TIMESTAMP, nullable=False, server_default=func.now()) 

    def __init__(self,hostID,name,status,entryPrice,latitude,longitude,guestsCount,about,restrictions,imageURL,eventDate):
        self.host_id=hostID
        self.name = name
        self.status = status
        self.entry_price=entryPrice
        self.latitude = latitude
        self.longitude = longitude
        self.guests_count = guestsCount
        self.about=about
        self.restrictions=restrictions
        self.image_url=imageURL
        self.event_date=eventDate

## Event API
@app.route('/event',methods =[ 'GET'])
def getAllEvents():
    response = Response(mimetype='application/json')


    pageLimit=10
    offset=0
    
    try:
        eventStatus = request.args.get('status')
        minPrice = request.args.get("min_price")
        maxPrice= request.args.get("max_price")
        minGuestsCount = request.args.get("min_guests_count")
        maxGuestsCount = request.args.get("max_guests_count")
        eventDate = request.args.get("event_date")
        pageLimit=request.args.get("limit")
        offset=request.args.get("offset")

        if pageLimit!=None and pageLimit!="":
            pageLimit=int(pageLimit)
        else:
            pageLimit=10

        if offset!=None and offset!="":
            offset=int(offset)
        else:
            offset=0

        if minPrice==None or minPrice=="":
            minPrice=0
        else:
            minPrice=float(minPrice)

        if minGuestsCount==None or minGuestsCount=="":
            minGuestsCount=0
        else:
            minGuestsCount=int(minGuestsCount)

        if maxGuestsCount==None or maxGuestsCount=="":
            maxGuestsCount = events.query.with_entities(func.max(events.guests_count)).scalar()
        else:
            maxGuestsCount=float(maxGuestsCount)

        if maxPrice==None or maxPrice=="":
            maxPrice = events.query.with_entities(func.max(events.entry_price)).scalar()
        else:
            maxPrice=float(maxPrice)

    except:
        response.status = status.HTTP_400_BAD_REQUEST
        response.data = json.dumps({"message":"Please give valid filters"})

        return response

    if 'x-access-tokens' in request.headers:
        jwtToken = request.headers['x-access-tokens']
        
        try:
            data = jwt.decode(jwtToken, app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            response.status = status.HTTP_400_BAD_REQUEST
            response.data = json.dumps({"message":"Please use a valid authorization token"})
            
            return response
        
        try:
            dbResult=owner_accounts.query.filter_by(bearer_token = data['bearer_token']).first()
            host=dbResult.user_id
        except exc.NoResultFound:
            response.status = status.HTTP_400_BAD_REQUEST
            response.data = json.dumps({"message":"No user found for the given authorization token. Please use a valid one"})

            return response
        except:
            response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
            response.data = json.dumps({"message":"Encountered error during communication with database during user authorization"})

            return response

        # Auth user validation
        currentTime=datetime.datetime.now()

        timeDifference=((currentTime-dbResult.updated_at).total_seconds())/3600
        
        if timeDifference>24:
            response.status = status.HTTP_401_UNAUTHORIZED
            response.data = json.dumps({"message":"Bearer token is expired. Please use a valid one"})

            return response
                
        # DB Record Validation
        try:
            baseQuery=events.query.filter_by(host_id=host).filter(and_(events.entry_price>=minPrice,events.entry_price<=maxPrice,
                                                            events.guests_count>=minGuestsCount,events.guests_count<=maxGuestsCount))
            
            if eventStatus=="Open" or eventStatus=="Closed":
                baseQuery=baseQuery.filter(events.status==eventStatus)
            if eventDate!=None and eventDate!="":
                baseQuery=baseQuery.filter(events.event_date==eventDate)

            eventList=baseQuery.limit(pageLimit).offset(offset).all()
        except exc.NoResultFound:
            # No events found 

            response.status = status.HTTP_404_NOT_FOUND
            response.data = json.dumps({"message":"No events found associated with this user"})

            return response
        except Exception as e:
            print(e)
            response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
            response.data = json.dumps({"message":"Encountered error during communication with database:"})

            return response
    else:
        try:
            baseQuery=events.query.filter(and_(events.entry_price>=minPrice,events.entry_price<=maxPrice,
                                                            events.guests_count>=minGuestsCount,events.guests_count<=maxGuestsCount))
            
            if eventStatus=="Open" or eventStatus=="Closed":
                baseQuery=baseQuery.filter(events.status==eventStatus)
            if eventDate!=None and eventDate!="":
                baseQuery=baseQuery.filter(events.event_date==eventDate)

            eventList=baseQuery.limit(pageLimit).offset(offset).all()
        except exc.NoResultFound:
            # No events found
            response.status = status.HTTP_404_NOT_FOUND
            response.data = json.dumps({"message":"No events found"})

            return response
        except:
            response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
            response.data = json.dumps({"message":"Encountered error during communication with database"})

            return response              

    eventData=[]
    for event in eventList:
        eventData.append({
            "id": event.id,
            "host_id": event.host_id,
            "name": event.name,
            "status": event.status,
            "entry_price": event.entry_price,
            "latitude": event.latitude,
            "longitude": event.longitude,
            "guests_count": event.guests_count,
            "about": event.about,
            "restrictions": event.restrictions,
            "image_url":event.image_url,
            "event_date": str(event.event_date),
            "created_at": str(event.created_at),
            "updated_at": str(event.updated_at)
        })

    response.status = status.HTTP_200_OK
    response.data = json.dumps({
        "message":"Events fetched successfully",
        "data":eventData
        })
        
    return response

## Get Event By ID
@app.route('/event/<id>',methods =[ 'GET'])
def getEventByID(id):
    response = Response(mimetype='application/json')
    if "id" not in request.view_args:
        response.status = status.HTTP_400_BAD_REQUEST
        response.data = json.dumps({"message":"Missing event id in path parameter. Please send a valid one"})

        return response
    
    # Request Validation
    host=""

    if 'x-access-tokens' in request.headers:
        jwtToken = request.headers['x-access-tokens']
        
        try:
            data = jwt.decode(jwtToken, app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            response.status = status.HTTP_400_BAD_REQUEST
            response.data = json.dumps({"message":"Please use a valid authorization token"})
            
            return response
        
        try:
            dbResult=owner_accounts.query.filter_by(bearer_token = data['bearer_token']).first()
            host=dbResult.user_id
        except exc.NoResultFound:
            response.status = status.HTTP_400_BAD_REQUEST
            response.data = json.dumps({"message":"No user found for the given authorization token. Please use a valid one"})

            return response
        except:
            response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
            response.data = json.dumps({"message":"Encountered error during communication with database during user authorization"})

            return response

        # Auth user validation
        currentTime=datetime.datetime.now()

        timeDifference=((currentTime-dbResult.updated_at).total_seconds())/3600
        
        if timeDifference>24:
            response.status = status.HTTP_401_UNAUTHORIZED
            response.data = json.dumps({"message":"Bearer token is expired. Please use a valid one"})

            return response

        # DB Record Validation
        try:
            eventDetails=events.query.filter_by(host_id=host,id=id).one()
        except exc.NoResultFound:
            # No event found with the given ID and organizer
            response.status = status.HTTP_404_NOT_FOUND
            response.data = json.dumps({"message":"No event found associated with this user"})

            return response
        except:
            response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
            response.data = json.dumps({"message":"Encountered error during communication with database"})

            return response
    else:
        try:
            eventDetails=events.query.filter_by(id=id).one()
        except exc.NoResultFound:
            # No event found for the event ID
            response.status = status.HTTP_404_NOT_FOUND
            response.data = json.dumps({"message":"No event found"})

            return response
        except:
            response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
            response.data = json.dumps({"message":"Encountered error during communication with database"})

            return response              

    eventData={
            "id": eventDetails.id,
            "host_id": eventDetails.host_id,
            "name": eventDetails.name,
            "status": eventDetails.status,
            "entry_price": eventDetails.entry_price,
            "latitude": eventDetails.latitude,
            "longitude": eventDetails.longitude,
            "guests_count": eventDetails.guests_count,
            "about": eventDetails.about,
            "restrictions": eventDetails.restrictions,
            "image_url":eventDetails.image_url,
            "event_date": str(eventDetails.event_date),
            "created_at": str(eventDetails.created_at),
            "updated_at": str(eventDetails.updated_at)

    }

    response.status = status.HTTP_200_OK
    response.data = json.dumps({
        "message":"Event fetched successfully",
        "data":eventData
        })

    return response

@app.route('/event',methods =[ 'POST'])
@token_required
def createEvent(current_user):
    response = Response(mimetype='application/json')
    
    # Request Validation
    host=current_user.user_id

    # Auth user validation
    currentTime=datetime.datetime.now()

    timeDifference=((currentTime-current_user.updated_at).total_seconds())/3600
    
    if timeDifference>24:
        response.status = status.HTTP_401_UNAUTHORIZED
        response.data = json.dumps({"message":"Bearer token is expired. Please use a valid one"})

        return response

    image=request.files["image"]

    imageURL=""

    try:
        result = cloudinary.uploader.upload(image,folder=app.config["EVENT_IMAGES_PATH"])
        imageURL=result["url"]
    except Exception as e:
        print(e)
        response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
        response.data = json.dumps({"message":"Encountered error during image upload to cloud"})

        return response  


    newEvent = events(
        hostID=host,
        name=request.form["name"],
        status=request.form["status"],
        entryPrice=request.form["entry_price"],
        latitude=request.form["latitude"],
        longitude=request.form["longitude"],
        guestsCount=request.form["guests_count"],
        about=request.form["about"],
        imageURL=imageURL,
        restrictions=request.form["restrictions"],
        eventDate=request.form["event_date"]
    )

    db.session.add(newEvent)
    db.session.commit()
    
    eventData={
            "id": newEvent.id,
            "host_id": newEvent.host_id,
            "name": newEvent.name,
            "status": newEvent.status,
            "entry_price": newEvent.entry_price,
            "latitude": newEvent.latitude,
            "longitude": newEvent.longitude,
            "guests_count": newEvent.guests_count,
            "about": newEvent.about,
            "restrictions": newEvent.restrictions,
            "image_url": imageURL,
            "event_date": str(newEvent.event_date),
            "created_at": str(newEvent.created_at),
            "updated_at": str(newEvent.updated_at)

    }

    response.status = status.HTTP_201_CREATED
    response.data = json.dumps({
        "message":"Event created successfully",
        "data":eventData
        })
        
    return response

@app.route('/event/<id>',methods =[ 'PUT'])
@token_required
def updateEvent(current_user,id):
    response = Response(mimetype='application/json')
    
    # Request Validation
    host=current_user.user_id

    # Auth user validation
    currentTime=datetime.datetime.now()

    timeDifference=((currentTime-current_user.updated_at).total_seconds())/3600
    
    if timeDifference>24:
        response.status = status.HTTP_401_UNAUTHORIZED
        response.data = json.dumps({"message":"Bearer token is expired. Please use a valid one"})

        return response

    # Event DB Record Validation
    try:
        eventResult=events.query.filter_by(id=id,host_id = host).first()
    except exc.NoResultFound:
        response.status = status.HTTP_400_BAD_REQUEST
        response.data = json.dumps({"message":"No event found for the given id and owner. Please use a valid one"})

        return response
    except:
        response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
        response.data = json.dumps({"message":"Encountered error during communication with database during user authorization"})

        return response

    image=request.files["image"]

    imageURL=""

    try:
        result = cloudinary.uploader.upload(image,folder=app.config["EVENT_IMAGES_PATH"])
        imageURL=result["url"]
    except Exception as e:
        print(e)
        response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
        response.data = json.dumps({"message":"Encountered error during image upload to cloud"})

        return response  


    eventResult.name=request.form["name"]
    eventResult.status=request.form["status"]
    eventResult.entryPrice=request.form["entry_price"]
    eventResult.latitude=request.form["latitude"]
    eventResult.longitude=request.form["longitude"]
    eventResult.guestsCount=request.form["guests_count"]
    eventResult.about=request.form["about"]
    eventResult.imageURL=imageURL
    eventResult.restrictions=request.form["restrictions"]
    eventResult.eventDate=request.form["event_date"]

    db.session.commit()
    
    eventData={
            "id": eventResult.id,
            "host_id": eventResult.host_id,
            "name": eventResult.name,
            "status": eventResult.status,
            "entry_price": eventResult.entry_price,
            "latitude": eventResult.latitude,
            "longitude": eventResult.longitude,
            "guests_count": eventResult.guests_count,
            "about": eventResult.about,
            "restrictions": eventResult.restrictions,
            "image_url": imageURL,
            "event_date": str(eventResult.event_date),
            "created_at": str(eventResult.created_at),
            "updated_at": str(eventResult.updated_at)

    }
    
    response.status = status.HTTP_200_OK
    response.data = json.dumps({
        "message":"Event updated successfully",
        "data":eventData
        })
        
    return response

@app.route('/event/<id>',methods =[ 'DELETE'])
@token_required
def deleteEvent(current_user,id):
    response = Response(mimetype='application/json')
    
    # Request Validation
    host=current_user.user_id

    # Auth user validation
    currentTime=datetime.datetime.now()

    timeDifference=((currentTime-current_user.updated_at).total_seconds())/3600
    
    if timeDifference>24:
        response.status = status.HTTP_401_UNAUTHORIZED
        response.data = json.dumps({"message":"Bearer token is expired. Please use a valid one"})

        return response

    # Event DB Record Validation
    try:
        eventResult=events.query.filter_by(id=id,host_id = host).first()
    except exc.NoResultFound:
        response.status = status.HTTP_400_BAD_REQUEST
        response.data = json.dumps({"message":"No event found for the given id and owner. Please use a valid one"})

        return response
    except:
        response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
        response.data = json.dumps({"message":"Encountered error during communication with database during user authorization"})

        return response

    
    db.session.delete(eventResult)
    db.session.commit()
    
    response.status = status.HTTP_204_NO_CONTENT
    response.data = json.dumps({
        "message":"Event deleted successfully"
        })
        
    return response

class venue_ratings(db.Model):
    id=db.Column(db.Integer, primary_key = True,autoincrement = True)
    user_id=db.Column(db.Integer, db.ForeignKey('accounts.userid'))
    venue_id = db.Column(db.Integer, db.ForeignKey('venues.id'))
    rating = db.Column(db.Float)

    def __init__(self, userID, venueID, rating):
        self.user_id=userID
        self.venue_id=venueID
        self.rating=rating

@app.route('/venue/<id>/rating',methods =[ 'GET'])
def getVenueRatings(id):
    response = Response(mimetype='application/json')
        
    try:
        result=venue_ratings.query.filter_by(venue_id=id).all()
    except exc.NoResultFound:
        response.status = status.HTTP_404_NOT_FOUND
        response.data = json.dumps({"message":"No venue ratings found"})

        return response
    except:
        response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
        response.data = json.dumps({"message":"Encountered error during communication with database"})

        return response

    venueRatings=[]
    for v in result:
        venueRatings.append({
            "id": v.id,
            "userID": v.user_id,
            "rating": v.rating
        })

    response.status = status.HTTP_200_OK
    response.data = json.dumps({
        "message":"Venue ratings data fetched successfully",
        "data":venueRatings
        })
        
    return response


@app.route('/venue/<id>/rating',methods =[ 'POST'])
@token_required
def rateVenue(current_user,id):
    response = Response(mimetype='application/json')
    
    # Request Validation
    userID=current_user.userid

    # Auth user validation
    currentTime=datetime.datetime.now()

    timeDifference=((currentTime-current_user.updated_at).total_seconds())/3600
    
    if timeDifference>24:
        response.status = status.HTTP_401_UNAUTHORIZED
        response.data = json.dumps({"message":"Bearer token is expired. Please use a valid one"})

        return response

    rating = 0

    try:
        rating = float(request.form["rating"])
    except:
        response.status = status.HTTP_400_BAD_REQUEST
        response.data = json.dumps({
            "message":"Invalid star rating"
            })
            
        return response    
    
    if rating>5:
        rating =5
    
    try:
        result=venue_ratings.query.filter_by(user_id = userID,venue_id=id).first()
    except:    
        response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
        response.data = json.dumps({"message":"Encountered error during communication with database"})

        return response
    
    if result!=None:
        response.status = status.HTTP_400_BAD_REQUEST
        response.data = json.dumps({"message":"User rating already exists. Please try update"})

        return response

    try:
        # Event DB Record Validation
        venueRating = venue_ratings(
            userID=userID,
            venueID=id,
            rating=rating,
        )

        db.session.add(venueRating)
        db.session.commit()
    except:
        response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
        response.data = json.dumps({"message":"Encountered error during communication with database"})

        return response

    response.status = status.HTTP_201_CREATED
    response.data = json.dumps({
        "message":"Thank you for the rating"
        })
        
    return response

@app.route('/venue/<id>/rating',methods =[ 'PUT'])
@token_required
def updateVenueRating(current_user,id):
    response = Response(mimetype='application/json')
    
    # Request Validation
    userID=current_user.userid

    # Auth user validation
    currentTime=datetime.datetime.now()

    timeDifference=((currentTime-current_user.updated_at).total_seconds())/3600
    
    if timeDifference>24:
        response.status = status.HTTP_401_UNAUTHORIZED
        response.data = json.dumps({"message":"Bearer token is expired. Please use a valid one"})

        return response

    rating = 0

    try:
        rating = float(request.form["rating"])
    except:
        response.status = status.HTTP_400_BAD_REQUEST
        response.data = json.dumps({
            "message":"Invalid star rating"
            })
            
        return response    
    
    if rating>5:
        rating =5
    
    try:
        result=venue_ratings.query.filter_by(user_id = userID,venue_id=id).first()
    except:    
        response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
        response.data = json.dumps({"message":"Encountered error during communication with database"})

        return response
    
    if result==None:
        response.status = status.HTTP_400_BAD_REQUEST
        response.data = json.dumps({"message":"User rating doesn't exist. Please try creating one"})

        return response

    try:
        result.rating=rating

        db.session.commit()
    except:
        response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
        response.data = json.dumps({"message":"Encountered error during communication with database"})

        return response

    response.status = status.HTTP_200_OK
    response.data = json.dumps({
        "message":"Thank you for update in the rating"
        })
        
    return response


class event_ratings(db.Model):
    id=db.Column(db.Integer, primary_key = True,autoincrement = True)
    user_id=db.Column(db.Integer, db.ForeignKey('accounts.userid'))
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))
    rating = db.Column(db.Float)

    def __init__(self, userID, eventID, rating):
        self.user_id=userID
        self.event_id=eventID
        self.rating=rating

@app.route('/event/<id>/rating',methods =[ 'GET'])
def getEventRatings(id):
    response = Response(mimetype='application/json')
        
    try:
        result=event_ratings.query.filter_by(event_id=id).all()
    except exc.NoResultFound:
        response.status = status.HTTP_404_NOT_FOUND
        response.data = json.dumps({"message":"No event ratings found"})

        return response
    except:
        response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
        response.data = json.dumps({"message":"Encountered error during communication with database"})

        return response

    eventRatings=[]
    for v in result:
        eventRatings.append({
            "id": v.id,
            "userID": v.user_id,
            "rating": v.rating
        })

    response.status = status.HTTP_200_OK
    response.data = json.dumps({
        "message":"Event ratings data fetched successfully",
        "data":eventRatings
        })
        
    return response


@app.route('/event/<id>/rating',methods =[ 'POST'])
@token_required
def rateEvent(current_user,id):
    response = Response(mimetype='application/json')
    
    # Request Validation
    userID=current_user.userid

    # Auth user validation
    currentTime=datetime.datetime.now()

    timeDifference=((currentTime-current_user.updated_at).total_seconds())/3600
    
    if timeDifference>24:
        response.status = status.HTTP_401_UNAUTHORIZED
        response.data = json.dumps({"message":"Bearer token is expired. Please use a valid one"})

        return response

    rating = 0

    try:
        rating = float(request.form["rating"])
    except:
        response.status = status.HTTP_400_BAD_REQUEST
        response.data = json.dumps({
            "message":"Invalid star rating"
            })
            
        return response    
    
    if rating>5:
        rating =5
    
    try:
        result=event_ratings.query.filter_by(user_id = userID,event_id=id).first()
    except exc.NoResultFound:    
        response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
        response.data = json.dumps({"message":"Encountered error during communication with database during user authorization"})

        return response
    
    if result!=None:
        response.status = status.HTTP_400_BAD_REQUEST
        response.data = json.dumps({"message":"User rating already exists. Please try update"})

        return response

    try:
        eventRating = event_ratings(
            userID=userID,
            eventID=id,
            rating=rating,
        )

        db.session.add(eventRating)
        db.session.commit()
    except:
        response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
        response.data = json.dumps({"message":"Encountered error during communication with database during user authorization"})

        return response

    response.status = status.HTTP_201_CREATED
    response.data = json.dumps({
        "message":"Thank you for the rating"
        })
        
    return response

@app.route('/event/<id>/rating',methods =[ 'PUT'])
@token_required
def updateEventRating(current_user,id):
    response = Response(mimetype='application/json')
    
    # Request Validation
    userID=current_user.userid

    # Auth user validation
    currentTime=datetime.datetime.now()

    timeDifference=((currentTime-current_user.updated_at).total_seconds())/3600
    
    if timeDifference>24:
        response.status = status.HTTP_401_UNAUTHORIZED
        response.data = json.dumps({"message":"Bearer token is expired. Please use a valid one"})

        return response

    rating = 0

    try:
        rating = float(request.form["rating"])
    except:
        response.status = status.HTTP_400_BAD_REQUEST
        response.data = json.dumps({
            "message":"Invalid star rating"
            })
            
        return response    
    
    if rating>5:
        rating =5
    
    try:
        result=event_ratings.query.filter_by(user_id = userID,event_id=id).first()
    except:    
        response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
        response.data = json.dumps({"message":"Encountered error during communication with database"})

        return response
    
    if result==None:
        response.status = status.HTTP_400_BAD_REQUEST
        response.data = json.dumps({"message":"User rating doesn't exist. Please try creating one"})

        return response

    try:
        result.rating=rating

        db.session.commit()
    except:
        response.status = status.HTTP_500_INTERNAL_SERVER_ERROR
        response.data = json.dumps({"message":"Encountered error during communication with database"})

        return response

    response.status = status.HTTP_200_OK
    response.data = json.dumps({
        "message":"Thank you for update in the rating"
        })
        
    return response

#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
# Payments
class Status(enum.Enum):
    PENDING = 'PENDING'
    CANCELLED = 'CANCELLED'
    FAILED='FAILED'
    SUCCESS='SUCCESS'

class payments(db.Model):
    transaction_id = db.Column(db.String(100), primary_key = True)
    reference_id =db.Column(db.String(100))
    amount = db.Column(db.String(100))
    email_id =db.Column(db.String(100),db.ForeignKey('accounts.email_id'))
    status = db.Column(db.Enum(Status))
    created_at = db.Column(TIMESTAMP, nullable=False, server_default=func.now())
    updated_at = db.Column(TIMESTAMP, nullable=False, server_default=func.now()) 
    def __init__(self,tid,rid,amount,email_id,status):
        self.transaction_id = tid
        self.reference_id =rid
        self.amount =amount
        self.email_id =email_id
        self.status=status

@app.route('/checkout_page')
def checkout():
    response = Response(mimetype='application/json')
    response.status = status.HTTP_200_OK
    response.data = json.dumps({
        'key':stripe_keys['publishable_key']
    })
    return render_template('/checkout.html')


   



#---------------------------------------------------------------------------------------------------------------
# Events bookings



@app.route('/event-reservation',methods=['POST','GET'])
#Fetches events booked by the user fir user or owner depending on the role
@token_required
def event_reservation(user):
    response = Response(mimetype='application/json')

    if request.headers['role'] == ROLE.USER.name:
        eventResult = event_participation.query.filter_by(email_id = user.email_id).all()
        data = []
        for ever in eventResult:
            teve = {}

            teve['id'] = ever.id
            teve['event_id'] = ever.event_id
            teve['payment_id'] = ever.payment_id
            teve['first_name']=ever.first_name
            teve['last_name'] = ever.last_name
            teve['email_id'] = ever.email_id
            teve['contact'] = ever.contact
            teve['ticket_count'] = ever.ticket_count


            data.append(teve)
        response.status = status.HTTP_200_OK
        response.data = json.dumps({"message": "Event Reservations fetched successfully","data": data})

        return response


    else:
        eventResult = events.query.filter_by(host_id = user.user_id).all()
        ownerevents = []
        for res in eventResult:
            ownerevents.append(res.id)

        ownereventResult = event_participation.query.filter(event_participation.event_id.in_(ownerevents)).all()


        
        data = []
        for ever in ownereventResult:
            teve = {}

            teve['id'] = ever.id
            teve['event_id'] = ever.event_id
            teve['payment_id'] = ever.payment_id
            teve['first_name']=ever.first_name
            teve['last_name'] = ever.last_name
            teve['email_id'] = ever.email_id
            teve['contact'] = ever.contact
            teve['ticket_count'] = ever.ticket_count


            data.append(teve)
        response.status = status.HTTP_200_OK
        response.data = json.dumps({"message": "Event Reservations fetched successfully","data": data})

        return response


    
@app.route('/event-reservation/<id>',methods=['POST','GET'])
#Fetches events booked by the user fir user or owner depending on the role
@token_required
def event_reservation_id(user,id):
    try:
        print('fetch by id', user,id)
        response = Response(mimetype='application/json')
        if request.headers['role'] == ROLE.USER.name:
            eventResult = event_participation.query.filter_by(email_id = user.email_id , event_id =  id).all()
            data = []
            for ever in eventResult:
                teve = {}

                teve['id'] = ever.id
                teve['event_id'] = ever.event_id
                teve['payment_id'] = ever.payment_id
                teve['first_name']=ever.first_name
                teve['last_name'] = ever.last_name
                teve['email_id'] = ever.email_id
                teve['contact'] = ever.contact
                teve['ticket_count'] = ever.ticket_count


                data.append(teve)
            response.status = status.HTTP_200_OK
            response.data = json.dumps({"message": "Event Reservations fetched successfully","data": data})

            return response


        else:
            eventResult = events.query.filter_by(host_id = user.user_id,id=id).all()
            ownerevents = []
            for res in eventResult:
                ownerevents.append(res.id)

            ownereventResult = event_participation.query.filter(event_participation.event_id.in_(ownerevents)).all()


            
            data = []
            for ever in ownereventResult:
                teve = {}

                teve['id'] = ever.id
                teve['event_id'] = ever.event_id
                teve['payment_id'] = ever.payment_id
                teve['first_name']=ever.first_name
                teve['last_name'] = ever.last_name
                teve['email_id'] = ever.email_id
                teve['contact'] = ever.contact
                teve['ticket_count'] = ever.ticket_count


                data.append(teve)
            response.status = status.HTTP_200_OK
            response.data = json.dumps({"message": "Event Reservations fetched successfully","data": data})

            return response
    except:

            response.status = status.HTTP_400_BAD_REQUEST
            response.data = json.dumps({"message": "Something went wrong"})





#---------------------------------------------------------------------------------------------------------------
# Venue bookings



@app.route('/venue-reservation',methods=['POST','GET'])
#Fetches events booked by the user fir user or owner depending on the role
@token_required
def venue_reservation(user):
    response = Response(mimetype='application/json')

    if request.headers['role'] == ROLE.USER.name:
        eventResult = venue_leasing.query.filter_by(email_id = user.email_id).all()
        data = []
        for ever in eventResult:
            teve = {}

            teve['id'] = ever.id
            teve['venue_id'] = ever.venue_id
            teve['payment_id'] = ever.payment_id
            teve['first_name']=ever.first_name
            teve['last_name'] = ever.last_name
            teve['email_id'] = ever.email_id
            teve['contact'] = ever.contact
            teve['lease_from_date'] = str(ever.lease_from_date)
            teve['lease_end_date'] = str(ever.lease_end_date)

            data.append(teve)
        response.status = status.HTTP_200_OK
        response.data = json.dumps({"message": "Venue Reservations fetched successfully","data": data})

        return response


    else:
        eventResult = venues.query.filter_by(owner_id = user.user_id).all()
        ownerevents = []
        for res in eventResult:
            ownerevents.append(res.id)

        ownereventResult = venue_leasing.query.filter(venue_leasing.venue_id.in_(ownerevents)).all()


        
        data = []
        for ever in ownereventResult:
            teve = {}

            teve['id'] = ever.id
            teve['venue_id'] = ever.venue_id
            teve['payment_id'] = ever.payment_id
            teve['first_name']=ever.first_name
            teve['last_name'] = ever.last_name
            teve['email_id'] = ever.email_id
            teve['contact'] = ever.contact
            teve['lease_from_date'] = str(ever.lease_from_date)
            teve['lease_end_date'] = str(ever.lease_end_date)



            data.append(teve)
        response.status = status.HTTP_200_OK
        response.data = json.dumps({"message": "Venue Reservations fetched successfully","data": data})

        return response


    
@app.route('/venue-reservation/<id>',methods=['POST','GET'])
#Fetches events booked by the user fir user or owner depending on the role
@token_required
def venue_reservation_id(user,id):

    print('fetch by id', user,id)
    response = Response(mimetype='application/json')
    if request.headers['role'] == ROLE.USER.name:
        eventResult = venue_leasing.query.filter_by(email_id = user.email_id , venue_id =  id).all()
        data = []
        for ever in eventResult:
            teve = {}

            teve['id'] = ever.id
            teve['venue_id'] = ever.venue_id
            teve['payment_id'] = ever.payment_id
            teve['first_name']=ever.first_name
            teve['last_name'] = ever.last_name
            teve['email_id'] = ever.email_id
            teve['contact'] = ever.contact
            teve['lease_from_date'] = str(ever.lease_from_date)
            teve['lease_end_date'] = str(ever.lease_end_date)



            data.append(teve)
        response.status = status.HTTP_200_OK
        response.data = json.dumps({"message": "Venue Reservations fetched successfully","data": data})

        return response


    else:
        eventResult = venues.query.filter_by(owner_id = user.user_id,id=id).all()
        ownerevents = []
        for res in eventResult:
            ownerevents.append(res.id)

        ownereventResult = venue_leasing.query.filter(venue_leasing.venue_id.in_(ownerevents)).all()


        
        data = []
        for ever in ownereventResult:
            teve = {}
            teve['id'] = ever.id
            teve['venue_id'] = ever.venue_id
            teve['payment_id'] = ever.payment_id
            teve['first_name']=ever.first_name
            teve['last_name'] = ever.last_name
            teve['email_id'] = ever.email_id
            teve['contact'] = ever.contact
            teve['lease_from_date'] = str(ever.lease_from_date)
            teve['lease_end_date'] = str(ever.lease_end_date)
            data.append(teve)

        response.status = status.HTTP_200_OK
        response.data = json.dumps({"message": "Venue Reservations fetched successfully","data": data})

        return response
    



@app.route('/venue/<id>/reservation/<rid>',methods=['PUT'])
#Fetches events booked by the user fir user or owner depending on the role
@token_required
def venue_reservation_id_rid(user,id,rid):

    response = Response(mimetype='application/json')
    
    
    if request.headers['role'] == ROLE.USER.name:
        
        ever = venue_leasing.query.filter_by(email_id = user.email_id , venue_id =  id,id=rid).one()

        

        req_first_name = request.form['first_name']
        req_last_name = request.form['last_name']
        req_contact = request.form['contact']
        req_lease_from_date = request.form['lease_from_date']
        req_lease_end_date = request.form['lease_end_date']


     

        ever.first_name= req_first_name
        ever.last_name = req_last_name
        ever.contact= req_contact
        ever.lease_from_date = req_lease_from_date
        ever.lease_end_date = req_lease_end_date


        db.session.commit()
        d = {}
        for column in ever.__table__.columns:
            d[column.name] = str(getattr(ever, column.name))

        response.status = status.HTTP_200_OK
        response.data = json.dumps({"message": "Venue Reservations updated successfully","data": d})

        return response


    else:
        eventResult = venues.query.filter_by(owner_id = user.user_id,id=id).all()
        ownerevents = []
        for res in eventResult:
            ownerevents.append(res.id)

        ever = venue_leasing.query.filter_by(venue_leasing.venue_id.in_(ownerevents),id=rid).all()
    
        req_first_name = request.form['first_name']
        req_last_name = request.form['last_name']
        req_contact = request.form['contact']
        req_lease_from_date = request.form['lease_from_date']
        req_lease_end_date = request.form['lease_end_date']


     

        ever.first_name= req_first_name
        ever.last_name = req_last_name
        ever.contact= req_contact
        ever.lease_from_date = req_lease_from_date
        ever.lease_end_date = req_lease_end_date

        db.session.commit()
        d = {}
        for column in ever.__table__.columns:
            d[column.name] = str(getattr(ever, column.name))
        response.status = status.HTTP_200_OK
        response.data = json.dumps({"message": "Venue Reservations updated successfully","data": d})

        return response
    

@app.route('/event/<id>/reservation/<rid>',methods=['PUT'])
#Fetches events booked by the user fir user or owner depending on the role
@token_required
def event_reservation_id_rid(user,id,rid):

    response = Response(mimetype='application/json')
    
    
    if request.headers['role'] == ROLE.USER.name:
        
        ever = event_participation.query.filter_by(email_id = user.email_id , event_id =  id,id=rid).one()

        

        req_first_name = request.form['first_name']
        req_last_name = request.form['last_name']
        req_contact = request.form['contact']

        ever.first_name= req_first_name
        ever.last_name = req_last_name
        ever.contact= req_contact


        db.session.commit()

        d = {}
        for column in ever.__table__.columns:
            d[column.name] = str(getattr(ever, column.name))

        response.status = status.HTTP_200_OK
        response.data = json.dumps({"message": "Event Reservations updated successfully","data": d})

        return response


    else:
        eventResult = events.query.filter_by(host_id = user.user_id,id=id).all()
        ownerevents = []
        for res in eventResult:
            ownerevents.append(res.id)

        ever = event_participation.query.filter_by(event_participation.event_id.in_(ownerevents),id=rid).all()
    
        req_first_name = request.form['first_name']
        req_last_name = request.form['last_name']
        req_contact = request.form['contact']

        ever.first_name= req_first_name
        ever.last_name = req_last_name
        ever.contact= req_contact
        db.session.commit()
        d = {}
        for column in ever.__table__.columns:
            d[column.name] = str(getattr(ever, column.name))

        response.status = status.HTTP_200_OK
        response.data = json.dumps({"message": "Event Reservations updated successfully","data": d})

        return response

#----------------------new stripe payment

@app.route('/pay', methods=['POST'])
def pay():
    email = request.json.get('email', None)
    amount = request.json.get('amount')
    print(request.json)
    if not email:
        return 'You need to send an Email!', 400

    intent = stripe.PaymentIntent.create(
        amount=int(amount)*10,
        currency='usd',
        receipt_email=email
    )

    return {"client_secret": intent['client_secret']}, 200


@app.route('/charge', methods=['POST'])
@token_required
def charge(user):

    print(request.form.to_dict())
    rid = str(request.form['id'])
    email = user.email_id
    amount = float(request.form['amount'])
    transction_id = str(uuid.uuid1()).strip()
    reference_id = rid
    

    #Payments Update    
    stsatus = Status.SUCCESS
    paid = payments( tid= transction_id,status=stsatus,rid=reference_id ,email_id=email,amount=str(amount))
    db.session.add(paid)
    db.session.commit()

    response = Response(mimetype='application/json')

    response.status = status.HTTP_200_OK

    response.data = json.dumps({
        'message': 'Payment Successful!',
        'transaction_id': transction_id
    })
    return response


@app.route('/venue-booking', methods=['POST'])  
@token_required
def venue_booking(user):
    #Venue leasing table in database Update
    response = Response(mimetype='application/json')

    try:
        payment_id = request.form['transaction_id']
        venue_id = request.form['venue_id']
        first_name = user.firstname
        last_name=user.lastname
        email_id = user.email_id
        contact = request.form['contact'] 

        venueleased = venue_leasing(venueid=venue_id,paymentid=payment_id,firstname=first_name,lastname=last_name,email=email_id,contact=contact)

        db.session.add(venueleased)


        venue = venues.query.filter_by(id = int(venue_id)).one()
        venue.status = "BOOKED"
        

        db.session.commit()
        msg = Message('Venue Booking Confirmation', sender = app.config['MAIL_USERNAME'], recipients = [email_id])
        msg.body ="Dear User,\n\n.Enjoy your time at our venue - "+ venue.name + ".\n\n We hope you have a great time. \n\nSincerely\nVenue Finder"
        
        mail.send(msg)
        Thread(target=send_email, args=(app, msg)).start()

        response.status = status.HTTP_200_OK

        response.data = json.dumps({
            'response_message':'Database updated booking successfull'
        })
        return response
    except:
        response.status = status.HTTP_400_BAD_REQUEST

        response.data = json.dumps({
            'response_message':'Database updated booking unsuccessfull are the details correct?'
        })
        return response



@app.route('/event-booking', methods=['POST'])  
@token_required
def event_booking(user):
    response = Response(mimetype='application/json')
    try:

        tid = request.form['transaction_id']
        event_id = request.form['event_id']
        payment_id = tid
        first_name = user.firstname
        last_name=user.lastname
        email_id = user.email_id
        contact =request.form['contact'] 
        tc = request.form['tickets_count']


        event_participated = event_participation(eventid=event_id,paymentid=payment_id,firstname=first_name,lastname=last_name,email=email_id,contact=contact,tc=tc)
        event = events.query.filter_by(id=int(event_id)).one()

        event.status = "BOOKED"

        db.session.add(event_participated)
        db.session.commit()

        msg = Message('Event Booking Confirmation', sender = app.config['MAIL_USERNAME'], recipients = [email_id])
        msg.body ="Dear User,\n\n.Enjoy your time at the "+ event.name + " event.\n\n We hope you have a great time. \n\nSincerely\nVenue Finder"
        
        mail.send(msg)
        Thread(target=send_email, args=(app, msg)).start()

        response.status = status.HTTP_200_OK

        response.data = json.dumps({
            'response_message':'Database updated booking successfull'
        })
        return response
    except:
        response.status = status.HTTP_400_BAD_REQUEST

        response.data = json.dumps({
            'response_message':'Database updated booking unsuccessfull are the details correct?'
        })
        return response

if __name__ == '__main__':
    app.run(debug = True)





