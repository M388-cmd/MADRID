import React, { useState, useEffect, useRef } from 'react';
import { 
  RefreshCw, 
  MapPin, 
  AlertCircle, 
  Play, 
  Pause, 
  Database, 
  Sliders, 
  Search, 
  Wifi, 
  Battery, 
  ChevronRight,
  Info,
  Train,
  Bus,
  Settings,
  Compass,
  Gamepad2,
  BookOpen,
  Headphones,
  PlaySquare,
  Route,
  AlertTriangle,
  HelpCircle,
  Eye,
  EyeOff,
  Activity,
  Map,
  Moon,
  Home,
  ExternalLink,
  Sparkles,
  User,
  Lock,
  Mail,
  LogOut,
  MessageSquare,
  Mic,
  Send,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ArrivalItem, ArrivalsResponse } from './types';
import { PiDSApiClient } from './services/api';
import { LiveKitVoiceAssistant } from './components/LiveKitVoiceAssistant';
import { STATIONS_DB, normalizeText, Station } from './data/stations';

// Catálogo de Traducción de la App (Bilingüe Español / Inglés)
export const TRANSLATIONS = {
  es: {
    languageName: 'Español',
    welcomeTitle: 'Sistema de Información en Tiempo Real',
    welcomeSub: 'Accede a los horarios en vivo de Metro, Cercanías y Tren Ligero de Madrid',
    selectLanguage: 'Selecciona tu Idioma:',
    selectStartStation: 'Estación de Inicio para Viajar:',
    startJourney: 'Iniciar Sintonizador de Viaje',
    changeLanguage: 'Cambiar Idioma',
    crt_title: 'CONSORCIO REGIONAL DE TRANSPORTES',
    pids_desc: 'Madrid Transit Realtime Passenger Information Display System (PIDS)',
    system_online: 'SISTEMA ONLINE (MADRID)',
    local_sim: 'SIMULADOR LOCAL',
    stop_code_label: 'Código de Parada',
    sync_label: 'Sinc',
    tab_title_home: 'Inicio',
    tab_title_arrivals: 'Estación actual',
    tab_title_route: 'Estructura de línea',
    tab_title_nearby: 'Estaciones cercanas',
    tab_title_settings: 'Ajustes de pantalla',
    tab_header_home: 'Menú de Inicio',
    tab_header_arrivals: 'Próximos Trenes',
    tab_header_route: 'Siguientes Estaciones',
    tab_header_nearby: 'Estaciones Cercanas',
    tab_header_settings: 'Configuraciones',
    polling_autorefresh: 'Auto-Refresco CRTM',
    polling_paused: 'POLLING PAUSADO',
    updating_in: 'Actualizando en',
    btn_renew: 'Renovar',
    btn_sinc: 'Sinc...',
    search_placeholder: 'Buscar p. ej. Sol, Atocha, Cuatro Caminos...',
    search_heading: 'Buscador Inteligente de Estaciones',
    search_tip: 'Busca una estación para obtener llegadas reales.',
    nearby_heading: 'Estaciones Cercanas en Madrid',
    nearby_desc: 'Acceso directo a las estaciones más transitadas de la zona centro.',
    geolocate_btn: 'Localizar cerca de mí',
    geolocate_error: 'Error de ubicación',
    preset_header: 'Sintonizar Parada Destacada',
    quick_tune: 'Sintonizador rápido:',
    no_arrivals: 'Sin Arribos Reportados',
    no_arrivals_desc: 'No se registran vehículos de transporte público circulando en este perímetro.',
    platform_direction: 'Andén Sentido',
    prev_terminal: 'A terminal',
    prev_retorno: 'Retorno',
    entering_station: 'Va a efectuar la entrada en la estación',
    next_train_en: 'Próximo tren',
    subsequent_train: 'Siguiente',
    status_now: 'AHORA',
    status_normal: 'NORMAL',
    spectrum_header: 'Espectro de Recorrido',
    spectrum_desc: 'Visualización continua de las próximas paradas programadas para el tren en andén partiendo de',
    dynamic_route: 'Recorrido dinámico',
    at_platform: 'En andén',
    tuned_line: '(Sintonizada)',
    network_tuning: 'Sintonía de Red',
    data_feed: 'Alimentación de Datos',
    real_api: 'API Real',
    simulator_mode: 'Simulador',
    polling_interval: 'Frecuencia de Polling',
    polling_desc: 'La cuenta regresiva se ejecuta cada 15 SEGUNDOS para renovar la estimación de arribos de Madrid sin consumo redundante.',
    oled_visuals: 'Visualización OLED',
    brightness_intensity: 'Intensidad de Brillo Crónico',
    brightness_high: 'Fuerte Brillo',
    brightness_dim: 'Atenuado',
    scanlines_effect: 'Efecto Dot Matrix (CRT)',
    scanlines_desc: 'Muestra líneas analógicas clásicas de panel.',
    manual_tuning_label: 'Establecer parada por su código:',
    manual_tuning_placeholder: 'Ej. 124, 500, 1615',
    btn_tune: 'Sintonizar',
    incidents_tab: 'Estado de Incidencias',
    incident_l2_title: 'L2: Obras Canal - Quevedo',
    incident_l2_desc: 'Los trenes circulan con regulación de velocidad en el trayecto norte. Esperas de hasta 2 min de retraso regular.',
    incident_cercanias: 'Cercanías Renfe: Normalidad',
    incident_cercanias_desc: 'Todas las líneas de Renfe Cercanías operan sin incidencias asignadas en este momento.',
    help_center: 'Centro de Atención',
    help_center_desc: 'Para consultas sobre objetos perdidos, tarifas de abono transporte o sugerencias sobre el consocio de transportes de Madrid.',
    btn_official_web: 'Web Oficial CRTM',
    technical_diagnostics: 'Diagnóstico Técnico',
    pids_control_panel: 'Pánel de Control de la App',
    pids_control_panel_desc: 'Cambia la sección seleccionada en el menú inferior del smartphone o desde esta botonera directa:',
    btn_pids_control_home: 'Inicio',
    btn_pids_control_next: 'Próximos Trenes',
    btn_pids_control_line: 'Siguientes Estaciones',
    btn_pids_control_nearby: 'Estaciones Cercanas',
    btn_pids_control_config: 'Configuración',
    btn_pids_control_more: 'Información Adicional',
    sintonizador_rapido_title: 'Sintonizador Rápido de Paradas',
    choose_network_filter: 'Filtrar por Red de Transportes',
    network_filter_all: 'Todas las redes',
    network_filter_metro: 'Metro Madrid',
    network_filter_cercanias: 'Cercanías Renfe',
    network_filter_tren_ligero: 'Tren Ligero',
    view_all_stations: 'Ver Todo el Directorio de Red',
    all_stations_desc: 'Consulta todos los códigos ID oficiales de las estaciones para sintonizarlas.',
    metro_network_ids: 'IDs de la Red de Metro',
    loading_directory: 'Cargando directorio...',
    search_any_station: 'Cualquier estación de Madrid',
    search_to_begin: 'Escribe para buscar...',
    simulated_pids_screen: 'Pantalla PIDS Simulada',
    simulated_pids_desc: 'Esta pantalla OLED virtual emula en tiempo real un monitor de andén del Consorcio de Transportes de Madrid (CRTM). Cambia las paradas para sintonizar arribos locales.',
    filter_by_line_direction: 'Filtrar por Línea / Dirección',
    filter_all_lines: 'Todas las líneas de esta parada',
    filter_only_line: 'Filtrar solo',
    simulation_mode_alert: 'Modo Simulado',
    sim_alert_desc: 'Estás viendo estimaciones realistas basadas en frecuencias estándar de paso porque has seleccionado el Simulador o no hay conexión.',
    home_welcome: '¡Bienvenido a Madrid Transit PIDS!',
    home_desc: 'Configura tus preferencias y selecciona tu estación para comenzar la simulación de tiempo real o consulta en vivo.',
    footer_text: 'Diseñado para visualización OLED de alta precisión. Consorcio Regional de Transportes de Madrid.',
    tab_nav_home: 'Inicio',
    tab_nav_next: 'Próximos',
    tab_nav_line: 'Línea',
    tab_nav_nearby: 'Cercanas',
    tab_nav_config: 'Config',
    tab_nav_more: 'Viaje',
    tab_nav_maps: 'Buscar',
    tab_title_more: 'Entretenimiento',
    tab_title_maps: 'Google Maps',
    tab_header_more: 'Tu Viaje',
    tab_header_maps: 'Ruta Externa',
    maps_google_desc: 'Establece tu destino para abrir Google Maps con la ruta más óptima.',
    maps_google_btn: 'Abrir Google Maps',
    maps_google_origin: 'Tu ubicación',
    travel_music: 'Música',
    travel_music_desc: 'Música para el trayecto',
    travel_book: 'Leer',
    travel_book_desc: 'Biblioteca en ruta',
    travel_game: 'Jugar',
    travel_game_desc: 'Minijuegos de andén',
    play_now: 'Jugar Ahora',
    explore_library: 'Explorar Biblioteca',
    diagnostic_platform: 'Plataforma: Madrid CRT Web Client',
    diagnostic_nginx: 'Nginx Entry Ingress: Activo',
    diagnostic_gzip: 'Módulo de Compresión: Gzip enabled',
    diagnostic_dpr: 'Device Pixel Ratio: HighDPI',
    diagnostic_oled: 'OLED Protection: Configurada',
    no_matches_for: 'Sin coincidencias para',
    swipe_to_update: 'Deslizar para actualizar',
    syncing_loader: 'Sincronizando...',
    system_notice: 'Aviso del Sistema',
    active_incidents: 'Incidencias Activas de Red',
    cercanias_normal: 'Cercanías Renfe: Normalidad',
    cercanias_normal_desc: 'Todas las líneas de Renfe Cercanías operan sin incidencias asignadas en este momento.',
    official_crtm_web_btn: 'Web Oficial CRTM',
  },
  en: {
    languageName: 'English',
    welcomeTitle: 'Real-time Information System',
    welcomeSub: 'Access live timetables for Metro, Cercanías and Light Rail in Madrid',
    selectLanguage: 'Select your Language:',
    selectStartStation: 'Start Station for Travelling:',
    startJourney: 'Launch Journey Board',
    changeLanguage: 'Change Language',
    crt_title: 'REGIONAL TRANSPORT CONSORTIUM',
    pids_desc: 'Madrid Transit Realtime Passenger Information Display System (PIDS)',
    system_online: 'SYSTEM ONLINE (MADRID)',
    local_sim: 'LOCAL SIMULATOR',
    stop_code_label: 'Stop Code',
    sync_label: 'Sync',
    tab_title_home: 'Start',
    tab_title_arrivals: 'Current station',
    tab_title_route: 'Line structure',
    tab_title_nearby: 'Nearby stations',
    tab_title_settings: 'Display settings',
    tab_header_home: 'Start Menu',
    tab_header_arrivals: 'Next Trains',
    tab_header_route: 'Next Stations',
    tab_header_nearby: 'Nearby Stations',
    tab_header_settings: 'Configurations',
    polling_autorefresh: 'Auto-Refresh CRTM',
    polling_paused: 'POLLING PAUSED',
    updating_in: 'Updating in',
    btn_renew: 'Refresh',
    btn_sinc: 'Syncing...',
    search_placeholder: 'Search e.g. Sol, Atocha, Cuatro Caminos...',
    search_heading: 'Smart Station Search',
    search_tip: 'Search a station to get real-time arrivals.',
    nearby_heading: 'Nearby Stations in Madrid',
    nearby_desc: 'Quick access to the busiest stations in the downtown area.',
    geolocate_btn: 'Find nearest to me',
    geolocate_error: 'Location error',
    preset_header: 'Tune Featured Stop',
    quick_tune: 'Quick tune:',
    no_arrivals: 'No Arrivals Reported',
    no_arrivals_desc: 'No public transit vehicles registered circulating in this perimeter.',
    platform_direction: 'Platform Direction',
    prev_terminal: 'To Terminal',
    prev_retorno: 'Return',
    entering_station: 'Train entering the platform',
    next_train_en: 'Next train',
    subsequent_train: 'Following',
    status_now: 'NOW',
    status_normal: 'NORMAL',
    spectrum_header: 'Route Spectrum',
    spectrum_desc: 'Continuous visualization of the next scheduled stops for the train on the platform from',
    dynamic_route: 'Dynamic journey',
    at_platform: 'At platform',
    tuned_line: '(Tuned)',
    network_tuning: 'Network Tuning',
    data_feed: 'Data Feed',
    real_api: 'Real API',
    simulator_mode: 'Simulator',
    polling_interval: 'Polling Frequency',
    polling_desc: 'The countdown runs every 15 SECONDS to refresh the Madrid arrival estimate without redundant calls.',
    oled_visuals: 'OLED Display',
    brightness_intensity: 'Continuous Brightness Intensity',
    brightness_high: 'Strong Brightness',
    brightness_dim: 'Dimmed',
    scanlines_effect: 'Dot Matrix Effect (CRT)',
    scanlines_desc: 'Show classic analog panel lines.',
    manual_tuning_label: 'Set stop by its code:',
    manual_tuning_placeholder: 'E.g. 124, 500, 1615',
    btn_tune: 'Tune',
    incidents_tab: 'Alerts & Service Status',
    incident_l2_title: 'L2: Works Canal - Quevedo',
    incident_l2_desc: 'Trains run with speed regulation in the north sector. Delays up to 2 min.',
    incident_cercanias: 'Cercanías Renfe: Normal service',
    incident_cercanias_desc: 'All Renfe Cercanías lines are operating without incidents at this moment.',
    help_center: 'Customer Help Center',
    help_center_desc: 'For queries about lost property, transit pass fares or suggestions on the Madrid Regional Transport Consortium.',
    btn_official_web: 'Official CRTM Web',
    technical_diagnostics: 'Technical Diagnostics',
    pids_control_panel: 'App Control Panel',
    pids_control_panel_desc: 'Change the selected section on the smartphone bottom menu or from this direct control panel:',
    btn_pids_control_home: 'Start',
    btn_pids_control_next: 'Next Trains',
    btn_pids_control_line: 'Next Stations',
    btn_pids_control_nearby: 'Nearby Stations',
    btn_pids_control_config: 'Configuration',
    btn_pids_control_more: 'Additional Info',
    sintonizador_rapido_title: 'Quick Stop Tuner',
    choose_network_filter: 'Filter by Transit Network',
    network_filter_all: 'All networks',
    network_filter_metro: 'Metro Madrid',
    network_filter_cercanias: 'Cercanías Renfe',
    network_filter_tren_ligero: 'Light Rail',
    view_all_stations: 'View Complete Network Directory',
    all_stations_desc: 'Browse all official station ID codes to tune them in the simulator.',
    metro_network_ids: 'Metro Network IDs',
    loading_directory: 'Loading directory...',
    search_any_station: 'Any Madrid station',
    search_to_begin: 'Type to search...',
    simulated_pids_screen: 'Simulated PIDS Screen',
    simulated_pids_desc: 'This virtual OLED screen emulates in real-time a platform monitor of the Madrid Transport Consortium (CRTM). Change stops to tune local arrivals.',
    filter_by_line_direction: 'Filter by Line / Direction',
    filter_all_lines: 'All lines of this stop',
    filter_only_line: 'Filter only',
    simulation_mode_alert: 'Simulated Mode',
    sim_alert_desc: 'You are seeing realistic estimates based on standard frequencies because you selected the Simulator or there is no active connection.',
    home_welcome: 'Welcome to Madrid Transit PIDS!',
    home_desc: 'Configure your preferences and select your station to start the real-time simulation or live consulting.',
    footer_text: 'Designed for high priority OLED display. Regional Transport Consortium of Madrid.',
    tab_nav_home: 'Start',
    tab_nav_next: 'Next',
    tab_nav_line: 'Line',
    tab_nav_nearby: 'Nearby',
    tab_nav_config: 'Config',
    tab_nav_more: 'Travel',
    tab_nav_maps: 'Search',
    tab_title_more: 'Entertainment',
    tab_title_maps: 'Google Maps',
    tab_header_more: 'Your Trip',
    tab_header_maps: 'External Route',
    maps_google_desc: 'Set your destination to open Google Maps with the optimal route.',
    maps_google_btn: 'Open Google Maps',
    maps_google_origin: 'Your location',
    travel_music: 'Music',
    travel_music_desc: 'Music for your trip',
    travel_book: 'Read',
    travel_book_desc: 'On-route library',
    travel_game: 'Play',
    travel_game_desc: 'Platform minigames',
    play_now: 'Play Now',
    explore_library: 'Explore Library',
    diagnostic_platform: 'Platform: Madrid CRT Web Client',
    diagnostic_nginx: 'Nginx Entry Ingress: Active',
    diagnostic_gzip: 'Compression Module: Gzip enabled',
    diagnostic_dpr: 'Device Pixel Ratio: HighDPI',
    diagnostic_oled: 'OLED Protection: Configured',
    no_matches_for: 'No matches for',
    swipe_to_update: 'Swipe to update',
    syncing_loader: 'Syncing...',
    system_notice: 'System Notice',
    active_incidents: 'Active Network Alerts',
    cercanias_normal: 'Cercanías Renfe: Normal Operations',
    cercanias_normal_desc: 'All Renfe Cercanías lines are running on schedule without active alerts.',
    official_crtm_web_btn: 'Official CRTM Web Services',
  },
  fr: {
    languageName: 'Français',
    welcomeTitle: 'Système d\'Information en Temps Réel',
    welcomeSub: 'Accédez aux horaires en direct du métro, Cercanías et métro léger à Madrid',
    selectLanguage: 'Sélectionnez votre langue :',
    selectStartStation: 'Station de départ :',
    startJourney: 'Démarrer le simulateur',
    changeLanguage: 'Changer de langue',
    crt_title: 'CONSORTIUM RÉGIONAL DES TRANSPORTS',
    pids_desc: 'Madrid Transit Realtime Passenger Information Display System (PIDS)',
    system_online: 'SYSTÈME EN LIGNE (MADRID)',
    local_sim: 'SIMULATEUR LOCAL',
    stop_code_label: 'Code d\'arrêt',
    sync_label: 'Sync',
    tab_title_home: 'Accueil',
    tab_title_arrivals: 'Station actuelle',
    tab_title_route: 'Structure de ligne',
    tab_title_nearby: 'Stations à proximité',
    tab_title_settings: 'Paramètres d\'affichage',
    tab_header_home: 'Menu Principal',
    tab_header_arrivals: 'Prochains Trains',
    tab_header_route: 'Prochaines Stations',
    tab_header_nearby: 'Stations à Proximité',
    tab_header_settings: 'Configurations',
    polling_autorefresh: 'Auto-Rafraîchissement',
    polling_paused: 'ACTUALISATION PAUSE',
    updating_in: 'Mise à jour dans',
    btn_renew: 'Rafraîchir',
    btn_sinc: 'Sync...',
    search_placeholder: 'Rechercher ex. Sol, Atocha, Cuatro Caminos...',
    search_heading: 'Recherche Intelligente De Stations',
    search_tip: 'Recherchez une station pour des arrivées en temps réel.',
    nearby_heading: 'Stations à proximité de Madrid',
    nearby_desc: 'Accès rapide aux stations les plus fréquentées du centre.',
    geolocate_btn: 'Trouver proche de moi',
    geolocate_error: 'Erreur de localisation',
    preset_header: 'Régler arrêt important',
    quick_tune: 'Arrêt rapide :',
    no_arrivals: 'Aucune arrivée',
    no_arrivals_desc: 'Aucun véhicule de transport en commun détecté.',
    platform_direction: 'Voie Direction',
    prev_terminal: 'Vers Terminal',
    prev_retorno: 'Retour',
    entering_station: 'Va entrer en gare',
    next_train_en: 'Prochain train',
    subsequent_train: 'Suivant',
    status_now: 'MAINTENANT',
    status_normal: 'NORMAL',
    spectrum_header: 'Spectre du parcours',
    spectrum_desc: 'Visualisation continue des prochains arrêts pour le train.',
    dynamic_route: 'Parcours dynamique',
    at_platform: 'À quai',
    tuned_line: '(Sélectionnée)',
    network_tuning: 'Réglage Réseau',
    data_feed: 'Flux de données',
    real_api: 'API Réelle',
    simulator_mode: 'Simulateur',
    polling_interval: 'Fréquence de Polling',
    polling_desc: 'Le compte à rebours s\'exécute toutes les 15 SECONDES.',
    oled_visuals: 'Affichage OLED',
    brightness_intensity: 'Intensité luminosité',
    brightness_high: 'Haute',
    brightness_dim: 'Atténuée',
    scanlines_effect: 'Effet Dot Matrix (CRT)',
    scanlines_desc: 'Affiche des lignes analogiques.',
    manual_tuning_label: 'Définir arrêt par code :',
    manual_tuning_placeholder: 'Ex. 124, 500, 1615',
    btn_tune: 'Valider',
    incidents_tab: 'État du service',
    incident_l2_title: 'L2 : Travaux',
    incident_l2_desc: 'Trains avec régulation de vitesse secteur nord. Retards 2 min.',
    incident_cercanias: 'Cercanías Renfe : Trafic normal',
    incident_cercanias_desc: 'Toutes les lignes de Cercanías circulent normalement.',
    help_center: 'Centre de soutien',
    help_center_desc: 'Pour des questions sur les objets perdus ou abonnements.',
    btn_official_web: 'Web Officiel CRTM',
    technical_diagnostics: 'Diagnostics Techniques',
    pids_control_panel: 'Panneau de Contrôle',
    pids_control_panel_desc: 'Changez de section via ces boutons directs :',
    btn_pids_control_home: 'Accueil',
    btn_pids_control_next: 'Prochains Trains',
    btn_pids_control_line: 'Prochaines Stations',
    btn_pids_control_nearby: 'Stations à Proximité',
    btn_pids_control_config: 'Configuration',
    btn_pids_control_more: 'Info Sup',
    sintonizador_rapido_title: 'Recherche Rapide',
    choose_network_filter: 'Filtrer par réseau',
    network_filter_all: 'Tous les réseaux',
    network_filter_metro: 'Metro Madrid',
    network_filter_cercanias: 'Cercanías Renfe',
    network_filter_tren_ligero: 'Métro léger',
    view_all_stations: 'Voir le répertoire',
    all_stations_desc: 'Consultez les ID des gares.',
    metro_network_ids: 'IDs du réseau Métro',
    loading_directory: 'Chargement...',
    search_any_station: 'Gare de Madrid',
    search_to_begin: 'Rechercher...',
    simulated_pids_screen: 'Écran PIDS Simulé',
    simulated_pids_desc: 'Émule un moniteur de quai CRT en temps réel.',
    filter_by_line_direction: 'Filtrer par Ligne',
    filter_all_lines: 'Toutes les lignes',
    filter_only_line: 'Filtrer',
    simulation_mode_alert: 'Mode Simulation',
    sim_alert_desc: 'Estimations réalistes basées sur la fréquence.',
    home_welcome: 'Bienvenue sur PIDS !',
    home_desc: 'Sélectionnez un arrêt.',
    footer_text: 'Conçu pour l\'affichage OLED.',
    tab_nav_home: 'Accueil',
    tab_nav_next: 'Gare',
    tab_nav_line: 'Ligne',
    tab_nav_nearby: 'Proche',
    tab_nav_config: 'Config',
    tab_nav_more: 'Voyage',
    tab_nav_maps: 'Rech.',
    tab_title_more: 'Divertissement',
    tab_title_maps: 'Google Maps',
    tab_header_more: 'Ton voyage',
    tab_header_maps: 'Route externe',
    maps_google_desc: 'Affichez votre itinéraire dans Maps.',
    maps_google_btn: 'Google Maps',
    maps_google_origin: 'Votre position',
    travel_music: 'Musique',
    travel_music_desc: 'Musique de voyage',
    travel_book: 'Lire',
    travel_book_desc: 'Bibliothèque locale',
    travel_game: 'Jouer',
    travel_game_desc: 'Mini-jeux',
    play_now: 'Jouer',
    explore_library: 'Découvrir',
    diagnostic_platform: 'Plateforme Web',
    diagnostic_nginx: 'Nginx : Actif',
    diagnostic_gzip: 'Compression: on',
    diagnostic_dpr: 'Résolution: HighDPI',
    diagnostic_oled: 'OLED Protection: on',
    no_matches_for: 'Aucun résultat',
    swipe_to_update: 'Glisser rafraîchir',
    syncing_loader: 'Synchro...',
    system_notice: 'Notification Système',
    active_incidents: 'Incidents actifs',
    cercanias_normal: 'Cercanías: Normal',
    cercanias_normal_desc: 'Toutes les lignes normales.',
    official_crtm_web_btn: 'Service Officiel CRTM',
  }
};

