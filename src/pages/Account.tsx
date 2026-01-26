import { BottomNav } from "@/components/BottomNav";
import { User, Moon, Sun, Monitor, Bell, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

type AppearanceMode = "light" | "dark" | "auto";

const Account = () => {
  const [appearance, setAppearance] = useState<AppearanceMode>("auto");

  const appearanceOptions = [
    { id: "light" as AppearanceMode, label: "Light", icon: Sun },
    { id: "dark" as AppearanceMode, label: "Dark", icon: Moon },
    { id: "auto" as AppearanceMode, label: "Auto", icon: Monitor },
  ];

  return (
    <div className="min-h-screen bg-background pb-40">
      {/* Header */}
      <header className="px-5 pt-14 pb-6">
        <h1 className="text-3xl font-extrabold text-foreground">Account</h1>
        <p className="text-muted-foreground font-medium mt-1">
          Manage your settings
        </p>
      </header>

      <main className="px-5 space-y-6">
        {/* Profile Section */}
        <section className="p-4 rounded-2xl bg-card shadow-soft">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary-light">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Profile</h3>
              <p className="text-sm text-muted-foreground">Profile settings coming soon</p>
            </div>
          </div>
        </section>

        {/* Appearance Section */}
        <section className="p-4 rounded-2xl bg-card shadow-soft">
          <h3 className="font-bold text-foreground mb-3">Appearance</h3>
          <div className="flex gap-2">
            {appearanceOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = appearance === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => setAppearance(option.id)}
                  className={cn(
                    "flex-1 flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200",
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-medium"
                      : "bg-secondary hover:bg-secondary/80"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Notifications Section */}
        <section className="p-4 rounded-2xl bg-card shadow-soft">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary-light">
              <Bell className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Notifications</h3>
              <p className="text-sm text-muted-foreground">Notification settings coming soon</p>
            </div>
          </div>
        </section>

        {/* Data Section */}
        <section className="p-4 rounded-2xl bg-card shadow-soft">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary-light">
              <Download className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Data</h3>
              <p className="text-sm text-muted-foreground">Export and backup coming soon</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center pt-8 pb-4">
          <p className="text-sm text-muted-foreground">Pillo v1.0.0</p>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
            This app is for tracking purposes only. Always consult your healthcare provider for medical advice.
          </p>
        </footer>
      </main>

      <BottomNav />
    </div>
  );
};

export default Account;
