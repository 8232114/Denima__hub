import { useState, useEffect } from 'react'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Save, Settings } from 'lucide-react'

const OfferManagement = ({ API_BASE_URL, token }) => {
  const [offer, setOffer] = useState(null)
  const [availableProducts, setAvailableProducts] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchOffer()
    fetchAvailableProducts()
  }, [])

  const fetchOffer = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/offer`)
      if (response.ok) {
        const data = await response.json()
        setOffer(data)
        setSelectedProducts(data.products.map(p => p.id))
      }
    } catch (error) {
      console.error('Error fetching offer:', error)
    }
  }

  const fetchAvailableProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/offer/products/available`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setAvailableProducts(data)
      }
    } catch (error) {
      console.error('Error fetching available products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch(`${API_BASE_URL}/offer`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          is_active: offer.is_active,
          price: offer.price,
          whatsapp_message: offer.whatsapp_message,
          product_ids: selectedProducts
        })
      })

      if (response.ok) {
        alert('تم حفظ إعدادات العرض بنجاح!')
        fetchOffer() // Refresh data
      } else {
        alert('حدث خطأ أثناء حفظ الإعدادات')
      }
    } catch (error) {
      console.error('Error saving offer:', error)
      alert('حدث خطأ أثناء حفظ الإعدادات')
    } finally {
      setSaving(false)
    }
  }

  const handleProductToggle = (productId) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId)
      } else {
        return [...prev, productId]
      }
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>جاري تحميل إعدادات العرض...</p>
        </div>
      </div>
    )
  }

  if (!offer) {
    return (
      <div className="text-center p-8">
        <p>لم يتم العثور على إعدادات العرض</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold">إدارة العروض</h2>
      </div>

      {/* Offer Status */}
      <Card>
        <CardHeader>
          <CardTitle>حالة العرض</CardTitle>
          <CardDescription>تفعيل أو تعطيل العرض التفاعلي</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Switch
              checked={offer.is_active}
              onCheckedChange={(checked) => setOffer(prev => ({ ...prev, is_active: checked }))}
            />
            <Label htmlFor="offer-status">
              {offer.is_active ? 'العرض مفعل' : 'العرض معطل'}
            </Label>
          </div>
          {!offer.is_active && (
            <p className="text-sm text-gray-600 mt-2">
              عند تعطيل العرض، سيظهر للمستخدمين رسالة "عذرًا، العرض غير متوفر حاليًا"
            </p>
          )}
        </CardContent>
      </Card>

      {/* Offer Price */}
      <Card>
        <CardHeader>
          <CardTitle>سعر العرض</CardTitle>
          <CardDescription>السعر الثابت للثلاثة منتجات</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={offer.price}
              onChange={(e) => setOffer(prev => ({ ...prev, price: e.target.value }))}
              className="w-32"
            />
            <span>درهم</span>
          </div>
        </CardContent>
      </Card>

      {/* Product Selection */}
      <Card>
        <CardHeader>
          <CardTitle>المنتجات المعروضة</CardTitle>
          <CardDescription>اختر المنتجات التي ستظهر في العرض التفاعلي</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableProducts.map((product) => (
              <div
                key={product.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedProducts.includes(product.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleProductToggle(product.id)}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleProductToggle(product.id)}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600 font-bold">{product.price} درهم</span>
                      <span className="text-gray-400 line-through text-sm">{product.original_price}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-4">
            المنتجات المحددة: {selectedProducts.length} منتج
          </p>
        </CardContent>
      </Card>

      {/* WhatsApp Message */}
      <Card>
        <CardHeader>
          <CardTitle>رسالة واتساب</CardTitle>
          <CardDescription>
            النص الذي سيتم إرساله عبر واتساب عند طلب العرض
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={offer.whatsapp_message}
            onChange={(e) => setOffer(prev => ({ ...prev, whatsapp_message: e.target.value }))}
            rows={6}
            className="w-full"
            placeholder="اكتب رسالة واتساب..."
          />
          <div className="mt-2 text-sm text-gray-600">
            <p>يمكنك استخدام المتغيرات التالية:</p>
            <ul className="list-disc list-inside mt-1">
              <li><code>{'{products}'}</code> - قائمة المنتجات المختارة</li>
              <li><code>{'{price}'}</code> - السعر الإجمالي</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
        </Button>
      </div>
    </div>
  )
}

export default OfferManagement

