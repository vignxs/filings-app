from fastapi import FastAPI, HTTPException
from fastapi import Request, Response
from fastapi.middleware.cors import CORSMiddleware
from src.routers.api import router as router_api
from src.database import engine, SessionLocal, Base
from src.config import API_PREFIX #ALLOWED_HOSTS
from src.routers.handler.http_error import http_error_handler
import uvicorn

def get_application() -> FastAPI:
    ''' Configure, start and return the application '''

    ## Start FastApi App
    application = FastAPI()

    ## Generate database tables
    Base.metadata.create_all(bind=engine)

    ## Mapping api routes
    application.include_router(router_api, prefix=API_PREFIX)

    ## Add exception handlers
    application.add_exception_handler(HTTPException, http_error_handler)

    ## Allow cors
    application.add_middleware(
        CORSMiddleware,
        allow_origins= ["*"], # ALLOWED_HOSTS or
        # allow_origins=['http://localhost:3000', "https://filings-app.vercel.app/"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # ## Example of admin route
    # application.include_router(
    #     admin.router,
    #     prefix="/admin",
    #     tags=["admin"],
    #     dependencies=[Depends(get_token_header)],
    #     responses={418: {"description": "I'm a teapot"}},
    # )

    #to get the routes
    # url_list = [{"path": route.path, "name": route.name} for route in application.routes]
    # print(len(url_list))

    return application

    # Using FastAPI instance

app = get_application()

if __name__  == "__main__":
    uvicorn.run(
            app,
            host="0.0.0.0",
            port=5000,
            ssl_keyfile="./key.pem",
            ssl_certfile="./certificate.pem",
            )
