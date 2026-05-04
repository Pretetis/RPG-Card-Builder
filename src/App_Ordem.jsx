import React, { useState, useEffect } from 'react';
import { Camera, Trash2, Plus, Printer, Type, Zap, FileText, Image as ImageIcon, Sparkles, Palette, Move, Skull, Search, FileSearch, RotateCw, Maximize2, Layers, Eye, Save, Download, FolderOpen } from 'lucide-react';

const OrdemCardCreator = ({ activeApp, onSwitch } = {}) => {
  const [cardFormat, setCardFormat] = useState('poker');
  const [cardTheme, setCardTheme] = useState('ordem');

  const [cards, setCards] = useState([
  // --- SEBASTIÃO (O CAIPIRA) ---
  {
    id: 1,
    name: "O Sobrevivente Casca-Grossa",
    type: "Habilidade de Sobrevivência",
    category: "Sebastião",
    isParanormal: false,
    image: "https://images.unsplash.com/photo-1505534125556-2e921d746535?auto=format&fit=crop&q=80&w=300&h=300", 
    imageX: 50, imageY: 50, imageRotation: 0, imageScale: 1,
    flavor: "Eles chamam você de louco na cidade. Deixam rir. O que rasgou seu pai no meio não era um urso. Você aprendeu a apanhar da vida e continuar de pé.",
    description: "**Couro de Porco:**\nUma vez por cena, ao receber dano, você pode gastar 1 PE para ignorar metade do dano sofrido (arredondado para baixo). Você simplesmente cerra os dentes e engole a dor.",
    stats: "PV: 14 | SAN: 8 | PE: 2",
    fontSizeBack: 10
  },
  {
    id: 2,
    name: "O Rastreador Obsessivo",
    type: "Habilidade de Investigação",
    category: "Sebastião",
    isParanormal: false,
    image: "https://images.unsplash.com/photo-1590518349277-3e404e76a5eb?auto=format&fit=crop&q=80&w=300&h=300",
    imageX: 50, imageY: 50, imageRotation: 0, imageScale: 1,
    flavor: "A lua cheia te ensinou a ter paciência. Você sabe olhar para o mato e entender o que passou por ali. Você não é a presa.",
    description: "**Na Mira do Caçador:**\nGaste 1 PE para marcar uma criatura que você possa ver. Você recebe +1d6 de dano em todos os seus ataques contra ela até o final do combate.",
    stats: "PV: 12 | SAN: 10 | PE: 2",
    fontSizeBack: 10
  },
  {
    id: 3,
    name: "O Gatilho de Prata",
    type: "Habilidade de Combate",
    category: "Sebastião",
    isParanormal: false,
    image: "https://images.unsplash.com/photo-1595590424283-b8f1784cb194?auto=format&fit=crop&q=80&w=300&h=300",
    imageX: 50, imageY: 50, imageRotation: 0, imageScale: 1,
    flavor: "Você nunca sai de casa sem ele. É uma extensão do seu braço. Se sangra, o seu chumbo mata.",
    description: "**Saque Rápido:**\nVocê soma sua Agilidade nas rolagens de dano com armas de fogo. Além disso, pode gastar 1 PE para dar um tiro de revólver como Ação Livre (uma vez por combate).",
    stats: "PV: 10 | SAN: 10 | PE: 3",
    fontSizeBack: 10
  }
]);

  const [activeCardId, setActiveCardId] = useState(1);
  const [viewMode, setViewMode] = useState('edit');
  const [mobileTab, setMobileTab] = useState('edit');
  const [lastSaved, setLastSaved] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('rpgOrdem_save');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.cards && data.cards.length > 0) {
          setCards(data.cards);
          setActiveCardId(data.cards[0].id);
        }
        if (data.cardFormat) setCardFormat(data.cardFormat);
        if (data.cardTheme) setCardTheme(data.cardTheme);
      } catch (e) {}
    }
  }, []);

  const saveToCache = () => {
    localStorage.setItem('rpgOrdem_save', JSON.stringify({ cards, cardFormat, cardTheme }));
    setLastSaved(new Date().toLocaleTimeString('pt-BR'));
  };

  const downloadSave = () => {
    const data = JSON.stringify({ cards, cardFormat, cardTheme }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `opp-cards-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadFromFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      try {
        const data = JSON.parse(reader.result);
        if (data.cards && data.cards.length > 0) {
          setCards(data.cards);
          setActiveCardId(data.cards[0].id);
        }
        if (data.cardFormat) setCardFormat(data.cardFormat);
        if (data.cardTheme) setCardTheme(data.cardTheme);
      } catch (e) {
        alert('Arquivo inválido ou corrompido.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const activeCard = cards.find(c => c.id === activeCardId) || cards[0];

  const updateCard = (field, value) => {
    setCards(cards.map(c => c.id === activeCardId ? { ...c, [field]: value } : c));
  };

  const addCard = () => {
    const newId = Math.max(...cards.map(c => c.id), 0) + 1;
    setCards([...cards, {
      id: newId,
      name: "Novo Item O.P.P.",
      type: "Equipamento",
      category: "Categoria 0",
      isParanormal: false,
      image: null,
      imageX: 50,
      imageY: 50,
      imageRotation: 0,
      imageScale: 1,
      flavor: "Relatório de campo ou descrição breve.",
      description: "Regras mecânicas aqui.",
      stats: "Espaços: 1",
      fontSizeBack: 10
    }]);
    setActiveCardId(newId);
  };

  const deleteCard = (id) => {
    if (cards.length === 1) return;
    const newCards = cards.filter(c => c.id !== id);
    setCards(newCards);
    setActiveCardId(newCards[0].id);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateCard('image', reader.result);
      };
      reader.readAsDataURL(file);
      e.target.value = ''; 
    }
  };

  const formatText = (text, boldColor) => {
    if (!text) return null;
    return text.split('**').map((part, index) => 
      index % 2 === 1 ? <strong key={index} className="font-bold" style={{ color: boldColor }}>{part}</strong> : part
    );
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Categoria 0': return '#71717a';
      case 'Categoria I': return '#22c55e';
      case 'Categoria II': return '#3b82f6';
      case 'Categoria III': return '#a855f7';
      case 'Categoria IV': return '#eab308';
      default: return '#71717a';
    }
  };

  // Cores absolutas inseridas direto no objeto para evitar bugs de CSS/Tailwind
  const themes = {
    ordem: {
      name: 'Dossiê da Ordem',
      bg: '#f4f4f5', 
      bgImage: 'url("https://www.transparenttextures.com/patterns/notebook.png")',
      border: '#27272a',
      accent: '#27272a',
      headerBg: '#27272a', 
      textColor: '#18181b',       // Quase Preto
      headerTextColor: '#fafafa', // Branco
      flavorColor: '#3f3f46',     // Cinza Escuro
      flavorBoxBg: 'rgba(244, 244, 245, 0.95)', // Fundo claro quase opaco
      font: 'font-mono'
    },
    sangue: {
      name: 'Sangue (Violência)',
      bg: '#450a0a',
      bgImage: 'url("https://www.transparenttextures.com/patterns/black-scales.png")',
      border: '#dc2626',
      accent: '#dc2626',
      headerBg: '#7f1d1d',
      textColor: '#fef2f2',       // Vermelho bem clarinho (Branco)
      headerTextColor: '#fee2e2', 
      flavorColor: '#fca5a5',     // Vermelho médio
      flavorBoxBg: 'rgba(0, 0, 0, 0.8)', // Fundo preto semitransparente
      font: 'font-serif'
    },
    morte: {
      name: 'Morte (Tempo)',
      bg: '#18181b',
      bgImage: 'url("https://www.transparenttextures.com/patterns/dark-matter.png")',
      border: '#71717a',
      accent: '#71717a',
      headerBg: '#18181b',
      textColor: '#d4d4d8',       // Cinza claro
      boldColor: '#ffffff',       // <--- ADICIONE ESTA LINHA AQUI (Branco puro para destacar)
      headerTextColor: '#a1a1aa', 
      flavorColor: '#a1a1aa',     
      flavorBoxBg: 'rgba(0, 0, 0, 0.8)',
      font: 'font-serif'
    },
    energia: {
      name: 'Energia (Caos)',
      bg: '#2e1065',
      bgImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")',
      border: '#d946ef',
      accent: '#d946ef',
      headerBg: '#701a75',
      textColor: '#fae8ff',       // Rosa/Roxo claro
      headerTextColor: '#f5d0fe', 
      flavorColor: '#e879f9',     
      flavorBoxBg: 'rgba(0, 0, 0, 0.8)',
      font: 'font-sans'
    },
    conhecimento: {
      name: 'Conhecimento (Saber)',
      bg: '#422006',
      bgImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")',
      border: '#d97706',
      accent: '#d97706',
      headerBg: '#78350f',
      textColor: '#fef3c7',       // Amarelo claro
      headerTextColor: '#fde68a', 
      flavorColor: '#fbbf24',     
      flavorBoxBg: 'rgba(0, 0, 0, 0.8)',
      font: 'font-serif'
    },
    medo: {
      name: 'Medo (Infinito)',
      bg: '#ffffff',
      bgImage: 'none',
      border: '#000000',
      accent: '#000000',
      headerBg: '#000000',
      textColor: '#000000',       // Preto
      headerTextColor: '#ffffff', // Branco
      flavorColor: '#000000',     // Preto
      flavorBoxBg: 'rgba(255, 255, 255, 0.95)', // Fundo branco quase opaco
      font: 'font-mono tracking-tighter'
    }
  };

  const currentDim = {
    poker: { width: 63, height: 88, name: "Poker (Padrão)", perPage: 9 },
    tarot: { width: 70, height: 120, name: "Tarot (Grande)", perPage: 4 }
  }[cardFormat];
  
  const CardFront = ({ data, scale = 1, themeName }) => {
    const theme = themes[themeName];
    const categoryColor = getCategoryColor(data.category);
    
    const imgStyle = {
        objectPosition: `${data.imageX ?? 50}% ${data.imageY ?? 50}%`,
        transform: `rotate(${data.imageRotation ?? 0}deg) scale(${data.imageScale ?? 1})`,
        transition: 'transform 0.1s ease-out'
    };

    return (
      <div 
        className={`relative overflow-hidden shadow-lg flex flex-col ${theme.font} border-4`}
        style={{ 
          width: `${currentDim.width * scale}mm`, 
          height: `${currentDim.height * scale}mm`,
          backgroundImage: theme.bgImage,
          backgroundColor: theme.bg,
          borderColor: theme.accent,
        }}
      >
        <div 
          className={`p-2 text-center z-10 relative border-b-2`}
          style={{ 
            backgroundColor: theme.headerBg,
            borderColor: theme.accent,
          }}
        >
          <h3 className="font-bold leading-tight uppercase tracking-tighter" style={{ fontSize: `${13 * scale}px`, color: theme.headerTextColor }}>
            {data.name}
          </h3>
          <p className="italic opacity-90" style={{ fontSize: `${8 * scale}px`, color: theme.headerTextColor }}>{data.type}</p>
        </div>

        <div 
          className={`flex-grow relative overflow-hidden group border-b-2`}
          style={{ borderColor: theme.accent }}
        >
          {data.image ? (
            <div className="w-full h-full overflow-hidden relative">
                 <img 
                      src={data.image} 
                      alt={data.name} 
                      className={`w-full h-full object-contain absolute inset-0 ${themeName === 'medo' ? 'grayscale contrast-150' : ''}`} 
                      style={imgStyle}
                  />
            </div>
          ) : (
            <div className={`w-full h-full flex items-center justify-center bg-black bg-opacity-10`}>
              <ImageIcon size={32 * scale} style={{ color: theme.textColor, opacity: 0.3 }} />
            </div>
          )}
          
          <div 
            className={`absolute bottom-0 right-0 px-3 py-1 font-bold shadow-md z-20 text-xs uppercase tracking-widest text-white border-t-2 border-l-2`}
            style={{ 
              backgroundColor: categoryColor,
              borderColor: theme.accent,
              fontSize: `${10 * scale}px`,
            }}
          >
            {data.category}
          </div>
        </div>

        <div 
          className="p-3 relative h-1/4 flex flex-col justify-center"
          style={{ backgroundColor: theme.flavorBoxBg }}
        >
          {data.isParanormal && (
            <div className={`absolute -top-3 left-2 px-2 py-0.5 text-[10px] shadow-sm z-20 font-bold tracking-wider rounded border text-white flex items-center gap-1`} 
                 style={{ backgroundColor: '#000', borderColor: theme.accent }}>
              <Skull size={10 * scale} /> PARANORMAL
            </div>
          )}
          <p className="italic text-center leading-snug overflow-hidden" style={{ fontSize: `${10 * scale}px`, color: theme.flavorColor }}>
            "{data.flavor}"
          </p>
          {data.stats && (
             <div className="mt-2 border-t pt-1 text-center font-bold" style={{ borderColor: theme.accent, fontSize: `${9 * scale}px`, color: theme.textColor }}>
               {data.stats}
             </div>
          )}
        </div>
      </div>
    );
  };

  const CardBack = ({ data, scale = 1, themeName }) => {
    const theme = themes[themeName];
    
    return (
      <div 
        className={`relative overflow-hidden shadow-lg flex flex-col ${theme.font} border-4`}
        style={{ 
          width: `${currentDim.width * scale}mm`, 
          height: `${currentDim.height * scale}mm`,
          backgroundImage: theme.bgImage,
          backgroundColor: theme.bg,
          borderColor: theme.accent,
        }}
      >
        <div 
          className={`p-2 text-center relative z-10 border-b-2`}
          style={{ 
            backgroundColor: theme.headerBg,
            borderColor: theme.accent,
          }}
        >
          <h3 className="font-bold uppercase tracking-tighter" style={{ fontSize: `${12 * scale}px`, color: theme.headerTextColor }}>Mecânicas & Efeitos</h3>
        </div>
        
        <div className="p-4 flex-grow overflow-hidden flex flex-col relative z-0">
          <div className="prose prose-sm max-w-none flex-grow overflow-hidden">
              <p 
                className="whitespace-pre-wrap text-justify" 
                style={{ 
                    fontSize: `${(data.fontSizeBack || 10) * scale}px`,
                    lineHeight: '1.3',
                    color: theme.textColor
                }}
              >
                {formatText(data.description, theme.boldColor || theme.textColor)}
              </p>
          </div>
          
          <div className="mt-auto pt-4 border-t opacity-60 text-center flex justify-center items-center gap-1 font-bold" style={{ borderColor: theme.accent, fontSize: `${10 * scale}px`, color: theme.textColor }}>
             Ordo Realitas
          </div>
        </div>
      </div>
    );
  };

  if (viewMode === 'print') {
    return (
      <div className="min-h-screen bg-zinc-800 p-8 font-sans">
        <div className="fixed top-0 left-0 w-full bg-zinc-900 shadow-md p-4 flex justify-between items-center z-50 print:hidden text-white border-b border-zinc-700">
            <div>
              <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2"><Printer /> Impressão O.P.P.</h2>
              <p className="text-xs text-zinc-400">Tema: {themes[cardTheme].name} | Formato: {currentDim.name}</p>
            </div>
            <div className="flex gap-4">
                <button onClick={() => window.print()} className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center gap-2">
                    <Printer size={18} /> Imprimir
                </button>
                <button onClick={() => setViewMode('edit')} className="bg-zinc-700 text-zinc-100 px-4 py-2 rounded hover:bg-zinc-600">
                    Voltar ao Arquivo
                </button>
            </div>
        </div>

        <div 
            className="print-area mx-auto bg-white shadow-2xl print:shadow-none mb-8 p-[5mm] flex flex-wrap content-start justify-center gap-1 mt-16 print:mt-0" 
            style={{ width: '210mm', minHeight: '297mm', boxSizing: 'border-box' }}
          >
            <h1 className="w-full text-center text-zinc-400 mb-4 print:hidden">Layout de Impressão: Dobra ao Meio</h1>
            {cards.map(card => (
                <div key={`card-pair-${card.id}`} className="flex items-center justify-center relative p-1 break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
                    <div className="flex gap-0.5 relative">
                        <CardFront data={card} themeName={cardTheme} />
                        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-zinc-400 border-r border-dashed border-zinc-300 transform -translate-x-1/2 h-full z-10 opacity-30"></div>
                        <CardBack data={card} themeName={cardTheme} />
                    </div>
                </div>
            ))}
        </div>
        
        <style>{`
          @media print {
            @page { size: A4; margin: 0; }
            body { background: white; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            .print-area { margin: 0; box-shadow: none; padding: 5mm; display: flex; flex-wrap: wrap; justify-content: center; align-content: flex-start; gap: 2mm; }
            .print-hidden { display: none !important; }
            .break-inside-avoid { break-inside: avoid; page-break-inside: avoid; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-zinc-900 font-sans overflow-hidden text-zinc-100">
      <div className={`bg-zinc-800 border-r border-zinc-700 flex-col shadow-xl z-10 w-full md:w-64 ${mobileTab === 'list' ? 'flex' : 'hidden'} md:flex`}>
         <div className="p-4 border-b border-zinc-700 bg-zinc-900 space-y-2">
          <h1 className="text-xl font-bold text-zinc-100 flex items-center gap-2 font-mono">
            <Search className="text-red-500" /> O.P.P. Cards
          </h1>
          {onSwitch && (
            <div className="flex gap-1">
              <button
                onClick={() => onSwitch('dnd')}
                className={`flex-1 py-1.5 text-xs rounded font-bold transition-colors ${activeApp === 'dnd' ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-700 text-zinc-400 hover:bg-zinc-600'}`}
              >⚔️ D&D</button>
              <button
                onClick={() => onSwitch('ordem')}
                className={`flex-1 py-1.5 text-xs rounded font-bold transition-colors ${activeApp === 'ordem' ? 'bg-red-700 text-white' : 'bg-zinc-700 text-zinc-400 hover:bg-zinc-600'}`}
              >💀 O.P.P.</button>
            </div>
          )}
        </div>
        <div className="flex-grow overflow-y-auto p-2 space-y-2">
          {cards.map(card => (
            <div 
              key={card.id}
              onClick={() => setActiveCardId(card.id)}
              className={`p-3 rounded-md cursor-pointer transition-all border ${activeCardId === card.id ? 'bg-zinc-700 border-red-500 shadow-sm' : 'hover:bg-zinc-700/50 border-transparent'}`}
            >
              <div className="font-bold text-zinc-100 truncate">{card.name}</div>
              <div className="text-xs text-zinc-400 truncate">{card.type}</div>
            </div>
          ))}
        </div>
        <div className="p-4 pb-20 md:pb-4 border-t border-zinc-700 bg-zinc-900 space-y-2">
          <button onClick={addCard} className="w-full bg-red-700 text-white py-2 rounded hover:bg-red-600 flex items-center justify-center gap-2 font-bold transition-colors">
            <Plus size={16} /> Novo Registro
          </button>
          <div className="flex gap-2">
            <button
              onClick={saveToCache}
              className="flex-1 bg-blue-700 text-white py-1.5 rounded hover:bg-blue-600 flex items-center justify-center gap-1 text-xs"
              title="Salvar no navegador (cache local)"
            >
              <Save size={13} /> Cache
            </button>
            <button
              onClick={downloadSave}
              className="flex-1 bg-zinc-600 text-white py-1.5 rounded hover:bg-zinc-500 flex items-center justify-center gap-1 text-xs"
              title="Baixar save como arquivo JSON"
            >
              <Download size={13} /> Exportar
            </button>
          </div>
          <label
            className="w-full bg-amber-700 text-white py-1.5 rounded hover:bg-amber-600 flex items-center justify-center gap-1 text-xs cursor-pointer"
            title="Carregar save de arquivo JSON"
          >
            <FolderOpen size={13} /> Importar Save
            <input type="file" accept=".json" className="hidden" onChange={loadFromFile} />
          </label>
          {lastSaved && (
            <p className="text-[10px] text-zinc-500 text-center">💾 Salvo no cache: {lastSaved}</p>
          )}
        </div>
      </div>

      <div className={`flex-grow flex-col md:flex-row overflow-hidden ${mobileTab === 'list' ? 'hidden md:flex' : 'flex'}`}>
        
        <div className={`w-full md:w-1/2 p-6 overflow-y-auto bg-zinc-100 border-r border-zinc-300 text-zinc-800 pb-20 md:pb-6 ${mobileTab === 'edit' ? 'block' : 'hidden'} md:block`}>
           <div className="max-w-xl mx-auto space-y-6">
             
             <div className="flex justify-between items-center mb-6">
                 <h2 className="text-2xl font-bold text-zinc-900 font-mono tracking-tighter">Editar Registro</h2>
                 <div className="flex gap-2">
                     <button onClick={() => deleteCard(activeCard.id)} className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors" title="Excluir">
                         <Trash2 size={20} />
                     </button>
                     <button onClick={() => setViewMode('print')} className="bg-zinc-800 text-white px-4 py-2 rounded hover:bg-zinc-700 flex items-center gap-2 shadow-sm font-bold transition-colors">
                         <Printer size={18} /> Exportar Dossiê
                     </button>
                 </div>
             </div>
             
               <div className="bg-white p-4 rounded-lg border border-zinc-200 shadow-sm mb-6 space-y-4">
                 <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Formato da Foto</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="format" checked={cardFormat === 'poker'} onChange={() => setCardFormat('poker')} className="text-red-600 focus:ring-red-500"/>
                        <span className="text-sm font-medium">Padrão / Poker</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="format" checked={cardFormat === 'tarot'} onChange={() => setCardFormat('tarot')} className="text-red-600 focus:ring-red-500"/>
                        <span className="text-sm font-medium">Tarot (Maior)</span>
                      </label>
                    </div>
                 </div>
                 <div className="h-px bg-zinc-200 w-full"></div>
                 <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-2 flex items-center gap-2">
                      <Palette size={14} /> Elemento / Skin
                    </label>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                        <button onClick={() => setCardTheme('ordem')} className={`p-2 rounded border text-sm font-mono bg-zinc-100 text-zinc-900 ${cardTheme === 'ordem' ? 'border-zinc-800 ring-2 ring-zinc-400 shadow-md' : 'border-zinc-300 hover:bg-zinc-200'}`}>Dossiê Ordem</button>
                        <button onClick={() => setCardTheme('sangue')} className={`p-2 rounded border text-sm font-serif bg-red-950 text-red-100 ${cardTheme === 'sangue' ? 'border-red-500 ring-2 ring-red-500/50' : 'border-red-900 hover:bg-red-900'}`}>Sangue</button>
                        <button onClick={() => setCardTheme('morte')} className={`p-2 rounded border text-sm font-serif bg-zinc-900 text-zinc-300 ${cardTheme === 'morte' ? 'border-zinc-500 ring-2 ring-zinc-500/50' : 'border-zinc-800 hover:bg-zinc-800'}`}>Morte</button>
                        <button onClick={() => setCardTheme('energia')} className={`p-2 rounded border text-sm font-sans bg-fuchsia-950 text-fuchsia-200 ${cardTheme === 'energia' ? 'border-fuchsia-500 ring-2 ring-fuchsia-500/50' : 'border-fuchsia-900 hover:bg-fuchsia-900'}`}>Energia</button>
                        <button onClick={() => setCardTheme('conhecimento')} className={`p-2 rounded border text-sm font-serif bg-amber-950 text-amber-100 ${cardTheme === 'conhecimento' ? 'border-amber-500 ring-2 ring-amber-500/50' : 'border-amber-900 hover:bg-amber-900'}`}>Conhecimento</button>
                        <button onClick={() => setCardTheme('medo')} className={`p-2 rounded border text-sm font-mono tracking-tighter bg-white text-black ${cardTheme === 'medo' ? 'border-black ring-2 ring-black/30 shadow-md' : 'border-zinc-300 hover:bg-zinc-100'}`}>Medo</button>
                    </div>
                 </div>
               </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                     <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Nome do Registro</label>
                     {/* Forçando cores nos inputs para prevenir erros em Dark Mode */}
                     <input type="text" value={activeCard.name} onChange={(e) => updateCard('name', e.target.value)} className="w-full border border-zinc-300 rounded p-2 focus:ring-2 focus:ring-red-500 focus:outline-none bg-white text-zinc-900"/>
                 </div>
                 <div>
                     <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Tipo</label>
                     <input type="text" value={activeCard.type} onChange={(e) => updateCard('type', e.target.value)} placeholder="Ex: Arma Tática, Ritual..." className="w-full border border-zinc-300 rounded p-2 focus:ring-2 focus:ring-red-500 focus:outline-none bg-white text-zinc-900"/>
                 </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                 <div>
                     <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Categoria</label>
                     <select value={activeCard.category} onChange={(e) => updateCard('category', e.target.value)} className="w-full border border-zinc-300 rounded p-2 bg-white text-zinc-900">
                         <option>Categoria 0</option>
                         <option>Categoria I</option>
                         <option>Categoria II</option>
                         <option>Categoria III</option>
                         <option>Categoria IV</option>
                     </select>
                 </div>
                 <div className="flex items-end pb-2">
                     <label className="flex items-center cursor-pointer gap-2 select-none">
                         <input type="checkbox" checked={activeCard.isParanormal} onChange={(e) => updateCard('isParanormal', e.target.checked)} className="w-5 h-5 text-red-600 rounded focus:ring-red-500 border-zinc-300" />
                         <span className="text-zinc-700 font-bold text-sm uppercase">Amaldiçoado/Ritual?</span>
                     </label>
                 </div>
             </div>

             <div>
                 <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Evidência Fotográfica</label>
                 <div className="flex gap-2">
                   <label className="flex-grow flex items-center justify-center border-2 border-dashed border-zinc-300 rounded-lg p-4 cursor-pointer hover:bg-zinc-50 transition-colors bg-white">
                       <div className="text-center">
                           <Camera className="mx-auto text-zinc-400 mb-1" />
                           <span className="text-sm text-zinc-500">Clique para carregar foto</span>
                       </div>
                       <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                   </label>
                   {activeCard.image && (
                       <div className="w-20 h-20 rounded border border-zinc-300 overflow-hidden relative group">
                            <img 
                               src={activeCard.image} 
                               alt="Preview"
                               className="w-full h-full object-cover" 
                               style={{ 
                                   objectPosition: `${activeCard.imageX ?? 50}% ${activeCard.imageY ?? 50}%`,
                                   transform: `rotate(${activeCard.imageRotation ?? 0}deg) scale(${activeCard.imageScale ?? 1})`
                                }}
                            />
                            <button 
                               onClick={() => updateCard('image', null)}
                               className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                            >
                                 <Trash2 size={16} />
                            </button>
                       </div>
                   )}
                 </div>
                 
                 {activeCard.image && (
                   <div className="mt-2 p-2 bg-zinc-200 rounded border border-zinc-300">
                       <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1 flex items-center gap-1">
                           <Move size={10} /> Ajuste de Enquadramento (Posição / Rotação / Zoom)
                       </label>
                       <div className="flex flex-col gap-2">
                           <div className="flex gap-2">
                               <div className="flex items-center gap-1 flex-grow">
                                   <span className="text-xs text-zinc-500 w-4 font-bold text-center">X</span>
                                   <input type="range" min="0" max="100" value={activeCard.imageX ?? 50} onChange={(e) => updateCard('imageX', parseInt(e.target.value))} className="flex-grow h-1 bg-zinc-400 rounded-lg appearance-none cursor-pointer accent-zinc-800"/>
                               </div>
                               <div className="flex items-center gap-1 flex-grow">
                                   <span className="text-xs text-zinc-500 w-4 font-bold text-center">Y</span>
                                   <input type="range" min="0" max="100" value={activeCard.imageY ?? 50} onChange={(e) => updateCard('imageY', parseInt(e.target.value))} className="flex-grow h-1 bg-zinc-400 rounded-lg appearance-none cursor-pointer accent-zinc-800"/>
                               </div>
                           </div>
                           
                           <div className="flex gap-2 border-t border-zinc-300 pt-2">
                               <div className="flex items-center gap-1 flex-grow" title="Rotação">
                                   <RotateCw size={12} className="text-zinc-500" />
                                   <input type="range" min="0" max="360" value={activeCard.imageRotation ?? 0} onChange={(e) => updateCard('imageRotation', parseInt(e.target.value))} className="flex-grow h-1 bg-zinc-400 rounded-lg appearance-none cursor-pointer accent-zinc-800"/>
                               </div>
                               <div className="flex items-center gap-1 flex-grow" title="Escala (Zoom)">
                                    <Maximize2 size={12} className="text-zinc-500" />
                                   <input type="range" min="0.5" max="3" step="0.1" value={activeCard.imageScale ?? 1} onChange={(e) => updateCard('imageScale', parseFloat(e.target.value))} className="flex-grow h-1 bg-zinc-400 rounded-lg appearance-none cursor-pointer accent-zinc-800"/>
                               </div>
                           </div>
                       </div>
                   </div>
                 )}
             </div>

             <div>
                 <label className="block text-xs font-bold text-zinc-500 uppercase mb-1 flex items-center gap-2">
                     <FileText size={14} /> Anotação de Campo (Frente)
                 </label>
                 <textarea value={activeCard.flavor} onChange={(e) => updateCard('flavor', e.target.value)} rows={2} className="w-full border border-zinc-300 rounded p-2 text-sm italic focus:ring-2 focus:ring-red-500 focus:outline-none bg-white text-zinc-900" placeholder="Descrição da aparência ou sensação ao tocar..."/>
             </div>

             <div>
                 <label className="block text-xs font-bold text-zinc-500 uppercase mb-1 flex items-center gap-2">
                     <Zap size={14} /> Dados Técnicos Básicos (Frente)
                 </label>
                 <input type="text" value={activeCard.stats} onChange={(e) => updateCard('stats', e.target.value)} className="w-full border border-zinc-300 rounded p-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none bg-white text-zinc-900" placeholder="Ex: Dano: 1d10 Corte | Espaços: 1"/>
             </div>

             <div>
                 <div className="flex justify-between items-end mb-1">
                   <label className="block text-xs font-bold text-zinc-500 uppercase flex items-center gap-2">
                       <Type size={14} /> Mecânicas Completas (Verso)
                   </label>
                   <div className="flex items-center gap-2 bg-zinc-200 px-2 py-1 rounded">
                       <span className="text-[10px] uppercase font-bold text-zinc-600">Tam. Fonte:</span>
                       <input type="range" min="6" max="14" step="0.5" value={activeCard.fontSizeBack || 10} onChange={(e) => updateCard('fontSizeBack', parseFloat(e.target.value))} className="w-20 cursor-pointer accent-zinc-600"/>
                   </div>
                 </div>
                 <textarea value={activeCard.description} onChange={(e) => updateCard('description', e.target.value)} rows={10} className="w-full border border-zinc-300 rounded p-2 font-mono text-sm leading-relaxed focus:ring-2 focus:ring-red-500 focus:outline-none bg-white text-zinc-900" placeholder="Cole todo o texto de regras do sistema aqui."/>
             </div>
           </div>
        </div>

        <div className={`w-full md:w-1/2 bg-zinc-950 flex-col items-center justify-center p-4 md:p-8 relative overflow-y-auto pb-20 md:pb-8 ${mobileTab === 'preview' ? 'flex' : 'hidden'} md:flex`}>
            <div className="absolute top-4 right-4 bg-zinc-900 text-zinc-400 rounded px-3 py-1 text-xs font-mono border border-zinc-700 shadow-sm z-50">
                Preview: {themes[cardTheme].name} ({currentDim.width}x{currentDim.height}mm)
            </div>

            <div className="flex flex-col xl:flex-row gap-8 items-center transform scale-100 transition-transform origin-center">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-zinc-500 font-bold tracking-widest text-xs uppercase">Frente</span>
                    <CardFront data={activeCard} themeName={cardTheme} scale={1.2} />
                </div>

                <div className="flex flex-col items-center gap-2">
                    <span className="text-zinc-500 font-bold tracking-widest text-xs uppercase">Verso</span>
                    <CardBack data={activeCard} themeName={cardTheme} scale={1.2} />
                </div>
            </div>
        </div>

      </div>
      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-700 flex md:hidden z-50 shadow-lg">
        <button
          onClick={() => setMobileTab('list')}
          className={`flex-1 py-3 flex flex-col items-center gap-0.5 text-xs font-medium transition-colors ${mobileTab === 'list' ? 'text-red-400' : 'text-zinc-500'}`}
        >
          <Layers size={20} />
          Registros
        </button>
        <button
          onClick={() => setMobileTab('edit')}
          className={`flex-1 py-3 flex flex-col items-center gap-0.5 text-xs font-medium transition-colors ${mobileTab === 'edit' ? 'text-red-400' : 'text-zinc-500'}`}
        >
          <Type size={20} />
          Editar
        </button>
        <button
          onClick={() => setMobileTab('preview')}
          className={`flex-1 py-3 flex flex-col items-center gap-0.5 text-xs font-medium transition-colors ${mobileTab === 'preview' ? 'text-red-400' : 'text-zinc-500'}`}
        >
          <Eye size={20} />
          Preview
        </button>
      </nav>
    </div>
  );
};

export default OrdemCardCreator;
// npm run dev
// npm run dev