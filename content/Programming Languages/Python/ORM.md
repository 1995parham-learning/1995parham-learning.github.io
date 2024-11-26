## Tortoise

Tortoise ORM is an easy-to-use `asyncio` ORM _(Object Relational Mapper)_ inspired by Django.

Tortoise ORM was built with relations in mind and admiration for the excellent and popular Django ORM. It's engraved in its design that you are working not with just tables, you work with relational data.

-   https://github.com/tortoise/tortoise-orm
-   https://tortoise.github.io/

### Why was Tortoise ORM built?

Python has many existing and mature ORMs, unfortunately they are designed with an **opposing paradigm** of how I/O gets processed. `asyncio` is relatively new technology that has a different concurrency model, and the largest change is regarding how I/O is handled.

![[Pasted image 20241126195218.png]]
