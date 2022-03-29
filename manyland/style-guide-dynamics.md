# [WIP] Dynamic Style Guide #
Keeping your dynamic code clean - even if it's just you that's seeing it - is extremely important.
So here's a style guide for doing just that!

This isn't a strict set of rules, of course, it's just how I organize my code.

## Before we Start ##
I do use a bit of specific terminology, so here's what it all means:

```
0: cell 1 right 2, play sound
↑    ↑      ↑   ↑      ↑
1    2      3   4      5
```
1. Keyframe `0: / 0-0.3: / +5s:` etc.
2. Selector `cells / cell 1+2 / cell 3` etc.
3. Command `show / right / opacity / text` etc.
4. Argument `up 19 / rotate 90 / text bla bla` etc.
5. Cell-less command `restart / remove / play sound` etc.

### Keyframe span ###
* `1:` - `Point` keyframe
* `1-2:` - `Range` keyframe

### Keyframe position ###
* `n:` - `Absolute` keyframe
* `+n:` - `Relative` keyframe

### Selector types ###
* `cell 1` - `Single` selector
* `cells 1+2` - `Multi` selector
* `cells` - `All` selector

### Groups ###
```
// This is a group (of keyframes)
 0.0: cell 1 show
+0.1: cell 1 hide, cell 2 show
+0.1: cell 2 hide, cell 3 show
+0.1: cell 3 hide, cell 4 show

// This is another group (separated by 1 or more empty lines)
 0.0: cell 1 show
+0.1: cell 1 hide, cell 2 show
+0.1: cell 2 hide, cell 3 show
+0.1: cell 3 hide, cell 4 show

// This comment is the group's title.
 0.0: cell 1 show
+0.1: cell 1 hide, cell 2 show
+0.1: cell 2 hide, cell 3 show
+0.1: cell 3 hide, cell 4 show
```

Now that you know all that, we can actually begin!

## Keyframe formatting ##
Should you include the `s` at the end of your keyframes?
That's really just up to taste. I personally don't, and didn't use it in any of the examples, but using it is perfecly fine.
If you _do_ use it, please be consistent and use it on _all_ of your keyframes!

Whole numbers should never have more trailing zeroes after the decimal point, unless they are part of a block with non-whole numbers.
They also should never ever have _leading_ zeroes, if you want to line up the `:` of two keyframes, use leading spaces instead.
### Right ###
```
0: cells show

1.0: cells right 38
1.2: cell 2 up 19

0-1.0: cells right 5
1-2.5: cells up 5

 9: cell 3 hide, cell 4 show
10: cell 4 hide, cell 5 show
```
### Wrong ###
```
0.0: cells show

1: cells right 38
1.2: cell 2 up 19

0.0-1: cells right 5
1.0-2.5: cells up 5

09: cell 3 hide, cell 4 show
10: cell 4 hide, cell 5 show
```

A group should never have both `absolute` and `relative` keyfames, unless the first keyframe is `abolute`.

When an `absolute` keyframe _is_ next to a `relative` keyframe, if should have a leading space so it aligns with the `relative` keyframe.
### Right ###
```
0: cells show, cell 1 hide
1: cells 2+4+6 right 2

 0.5: cells left 1
+0.1: cells left 1
+0.1: cells left 1
+0.1: cells left 1

+0.1: cells left 1
+0.1: cells left 1
+0.1: cells left 1
```
### Wrong ###
```
0: cells show, cell 1 hide
1: cells 2+4+6 right 2

+0.1: cells left 1
0.3: cells left 1
+0.1: cells left 1
```
