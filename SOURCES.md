# Body Atlas 3.2 — sources and provenance

Edited 21 September 2026. This package continues the user-supplied Body Atlas project.

## Supplied material

- AppNest / Barak Aflalo Body Atlas Hebrew v2 application, associated point and meridian JSON, Hebrew enrichment layer and original import report.
- TARA Acupoints Ontology: supplied point records, names, traditional indications, location descriptions and WHO page references. Source data was retained and enriched with regional learning context. The supplied import report states that a redistribution license was not found. Public redistribution requires checking the applicable terms.
- Supplied Reflexology-Map: the 57 labels and numbering are retained; the drawings and explanatory paragraphs are new. Check the source map's terms before public distribution.
- The original acuSim portraits and meridian/reflexology bitmap graphics have been replaced in the active interface and are not shipped as release assets.

## Primary references consulted

- [WHO Standard Acupuncture Point Locations, 2008](https://iris.who.int/handle/10665/353407) — standard location reference. Per-point page numbers come from the supplied dataset, not an independent revalidation of every location.
- [WHO standardized acupuncture nomenclature](https://www.who.int/publications/i/item/9290611057) — the 361 classical point names.
- [NCCIH: Acupuncture](https://www.nccih.nih.gov/health/acupuncture-what-you-need-to-know) — clinical evidence and the distinction between standardized point descriptions and proven effectiveness.
- [NCCIH: Reflexology](https://www.nccih.nih.gov/health/reflexology) — traditional associations and limits of evidence.
- [Memorial Sloan Kettering: Acupressure for nausea and vomiting](https://www.mskcc.org/cancer-care/patient-education/acupressure-nausea-and-vomiting) — concise PC 6 patient guidance.
- [Memorial Sloan Kettering: Acupressure for pain and headaches](https://www.mskcc.org/cancer-care/patient-education/acupressure-pain-and-headaches) — concise LI 4 patient guidance and pregnancy caution.
- [NCI / SEER: Anatomy and physiology](https://training.seer.cancer.gov/anatomy/) — regional and organ-system context, including the [central nervous system](https://training.seer.cancer.gov/anatomy/nervous/organization/cns.html), [heart](https://training.seer.cancer.gov/anatomy/cardiovascular/heart/), [urinary components](https://training.seer.cancer.gov/anatomy/urinary/components/), [joints](https://training.seer.cancer.gov/anatomy/skeletal/articulations.html) and [lymphatic components](https://training.seer.cancer.gov/anatomy/lymphatic/components/).

## New visuals

Twenty-four raster illustrations were created using the built-in ImageGen tool. They provide general anatomical context and are not clinically validated location maps. The lymph-flow illustration is a conceptual SVG. Four interactive foot views and fourteen meridian overview diagrams are new code-based SVG illustrations.

No external image collection was scraped. No claim is made that a traditional channel is an anatomical vessel or nerve, or that a reflexology association diagnoses the corresponding organ.


## Version 3.1: point-specific learning layer

All 361 records now have manually authored schematic coordinates on 21 native SVG surfaces. The supplied placement2d/placement3d arrays contained no verified point placements. No prior portrait coordinates were projected onto the new raster art. Coordinates are educational relative positions and have not been clinically validated. Landmark terms are translated from the supplied anatomicalRegions field.

- SI 2 and SI 3 had the SI 1 WHO description duplicated in the supplied record. English and Hebrew display text and landmark lists were corrected using indexed excerpts from [WHO pages 88–89](https://iris.who.int/bitstream/handle/10665/353407/9789290613831-eng.pdf?sequence=1). These are edited summaries, not verbatim quotations. Direct full-PDF retrieval was blocked; no full-book review is claimed.
- [WHO library record](https://library.wpro.who.int/bib/11227) confirms the 2008 publication.
- [NCI / SEER anatomical terminology](https://training.seer.cancer.gov/anatomy/body/terminology.html) supports the direction glossary.
- Source alternatives are explicitly identified for LI 19, LI 20, PC 8, PC 9, GB 30 and GV 26. GV 26 Hebrew text was aligned to the primary location shown, with the former alternative preserved in its note.
- PC 6 and LI 4 patient guidance was compared with the MSK pages linked above. This does not validate diagram pixels.

The searchable review-register.html lists each source page, landmark set, schematic view and review limitation. A qualified practitioner still needs to review anatomy, translations and placements before professional clinical teaching.

## Version 3.2: linked landmarks and adaptive learning

The supplied descriptions underpin the 361 new reading aids: 146 point entries receive authored focused explanations and 215 use record-specific level, measure or landmark comparisons. These are editorial learning aids, not practitioner review. All 1,131 landmark references resolve to hand-authored schematic highlights. Regions, reference lines and projected structures are labelled as such; the shapes do not establish anatomical boundaries or clinical coordinates. No new raster illustrations were generated in 3.2.

Focused checks used indexed excerpts of the [WHO location standard](https://iris.who.int/bitstream/handle/10665/353407/9789290613831-eng.pdf?sequence=1): LI 19/20 (p. 43), PC 8 (p. 155), PC 9 (p. 156), GB 29/30 context (p. 186), TE 5/6 (p. 160) and TE 9 (p. 162). Five alternative descriptions and three interosseous-space labels were checked. GB 29 was reviewed as context for the line construction, not counted as an independently checked record. Direct PDF access still failed; no complete book audit is claimed. GV 26 remains grounded in the supplied primary/alternative descriptions, without a new external check.

The imported “Interosseous Muscle Of Autopod” label on TE 5, TE 6 and TE 9 was inconsistent with the supplied location text and indexed WHO description. It is replaced by “Interosseous Space” between radius and ulna. Foot metatarsal labels were inspected and retained; no foot-bone correction is claimed.

The new hip diagram is an abstract reference-line teaching view. GB 29 is placed at the ASIS–greater-trochanter midpoint; the two GB 30 definitions use separate lines from the greater trochanter. PC 9 switches surface for its nail-corner alternative. All new positions and highlights remain pending qualified review.

Practice intervals of 1, 3, 7 and 14 days are application heuristics, not a clinically validated learning protocol. Only local learning counters, review dates and the resumable round are stored. The review handoff files explicitly retain pending status for all 361 records.


## Version 3.3 — 22 September 2026

215 remaining template-derived teaching notes were manually rewritten in Hebrew and English from the supplied primary location descriptions. Existing paired comparison notes were retained. The new prose is editorial explanation, not independent clinical validation.

Six SVG projections were expanded with selected bones and soft structures. No new raster images were generated in this release. No source images were copied. Reference checks: [NCI/SEER appendicular skeleton](https://training.seer.cancer.gov/anatomy/skeletal/divisions/appendicular.html) for skeletal groups and counts; [Olewnik et al., 2020](https://pubmed.ncbi.nlm.nih.gov/31031151/) for the commonly observed fibularis brevis attachment at the fifth metatarsal base and its documented variation. The latter abstract was read; the full article was not independently reviewed. Supplemental anatomy text was consulted through NCBI Bookshelf for ankle, talus, pelvis and orbital relationships. These sources do not validate acupuncture-marker coordinates.

SP 19 source conflict: the supplied note names ST 6 in a third-intercostal-space comparison. The same code appeared in the indexed [WHO page 79 excerpt](https://iris.who.int/bitstream/handle/10665/353407/9789290613831-eng.pdf?sequence=1). It is therefore not labelled an import-only error. ST 16 is used for learning comparison as an editorial inference from the supplied primary descriptions of SP 19 and ST 16; professional confirmation remains pending. Raw source text is preserved.

Thirteen schematic marker adjustments are recorded with previous and current coordinates in alignment-review.json. LU 11 and HT 9 now use dorsal views so their nail references are visible. None is described as a clinician-approved point location.

ST 19 display excerpt omits the procedure-related second note. The complete supplied source record remains in atlas-data.js and clinical-review.csv for audit provenance.
