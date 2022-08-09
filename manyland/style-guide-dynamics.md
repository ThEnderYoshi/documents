# [WIP] Dynamic Style Guide
Keeping your dynamic code clean - even if it's just you that's seeing it - is extremely important.
So here's a style guide for doing just that!

This isn't a strict set of rules, of course, it's just how I organize my code.

## Before we Start
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

### Keyframe span
* `1:` - `Point` keyframe
* `1-2:` - `Range` keyframe

### Keyframe position
* `n:` - `Absolute` keyframe
* `+n:` - `Relative` keyframe

### Selector types
* `cell 1` - `Single` selector
* `cells 1+2` - `Multi` selector
* `cells` - `All` selector

### Groups
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

## Keyframe formatting
Should you include the `s` at the end of your keyframes?
That's really just up to taste. I personally don't, and didn't use it in any of the examples, but using it is perfecly fine.
If you _do_ use it, please be consistent and use it on _all_ of your keyframes!

Whole numbers should never have more trailing zeroes after the decimal point, unless they are part of a block with non-whole numbers.
They also should never ever have _leading_ zeroes, if you want to line up the `:` of two keyframes, use leading spaces instead.
### Right
```
0: cells show

1.0: cells right 38
1.2: cell 2 up 19

0-1.0: cells right 5
1-2.5: cells up 5

 9: cell 3 hide, cell 4 show
10: cell 4 hide, cell 5 show
```
### Wrong
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

When an `absolute` keyframe _is_ next to a `relative` keyframe, it should have a leading space so it aligns with the `relative` keyframe.
### Right
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
### Wrong
```
0: cells show, cell 1 hide
1: cells 2+4+6 right 2

+0.1: cells left 1
0.3: cells left 1
+0.1: cells left 1
```

## Selectors

Each selector should be on its own line, unless its only 2 selectors of the same type that have only 1 command each (i.e. `+0.1: cell 1 hide, cell 2 show`), or this specific line `0: cells show, cell N hide`.

The first selector should be on the same line as the keyframe, with the others having leading spaces so they align with the first.

The line breaks should not have trailing commas.

### Right
```
0: cells show, cell 1 hide

+0.1: cell 2 hide, cell 3 show

2-3: cell 2 up 1, left 2, show
     cell 3 up 2, left 3
     cell 4 up 3, left 4, hide
```
### Wrong
```
1: cells 1+2 left 4, cell 3 up 5, cells rotate 15

2-3: cell 2 up 1, left 2, show,
cell 3 up 2, left 3,
cell 4 up 3, left 4, hide
```

Unless you're doing something where order matters, selectors should be ordered as `all > multi > single`, followed by cell-less commands.

`single` selectors should be ordered by their selected cell, in ascending order.

`multi` selectors should be ordered by their _first_ selected sell, in ascending order.
If two `multi` selectors share the same first cell, compare the second one, and so on.

The selected cells in `multi` selectors should also be ordered in ascending order.

### Right
```
0: cells show
   cells 2+4 down 19
   cell 1 left 19
   play sound

0: cell 1 up 1
   cell 2 up 1
   cell 3 up 1
   cell 5 up 1
   cell 6 up 1

0: cells 1+2+3+5+6 show
```
### Wrong
```
0: cell 1 left 19
   cells show
   play sound
   cells 2+4 down 19

0: cell 3 up 1
   cell 6 up 1
   cell 2 up 1
   cell 1 up 1
   cell 5 up 1

0: cells 3+6+2+1+5 show
```

`multi` selectors should be written as `cells` instead of `cell`.

### Right
```
0: cells 1+2 show
```
### Wrong
```
0: cell 1+2 show
```

## Line breaks

Lines shouldn't need to auto-wrap because they're too long.
Keep lines up to the width of the editor.

Manually breaking the line in this case would be "continuing" the line.
Continued lines should have 2 more spaces than the starting line.

`text`, `say`, and any commands with ≥ 4 arguments should _always_ be on its own line.

The only exception for line breaking is the `text` command, which, unfortunately must entirely exist in a single line, and, as such, can't be continued on another line.

### Right
```
// Assuming the editor this wide ---------------------|

0: cells show
   cells 1+3+5+7+9 show, position -57 -105, z-index 1
     pivot 14 18, rotation 90
     crop -100 -105 100 105
     text this is some text.

// Notice how crop and text are on their own lines,
// even if crop could fit after rotation 90. (it has
// 4 args)
// Oh yeah, commands get line broken too.
```
### Wrong
```
// Assuming the editor this wide ---------------------| At this point, the line would wrap!

0: cells show
   cells 1+3+5+7+9 show, position -57 -105, z-index 1, pivot 14 18, rotation 90, crop -100 -105 100 105, text this is some text.
```
