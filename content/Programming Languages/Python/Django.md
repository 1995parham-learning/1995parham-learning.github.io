- [Django documentation](https://docs.djangoproject.com/en): Everything you need to know about Django.
- [GeoDjango](https://docs.djangoproject.com/en/5.0/ref/contrib/gis/): GeoDjango intends to be a world-class geographic web framework. Its goal is to make it as easy as possible to build GIS web applications and harness the power of spatially enabled data.

## Django REST Framework

Django REST framework is a powerful and flexible toolkit for building Web APIs. Some reasons you might want to use REST framework:

- The Web browsable API is a huge usability win for your developers.
- Authentication policies including packages for OAuth1a and OAuth2.
- Serialization that supports both ORM and non-ORM data sources.
- Customizable all the way down - just use regular function-based views if you don't need the more powerful features.
- Extensive documentation, and great community support.
- Used and trusted by internationally recognised companies including Mozilla, Red Hat, Heroku, and Eventbrite.

[Home - Django REST framework](https://www.django-rest-framework.org/)

- [Serializes](https://www.django-rest-framework.org/api-guide/serializers/)
- [Fields](https://www.django-rest-framework.org/api-guide/fields)
- [Parsers](https://www.django-rest-framework.org/api-guide/parsers/)
- [Views](https://www.django-rest-framework.org/api-guide/views/)
- [Viewsets](https://www.django-rest-framework.org/api-guide/viewsets/)
- [Generic Views](https://www.django-rest-framework.org/api-guide/generic-views/)
- [Filtering](https://www.django-rest-framework.org/api-guide/filtering/)

Sometimes it is better in DRF to read its code because its documentation is not complete:

- [@encode/django-rest-framework](https://github.com/encode/django-rest-framework)

Semi-automatic swagger documentation for the REST APIs:

- [@tfranzel/drf-spectacula](https://github.com/tfranzel/drf-spectacular)

For doing upgrade, you can use:

- [@adamchainz/django-upgrade](https://github.com/adamchainz/django-upgrade)

## Database Optimization

Django’s database layer provides various ways to help developers get the most out of their databases.
As general programming practice, this goes without saying. Find out what queries you are doing and what they are
costing you. Use `QuerySet.explain()` to understand how specific `QuerySet`s are executed by your database.

To avoid performance problems, it is important to understand:

- That `QuerySet`s are lazy.
- When they are evaluated.
- How the data is held in memory.

Use `iterator()`, When you have a lot of objects, the caching behavior of the `QuerySet` can cause a large amount of memory to be used. In this case, `iterator()` may help.

## Dataclasses

Using data-classes to define request and response in Django REST Framework. There are cases in which your request or
response is not a model, in those cases you can define them as a dataclass using the following library.

- [@oxan/djangorestframework-dataclasses](https://github.com/oxan/djangorestframework-dataclasses)

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

- [Django filter documentation](https://django-filter.readthedocs.io/en/main/)

## `inspectdb`

There are cases in which you already have the database and want to describe it using Django models:

```bash
python manage.py inspectdb
```

## Models

A model is the single, definitive source of information about your data. It contains the essential fields and behaviors of the data you’re storing. Generally, each model maps to a single database table.

The basics:

- Each model is a Python class that subclasses `django.db.models.Model`.
- Each attribute of the model represents a database field.
- With all of this, Django gives you an automatically-generated database-access API; see Making queries.

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

Django comes with a robust cache system that lets you save dynamic pages so they don’t have to be calculated for each request. For convenience, Django offers different levels of cache granularity: You can cache the output of specific views, you can cache only the pieces that are difficult to produce, or you can cache your entire site.

The cache system requires a small amount of setup. Namely, you have to tell it where your cached data should live – whether in a database, on the filesystem or directly in memory. This is an important decision that affects your cache’s performance; yes, some cache types are faster than others.

### The low-level cache API

As a shortcut, the default cache is available as `django.core.cache.cache`:

```python
>>> from django.core.cache import cache
```

This object is equivalent to `caches['default']`.

## `ogrinspect`

The `ogrinspect` command introspects a GDAL-supported vector data source (e.g., a shapefile) and generates a model definition and `LayerMapping` dictionary automatically.

The general usage of the command goes as follows:

```bash
python manage.py ogrinspect [options] <data_source> <model_name> [options]
```

`data_source` is the path to the GDAL-supported data source and `model_name` is the name to use for the model. Command-line options may be used to further define how the model is generated.

## Migrations

You can apply migrations with:

```bash
python manage.py migrate
```

And create a new migrations using:

```bash
python manage.py makemigration
```

Also, if you want to go for specific migration (please note that if will actually revert/apply the migrations to that migration)

```bash
python manage.py migrate <app> <label>
```

Or you can use `--fake` to just change the migration number and do not apply or revet anything.

```bash
python manage.py migrate --fake <app> <label>
```
