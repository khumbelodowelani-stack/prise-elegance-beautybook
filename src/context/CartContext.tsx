import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Service } from '@/data/services';

export interface CartItem {
  service: Service;
  quantity: number;
  notes: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (service: Service, quantity?: number, notes?: string) => void;
  removeFromCart: (serviceId: string) => void;
  updateQuantity: (serviceId: string, quantity: number) => void;
  updateNotes: (serviceId: string, notes: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('prise-elegance-cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('prise-elegance-cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (service: Service, quantity = 1, notes = '') => {
    setItems((prev) => {
      const existing = prev.find((item) => item.service.id === service.id);
      if (existing) {
        return prev.map((item) =>
          item.service.id === service.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { service, quantity, notes }];
    });
  };

  const removeFromCart = (serviceId: string) => {
    setItems((prev) => prev.filter((item) => item.service.id !== serviceId));
  };

  const updateQuantity = (serviceId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(serviceId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.service.id === serviceId ? { ...item, quantity } : item
      )
    );
  };

  const updateNotes = (serviceId: string, notes: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.service.id === serviceId ? { ...item, notes } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalPrice = items.reduce(
    (sum, item) => sum + item.service.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateNotes,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
