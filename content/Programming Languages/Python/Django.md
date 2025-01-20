The Django documentation which is the best source for learning and reading about it.

[Django](https://docs.djangoproject.com/en)

Django has built-in support for GIS data. You can find more about it here (for Django 4.1):

[Django](https://docs.djangoproject.com/en/5.0/ref/contrib/gis/)

Writing REST API in a Django application using Django REST Framework is awesome, following links are the important concepts of the DRF (Django REST Framework):

[Home - Django REST framework](https://www.django-rest-framework.org/)

-   [Serializes](https://www.django-rest-framework.org/api-guide/serializers/)
-   [Fields](https://www.django-rest-framework.org/api-guide/fields)
-   [Parsers](https://www.django-rest-framework.org/api-guide/parsers/)
-   [Views](https://www.django-rest-framework.org/api-guide/views/)
-   [Viewsets](https://www.django-rest-framework.org/api-guide/viewsets/)
-   [Generic Views](https://www.django-rest-framework.org/api-guide/generic-views/)
-   [Filtering](https://www.django-rest-framework.org/api-guide/filtering/)

Sometimes it is better in DRF to read its code because its documentation is not complete:

-   [@encode/django-rest-framework](https://github.com/encode/django-rest-framework)

Semi-automatic swagger documentation for the REST APIs:

-   [@tfranzel/drf-spectacula](https://github.com/tfranzel/drf-spectacular)

For doing upgrade, you can use:

-   [@adamchainz/django-upgrade](https://github.com/adamchainz/django-upgrade)

## Database Optimization

Django’s database layer provides various ways to help developers get the most out of their databases.
As general programming practice, this goes without saying. Find out what queries you are doing and what they are
costing you. Use `QuerySet.explain()` to understand how specific `QuerySet`s are executed by your database.

To avoid performance problems, it is important to understand:

-   That `QuerySet`s are lazy.
-   When they are evaluated.
-   How the data is held in memory.

Use `iterator()`, When you have a lot of objects, the caching behavior of the `QuerySet` can cause a large amount of memory to be used. In this case, `iterator()` may help.

## Dataclasses

Using data-classes to define request and response in Django REST Framework. There are cases in which your request or
response is not a model, in those cases you can define them as a dataclass using the following library.

-   [@oxan/djangorestframework-dataclasses](https://github.com/oxan/djangorestframework-dataclasses)

Using the library instead of 😔:

```python
class Comment:
    def __init__(self, email, content, created=None):
        self.email = email
        self.content = content
        self.created = created or datetime.now()

class CommentSerializer(serializers.Serializer):
    email = serializers.EmailField()
    content = serializers.CharField(max_length=200)
    created = serializers.DateTimeField()
```

you can write 😍:

```python
@dataclass
class Person:
    name: str
    email: str
    alive: bool
    gender: typing.Literal['male', 'female']
    birth_date: typing.Optional[datetime.date]
    phone: typing.List[str]
    movie_ratings: typing.Dict[str, int]

class PersonSerializer(DataclassSerializer):
    class Meta:
        dataclass = Person
```

## Django Filters

Having reusable filters for models in Django REST Framework with Django-filter. These filters help you to write
viewsets easier and give client developers vast choices in getting the data.

-   [Django filter documentation](https://django-filter.readthedocs.io/en/main/)

## `inspectdb`

There are cases in which you already have the database and want to describe it using Django models:

```bash
python manage.py inspectdb
```

## Models

A model is the single, definitive source of information about your data. It contains the essential fields and behaviors of the data you’re storing. Generally, each model maps to a single database table.

The basics:

-   Each model is a Python class that subclasses `django.db.models.Model`.
-   Each attribute of the model represents a database field.
-   With all of this, Django gives you an automatically-generated database-access API; see Making queries.

Use `OuterRef` when a queryset in a `Subquery` needs to refer to a field from the outer query or its transform. It acts like an `F` expression except that the check to see if it refers to a valid field isn’t made until the outer queryset is resolved.

### `select_related()`

Returns a `QuerySet` that will **follow** foreign-key relationships, selecting _additional related-object data when it executes its query_. This is a performance booster which results in a single more complex query but means later use of foreign-key relationships won’t require database queries.

### `in_bulk()`

Takes a list of field values (`id_list`) and the `field_name` for those values, and returns a dictionary mapping each value to an instance of the object with the given field value.

```python
>>> Blog.objects.in_bulk([1])
{1: <Blog: Beatles Blog>}
>>> Blog.objects.in_bulk([1, 2])
{1: <Blog: Beatles Blog>, 2: <Blog: Cheddar Talk>}
>>> Blog.objects.in_bulk([])
{}
>>> Blog.objects.in_bulk()
{1: <Blog: Beatles Blog>, 2: <Blog: Cheddar Talk>, 3: <Blog: Django Weblog>}
>>> Blog.objects.in_bulk(["beatles_blog"], field_name="slug")
{'beatles_blog': <Blog: Beatles Blog>}
>>> Blog.objects.distinct("name").in_bulk(field_name="name")
{'Beatles Blog': <Blog: Beatles Blog>, 'Cheddar Talk': <Blog: Cheddar Talk>, 'Django Weblog': <Blog: Django Weblog>}
```

If a list isn’t provided, all objects in the `queryset` are returned.

## Cache Framework



