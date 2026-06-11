import { ArrivalItem, ArrivalsResponse } from '../types';
import { Station } from '../data/stations';

/**
 * Servicio de Cliente API para consumir endpoints de tiempo real y traducción de Madrid PIDS
 */
export class PiDSApiClient {
  /**
   * Busca estaciones de metro y cercanías por texto.
   * El backend traduce y filtra las coincidencias para mantener la app ligera.
   * 
   * @param query - El término de búsqueda (ej. "Sol", "Cuatro Caminos")
   * @returns Listado de estaciones que coinciden con la búsqueda
   */
  static async searchStations(query: string): Promise<Station[]> {
    if (!query.trim()) {
      return [];
    }
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`Error en la búsqueda de estaciones: ${response.status}`);
      }
      const data = await response.json();
      return data.stations || [];
    } catch (error) {
      console.error('[PiDSApiClient] Error buscando estaciones:', error);
      return [];
    }
  }

  /**
   * Obtiene la guía de estaciones según la red seleccionada.
   * 
   * @param network - Tipo de red ('metro' | 'cercanias' | 'tren-ligero')
   * @returns Listado de estaciones liviano
   */
  static async getStations(network?: 'metro' | 'cercanias' | 'tren-ligero'): Promise<Station[]> {
    try {
      const url = network ? `/api/stations?network=${network}` : '/api/stations';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error al obtener estaciones: ${response.status}`);
      }
      const data = await response.json();
      return data.stations || [];
    } catch (error) {
      console.error('[PiDSApiClient] Error al obtener listado de estaciones:', error);
      return [];
    }
  }

  /**
   * Obtiene los tiempos de llegada en tiempo real de una parada específica.
   * Si la API en tiempo real falla, el backend implementa un fallback a simulación local de alta fidelidad.
   * 
   * @param stopId - El ID o nombre de la parada a consultar
   * @param forceMock - Si se fuerza la simulación manualmente sin consultar la API viva
   * @returns Respuesta completa con arribos, procedencia (live, simulated) y metadatos
   */
  static async getArrivals(stopId: string, forceMock: boolean): Promise<ArrivalsResponse> {
    try {
      const queryParams = new URLSearchParams({
        stopId: stopId.trim(),
        mock: forceMock ? 'true' : 'false'
      });
      const response = await fetch(`/api/arrivals?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error(`Código de respuesta HTTP ${response.status}`);
      }
      return await response.json();
    } catch (error: any) {
      console.error('[PiDSApiClient] Error al consultar los tiempos de llegada:', error);
      throw error;
    }
  }

  /**
   * Traduce un nombre legible o ID de entrada en un objeto Station oficial de Metro o Cercanías.
   * 
   * @param query - Entrada a traducir
   * @returns Estación que coincide o null si no se halla
   */
  static async translateStation(query: string): Promise<Station | null> {
    if (!query.trim()) {
      return null;
    }
    try {
      const response = await fetch(`/api/translate?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`Error al traducir estación: ${response.status}`);
      }
      const data = await response.json();
      return data.station || null;
    } catch (error) {
      console.error('[PiDSApiClient] Error traduciendo estación:', error);
      return null;
    }
  }

  /**
   * Registra un nuevo usuario en la API.
   */
  static async register(username: string, email: string, password: string): Promise<any> {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al registrarse.');
    }
    return data;
  }

  /**
   * Inicia sesión de un usuario en la API.
   */
  static async login(emailOrUsername: string, password: string): Promise<any> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailOrUsername, password })
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al iniciar sesión.');
    }
    return data;
  }

  /**
   * Sincroniza la información del usuario autenticado actual.
   */
  static async getMe(token: string): Promise<any> {
    const response = await fetch('/api/auth/me', {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${token}` 
      }
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al validar sesión.');
    }
    return data;
  }

  /**
   * Cambia la contraseña del usuario actual.
   */
  static async changePassword(token: string, currentPassword: string, newPassword: string): Promise<any> {
    const response = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ currentPassword, newPassword })
    });
    const data = await response.json();
    if (!response.ok || data.success === false) {
      throw new Error(data.message || 'Error al cambiar la contraseña.');
    }
    return data;
  }

  /**
   * Envía un mensaje al Agente conversacional de IA con historial.
   */
  static async postAiMessage(message: string, history: Array<{ role: string, content: string }>): Promise<string> {
    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history })
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al contactar con el agente de IA.');
    }
    return data.response;
  }

  /**
   * Obtiene un token de acceso a la sala de voz en directo de LiveKit.
   */
  static async getLiveKitToken(
    username: string, 
    customApiKey?: string, 
    customApiSecret?: string, 
    customWsUrl?: string
  ): Promise<any> {
    const response = await fetch('/api/livekit/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        username, 
        customApiKey, 
        customApiSecret, 
        customWsUrl 
      })
    });
    const data = await response.json();
    return data;
  }
}

