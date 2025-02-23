# firestore.py

import firebase_admin
from firebase_admin import credentials, firestore
from typing import Optional, List
from pydantic import ValidationError

from app.schemas.users_schema import Budget, Demographics, Plan, User

# NOTE: In your real project, replace 'path/to/your/serviceAccountKey.json'
# with the actual path to your Firebase service account key JSON file.
# Make sure this file is not committed to version control.
if not firebase_admin._apps:
    cred = credentials.Certificate("env/firebaseServiceKey.json")
    firebase_admin.initialize_app(cred)

db = firestore.client()

def get_user_from_firestore(uid: str) -> Optional[User]:
    """
    Fetch a user document from Firestore by the given uid.
    
    Returns:
        User object if found, else None.
    """
    doc_ref = db.collection("users").document(uid)
    doc_snapshot = doc_ref.get()
    if not doc_snapshot.exists:
        return None

    data = doc_snapshot.to_dict()

    try:
        user = User.model_validate(data)
    except ValidationError as e:
        print(f"Error parsing user data for uid {uid}: {e}")
        return None

    return user


def upsert_demographics(uid: str, demographics: Demographics) -> None:
    """
    Upsert (update or create) the Demographics field for a given user in Firestore.
    If the user document doesn't exist, it will be created with demographic_questions.
    If it does exist, only the demographic_questions field will be updated/merged.
    """
    doc_ref = db.collection("users").document(uid)
    doc_ref.set(
        {"demographic_questions": demographics.model_dump()},
        merge=True  # Ensures we don't overwrite other fields accidentally
    )


def get_rec_plans(uid: str) -> Optional[List[Plan]]:
    """
    Retrieve a user's recommended plans from Firestore.
    
    Returns:
        A list of Plan objects if the user and rec_plans exist, else None.
    """
    user = get_user_from_firestore(uid)
    if user:
        return user.rec_plans
    return None


def get_active_plan(uid: str) -> Optional[Plan]:
    """
    Retrieve a user's active plan from Firestore.
    
    Returns:
        A Plan object if the user exists, else None.
    """
    user = get_user_from_firestore(uid)
    if user:
        return user.active_plan
    return None

def get_budget_from_plan(uid: str) -> Optional[Budget]:
    """
    Retrieve a user's budget from Firestore.
    
    Returns:
        A Plan object if the user exists, else None.
    """
    user = get_user_from_firestore(uid)
    if user:
        return user.active_plan.budget
    return None

