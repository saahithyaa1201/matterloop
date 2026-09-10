import { Switch } from "@/components/ui/switch";

interface CookieCategoryProps {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function CookieCategory({
  id,
  title,
  description,
  checked,
  onCheckedChange,
  disabled = false,
}: CookieCategoryProps) {
  return (
    <div className="flex flex-col gap-3 border-b border-border py-4 last:border-0">
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={id} className="font-medium text-foreground">
          {title}
        </label>
        <div className="flex items-center gap-3">
          {disabled ? (
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Always active
            </span>
          ) : (
            <span className="text-xs font-mono text-muted-foreground">
              [ {checked ? "ON" : "OFF"} ]
            </span>
          )}
          <Switch
            id={id}
            checked={checked}
            onCheckedChange={onCheckedChange}
            disabled={disabled}
            className="data-[state=checked]:bg-primary"
          />
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
