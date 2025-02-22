from pydantic import BaseModel


class UserUID(BaseModel):
    uid: str
    claims: dict