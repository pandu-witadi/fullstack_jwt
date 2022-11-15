#
#
from fastapi import APIRouter, Request
from fastapi import Body
from typing import Dict

from config.default import CF
from model.user import User
from util.security import password_hashing, password_verify, jwt_create


router = APIRouter()


@router.post('/register')
async def register(req_user: User):
    # check if email already registered
    user = await User.find_one(User.email == req_user.email)
    if user is not None:
        return { "error": "email already register" }

    # create new user
    user = User(
        email =  req_user.email,
        password = password_hashing(req_user.password),
        name = req_user.name
    )
    await user.create()
    return user


@router.post('/login')
async def login_user(payload: Dict = Body(...)):
    req_user = User(
        email = payload.get('email', ''),
        password = payload.get('password', ''),
        name = payload.get('name', '')
    )
    # check if user registered
    user = await User.find_one(User.email == req_user.email)
    if user is None:
        return { "error": "user not registered" }

    if not password_verify(req_user.password, user.password):
        return { "error": "password not match" }

    print(type(user))
    return {
        "accessToken": jwt_create(user),
        **(dict(user))
    }
