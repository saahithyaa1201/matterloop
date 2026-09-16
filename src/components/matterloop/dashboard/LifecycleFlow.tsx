// Added for HMR trigger
import { LifecycleStage } from "./dashboardData";

interface LifecycleFlowProps {
  selectedStage: LifecycleStage;
  onSelectStage: (stage: LifecycleStage) => void;
  onFilterByLifecycle: (stage: LifecycleStage) => void;
}

export function LifecycleFlow({ selectedStage, onSelectStage, onFilterByLifecycle }: LifecycleFlowProps) {
  return (
    <div className="rounded-2xl border border-[rgba(102,110,82,0.18)] bg-[#efece3]/50 p-6 flex flex-col items-center justify-center">
      <h3 className="text-base font-bold text-[#75553c]">Asset Lifecycle Flow</h3>
      <p className="mt-2 text-sm text-[#5d6250]">Lifecycle visualization is currently under construction.</p>
    </div>
  );
}