// Selección de estaciones preconfiguradas del Consorcio de Transportes de Madrid (CRTM)
const PRESET_STOPS = [
  { id: '4-325', name: 'Cuatro Caminos (Metro L1,L2,L6)', type: 'metro' },
  { id: '5-18001', name: 'Atocha Cercanías (Renfe)', type: 'cercanias' },
  { id: '1615', name: 'Sol (Metro L1,L2,L3)', type: 'metro' },
  { id: '5-18002', name: 'Sol (Renfe Cercanías)', type: 'cercanias' }
];

// Mapeo estático de Siguientes Estaciones (Líneas reales de Madrid)
const STATION_LINE_LIST: Record<string, { line: string, stops: string[], color: string }[]> = {
  '4-325': [
    { line: 'L2 (Rosa)', stops: ['Cuatro Caminos', 'Canal', 'Quevedo', 'San Bernardo', 'Noviciado', 'Santo Domingo', 'Ópera', 'Sol', 'Sevilla', 'Banco de España'], color: '#E21F1F' },
    { line: 'L6 (Circular)', stops: ['Cuatro Caminos', 'Nuevos Ministerios', 'República Argentina', 'Avenida de América', 'Diego de León', 'Manuel Becerra'], color: '#9B9B9B' }
  ],
  '4-118': [
    { line: 'L2 (Rosa)', stops: ['Banco de España', 'Sevilla', 'Sol', 'Ópera', 'Santo Domingo', 'Noviciado', 'San Bernardo', 'Quevedo', 'Canal', 'Cuatro Caminos'], color: '#E21F1F' }
  ],
  '5-18001': [
    { line: 'C1 (Cercanías)', stops: ['Atocha', 'Recoletos', 'Nuevos Ministerios', 'Chamartín', 'Fuente de la Mora', 'Aeropuerto T4'], color: '#32A5DF' },
    { line: 'C4 (Cercanías)', stops: ['Atocha', 'Sol', 'Nuevos Ministerios', 'Chamartín', 'Fuencarral', 'Cantoblanco'], color: '#0153A0' }
  ],
  '1615': [
    { line: 'L1 (Azul)', stops: ['Sol', 'Gran Vía', 'Tribunal', 'Bilbao', 'Iglesia', 'Ríos Rosas', 'Cuatro Caminos', 'Alvarado', 'Estrecho', 'Plaza de Castilla'], color: '#0076C0' },
    { line: 'L2 (Rosa)', stops: ['Sol', 'Sevilla', 'Banco de España', 'Retiro', 'Príncipe de Vergara', 'Manuel Becerra', 'Ventas'], color: '#E21F1F' }
  ]
};

// Paradas cercanas simuladas
const NEARBY_STOPS_LIST = [
  { id: '4-325', name: 'Cuatro Caminos (Conexión L2/L6)', dist: 'A pie (60m)', type: 'metro' },
  { id: '4-118', name: 'Banco de España (L2 Centro)', dist: 'A pie (240m)', type: 'metro' },
  { id: '5-18001', name: 'Atocha Cercanías (Trenes C1-C10)', dist: 'A pie (500m)', type: 'train' },
  { id: '1615', name: 'Sol - Puerta del Sol', dist: 'A pie (850m)', type: 'metro' },
  { id: '4-105', name: 'Guzmán el Bueno (L6)', dist: 'A pie (980m)', type: 'metro' },
  { id: '124', name: 'Alonso Martínez (L4/L5)', dist: 'A pie (1.2 km)', type: 'metro' }
];

