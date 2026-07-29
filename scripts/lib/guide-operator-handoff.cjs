function formatPreviewList(values, limit = 3) {
  if (!values?.length) return null;
  return values.slice(0, limit).join(", ");
}

function printGuideOperatorHandoff(input) {
  const {
    status,
    subject,
    mode,
    counts,
    reportPath,
    headline,
    samples = [],
  } = input;

  console.log("operator handoff");
  console.log(`- status: ${status}`);
  console.log(`- subject: ${subject}`);
  if (mode) console.log(`- mode: ${mode}`);
  if (headline) console.log(`- headline: ${headline}`);
  if (counts) {
    for (const [key, value] of Object.entries(counts)) {
      console.log(`- ${key}: ${value}`);
    }
  }
  if (reportPath) {
    console.log(`- report: ${reportPath}`);
  }
  for (const sample of samples) {
    const preview = formatPreviewList(sample.values, sample.limit);
    if (!preview) continue;
    console.log(`- ${sample.label}: ${preview}`);
  }
}

module.exports = {
  printGuideOperatorHandoff,
};
