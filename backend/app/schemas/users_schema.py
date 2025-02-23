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
    
class Demographics(BaseModel):
    age: int
    gender: Literal["MALE", "FEMALE", "OTHER"]
    family_size: int 
    yearly_income: float
    employment: Literal["STUDENT", "EMPLOYED", "UNEMPLOYED"]
    employer_offers_insurance: bool
    state: str
    chronic_conditions: List[str]
    num_er_trips: int
    isDiabetic: bool 
    num_hospital_trips: int 
    isSmoker: bool
    isHardDrugs: bool
    bmi: float
    medicare_eligible: bool
    medicaid_eligible: bool
    any_prescriptions: List[str]

class User(BaseModel):
    uid: str = Field(default="")
    name: str = Field(default="")
    active_plan: Plan = Field(default="")
    rec_plans: List[Plan] = Field(default_factory=list)
    demographic_questions: Demographics = Field(default_factory=dict)