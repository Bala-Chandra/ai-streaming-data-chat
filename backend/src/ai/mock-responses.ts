export interface MockAiResponse {
  id: number;
  name: string;
  content: string;
}

export const MOCK_RESPONSES: MockAiResponse[] = [
  {
    id: 1,
    name: 'Phase 3 compounds',
    content: `{"query":"SELECT sd.compound_name, dim.highest_phase_trial, dim.therapeutic_area FROM structure_details sd JOIN drug_information_master dim ON sd.gvk_id = dim.gvk_id WHERE LOWER(dim.highest_phase_trial) = LOWER('Phase 3') LIMIT 25","fetch_all":true}

## Phase 3 Clinical Trial Analysis

The search identified several compounds currently associated with Phase 3 clinical development.

The results span multiple therapeutic areas including oncology, cardiovascular disease, metabolic disorders, and inflammatory conditions.

| Compound | Phase | Therapeutic Area |
| --- | --- | --- |
| Compound Alpha | Phase 3 | Oncology |
| Compound Beta | Phase 3 | Cardiovascular |
| Compound Gamma | Phase 3 | Metabolic |
| Compound Delta | Phase 3 | Immunology |
| Compound Epsilon | Phase 3 | Oncology |

These results indicate that late-stage development activity is distributed across several major therapeutic categories.

### Interpretation

Oncology represents a significant portion of the returned compounds, although the dataset also demonstrates substantial late-stage development in cardiovascular and metabolic indications.

The result should be interpreted as a snapshot of the available database records rather than a complete representation of all global clinical development activity.`,
  },

  {
    id: 2,
    name: 'Activity datapoints',
    content: `{"query":"SELECT COUNT(DISTINCT activity_id) AS activity_count FROM activity_data WHERE standard_value IS NOT NULL","fetch_all":true}

## Activity Dataset Summary

The analysis identified **315,572 distinct activity datapoints** with standardized activity measurements.

Activity measurements include several commonly reported experimental endpoints.

| Activity Type | Datapoints | Percentage |
| --- | ---: | ---: |
| IC50 | 128450 | 40.7 |
| Ki | 74210 | 23.5 |
| EC50 | 63842 | 20.2 |
| Kd | 27140 | 8.6 |
| Other | 21930 | 7.0 |

### Observations

IC50 measurements account for the largest portion of the dataset.

Ki and EC50 measurements together represent another substantial fraction of available experimental activity.

The long tail of other activity types includes inhibition percentages, functional assay measurements, binding measurements, and assay-specific endpoints.

### Data Quality Consideration

Activity values originating from different assays should not automatically be considered directly comparable. Experimental protocol, organism, target construct, measurement units and assay methodology can influence the reported value.`,
  },

  {
    id: 3,
    name: 'Multiple tables',
    content: `{"query":"SELECT therapeutic_area, target_family, COUNT(*) AS compound_count FROM compound_target_summary GROUP BY therapeutic_area, target_family ORDER BY compound_count DESC","fetch_all":true}

# Compound and Target Landscape

The analysis examined the relationship between therapeutic areas and major target families.

## Therapeutic Area Distribution

| Therapeutic Area | Compounds |
| --- | ---: |
| Oncology | 1842 |
| Neurology | 1135 |
| Cardiovascular | 978 |
| Immunology | 864 |
| Metabolic | 721 |

Oncology contains the largest number of associated compounds in this dataset.

However, compound count alone should not be interpreted as evidence that one therapeutic area has greater clinical success.

## Target Family Distribution

A second aggregation was performed across molecular target families.

| Target Family | Targets | Compounds |
| --- | ---: | ---: |
| GPCR | 418 | 3251 |
| Kinase | 367 | 2984 |
| Ion Channel | 221 | 1432 |
| Nuclear Receptor | 96 | 876 |
| Protease | 184 | 742 |

GPCRs and kinases account for a substantial portion of compound-target relationships.

## Combined Interpretation

The two tables describe different dimensions of the same dataset.

The first table describes **where compounds are being investigated therapeutically**, while the second describes **the molecular target classes against which compounds have been studied**.

Consequently, the counts should not be directly compared between the two tables.`,
  },
];