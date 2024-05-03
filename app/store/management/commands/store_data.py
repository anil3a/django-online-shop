from django.core.management.base import BaseCommand
from store.models import Category, Product


class Command(BaseCommand):

    name = 'store_data'
    help = 'Store data seeds'

    def add_arguments(self, parser):
        parser.add_argument('--action', nargs='?', type=str, help='To action. Default is import')

    def handle(self, *args, **options):
        re_import = options['action']
        if re_import is not None and re_import == 'deleteold':
            self.delete_product_and_category()
        self.insert_category_and_product()

    def delete_product_and_category(self):
        Product.objects.all().delete()
        Category.objects.all().delete()

    def insert_category_and_product(self):
        category_data = [
            {
                'name': 'Whimsical Wares',
                'description': 'Unique and playful items to add a touch of whimsy to your life.'
            },
            {
                'name': 'Quirky Quilts',
                'description': 'Quirky and colorful quilts to brighten up any room.'
            },
            {
                'name': 'Fantastic Flannels',
                'description': 'Soft and cozy flannel products for those chilly days.'
            },
            {
                'name': 'Marvelous Mugs',
                'description': 'Fun and creative mugs to enjoy your favorite beverages.'
            },
            {
                'name': 'Silly Socks',
                'description': 'Colorful and silly socks to express your personality.'
            },
            {
                'name': 'Enchanted Elixirs',
                'description': 'Magical elixirs to add a sprinkle of enchantment to your day.'
            },
            {
                'name': 'Wonderful Widgets',
                'description': 'Innovative and useful gadgets to simplify your life.'
            },
            {
                'name': 'Magical Merchandise',
                'description': 'Magical merchandise inspired by fairy tales and fantasy worlds.'
            },
            {
                'name': 'Jolly Journals',
                'description': 'Cheerful and inspiring journals to capture your thoughts and dreams.'
            },
            {
                'name': 'Funky Furniture',
                'description': 'Funky and eclectic furniture pieces to add flair to your home.'
            }
        ]

        cat_for_prods = []

        for data in category_data:
            name, description = data['name'], data['description']

            category, created = Category.objects.get_or_create(
                name=name,
                defaults={'description': description}
            )

            if created:
                print(f"Category '{name}' created successfully.")
            else:
                print(f"Category '{name}' already exists.")
            cat_for_prods.append(category)

        product_data = [
            {
                'name': 'Giggle-Inducing Goggles',
                'description': 'See the world through a lens of laughter with these colorful goggles. Guaranteed to '
                               'bring a smile to your face!',
                'cost': 10.00, 'price': 15.00, 'category': None, 'quantity': 10, 'sku': 'PRODGIG',
            },
            {
                'name': 'Hilarious Hedgehog Plushie',
                'description': 'Cuddle up with this adorable hedgehog plushie. Its soft quills and silly expression '
                               'will make you giggle with delight.',
                'cost': 12.50, 'price': 20.00, 'category': None, 'quantity': 10, 'sku': 'PRODHHP',
            },
            {
                'name': 'Rainbow-Striped Socks',
                'description': 'Add a pop of color to your outfit with these vibrant rainbow-striped socks. Perfect '
                               'for adding a touch of whimsy to your day!',
                'cost': 5.00, 'price': 10.00, 'category': None, 'quantity': 10, 'sku': 'PRODRSS',
            },
            {
                'name': 'Unicorn Tears Elixir',
                'description': 'Harness the magic of unicorns with this mystical elixir. Each drop is said to contain '
                               'the power of laughter and joy.',
                'cost': 8.00, 'price': 15.00, 'category': None, 'quantity': 10, 'sku': 'PRODUTE',
            },
            {
                'name': 'Dancing Dinosaur Mug',
                'description': 'Start your day with a smile with this playful dinosaur mug. Watch as the dinosaurs '
                               'dance across the mug when filled with hot liquid!',
                'cost': 7.50, 'price': 12.00, 'category': None, 'quantity': 10, 'sku': 'PRODDDM',
            },
            {
                'name': 'Singing Sloth Journal',
                'description': 'Let your thoughts soar with this singing sloth journal. Its cheerful tunes will '
                               'inspire creativity and joy with every page turn.',
                'cost': 15.00, 'price': 25.00, 'category': None, 'quantity': 10, 'sku': 'PRODSSJ',
            }
        ]

        # Use product index to get unique category
        for i, data in enumerate(product_data):
            name = data['name']
            description = data['description']
            cost = data['cost']
            price = data['price']
            quantity = data['quantity']
            prod_category = cat_for_prods[i]
            sku = data['sku']

            product, created = Product.objects.get_or_create(
                name=name,
                sku=sku,
                defaults={
                    'description': description,
                    'cost': cost,
                    'price': price,
                    'quantity': quantity,
                }
            )

            if created:
                # Add category to product
                product.categories.add(prod_category)

            # Print a message based on whether the product was created or not
            if created:
                print(f"Product '{name}' created successfully.")
            else:
                print(f"Product '{name}' already exists.")

        self.stdout.write(self.style.SUCCESS('End of category and product data entry!'))
