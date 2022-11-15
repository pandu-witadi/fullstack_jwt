#
#
from passlib.context import CryptContext
import jwt
import datetime
from pytz import timezone
from fastapi import Header, HTTPException

from model.user import User
from config.default import CF


password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def password_hashing(password: str) -> str:
    return password_context.hash(password)


def password_verify(password: str, hashed_password: str) -> bool:
    return password_context.verify(password, hashed_password)


def jwt_create(user: User) -> str:
    payload = {
        "email": user.email,
        "name": user.name,
        "exp": datetime.datetime.now(tz=datetime.timezone.utc) + datetime.timedelta(seconds=CF.JWT_EXPIRE_SECONDS)
    }
    return jwt.encode(payload, CF.JWT_SECRET_KEY, algorithm=CF.ALGORITHM)


def jwt_verify(token):
    return jwt.decode(token, CF.JWT_SECRET_KEY, algorithms=CF.ALGORITHM)


# async def http_jwt_verify(accessToken: str = Header(None)):
#     print('accessToken', accessToken)
#     try:
#         decoded = jwt_verify(accessToken)
#         if accessToken is None:
#             raise HTTPException(status_code=200, detail="X-Token header invalid")
#         return {
#             "accessToken": accessToken,
#             "decoded": decoded,
#             "time": datetime.now(timezone.utc).timestamp(),
#             "message": "this is secure route"
#         }
#     except jwt.ExpiredSignatureError:
#         # Signature has expired
#         return { "error": "ExpiredSignatureError" }
#     except:
#         return { "error": "Unauthorized Access" }
