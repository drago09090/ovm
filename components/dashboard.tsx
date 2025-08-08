"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"
import { SuperadminDashboard } from "@/components/dashboards/superadmin-dashboard"
import { AdminDashboard } from "@/components/dashboards/admin-dashboard"
import { OperatorDashboard } from "@/components/dashboards/operator-dashboard"
import { UserManagement } from "@/components/modules/user-management"
import { SimManagement } from "@/components/modules/sim-management"
import { CustomerManagement } from "@/components/modules/customer-management"
import { TicketSystem } from "@/components/modules/ticket-system"
import { BalanceSystem } from "@/components/modules/balance-system"
import { Reports } from "@/components/modules/reports"
import { ActivationsModule } from "@/components/modules/activations-module"
import { PlansOffersModule } from "@/components/modules/plans-offers-module"
import { BillingModule } from "@/components/modules/billing-module"
import { WarehouseModule } from "@/components/modules/warehouse-module"
import { SettingsModule } from "@/components/modules/settings-module"
import { WebhookLogsModule } from "@/components/modules/webhook-logs-module"

export type UserRole = "superadmin" | "admin" | "gerente" | "operator" | "subdistributor" | "vendor"
export type ActiveView = 
  | "dashboard" 
  | "activations" 
  | "recharges" 
  | "plans-offers"
  | "customers" 
  | "lines"
  | "sims" 
  | "warehouse"
  | "balance" 
  | "billing"
  | "transactions"
  | "tickets" 
  | "reports"
  | "users" 
  | "settings"
  | "webhook-logs"

export function Dashboard() {
  const [activeView, setActiveView] = useState<ActiveView>("dashboard")
  const [userRole] = useState<UserRole>("superadmin") // This would come from auth context
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const handleNavigation = (view: string) => {
    setActiveView(view as ActiveView)
  }

  const renderMainContent = () => {
    switch (activeView) {
      case "dashboard":
        switch (userRole) {
          case "superadmin":
            return <SuperadminDashboard />
          case "admin":
          case "gerente":
            return <AdminDashboard role={userRole} />
          case "operator":
          case "subdistributor":
          case "vendor":
            return <OperatorDashboard role={userRole} />
          default:
            return <SuperadminDashboard />
        }
      case "activations":
      case "recharges":
        return <ActivationsModule type={activeView} userRole={userRole} />
      case "plans-offers":
        return <PlansOffersModule userRole={userRole} />
      case "customers":
        return <CustomerManagement userRole={userRole} />
      case "lines":
        return <CustomerManagement userRole={userRole} activeTab="lines" />
      case "sims":
        return <SimManagement userRole={userRole} />
      case "warehouse":
        return <WarehouseModule userRole={userRole} />
      case "balance":
        return <BalanceSystem userRole={userRole} />
      case "billing":
      case "transactions":
        return <BillingModule type={activeView} userRole={userRole} />
      case "tickets":
        return <TicketSystem userRole={userRole} />
      case "reports":
        return <Reports userRole={userRole} />
      case "users":
        return <UserManagement userRole={userRole} />
      case "settings":
        return <SettingsModule userRole={userRole} />
      case "webhook-logs":
        return <WebhookLogsModule userRole={userRole} />
      default:
        return <SuperadminDashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        userRole={userRole}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar 
          userRole={userRole} 
          sidebarCollapsed={sidebarCollapsed} 
          setSidebarCollapsed={setSidebarCollapsed}
          onNavigate={handleNavigation}
        />
        <main className="flex-1 overflow-auto bg-gray-50">{renderMainContent()}</main>
      </div>
    </div>
  )
}
