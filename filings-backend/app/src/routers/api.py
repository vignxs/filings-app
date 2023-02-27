from fastapi import APIRouter
from ..config import ROUTE_PREFIX_V1
from . import auth, request , gst , gst_rgst, tax_rgst, pan_rgst

router = APIRouter()

def include_api_routes():
    ''' Include to router all api rest routes with version prefix '''
    router.include_router(auth.router)
    router.include_router(request.router, prefix=ROUTE_PREFIX_V1)
    router.include_router(gst.router, prefix=ROUTE_PREFIX_V1)
    router.include_router(gst_rgst.router, prefix=ROUTE_PREFIX_V1)
    router.include_router(tax_rgst.router, prefix=ROUTE_PREFIX_V1)
    router.include_router(pan_rgst.router, prefix=ROUTE_PREFIX_V1)
    # router.include_router(buyers.router, prefix=ROUTE_PREFIX_V1)
    # router.include_router(sales.router, prefix=ROUTE_PREFIX_V1)

include_api_routes()