import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getCustomerOrdersByEmail } from '@/lib/shopify'
import { Download, Package, Calendar, DollarSign } from 'lucide-react'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect('/api/auth/signin?callbackUrl=/dashboard')
  }

  // Get orders from Shopify
  const orders = await getCustomerOrdersByEmail(session.user.email)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container max-w-screen-xl px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-display text-4xl font-bold mb-2">My Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {session.user.name || session.user.email}
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl border bg-card">
            <Package className="h-8 w-8 text-primary mb-3" />
            <div className="text-2xl font-bold">{orders.length}</div>
            <div className="text-sm text-muted-foreground">Total Orders</div>
          </div>
          <div className="p-6 rounded-2xl border bg-card">
            <Download className="h-8 w-8 text-primary mb-3" />
            <div className="text-2xl font-bold">
              {orders.reduce((acc, o) => acc + o.lineItems.length, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Designs Purchased</div>
          </div>
          <div className="p-6 rounded-2xl border bg-card">
            <DollarSign className="h-8 w-8 text-primary mb-3" />
            <div className="text-2xl font-bold">
              $
              {orders
                .reduce((acc, o) => acc + parseFloat(o.totalPrice), 0)
                .toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground">Total Spent</div>
          </div>
        </div>

        {/* Orders */}
        <div>
          <h2 className="font-display text-2xl font-bold mb-6">Order History</h2>

          {orders.length === 0 ? (
            <div className="text-center p-12 rounded-2xl border bg-card">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">No orders yet</h3>
              <p className="text-muted-foreground mb-6">
                Start creating amazing sticker designs
              </p>
              <Link
                href="/generator"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow transition-all hover:bg-primary/90"
              >
                Generate Design
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="p-6 rounded-2xl border bg-card">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">Order #{order.orderNumber}</h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            order.financialStatus === 'paid'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {order.financialStatus}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          {order.totalPrice} {order.currencyCode}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Line Items */}
                  <div className="space-y-3">
                    {order.lineItems.map((item, i) => {
                      const designId = item.customAttributes.find(
                        (a) => a.key === 'design_id'
                      )?.value

                      return (
                        <div
                          key={i}
                          className="flex items-center justify-between p-4 rounded-xl bg-muted/50"
                        >
                          <div>
                            <div className="font-medium">{item.title}</div>
                            {item.variantTitle && (
                              <div className="text-sm text-muted-foreground">
                                {item.variantTitle}
                              </div>
                            )}
                          </div>
                          {designId && order.financialStatus === 'paid' && (
                            <Link
                              href={`/design/${designId}`}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all"
                            >
                              <Download className="h-4 w-4" />
                              Download
                            </Link>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
