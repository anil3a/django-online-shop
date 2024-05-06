from django.test import TestCase

from store.models import Category


class CategoryCreateTests(TestCase):

    @classmethod
    def setUpTestData(cls):
        # Create test data for the Category model
        Category.objects.create(name='Test Category 1', description='Description for Test Category 1')
        Category.objects.create(name='Test Category 2', description='Description for Test Category 2')

    def test_category_count(self):
        # Test the count of categories
        categories_count = Category.objects.count()
        self.assertEqual(categories_count, 2)

    def test_category_names(self):
        # Test the names of categories
        category1 = Category.objects.get(name='Test Category 1')
        category2 = Category.objects.get(name='Test Category 2')
        self.assertEqual(category1.name, 'Test Category 1')
        self.assertEqual(category2.name, 'Test Category 2')

    def test_category_descriptions(self):
        # Test the descriptions of categories
        category1 = Category.objects.get(name='Test Category 1')
        category2 = Category.objects.get(name='Test Category 2')
        self.assertEqual(category1.description, 'Description for Test Category 1')
        self.assertEqual(category2.description, 'Description for Test Category 2')

