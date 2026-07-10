"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CosContext = createContext(null);

export function CosProvider({ children }) {
  const [cos, setCos] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("cos");
    if (saved) setCos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("cos", JSON.stringify(cos));
  }, [cos]);

  function adaugaInCos(produs, culoare = null, marime = null) {
    setCos(prev => {
      const key = `${produs.id}-${culoare}-${marime}`;
      const existent = prev.find(i => i.key === key);
      if (existent) {
        return prev.map(i => i.key === key ? { ...i, cantitate: i.cantitate + 1 } : i);
      }
      return [...prev, { key, produs, culoare, marime, cantitate: 1 }];
    });
  }

  function stergeItem(key) {
    setCos(prev => prev.filter(i => i.key !== key));
  }

  function actualizeazaCantitate(key, cantitate) {
    if (cantitate <= 0) return stergeItem(key);
    setCos(prev => prev.map(i => i.key === key ? { ...i, cantitate } : i));
  }

  function golesteCos() {
    setCos([]);
  }

  const total = cos.reduce((s, i) => s + i.produs.price * i.cantitate, 0);
  const numarArticole = cos.reduce((s, i) => s + i.cantitate, 0);

  return (
    <CosContext.Provider value={{ cos, adaugaInCos, stergeItem, actualizeazaCantitate, golesteCos, total, numarArticole }}>
      {children}
    </CosContext.Provider>
  );
}

export function useCos() {
  return useContext(CosContext);
}
