# Smart Mobility Benchmark

A public benchmark package for evaluating question answering and analytical reasoning over structured smart mobility data.

The Smart Mobility Benchmark provides a fixed transportation data subset, schema metadata, public benchmark questions, example submission files, and a public leaderboard. The benchmark is designed to test whether an AI system can understand transportation questions, identify relevant tables and fields, build appropriate analysis plans, and produce grounded responses from structured CSV data.

Evaluation is performed separately by the benchmark maintainers using private reference answers and scoring scripts. Hidden reference answers, submitted files, evaluator logs, and private scoring materials are not included in this public repository.

---

## Overview

The Smart Mobility Benchmark focuses on schema-aware question answering over Alexandria smart mobility data.

The benchmark evaluates whether a system can:

1. Interpret natural-language transportation questions.
2. Select relevant tables from a multi-table data environment.
3. Identify the fields needed for analysis.
4. Apply appropriate filtering, grouping, aggregation, comparison, ranking, or joining logic.
5. Generate a structured SQL-style plan or executable analysis workflow.
6. Produce a final answer grounded in the provided dataset.
7. Clearly state assumptions or limitations when a question is only partially answerable.

This release uses a fixed March 2026 data snapshot to support reproducible benchmarking.

---

## Release Information

| Item | Description |
|---|---|
| Release | Smart Mobility Benchmark |
| Data window | March 2026 |
| Data format | CSV |
| Domain | Smart mobility / transportation analytics |
| Number of questions | 62 |
| Main task type | Schema-aware and data-grounded question answering over structured transportation data |
| Evaluation tracks | Track 1: planning and schema reasoning; Track 2: data-grounded answering |

---

## Public Repository Structure

```text
smart-mobility-public/
├── README.md
├── examples/
│   ├── example_track1_submission.csv
│   └── example_track2_submission.csv
├── questions/
│   └── questions.csv
├── schema/
│   ├── column_dictionary.csv
│   └── table_profile.csv
├── tables/
│   ├── safety_conflicts_2026-03-01_to_2026-03-31.csv
│   ├── safety_event_2026-03-01_to_2026-03-31.csv
│   ├── safety_pedcompliance_2026-03-01_to_2026-03-31.csv
│   ├── safety_redlightrunners_2026-03-01_to_2026-03-31.csv
│   ├── safety_simpledelay_2026-03-01_to_2026-03-31.csv
│   ├── speed_distribution_2026-03-01_to_2026-03-31.csv
│   ├── tmc_crosswalk_2026-03-01_to_2026-03-31.csv
│   ├── vehicle_count_2026-03-01_to_2026-03-31.csv
│   └── vru_count_2026-03-01_to_2026-03-31.csv
└── public/
    ├── index.html
    ├── leaderboard_loader.js
    ├── scss/
    │   └── benchmark.css
    └── leaderboard/
        ├── leaderboard.json
        └── leaderboard.csv
```

The `public/` directory is used for the benchmark website and public leaderboard. The `examples/`, `questions/`, `schema/`, and `tables/` directories contain the released benchmark materials.

---

## Data Tables

The benchmark uses a fixed one-month data snapshot from March 2026.

The data files are stored in:

```text
tables/
```

Included data files:

```text
safety_conflicts_2026-03-01_to_2026-03-31.csv
safety_event_2026-03-01_to_2026-03-31.csv
safety_pedcompliance_2026-03-01_to_2026-03-31.csv
safety_redlightrunners_2026-03-01_to_2026-03-31.csv
safety_simpledelay_2026-03-01_to_2026-03-31.csv
speed_distribution_2026-03-01_to_2026-03-31.csv
tmc_crosswalk_2026-03-01_to_2026-03-31.csv
vehicle_count_2026-03-01_to_2026-03-31.csv
vru_count_2026-03-01_to_2026-03-31.csv
```

---

## Schema Metadata

Schema metadata is stored in:

```text
schema/
├── column_dictionary.csv
└── table_profile.csv
```

The schema files provide table-level and column-level descriptions. Systems should use these files to understand the available data environment rather than relying on hard-coded assumptions.

---

## Benchmark Questions

The public benchmark questions are stored in:

```text
questions/questions.csv
```

The benchmark contains 62 public questions with neutral IDs from `Q01` to `Q62`.

The question set includes both:

| Question type | Description |
|---|---|
| Single-table analytical questions | Questions that can be answered using one primary table with filtering, grouping, aggregation, or ranking. |
| Multi-table analytical questions | Questions that require joining, comparing, normalizing, or combining information across multiple tables. |

The public question IDs do not reveal the internal difficulty category or whether a question is single-table or multi-table. Systems must infer the relevant tables, fields, and analysis logic from the question and schema metadata.

---

