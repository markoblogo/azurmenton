# Manual event inbox

Use this folder for official event URLs or minimal manually supplied event records that should enter the same batch workflow as automated ingestion.

Preferred JSON shape:

```json
[
  {
    "title": "Event title",
    "sourceUrl": "https://official.example/event",
    "city": "menton",
    "startDate": "2026-08-15",
    "venue": "Venue name"
  }
]
```

Do not paste promotional copy here as public text. The preparation step writes concise Azur Menton summaries and flags uncertain fields.
