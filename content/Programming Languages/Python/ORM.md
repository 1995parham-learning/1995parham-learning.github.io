## Tortoise

Tortoise ORM is an easy-to-use `asyncio` ORM _(Object Relational Mapper)_ inspired by Django.

Tortoise ORM was built with relations in mind and admiration for the excellent and popular Django ORM. It's engraved in its design that you are working not with just tables, you work with relational data.

-   https://github.com/tortoise/tortoise-orm
-   https://tortoise.github.io/

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
