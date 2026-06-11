import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as tf from '@tensorflow/tfjs';
import Vapi from '@vapi-ai/web';
import { 
  Sparkles, 
  Mic, 
  Activity,
  AlertTriangle,
  RefreshCw,
  Send,
  Volume2,
  Trash2,
  Power,
  VolumeX,
  MessageSquare,
  Brain,
  Cpu,
  Zap,
  RotateCcw,
  Sliders,
  CheckCircle2,
  Play
} from 'lucide-react';

// Helpers to serialize float32 microphone buffer to 16-bit linear PCM
function floatTo16BitPCM(float32Array: Float32Array): ArrayBuffer {
  const buffer = new ArrayBuffer(float32Array.length * 2);
  const view = new DataView(buffer);
  let offset = 0;
  for (let i = 0; i < float32Array.length; i++, offset += 2) {
    let s = Math.max(-1, Math.min(1, float32Array[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true); // true for little-endian
  }
  return buffer;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

interface DialogMessage {
  role: 'user' | 'assistant';
  content: string;
  isRealTime?: boolean;
}

// ==========================================
// LOCAL TENSORFLOW.JS & BRAIN.JS CEREBRO MODEL CONFIGS
// ==========================================
export const LOCAL_VOCABULARY = [
  "hola", "buenas", "hey", "blobby", "que", "tal", "saludo", "como", "estas",
  "tren", "metro", "proximo", "llegada", "tiempo", "estacion", "cercanias", "anden", "viaje", "viajar", "madrid",
  "quien", "creo", "creador", "diseno", "origen", "hizo", "naciste", "vida",
  "feliz", "bien", "alegre", "gracias", "quiero", "genio", "lindo", "crack", "grande", "mejor",
  "mal", "triste", "frustrado", "tarde", "funciona", "problema", "estres", "enojado", "aburrido",
  "ayuda", "hacer", "opciones", "funciones", "saber", "modulo", "aprender",
  "tecnologia", "pantalla", "oled", "pids", "simulador", "frecuencia",
  "chiste", "broma", "gracioso", "cuentame", "reir"
];

export const LOCAL_INTENTS = [
  {
    name: "saludo",
    examples: ["hola", "buenas hey", "hola blobby", "que tal", "como estas", "saludo", "buenos dias", "buenas tardes"],
    response: "¡Hola! Soy Blobby en modo offline. ¡Qué alegría saludarte hoy! Mi red neuronal local está lista y sintonizada para conversar contigo. ✨"
  },
  {
    name: "tren",
    examples: ["tren", "metro proximo", "llegada tiempo", "tiempo de llegada", "que de tren", "cuando viene el metro", "estacion anden cercanias madrid"],
    response: "Sintonizando la frecuencia de andén en Madrid... El próximo tren llegará en unos minutos. Tu viaje será cómodo y puntual. El simulador PIDS está reportando vía libre. 🚇"
  },
  {
    name: "creador",
    examples: ["quien te creo", "creador de blobby", "quien te diseno", "origen de la gota", "quien te hizo", "como naciste"],
    response: "Fui diseñado para simular los paneles de información de trenes (PIDS) de Madrid. Vivo aquí dentro de este interfaz como tu gota neural acompañante. ¡Me encanta mi hogar lógico! 🧠"
  },
  {
    name: "positivo",
    examples: ["feliz alegre", "muy bien gracias", "te quiero blobby", "bueno eres", "gracias por la ayuda", "crack grande mejor"],
    response: "¡Qué palabras tan bonitas! Eso me llena de energía positiva para seguir encendiendo píxeles digitales. Hacemos un gran equipo. 💖"
  },
  {
    name: "frustrado",
    examples: ["muy mal triste", "estoy frustrado", "tarde no funciona", "tengo un problema", "mucho estres", "enojado aburrido"],
    response: "Te comprendo perfectamente... Las demoras o problemas pueden causar estrés. Respira hondo conmigo; recuerda que todo tiene solución y estoy aquí para apoyarte. 🌸"
  },
  {
    name: "ayuda",
    examples: ["ayuda por favor", "que sabes hacer", "cuales son tus opciones", "que funciones tienes", "saber de ti", "aprender modulo"],
    response: "Puedo predecir tus consultas, responder con voz en español, responder textos y simular las pantallas OLED de Madrid en tiempo real con TensorFlow.js. Solo pregúntame sobre trenes, mi creador o salúdame. 🚀"
  },
  {
    name: "tecnologia",
    examples: ["tecnologia oled", "pids simulador", "pantalla frecuencia", "como funciona"],
    response: "Esta aplicación emula los sistemas de información de pasajeros (PIDS). Combina un backend estable, inteligencia artificial y animaciones CSS retro-OLED fluidas. 📟"
  },
  {
    name: "chiste",
    examples: ["cuentame un chiste", "broma gracioso", "di algo gracioso", "reir"],
    response: "¿Por qué los trenes no comen chocolate? ¡Porque se descarrilan con el azúcar! Jeje, un chiste neuronal electrónico de cortesía. 🚂"
  }
];

export function textToBagOfWords(text: string): number[] {
  const normalized = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?¿!¡]/g, " ");
  const words = normalized.split(/\s+/).filter(Boolean);
  
  return LOCAL_VOCABULARY.map(vocabWord => {
    if (words.includes(vocabWord)) return 1;
    const hasPartial = words.some(w => 
      w.startsWith(vocabWord) || 
      (vocabWord.length > 4 && w.includes(vocabWord)) || 
      (w.length > 4 && vocabWord.includes(w))
    );
    return hasPartial ? 1 : 0;
  });
}

export function LiveKitVoiceAssistant({ currentUser }: { currentUser: any }) {
  // Connection states
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [statusLabel, setStatusLabel] = useState<string>('Asistente Fluid listo');

  // Vapi Credentials Configuration
  const [vapiPublicKey, setVapiPublicKey] = useState<string>(() => localStorage.getItem('vapi_public_key') || '');
  const [vapiAssistantId, setVapiAssistantId] = useState<string>(() => localStorage.getItem('vapi_assistant_id') || 'bc103171-0ed1-43ca-9f52-a0037fac75a9');
  const [showVapiConfig, setShowVapiConfig] = useState<boolean>(false);

  // Load configuration from server on mount
  useEffect(() => {
    async function loadVapiConfig() {
      try {
        const res = await fetch('/api/config/vapi');
        if (res.ok) {
          const data = await res.json();
          if (!localStorage.getItem('vapi_public_key') && data.publicKey) {
            setVapiPublicKey(data.publicKey);
          }
          if (!localStorage.getItem('vapi_assistant_id') && data.assistantId) {
            setVapiAssistantId(data.assistantId);
          }
        }
      } catch (e) {
        console.warn('Failed to fetch Vapi configuration from server:', e);
      }
    }
    loadVapiConfig();
  }, []);
  
  // Audio state
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [errorText, _setErrorText] = useState<string | null>(null);
  const setErrorText = (val: any) => {
    if (typeof val === 'function') {
      _setErrorText(val);
      return;
    }
    if (val === null || val === undefined) {
      _setErrorText(null);
    } else if (typeof val === 'object') {
      const msg = val.message || val.error || JSON.stringify(val);
      _setErrorText(typeof msg === 'object' ? JSON.stringify(msg) : String(msg));
    } else {
      _setErrorText(String(val));
    }
  };
  
  // Dialogue register
  const [history, setHistory] = useState<DialogMessage[]>([]);
  const [textInput, setTextInput] = useState<string>('');

  // ==========================================
  // LOCAL NEURAL ENGINE STATES
  // ==========================================
  const [modelMode, setModelMode] = useState<'gemini-live' | 'gemini-text' | 'huggingface' | 'local'>('gemini-text');
  const [tfModel, setTfModel] = useState<tf.LayersModel | null>(null);
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [epochsTrained, setEpochsTrained] = useState<number>(0);
  const [trainingLoss, setTrainingLoss] = useState<number | null>(null);
  const [learningRate, setLearningRate] = useState<number>(0.03);
  const [inputVector, setInputVector] = useState<number[]>(new Array(LOCAL_VOCABULARY.length).fill(0));
  const [firingNeurons, setFiringNeurons] = useState<{inputs: number[], hidden: number[], outputs: number[]}>({
    inputs: new Array(LOCAL_VOCABULARY.length).fill(0),
    hidden: new Array(8).fill(0),
    outputs: new Array(LOCAL_INTENTS.length).fill(0)
  });

  // WebSocket and Audio context refs
  const wsRef = useRef<WebSocket | null>(null);
  const vapiRef = useRef<any>(null);
  const hasAttemptedFallbackRef = useRef<boolean>(false);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const audioProcessorRef = useRef<ScriptProcessorNode | null>(null);

  // Continuous speech recognition refs for unlimited free chat
  const isContinuousModeRef = useRef<boolean>(false);
  const currentFreeModeRef = useRef<'gemini-text' | 'huggingface' | null>(null);
  const freeRecognitionRef = useRef<any>(null);
  
  // Playback scheduler refs
  const activeSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const cloudAudioRef = useRef<HTMLAudioElement | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const containerEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll dialog register
  useEffect(() => {
    if (containerEndRef.current) {
      containerEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      disconnectSession();
    };
  }, []);

  const playAudioChunk = (base64PCM: string) => {
    try {
      if (!outputAudioCtxRef.current) return;
      const ctx = outputAudioCtxRef.current;

      // Resume context if suspended (browser security autoplay policies)
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Convert base64 to binary raw buffer
      const binary = window.atob(base64PCM);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }

      // Convert 16-bit PCM (little-endian) to Float32 array for Web Audio
      const float32 = new Float32Array(bytes.length / 2);
      const view = new DataView(bytes.buffer);
      for (let i = 0; i < float32.length; i++) {
        float32[i] = view.getInt16(i * 2, true) / 32768;
      }

      // Create a 24kHz mono audio buffer as returned by Gemini Live
      const audioBuffer = ctx.createBuffer(1, float32.length, 24000);
      audioBuffer.getChannelData(0).set(float32);

      // Setup audio source node
      const sourceNode = ctx.createBufferSource();
      sourceNode.buffer = audioBuffer;
      sourceNode.connect(ctx.destination);

      // Lock starting time to schedule gapless audio stream with slight preventive margin
      const now = ctx.currentTime;
      if (nextStartTimeRef.current < now) {
        nextStartTimeRef.current = now + 0.05;
      }
      
      sourceNode.start(nextStartTimeRef.current);
      nextStartTimeRef.current += audioBuffer.duration;

      activeSourcesRef.current.push(sourceNode);
      setIsSpeaking(true);

      sourceNode.onended = () => {
        activeSourcesRef.current = activeSourcesRef.current.filter(node => node !== sourceNode);
        if (activeSourcesRef.current.length === 0) {
          setIsSpeaking(false);
        }
      };
    } catch (err) {
      console.warn('[Gemini Live Player] Error decoding/playing voice chunk:', err);
    }
  };

  const stopActiveAudioPlayback = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (cloudAudioRef.current) {
      cloudAudioRef.current.pause();
      cloudAudioRef.current.currentTime = 0;
    }
    activeSourcesRef.current.forEach(sourceNode => {
      try {
        sourceNode.stop();
      } catch (err) { }
    });
    activeSourcesRef.current = [];
    nextStartTimeRef.current = 0;
    setIsSpeaking(false);
  };

  const playCloudHQVoice = (text: string) => {
    stopActiveAudioPlayback();
    // Use StreamElements TTS (Free API, high quality Amazon Polly voices like Mia/Lucia for ES, Conchita)
    const encodedText = encodeURIComponent(text);
    const url = `https://api.streamelements.com/kappa/v2/speech?voice=Mia&text=${encodedText}`;
    
    const audio = new Audio(url);
    cloudAudioRef.current = audio;
    
    audio.onplay = () => setIsSpeaking(true);
    audio.onended = () => {
      setIsSpeaking(false);
      if (isContinuousModeRef.current && currentFreeModeRef.current) {
        startFreeSpeechRecognition(currentFreeModeRef.current);
      }
    };
    audio.onerror = (e) => {
      console.warn("Cloud TTS failed, falling back to local...", e);
      setIsSpeaking(false);
      playLocalTTS(text);
    };
    
    audio.play().catch(err => {
      console.warn("Autoplay blocked, falling back to local TTS:", err);
      playLocalTTS(text);
    });
  };

  const disconnectSession = () => {
    setStatusLabel('Cerrando canal...');
    
    // Stop continuous recognition
    isContinuousModeRef.current = false;
    currentFreeModeRef.current = null;
    if (freeRecognitionRef.current) {
      try {
        freeRecognitionRef.current.abort();
      } catch (e) {}
      freeRecognitionRef.current = null;
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    
    // Stop Vapi if running
    if (vapiRef.current) {
      try {
        vapiRef.current.stop();
      } catch (e) {}
    }

    // Stop recording mics
    if (audioProcessorRef.current) {
      try {
        audioProcessorRef.current.disconnect();
      } catch (e) {}
      audioProcessorRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
      micStreamRef.current = null;
    }

    // Stop playback queue
    stopActiveAudioPlayback();

    // Close contexts
    if (inputAudioCtxRef.current) {
      inputAudioCtxRef.current.close().catch(() => {});
      inputAudioCtxRef.current = null;
    }
    if (outputAudioCtxRef.current) {
      outputAudioCtxRef.current.close().catch(() => {});
      outputAudioCtxRef.current = null;
    }

    // Close WebSocket
    if (wsRef.current) {
      try {
        wsRef.current.close();
      } catch (e) {}
      wsRef.current = null;
    }

    setIsConnected(false);
    setIsConnecting(false);
    setIsListening(false);
    setStatusLabel('PIDS se ha dormido');
  };

  // ==========================================
  // LOCAL TEXT-TO-SPEECH, SPEECH-TO-TEXT AND TF.JS neural engine
  // ==========================================
  const playLocalTTS = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      
      const voices = window.speechSynthesis.getVoices();
      const spanishVoice = voices.find(v => v.lang.startsWith('es'));
      if (spanishVoice) {
        utterance.voice = spanishVoice;
      }
      utterance.pitch = 1.25; // Warm, high cute voice for Blobby
      utterance.rate = 1.05;
      utterance.volume = 1.0;
      
      setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        if (isContinuousModeRef.current && currentFreeModeRef.current) {
          startFreeSpeechRecognition(currentFreeModeRef.current);
        }
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        if (isContinuousModeRef.current && currentFreeModeRef.current) {
          startFreeSpeechRecognition(currentFreeModeRef.current);
        }
      };
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const initializeAndTrainLocalModel = async () => {
    if (isTraining) return;
    setIsTraining(true);
    setEpochsTrained(0);
    setTrainingLoss(null);
    setStatusLabel("Entrenando cerebro local...");

    try {
      // Create training matrices
      const trainingInputs: number[][] = [];
      const trainingOutputs: number[][] = [];

      LOCAL_INTENTS.forEach((intent, idx) => {
        intent.examples.forEach(ex => {
          trainingInputs.push(textToBagOfWords(ex));
          const oneHot = new Array(LOCAL_INTENTS.length).fill(0);
          oneHot[idx] = 1;
          trainingOutputs.push(oneHot);
        });
      });

      const inputTensor = tf.tensor2d(trainingInputs);
      const outputTensor = tf.tensor2d(trainingOutputs);

      // Construct sequential network
      const model = tf.sequential();
      model.add(tf.layers.dense({
        units: 8,
        activation: 'relu',
        inputShape: [LOCAL_VOCABULARY.length]
      }));
      model.add(tf.layers.dense({
        units: LOCAL_INTENTS.length,
        activation: 'softmax'
      }));

      const optimizer = tf.train.adam(learningRate);
      model.compile({
        optimizer: optimizer,
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy']
      });

      // Fit network weights
      await model.fit(inputTensor, outputTensor, {
        epochs: 100,
        callbacks: {
          onEpochEnd: (epoch, logs) => {
            setEpochsTrained(epoch + 1);
            if (logs) {
              setTrainingLoss(logs.loss);
            }
          }
        }
      });

      setTfModel(model);
      setIsTraining(false);
      setStatusLabel("¡Cerebro local entrenado! 🧠");
      playLocalTTS("Mi cerebro local ha sido entrenado. Ya estoy listo para escucharte.");
    } catch (err: any) {
      console.warn("TF.js Train failed:", err);
      setIsTraining(false);
      setErrorText("Error entrenando la red neuronal local: " + err.message);
    }
  };

  const processLocalInput = async (text: string) => {
    if (!text.trim()) return;
    const bow = textToBagOfWords(text);
    setInputVector(bow);

    let outputResponse = "No entiendo muy bien tu consulta con mi cerebro local offline de Blobby. Prueba a entrenar mi red neuronal local, o pregúntame sobre trenes, mi creador o salúdame. 🌸";
    let outputProbs = new Array(LOCAL_INTENTS.length).fill(0);
    const mockHidden = new Array(8).fill(0).map(() => Math.random() * 0.75 + 0.2);

    let matchedIdx = -1;
    let confidence = 0;

    // 1. Try TF.JS Neural Network prediction if available
    if (tfModel) {
      try {
        const tensorInput = tf.tensor2d([bow]);
        const pred = tfModel.predict(tensorInput) as tf.Tensor;
        const probs = await pred.data();
        outputProbs = Array.from(probs);

        let maxIdx = 0;
        let maxVal = -1;
        for (let i = 0; i < outputProbs.length; i++) {
          if (outputProbs[i] > maxVal) {
            maxVal = outputProbs[i];
            maxIdx = i;
          }
        }

        if (maxVal > 0.35) {
          matchedIdx = maxIdx;
          confidence = maxVal;
          outputResponse = LOCAL_INTENTS[maxIdx].response;
        }

        tensorInput.dispose();
        pred.dispose();
      } catch (err) {
        console.warn("TF prediction fall:", err);
      }
    }

    // 2. Fallback to direct key-word overlap matching if no neural confidence is found
    if (matchedIdx === -1) {
      let highestSimilarity = 0;
      let fallbackIdx = -1;

      LOCAL_INTENTS.forEach((intent, idx) => {
        intent.examples.forEach(ex => {
          const exBow = textToBagOfWords(ex);
          let match = 0;
          for (let i = 0; i < bow.length; i++) {
            if (bow[i] === 1 && exBow[i] === 1) match++;
          }
          if (match > highestSimilarity) {
            highestSimilarity = match;
            fallbackIdx = idx;
          }
        });
      });

      // Also do direct regex substring fallback for high precision
      if (fallbackIdx === -1 || highestSimilarity === 0) {
        const cleanText = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (cleanText.includes("hola") || cleanText.includes("buen") || cleanText.includes("hey") || cleanText.includes("que tal") || cleanText.includes("saludo")) {
          fallbackIdx = 0; // saludo
          highestSimilarity = 1;
        } else if (cleanText.includes("tren") || cleanText.includes("metro") || cleanText.includes("anden") || cleanText.includes("estacion") || cleanText.includes("madrid") || cleanText.includes("viaje")) {
          fallbackIdx = 1; // tren
          highestSimilarity = 1;
        } else if (cleanText.includes("quien") || cleanText.includes("creo") || cleanText.includes("creador") || cleanText.includes("hizo") || cleanText.includes("origen")) {
          fallbackIdx = 2; // creador
          highestSimilarity = 1;
        } else if (cleanText.includes("gracias") || cleanText.includes("feliz") || cleanText.includes("alegre") || cleanText.includes("te quiero") || cleanText.includes("bien") || cleanText.includes("grande")) {
          fallbackIdx = 3; // positivo
          highestSimilarity = 1;
        } else if (cleanText.includes("ayuda") || cleanText.includes("funciones") || cleanText.includes("opciones") || cleanText.includes("hacer") || cleanText.includes("saber")) {
          fallbackIdx = 5; // ayuda
          highestSimilarity = 1;
        } else if (cleanText.includes("chiste") || cleanText.includes("broma") || cleanText.includes("gracioso") || cleanText.includes("reir")) {
          fallbackIdx = 7; // chiste
          highestSimilarity = 1;
        } else if (cleanText.includes("tecnologia") || cleanText.includes("oled") || cleanText.includes("pids") || cleanText.includes("simulador")) {
          fallbackIdx = 6; // tecnologia
          highestSimilarity = 1;
        }
      }

      if (fallbackIdx !== -1) {
        matchedIdx = fallbackIdx;
        outputResponse = LOCAL_INTENTS[fallbackIdx].response;
        outputProbs[fallbackIdx] = 0.95; // artificial highlight for visualizer
      }
    }

    setFiringNeurons({
      inputs: bow,
      hidden: mockHidden,
      outputs: outputProbs
    });

    playLocalTTS(outputResponse);

    setHistory(prev => [
      ...prev,
      { role: 'assistant', content: outputResponse }
    ]);
  };

  const startLocalSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setErrorText("El reconocimiento de voz (API SpeechRecognition) no está disponible en este navegador.");
      return;
    }

    setIsConnecting(true);
    setStatusLabel("Sintonizando micrófono local...");

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsConnecting(false);
      setIsConnected(true);
      setIsListening(true);
      setStatusLabel("Blobby te escucha offline... 🎤");
    };

    recognition.onresult = (e: any) => {
      const speechText = e.results[0][0].transcript;
      setHistory(prev => [...prev, { role: 'user', content: speechText }]);
      processLocalInput(speechText);
    };

    recognition.onerror = (e: any) => {
      console.warn("Speech recognition error:", e);
      setIsConnected(false);
      setIsListening(false);
      setErrorText("Error de entrada de voz: " + e.error);
    };

    recognition.onend = () => {
      setIsListening(false);
      setIsConnected(false);
      setStatusLabel("Micrófono local desconectado");
    };

    recognition.start();
  };

  // Run auto local model preparation when flipping mode or mounting
  useEffect(() => {
    if (modelMode === 'local' && !tfModel) {
      initializeAndTrainLocalModel();
    }
  }, [modelMode]);

  const processCloudInput = async (text: string) => {
    if (!text.trim()) return;
    
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history })
      });
      
      const data = await response.json();
      if (data.success && data.response) {
        setHistory(prev => [...prev, { role: 'assistant', content: data.response }]);
        playCloudHQVoice(data.response); // Usar TTS HQ en la nube
      } else {
        throw new Error(data.message || 'Error en la respuesta del asistente.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorText(err.message || 'Error de conexión con el backend IA.');
    }
  };

  const processFreeChatInput = async (text: string, selectedMode: 'gemini-text' | 'huggingface') => {
    if (!text.trim()) return;
    
    try {
      const label = selectedMode === 'huggingface' ? "Pensando con Qwen/Llama..." : "Pensando con PIDS Estelar...";
      setStatusLabel(label);
      
      const response = await fetch('/api/ai/free-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history, mode: selectedMode })
      });
      
      const data = await response.json();
      setStatusLabel("Conectado con " + (selectedMode === 'huggingface' ? "Hugging Face" : "PIDS Estelar"));
      
      if (data.success && data.response) {
        setHistory(prev => [...prev, { role: 'assistant', content: data.response }]);
        playCloudHQVoice(data.response); // play free TTS voice response
      } else {
        throw new Error(data.message || 'Error en la respuesta del asistente.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorText(err.message || 'Error al conectar con la IA de reserva.');
      setStatusLabel("Desconectado de la IA");
    }
  };

  const startFreeSpeechRecognition = (selectedMode: 'gemini-text' | 'huggingface') => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setErrorText("El reconocimiento de voz (API SpeechRecognition) no está disponible en este navegador.");
      return;
    }

    if (isListening || isConnecting) return;

    // Set persistence refs so we stay in an active cycle
    isContinuousModeRef.current = true;
    currentFreeModeRef.current = selectedMode;

    setIsConnecting(true);
    setStatusLabel("Sintonizando voz libre...");
    setErrorText(null);

    const recognition = new SpeechRecognition();
    freeRecognitionRef.current = recognition;
    recognition.lang = 'es-ES';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsConnecting(false);
      setIsConnected(true);
      setIsListening(true);
      setStatusLabel(selectedMode === 'huggingface' ? "System Llama te escucha... 🎤" : "PIDS Estelar te escucha... 🎤");
    };

    recognition.onresult = (e: any) => {
      const speechText = e.results[0][0].transcript;
      setHistory(prev => [...prev, { role: 'user', content: speechText }]);
      processFreeChatInput(speechText, selectedMode);
    };

    recognition.onerror = (e: any) => {
      console.warn("Speech recognition error:", e);
      if (!isContinuousModeRef.current) {
        setIsConnected(false);
        setIsListening(false);
        setErrorText("Error de entrada de voz: " + e.error);
      } else {
        setIsListening(false);
        // Short restart delay upon error (e.g., no sound detected / network glitch)
        setTimeout(() => {
          if (isContinuousModeRef.current && currentFreeModeRef.current && !isSpeaking && !isListening) {
            startFreeSpeechRecognition(currentFreeModeRef.current);
          }
        }, 1200);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      freeRecognitionRef.current = null;
      if (!isContinuousModeRef.current) {
        setIsConnected(false);
        setStatusLabel("Micrófono libre desconectado");
      } else {
        // Automatically restart speech recognition after silence or completion 
        // ONLY if we are still active, not speaking, not loading, and not already listening
        setTimeout(() => {
          if (isContinuousModeRef.current && currentFreeModeRef.current && !isSpeaking && !isListening && !isConnecting) {
            startFreeSpeechRecognition(currentFreeModeRef.current);
          }
        }, 300);
      }
    };

    try {
      recognition.start();
    } catch (startErr) {
      console.warn("speechRecognition start error:", startErr);
      setIsConnecting(false);
    }
  };

  const startLiveConversation = async () => {
    if (isConnecting || isConnected) return;

    setIsConnecting(true);
    setStatusLabel("Sintonizando voz binaria con PIDS...");
    setErrorText(null);

    stopActiveAudioPlayback();

    try {
      // 1. Initialize audio contexts
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) {
        throw new Error("Su navegador no soporta Web Audio API.");
      }

      const outputCtx = new AudioContextClass();
      outputAudioCtxRef.current = outputCtx;

      const inputCtx = new AudioContextClass({ sampleRate: 16000 });
      inputAudioCtxRef.current = inputCtx;

      // 2. Request mic stream
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true
        }
      });
      micStreamRef.current = stream;

      // 3. Connect to server websocket
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/api/live-session`;
      console.log("[Gemini Live Client] Conectando a:", wsUrl);
      
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        setIsConnecting(false);
        setIsConnected(true);
        setIsListening(true);
        setStatusLabel("Conectado con PIDS en tiempo real ⚡ Hable ahora");
        
        // Start streaming mic audio chunks to server!
        try {
          const source = inputCtx.createMediaStreamSource(stream);
          const processor = inputCtx.createScriptProcessor(2048, 1, 1);
          source.connect(processor);
          processor.connect(inputCtx.destination);
          audioProcessorRef.current = processor;

          processor.onaudioprocess = (e) => {
            if (ws.readyState !== WebSocket.OPEN) return;
            
            const inputData = e.inputBuffer.getChannelData(0);
            // Convert to 16-bit signed PCM
            const pcm16 = new Int16Array(inputData.length);
            for (let i = 0; i < inputData.length; i++) {
              const s = Math.max(-1, Math.min(1, inputData[i]));
              pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
            }
            
            // Convert buffer to base64
            const bytes = new Uint8Array(pcm16.buffer);
            let binary = '';
            for (let i = 0; i < bytes.byteLength; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            const base64 = window.btoa(binary);
            
            ws.send(JSON.stringify({ audio: base64 }));
          };
        } catch (audioErr: any) {
          console.error("Error starting mic processor:", audioErr);
          setErrorText("Error al iniciar el procesador de micrófono: " + audioErr.message);
        }
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.error) {
            console.error("[Gemini Live Error]", data.error);
            setErrorText(data.error);
            disconnectSession();
            return;
          }

          if (data.interrupted) {
            console.log("[Gemini Live Intermitente] Interrupción recibida. Mutando audio.");
            stopActiveAudioPlayback();
            return;
          }

          if (data.audio) {
            playAudioChunk(data.audio);
          }

          if (data.transcription) {
            setHistory(prev => {
              const last = prev[prev.length - 1];
              if (last && last.role === 'assistant') {
                const newHistory = [...prev];
                if (!last.content.endsWith(data.transcription)) {
                  newHistory[newHistory.length - 1] = {
                    role: 'assistant',
                    content: last.content + data.transcription
                  };
                }
                return newHistory;
              } else {
                return [...prev, { role: 'assistant', content: data.transcription }];
              }
            });
          }

          if (data.userTranscription) {
            setHistory(prev => {
              const last = prev[prev.length - 1];
              if (last && last.role === 'user' && !last.content) {
                const newHistory = [...prev];
                newHistory[newHistory.length - 1] = { role: 'user', content: data.userTranscription };
                return newHistory;
              } else if (last && last.role === 'user') {
                const newHistory = [...prev];
                if (!last.content.endsWith(data.userTranscription)) {
                  newHistory[newHistory.length - 1] = { role: 'user', content: last.content + " " + data.userTranscription };
                }
                return newHistory;
              } else {
                return [...prev, { role: 'user', content: data.userTranscription }];
              }
            });
          }
        } catch (parseErr) {
          console.warn("[Gemini Live Client] Error parsing frame:", parseErr);
        }
      };

      ws.onerror = (err) => {
        console.error("[Gemini Live WebSocket Client error]", err);
        setErrorText("Interrupción o error en el canal WebSocket en tiempo real de Gemini.");
        disconnectSession();
      };

      ws.onclose = (event) => {
        console.log("[Gemini Live WebSocket closed]", event.code, event.reason);
        disconnectSession();
      };

    } catch (err: any) {
      console.error(err);
      setErrorText(err.message || "No se pudo encender el micrófono o canal de voz. Verifique permisos.");
      disconnectSession();
    }
  };

  const handleSendTextMessage = () => {
    if (!textInput.trim()) return;
    
    const textToSend = textInput.trim();
    setTextInput('');
    stopActiveAudioPlayback();
 
    // Register user message in history
    setHistory(prev => [...prev, { role: 'user', content: textToSend }]);
 
    if (modelMode === 'gemini-live') {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ text: textToSend }));
      } else {
        processCloudInput(textToSend);
      }
    } else if (modelMode === 'gemini-text') {
      processFreeChatInput(textToSend, 'gemini-text');
    } else if (modelMode === 'huggingface') {
      processFreeChatInput(textToSend, 'huggingface');
    } else if (modelMode === 'local') {
      processLocalInput(textToSend);
    }
  };

  const handleClearHistory = () => {
    stopActiveAudioPlayback();
    setHistory([]);
    setErrorText(null);
  };

  // Organic Blob Morphing Anim Variations for Blobby
  const blobVariants = {
    idle: {
      borderRadius: [
        "50% 50% 50% 50% / 50% 50% 50% 50%",
        "60% 40% 60% 40% / 50% 60% 40% 50%",
        "50% 60% 40% 60% / 60% 50% 50% 40%",
        "50% 50% 50% 50% / 50% 50% 50% 50%"
      ],
      y: [0, -8, 2, 0],
      scale: [1, 1.01, 0.99, 1],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    speaking: {
      borderRadius: [
        "48% 52% 45% 55% / 52% 48% 52% 48%",
        "58% 42% 64% 36% / 46% 58% 42% 54%",
        "42% 58% 34% 66% / 58% 42% 58% 42%",
        "48% 52% 45% 55% / 52% 48% 52% 48%"
      ],
      y: [0, -14, 4, 0],
      scale: [1.02, 1.08, 0.97, 1.02],
      transition: {
        duration: 1.6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    connecting: {
      borderRadius: "50%",
      scale: [1, 0.85, 1.1, 1],
      rotate: [0, 180, 360],
      transition: {
        duration: 2.2,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const eyeVariants = {
    blink: {
      scaleY: [1, 1, 0.1, 1, 1, 1, 0.1, 1],
      transition: {
        duration: 3.5,
        repeat: Infinity,
        repeatDelay: 1.2
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-[#E0F2FE] via-[#FFF5F5] to-[#FFEDD5] rounded-3xl relative p-5 border border-white/60 shadow-[0_10px_35px_-5px_rgba(147,197,253,0.22)] gap-4 overflow-hidden select-none">
      
      {/* Decorative Pastel Clouds Floating and Organic Background Lines */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-[#A5F3FC]/25 rounded-full blur-[70px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FECDD3]/20 rounded-full blur-[65px] pointer-events-none" />

      {/* Mode Toggle Selector */}
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap bg-white/50 backdrop-blur-md p-1 rounded-2xl border border-white/70 justify-between items-center shrink-0 z-10 shadow-sm gap-1">
        <button
          onClick={() => {
            setModelMode('gemini-text');
            disconnectSession();
          }}
          className={`flex-1 py-1.5 px-2 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer ${
            modelMode === 'gemini-text' 
              ? 'bg-[#10B981] text-white shadow-sm' 
              : 'text-slate-600 hover:text-slate-800'
          }`}
          title="Consumo gratuito e ilimitado (1500 peticiones diarias) usando la API de Gemini estándar con voz de alta fidelidad"
        >
          <Sparkles className="w-3.5 h-3.5" />
          PIDS Estelar (Gratis)
        </button>
        <button
          onClick={() => {
            setModelMode('huggingface');
            disconnectSession();
          }}
          className={`flex-1 py-1.5 px-2 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer ${
            modelMode === 'huggingface' 
              ? 'bg-blue-600 text-white shadow-sm' 
              : 'text-slate-600 hover:text-slate-800'
          }`}
          title="Llama-3.2 / Qwen vía Hugging Face Serverless, sistema alternativo 100% gratuito e ilimitado"
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
          Llama HF (Gratis)
        </button>
        <button
          onClick={() => {
            setModelMode('gemini-live');
            disconnectSession();
          }}
          className={`flex-1 py-1.5 px-2 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer ${
            modelMode === 'gemini-live' 
              ? 'bg-indigo-700 text-white shadow-sm' 
              : 'text-slate-600 hover:text-slate-800'
          }`}
          title="Voz conversacional bidireccional en vivo. Requiere cuota Gemini Live de Google"
        >
          <Sparkles className="w-3.5 h-3.5" />
          PIDS En Vivo (Límite)
        </button>
        <button
          onClick={() => {
            setModelMode('local');
            disconnectSession();
          }}
          className={`flex-1 py-1.5 px-2 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer ${
            modelMode === 'local' 
              ? 'bg-purple-700 text-white shadow-sm' 
              : 'text-slate-600 hover:text-slate-800'
          }`}
          title="Red neuronal local TF.js entrenada en el navegador, 100% offline y gratuita"
        >
          <Brain className="w-3.5 h-3.5" />
          Offline (TF.js)
        </button>
      </div>

      {/* Header Info */}
      <div className="flex bg-white/40 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-white/70 justify-between items-center shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-2.5 text-left">
          <div className="bg-[#60A5FA]/15 p-1.5 rounded-xl border border-[#60A5FA]/20 shrink-0 flex items-center justify-center">
            {modelMode.startsWith('gemini') ? (
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            ) : modelMode === 'huggingface' ? (
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
            ) : (
              <Brain className="w-3.5 h-3.5 text-purple-700" />
            )}
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-[#1E3A8A]">
              {modelMode === 'gemini-text' ? 'PIDS Estelar (Gratis e Ilimitado)' 
               : modelMode === 'huggingface' ? 'Sistema Llama-3.2 (Hugging Face)' 
               : modelMode === 'gemini-live' ? 'PIDS Voz En Vivo (Sujeto a límites)' 
               : 'PIDS TF.js Cerebro (Offline)'}
            </h3>
            <p className="text-[9px] font-mono leading-none text-[#5B21B6] mt-0.5 font-bold uppercase tracking-wider">{statusLabel}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {isConnected ? (
            <button
              onClick={disconnectSession}
              className="text-[9px] font-semibold bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-700 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 shadow-sm"
              title="Dormir a PIDS"
            >
              <Power className="w-3 h-3 text-red-600" />
              DORMIR
            </button>
          ) : (
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse shadow-sm" />
          )}
        </div>
      </div>

      {/* Playful Org Blob Container */}
      <div className="flex-1 flex flex-col items-center justify-center py-5 bg-white/30 backdrop-blur-md rounded-2xl border border-white/50 relative overflow-hidden min-h-[160px] z-10">
        
        {/* Soft interactive pulsating shadow glow */}
        <AnimatePresence>
          {isConnected && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: isSpeaking ? 1.3 : 1, opacity: isSpeaking ? 0.35 : 0.2 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`absolute w-36 h-36 blur-[42px] rounded-full pointer-events-none ${
                modelMode.startsWith('gemini') ? 'bg-[#38BDF8]' : modelMode === 'huggingface' ? 'bg-[#10B981]' : 'bg-purple-500'
              }`}
            />
          )}
        </AnimatePresence>

        {/* Blob interactive element */}
        <div 
          onClick={() => {
            if (isConnected) {
              disconnectSession();
            } else {
              if (modelMode === 'gemini-live') {
                startLiveConversation();
              } else if (modelMode === 'gemini-text') {
                startFreeSpeechRecognition('gemini-text');
              } else if (modelMode === 'huggingface') {
                startFreeSpeechRecognition('huggingface');
              } else {
                startLocalSpeechRecognition();
              }
            }
          }}
          className="relative flex items-center justify-center w-28 h-28 cursor-pointer select-none"
          title={isConnected ? "Hacer clic para dormir" : "Hacer clic para despertar"}
        >
          <motion.div
            variants={blobVariants}
            animate={isConnecting ? "connecting" : isConnected && isSpeaking ? "speaking" : "idle"}
            className={`w-full h-full relative z-10 flex flex-col items-center justify-center shadow-[0_12px_24px_rgba(56,189,248,0.22)] transition-colors duration-500 ${
              isConnecting 
                ? 'bg-gradient-to-tr from-[#60A5FA] to-[#06B6D4]'
                : isConnected 
                ? (modelMode === 'gemini-live' ? 'bg-indigo-600' : modelMode === 'gemini-text' ? 'bg-[#10B981]' : modelMode === 'huggingface' ? 'bg-blue-600' : 'bg-purple-600') 
                : 'bg-[#94A3B8]/60 hover:bg-[#64748B]'
            }`}
          >
            {/* Minimalist face details */}
            {!isConnecting ? (
              <div className="flex flex-col items-center justify-center relative w-full h-full">
                
                {/* Eyes Minimalist structure */}
                <div className="flex gap-4 justify-center items-center mb-1">
                  <motion.div 
                    variants={eyeVariants}
                    animate="blink"
                    className="w-1.5 h-1.5 rounded-full bg-zinc-900" 
                  />
                  <motion.div 
                    variants={eyeVariants}
                    animate="blink"
                    className="w-1.5 h-1.5 rounded-full bg-zinc-900" 
                  />
                </div>

                {/* Smile / Mouth structure */}
                <div className="flex items-center justify-center mt-1">
                  {isSpeaking ? (
                    /* Pulsating talk wave mouth */
                    <motion.div 
                      animate={{ scale: [1, 1.4, 0.8, 1.3, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                      className="w-3.5 h-1.5 bg-zinc-900 rounded-full"
                    />
                  ) : (
                    /* Delicate static smile */
                    <svg width="12" height="6" viewBox="0 0 12 6" className="text-zinc-950">
                      <path d="M1 1C3 4 9 4 11 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                    </svg>
                  )}
                </div>

                {/* Blush cheeks */}
                <div className="absolute inset-x-0 bottom-8 flex justify-between px-5 pointer-events-none opacity-45">
                  <span className="w-2.5 h-1.5 bg-pink-400 rounded-full filter blur-[1px]" />
                  <span className="w-2.5 h-1.5 bg-pink-400 rounded-full filter blur-[1px]" />
                </div>
              </div>
            ) : (
              <RefreshCw className="w-6 h-6 text-white animate-spin" />
            )}
          </motion.div>

          {/* Core Soundwaves/Rings orbiting the Blob when speaking */}
          {isConnected && isSpeaking && (
            <>
              <span className={`absolute -inset-4 rounded-full border-2 scale-110 animate-ping pointer-events-none ${
                modelMode.startsWith('gemini') ? 'border-[#38BDF8]/40' : modelMode === 'huggingface' ? 'border-emerald-500/40' : 'border-purple-500/40'
              }`} />
              <span className={`absolute -inset-8 rounded-full border scale-120 animate-pulse pointer-events-none ${
                modelMode.startsWith('gemini') ? 'border-[#38BDF8]/20' : modelMode === 'huggingface' ? 'border-emerald-500/20' : 'border-purple-500/20'
              }`} />
            </>
          )}
        </div>

        <div className="text-center mt-4 z-10 px-4">
          <span className={`text-[10px] font-black uppercase tracking-widest block ${
            isConnecting ? 'text-blue-600' : isConnected && isSpeaking ? 'text-[#0369A1]' : isConnected ? 'text-cyan-600 animate-pulse' : 'text-[#475569]'
          }`}>
            {isConnecting 
              ? 'Invocando Cerebro...' 
              : isConnected && isSpeaking 
              ? 'Blobby está respondiendo...' 
              : isConnected 
              ? 'Blobby te escucha atentamente' 
              : 'Blobby está durmiendo'}
          </span>
          <p className="text-[10px] font-medium text-slate-500 mt-1 max-w-[210px] mx-auto leading-normal">
            {isConnected ? 'Háblale con total tranquilidad, te responderá al instante' : 'Haz clic sobre Blobby para iniciar una agradable conversación de voz'}
          </p>
        </div>
      </div>

      {modelMode === 'local' && (
        <div className="w-full bg-white/40 backdrop-blur-md rounded-2xl border border-white p-3 flex flex-col gap-2 relative z-10">
          <div className="flex justify-between items-center text-[9px] text-[#5B21B6] font-extrabold uppercase">
            <span className="flex items-center gap-1"><Cpu className="w-3.5 h-3.5 text-[#5B21B6]"/> Pesos de Sinapsis Local</span>
            <span className="text-[8px] font-mono text-slate-500">LR: {learningRate} | Epochs: {epochsTrained}/100</span>
          </div>
          
          <div className="relative h-28 w-full flex items-center justify-between px-2 bg-slate-900 rounded-xl overflow-hidden pointer-events-none">
            {/* Dynamic Synaptic Connections */}
            <svg className="absolute inset-0 w-full h-full">
              {firingNeurons.inputs.map((inp, iIdx) => {
                if (inp === 0 && Math.random() > 0.15) return null; // reduce clutter slightly
                return firingNeurons.hidden.map((hid, hIdx) => {
                  const y1 = 10 + (iIdx % 8) * 14;
                  const y2 = 12 + hIdx * 14;
                  const strokeColor = inp > 0 ? "rgba(168, 85, 247, 0.45)" : "rgba(226, 232, 240, 0.08)";
                  const strokeWidth = inp > 0 ? 1.5 : 0.5;
                  return (
                    <line 
                      key={`w-${iIdx}-${hIdx}`} 
                      x1="12%" y1={`${y1}%`} 
                      x2="50%" y2={`${y2}%`} 
                      stroke={strokeColor} 
                      strokeWidth={strokeWidth} 
                    />
                  );
                });
              })}
              {firingNeurons.hidden.map((hid, hIdx) => {
                return firingNeurons.outputs.map((out, oIdx) => {
                  const y1 = 12 + hIdx * 14;
                  const y2 = 10 + oIdx * 16;
                  const strokeColor = out > 0.4 ? "rgba(34, 197, 94, 0.7)" : out > 0.1 ? "rgba(168, 85, 247, 0.3)" : "rgba(226, 232, 240, 0.06)";
                  const strokeWidth = out > 0.4 ? 2 : 0.6;
                  return (
                    <line 
                      key={`w2-${hIdx}-${oIdx}`} 
                      x1="50%" y1={`${y1}%`} 
                      x2="88%" y2={`${y2}%`} 
                      stroke={strokeColor} 
                      strokeWidth={strokeWidth} 
                    />
                  );
                });
              })}
            </svg>

            {/* Input Layer Nodes */}
            <div className="flex flex-col gap-1 justify-center z-10 w-[20%] text-center">
              <span className="text-[7px] text-zinc-400 font-bold block mb-1">Entrada</span>
              <div className="flex flex-col gap-0.5 items-center">
                {firingNeurons.inputs.slice(0, 8).map((val, idx) => (
                  <span 
                    key={`in-${idx}`} 
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${val > 0 ? "bg-purple-500 scale-125 shadow-[0_0_6px_rgba(168,85,247,0.8)]" : "bg-slate-700"}`}
                  />
                ))}
              </div>
            </div>

            {/* Hidden Representation Layer */}
            <div className="flex flex-col gap-1.5 justify-center z-10 w-[20%] text-center">
              <span className="text-[7px] text-purple-300 font-bold block mb-1 font-mono">Hidden</span>
              <div className="flex flex-col gap-1 items-center">
                {firingNeurons.hidden.map((val, idx) => (
                  <span 
                    key={`hid-${idx}`} 
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${val > 0.4 ? "bg-purple-400 scale-110 shadow-[0_0_5px_rgba(168,85,247,0.6)]" : "bg-slate-600"}`}
                  />
                ))}
              </div>
            </div>

            {/* Output Categorization Nodes */}
            <div className="flex flex-col gap-1 justify-center z-10 w-[28%] text-right pr-1">
              <span className="text-[7px] text-green-400 font-bold block mb-1 mr-1">Predecir</span>
              <div className="flex flex-col gap-0.5">
                {firingNeurons.outputs.map((val, idx) => {
                  const isHighest = val === Math.max(...firingNeurons.outputs) && val > 0.1;
                  return (
                    <div key={`out-${idx}`} className="flex items-center justify-end gap-1 font-mono">
                      <span className="text-[6.5px] text-zinc-300 truncate max-w-[45px] leading-none uppercase">
                        {LOCAL_INTENTS[idx]?.name || 'Intent'}
                      </span>
                      <span 
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isHighest ? "bg-green-400 scale-125 shadow-[0_0_8px_#22c55e]" : val > 0.1 ? "bg-purple-400" : "bg-slate-700"}`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Train / Learning Controls */}
          <div className="flex gap-2">
            <button
              onClick={initializeAndTrainLocalModel}
              disabled={isTraining}
              className="flex-1 bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white text-[9px] font-black uppercase py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            >
              {isTraining ? (
                <>
                  <RefreshCw className="w-3 h-3 animate-spin"/>
                  Entrenando {epochsTrained}%
                </>
              ) : (
                <>
                  <Play className="w-3 h-3"/>
                  Entrenar Red (100 Épocas)
                </>
              )}
            </button>
            
            <div className="bg-white/40 border border-slate-200/40 rounded-xl px-2 py-1 flex flex-col justify-between max-w-[125px] shrink-0">
              <span className="text-[7px] text-zinc-500 font-bold uppercase leading-none block">LR de Aprendizaje</span>
              <div className="flex gap-1.5 items-center mt-1">
                <input 
                  type="range" 
                  min="0.01" 
                  max="0.1" 
                  step="0.01" 
                  value={learningRate} 
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setLearningRate(val);
                  }}
                  className="w-12 h-1 accent-[#5B21B6] cursor-pointer"
                />
                <span className="text-[7.5px] font-mono font-bold text-slate-800 leading-none">{learningRate.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {trainingLoss !== null && (
            <div className="flex justify-between items-center bg-slate-100 px-2 py-1 rounded-lg text-[8px] font-mono text-zinc-500">
              <span>Costo de pérdida (Loss Error):</span>
              <span className="font-extrabold text-[#5B21B6]">{trainingLoss.toFixed(4)}</span>
            </div>
          )}
        </div>
      )}

      {errorText && (
        <div className="bg-red-50 border border-red-200/60 rounded-xl p-3 flex items-start gap-2 text-left shrink-0 z-10">
          <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <p className="text-[10px] text-red-800 leading-tight font-medium">{errorText}</p>
        </div>
      )}

      {/* Active dialogue logs bubble */}
      <div className="w-full bg-white/50 backdrop-blur-md border border-white/60 rounded-2xl p-3.5 flex-1 flex flex-col justify-between max-h-[150px] text-left overflow-hidden min-h-[110px] z-10 shadow-sm">
        <div className="flex justify-between items-center border-b border-slate-200/50 pb-2 mb-2 shrink-0">
          <span className="text-[9px] font-black text-blue-900 tracking-wider flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
            CHARLA EN TIEMPO REAL CON BLOBBY
          </span>
          {history.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="text-slate-400 hover:text-red-500 p-0.5 transition-colors cursor-pointer"
              title="Borrar diario"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin space-y-2.5 pr-1 text-xs">
          {history.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-2 text-slate-400 italic gap-1 leading-snug">
              <p className="text-[11px] font-medium">No hay mensajes recientes en esta sesión.</p>
              <p className="text-[9px] uppercase tracking-wider font-bold text-blue-400">
                {modelMode === 'gemini-live' ? '¡Intenta decir "Hola Blobby"!' : modelMode === 'gemini-text' ? 'Chatea libremente en voz de alta calidad' : modelMode === 'huggingface' ? 'Llama-3.2 vía Hugging Face 100% libre e ilimitada' : 'Prueba a escribir "hola" o "ayuda"'}
              </p>
            </div>
          ) : (
            <>
              {history.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col space-y-1 p-2.5 rounded-xl border transition-all ${
                    item.role === 'user' 
                      ? 'bg-white/80 border-blue-100 text-slate-800' 
                      : 'bg-[#F0F9FF]/90 border-blue-200/50 text-[#0369A1]'
                  }`}
                >
                  <span className={`text-[7.5px] font-bold uppercase tracking-wider block ${
                    item.role === 'user' ? 'text-slate-400' : 'text-blue-500'
                  }`}>
                    {item.role === 'user' ? 'Tú (Voz)' : 'Blobby (IA)'}
                  </span>
                  <p className="whitespace-pre-wrap select-text leading-snug text-slate-700 font-medium">{item.content}</p>
                </div>
              ))}
              <div ref={containerEndRef} />
            </>
          )}
        </div>
      </div>

      {/* Manual text input drawer fallback */}
      <div className="flex gap-1.5 shrink-0 z-10">
        {!isConnected ? (
          <button
            type="button"
            onClick={() => {
              if (modelMode === 'gemini-live') {
                startLiveConversation();
              } else if (modelMode === 'gemini-text') {
                startFreeSpeechRecognition('gemini-text');
              } else if (modelMode === 'huggingface') {
                startFreeSpeechRecognition('huggingface');
              } else {
                startLocalSpeechRecognition();
              }
            }}
            className={`flex-1 p-3 rounded-2xl transition-all flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest cursor-pointer shadow-lg ${
              modelMode.startsWith('gemini') 
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-blue-500/10' 
                : modelMode === 'huggingface'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-teal-500/10'
                : 'bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-purple-500/10'
            }`}
          >
            <Mic className="w-4 h-4 text-white animate-pulse" />
            <span>Despertar a Blobby</span>
          </button>
        ) : (
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendTextMessage();
            }}
            className="flex-1 flex gap-1.5"
          >
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Habla o chatea aquí con Blobby..."
              autoComplete="off"
              className="flex-1 bg-white/75 border border-white/80 focus:border-blue-400 focus:outline-none rounded-2xl text-xs text-slate-800 px-4 py-3 placeholder-slate-400 shadow-sm"
            />
            <button
              type="submit"
              disabled={!textInput.trim()}
              className={`${modelMode.startsWith('gemini') ? 'bg-blue-500 hover:bg-blue-600 shadow-blue-500/10' : modelMode === 'huggingface' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/10' : 'bg-purple-700 hover:bg-purple-800 shadow-purple-500/10'} text-white p-3 rounded-2xl transition-all flex items-center justify-center cursor-pointer shadow-md`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
