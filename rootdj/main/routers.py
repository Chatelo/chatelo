# from rest_framework import routers
from rest_framework_nested import routers

from main.user.viewsets import UserViewSet
from main.auth.viewsets import RegisterViewSet, LoginViewSet, RefreshViewSet
from main.post.viewsets import PostViewSet
from main.comment.viewsets import CommentViewSet

app_name = 'main'
router = routers.SimpleRouter()

router.register(r'user', UserViewSet, basename='user')

router.register(r'auth/register', RegisterViewSet, basename='auth-register')
router.register(r'auth/login', LoginViewSet, basename='auth-login')
router.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')


router.register(r'post', PostViewSet, basename='post')

posts_router = routers.NestedSimpleRouter(router, r'post', lookup='post')
posts_router.register(r'comment', CommentViewSet, basename='post-comment')

urlpatterns = [
    *router.urls,
    *posts_router.urls,
]