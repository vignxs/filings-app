from typing import List
from starlette.config import Config
from starlette.datastructures import CommaSeparatedStrings, Secret


###
# Properties configurations
###

API_PREFIX = "/api"

JWT_TOKEN_PREFIX = "auth"

# config = Config(".env")

ROUTE_PREFIX_V1 = "/v1"

# ALLOWED_HOSTS: List[str] = (
#     "ALLOWED_HOSTS",
#     cast=CommaSeparatedStrings,
#     default="",
# )