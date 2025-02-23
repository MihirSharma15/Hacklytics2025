

import json
from typing import Annotated, List
from fastapi import APIRouter, Depends, status

from app.schemas.users_schema import Demographics, Plan, UserUID
from app.services.auth_service import get_current_user
from app.services.firestore import get_active_plan, get_rec_plans, update_user_plans, upsert_demographics
from app.services.model import ask_chatgpt


user_router = APIRouter(
    prefix="/users",
    tags=["users"]
)

@user_router.post("/create_questions", status_code=status.HTTP_201_CREATED)
def send_questions_route(current_user: Annotated[UserUID, Depends(get_current_user)], demographics: Demographics):
    """Sends a list of questions to the current user. Also TODO starts the model part to fill in the user's information"""
    upsert_demographics(current_user.uid, demographics)
    response = ask_chatgpt("""
                                    Look at this patient's demographics.
                                    Based on your RAG domain knowledge, give me a plan to suits the patient best. %s""" % demographics.model_json_schema())
    parsed_data = json.loads(response)
    recommended_plans = [Plan(**plan_dict) for plan_dict in parsed_data['plan_list']]
    update_user_plans(current_user.uid, recommended_plans)
@user_router.get("/get_active_plan", status_code=status.HTTP_200_OK, response_model=Plan)
def get_active_plan_route(current_user: Annotated[UserUID, Depends(get_current_user)]) -> Plan:
    """active = DEFAULT. Returns the active plan for the current
    user."""
    return get_active_plan(current_user.uid)

@user_router.get("/get_all_plans", status_code=status.HTTP_200_OK, response_model=list[Plan])
def get_all_plans_route(current_user: Annotated[UserUID, Depends(get_current_user)]):
    """Returns all plans for the current user."""
    return get_rec_plans(current_user.uid)