## Benchmark Tracks

This benchmark supports two evaluation tracks.

### Track 1: Planning and Schema Reasoning

Track 1 evaluates whether a system can identify the correct analysis plan for each question.

For each question, the system should return:

```text
ID
answerable
selected_tables
key_fields
granularity
query_logic
sql_or_plan
assumptions
```

Track 1 does not require computing the final numeric/text answer from the data. It focuses on whether the system can reason about what tables, fields, filters, joins, and aggregation logic are needed.

### Track 2: Data-Grounded Final Answering

Track 2 evaluates whether a system can use the released CSV tables to compute and report a final grounded answer.

For each question, the system should return:

```text
ID
pred_final_answer
assumptions
```

If your system uses a different but equivalent final-answer column name, such as:

```text
final_response
```

please keep the meaning clear and consistent across all rows.

Track 2 may also include additional columns generated by your system, such as executed code, execution status, intermediate outputs, or error messages. These additional columns are allowed, but the evaluator will only use the required answer fields and relevant metadata.

---

## Submission Format

Participants may submit results for:

```text
Track 1 only
Track 2 only
Both Track 1 and Track 2
```

Track 1 and Track 2 should be submitted as **separate files** because the two tracks have different output formats and are evaluated by different scoring scripts.

Recommended submission files:

```text
track1_submission.csv
track2_submission.csv
```

or:

```text
track1_submission.jsonl
track2_submission.jsonl
```

### Track 1 CSV Template

```csv
ID,answerable,selected_tables,key_fields,granularity,query_logic,sql_or_plan,assumptions
Q01,Yes,safety_redlightrunners,"intersection_name; red_light_runners; bin_start_date_time",intersection-level over March 2026,"Filter to the benchmark snapshot, group by intersection, and sum red-light-running events.","Group safety_redlightrunners by intersection_name and sum red_light_runners.","Use the fixed March 2026 benchmark data window."
```

### Track 2 CSV Template

```csv
ID,pred_final_answer,assumptions
Q01,"A data-grounded final answer computed from the released CSV files.","Use the fixed March 2026 benchmark data window."
```

Example files are provided in:

```text
examples/
├── example_track1_submission.csv
└── example_track2_submission.csv
```

---

## Submission Workflow

Submissions are collected through the benchmark submission form.

Participants should provide:

1. Submitter and team information.
2. System name and short system description.
3. Model(s) used.
4. External tools used, if any.
5. Whether manual correction was applied.
6. Benchmark track selection.
7. Track 1 submission file, Track 2 submission file, or both.
8. Public leaderboard and citation preferences.

The submission form accepts CSV, JSON, or JSONL output files. If submitting both tracks, upload one file for Track 1 and one file for Track 2.

Repository-based submissions may also be supported by providing a public GitHub/GitLab repository URL, commit hash, branch name, and path to the submission file. Repository-based submissions are used only to retrieve the specified CSV/JSON output file. Participant code will not be executed.

---

## Evaluation

Evaluation is performed by the benchmark maintainers using private reference materials.

The public release does not include:

```text
hidden reference answers
private scoring scripts
raw submitted files
participant emails
evaluator logs
Google Drive file IDs
private repository paths
access tokens
```

Track 1 evaluation considers:

```text
answerability
table selection
field selection
granularity
query logic
SQL-style plan
assumptions and limitations
```

Track 2 evaluation considers:

```text
data-grounded final answer correctness
handling of partially answerable questions
consistency with the released CSV data
assumptions and limitations
```

Scores may be reported at both the question level and the overall benchmark level.

---

## Public Leaderboard

The public leaderboard is generated from sanitized evaluation outputs.

The public leaderboard may include:

```text
rank
display_name
system_name
track
track1_score
track2_score
overall_score
submitted_at
processed_at
```

The public leaderboard does not include submitted files, private paths, raw model outputs, hidden answers, evaluator logs, emails, or tokens.

Leaderboard files are stored in:

```text
public/leaderboard/
├── leaderboard.json
└── leaderboard.csv
```

The benchmark website reads the public leaderboard from:

```text
public/leaderboard/leaderboard.json
```

---

## Recommended Participant Workflow

```text
1. Review the schema files.
2. Review the public benchmark questions.
3. Load the released CSV tables.
4. Generate Track 1 planning outputs and/or Track 2 final-answer outputs.
5. Save Track 1 and Track 2 outputs as separate CSV/JSON/JSONL files.
6. Submit the file(s) through the benchmark submission form.
7. Review public leaderboard updates if public display was allowed.
```

---

## Data Use and License

TBD.

---

## Contact

For questions about the benchmark package, evaluation protocol, or release materials, please contact the benchmark maintainers.

```text
mnice@vtti.vt.edu
```
