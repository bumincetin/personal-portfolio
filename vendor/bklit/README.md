# Bklit UI chart primitives

Source: https://github.com/bklit/bklit-ui (MIT; see LICENSE).
Retrieved September 14, 2026 from the public registries:

- https://bklit.com/r/pie-chart.json
- https://bklit.com/r/chart-animation.json
- https://bklit.com/r/utils.json

The pie chart, slice, context and required animation hooks live in
`src/app/components/ui/bklit/`; the class-name utility lives in `src/lib/utils.ts`.
Only primitives used by the allocation chart are included. The integration
provides stable asset ordering, the existing portfolio colors, a native table
with focusable asset controls, and static geometry for reduced motion.
