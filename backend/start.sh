#!/bin/bash
# Start script for Render/Railway deployment
uvicorn server:app --host 0.0.0.0 --port ${PORT:-8000}

