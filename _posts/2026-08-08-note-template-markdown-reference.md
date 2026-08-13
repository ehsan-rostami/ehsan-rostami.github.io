---
title: "Note Template: A Markdown Reference"
date: 2026-08-08
tags: [template, reference]
published: false
---
A short introductory paragraph goes here. This becomes the excerpt shown in the Notes list and the lede shown at the top of the note, so keep it to one or two sentences that summarize what the note is about.

## A Second-Level Heading

Second-level headings (`##`) are the main section dividers within a note. Hover over one and a small `#` link appears, which readers can use to link directly to that section.

### A Third-Level Heading

Third-level headings (`###`) are for subsections within a `##` section.

Regular paragraphs look like this. You can use **bold text**, *italic text*, and `inline code` within a sentence. You can also [link to an external page](https://example.com) or to [an internal page]({{ '/publications' | relative_url }}).

## Lists

An unordered list:

- First point
- Second point
- Third point, with a nested list:
  - Nested item one
  - Nested item two

An ordered list:

1. First step
2. Second step
3. Third step

## Blockquote

> A blockquote is useful for highlighting a quotation or a key sentence you want to stand out from the surrounding text.

## Code Block

Fenced code blocks support syntax highlighting. For example, Python:

```python
def solar_altitude(latitude, declination, hour_angle):
    import math
    lat = math.radians(latitude)
    dec = math.radians(declination)
    ha = math.radians(hour_angle)
    return math.degrees(math.asin(
        math.sin(lat) * math.sin(dec) +
        math.cos(lat) * math.cos(dec) * math.cos(ha)
    ))
```

## Table

| Metric | Scale | Typical Use |
|---|---|---|
| DA | Point | Minimum illuminance target |
| UDI | Point | Illuminance range, not just a minimum |
| sDA | Floor area | Percentage of floor area passing |

## Image

![Alt text describing the image]({{ '/assets/images/projects/project04_2.jpg' | relative_url }})

The first image found in a note is used automatically as its thumbnail on the Notes list page. If a note has no image, no thumbnail is shown, and no default placeholder is used either.

## Footnote

Kramdown also supports footnotes[^1], useful for a citation or an aside that would otherwise interrupt the main text.

[^1]: This is the footnote text. It appears automatically at the bottom of the note with a link back to where it was referenced.

## Horizontal Rule

Used to separate distinct parts of a longer note.

---

That covers the formatting available for notes. To write a new one, copy this file into `_posts`, rename it following the `YYYY-MM-DD-title.md` pattern, replace the front matter and content, and delete anything you don't need. Remember to remove the `published: false` line so the note actually appears on the site.
