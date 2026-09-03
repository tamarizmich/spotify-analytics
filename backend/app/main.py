from fastapi import FastAPI

from backend.app.routes.auth import router as auth_router


app = FastAPI(
    title="K-Pop Music Intelligence",
    description="Music analytics platform powered by Spotify",
    version="1.0.0",
)


app.include_router(auth_router)


@app.get("/")
async def root():
    return {
        "message": "K-Pop Music Intelligence API",
        "status": "running",
    }