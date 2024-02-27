from django.test import TestCase, Client
from django.urls import reverse, resolve
import json

class TestViews(TestCase):

    def setUp(self):
        self.client = Client()
        self.get_index = reverse('home:index')

        
    def test_home_index_GET(self):
        response = self.client.get(self.get_index)
        print(response)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'index.html')