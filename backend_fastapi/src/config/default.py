#
#
from typing import List

from decouple import config
from pydantic import AnyHttpUrl, BaseSettings


class Settings(BaseSettings):
    appName: str = config('appName', default="FAM_boiler_plate", cast=str)
    HOST: str = config('HOST', default="0.0.0.0", cast=str)
    PORT: str = config('PORT', default=5152, cast=int)
    API_PATH: str = "/api"
    # BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = [
        # "http://localhost:3000"
    # ]

    DEBUG_MODE: str = config("DEBUG_MODE", default=False, cast=bool)


    # Database
    MONGO_CONNECTION: str = config("MONGO_CONNECTION", default="mongodb://127.0.0.1:27017/", cast=str)
    MONGO_DB: str = config("MONGO_DB", default="fs_jwt_fastapi", cast=str)

    # jwt parameters
    JWT_SECRET_KEY: str = config("JWT_SECRET_KEY", cast=str)
    JWT_REFRESH_SECRET_KEY: str = config("JWT_REFRESH_SECRET_KEY", cast=str)
    ALGORITHM = "HS256"
    JWT_EXPIRE_SECONDS: int = 60 * 4
    JWT_REFRESH_TOKEN_EXPIRE_SECONDS: int = 60 * 60 * 24 * 7   # 7 days

    class Config:
        case_sensitive = True

CF = Settings()
