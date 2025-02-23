from typing import Any, Dict, List, Literal, Optional

from pydantic import BaseModel, Field

class UserUID(BaseModel):
    uid: Optional[str]
    claims: Optional[dict]

class Budget(BaseModel):
    yearly_cost: float 

    @property
    def monthly_cost(self):
        return self.yearly_cost / 12
class Plan(BaseModel):
    name: str
    description: str
    budget: Budget

class PlanList(BaseModel):
    plan_list: list[Plan]
    
class Demographics(BaseModel):
    employer: Optional[str]
    jobTitle: Optional[str]
    annualIncome: Optional[str]
    name: Optional[str]
    dateOfBirth: Optional[str]
    gender: Optional[str]
    state: Optional[str]
    familySize: Optional[int]

class User(BaseModel):
    uid: str = Field(default="")
    name: str = Field(default="")
    active_plan: Plan = Field(default="")
    rec_plans: List[Plan] = Field(default_factory=list)
    demographic_questions: Demographics = Field(default_factory=dict)