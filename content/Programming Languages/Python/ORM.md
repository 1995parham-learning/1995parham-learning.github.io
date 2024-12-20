## Tortoise

Tortoise ORM is an easy-to-use `asyncio` ORM _(Object Relational Mapper)_ inspired by Django.

Tortoise ORM was built with relations in mind and admiration for the excellent and popular Django ORM. It's engraved in its design that you are working not with just tables, you work with relational data.

-   https://github.com/tortoise/tortoise-orm
-   https://tortoise.github.io/

It uses [Aerich](https://github.com/tortoise/aerich) for migrations.

### Why was Tortoise ORM built?

Python has many existing and mature ORMs, unfortunately they are designed with an **opposing paradigm** of how I/O gets processed. `asyncio` is relatively new technology that has a different concurrency model, and the largest change is regarding how I/O is handled.

![[Pasted image 20241126195218.png]]

### Features

#### Clean, familiar python interface

Define your models like so:

```python
from tortoise.models import Model
from tortoise import fields

class Tournament(Model):
    id = fields.IntField(primary_key=True)
    name = fields.TextField()
```

Initialise your models and database like so:

```python
from tortoise import Tortoise, run_async

async def init():
    # Here we create a SQLite DB using file "db.sqlite3"
    #  also specify the app name of "models"
    #  which contain models from "app.models"
    await Tortoise.init(
        db_url='sqlite://db.sqlite3',
        modules={'models': ['app.models']}
    )
    # Generate the schema
    await Tortoise.generate_schemas()

# run_async is a helper function to run simple async Tortoise scripts.
run_async(init())
```

And use it like so:

```python
# Create instance by save
tournament = Tournament(name='New Tournament')
await tournament.save()

# Or by .create()
await Tournament.create(name='Another Tournament')

# Now search for a record
tour = await Tournament.filter(name__contains='Another').first()
print(tour.name)
```

### Tutorial

Primary entity of tortoise is `tortoise.models.Model`. You can start writing models like this:

```python
from tortoise.models import Model
from tortoise import fields

class Tournament(Model):
    # Defining `id` field is optional, it will be defined automatically
    # if you haven't done it yourself
    id = fields.IntField(primary_key=True)
    name = fields.CharField(max_length=255)

    # Defining ``__str__`` is also optional, but gives you pretty
    # represent of model in debugger and interpreter
    def __str__(self):
        return self.name


class Event(Model):
    id = fields.IntField(primary_key=True)
    name = fields.CharField(max_length=255)
    # References to other models are defined in format
    # "{app_name}.{model_name}" - where {app_name} is defined in tortoise config
    tournament = fields.ForeignKeyField('models.Tournament', related_name='events')
    participants = fields.ManyToManyField('models.Team', related_name='events', through='event_team')

    def __str__(self):
        return self.name


class Team(Model):
    id = fields.IntField(primary_key=True)
    name = fields.CharField(max_length=255)

    def __str__(self):
        return self.name
```

> [!Note]
> You can read more on defining models in [Models](https://tortoise.github.io/models.html#models)

After you defined all your models, tortoise needs you to init them, in order to create backward relations between models and match your db client with appropriate models.

You can do it like this:

```python
from tortoise import Tortoise

async def init():
    # Here we create a SQLite DB using file "db.sqlite3"
    #  also specify the app name of "models"
    #  which contain models from "app.models"
    await Tortoise.init(
        db_url='sqlite://db.sqlite3',
        modules={'models': ['app.models']}
    )
    # Generate the schema
    await Tortoise.generate_schemas()
```

Here we create a connection to a SQLite DB database with the default `aiosqlite` client and then we discover & initialise models.

`generate_schema` generates schema on empty database, you shouldn’t run it on every app init, run it just once, maybe out of your main code.

If you are running this in a simple script, you can do:

```python
run_async(init())
```

`run_async` is a helper function to run simple async Tortoise scripts. If you are running Tortoise ORM as part of a service, please take a look at [The Importance of cleaning up](https://tortoise.github.io/setup.html#cleaningup)

After that you can start using your models:

```python
# Create instance by save
tournament = Tournament(name='New Tournament')
await tournament.save()

# Or by .create()
await Event.create(name='Without participants', tournament=tournament)
event = await Event.create(name='Test', tournament=tournament)
participants = []
for i in range(2):
    team = await Team.create(name='Team {}'.format(i + 1))
    participants.append(team)

# M2M Relationship management is quite straightforward
# (look for methods .remove(...) and .clear())
await event.participants.add(*participants)

# You can query related entity just with async for
async for team in event.participants:
    pass

# After making related query you can iterate with regular for,
# which can be extremely convenient for using with other packages,
# for example some kind of serializers with nested support
for team in event.participants:
    pass


# Or you can make preemptive call to fetch related objects,
# so you can work with related objects immediately
selected_events = await Event.filter(
    participants=participants[0].id
).prefetch_related('participants', 'tournament')
for event in selected_events:
    print(event.tournament.name)
    print([t.name for t in event.participants])

# Tortoise ORM supports variable depth of prefetching related entities
# This will fetch all events for team and in those team tournament will be prefetched
await Team.all().prefetch_related('events__tournament')

# You can filter and order by related models too
await Tournament.filter(
    events__name__in=['Test', 'Prod']
).order_by('-events__participants__name').distinct()
```

### Aerich

You need to add `aerich.models` to your `Tortoise-ORM` config first. Example:

```python
TORTOISE_ORM = {
    "connections": {"default": "mysql://root:123456@127.0.0.1:3306/test"},
    "apps": {
        "models": {
            "models": ["tests.models", "aerich.models"],
            "default_connection": "default",
        },
    },
}
```

```shell
> aerich init -h

Usage: aerich init [OPTIONS]

  Init config file and generate root migrate location.

Options:
  -t, --tortoise-orm TEXT  Tortoise-ORM config module dict variable, like
                           settings.TORTOISE_ORM.  [required]
  --location TEXT          Migrate store location.  [default: ./migrations]
  -s, --src_folder TEXT    Folder of the source, relative to the project root.
  -h, --help               Show this message and exit.
```

Initialise the config file and migrations location:

```shell
> aerich init -t tests.backends.mysql.TORTOISE_ORM

Success create migrate location ./migrations
Success write config to pyproject.toml
```

```shell
> aerich init-db

Success create app migrate location ./migrations/models
Success generate schema for app "models"
```

If your Tortoise-ORM app is not the default `models`, you must specify the correct app via `--app`, e.g. `aerich --app other_models init-db`.

```shell
> aerich migrate --name drop_column

Success migrate 1_202029051520102929_drop_column.py
```

Format of migrate filename is `{version_num}_{datetime}_{name|update}.py`.

If `aerich` guesses you are renaming a column, it will ask `Rename {old_column} to {new_column} [True]`. You can choose `True` to rename column without column drop, or choose `False` to drop the column then create. Note that the latter may lose data.

If you need to manually write migration, you could generate empty file:

```shell
> aerich migrate --name add_index --empty

Success migrate 1_202326122220101229_add_index.py
```

```shell
> aerich upgrade

Success upgrade 1_202029051520102929_drop_column.py
```

Now your db is migrated to latest.

```shell
> aerich downgrade -h

Usage: aerich downgrade [OPTIONS]

Downgrade to specified version.

Options:
-v, --version INTEGER Specified version, default to last. [default: -1]
-d, --delete Delete version files at the same time. [default:
False]

--yes Confirm the action without prompting.
-h, --help Show this message and exit.
```

```shell
> aerich downgrade

Success downgrade 1_202029051520102929_drop_column.py
```

Now your db is rolled back to the specified version.

```shell
> aerich history

1_202029051520102929_drop_column.py
```

```shell
> aerich heads

1_202029051520102929_drop_column.py
```
