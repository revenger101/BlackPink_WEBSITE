#!/bin/bash
python -m grpc_tools.protoc -I. --python_out=../user-service --grpc_python_out=../user-service user.proto
python -m grpc_tools.protoc -I. --python_out=../basket-service --grpc_python_out=../basket-service basket.proto