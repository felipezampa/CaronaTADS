from django.urls import path
from django.contrib.auth import views as auth_views
from rest_framework_simplejwt.views import TokenRefreshView

from routes.views.auth_views import LoggedUserView, LoginView, LogoutView
from routes.views.place_views import PlaceListCreateView
from routes.views.route_views import RouteDetailView, RouteListCreateView
from routes.views.user_views import GetUsersByRouteView, UserListCreateView


urlpatterns = [
    path('login', LoginView.as_view(), name='login'),
    path('logout', LogoutView.as_view(), name='logout'),
    path('logged', LoggedUserView.as_view(), name='logged'),

    path('users', UserListCreateView.as_view(), name='gen_user'),
    path('users/by_route/<int:route_id>', GetUsersByRouteView.as_view(), name='get_users_by_route'),
    path('places', PlaceListCreateView.as_view(), name='gen_place'),

    path('routes', RouteListCreateView.as_view(), name='gen_route'),
    path('routes/<int:pk>', RouteDetailView.as_view(), name='spe_route')
]
