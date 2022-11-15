#
#
from fastapi import APIRouter
from .test import router as router_test
from .user import router as router_user

router = APIRouter()

router.include_router(router_test, prefix='/test', tags=["test"])
router.include_router(router_user, prefix='/user', tags=["user"])
