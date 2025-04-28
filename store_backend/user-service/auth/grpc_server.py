import grpc
from concurrent import futures
import jwt
from django.contrib.auth.hashers import make_password, check_password
from auth.models import User, Profile
import user_pb2
import user_pb2_grpc

class UserService(user_pb2_grpc.UserServiceServicer):
    def SignUp(self, request, context):
        if User.objects.filter(username=request.username).exists():
            return user_pb2.SignUpResponse(message="User already exists", token="")
        user = User(
            username=request.username,
            password=make_password(request.password),
            email=request.email
        )
        user.save()
        token = jwt.encode({'user_id': user.id}, 'your-secret-key', algorithm='HS256')
        return user_pb2.SignUpResponse(message="User registered successfully", token=token)

    def SignIn(self, request, context):
        user = User.objects.filter(username=request.username).first()
        if user and check_password(request.password, user.password):
            token = jwt.encode({'user_id': user.id}, 'your-secret-key', algorithm='HS256')
            return user_pb2.SignInResponse(token=token, message="Login successful")
        return user_pb2.SignInResponse(token="", message="Invalid credentials")

    def CreateUser(self, request, context):
        user = User(
            username=request.username,
            password=make_password(request.password),
            email=request.email
        )
        user.save()
        return user_pb2.UserResponse(
            id=user.id,
            username=user.username,
            email=user.email,
            message="User created successfully"
        )

    def GetUser(self, request, context):
        user = User.objects.filter(id=request.id).first()
        if not user:
            return user_pb2.UserResponse(message="User not found")
        return user_pb2.UserResponse(
            id=user.id,
            username=user.username,
            email=user.email,
            message="User retrieved successfully"
        )

    def UpdateUser(self, request, context):
        user = User.objects.filter(id=request.id).first()
        if not user:
            return user_pb2.UserResponse(message="User not found")
        user.username = request.username
        user.password = make_password(request.password)
        user.email = request.email
        user.save()
        return user_pb2.UserResponse(
            id=user.id,
            username=user.username,
            email=user.email,
            message="User updated successfully"
        )

    def DeleteUser(self, request, context):
        user = User.objects.filter(id=request.id).first()
        if not user:
            return user_pb2.DeleteResponse(message="User not found")
        user.delete()
        return user_pb2.DeleteResponse(message="User deleted successfully")

    def CreateProfile(self, request, context):
        user = User.objects.filter(id=request.user_id).first()
        if not user:
            return user_pb2.ProfileResponse(message="User not found")
        profile = Profile(
            user=user,
            first_name=request.first_name,
            last_name=request.last_name,
            address=request.address
        )
        profile.save()
        return user_pb2.ProfileResponse(
            id=profile.id,
            user_id=user.id,
            first_name=profile.first_name,
            last_name=profile.last_name,
            address=profile.address,
            message="Profile created successfully"
        )

    def GetProfile(self, request, context):
        profile = Profile.objects.filter(user_id=request.user_id).first()
        if not profile:
            return user_pb2.ProfileResponse(message="Profile not found")
        return user_pb2.ProfileResponse(
            id=profile.id,
            user_id=profile.user.id,
            first_name=profile.first_name,
            last_name=profile.last_name,
            address=profile.address,
            message="Profile retrieved successfully"
        )

    def UpdateProfile(self, request, context):
        profile = Profile.objects.filter(id=request.id).first()
        if not profile:
            return user_pb2.ProfileResponse(message="Profile not found")
        profile.first_name = request.first_name
        profile.last_name = request.last_name
        profile.address = request.address
        profile.save()
        return user_pb2.ProfileResponse(
            id=profile.id,
            user_id=profile.user.id,
            first_name=profile.first_name,
            last_name=profile.last_name,
            address=profile.address,
            message="Profile updated successfully"
        )

    def DeleteProfile(self, request, context):
        profile = Profile.objects.filter(user_id=request.user_id).first()
        if not profile:
            return user_pb2.DeleteResponse(message="Profile not found")
        profile.delete()
        return user_pb2.DeleteResponse(message="Profile deleted successfully")

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    user_pb2_grpc.add_UserServiceServicer_to_server(UserService(), server)
    server.add_insecure_port('[::]:50051')
    print("User Service running on port 50051...")
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    serve()