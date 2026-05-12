import { Card } from "@/components/ui/Card";

export function PracticalTips({
  tips,
  title = "Practical tips",
}: {
  tips?: string[];
  title?: string;
}) {
  if (!tips?.length) {
    return null;
  }

  return (
    <Card className="bg-[#fff9f0] p-6">
      <h2 className="text-xl font-semibold text-[#17313a]">{title}</h2>
      <ul className="mt-4 grid gap-3 text-sm leading-6 text-[#5c5044]">
        {tips.map((tip) => (
          <li key={tip} className="border-l-2 border-[#0b6f8f] pl-3">
            {tip}
          </li>
        ))}
      </ul>
    </Card>
  );
}
