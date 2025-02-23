from typing import Annotated
from urllib import response
from fastapi import Depends, APIRouter, Security, status
from fastapi.security import HTTPBearer

from app.schemas.users_schema import Demographics, UserUID
from app.services.auth_service import get_current_user
from app.services.firestore import get_user_from_firestore, upsert_demographics

auth_router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

@auth_router.get("/me", status_code=status.HTTP_200_OK)
def read_current_user_route(current_user: Annotated[UserUID, Depends(get_current_user)]):
    """Returns information about the current user given a JWT token."""
    print(current_user)
    return get_user_from_firestore(current_user.uid)
    

