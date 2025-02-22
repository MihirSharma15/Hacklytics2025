from typing import Annotated
from fastapi import Depends, APIRouter

from app.schemas.users_schema import UserUID
from app.services.auth_service import get_current_user

auth_router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

@auth_router.post("/me")
def read_current_user_route(current_user = Annotated(UserUID, Depends(get_current_user))):
    """returns information about the current user given a JWT token."""
    return current_user