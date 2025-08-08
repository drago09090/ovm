"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCard } from "@/components/ui/metric-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { CreditCard, Users, DollarSign, Activity, AlertTriangle, TrendingUp } from "lucide-react"

const activationsData = [
  { day: "Lun", activations: 45 },
  { day: "Mar", activations: 52 },
  { day: "Mié", activations: 38 },
  { day: "Jue", activations: 61 },
  { day: "Vie", activations: 55 },
  { day: "Sáb", activations: 42 },
  { day: "Dom", activations: 35 },
]

const warehouseData = [
  { name: "Almacén Central", value: 1200, color: "#3b82f6" },
  { name: "Almacén Norte", value: 800, color: "#10b981" },
  { name: "Almacén Sur", value: 600, color: "#f59e0b" },
  { name: "Almacén Este", value: 400, color: "#ef4444" },
]

const recentTransactions = [
  { id: "TXN001", user: "Carlos López", type: "Activación", amount: "$25.00", status: "Completado", time: "10:30 AM" },
  { id: "TXN002", user: "María García", type: "Recarga", amount: "$15.00", status: "Completado", time: "10:25 AM" },
  { id: "TXN003", user: "Juan Pérez", type: "Activación", amount: "$30.00", status: "Pendiente", time: "10:20 AM" },
  { id: "TXN004", user: "Ana Rodríguez", type: "Recarga", amount: "$20.00", status: "Fallido", time: "10:15 AM" },
  { id: "TXN005", user: "Luis Martín", type: "Activación", amount: "$25.00", status: "Completado", time: "10:10 AM" },
]

export function SuperadminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Superadmin</h1>
          <p className="text-gray-600">Resumen general del sistema OMV</p>
        </div>
        <Button>
          <TrendingUp className="mr-2 h-4 w-4" />
          Generar Reporte
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total SIMs" value="15,847" change="+12%" changeType="positive" icon={CreditCard} />
        <MetricCard title="Usuarios Activos" value="2,341" change="+8%" changeType="positive" icon={Users} />
        <MetricCard title="Transacciones Hoy" value="1,234" change="+23%" changeType="positive" icon={Activity} />
        <MetricCard title="Ingresos Totales" value="$45,231" change="+15%" changeType="positive" icon={DollarSign} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activations Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Activaciones por Día (Últimos 7 días)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activationsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="activations" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Warehouse Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución de SIMs por Almacén</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={warehouseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {warehouseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transacciones Recientes</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="alerts">Alertas</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transacciones Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Hora</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{transaction.user}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            transaction.status === "Completado"
                              ? "default"
                              : transaction.status === "Pendiente"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Estado de Webhooks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <span>3 webhooks fallidos en las últimas 24 horas</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alertas del Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 p-2 bg-yellow-50 rounded">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Stock bajo en Almacén Norte (menos de 100 SIMs)</span>
                </div>
                <div className="flex items-center space-x-2 p-2 bg-red-50 rounded">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <span className="text-sm">Fallo en webhook de activación - requiere atención</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
