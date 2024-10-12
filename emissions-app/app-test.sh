#!/bin/bash
echo "----------- Running frontend tests"
cd ./frontend
npm run test
cd -
cd backend
echo "----------- Running backend tests"
pytest -v
cd -
