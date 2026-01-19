import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, MessageCircle, ArrowLeft } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { CartItem } from '@/components/cart/CartItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/context/CartContext';

const WHATSAPP_NUMBER = '27000000000'; // Replace with actual number

const Cart = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const generateWhatsAppMessage = () => {
    let message = `🌟 *NEW BOOKING REQUEST*\n\n`;
    message += `👤 *Customer:* ${customerInfo.name}\n`;
    message += `📞 *Phone:* ${customerInfo.phone}\n`;
    message += `📅 *Preferred Date:* ${customerInfo.date}\n`;
    message += `⏰ *Preferred Time:* ${customerInfo.time}\n\n`;
    message += `────────────────\n`;
    message += `📋 *ORDER DETAILS*\n`;
    message += `────────────────\n\n`;

    items.forEach((item, index) => {
      message += `${index + 1}. *${item.service.name}*\n`;
      message += `   💰 R${item.service.price}`;
      if (item.service.priceMax) {
        message += ` – R${item.service.priceMax}`;
      }
      message += ` × ${item.quantity}\n`;
      if (item.notes) {
        message += `   📝 Notes: ${item.notes}\n`;
      }
      message += `\n`;
    });

    message += `────────────────\n`;
    message += `💵 *TOTAL: R${totalPrice}*\n`;
    message += `────────────────\n\n`;
    message += `Thank you for choosing Prise Elegance! 💅✨`;

    return encodeURIComponent(message);
  };

  const handleWhatsAppCheckout = () => {
    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const isFormValid =
    customerInfo.name && customerInfo.phone && customerInfo.date && customerInfo.time;

  if (items.length === 0) {
    return (
      <Layout>
        <section className="py-20">
          <div className="container">
            <div className="max-w-md mx-auto text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
              <h1 className="font-serif text-2xl font-bold mb-2">Your cart is empty</h1>
              <p className="text-muted-foreground mb-6">
                Browse our services and add your favorites to get started.
              </p>
              <Link to="/services">
                <Button>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Browse Services
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="bg-primary py-12">
        <div className="container">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground">
            Your Cart
          </h1>
          <p className="text-primary-foreground/80 mt-2">
            {items.length} item{items.length !== 1 ? 's' : ''} ready for booking
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <Link to="/services" className="text-sm text-muted-foreground hover:text-foreground flex items-center">
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Continue Shopping
                </Link>
                <Button variant="ghost" size="sm" onClick={clearCart} className="text-muted-foreground hover:text-destructive">
                  Clear Cart
                </Button>
              </div>

              {items.map((item) => (
                <CartItem key={item.service.id} item={item} />
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card border border-border rounded-lg p-6">
                <h2 className="font-serif text-xl font-semibold mb-6">Order Summary</h2>

                {/* Customer Details Form */}
                <div className="space-y-4 mb-6">
                  <div>
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      placeholder="e.g., 082 123 4567"
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="date">Preferred Date *</Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={customerInfo.date}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Preferred Time *</Label>
                      <Input
                        id="time"
                        name="time"
                        type="time"
                        value={customerInfo.time}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>R{totalPrice}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>R{totalPrice}</span>
                  </div>
                </div>

                {/* WhatsApp Checkout */}
                <Button
                  onClick={handleWhatsAppCheckout}
                  disabled={!isFormValid}
                  className="w-full mt-6 bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground"
                  size="lg"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Send Order on WhatsApp
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  You'll be redirected to WhatsApp to confirm your booking with us.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
