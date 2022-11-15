#
#
from fastapi import APIRouter, Header, Depends, Request, Response
import time
import jwt
from random import random
from datetime import datetime,timezone

from config.default import CF
from util.security import jwt_verify


router = APIRouter()

@router.get('/')
async def test():
    return {
        "appName": CF.appName,
        "port": CF.PORT,
        "host": CF.HOST,
        "api_path": CF.API_PATH,
        "random": random(),
        "time": time.strftime("%a, %Y - %m - %d  %H:%M:%S")
    }



@router.get('/secure')
async def test_secure( accessToken: str = Header(None) ):
    try:
        decoded = jwt_verify(accessToken)
        return {
            "accessToken": accessToken,
            "decoded": decoded,
            "time": datetime.now(timezone.utc).timestamp(),
            "message": "this is secure route"
        }
    except jwt.ExpiredSignatureError:
        # Signature has expired
        return { "error": "ExpiredSignatureError" }
    except:
        return { "error": "Unauthorized Access" }


@router.get("/test1")
async def test1(req: Request, res: Response):
    accessToken = req.headers.get('accessToken')
    try:
        print(accessToken)
        decoded = secure(accessToken)

        res.headers["x-access-token"] = accessToken
        return {"x-access-token": accessToken}
    except:
        return "Unauthorized Access!"


async def verify_token(accessToken: str = Header()):
    if x_token != "fake-super-secret-token":
        raise HTTPException(status_code=400, detail="X-Token header invalid")
