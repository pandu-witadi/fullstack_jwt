#
#
import uvicorn
from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from fastapi.middleware.cors import CORSMiddleware

from config.default import CF
from api.index import router
from model.user import User


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    client = AsyncIOMotorClient(CF.MONGO_CONNECTION)
    app.mongodb_client = client
    app.mongodb = app.mongodb_client[CF.MONGO_DB]
    await init_beanie(
        database = app.mongodb,
        document_models = [
            User
        ]
    )

@app.on_event("shutdown")
async def shutdown_event():
    app.mongodb_client.close()

# --- route
app.include_router(router, prefix=CF.API_PATH)


# --- run app
if __name__ == '__main__':
    uvicorn.run(
        "index:app",
        port = int(CF.PORT),
        host = CF.HOST,
        reload = CF.DEBUG_MODE
    )
