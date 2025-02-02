You can do closer to $2*10^8$ operations per second in C++ if those operations are low-level operations (array accesses, additions, bit shifts, multiplies, subtractions, Xor, et cetera).

**Mods** and **divisions** are slightly slower.

If you are doing things like hash map lookups, reading input, or printing output, you can do about `10^6` of those per second. If you use Java, the cut-off is maybe 70% what it is in C++, since a lot of things have more overhead, but of course it really depends on what the operations are; sometimes it is closer to 30% of what C++ can do.
