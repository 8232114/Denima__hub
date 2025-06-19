import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, RotateCcw } from 'lucide-react'

const OffersSection = ({ services, API_BASE_URL }) => {
  const [selectedProducts, setSelectedProducts] = useState([])
  const [offer, setOffer] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOffer()
  }, [])

  const fetchOffer = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/offer`)
      if (response.ok) {
        const data = await response.json()
        setOffer(data)
      }
    } catch (error) {
      console.error('Error fetching offer:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleProductSelect = (product) => {
    if (!offer?.is_active) {
      alert('عذرًا، العرض غير متوفر حاليًا.')
      return
    }

    if (selectedProducts.length >= 3) {
      alert('يمكنك اختيار 3 منتجات فقط')
      return
    }

    if (selectedProducts.find(p => p.id === product.id)) {
      alert('تم اختيار هذا المنتج مسبقاً')
      return
    }

    setSelectedProducts([...selectedProducts, product])
  }

  const handleRemoveProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId))
  }

  const handleReset = () => {
    setSelectedProducts([])
  }

  const handleWhatsAppOrder = () => {
    if (selectedProducts.length !== 3) {
      alert('يجب اختيار 3 منتجات بالضبط')
      return
    }

    const productNames = selectedProducts.map(p => `• ${p.name}`).join('\n')
    let message = offer.whatsapp_message || 'مرحبًا 👋\nأود طلب عرض المنتجات التالية:\n\n{products}\n\nالمجموع: {price} درهم\n\nشكرًا لك 🙏'
    
    message = message.replace('{products}', productNames)
    message = message.replace('{price}', offer.price || '200')

    const whatsappUrl = `https://api.whatsapp.com/send/?phone=212633785269&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`
    window.open(whatsappUrl, '_blank')
  }

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p>جاري تحميل العروض...</p>
          </div>
        </div>
      </section>
    )
  }

  // Don't show the section if offer is not active or no products are selected for the offer
  if (!offer?.is_active || !offer?.products || offer.products.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            عروض خاصة - اختر 3 منتجات 🔥
          </h2>
          <p className="text-xl text-gray-700 mb-6">
            اختر أي 3 منتجات من مجموعتنا واحصل عليها بسعر مميز
          </p>
          <div className="inline-block bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg">
            💰 {offer.price || '200'} درهم فقط للثلاثة منتجات 💰
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Selection Area */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-orange-200">
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">منتجاتك المختارة</h3>
            
            <div className="space-y-4 mb-6">
              {[0, 1, 2].map((index) => (
                <div key={index} className="flex items-center gap-4 p-4 border-2 border-dashed border-gray-300 rounded-lg min-h-[80px]">
                  {selectedProducts[index] ? (
                    <div className="flex items-center gap-4 w-full">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                        {selectedProducts[index].name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{selectedProducts[index].name}</h4>
                        <p className="text-sm text-gray-600">{selectedProducts[index].description}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveProduct(selectedProducts[index].id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4 w-full text-gray-400">
                      <div className="w-12 h-12 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                        <Plus className="w-6 h-6" />
                      </div>
                      <span>اختر منتج</span>
                      {index < 2 && <span className="ml-auto text-2xl">+</span>}
                      {index === 2 && <span className="ml-auto text-2xl">=</span>}
                    </div>
                  )}
                  {index < 2 && selectedProducts[index] && <span className="text-2xl text-orange-500 font-bold">+</span>}
                  {index === 2 && selectedProducts[index] && <span className="text-2xl text-green-500 font-bold">=</span>}
                </div>
              ))}
            </div>

            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-green-600 mb-2">المجموع:</div>
              <div className="text-4xl font-bold text-green-600">{offer.price || '200'} درهم</div>
            </div>

            <div className="flex gap-4">
              {selectedProducts.length === 3 ? (
                <Button
                  onClick={handleWhatsAppOrder}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-bold rounded-xl shadow-lg"
                >
                  اطلب الآن عبر واتساب 📱
                </Button>
              ) : (
                <Button
                  disabled
                  className="flex-1 bg-gray-300 text-gray-500 py-3 text-lg font-bold rounded-xl cursor-not-allowed"
                >
                  اختر 3 منتجات أخرى
                </Button>
              )}
              
              {selectedProducts.length > 0 && (
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="px-6 py-3 rounded-xl"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  إعادة تعيين
                </Button>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">اختر من المنتجات المتاحة</h3>
            <div className="grid grid-cols-2 gap-4">
              {offer.products.map((product) => (
                <Card
                  key={product.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                    selectedProducts.find(p => p.id === product.id)
                      ? 'ring-2 ring-orange-500 bg-orange-50'
                      : 'hover:shadow-xl'
                  } ${!offer.is_active ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => handleProductSelect(product)}
                >
                  <CardHeader className="text-center pb-2">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mb-3">
                      {product.name.charAt(0)}
                    </div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OffersSection

