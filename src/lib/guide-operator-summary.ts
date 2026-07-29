export type GuideOperatorSummaryInput = {
  status: string;
  subject: string;
  mode: string;
  counts?: Record<string, number>;
  reportPath?: string | null;
  rerunCommand?: string | null;
};

export function buildGuideOperatorSummary(input: GuideOperatorSummaryInput): string[] {
  return [
    `status: ${input.status}`,
    `subject: ${input.subject}`,
    `mode: ${input.mode}`,
    ...Object.entries(input.counts ?? {}).map(([key, value]) => `${key}: ${value}`),
    ...(input.reportPath ? [`report: ${input.reportPath}`] : []),
    ...(input.rerunCommand ? [`rerun: ${input.rerunCommand}`] : []),
  ];
}
