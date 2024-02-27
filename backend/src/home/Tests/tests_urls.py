from django.test import SimpleTestCase
from django.urls import reverse, resolve
from ..views import index
from unittest import TestCase as a

class TestUrls(SimpleTestCase):
    def test_index_url_is_resolved(self):
        url = reverse('home:index')
        print(resolve(url))
        self.assertEqual(resolve(url).func, index)
