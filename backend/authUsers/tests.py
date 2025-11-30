from django.test import TestCase, Client
from django.urls import reverse
import jwt
from django.conf import settings
from .token_utils import decode_auth_token, TokenDecodeError

class AuthUsersTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.url_role = reverse("get_role")
        self.payload = {"sub": "user1", "role": "admin"}
        self.token = jwt.encode(self.payload, settings.AUTHCENTER_JWT_SECRET, algorithm="HS256")

    def test_decode_auth_token_valid(self):
        decoded = decode_auth_token(self.token)
        self.assertEqual(decoded.get("role"), "admin")

    def test_decode_auth_token_invalid(self):
        with self.assertRaises(TokenDecodeError):
            decode_auth_token("token_invalido")

    def test_get_role_with_valid_header(self):
        resp = self.client.get(self.url_role, HTTP_AUTHORIZATION=f"Bearer {self.token}")
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.json().get("role"), "admin")

    def test_get_role_without_header(self):
        resp = self.client.get(self.url_role)
        self.assertEqual(resp.status_code, 200)
        self.assertIsNone(resp.json().get("role"))
