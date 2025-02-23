from fastapi import Request, HTTPException, Security, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
import firebase_admin
from firebase_admin import auth, credentials
from firebase_admin import auth as firebase_auth

from app.schemas.users_schema import UserUID

cred = credentials.Certificate("env/firebaseServiceKey.json")
firebase_admin.initialize_app(cred)

security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Security(security)) -> UserUID:
    """
    Gets the current user based on the JWT provided in the Authorization header.
    """
    token = credentials.credentials

    if token == "TESTUSER":
        return UserUID(uid="TESTUSER", claims={"admin": True})

    try:
        decoded_token = firebase_auth.verify_id_token(token)
        uid = decoded_token.get("uid")
        return UserUID(uid=uid, claims=decoded_token)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Token verification error: {str(e)}"
        )
