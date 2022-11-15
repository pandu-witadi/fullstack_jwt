#
#
import uuid
# from bson.objectid import ObjectId
from beanie import Document
from pydantic import Field


class User(Document):
    # id: ObjectId = Field(alias='_id')
    email: str = Field(unique=True)
    password: str = Field(...)     # cannot be empty
    name: str = Field(...)

    class Collection:
        name = "user"

    class Config:
        arbitrary_types_allowed = True
        # allow_population_by_field_name =  True # if id field above set have alias
        schema_extra = {
            "example" : {
                "email": "root@example.com",
                "password": "123456",
                "name": "root"
            }
        }
