# Scroll Craft Brief — Le’Charme Beauté Boutique
*Self-authored under explicit creative delegation (`do it`)*

## 1. Eight Core Brief Decisions

1. **Vibe (3–5 words) & Non-Web References**:
   - **Vibe**: *Tactile, sun-warmed, editorial, intimate, luminous.*
   - **References**:
     - *Peter Lindbergh bridal & portrait photography* (honest skin texture, natural daylight meets studio composure).
     - *Kinfolk / Cereal Magazine print spreads* (generous paper margins, asymmetric photo plates, folio numbers in the margin).
     - *Chanel Les Beiges / Dior Backstage ateliers* (warm sand, rosewood, espresso ink, light-temperature testing on real skin).

2. **The Scroll Journey (Section by Section)**:
   - **Act 1 — Recognition (The Atelier Open)**: Dimensional 4-plane hero where the bride/client sees real skin artistry in motion framed between architectural studio planes.
   - **Act 2 — Range (Curated Services Spread)**: Asymmetric editorial spread (dominant Bridal portrait on left, staggered Event & Editorial looks on right) replacing the generic 3-column template.
   - **Act 3 — Substance (The Quiet Atelier & Proven Track Record)**: Hard-cut deep espresso ground (`#332B24`) with quiet authority, an offset portrait frame, and verified studio figures ticking up once on entry.
   - **Act 4 — The Peak (Pinned Lookbook Exhibition Rail + Studio Light Loupe)**: A full-viewport pinned horizontal exhibition rail where vertical scroll glides laterally through real client portraits while the visitor controls the ambient lighting temperature (*Ceremony Daylight 5600K*, *Golden Hour 3800K*, *Reception Candlelight 2700K*).
   - **Act 5 — Confidence (The Chair Ritual & Client Voices)**: Clean typographic ledger of the three-step appointment flow paired with an editorial portrait testimonial showcase.
   - **Act 6 — Commitment (The Resolved Close)**: Architectural colophon spread with directional corner scrim, grounded photography, and a magnetic primary CTA leading straight to `/booking`.

3. **The Energy Curve**:
   - Opens with composed, tactile warmth (Act 1) → builds visual appetite across the asymmetric spread (Act 2) → drops into a quiet, grounded espresso room before the peak (Act 3) → expands into the widest, most interactive spatial moment on the page (Act 4 Peak) → settles into rhythmic clarity (Act 5) → resolves on a still, confident final frame (Act 6).

4. **The Feeling Curve & The Peak**:
   - `Act 1 — Intimacy`: 4-plane dimensional hero with foreground bridal detail overtaking the receding portrait film as display type reveals line by line.
   - `Act 2 — Appetite`: Asymmetric 7/5 editorial spread with `clip-path` wipe reveals (`reveal="up"`) and fine-pointer 3D `tilt`.
   - `Act 3 — Trust`: Hard cut to deep espresso ground (`#332B24`); quiet breathing room before the peak, with real studio counters (`count`) ticking up once on entry.
   - `Act 4 — Awe (THE PEAK)`: Pinned horizontal lookbook rail (`pan`, `3.2vh` span) paired with the interactive **Studio Light Loupe** that re-grades every portrait and the surrounding room for Daylight, Golden Hour, or Candlelight.
   - `Act 5 — Confidence`: Crisp hairlines expanding across the 3-step appointment ledger (`flow` + `in`) followed by editorial portrait reviews.
   - `Act 6 — Resolve`: Held final frame (`greet and hold`) with directional scrim and subtle pointer `magnet` on the booking action.
   - **The Peak Sentence**: *"You scroll through their bridal lookbook and switch the studio light bar between daylight, golden hour, and candlelight to see how the makeup actually holds up in every room of a wedding day."*
   - **The Tell-Someone Sentence**: *"It's the site where you test how bridal makeup looks under ceremony daylight, sunset, and reception candlelight while gliding sideways through their lookbook."*

5. **The Signature Move**:
   - **The Studio Light Loupe (`data-lc-light` Ambient Grader)**: A bespoke lighting temperature instrument (`5600K Daylight` · `3800K Golden Hour` · `2700K Candlelight`) built into the Lookbook Peak and Gallery page. Selecting a Kelvin preset smoothly interpolates CSS custom properties (`--lc-filter`, `--lc-stage-bg`, `--lc-stage-ink`, `--lc-halo`, `--lc-frame-border`) across all portraits and the surrounding exhibition stage, proving Le’Charme’s core value proposition: makeup engineered to look flawless in person and on camera under any lighting condition.

6. **Aesthetic Family**:
   - **Chaptered Editorial** with warm sand paper (`#F7F3EE`), pale alabaster (`#FFFDFA`), deep espresso (`#332B24`), and terracotta rosewood (`#B98267`).

7. **Structural Choice**:
   - **Distinct Editorial Chapters** (Hard cuts between paper and espresso grounds, folio margin coordinates, asymmetric spreads, and one pinned exhibition rail peak).

8. **Real Assets Used**:
   - Existing studio video (`/images/logo/1.MP4`), bridal & party portfolio photography (`/images/galley/bridal/...`, `/images/galley/party/...`, `/images/galley/photoshoot/...`, `/images/galley/gallery/1..55.jpg`), founder & artist portraits (`/images/logo/owner.jpg`, `/images/member/...`).

## 2. Score Table (Device Per Beat)

| Act | Beat | Device Family | Span | Why This Device |
|---|---|---|---|---|
| 1 | Recognition | `parallax` (4-plane hero) + `kinetic` (lines) | `1.15vh` | Immediate spatial depth from differential plane movement + clean line-mask headline reveal |
| 2 | Range | `reveal` (`clip-path` wipe) + `tilt` | `flow` | A wipe is a transformation of state; asymmetric 7/5 spread avoids the 3-equal-card template |
| 3 | Substance | `count` + `flow` (hard-cut dark ground) | `flow` | Quiet act before the peak; real studio figures tick up once on entry with `tabular-nums` |
| 4 | **The Peak** | `pan` (horizontal rail) + **Signature Move** | `3.2vh` | Largest scroll span on the page; lateral travel reads as a curated exhibition lookbook |
| 5 | Confidence | `flow` + `in` (staggered hairlines & reviews) | `flow` | Compresses administrative steps into crisp, readable rhythm after the pinned peak |
| 6 | Commitment | `reveal` + `magnet` (held close) | `1.0vh` | Directional corner scrim preserves photo luminosity; magnetic CTA responds to pointer presence |

