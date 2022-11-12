## Control changes in nested subfolders
Supposedly you have a following folder structure:
- 1
  - 1_1
    - 1_1_1
    - 1_1_2
  - 1_2
    - 1_2_1
    - 1_2_2
    
This action allows to control changes so that users can make changes only in 1 subfolder (for example 1_1 or 1_2_1). This action works on pull requests.

## Inputs

|         INPUT         |  TYPE  | REQUIRED | DEFAULT |                                    DESCRIPTION                                        | 
|-----------------------|--------|----------|---------|---------------------------------------------------------------------------------------|
|     changed-files     | string |   true   |         | List of modified files (i.e. "1/1_1/file.txt 1/1_2/file.txt").                        |
|        nesting        | number |   false  |    0    | Depth level of subfolder (i.e. nesting = 1 -> check 1_1, 1_2; nesting = 2 -> check 1_1_1, 1_1_2, 1_2_1, 1_2_2). |

## Usage example
```yaml
on:
  pull_request:
    branches:
    - master

jobs:
  control-changed-files:
    name: control changed files
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 0  # OR "2" -> To retrieve the preceding commit.

      - name: Get changed files
        id: changed-files
        uses: tj-actions/changed-files@v14.6

      - name: Check changed files
        uses: veceluxa/action-control-changes@v1.2
        with:
          changed-files: ${{steps.changed-files.outputs.all_modified_files}}
          nesting: 1

```
