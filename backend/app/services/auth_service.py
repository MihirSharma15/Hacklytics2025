# external
from fastapi import Request
import firebase_admin
from firebase_admin import auth, credentials
from firebase_admin import auth as firebase_auth

# internal
from app.schemas.users_schema import UserUID

cred = credentials.Certificate("env/firebaseServiceKey.json")
firebase_admin.initialize_app(cred)

async def get_current_user(request: Request) -> UserUID:
    """gets the current user based on the attached JWT sent over"""
    auth_header = request.headers.get("Authorization")

    if not auth_header:
        raise Exception("There is no Auth Header")
    
    try:
        scheme, token = auth_header.split(" ")

        if scheme.lower() != "bearer":
            raise Exception("Invalid Auth Header")
        
    except:
        raise Exception("Invalid Auth Header")
    
    try:
        decoded_token = firebase_auth.verify_id_token(token)
        uid = decoded_token.get("uid")
        return UserUID(uid=uid, claims=decoded_token)
    
    except Exception as e:
        raise Exception(f"Error: {str(e)}")
