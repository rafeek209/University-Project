import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
}

interface DashboardNavProps {
  items: NavItem[];
  title?: string;
  logo?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function DashboardNav({
  items,
  title = "PathPort",
  logo,
  footer,
  className,
}: DashboardNavProps) {
  const location = useLocation();

  return (
    <aside className={cn("fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col", className)}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
        {logo || (
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">U</span>
          </div>
        )}
        <div>
          <h1 className="font-bold text-lg gradient-text">{title}</h1>
          <p className="text-xs text-muted-foreground">Smart Campus System</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                isActive ? "nav-item-active" : "nav-item"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/20 text-primary">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {footer && (
        <div className="p-4 border-t border-sidebar-border">
          {footer}
        </div>
      )}
    </aside>
  );
}
