| # | Test prompt you can type | What we're testing |
|---|---|---|
| 1 | `Show me Phase 3 compounds` | SQL + Markdown + table |
| 2 | `How many activity datapoints are available?` | SQL + large numeric summary + table |
| 3 | `Show compound and target distribution` | SQL + multiple tables + text between tables |
| 4 | `Find compounds targeting EGFR` | Longer SQL + detailed result table |
| 5 | `Compare activity across target families` | Multiple tables interspersed with explanations |
| 6 | `Give me a general database summary` | **No SQL** — verifies Show Query doesn't appear |
| 7 | `Find compounds containing special structures` | SQL containing quotes/braces/special characters |
| 8 | `Give me a detailed activity report` | Very large response streamed slowly |
| 9 | `Analyze failed compound searches` | Interrupted/malformed stream / failure handling |
| 10 | `Give me a complete drug discovery analysis` | Everything together: headings, lists, SQL, multiple tables, long Markdown |