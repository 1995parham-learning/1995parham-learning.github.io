---
title: Rust
description: Let's Learn Rust
icon: skill-icons:rust
---

## `stdin`

The `stdin` function returns an instance of [`std::io::Stdin`](https://doc.rust-lang.org/std/io/struct.Stdin.html), which is a type that represents a handle to the standard input for your terminal.

## Functions

An _associated function_ is a function that's implemented on a type.

You'll find a `new` function on many types because it's a common name for a function that makes a new value of some kind.

## Variables

In Rust, variables are immutable by default, meaning once we give the variable a value, the value won't change. Unlike Go, variables should be initialized before usage:

```rust
fn main() {
    let x: u64;
    println!("{x}");
}
```

```
used binding `x` isn't initialized
```

Like immutable variables, _constants_ are values that are bound to a name and are not allowed to change, but there are a few differences between constants and variables.

First, you aren't allowed to use `mut` with constants. Constants aren't just immutable by default—they're always immutable. You declare constants using the `const` keyword instead of the `let` keyword, and the type of the value _must_ be annotated.

Constants can be declared in any scope, including the global scope, which makes them useful for values that many parts of code need to know about.

The last difference is that constants may be set only to a constant expression, not the result of a value that could only be computed at runtime.

```rust
const PARHAM_AGE: u64 = 10;
const ELAHE_AGE: u64 = PARHAM_AGE - 10;
```

Rust's naming convention for constants is to use all uppercase, with underscores between words.

Naming hard-coded values used throughout your program as constants is useful in conveying the meaning of that value to future maintainers of the code. It also helps to have only one place in your code you would need to change if the hard-coded value needed to be updated in the future.

You can declare a new variable with the same name as a previous variable. Rustaceans say that the first variable is _shadowed_ by the second, which means that the second variable is what the compiler will see when you use the name of the variable.

Shadowing is different from marking a variable as `mut` because we'll get a compile-time error if we accidentally try to reassign to this variable without using the `let` keyword. By using `let`, we can perform a few transformations on a value but have the variable be immutable after those transformations have been completed.

The other difference between `mut` and shadowing is that because we're effectively creating a new variable when we use the `let` keyword again, we can change the type of the value but reuse the same name.

A _scalar_ type represents a single value. Rust has four primary scalar types: integers, floating-point numbers, Booleans, and characters.

An _integer_ is a number without a fractional component. Signed numbers are stored using [two's complement](https://en.wikipedia.org/wiki/Two%27s_complement) representation.

| Length  | Signed | Unsigned |
| ------- | ------ | -------- |
| 8-bit   | i8     | u8       |
| 16-bit  | i16    | u16      |
| 32-bit  | i32    | u32      |
| 64-bit  | i64    | u64      |
| 128-bit | i128   | u128     |
| arch    | isize  | usize    |

Additionally, the `isize` and `usize` types depend on the architecture of the computer your program is running on, which is denoted in the table as "arch": 64 bits if you're on a 64-bit architecture and 32 bits if you're on a 32-bit architecture.

You can write integer literals in any of the forms shown in the following table. Note that number literals that can be multiple numeric types allow a type suffix, such as `57u8`, to designate the type. Number literals can also use `_` as a visual separator to make the number easier to read, such as `1_000`, which will have the same value as if you had specified `1000`.

| Number literals | Example     |
| --------------- | ----------- |
| Decimal         | 98_222      |
| Hex             | 0xff        |
| Octal           | 0o77        |
| Binary          | 0b1111_0000 |
| Byte (u8 only)  | b'A'        |

:::note
💡 Let's say you have a variable of type `u8` that can hold values between 0 and 255. If you try to change the variable to a value outside that range, such as 256, _integer overflow_ will occur, which can result in one of two behaviors. When you're compiling in debug mode, Rust includes checks for integer overflow that cause your program to _panic_ at runtime if this behavior occurs. Rust uses the term _panicking_ when a program exits with an error; we'll discuss panics in more depth in the [“Unrecoverable Errors with `panic!`”](https://rust-book.cs.brown.edu/ch09-01-unrecoverable-errors-with-panic.html) section.
:::

Rust also has two primitive types for _floating-point numbers_, which are numbers with decimal points. Rust's floating-point types are `f32` and `f64`, which are 32 bits and 64 bits in size, respectively. The default type is `f64` because on modern CPUs, it's roughly the same speed as `f32` but is capable of more precision. All floating-point types are signed.

Floating-point numbers are represented according to the IEEE-754 standard. The `f32` type is a single-precision float, and `f64` has double precision.

```rust
fn main() {
    let x = 2.0; // f64
    let y: f32 = 3.0; // f32
}
```

Rust supports the basic mathematical operations you'd expect for all the number types: addition, subtraction, multiplication, division, and remainder. Integer division truncates toward zero to the nearest integer.

Rust's `char` type is the language's most primitive alphabetic type. Here are some examples of declaring `char` values:

```rust
fn main() {
    let c = 'z';
    let z: char = 'ℤ'; // with explicit type annotation
    let heart_eyed_cat = '😻';
}
```

Note that we specify `char` literals with single quotes, as opposed to string literals, which use double quotes. Rust's `char` type is four bytes in size and represents a Unicode Scalar Value, which means it can represent a lot more than just ASCII.

## Compound types

_Compound types_ can group multiple values into one type. Rust has two primitive compound types: tuples and arrays.

A _tuple_ is a general way of grouping together a number of values with a variety of types into one compound type. Tuples have a fixed length: once declared, they cannot grow or shrink in size.

We create a tuple by writing a comma-separated list of values inside parentheses. Each position in the tuple has a type, and the types of the different values in the tuple don't have to be the same.

```rust
fn main() {
    let tup: (i32, f64, u8) = (500, 6.4, 1);
}
```

To get the individual values out of a tuple, we can use pattern matching to destructure a tuple value, like this:

```rust
fn main() {
    let tup = (500, 6.4, 1);

    let (x, y, z) = tup;

    println!("The value of y is: {y}");
}
```

We can also access a tuple element directly by using a period (`.`) followed by the index of the value we want to access. For example:

```rust
fn main() {
    let x: (i32, f64, u8) = (500, 6.4, 1);

    let five_hundred = x.0;

    let six_point_four = x.1;

    let one = x.2;
}
```

This program creates the tuple `x` and then accesses each element of the tuple using their respective indices. As with most programming languages, the first index in a tuple is 0.

The tuple without any values has a special name, _unit_. This value and its corresponding type are both written `()` and represent an empty value or an empty return type. Expressions implicitly return the unit value if they don't return any other value.

Another way to have a collection of multiple values is with an _array_. Unlike a tuple, every element of an array must have the same type. Unlike arrays in some other languages, arrays in Rust have a fixed length.

We write the values in an array as a comma-separated list inside square brackets:

```rust
fn main() {
    let a = [1, 2, 3, 4, 5];
}
```

Arrays are useful when you want your data allocated on the stack rather than the heap.

## References

The `&` indicates that this argument is a _reference_, which gives you a way to let multiple parts of your code access one piece of data without needing to copy that data into memory multiple times.

## Strings

The `trim` method on a `String` instance will eliminate any whitespace at the beginning and end.

## Format

```rust
println!("You guessed: {guess}");
```

The `{}` set of curly brackets is a placeholder: think of `{}` as little crab pincers that hold a value in place. When printing the value of a variable, the variable name can go inside the curly brackets.

When printing the result of evaluating an expression, place empty curly brackets in the format string, then follow the format string with a comma-separated list of expressions to print in each empty curly bracket placeholder in the same order.

## String

The `trim` method on a `String` instance will eliminate any whitespace at the beginning and end.

## `use`

If a type you want to use isn't in the prelude, you have to bring that type into scope explicitly with a `use` statement.

## [Prelude](https://doc.rust-lang.org/std/prelude/index.html) 🗞️

By default, Rust has a set of items defined in the standard library that it brings into the scope of every program. This set is called the _prelude._

## Random

Rust doesn't yet include random number functionality in its standard library. However, the Rust team does provide a [`rand crate`](https://crates.io/crates/rand) with said functionality. The `rand` crate is a _library crate_, which contains code that is intended to be used in other programs and can't be executed on its own.

## Compare

```rust
match guess.cmp(&secret_number) {
 Ordering::Less => println!("Too small!"),
 Ordering::Greater => println!("Too big!"),
 Ordering::Equal => println!("You win!"),
}
```

The `Ordering` type is another enum and has the variants `Less`, `Greater`, and `Equal`. These are the three outcomes that are possible when you compare two values.

The `cmp` method compares two values and can be called on anything that can be compared.

## Cargo 📦

Cargo understands [Semantic Versioning](http://semver.org/) (sometimes called _SemVer_), which is a standard for writing version numbers. The specifier `0.8.5` is actually shorthand for `^0.8.5`, which means any version that is at least 0.8.5 but below 0.9.0.

### Upgrade

When you _do_ want to update a crate, Cargo provides the command `update`, which will ignore the _Cargo.lock_ file and figure out all the latest versions that fit your specifications in _Cargo.toml_. Cargo will then write those versions to the _Cargo.lock_ file

### **[Building for Release](https://rust-book.cs.brown.edu/ch01-03-hello-cargo.html#building-for-release)** 🚀

When your project is finally ready for release, you can use `cargo build --release` to compile it with optimizations. This command will create an executable in _`target/release`_ instead of _`target/debug`_. The optimizations make your Rust code run faster, but turning them on lengthens the time it takes for your program to compile.

### Documentation

Another neat feature of Cargo is that running the `cargo doc --open` command will build documentation provided by all your dependencies locally and open it in your browser.

## Configuration 🔧

Personally, I love to have all configuration well-defined and structured 😍

[https://github.com/mehcode/config-rs](https://github.com/mehcode/config-rs)

[config - Rust](https://docs.rs/config/latest/config/)

[https://github.com/SergioBenitez/Figment](https://github.com/SergioBenitez/Figment)

[figment - Rust](https://docs.rs/figment/latest/figment/)

## Standard CLI 💾

Having multiple sub-command for things like migrations, provide ground data, etc.

[https://github.com/clap-rs/clap](https://github.com/clap-rs/clap)

[clap - Rust](https://docs.rs/clap/latest/clap/)

## TUI

[https://github.com/gyscos/cursive](https://github.com/gyscos/cursive)

## HTTP Frameworks 🌐

There are multiple frameworks in Rust:

[[Rocket]]

[https://github.com/tokio-rs/axum](https://github.com/tokio-rs/axum)

[https://github.com/actix/actix](https://github.com/actix/actix)

[actix - Rust](https://docs.rs/actix/latest/actix/)