function TicTacToeGame() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  
  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6],            // diags
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(cell => cell !== null);

  const handleClick = (i: number) => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="grid grid-cols-3 gap-2 w-48 h-48 mb-6">
         {board.map((cell, i) => (
           <div 
             key={i} 
             onClick={() => handleClick(i)}
             className="bg-black border border-[#1A1A1A] rounded-xl flex items-center justify-center cursor-pointer text-4xl font-black transition-colors select-none hover:border-[#333]"
             style={{ color: cell === 'X' ? '#0076C0' : cell === 'O' ? '#E11283' : 'inherit' }}
           >
             {cell}
           </div>
         ))}
      </div>
      {winner ? (
        <div className="text-center space-y-3">
          <p className="text-sm text-white uppercase font-bold tracking-widest">¡<span style={{ color: winner === 'X' ? '#0076C0' : '#E11283' }}>{winner}</span> HA GANADO!</p>
          <button onClick={resetGame} className="text-xs bg-[#1A1A1A] text-white px-4 py-2 rounded-lg font-bold uppercase hover:bg-[#333]">Jugar de nuevo</button>
        </div>
      ) : isDraw ? (
        <div className="text-center space-y-3">
          <p className="text-sm text-white uppercase font-bold tracking-widest">¡EMPATE!</p>
          <button onClick={resetGame} className="text-xs bg-[#1A1A1A] text-white px-4 py-2 rounded-lg font-bold uppercase hover:bg-[#333]">Jugar de nuevo</button>
        </div>
      ) : (
        <p className="text-xs text-[#71717A] uppercase font-bold tracking-widest">Tu turno: <span style={{ color: xIsNext ? '#0076C0' : '#E11283' }}>{xIsNext ? 'X' : 'O'}</span></p>
      )}
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<'es' | 'en' | 'fr'>('es');
  const t = TRANSLATIONS[lang];

  // --- ESTADOS DE AUTENTICACIÓN CENTRAL ---
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!localStorage.getItem('pids_token'));
  const [currentUser, setCurrentUser] = useState<{ id: string; username: string; email: string } | null>(null);
  const [authChecking, setAuthChecking] = useState<boolean>(true);
  const [isGuestMode, setIsGuestMode] = useState<boolean>(() => localStorage.getItem('pids_guest') === 'true');
  const [authFormTab, setAuthFormTab] = useState<'login' | 'register'>('login');
  const [authFields, setAuthFields] = useState({ username: '', email: '', password: '' });
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [authError, _setAuthError] = useState<string | null>(null);
  const setAuthError = (val: any) => {
    if (typeof val === 'function') {
      _setAuthError(val);
      return;
    }
    if (val === null || val === undefined) {
      _setAuthError(null);
    } else if (typeof val === 'object') {
      const msg = val.message || val.error || JSON.stringify(val);
      _setAuthError(typeof msg === 'object' ? JSON.stringify(msg) : String(msg));
    } else {
      _setAuthError(String(val));
    }
  };

  // --- ESTADO ADICIONAL DE CAMBIO DE CONTRASEÑA ---
  const [showChangePassModal, setShowChangePassModal] = useState<boolean>(false);
  const [changePassForm, setChangePassForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [changePassLoading, setChangePassLoading] = useState<boolean>(false);
  const [changePassErrors, _setChangePassErrors] = useState<string | null>(null);
  const setChangePassErrors = (val: any) => {
    if (typeof val === 'function') {
      _setChangePassErrors(val);
      return;
    }
    if (val === null || val === undefined) {
      _setChangePassErrors(null);
    } else if (typeof val === 'object') {
      const msg = val.message || val.error || JSON.stringify(val);
      _setChangePassErrors(typeof msg === 'object' ? JSON.stringify(msg) : String(msg));
    } else {
      _setChangePassErrors(String(val));
    }
  };
  const [changePassSuccess, setChangePassSuccess] = useState<string | null>(null);

  // --- ESTADOS DE LA SESIÓN DE IA ---
  const [aiMessages, setAiMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([
    { role: 'assistant', content: '📊 **Instantiating Multi-Modal AgentSession...**\n* ¡Hola! Soy tu asistente de Inteligencia Artificial para el Consorcio de Transportes de Madrid.\n\n*He sido conectado con los siguientes parámetros:*\n- 🗣️ **STT**: `deepgram/nova-3`\n- 🧠 **LLM**: `openai/gpt-5.3-chat-latest`\n- 🎧 **TTS**: `cartesia/sonic-3`\n- ⚙️ **Turn Detection**: `MultilingualModel()`\n\n¿En qué estación deseas visualizar horarios o planificar un trayecto hoy?' }
  ]);
  const [aiInput, setAiInput] = useState<string>('');
  const [aiSending, setAiSending] = useState<boolean>(false);
  const [micActive, setMicActive] = useState<boolean>(false);
  const [micCountdown, setMicCountdown] = useState<number>(0);

  // Sincronizar Token Autónomo en Carga Inicial
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('pids_token');
      if (!token) {
        setAuthChecking(false);
        return;
      }
      try {
        const data = await PiDSApiClient.getMe(token);
        if (data && data.success) {
          setCurrentUser(data.user);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('pids_token');
        }
      } catch (err) {
        console.warn('Error auto-checking user credentials:', err);
        localStorage.removeItem('pids_token');
      } finally {
        setAuthChecking(false);
      }
    };
    checkAuthStatus();
  }, []);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);
    try {
      if (authFormTab === 'login') {
        const creds = authFields.email || authFields.username;
        const data = await PiDSApiClient.login(creds, authFields.password);
        if (data.success) {
          localStorage.setItem('pids_token', data.token);
          localStorage.removeItem('pids_guest');
          setCurrentUser(data.user);
          setIsAuthenticated(true);
        }
      } else {
        const data = await PiDSApiClient.register(authFields.username, authFields.email, authFields.password);
        if (data.success) {
          localStorage.setItem('pids_token', data.token);
          localStorage.removeItem('pids_guest');
          setCurrentUser(data.user);
          setIsAuthenticated(true);
        }
      }
    } catch (err: any) {
      setAuthError(err.message || 'Error en autenticación.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('pids_token');
    localStorage.removeItem('pids_guest');
    setCurrentUser(null);
    setIsAuthenticated(false);
    setIsGuestMode(false);
  };

  const handleGuestAccess = () => {
    localStorage.setItem('pids_guest', 'true');
    setIsGuestMode(true);
  };

  // Chat con el Madrid PIDS AI Agent
  const handleAiSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!aiInput.trim() || aiSending) return;

    const userMessage = aiInput.trim();
    setAiInput('');
    setAiMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setAiSending(true);

    try {
      const history = aiMessages.map(m => ({ role: m.role, content: m.content }));
      const responseText = await PiDSApiClient.postAiMessage(userMessage, history);
      setAiMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
    } catch (err: any) {
      setAiMessages(prev => [...prev, { role: 'assistant', content: `⚠️ Error de conexión: ${err.message || 'El servidor AI Agent no responde.'}` }]);
    } finally {
      setAiSending(false);
    }
  };

  // Simulación Interactiva del Micrófono (stt="deepgram/nova-3")
  const startMicSimulation = () => {
    if (micActive || aiSending) return;
    setMicActive(true);
    setMicCountdown(3);
    
    const countInterval = setInterval(() => {
      setMicCountdown(p => {
        if (p <= 1) {
          clearInterval(countInterval);
          return 0;
        }
        return p - 1;
      });
    }, 1000);

    setTimeout(async () => {
      setMicActive(false);
      const simulatorInputs = [
        "¿Cuál es la historia del primer tren que circuló en Madrid?",
        "¿Cómo ir desde la estación de Sol hasta Atocha en Cercanías?",
        "Muéstrame información del tiempo de llegada real en Nuevos Ministerios",
        "Háblame sobre la tecnología del sintonizador OLED de este PIDS"
      ];
      const randomPrompt = simulatorInputs[Math.floor(Math.random() * simulatorInputs.length)];
      setAiMessages(prev => [...prev, { role: 'user', content: `🗣️ [Voz - Deepgram Nova-3] ${randomPrompt}` }]);
      setAiSending(true);

      try {
        const history = aiMessages.map(m => ({ role: m.role, content: m.content }));
        const responseText = await PiDSApiClient.postAiMessage(randomPrompt, history);
        setAiMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
      } catch (err: any) {
        setAiMessages(prev => [...prev, { role: 'assistant', content: `⚠️ Error al procesar voz: ${err.message || 'El servidor de voz no está activo.'}` }]);
      } finally {
        setAiSending(false);
      }
    }, 3000);
  };

  // --- ESTADOS PRINCIPALES DE LA APLICACIÓN ---
  const [stopId, setStopId] = useState<string>('4-325');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Station[]>([]);
  const [showDirectory, setShowDirectory] = useState<boolean>(false);
  const [directoryStations, setDirectoryStations] = useState<Station[]>([]);
  const [loadingDirectory, setLoadingDirectory] = useState<boolean>(false);
  const [customStopInput, setCustomStopInput] = useState<string>('');
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState('');

  const handleLocateNearest = () => {
    setIsLocating(true);
    setLocationError('');
    if (!navigator.geolocation) {
      setLocationError(t.geolocate_error);
      setIsLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        let nearestDist = Infinity;
        let nearestStationId = '';
        STATIONS_DB.forEach((station) => {
          if (station.coordinates) {
            const dx = station.coordinates.lat - latitude;
            const dy = station.coordinates.long - longitude;
            const dist = dx * dx + dy * dy;
            if (dist < nearestDist) {
              nearestDist = dist;
              nearestStationId = station.id;
            }
          }
        });
        if (nearestStationId) {
          setStopId(nearestStationId);
          setActiveTab('arrivals');
        } else {
          setLocationError(t.geolocate_error);
        }
        setIsLocating(false);
      },
      (error) => {
        console.warn(error);
        setLocationError(t.geolocate_error);
        setIsLocating(false);
      }
    );
  };
  const [arrivals, setArrivals] = useState<ArrivalItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, _setError] = useState<string | null>(null);
  const setError = (val: any) => {
    if (typeof val === 'function') {
      _setError(val);
      return;
    }
    if (val === null || val === undefined) {
      _setError(null);
    } else if (typeof val === 'object') {
      const msg = val.message || val.error || JSON.stringify(val);
      _setError(typeof msg === 'object' ? JSON.stringify(msg) : String(msg));
    } else {
      _setError(String(val));
    }
  };
  const [dataSource, setDataSource] = useState<string>('simulated_fallback');
  const [fetchedAt, setFetchedAt] = useState<string>(new Date().toISOString());

  // Sintonizar y buscar por nombre traduciendo el nombre a ID en el servidor
  // Esto cumple: "LA API DEBE DE TRADUCIR NOMBRE DE ESTACION A ID NO LA PROPIA APP"
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        const stations = await PiDSApiClient.searchStations(searchQuery);
        setSearchResults(stations);
      } catch (err) {
        console.warn('Error al traducir la estación:', err);
        setSearchResults([]);
      }
    }, 250);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);
  
  // Menú y Navegación
  const [activeTab, setActiveTab] = useState<string>('home'); // 'home' | 'arrivals' | 'route' | 'nearby' | 'settings' | 'more' | 'maps'
  const [activeEntertainment, setActiveEntertainment] = useState<string | null>(null); // 'game' | 'music' | 'book' | null
  const [iaSubTab, setIaSubTab] = useState<'voice' | 'chat'>('voice');
  
  useEffect(() => {
    if (activeTab !== 'more') {
      setActiveEntertainment(null);
    }
  }, [activeTab]);

  // Controles de Polling / Auto-Refresco
  const [isPollingPaused, setIsPollingPaused] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [forceMockMode, setForceMockMode] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [recentFlash, setRecentFlash] = useState<boolean>(false);

  // Referencias para evitar clausuras obsoletas en sub-intervalos asíncronos
  const stopIdRef = useRef(stopId);
  const forceMockModeRef = useRef(forceMockMode);

  useEffect(() => {
    stopIdRef.current = stopId;
  }, [stopId]);

  useEffect(() => {
    forceMockModeRef.current = forceMockMode;
  }, [forceMockMode]);
  
  // Filtro de Línea activo en la vista de próximos
  const [selectedLineFilter, setSelectedLineFilter] = useState<string>('ALL');
  
  // Estados de Configuración y Sandbox interactivo
  const [showSandboxConfig, setShowSandboxConfig] = useState<boolean>(false);
  const [isPulling, setIsPulling] = useState<boolean>(false);
  
  // Configuración de visualización OLED
  const [glowIntensity, setGlowIntensity] = useState<string>('high'); // 'high' | 'off'
  const [showScanlines, setShowScanlines] = useState<boolean>(true);

  // --- TTS QUEUE & ANNOUNCEMENTS STATE ---
  const audioQueueRef = useRef<{text: string; langMode: string}[]>([]);
  const isPlayingAudioRef = useRef<boolean>(false);
  const announcementStateRef = useRef<Record<string, string>>({});

  const processAudioQueue = () => {
    if (isPlayingAudioRef.current || audioQueueRef.current.length === 0) return;
    
    isPlayingAudioRef.current = true;
    const { text, langMode } = audioQueueRef.current.shift()!;
    
    let voice = 'Conchita';
    let sysLang = 'es-ES';
    if (langMode === 'fr') {
       voice = 'Celine';
       sysLang = 'fr-FR';
    } else if (langMode === 'en') {
       voice = 'Amy';
       sysLang = 'en-GB';
    }

    const encodedText = encodeURIComponent(text);
    const url = `https://api.streamelements.com/kappa/v2/speech?voice=${voice}&text=${encodedText}`;
    const audio = new Audio(url);
    
    const onEnd = () => {
        isPlayingAudioRef.current = false;
        setTimeout(processAudioQueue, 1500); // 1.5s entre anuncios
    };
    
    audio.onended = onEnd;
    audio.onerror = () => {
       console.warn("TTS StreamElements falló, fallback a SpeechSynthesis...");
       if ('speechSynthesis' in window) {
         const u = new SpeechSynthesisUtterance(text);
         u.lang = sysLang;
         u.onend = onEnd;
         u.onerror = onEnd;
         window.speechSynthesis.speak(u);
       } else {
         onEnd();
       }
    };
    
    audio.play().catch(err => {
      console.warn("Autoplay bloqueado PIDS", err);
      isPlayingAudioRef.current = false;
    });
  };

  const playPIDSVoice = (text: string, langMode: string) => {
    audioQueueRef.current.push({ text, langMode });
    processAudioQueue();
  };

  useEffect(() => {
    if (arrivals.length === 0 || isGuestMode) return;
    
    const groups: Record<string, ArrivalItem[]> = {};
    arrivals.forEach(a => {
      const key = `${a.lineCode}_${a.lineBound}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(a);
    });

    const newAnnouncementState = { ...announcementStateRef.current };
    
    for (const [key, group] of Object.entries(groups)) {
       const first = group[0];
       const second = group[1];
       if (first.departureTimeSecs === undefined || first.departureTimeSecs === null) continue;
       
       const secs = first.departureTimeSecs;
       let currentPhase = 'Far';
       if (secs <= 0) currentPhase = 'Entering';
       else if (secs <= 180) currentPhase = '3min_or_less';
       
       const lastPhase = newAnnouncementState[key];
       
       if (currentPhase !== 'Far' && currentPhase !== lastPhase) {
          newAnnouncementState[key] = currentPhase;
          
          if (currentPhase === 'Entering') {
            if (lang === 'fr') {
              playPIDSVoice("Pour votre sécurité, éloignez-vous de la porte du quai.", lang);
            } else if (lang === 'en') {
              playPIDSVoice("For your safety, please stand clear of the platform edge.", lang);
            } else {
              playPIDSVoice("Por su seguridad, aléjense de la puerta del andén.", lang);
            }
          } else if (currentPhase === '3min_or_less') {
            const mins = Math.ceil(secs / 60);
            let nextStr = "5";
            if (second && second.departureTimeSecs !== undefined) {
               nextStr = Math.ceil(second.departureTimeSecs / 60).toString();
            }
            const dest = first.lineBound.replace(/\(.*\)/g, '').trim();
            
            if (lang === 'fr') {
              const minsText = mins === 1 ? "une" : mins.toString();
              playPIDSVoice(`Direction ${dest}, prochain train dans ${minsText} minute${mins > 1 ? 's' : ''}, le suivant dans ${nextStr} minutes. Pour votre sécurité, éloignez-vous de la bordure du quai.`, lang);
            } else if (lang === 'en') {
              playPIDSVoice(`Direction ${dest}, next train in ${mins} minute${mins > 1 ? 's' : ''}, the following in ${nextStr} minutes.`, lang);
            } else {
              playPIDSVoice(`Dirección ${dest}, próximo tren en ${mins} minuto${mins > 1 ? 's' : ''}, el siguiente en ${nextStr} minutos. Por su seguridad, aléjense del borde del andén.`, lang);
            }
          }
       } else if (currentPhase === 'Far' && lastPhase) {
          newAnnouncementState[key] = 'Far';
       }
    }
    
    for (const k of Object.keys(newAnnouncementState)) {
      if (!groups[k]) delete newAnnouncementState[k];
    }

    announcementStateRef.current = newAnnouncementState;
  }, [arrivals, isGuestMode, lang]);

  // Estados de visibilidad de contraseñas
  const [showAuthPass, setShowAuthPass] = useState<boolean>(false);
  const [showModalCurrentPass, setShowModalCurrentPass] = useState<boolean>(false);
  const [showModalNewPass, setShowModalNewPass] = useState<boolean>(false);
  const [showModalConfirmPass, setShowModalConfirmPass] = useState<boolean>(false);

  // Hora actual del dispositivo simulado
  const [currentTime, setCurrentTime] = useState<string>('');

  // Sincronizar el reloj del teléfono móvil simulado
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch complete directory of Metro stations
  const handleFetchDirectory = async () => {
    setShowDirectory(true);
    setLoadingDirectory(true);
    try {
      const stations = await PiDSApiClient.getStations('metro');
      setDirectoryStations(stations);
    } catch(e) {
      console.warn(e);
    } finally {
      setLoadingDirectory(false);
    }
  };

  // --- OBTENCIÓN DE DATOS (PETICIÓN HTTP REST) ---
  const fetchArrivalsData = async (targetStop: string, mockState: boolean) => {
    setLoading(true);

    try {
      const data = await PiDSApiClient.getArrivals(targetStop, mockState);
      
      if (data.arrivals && data.arrivals.length > 0) {
        // Comparamos el primer tren antes y después para ver si el contador de llegada ha bajado
        const oldFirst = arrivals[0];
        const newFirst = data.arrivals[0];
        if (oldFirst && newFirst && oldFirst.lineNumber === newFirst.lineNumber && oldFirst.lineBound === newFirst.lineBound) {
          const oldTime = oldFirst.departureTimeSecs ?? 99999;
          const newTime = newFirst.departureTimeSecs ?? 99999;
          if (newTime < oldTime) {
            console.log(`[PIDS Sync] El próximo tren ha disminuido su tiempo de llegada: de ${oldTime}s a ${newTime}s.`);
            setRecentFlash(true);
            setTimeout(() => setRecentFlash(false), 1500); // Destello visual verde prolongado
          } else {
            setRecentFlash(true);
            setTimeout(() => setRecentFlash(false), 600);
          }
        } else {
          setRecentFlash(true);
          setTimeout(() => setRecentFlash(false), 600);
        }
        setArrivals(data.arrivals);
      } else {
        setRecentFlash(true);
        setTimeout(() => setRecentFlash(false), 600);
        setArrivals([]);
      }
      
      // Si la API tradujo un texto a ID de estación oficial, actualizamos el estado stopId
      if (data.translatedStopId && data.translatedStopId !== targetStop) {
        setStopId(data.translatedStopId);
      }
      
      setDataSource(data.source);
      setFetchedAt(data.fetchedAt || new Date().toISOString());
      if (data.error) {
        const anyError = data.error as any;
        if (typeof anyError === 'string') {
          setError(anyError);
        } else if (typeof anyError === 'object') {
          const detail = anyError.message || anyError.error || JSON.stringify(anyError);
          setError(detail);
        } else {
          setError(String(anyError));
        }
      } else {
        setError(null);
      }
    } catch (err: any) {
      console.warn('Error fetching arrivals:', err);
      setError(err.message || 'Error de comunicación con el servicio de transportes.');
      setDataSource('fallback_offline');
    } finally {
      setLoading(false);
      setTimeLeft(15); // Reiniciar conteo del polling automático de 15 segundos
    }
  };

  // Efecto inicial y reactivo para cambios de StopId o Modo Forzado
  useEffect(() => {
    fetchArrivalsData(stopId, forceMockMode);
  }, [stopId, forceMockMode]);

  // Visual real-time countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      let needsRefetch = false;

      setArrivals((prevArrivals) => {
        return prevArrivals.map((arr) => {
          if (arr.departureTimeSecs === undefined || arr.departureTimeSecs === null) return arr;
          const nextSecs = Math.max(0, arr.departureTimeSecs - 1);
          
          // Si un contador de tren desciende de >0 a 0 de forma natural (llegando a la estación)
          if (arr.departureTimeSecs > 0 && nextSecs === 0) {
            needsRefetch = true;
          }

          let nextStr = '';
          if (nextSecs === 0) {
            nextStr = 'Llegando';
          } else {
            nextStr = `${Math.ceil(nextSecs / 60)} min`;
          }
          return {
            ...arr,
            departureTimeSecs: nextSecs,
            departureTime: nextStr
          };
        });
      });

      if (needsRefetch) {
        console.log("[PIDS Sync] El próximo tren ha llegado (0 min). Auto-actualizando arribas automáticamente...");
        // Pequeño delay de 4s post-llegada para que el tren parta y se refleje en la API de manera sumamente natural
        setTimeout(() => {
          fetchArrivalsData(stopIdRef.current, forceMockModeRef.current);
        }, 4000);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Manejo del temporizador de Auto-Refresco (polling de 15 segundos)
  useEffect(() => {
    if (isPollingPaused || loading) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          fetchArrivalsData(stopId, forceMockMode);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPollingPaused, stopId, forceMockMode, loading]);

  // Manejo manual de recarga (Pull-to-refresh o Botón directo)
  const handleManualRefresh = () => {
    setIsRefreshing(true);
    fetchArrivalsData(stopId, forceMockMode).then(() => {
      setTimeout(() => setIsRefreshing(false), 500);
    });
  };

  // Simulación del gesto táctil de Pull To Refresh
  const handleSimulatedPull = () => {
    setIsPulling(true);
    setTimeout(() => {
      setIsPulling(false);
      handleManualRefresh();
    }, 850);
  };

  // --- MAPEO DE DISEÑO Y COLOR MADRID METRO, CERCANÍAS Y TREN LIGERO ---
  const getLineStyles = (lineNumber: string, typeCode: string) => {
    const cleanNum = lineNumber.trim().toUpperCase();
    
    // Tren Ligero (las líneas empiezan por ML o su código es tren-ligero)
    if (cleanNum.startsWith('ML') || typeCode === 'tren-ligero') {
      let color = '#009BE8'; // Celeste por defecto ML1
      if (cleanNum === 'ML2') color = '#8E7CB9'; // Lavanda ML2
      else if (cleanNum === 'ML3') color = '#E28258'; // Salmón/Naranja ML3
      else if (cleanNum === 'ML4') color = '#31AF76'; // Verde Parla ML4

      return {
        bg: 'bg-[#121212] border border-[#1A1A1A]',
        text: 'text-sky-400',
        lineColor: color,
        tagBg: 'bg-zinc-800 text-sky-400 border border-sky-400/20',
        lineClass: 'line-tren-ligero',
        glow: glowIntensity === 'high' ? `shadow-[0_0_20px_rgba(${cleanNum === 'ML2' ? '142,124,185' : cleanNum === 'ML3' ? '226,130,88' : cleanNum === 'ML4' ? '49,175,118' : '0,155,232'},0.25)]` : '',
        accentColor: color
      };
    }

    // Cercanías (C1-C10 o tipo '5')
    if (cleanNum.startsWith('C') || typeCode === '5') {
      let color = '#FF5E00'; // Naranja corporativo Cercanías
      if (cleanNum === 'C1') color = '#32A5DF';
      else if (cleanNum === 'C2') color = '#4BB339';
      else if (cleanNum === 'C3') color = '#923F8F';
      else if (cleanNum === 'C4') color = '#0153A0';
      else if (cleanNum === 'C5') color = '#D3C300';
      else if (cleanNum === 'C7') color = '#E51C24';
      else if (cleanNum === 'C8') color = '#87898C';
      else if (cleanNum === 'C10') color = '#13A538';

      return {
        bg: 'bg-[#121212] border border-[#1A1A1A]',
        text: 'text-[#FF5E00]',
        lineColor: color,
        tagBg: 'bg-[#E30613] text-white',
        lineClass: 'line-cercanias',
        glow: glowIntensity === 'high' ? 'shadow-[0_0_20px_rgba(255,108,0,0.3)]' : '',
        accentColor: color
      };
    }
    
    if (typeCode === '3' || cleanNum === '325' || cleanNum.startsWith('EMT')) {
      return {
        bg: 'bg-[#121212] border border-[#1A1A1A]',
        text: 'text-[#10B981]',
        lineColor: '#10B981',
        tagBg: 'bg-[#10B981] text-white',
        lineClass: 'line-emt',
        glow: glowIntensity === 'high' ? 'shadow-[0_0_20px_rgba(16,185,129,0.25)]' : '',
        accentColor: '#10B981'
      };
    }
    
    switch (cleanNum) {
      case '1':
        return {
          bg: 'bg-[#121212] border border-[#1A1A1A]',
          text: 'text-[#0076C0]',
          lineColor: '#0076C0',
          tagBg: 'bg-[#0076C0] text-white',
          lineClass: 'line-1',
          glow: glowIntensity === 'high' ? 'shadow-[0_0_20px_rgba(0,118,192,0.25)]' : '',
          accentColor: '#0076C0'
        };
      case '2':
        return {
          bg: 'bg-[#121212] border border-[#1A1A1A]',
          text: 'text-[#E21F1F]',
          lineColor: '#E21F1F',
          tagBg: 'bg-[#E21F1F] text-white',
          lineClass: 'line-2',
          glow: glowIntensity === 'high' ? 'shadow-[0_0_20px_rgba(226,31,31,0.25)]' : '',
          accentColor: '#E21F1F'
        };
      case '3':
        return {
          bg: 'bg-[#121212] border border-[#1A1A1A]',
          text: 'text-[#FFCC00]',
          lineColor: '#FFCC00',
          tagBg: 'bg-[#FFCC00] text-black font-extrabold',
          lineClass: 'line-3',
          glow: glowIntensity === 'high' ? 'shadow-[0_0_20px_rgba(255,204,0,0.25)]' : '',
          accentColor: '#FFCC00'
        };
      case '4':
        return {
          bg: 'bg-[#121212] border border-[#1A1A1A]',
          text: 'text-[#A65E2E]',
          lineColor: '#A65E2E',
          tagBg: 'bg-[#A65E2E] text-white',
          lineClass: 'line-4',
          glow: glowIntensity === 'high' ? 'shadow-[0_0_20px_rgba(166,94,46,0.25)]' : '',
          accentColor: '#A65E2E'
        };
      case '5':
        return {
          bg: 'bg-[#121212] border border-[#1A1A1A]',
          text: 'text-[#4CAF50]',
          lineColor: '#4CAF50',
          tagBg: 'bg-[#4CAF50] text-[#000000]',
          lineClass: 'line-5',
          glow: glowIntensity === 'high' ? 'shadow-[0_0_20px_rgba(76,175,80,0.25)]' : '',
          accentColor: '#4CAF50'
        };
      case '6':
        return {
          bg: 'bg-[#121212] border border-[#1A1A1A]',
          text: 'text-[#9B9B9B]',
          lineColor: '#9B9B9B',
          tagBg: 'bg-[#9B9B9B] text-[#000000]',
          lineClass: 'line-6',
          glow: glowIntensity === 'high' ? 'shadow-[0_0_20px_rgba(155,155,155,0.25)]' : '',
          accentColor: '#9B9B9B'
        };
      case '7':
        return {
          bg: 'bg-[#121212] border border-[#1A1A1A]',
          text: 'text-[#FF5E00]',
          lineColor: '#FF5E00',
          tagBg: 'bg-[#FF5E00] text-white',
          lineClass: 'line-7',
          glow: glowIntensity === 'high' ? 'shadow-[0_0_20px_rgba(255,94,0,0.25)]' : '',
          accentColor: '#FF5E00'
        };
      case '8':
        return {
          bg: 'bg-[#121212] border border-[#1A1A1A]',
          text: 'text-[#E11283]',
          lineColor: '#E11283',
          tagBg: 'bg-[#E11283] text-white',
          lineClass: 'line-8',
          glow: glowIntensity === 'high' ? 'shadow-[0_0_20px_rgba(225,18,131,0.25)]' : '',
          accentColor: '#E11283'
        };
      case '9':
        return {
          bg: 'bg-[#121212] border border-[#1A1A1A]',
          text: 'text-[#923F8F]',
          lineColor: '#923F8F',
          tagBg: 'bg-[#923F8F] text-white',
          lineClass: 'line-9',
          glow: glowIntensity === 'high' ? 'shadow-[0_0_20px_rgba(146,63,143,0.25)]' : '',
          accentColor: '#923F8F'
        };
      case '10':
        return {
          bg: 'bg-[#121212] border border-[#1A1A1A]',
          text: 'text-[#00548F]',
          lineColor: '#00548F',
          tagBg: 'bg-[#00548F] text-white',
          lineClass: 'line-10',
          glow: glowIntensity === 'high' ? 'shadow-[0_0_20px_rgba(0,84,143,0.25)]' : '',
          accentColor: '#00548F'
        };
      case '11':
        return {
          bg: 'bg-[#121212] border border-[#1A1A1A]',
          text: 'text-[#009B74]',
          lineColor: '#009B74',
          tagBg: 'bg-[#009B74] text-white',
          lineClass: 'line-11',
          glow: glowIntensity === 'high' ? 'shadow-[0_0_20px_rgba(0,155,116,0.25)]' : '',
          accentColor: '#009B74'
        };
      case '12':
        return {
          bg: 'bg-[#121212] border border-[#1A1A1A]',
          text: 'text-[#85754E]',
          lineColor: '#85754E',
          tagBg: 'bg-[#85754E] text-white',
          lineClass: 'line-12',
          glow: glowIntensity === 'high' ? 'shadow-[0_0_20px_rgba(133,117,78,0.25)]' : '',
          accentColor: '#85754E'
        };
      case 'R':
        return {
          bg: 'bg-[#121212] border border-[#1A1A1A]',
          text: 'text-sky-300',
          lineColor: '#0076C0',
          tagBg: 'bg-[#0076C0] text-white border border-white/20',
          lineClass: 'line-R',
          glow: glowIntensity === 'high' ? 'shadow-[0_0_20px_rgba(0,118,192,0.25)]' : '',
          accentColor: '#0076C0'
        };
      default:
        return {
          bg: 'bg-[#121212] border border-[#1A1A1A]',
          text: 'text-[#0076C0]',
          lineColor: '#0076C0',
          tagBg: 'bg-[#0076C0] text-white',
          lineClass: 'line-other',
          glow: glowIntensity === 'high' ? 'shadow-[0_0_20px_rgba(0,118,192,0.21)]' : '',
          accentColor: '#0076C0'
        };
    }
  };

  // Filtrar arribos según botón de filtro por línea
  const linesPresent: string[] = Array.from(new Set(arrivals.map((a: ArrivalItem) => a.lineNumber)));
  const filteredArrivals = selectedLineFilter === 'ALL'
    ? arrivals
    : arrivals.filter(a => a.lineNumber === selectedLineFilter);

  // Progreso del rail de cuenta atrás (0% a 100%)
  const pollingPercent = (timeLeft / 15) * 100;

  // Manejar el envío de parada manual
  const handleCustomStopSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customStopInput.trim()) {
      setStopId(customStopInput.trim());
      // Volver a la pestaña principal para ver resultados
      setActiveTab('arrivals');
    }
  };

  // Obtener nombre formateado para la parada actual de forma robusta
  const getCurrentStopName = () => {
    const found = STATIONS_DB.find(p => p.id === stopId);
    if (found) {
      let typeStr = 'Metro';
      if (found.network === 'cercanias') typeStr = 'Renfe Cercanías';
      else if (found.network === 'tren-ligero') typeStr = 'Tren Ligero';
      return `${found.name} (${typeStr})`;
    }
    const foundPreset = PRESET_STOPS.find(p => p.id === stopId);
    if (foundPreset) return foundPreset.name;
    const nearby = NEARBY_STOPS_LIST.find(n => n.id === stopId);
    if (nearby) return nearby.name;
    return `Parada Código ${stopId}`;
  };

  // Obtener las líneas de la estación consultada para pintar en el tab "Línea"
  const getStationRoutes = () => {
    if (STATION_LINE_LIST[stopId]) {
      return STATION_LINE_LIST[stopId];
    }
    const sObj = STATIONS_DB.find(s => s.id === stopId);
    if (sObj) {
      return sObj.lines.map(lineNum => {
        const isCercanias = sObj.network === 'cercanias';
        const isTrenLigero = sObj.network === 'tren-ligero';
        const styles = getLineStyles(lineNum, isCercanias ? '5' : isTrenLigero ? 'tren-ligero' : '4');
        
        let nextStops = [sObj.name, 'Gran Vía', 'Tribunal', 'Bilbao', 'Plaza de Castilla', 'Cuatro Caminos'];
        if (isCercanias) {
          nextStops = [sObj.name, 'Recoletos', 'Nuevos Ministerios', 'Chamartín Clara Campoamor', 'Cantoblanco Univ.'];
        } else if (isTrenLigero) {
          if (lineNum === 'ML1') {
            nextStops = [sObj.name, 'Virgen del Cortijo', 'Antonio Saura', 'Blasco Ibáñez', 'Las Tablas'];
          } else if (lineNum === 'ML2') {
            nextStops = [sObj.name, 'Prado de la Vega', 'Somosaguas Centro', 'Avenida de Europa', 'Estación de Aravaca'];
          } else if (lineNum === 'ML3') {
            nextStops = [sObj.name, 'Ciudad de la Imagen', 'Montepríncipe', 'Cantabria (B. Santander)', 'Boadilla Centro', 'Puerta de Boadilla'];
          } else if (lineNum === 'ML4') {
            nextStops = [sObj.name, 'Julio Romero de Torres', 'La Ballena', 'Reyes Católicos', 'Parque Parla Este', 'Avenida de Ronda'];
          } else {
            nextStops = [sObj.name, 'Estación Norte', 'Avenida Central', 'Campus Ourente', 'Terminal Extremo'];
          }
        } else {
          // Si es otra línea de Metro, generemos paradas según la línea
          if (lineNum === '1') {
            nextStops = [sObj.name, 'Atocha', 'Estación del Arte', 'Sol', 'Cuatro Caminos', 'Pinar de Chamartín'];
          } else if (lineNum === '2') {
            nextStops = [sObj.name, 'Banco de España', 'Sol', 'Ópera', 'Canal', 'Cuatro Caminos'];
          } else if (lineNum === '3') {
            nextStops = [sObj.name, 'Lavapiés', 'Sol', 'Callao', 'Plaza de España', 'Moncloa'];
          } else if (lineNum === '4') {
            nextStops = [sObj.name, 'Alonso Martínez', 'Goya', 'Diego de León', 'Avenida de América', 'Mar de Cristal'];
          } else if (lineNum === '5') {
            nextStops = [sObj.name, 'Diego de León', 'Chueca', 'Gran Vía', 'Ópera', 'Casa de Campo'];
          } else if (lineNum === '6') {
            nextStops = [sObj.name, 'Circular', 'Nuevos Ministerios', 'Avenida de América', 'Pacífico', 'Príncipe Pío'];
          } else if (lineNum === '10') {
            nextStops = [sObj.name, 'Nuevos Ministerios', 'Plaza de España', 'Príncipe Pío', 'Casa de Campo', 'Puerta del Sur'];
          }
        }

        return {
          line: isCercanias ? `Cercanías ${lineNum}` : isTrenLigero ? `Tren Ligero ${lineNum}` : `Línea ${lineNum}`,
          stops: nextStops,
          color: styles.lineColor
        };
      });
    }
    return null;
  };

  if (authChecking) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-sans">
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-16 h-16 rounded-full border border-[#0076C0] flex items-center justify-center relative shadow-[0_0_20px_rgba(0,118,192,0.3)] mb-4"
        >
          <Cpu className="w-8 h-8 text-[#0076C0] animate-pulse" />
        </motion.div>
        <p className="text-xs uppercase tracking-widest text-[#71717A] text-center font-mono">Iniciando Sintonía de Seguridad PIDS...</p>
      </div>
    );
  }

  if (!isAuthenticated && !isGuestMode) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 sm:p-6 font-sans relative overflow-hidden w-full">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-[#09090B] border border-[#1C1C1F] rounded-3xl p-6 sm:p-8 relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] space-y-6 text-left"
        >
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-black border border-[#1A1A1A] flex items-center justify-center shadow-[0_0_15px_rgba(225,18,131,0.2)]">
              <Sparkles className="w-6 h-6 text-[#E11283]" />
            </div>
            <h2 className="text-lg font-black uppercase tracking-widest text-white mt-4">Panel de Control PIDS</h2>
            <p className="text-xs text-[#71717A] max-w-xs mx-auto">
              Inicia sesión o regístrate para conectar al sistema de tiempo real y activar el asistente conversacional.
            </p>
          </div>

          <div className="grid grid-cols-2 bg-[#121214] p-1 rounded-xl border border-[#1A1A1C]">
            <button
              onClick={() => { setAuthFormTab('login'); setAuthError(null); }}
              className={`py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                authFormTab === 'login' ? 'bg-[#1C1C1F] text-white' : 'text-[#71717A] hover:text-white'
              }`}
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => { setAuthFormTab('register'); setAuthError(null); }}
              className={`py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                authFormTab === 'register' ? 'bg-[#1C1C1F] text-white' : 'text-[#71717A] hover:text-white'
              }`}
            >
              Registrarse
            </button>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {authFormTab === 'register' && (
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#A1A1AA] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#E11283]" /> Usuario
                </label>
                <input
                  type="text"
                  required
                  placeholder="ej. metro_viajero"
                  value={authFields.username}
                  onChange={(e) => setAuthFields({ ...authFields, username: e.target.value })}
                  className="w-full bg-black border border-[#1F1F22] rounded-xl px-4 py-3 text-xs text-white placeholder-[#52525B] focus:outline-none focus:border-[#E11283] transition-colors"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#A1A1AA] flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#E11283]" /> {authFormTab === 'login' ? 'Usuario o Correo' : 'Correo electrónico'}
              </label>
              <input
                type={`${authFormTab === 'login' ? 'text' : 'email'}`}
                required
                placeholder={authFormTab === 'login' ? 'ej. miguel@correo.com o miguel_mad' : 'ej. miguel@correo.com'}
                value={authFormTab === 'login' ? authFields.email || authFields.username : authFields.email}
                onChange={(e) => {
                  if (authFormTab === 'login') {
                    setAuthFields({ ...authFields, username: e.target.value, email: e.target.value });
                  } else {
                    setAuthFields({ ...authFields, email: e.target.value });
                  }
                }}
                className="w-full bg-black border border-[#1F1F22] rounded-xl px-4 py-3 text-xs text-white placeholder-[#52525B] focus:outline-none focus:border-[#E11283] transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#A1A1AA] flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#E11283]" /> Contraseña
                </span>
              </label>
              <div className="relative">
                <input
                  type={showAuthPass ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={authFields.password}
                  onChange={(e) => setAuthFields({ ...authFields, password: e.target.value })}
                  className="w-full bg-black border border-[#1F1F22] rounded-xl pl-4 pr-11 py-3 text-xs text-white placeholder-[#52525B] focus:outline-none focus:border-[#E11283] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowAuthPass(!showAuthPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#52525B] hover:text-white transition-colors cursor-pointer"
                  tabIndex={-1}
                >
                  {showAuthPass ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {authError && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-[#3F0E1F] border border-[#7A1C3C] rounded-xl text-center text-xs text-[#FFA4C0] font-medium"
              >
                {authError}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-[#E11283] hover:bg-[#C20E6F] text-white font-bold uppercase tracking-widest text-xs py-3.5 rounded-xl transition-all shadow-[0_4px_15px_rgba(225,18,131,0.3)] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {authLoading ? (
                <Cpu className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  {authFormTab === 'login' ? 'Entrar al canal' : 'Registrar Cuenta'}
                </>
              )}
            </button>
          </form>

          <div className="space-y-4 pt-2 text-center">
            <div className="flex items-center gap-3">
              <div className="h-[1px] bg-[#1C1C1F] flex-1" />
              <span className="text-[10px] uppercase font-bold text-[#52525B] tracking-widest">o</span>
              <div className="h-[1px] bg-[#1C1C1F] flex-1" />
            </div>

            <button
              onClick={handleGuestAccess}
              className="w-full bg-black border border-[#1C1C1F] hover:border-[#52525B] text-white font-semibold text-xs py-3 rounded-xl transition-all"
            >
              Continuar como Invitado
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div id="pids-app-root" className="min-h-screen bg-[#000000] text-white flex flex-col items-center justify-start p-0 sm:p-6 md:p-8 select-none font-sans relative">
      
      {/* Operator Capsule and Logout pill */}
      {isAuthenticated && (
        <div className="w-full max-w-5xl flex justify-end mb-2 relative z-50">
          <div className="flex items-center gap-2 px-3 py-1 bg-[#121212] border border-[#1A1A1A] rounded-full text-[10px] font-mono text-[#71717A]">
            <span className="w-2 h-2 rounded-full bg-[#E11283] inline-block" />
            <span>OPERADOR: <strong className="text-white uppercase">{currentUser?.username || 'ADMIN'}</strong></span>

            <button onClick={handleLogout} className="hover:text-red-400 font-bold ml-2 border-l border-[#1A1A1A] pl-2 flex items-center gap-1 text-[9px] text-[#A1A1AA] cursor-pointer">
              <LogOut className="w-2.5 h-2.5 text-[#A1A1AA]" /> SALIR
            </button>
          </div>
        </div>
      )}
      {/* HEADER PRINCIPAL - ESTILO ESTACIÓN FIDS DESKTOP */}
      <header id="desktop-app-header" className="w-full max-w-5xl mb-6 md:mb-8 hidden sm:flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[#1A1A1A] pb-6 gap-6">
        <div>
          <div className="text-[14px] uppercase text-[#71717A] tracking-wider mb-2 font-semibold flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0076C0] animate-pulse inline-block" />
            {t.crt_title}
          </div>
          <h1 className="font-sans font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white uppercase leading-none">
            {getCurrentStopName().split('(')[0].trim()}
          </h1>
          <p className="text-[13px] text-[#A1A1AA] mt-2 font-medium">
            {t.pids_desc}
          </p>
        </div>
        
        {/* INDICADOR LIVE Y ESTADÍSTICAS */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-[#121212] px-4 py-2 border border-[#1A1A1A] rounded-xl self-stretch sm:self-auto text-xs font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4CAF50] animate-pulse inline-block shadow-[0_0_8px_#4CAF50]" />
            <span className="text-[#4CAF50] font-bold uppercase tracking-wider">
              {dataSource === 'live_api' ? t.system_online : t.local_sim}
            </span>
          </div>
          <div className="text-xs text-[#71717A] text-left sm:text-right font-mono">
            <p>{t.stop_code_label}: <strong className="text-white">{stopId}</strong></p>
            <p>{t.sync_label}: {new Date(fetchedAt).toLocaleTimeString(lang === 'es' ? 'es-ES' : 'en-US')}</p>
          </div>
        </div>
      </header>

      {/* REVOLUCIONARIO COMPONENT GRID: PANTALLA PIDS CON MENÚ DE OPCIONES */}
      <main id="app-grid" className="w-full max-w-lg mx-auto flex flex-col justify-center items-center mb-12 sm:mb-24">
        
        {/* COLUMNA IZQUIERDA: PANTALLA OLED SIMULADA MULTI-VISTA (EL MÓVIL DEL USUARIO) [Lg: 7 cols] */}
        <section id="phone-simulator-section" className="flex justify-center w-full">
          
          {/* MARCO DEL SMARTPHONE - ESTILO OLED ULTRA MINIMALISTA */}
          <div className="w-full sm:max-w-[425px] h-screen sm:h-[820px] bg-[#000000] rounded-none sm:rounded-[50px] p-0 sm:p-4 shadow-none sm:shadow-[0_0_80px_rgba(0,118,192,0.12)] border-0 sm:border-[6px] sm:border-[#121212] relative flex flex-col justify-between overflow-hidden">
            
            {/* Altavoz y Cámara Frontal (Isla Dinámica) */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-3xl z-40 border border-zinc-900 hidden sm:flex items-center justify-center p-1">
              <div className="w-16 h-1 bg-zinc-800 rounded-full" />
              <div className="w-3.5 h-3.5 bg-zinc-900 rounded-full ml-3" />
            </div>

            {/* Brillo de Cristal */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-transparent pointer-events-none" />

            {/* AREA LED SENSITIVE CON OPCIONAL SCANLINES RETRO */}
            <div className={`w-full h-full bg-[#000000] rounded-none sm:rounded-[40px] overflow-hidden flex flex-col relative ${showScanlines ? 'led-scanlines' : ''} pt-2 sm:pt-6`}>
              
              {/* DISPOSITIVO: BARRA DE ESTADO */}
              <div className="pt-2 pb-2 px-6 flex justify-between items-center text-xs text-[#A1A1AA] font-bold z-30 select-none font-mono">
                <span>{currentTime || '14:32'}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] border border-[#1A1A1A] bg-[#121212] px-1 text-white tracking-widest rounded animate-pulse">LIVE</span>
                  <Wifi className="w-3.5 h-3.5 text-white" />
                  <Battery className="w-4 h-4 text-[#4CAF50]" />
                  <span>100%</span>
                </div>
              </div>

              {/* TÍTULO CORRESPONDIENTE A LA PESTAÑA ACTIVA EN EL SMARTPHONE */}
              <div className="px-5 py-3 border-b border-[#1A1A1A] bg-black/90 backdrop-blur-md z-20 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-[#A1A1AA] uppercase font-bold tracking-widest">
                    {activeTab === 'home' ? t.tab_title_home :
                     activeTab === 'arrivals' ? t.tab_title_arrivals :
                     activeTab === 'route' ? t.tab_title_route :
                     activeTab === 'nearby' ? t.tab_title_nearby :
                     activeTab === 'settings' ? t.tab_title_settings : 
                     activeTab === 'maps' ? t.tab_title_maps :
                     t.tab_title_more}
                  </span>
                  <h2 className="text-[18px] font-black uppercase text-white truncate max-w-[240px] mt-0.5">
                    {activeTab === 'home' ? t.tab_header_home :
                     activeTab === 'arrivals' ? getCurrentStopName().split('(')[0] :
                     activeTab === 'route' ? t.tab_header_route :
                     activeTab === 'nearby' ? t.tab_header_nearby :
                     activeTab === 'settings' ? t.tab_header_settings : 
                     activeTab === 'maps' ? t.tab_header_maps :
                     t.tab_header_more}
                  </h2>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-[#0076C0] bg-[#0076C0]/10 px-2 py-0.5 rounded-full font-mono font-bold tracking-wider uppercase">
                    ID {stopId}
                  </span>
                </div>
              </div>

              {/* TRANSMISIÓN DE ANIMA_PRESENCE PARA LAS DIFERENTES OPCIONES DEL MENÚ */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-4 no-scrollbar relative">
                
                <AnimatePresence mode="wait">
                  
                  {/* PESTAÑA AÑADIDA: INICIO (HOME) PARA IDIOMAS */}
                  {activeTab === 'home' && (
                    <motion.div
                      key="home-tab"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-6 flex flex-col items-center justify-center min-h-[300px] text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-[#0076C0]/20 flex items-center justify-center mb-2">
                        <Activity className="w-8 h-8 text-[#0076C0]" />
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-xl font-black uppercase text-white tracking-tight leading-tight">
                          {t.home_welcome}
                        </h3>
                        <p className="text-xs text-[#A1A1AA] max-w-xs mx-auto">
                          {t.home_desc}
                        </p>
                      </div>

                      <div className="w-full space-y-3 mt-6">
                        <button
                          onClick={handleLocateNearest}
                          disabled={isLocating}
                          className="w-full bg-[#0076C0] text-white p-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#005a93] transition-colors disabled:opacity-50"
                        >
                          <MapPin className="w-4 h-4" />
                          {isLocating ? (lang === 'es' ? 'Localizando...' : 'Locating...') : t.geolocate_btn}
                        </button>
                        {locationError && (
                          <div className="text-xs text-[#E21F1F] flex items-center justify-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {locationError}
                          </div>
                        )}
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#71717A] mb-2">{t.selectLanguage}</p>
                        
                        <button
                          onClick={() => setLang('es')}
                          className={`w-full py-3.5 px-4 rounded-xl flex items-center justify-between transition-all ${lang === 'es' ? 'bg-[#0076C0]/20 border border-[#0076C0] text-white shadow-[0_0_15px_rgba(0,118,192,0.15)]' : 'bg-[#121212] border border-[#1A1A1A] text-[#A1A1AA] hover:bg-[#1A1A1A]'}`}
                        >
                          <span className="text-sm font-bold tracking-wide">Español</span>
                          {lang === 'es' && <div className="w-2 h-2 rounded-full bg-[#0076C0] shadow-[0_0_8px_#0076C0]" />}
                        </button>
                        
                        <button
                          onClick={() => setLang('en')}
                          className={`w-full py-3.5 px-4 rounded-xl flex items-center justify-between transition-all ${lang === 'en' ? 'bg-[#0076C0]/20 border border-[#0076C0] text-white shadow-[0_0_15px_rgba(0,118,192,0.15)]' : 'bg-[#121212] border border-[#1A1A1A] text-[#A1A1AA] hover:bg-[#1A1A1A]'}`}
                        >
                          <span className="text-sm font-bold tracking-wide">English</span>
                          {lang === 'en' && <div className="w-2 h-2 rounded-full bg-[#0076C0] shadow-[0_0_8px_#0076C0]" />}
                        </button>

                        <button
                          onClick={() => setLang('fr')}
                          className={`w-full py-3.5 px-4 rounded-xl flex items-center justify-between transition-all ${lang === 'fr' ? 'bg-[#0076C0]/20 border border-[#0076C0] text-white shadow-[0_0_15px_rgba(0,118,192,0.15)]' : 'bg-[#121212] border border-[#1A1A1A] text-[#A1A1AA] hover:bg-[#1A1A1A]'}`}
                        >
                          <span className="text-sm font-bold tracking-wide">Français</span>
                          {lang === 'fr' && <div className="w-2 h-2 rounded-full bg-[#0076C0] shadow-[0_0_8px_#0076C0]" />}
                        </button>
                      </div>

                      <button 
                        onClick={() => setActiveTab('arrivals')}
                        className="mt-4 bg-white text-black font-black uppercase text-[11px] w-full py-4 rounded-xl tracking-wider hover:bg-gray-200 transition-colors"
                      >
                        {t.startJourney}
                      </button>
                    </motion.div>
                  )}

                  {/* PESTAÑA 1: PRÓXIMOS TRENES (CORE PIDS ARRIVALS) */}
                  {activeTab === 'arrivals' && (
                    <motion.div
                      key="arrivals-tab"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-4"
                    >
                      {/* TARJETA DE ESTADO AUTOMÁTICO Y CUENTA REGRESIVA */}
                      <div className="bg-[#121212] border border-[#1A1A1A] rounded-2xl p-3.5 flex justify-between items-center text-xs">
                        <div className="flex items-center gap-3">
                          <span className={`w-2.5 h-2.5 rounded-full ${isPollingPaused ? 'bg-amber-500' : 'bg-[#4CAF50] animate-pulse shadow-[0_0_8px_#4CAF50]'}`} />
                          <div>
                            <span className="text-[#A1A1AA] text-[9px] uppercase font-extrabold tracking-widest block leading-none">{t.polling_autorefresh}</span>
                            <span className="text-white font-mono font-black text-xs mt-1 block">
                              {isPollingPaused ? t.polling_paused : `${t.updating_in} ${timeLeft}s`}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setIsPollingPaused(!isPollingPaused)}
                            className="p-1.5 px-2.5 rounded-lg border border-[#222225] bg-black text-[#A1A1AA] hover:text-white transition-all text-[9px] uppercase font-extrabold flex items-center gap-1"
                            title={isPollingPaused ? 'Reanudar' : 'Pausar'}
                          >
                            {isPollingPaused ? <Play className="w-2.5 h-2.5 text-[#4CAF50]" /> : <Pause className="w-2.5 h-2.5 text-amber-500" />}
                            <span>{isPollingPaused ? 'Play' : 'Stop'}</span>
                          </button>
                          <button
                            onClick={handleManualRefresh}
                            disabled={isRefreshing}
                            className="bg-white text-black text-[10px] font-black uppercase px-2.5 py-1.5 rounded-lg hover:opacity-90 active:scale-95 transition-all text-center"
                          >
                            {isRefreshing ? t.btn_sinc : t.btn_renew}
                          </button>
                        </div>
                      </div>

                      {/* BUSCADOR INTELIGENTE CON TRADUCTOR DE NOMBRE A ID */}
                      <div className="bg-[#121212]/95 border border-[#1A1A1A] rounded-2xl p-3 flex flex-col gap-2 relative z-50">
                        <div className="flex justify-between items-center px-1">
                          <span className="text-[9.5px] text-[#A1A1AA] uppercase font-bold tracking-widest flex items-center gap-1">
                            <Search className="w-3.5 h-3.5 text-[#0076C0]" /> {t.search_heading}
                          </span>
                          <span className="text-[9px] text-[#71717A] font-mono">Metro / Cercanías</span>
                        </div>
                        <div className="relative">
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t.search_placeholder}
                            className="w-full bg-black border border-[#1A1A1A] hover:border-[#333] focus:border-[#0076C0] rounded-xl py-2 pl-3 pr-8 text-xs text-white placeholder-zinc-500 focus:outline-none transition-all font-sans"
                          />
                          {searchQuery && (
                            <button
                              onClick={() => setSearchQuery('')}
                              className="absolute right-3 top-2 text-xs text-[#71717A] hover:text-white font-mono font-bold"
                            >
                              ✕
                            </button>
                          )}
                        </div>

                        {/* RESULTADOS DE COMPUTE */}
                        {searchResults.length > 0 && (
                          <div className="max-h-64 overflow-y-auto divide-y divide-[#1A1A1A] border border-[#1A1A1A] bg-black rounded-xl mt-1 no-scrollbar shadow-2xl relative z-50">
                            {searchResults.map((station) => {
                              const isSelected = station.id === stopId;
                              const isMetro = station.network === 'metro';
                              return (
                                <button
                                  key={station.id}
                                  onClick={() => {
                                    setStopId(station.id);
                                    setSearchQuery('');
                                    setSearchResults([]);
                                    setSelectedLineFilter('ALL');
                                  }}
                                  className={`w-full text-left p-2.5 flex items-center justify-between transition-all hover:bg-[#121212] ${
                                    isSelected ? 'bg-[#121212]/80 font-bold' : ''
                                  }`}
                                >
                                  <div className="min-w-0 pr-3">
                                    <div className="flex items-center gap-2 mb-0.5">
                                      <span className="font-extrabold text-[12px] text-white uppercase tracking-tight truncate">
                                        {station.name}
                                      </span>
                                      <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded tracking-widest ${
                                        isMetro 
                                          ? 'bg-[#E21F1F]/20 text-[#E21F1F] border border-[#E21F1F]/30' 
                                          : 'bg-[#FF5E00]/20 text-[#FF5E00] border border-[#FF5E00]/30'
                                      }`}>
                                        {isMetro ? 'Metro' : 'Renfe'}
                                      </span>
                                    </div>
                                    <p className="text-[10px] text-[#71717A] truncate font-sans">
                                      {station.description}
                                    </p>
                                  </div>
                                  <div className="flex flex-col items-end shrink-0 gap-1">
                                    <div className="flex gap-1">
                                      {station.lines.map(line => {
                                        const styles = getLineStyles(line, isMetro ? '4' : '5');
                                        return (
                                          <span
                                            key={line}
                                            className="text-[8.5px] font-mono font-black px-1.5 py-0.5 rounded text-white"
                                            style={{ backgroundColor: styles.lineColor }}
                                          >
                                            {line}
                                          </span>
                                        );
                                      })}
                                    </div>
                                    <span className="text-[8.5px] text-[#71717A] font-mono">ID: {station.id}</span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {searchQuery.trim() !== '' && searchResults.length === 0 && (
                          <div className="p-2.5 text-center text-[10.5px] text-[#71717A] font-sans border border-[#1A1A1A] rounded-xl bg-black">
                            {t.no_matches_for} "<span className="text-white italic">{searchQuery}</span>"
                          </div>
                        )}
                      </div>

                      {/* BARRA DE FILTRADO INTERIOR - RÁPIDA */}
                      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                        <button 
                          onClick={() => setSelectedLineFilter('ALL')}
                          className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all uppercase ${
                            selectedLineFilter === 'ALL' 
                              ? 'bg-white text-black font-black' 
                              : 'bg-[#121212] border border-[#1A1A1A] text-[#A1A1AA]'
                          }`}
                        >
                          Ver Todo
                        </button>
                        {linesPresent.map((lineNum) => {
                           const styles = getLineStyles(lineNum, '');
                           return (
                            <button
                              key={lineNum}
                              onClick={() => setSelectedLineFilter(lineNum)}
                              className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border uppercase ${
                                selectedLineFilter === lineNum
                                  ? 'bg-white text-black font-black border-transparent'
                                  : 'bg-[#121212] border-[#1A1A1A] text-[#A1A1AA] hover:text-white'
                              }`}
                            >
                              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: styles.lineColor }} />
                              Línea {lineNum}
                            </button>
                          );
                        })}
                      </div>

                      {/* Pull To Refresh de Movimiento */}
                      <button 
                        onClick={handleSimulatedPull}
                        className="w-full py-1 text-center text-[10px] text-[#71717A] hover:text-white font-mono tracking-widest transition flex items-center justify-center gap-2 uppercase font-extrabold"
                      >
                        <RefreshCw className={`w-3 h-3 ${isPulling ? 'animate-spin text-[#0076C0]' : ''}`} />
                        {isPulling ? t.syncing_loader : t.swipe_to_update}
                      </button>

                      {/* Línea animada de recarga */}
                      {loading && (
                        <div className="w-full bg-[#1A1A1A] h-1 overflow-hidden relative rounded">
                          <motion.div 
                            initial={{ left: '-100%' }}
                            animate={{ left: '100%' }}
                            transition={{ repeat: Infinity, duration: 1.0, ease: 'linear' }}
                            className="absolute top-0 bottom-0 w-1/3 bg-[#0076C0] shadow-[0_0_10px_#0076C0]"
                          />
                        </div>
                      )}

                      {/* Alertas */}
                      {error && (
                        <div className="bg-[#121212] border border-[#E21F1F]/40 rounded-2xl p-4 text-xs text-zinc-300 flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-[#E21F1F] shrink-0" />
                          <div>
                            <p className="font-bold text-white uppercase tracking-wider">{t.system_notice}</p>
                            <p className="text-[11px] text-[#A1A1AA] mt-1 pr-1">{error}</p>
                          </div>
                        </div>
                      )}

                      {/* Contener de carga */}
                      {loading && arrivals.length === 0 ? (
                        <div className="h-64 flex flex-col items-center justify-center gap-3">
                          <RefreshCw className="w-10 h-10 text-[#0076C0] animate-spin" />
                          <span className="text-xs font-mono text-[#71717A] uppercase tracking-wider">{t.syncing_loader}</span>
                        </div>
                      ) : filteredArrivals.length === 0 ? (
                        <div className="h-48 flex flex-col items-center justify-center text-center p-6 bg-[#121212] border border-[#1A1A1A] rounded-2xl">
                          <h3 className="text-xs font-bold text-white uppercase tracking-wider">{t.no_arrivals}</h3>
                          <p className="text-[11px] text-[#71717A] mt-2">{t.no_arrivals_desc}</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {filteredArrivals.map((item, index) => {
                            const styles = getLineStyles(item.lineNumber, item.transportTypeCode);
                            const isFirst = index === 0;
                            const isFirstAndFlashing = isFirst && recentFlash;

                            const minutesVal = parseInt(item.departureTime);
                            const isApproaching = (item.departureTimeSecs !== undefined && item.departureTimeSecs <= 30) || (!item.departureTimeSecs && (item.departureTime === '0 min' || item.departureTime.includes(' s') || item.departureTime.toLowerCase().includes('aprox') || item.departureTime.toLowerCase().includes('inm') || item.departureTime.toLowerCase().includes('llegando') || minutesVal < 1));

                            // Buscar aproximación posterior
                            const indexInTotal = arrivals.findIndex(a => a === item);
                            const subsequentArrival = arrivals.slice(indexInTotal + 1).find(a => a.lineNumber === item.lineNumber && a.lineBound === item.lineBound);
                            const nextDurationStr = subsequentArrival ? subsequentArrival.departureTime : '12 min';

                            return (
                              <div
                                key={`${item.lineNumber}-${index}-${item.departureTime}`}
                                className={`card rounded-2xl p-4 transition-all duration-300 relative overflow-hidden flex flex-col ${
                                  isFirstAndFlashing
                                    ? 'border-emerald-500 bg-[#071d11] shadow-[0_0_20px_rgba(16,185,129,0.3)] scale-[1.01]'
                                    : isFirst
                                      ? 'card-active border-[#0076C0] ' + styles.glow + ' ' + styles.bg
                                      : 'border-[#1A1A1A] ' + styles.bg
                                }`}
                              >
                                <div className="flex gap-4 items-center">
                                  {/* Badge Circular */}
                                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-black text-xl text-white shrink-0" style={{ backgroundColor: styles.lineColor }}>
                                    {item.lineNumber}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-[9.5px] uppercase text-[#71717A] tracking-wider font-bold mb-0.5">
                                      {t.platform_direction} {item.lineDirection === '1' ? t.prev_terminal : t.prev_retorno}
                                    </div>
                                    <div className="text-base font-extrabold text-white tracking-tight truncate leading-tight">
                                      {item.lineBound}
                                    </div>

                                    {isApproaching ? (
                                      <div className="text-[13px] font-bold text-[#FFD700] italic animate-pulse mt-1">
                                        {t.entering_station}
                                      </div>
                                    ) : (
                                      <div className="text-[13px] font-medium text-[#A1A1AA] mt-1">
                                        {t.next_train_en}: <span className="font-extrabold text-white" style={{ color: isFirst ? (isFirstAndFlashing ? '#10B981' : styles.accentColor) : '#FFFFFF' }}>{item.departureTime}</span>
                                      </div>
                                    )}
                                    <div className="text-[10.5px] text-[#71717A] font-mono mt-1">
                                      {t.subsequent_train}: {nextDurationStr}
                                    </div>
                                  </div>
                                  <div className="text-right flex flex-col items-end gap-1.5 justify-center">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded font-mono ${isApproaching ? 'text-[#FFD700] bg-[#FFD700]/10 animate-pulse' : 'text-[#71717A] bg-[#1A1A1A]'}`}>
                                      {isApproaching ? t.status_now : t.status_normal}
                                    </span>
                                    {isFirstAndFlashing && (
                                      <span className="text-[8px] bg-emerald-500/20 text-emerald-400 font-extrabold uppercase px-1.5 py-0.5 rounded tracking-widest animate-pulse border border-emerald-500/30">
                                        RE-SYNC
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: styles.lineColor }} />
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* PESTAÑA 2: SIGUIENTES ESTACIONES (ROUTE INTERACTIVE TRACKER) */}
                  {activeTab === 'route' && (
                    <motion.div
                      key="route-tab"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-4"
                    >
                      <div className="p-4 bg-[#121212] border border-[#1A1A1A] rounded-2xl space-y-3">
                        <h3 className="text-xs font-bold uppercase text-[#0076C0] tracking-widest flex items-center gap-1.5">
                          <Route className="w-4 h-4" /> {t.spectrum_header}
                        </h3>
                        <p className="text-[11px] text-[#A1A1AA] leading-normal">
                          {t.spectrum_desc} <strong className="text-white">{getCurrentStopName().split('(')[0]}</strong>.
                        </p>
                      </div>

                      {/* LISTA DE LÍNEAS DE LA ESTACIÓN */}
                      {getStationRoutes() ? (
                        <div className="space-y-6 pt-2">
                          {getStationRoutes()!.map((lineObj, lIdx) => (
                            <div key={lIdx} className="bg-black/50 border border-[#1A1A1A] rounded-2xl p-4">
                              <div className="flex items-center gap-2 mb-4">
                                <span className="text-[9.5px] font-black px-2.5 py-1 uppercase rounded-md text-white" style={{ backgroundColor: lineObj.color }}>
                                  {lineObj.line}
                                </span>
                                <span className="text-[10px] text-[#71717A] font-mono">{t.dynamic_route}</span>
                              </div>

                              {/* VERTICAL NODAL NETWORK MAP */}
                              <div className="relative pl-6 space-y-4">
                                {/* Vector Connector */}
                                <div className="absolute left-[7px] top-1.5 bottom-1.5 w-[2px]" style={{ backgroundColor: lineObj.color }} />

                                {lineObj.stops.map((stopName, sIdx) => {
                                  const isCurrent = sIdx === 0;
                                  return (
                                    <div key={sIdx} className="flex items-center justify-between relative text-xs">
                                      <div className={`absolute -left-[23px] w-3 h-3 rounded-full border-2 bg-black flex items-center justify-center transition-all`} style={{ borderColor: isCurrent ? '#FFFFFF' : lineObj.color }} />
                                      <span className={`${isCurrent ? 'font-black text-white text-[13px]' : 'text-[#A1A1AA] font-medium'}`}>
                                        {stopName} {isCurrent && <span className="text-[9px] text-[#0076C0] font-bold uppercase tracking-wider ml-1">{t.tuned_line}</span>}
                                      </span>
                                      <span className="text-[10px] font-mono text-[#71717A]">
                                        {isCurrent ? t.at_platform : `+${sIdx * 3.5} min`}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        /* FALLBACK PARA PARADAS GENÉRICAS */
                        <div className="bg-[#121212] border border-[#1A1A1A] rounded-2xl p-5 space-y-4">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-black border border-[#1A1A1A] rounded-full flex items-center justify-center">
                              <Route className="w-5 h-5 text-zinc-500" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-white uppercase">{lang === 'es' ? 'Recorrido Madrid Alternativo' : 'Alternative Madrid Route'}</p>
                              <p className="text-[10px] text-[#71717A] font-mono">ID: {stopId}</p>
                            </div>
                          </div>
                          
                          <div className="relative pl-6 space-y-5">
                            <div className="absolute left-[7px] top-1.5 bottom-1.5 w-[2px] bg-[#0076C0]" />
                            
                            <div className="flex justify-between items-center text-xs relative">
                              <div className="absolute -left-[23px] w-3 h-3 rounded-full border-2 border-white bg-[#0076C0]" />
                              <span className="font-extrabold text-white">{getCurrentStopName().split('(')[0]}</span>
                              <span className="text-[9px] text-[#0076C0] font-mono font-bold">{lang === 'es' ? 'Origen' : 'Origin'}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs relative">
                              <div className="absolute -left-[23px] w-3 h-3 rounded-full border border-[#0076C0] bg-black" />
                              <span className="text-[#A1A1AA]">{lang === 'es' ? 'Estación Intermedia Simulada' : 'Simulated Intermediate Station'}</span>
                              <span className="text-[10px] font-mono text-[#71717A]">+3 min</span>
                            </div>
                            <div className="flex justify-between items-center text-xs relative">
                              <div className="absolute -left-[23px] w-3 h-3 rounded-full border border-[#0076C0] bg-black" />
                              <span className="text-[#A1A1AA]">{lang === 'es' ? 'Terminal de Ruta Madrid' : 'Madrid Route Terminal'}</span>
                              <span className="text-[10px] font-mono text-[#71717A]">+7 min</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* PESTAÑA 3: ESTACIONES CERCANAS (MAP/STATIONS SELECTOR) */}
                  {activeTab === 'nearby' && (
                    <motion.div
                      key="nearby-tab"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-4"
                    >
                      <div className="p-4 bg-[#121212] border border-[#1A1A1A] rounded-2xl space-y-2">
                        <h3 className="text-xs font-bold uppercase text-[#4CAF50] tracking-widest flex items-center gap-1.5">
                          <Compass className="w-4 h-4" /> {t.nearby_heading}
                        </h3>
                        <p className="text-[11px] text-[#A1A1AA] leading-normal mb-3">
                          {t.nearby_desc}
                        </p>
                        <button
                          onClick={handleLocateNearest}
                          disabled={isLocating}
                          className="w-full bg-[#0076C0] text-white p-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#005a93] transition-colors disabled:opacity-50 mt-4"
                        >
                          <MapPin className="w-4 h-4" />
                          {isLocating ? (lang === 'es' ? 'Localizando...' : 'Locating...') : t.geolocate_btn}
                        </button>
                        {locationError && (
                          <div className="mt-2 text-xs text-[#E21F1F] flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {locationError}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2.5">
                        {NEARBY_STOPS_LIST.map((item) => {
                          const isCurrent = stopId === item.id;
                          return (
                            <button
                              key={item.id}
                              onClick={() => {
                                setStopId(item.id);
                                setActiveTab('arrivals'); // Ir a las llegadas de esa parada inmediatamente 
                              }}
                              className={`w-full text-left p-3.5 rounded-2xl border text-xs flex justify-between items-center transition-all ${
                                isCurrent 
                                  ? 'bg-[#121212] border-[#0076C0] text-white shadow-[0_0_15px_rgba(0,118,192,0.1)]' 
                                  : 'bg-black border-[#1A1A1A] text-[#A1A1AA] hover:bg-[#121212] hover:text-white'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className={`w-2.5 h-2.5 rounded-full ${
                                  item.type === 'metro' ? 'bg-[#E21F1F]' : 'bg-[#10B981]'
                                }`} />
                                <div className="text-left">
                                  <p className="font-extrabold uppercase tracking-wide text-white">{item.name.split('(')[0]}</p>
                                  <span className="text-[9.5px] font-mono text-[#71717A] block mt-0.5">Parada: {item.id} • {item.dist}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 text-[10px] text-[#0076C0] font-bold uppercase">
                                {isCurrent ? 'Active' : t.btn_tune}
                                <ChevronRight className="w-3.5 h-3.5" />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* PESTAÑA 4: CONFIGURACIONES (SETTINGS AND OLED CONTROL) */}
                  {activeTab === 'settings' && (
                    <motion.div
                      key="settings-tab"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-4"
                    >
                      {/* CONTROLES DE LA BASE DE DATOS */}
                      <div className="p-4 bg-[#121212] border border-[#1A1A1A] rounded-2xl space-y-4 text-xs font-sans">
                        <h3 className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-[#2A2A2F] pb-2">
                          <Sliders className="w-4 h-4 text-[#0076C0]" /> Sintonía de Red
                        </h3>
                        
                        {/* INTERVALO DE AUTO REFRESH */}
                        <div className="space-y-1 pt-2 border-t border-[#1A1A1A]">
                          <span className="text-[10px] uppercase text-[#71717A] tracking-wider font-extrabold block">{t.polling_interval}</span>
                          <p className="text-[11.5px] text-[#A1A1AA] leading-normal" dangerouslySetInnerHTML={{ __html: t.polling_desc.replace('15 SEGUNDOS', '<span class="text-[#0076C0] font-black">15 SEGUNDOS</span>').replace('15 SECONDS', '<span class="text-[#0076C0] font-black">15 SECONDS</span>') }} />
                        </div>
                      </div>

                      {/* AJUSTES VISUALES OLED */}
                      <div className="p-4 bg-[#121212] border border-[#1A1A1A] rounded-2xl space-y-4 text-xs font-sans">
                        <h3 className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-[#2A2A2F] pb-2">
                          <Moon className="w-4 h-4 text-[#0076C0]" /> Visualización OLED
                        </h3>

                        <div className="space-y-2">
                          <span className="text-[10px] uppercase text-[#71717A] tracking-wider font-extrabold block font-sans">Intensidad de Brillo Crónico</span>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => setGlowIntensity('high')}
                              className={`py-2 px-3 rounded-xl border text-[11px] font-bold transition uppercase ${
                                glowIntensity === 'high' 
                                  ? 'bg-black border-[#0076C0] text-white' 
                                  : 'bg-black border-[#1A1A1A] text-[#71717A]'
                              }`}
                            >
                              {t.brightness_high}
                            </button>
                            <button
                              onClick={() => setGlowIntensity('off')}
                              className={`py-2 px-3 rounded-xl border text-[11px] font-bold transition uppercase ${
                                glowIntensity === 'off' 
                                  ? 'bg-black border-[#0076C0] text-white' 
                                  : 'bg-black border-[#1A1A1A] text-[#71717A]'
                              }`}
                            >
                              {t.brightness_dim}
                            </button>
                          </div>
                        </div>

                        {/* ALTERNAR SCANLINES RETRO */}
                        <div className="flex items-center justify-between pt-2 border-t border-[#1A1A1A]">
                          <div>
                            <span className="text-[11px] font-extrabold uppercase text-white block">{t.scanlines_effect}</span>
                            <span className="text-[10px] text-[#71717A] block mt-0.5">{t.scanlines_desc}</span>
                          </div>
                          <button
                            onClick={() => setShowScanlines(!showScanlines)}
                            className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${
                              showScanlines ? 'bg-[#0076C0]' : 'bg-[#1A1A1A]'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full bg-white transition-transform duration-200 transform ${
                              showScanlines ? 'translate-x-6' : 'translate-x-0'
                            }`} />
                          </button>
                        </div>
                      </div>

                      {/* GESTIÓN DE CUENTA */}
                      {!isGuestMode && currentUser && (
                        <div className="p-4 bg-[#121212] border border-[#1A1A1A] rounded-2xl space-y-4 text-xs font-sans">
                          <h3 className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-[#2A2A2F] pb-2">
                            <Lock className="w-4 h-4 text-[#E11283]" /> Seguridad de Cuenta
                          </h3>
                          <div className="flex items-center justify-between pt-2">
                            <div>
                              <span className="text-[11px] font-extrabold uppercase text-white block">Contraseña de Operador</span>
                              <span className="text-[10px] text-[#71717A] block mt-0.5">Modificar clave de acceso al sistema</span>
                            </div>
                            <button
                              onClick={() => setShowChangePassModal(true)}
                              className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#E11283]/20 border border-[#2A2A2F] hover:border-[#E11283]/50 text-[#E11283] font-bold rounded-xl transition-all"
                            >
                              Modificar
                            </button>
                          </div>
                        </div>
                      )}

                      {/* CONFIGURACIÓN MANUAL RÁPIDA */}
                      <form onSubmit={handleCustomStopSubmit} className="p-4 bg-[#121212] border border-[#1A1A1A] rounded-2xl space-y-3">
                        <label className="text-[11px] font-bold text-[#71717A] uppercase tracking-wider block">{t.manual_tuning_label}</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={customStopInput}
                            onChange={(e) => setCustomStopInput(e.target.value)}
                            placeholder={t.manual_tuning_placeholder}
                            className="bg-black border border-[#1A1A1A] rounded-xl py-2 px-3 text-xs text-white placeholder-zinc-700 flex-1 focus:outline-none focus:border-[#0076C0] font-mono"
                          />
                          <button type="submit" className="bg-[#0076C0] text-white text-xs font-bold uppercase px-4 py-2 rounded-xl transition">
                            {t.btn_tune}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {/* PESTAÑA AÑADIDA: BUSCAR EN GOOGLE MAPS */}
                  {activeTab === 'maps' && (
                    <motion.div
                      key="maps-tab-search"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-4"
                    >
                      <form 
                        className="p-5 bg-[#121212] border border-[#1A1A1A] rounded-2xl space-y-4 shadow-xl"
                        onSubmit={(e) => {
                          e.preventDefault();
                          const target = e.currentTarget.elements.namedItem('destination') as HTMLInputElement;
                          if (target.value.trim()) {
                            window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(target.value)}`, '_blank', 'noopener,noreferrer');
                          }
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                           <MapPin className="w-5 h-5 text-[#0076C0]" />
                           <h3 className="text-sm font-black uppercase tracking-widest text-[#0076C0]">
                             Google Maps
                           </h3>
                        </div>
                        <p className="text-xs text-[#A1A1AA] mb-4">
                          {t.maps_google_desc}
                        </p>

                        <div className="space-y-3">
                           <div>
                              <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider mb-1 block">Origen</label>
                              <div className="bg-black/50 border border-transparent rounded-xl py-3 px-4 text-xs text-zinc-400 font-mono flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#0076C0]"></span>
                                {t.maps_google_origin}
                              </div>
                           </div>
                           
                           <div>
                              <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider mb-1 block">Destino</label>
                              <div className="relative">
                                <input 
                                  type="text" 
                                  name="destination"
                                  required
                                  placeholder="Ej: Puerta del Sol, Madrid"
                                  className="w-full bg-black border border-[#1A1A1A] rounded-xl py-3 pl-4 pr-10 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#0076C0] transition-colors"
                                />
                                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                              </div>
                           </div>
                        </div>

                        <button 
                          type="submit" 
                          className="w-full mt-4 bg-[#0076C0] hover:bg-[#005A93] text-white text-xs font-bold uppercase tracking-wider py-4 rounded-xl transition-transform active:scale-95 flex items-center justify-center gap-2"
                        >
                          {t.maps_google_btn} <ExternalLink className="w-4 h-4 ml-1" />
                        </button>
                      </form>
                    </motion.div>
                  )}

                  {/* PESTAÑA: AGENTE CONVERSACIONAL DE IA (MULTI-MODAL SESSION) */}
                  {activeTab === 'ia' && (
                    <motion.div
                      key="ia-tab-main"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col h-[520px] bg-black border border-[#1A1A1A] rounded-2xl overflow-hidden text-left"
                    >
                      {/* Session Details Header */}
                      <div className="bg-[#09090B] border-b border-[#1A1A1A] p-3 flex flex-col gap-2.5 shrink-0">
                        {/* Interactive UI Inner-Tab Toggler */}
                        <div className="grid grid-cols-2 bg-black border border-[#1A1A1F] p-1 rounded-xl">
                          <button
                            onClick={() => setIaSubTab('voice')}
                            className={`py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all text-center flex items-center justify-center gap-1.5 ${
                              iaSubTab === 'voice' 
                                ? 'bg-[#E11283] text-white shadow-[0_2px_8px_rgba(225,18,131,0.2)]' 
                                : 'text-[#71717A] hover:text-white'
                            }`}
                          >
                            <Mic className="w-3.5 h-3.5" /> Voz en Vivo (Vapi)
                          </button>
                          <button
                            onClick={() => setIaSubTab('chat')}
                            className={`py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all text-center flex items-center justify-center gap-1.5 ${
                              iaSubTab === 'chat' 
                                ? 'bg-[#1C1C1F] text-white' 
                                : 'text-[#71717A] hover:text-white'
                            }`}
                          >
                            <MessageSquare className="w-3.5 h-3.5" /> Chat de Texto
                          </button>
                        </div>

                        <div className="flex justify-between items-center">
                          <h3 className="text-xs font-black uppercase text-[#E11283] tracking-widest flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 animate-pulse" /> AgentSession Connect
                          </h3>
                          <span className="text-[9px] font-mono bg-[#1C1C1F] text-[#E11283] font-bold px-2 py-0.5 rounded-full uppercase">
                            {isAuthenticated ? 'Conectado (Secure)' : 'Sesión Invitado'}
                          </span>
                        </div>
                        
                        {/* Audio & LLM Specs Panel */}
                        {iaSubTab === 'chat' && (
                          <div className="text-[8px] font-mono text-[#71717A] bg-black/40 border border-[#1A1A1C] p-2 rounded-lg space-y-1">
                            <p className="font-bold text-[#A1A1AA]">⚙️ CONFIGURACIÓN SINTONIZADA:</p>
                            <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
                              <div>STT: <span className="text-white">deepgram/nova-3</span></div>
                              <div>LLM: <span className="text-white">openai/gpt-5.3-chat-latest</span></div>
                              <div>TTS: <span className="text-white">cartesia/sonic-3</span></div>
                              <div>TURN: <span className="text-white">MultilingualModel()</span></div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Content Switcher: Guest constraint vs. Active Conversation */}
                      {isGuestMode && !isAuthenticated ? (
                        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-5 bg-[#030303]">
                          <div className="w-12 h-12 rounded-2xl bg-[#2A0F1F] border border-[#5C163D] flex items-center justify-center animate-pulse">
                            <Lock className="w-6 h-6 text-[#E11283]" />
                          </div>
                          <div className="space-y-1.5 max-w-xs">
                            <h4 className="text-xs font-black uppercase tracking-wider text-white">Sesión Limitada</h4>
                            <p className="text-xs text-[#71717A]">
                              Para activar la sesión interactiva {iaSubTab === 'voice' ? 'de voz con Vapi' : 'con el Agente de IA'} y planificar tus rutas en tiempo real, es necesario conectar tu cuenta.
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              setIsGuestMode(false);
                            }}
                            className="bg-[#E11283] hover:bg-[#C20E6F] text-white hover:scale-105 active:scale-95 transition-all text-[11px] font-black uppercase tracking-widest px-6 py-3 rounded-xl shadow-[0_0_15px_rgba(225,18,131,0.2)]"
                          >
                            Iniciar sesión / Registrarse
                          </button>
                        </div>
                      ) : (
                        <div className="flex-1 overflow-hidden relative flex flex-col justify-between">
                          {iaSubTab === 'voice' ? (
                            <div className="flex-1 overflow-hidden p-3 bg-black">
                              <LiveKitVoiceAssistant currentUser={currentUser} />
                            </div>
                          ) : (
                            <div className="flex-1 flex flex-col justify-between overflow-hidden relative">
                              {/* Messages Scrollable Panel */}
                              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin">
                                {aiMessages.map((msg, idx) => (
                                  <div
                                    key={idx}
                                    className={`flex flex-col max-w-[85%] ${
                                      msg.role === 'user' ? 'ml-auto items-end text-right' : 'mr-auto items-start text-left'
                                    }`}
                                  >
                                    <span className="text-[8px] font-mono uppercase tracking-wider text-[#71717A] mb-0.5 px-1">
                                      {msg.role === 'user' ? 'Tú (Pasajero)' : 'Agent IA'}
                                    </span>
                                    <div
                                      className={`rounded-2xl px-3.5 py-2.5 text-xs font-medium leading-relaxed shadow-sm ${
                                        msg.role === 'user'
                                          ? 'bg-gradient-to-br from-[#E11283] to-[#A3085C] text-white rounded-tr-none'
                                          : 'bg-[#121214] border border-[#1A1A1C] text-[#E0E0E3] rounded-tl-none whitespace-pre-wrap'
                                      }`}
                                    >
                                      {msg.content}
                                    </div>
                                  </div>
                                ))}

                                {/* Streaming/Typing Loader */}
                                {aiSending && (
                                  <div className="flex flex-col max-w-[80%] mr-auto items-start">
                                    <span className="text-[8px] font-mono uppercase tracking-wider text-[#71717A] mb-0.5">IA</span>
                                    <div className="rounded-2xl rounded-tl-none px-4 py-3 bg-[#121214] border border-[#1A1A1C] flex items-center gap-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#E11283] animate-bounce" style={{ animationDelay: '0ms' }} />
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#E11283] animate-bounce" style={{ animationDelay: '150ms' }} />
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#E11283] animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Sound wave visualizer for simulated voice recording */}
                              {micActive && (
                                <div className="absolute inset-x-0 bottom-0 top-0 bg-black/90 p-6 flex flex-col items-center justify-center z-20 space-y-4">
                                  <div className="flex items-center gap-1 h-12">
                                    <span className="w-1 bg-[#E11283] rounded-full animate-[pulse_0.6s_infinite_alternate]" style={{ height: '30%', animationDelay: '0ms' }} />
                                    <span className="w-1 bg-[#E11283] rounded-full animate-[pulse_0.6s_infinite_alternate]" style={{ height: '70%', animationDelay: '100ms' }} />
                                    <span className="w-1 bg-[#E11283] rounded-full animate-[pulse_0.6s_infinite_alternate]" style={{ height: '100%', animationDelay: '200ms' }} />
                                    <span className="w-1 bg-[#E11283] rounded-full animate-[pulse_0.6s_infinite_alternate]" style={{ height: '50%', animationDelay: '300ms' }} />
                                    <span className="w-1 bg-[#E11283] rounded-full animate-[pulse_0.6s_infinite_alternate]" style={{ height: '90%', animationDelay: '400ms' }} />
                                  </div>
                                  <div className="text-center space-y-1">
                                    <p className="text-xs font-bold text-white uppercase tracking-widest">Escuchando voz (deepgram/nova-3)...</p>
                                    <p className="text-[10px] text-[#71717A] font-mono">Enviando en {micCountdown}s o detén al soltar</p>
                                  </div>
                                </div>
                              )}

                              {/* Chat Command Controls Panel */}
                              <form onSubmit={handleAiSend} className="p-3 bg-[#09090B] border-t border-[#1A1A1A] flex items-center gap-2 shrink-0">
                                {/* Microphone trigger Button */}
                                <button
                                  type="button"
                                  onClick={startMicSimulation}
                                  disabled={aiSending}
                                  className={`p-3 rounded-xl border transition-all shrink-0 active:scale-95 relative ${
                                    micActive 
                                      ? 'bg-[#E11283] border-[#E11283] text-white animate-pulse' 
                                      : 'bg-black border-[#1A1A1A] text-[#71717A] hover:text-[#E11283] hover:border-[#E11283]/30'
                                  }`}
                                >
                                  <Mic className="w-4 h-4" />
                                </button>

                                {/* Direct text input */}
                                <input
                                  type="text"
                                  value={aiInput}
                                  onChange={(e) => setAiInput(e.target.value)}
                                  placeholder="Escribe tu consulta de transporte aquí..."
                                  disabled={aiSending || micActive}
                                  className="flex-1 bg-black border border-[#1A1A1A] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#52525B] focus:outline-none focus:border-[#E11283] transition-colors"
                                />

                                {/* Send execution trigger */}
                                <button
                                  type="submit"
                                  disabled={!aiInput.trim() || aiSending || micActive}
                                  className="p-3 bg-[#E11283] hover:bg-[#C20E6F] text-white disabled:opacity-30 rounded-xl transition-all active:scale-95 shrink-0"
                                >
                                  <Send className="w-4 h-4" />
                                </button>
                              </form>
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  )}

                </AnimatePresence>

              </div>

              {/* BARRA DE BOTONES DE MENÚ INFERIOR DE 7 SECCIONES (SOPHSTICATED DOCK BAR) */}
              <nav className="border-t border-[#1A1A1A] bg-black grid grid-cols-7 z-40 relative">
                <button
                  onClick={() => setActiveTab('home')}
                  className={`py-3.5 flex flex-col items-center justify-center gap-1 transition-all ${
                    activeTab === 'home' ? 'text-[#0076C0] scale-105 font-bold' : 'text-[#71717A] hover:text-[#A1A1AA]'
                  }`}
                >
                  <Home className="w-[18px] h-[18px]" />
                  <span className="text-[9px] uppercase tracking-wider">{t.tab_nav_home}</span>
                </button>

                <button
                  onClick={() => { setActiveTab('arrivals'); setSelectedLineFilter('ALL'); }}
                  className={`py-3.5 flex flex-col items-center justify-center gap-1 transition-all ${
                    activeTab === 'arrivals' ? 'text-[#0076C0] scale-105 font-bold' : 'text-[#71717A] hover:text-[#A1A1AA]'
                  }`}
                >
                  <Train className="w-[18px] h-[18px]" />
                  <span className="text-[9px] uppercase tracking-wider">{t.tab_nav_next}</span>
                </button>

                <button
                  onClick={() => setActiveTab('route')}
                  className={`py-3.5 flex flex-col items-center justify-center gap-1 transition-all ${
                    activeTab === 'route' ? 'text-[#0076C0] scale-105 font-bold' : 'text-[#71717A] hover:text-[#A1A1AA]'
                  }`}
                >
                  <Route className="w-[18px] h-[18px]" />
                  <span className="text-[9px] uppercase tracking-wider">{t.tab_nav_line}</span>
                </button>

                <button
                  onClick={() => setActiveTab('nearby')}
                  className={`py-3.5 flex flex-col items-center justify-center gap-1 transition-all ${
                    activeTab === 'nearby' ? 'text-[#0076C0] scale-105 font-bold' : 'text-[#71717A] hover:text-[#A1A1AA]'
                  }`}
                >
                  <MapPin className="w-[18px] h-[18px]" />
                  <span className="text-[9px] uppercase tracking-wider">{t.tab_nav_nearby}</span>
                </button>

                <button
                  onClick={() => setActiveTab('maps')}
                  className={`py-3.5 flex flex-col items-center justify-center gap-1 transition-all ${
                    activeTab === 'maps' ? 'text-[#0076C0] scale-105 font-bold' : 'text-[#71717A] hover:text-[#A1A1AA]'
                  }`}
                >
                  <Map className="w-[18px] h-[18px]" />
                  <span className="text-[9px] uppercase tracking-wider">{t.tab_nav_maps}</span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`py-3.5 flex flex-col items-center justify-center gap-1 transition-all ${
                    activeTab === 'settings' ? 'text-[#0076C0] scale-105 font-bold' : 'text-[#71717A] hover:text-[#A1A1AA]'
                  }`}
                >
                  <Settings className="w-[18px] h-[18px]" />
                  <span className="text-[9px] uppercase tracking-wider">{t.tab_nav_config}</span>
                </button>

                <button
                  onClick={() => setActiveTab('ia')}
                  className={`py-3.5 flex flex-col items-center justify-center gap-1 transition-all ${
                    activeTab === 'ia' ? 'text-[#E11283] scale-105 font-bold' : 'text-[#71717A] hover:text-[#A1A1AA]'
                  }`}
                >
                  <Sparkles className="w-[18px] h-[18px]" />
                  <span className="text-[9px] uppercase tracking-wider">Agente IA</span>
                </button>
              </nav>

            </div>
          </div>
        </section>
      </main>

      {/* FOOTER GENERAL */}
      <footer id="app-footer" className="w-full max-w-5xl mt-12 border-t border-[#1A1A1A] pt-8 text-center text-xs text-[#71717A] font-medium space-y-1 relative pb-12">
        <p>© 2026 {t.crt_title}</p>
        <p className="text-[11px]">{lang === 'es' ? 'Sleek OLED Multi-View Display System — Alta fidelidad y rendimiento móvil optimizados.' : 'Sleek OLED Multi-View Display System — High fidelity and optimized mobile performance.'}</p>
      </footer>

      {/* MODAL DE CAMBIAR CONTRASEÑA (VISTA TRANSIT OLED HIGH-CONTRAST) */}
      <AnimatePresence>
        {showChangePassModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.15 }}
              className="w-full max-w-sm bg-[#0C0C0F] border border-[#1C1C24] p-6 rounded-2xl shadow-2xl relative overflow-hidden"
            >
              {/* Decorative accent lines */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#E11283] via-[#0076C0] to-purple-600" />
              
              <div className="flex items-center gap-2.5 mb-5 text-left">
                <div className="bg-[#E11283]/15 p-2 rounded-lg border border-[#E11283]/30">
                  <Lock className="w-5 h-5 text-[#E11283]" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase text-white tracking-wider">Cambiar Clave de Acceso</h3>
                  <p className="text-[10px] font-mono text-[#71717A] uppercase tracking-widest">Procedimiento de Seguridad</p>
                </div>
              </div>

              {changePassErrors && (
                <div className="mb-4 bg-[#1C0D15] border border-[#521C35] rounded-xl p-3 text-xs flex items-start gap-2 text-left text-[#FFA4C0] font-mono leading-tight">
                  <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <span>{changePassErrors}</span>
                </div>
              )}

              {changePassSuccess && (
                <div className="mb-4 bg-[#0A1A10] border border-[#163B22] rounded-xl p-3 text-xs flex items-start gap-2 text-left text-emerald-400 font-mono leading-tight">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 animate-ping shrink-0" />
                  <span>{changePassSuccess}</span>
                </div>
              )}

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setChangePassErrors(null);
                  setChangePassSuccess(null);

                  if (!changePassForm.currentPassword || !changePassForm.newPassword || !changePassForm.confirmPassword) {
                    setChangePassErrors('Todos los campos son obligatorios.');
                    return;
                  }

                  if (changePassForm.newPassword !== changePassForm.confirmPassword) {
                    setChangePassErrors('Las contraseñas nuevas no coinciden.');
                    return;
                  }

                  if (changePassForm.newPassword.length < 4) {
                    setChangePassErrors('La nueva contraseña debe tener al menos 4 caracteres.');
                    return;
                  }

                  setChangePassLoading(true);
                  try {
                    const token = localStorage.getItem('pids_token');
                    if (!token) throw new Error('No se detectó un token de sesión.');
                    const res = await PiDSApiClient.changePassword(
                      token, 
                      changePassForm.currentPassword, 
                      changePassForm.newPassword
                    );
                    if (res && res.success) {
                      setChangePassSuccess('Contraseña cambiada con éxito.');
                      setChangePassForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                      setTimeout(() => {
                        setShowChangePassModal(false);
                        setChangePassSuccess(null);
                      }, 1800);
                    }
                  } catch (err: any) {
                    setChangePassErrors(err.message || 'Error al intentar cambiar la contraseña.');
                  } finally {
                    setChangePassLoading(false);
                  }
                }}
                className="space-y-4 text-left"
              >
                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-[#71717A] tracking-wider block">Contraseña Actual</label>
                  <div className="relative">
                    <input
                      type={showModalCurrentPass ? "text" : "password"}
                      required
                      value={changePassForm.currentPassword}
                      onChange={(e) => setChangePassForm({ ...changePassForm, currentPassword: e.target.value })}
                      className="w-full bg-[#121215] border border-[#1E1E24] focus:border-[#E11283] focus:outline-none rounded-xl text-xs text-white pl-3.5 pr-10 py-2.5 font-mono"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowModalCurrentPass(!showModalCurrentPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-white transition-colors cursor-pointer"
                      tabIndex={-1}
                    >
                      {showModalCurrentPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-[#71717A] tracking-wider block">Nueva Contraseña</label>
                  <div className="relative">
                    <input
                      type={showModalNewPass ? "text" : "password"}
                      required
                      value={changePassForm.newPassword}
                      onChange={(e) => setChangePassForm({ ...changePassForm, newPassword: e.target.value })}
                      className="w-full bg-[#121215] border border-[#1E1E24] focus:border-[#E11283] focus:outline-none rounded-xl text-xs text-white pl-3.5 pr-10 py-2.5 font-mono"
                      placeholder="Mín. 4 caracteres"
                    />
                    <button
                      type="button"
                      onClick={() => setShowModalNewPass(!showModalNewPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-white transition-colors cursor-pointer"
                      tabIndex={-1}
                    >
                      {showModalNewPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-[#71717A] tracking-wider block">Confirmar Nueva Contraseña</label>
                  <div className="relative">
                    <input
                      type={showModalConfirmPass ? "text" : "password"}
                      required
                      value={changePassForm.confirmPassword}
                      onChange={(e) => setChangePassForm({ ...changePassForm, confirmPassword: e.target.value })}
                      className="w-full bg-[#121215] border border-[#1E1E24] focus:border-[#E11283] focus:outline-none rounded-xl text-xs text-white pl-3.5 pr-10 py-2.5 font-mono"
                      placeholder="Re-escribe contraseña nueva"
                    />
                    <button
                      type="button"
                      onClick={() => setShowModalConfirmPass(!showModalConfirmPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-white transition-colors cursor-pointer"
                      tabIndex={-1}
                    >
                      {showModalConfirmPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex gap-2.5 pt-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setShowChangePassModal(false);
                      setChangePassForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                      setChangePassErrors(null);
                      setChangePassSuccess(null);
                    }}
                    className="flex-1 bg-black hover:bg-[#111] border border-[#1E1E24] hover:border-[#52525B] text-white font-semibold text-xs py-2.5 rounded-xl transition-all cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={changePassLoading}
                    className="flex-1 bg-gradient-to-r from-[#E11283] to-[#B00C63] hover:from-[#FF1C9F] hover:to-[#C20E6F] text-white font-semibold text-xs py-2.5 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-lg shadow-[#E11283]/10 cursor-pointer"
                  >
                    {changePassLoading ? 'Cambiando...' : 'Guardar'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SLEEK LINE COUNTDOWN INDICATOR */}
      <div className="fixed bottom-0 left-0 w-full h-1.5 bg-[#1A1A1A] z-50">
        <div 
          className="h-full bg-[#0076C0] transition-all duration-1000 shadow-[0_0_12px_#0076C0]"
          style={{ width: `${pollingPercent}%` }}
        />
      </div>

    </div>
  );
}
