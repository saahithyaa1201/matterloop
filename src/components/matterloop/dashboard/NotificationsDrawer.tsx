import {
  Bell,
  X,
  CheckCheck,
  AlertTriangle,
  Wrench,
  Activity,
  Layers,
  Sparkles,
} from "lucide-react";
import { NotificationItem } from "./dashboardData";

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onSelectAssetById: (id: string) => void;
}

export function NotificationsDrawer({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onSelectAssetById,
}: NotificationsDrawerProps) {
  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getCategoryIcon = (cat: NotificationItem["category"]) => {
    switch (cat) {
      case "Alert":
        return <AlertTriangle className="h-4 w-4 text-coral" />;
      case "Maintenance":
        return <Wrench className="h-4 w-4 text-amber" />;
      case "Lifecycle":
        return <Layers className="h-4 w-4 text-cyan" />;
      default:
        return <Sparkles className="h-4 w-4 text-green" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      <div className="flex-1" onClick={onClose} />

      <div className="relative h-full w-full max-w-md overflow-y-auto border-l border-border bg-card p-6 shadow-2xl backdrop-blur-2xl">
        <div className="flex items-center justify-between border-b border-border/70 pb-4">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-cyan" />
            <h3 className="font-bold text-base text-foreground">
              Operations Dispatch Log
            </h3>
            {unreadCount > 0 && (
              <span className="rounded-full bg-coral px-2 py-0.2 font-mono text-[10px] font-bold text-white">
                {unreadCount} new
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-border/80 p-1.5 text-muted-foreground hover:border-cyan/50 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {unreadCount > 0 && (
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={onMarkAllAsRead}
              className="inline-flex items-center gap-1 font-mono text-[10px] text-cyan hover:underline cursor-pointer"
            >
              <CheckCheck className="h-3 w-3" />
              Mark all as read
            </button>
          </div>
        )}

        {/* List */}
        <div className="mt-4 space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                onMarkAsRead(n.id);
                if (n.assetId) {
                  onSelectAssetById(n.assetId);
                  onClose();
                }
              }}
              className={`group rounded-xl border p-3.5 transition-all cursor-pointer ${
                n.read
                  ? "border-border/60 bg-surface/30 opacity-75"
                  : "border-cyan/40 bg-cyan/5 shadow-xs"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{getCategoryIcon(n.category)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-xs text-foreground truncate">
                      {n.title}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground shrink-0">
                      {n.timestamp}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {n.description}
                  </p>
                  {n.assetId && (
                    <div className="mt-2 text-[10px] font-mono text-cyan group-hover:underline">
                      Inspect {n.assetId} &rarr;
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
