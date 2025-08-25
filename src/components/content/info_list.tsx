// [TODO] - Ajeitar alinhamento dos items se necessário

interface InfoItem {
  label: string;
  value: string;
}

interface InfoListProps {
  items: InfoItem[];
}

export default function InfoList({ items }: InfoListProps) {
  return (
    <dl className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <span className="w-2 h-2 bg-black rounded-full mr-3 flex-shrink-0"></span>
          <dt className="font-semibold mr-2 min-w-fit">{item.label}:</dt>
          <dd className="font-normal">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}