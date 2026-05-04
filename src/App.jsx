import React, { useState, useRef, useEffect } from 'react';
import { Camera, Download, Trash2, Plus, RefreshCw, Printer, Type, Shield, Zap, FileText, Image as ImageIcon, Maximize, Minimize, Sparkles, Palette, BookOpen, Move, Save, FolderOpen, Layers, Eye } from 'lucide-react';

const DNDCardCreator = ({ activeApp, onSwitch } = {}) => {
  const [cardFormat, setCardFormat] = useState('poker'); // 'poker' (63x88) or 'tarot' (70x120)
  const [cardTheme, setCardTheme] = useState('classic'); // 'classic', 'official', 'dark', 'modern', 'nature', 'cyber', 'oldschool'
  
  const [cards, setCards] = useState([
    {
      id: 1,
      name: "Manto das Fitas",
      type: "Item Maravilhoso",
      rarity: "Muito Raro",
      attunement: true,
      image: null,
      imageX: 50, // 50% = Center
      imageY: 50, // 50% = Center
      flavor: "As tiras da capa reagem subconscientemente ao seu humor, flutuando levemente.",
      description: "**A Mente na Trama (Passivo):** Vantagem em Carisma (Intimidação) se as tiras estiverem agressivas.\n\n**Membros Auxiliares (Bônus):** Interage com objeto a 3m (pegar, abrir, puxar). Força 10. Não ataca/ativa itens.\n\n**Barreira de Fitas (Reação - 1 Carga):** Ao sofrer dano físico, reduz o dano em 2d8 + mod. INT.\n\n**Gancho Arcano (Bônus - 1 Carga):** As tiras puxam você até 9m p/ ponto fixo/objeto. Não provoca AdO.",
      stats: "Defesa/Utilidade\nCargas: 3/dia",
      fontSizeBack: 9
    },
    {
      id: 2,
      name: "Lâmina da Alvorada",
      type: "Arma (Espada Longa)",
      rarity: "Lendário",
      attunement: true,
      image: "https://images.unsplash.com/photo-1589985902809-39d35363f8d0?auto=format&fit=crop&q=80&w=300&h=300", 
      imageX: 50,
      imageY: 20, // Ajustado para focar no topo da espada
      flavor: "O metal brilha com a intensidade de uma estrela anã, quente ao toque dos indignos.",
      description: "**Arma Mágica:** +2 em jogadas de ataque e dano.\n\n**Golpe Radiante:** A espada causa 1d8 de dano radiante extra a cada golpe. Contra mortos-vivos, esse dano é maximizado.\n\n**Luz Solar:** Emite luz plena em raio de 4,5m e penumbra por mais 4,5m.\n\n**Explosão Solar (Ação - 1/Descanso):** Libera um flash de luz. Criaturas num cone de 9m devem passar em CD 15 CON ou ficam cegas por 1 minuto.",
      stats: "Dano: 1d8+2 cortante\n+ 1d8 radiante",
      fontSizeBack: 9
    },
    {
      id: 3,
      name: "Poção de Cura Maior",
      type: "Poção",
      rarity: "Incomum",
      attunement: false,
      image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&q=80&w=300&h=300",
      imageX: 50,
      imageY: 50,
      flavor: "Um líquido vermelho rubi viscoso com flocos dourados flutuando.",
      description: "**Consumível:** Ao beber esta poção, você recupera magicamente uma quantidade de pontos de vida igual a **4d4 + 4**.\n\nA poção perde sua potência e o líquido se torna água comum após ser aberto por mais de 1 minuto.",
      stats: "Ação: Beber\nCura: 4d4 + 4",
      fontSizeBack: 11
    },
    {
      id: 4,
      name: "Anel de Invisibilidade",
      type: "Anel",
      rarity: "Lendário",
      attunement: true,
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=300&h=300",
      imageX: 50,
      imageY: 50,
      flavor: "Simples, dourado e indetectável magicamente até ser colocado no dedo.",
      description: "**Invisibilidade (Ação):** Enquanto estiver usando este anel, você pode ficar invisível como uma ação. \n\nTudo que você estiver vestindo ou carregando fica invisível com você. \n\nVocê permanece invisível até atacar, conjurar uma magia ou usar uma ação bônus para ficar visível novamente.",
      stats: "Duração: Indefinida",
      fontSizeBack: 10
    },
    {
      id: 5,
      name: "Botas de Levitação",
      type: "Item Maravilhoso",
      rarity: "Raro",
      attunement: true,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300&h=300",
      imageX: 50,
      imageY: 50,
      flavor: "Couro macio que parece nunca tocar o chão quando você caminha.",
      description: "**Levitar (Ação):** Enquanto vestir estas botas, você pode usar uma ação para lançar a magia *levitar* em si mesmo à vontade.\n\nSe você ficar inconsciente, a levitação não é dissipada, mas você flutua suavemente até o chão como se estivesse sob efeito de *queda suave*.",
      stats: "Magia: Levitar (à vontade)",
      fontSizeBack: 10
    },
    {
      id: 6,
      name: "Escudo Sentinela",
      type: "Armadura (Escudo)",
      rarity: "Incomum",
      attunement: false,
      image: "https://images.unsplash.com/photo-1626296185675-97593c6628b0?auto=format&fit=crop&q=80&w=300&h=300",
      imageX: 50,
      imageY: 50,
      flavor: "Um olho pintado na frente deste escudo parece seguir tudo o que se move.",
      description: "**Sentinela:** Enquanto segurar este escudo, você tem vantagem em testes de Sabedoria (Percepção) e jogadas de iniciativa.\n\nO escudo não requer sintonia, mas deve estar empunhado para conceder os benefícios.",
      stats: "+2 CA\nVant. Iniciativa/Percepção",
      fontSizeBack: 10
    },
    {
      id: 7,
      name: "Bastão Imovível",
      type: "Bastão",
      rarity: "Incomum",
      attunement: false,
      image: "https://images.unsplash.com/photo-1515739343069-77eb86378e9f?auto=format&fit=crop&q=80&w=300&h=300",
      imageX: 50,
      imageY: 50,
      flavor: "Uma barra de ferro lisa com um botão na ponta. Simples e desafiador da física.",
      description: "**Ativar (Ação):** Você pode usar uma ação para apertar o botão, o que fixa o bastão magicamente no espaço.\n\nO bastão pode suportar até 3.600 kg (8.000 libras) de peso. Mais peso faz com que o bastão se desative e caia. Uma criatura pode usar uma ação para fazer um teste de Força CD 30 para mover o bastão até 3 metros.",
      stats: "Carga Máx: 3.600kg",
      fontSizeBack: 10
    }
  ]);

  const [activeCardId, setActiveCardId] = useState(1);
  const [viewMode, setViewMode] = useState('edit'); // 'edit' or 'print'
  const [lastSaved, setLastSaved] = useState(null);
  const [mobileTab, setMobileTab] = useState('edit');

  useEffect(() => {
    const saved = localStorage.getItem('rpgCards_save');
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
    localStorage.setItem('rpgCards_save', JSON.stringify({ cards, cardFormat, cardTheme }));
    setLastSaved(new Date().toLocaleTimeString('pt-BR'));
  };

  const downloadSave = () => {
    const data = JSON.stringify({ cards, cardFormat, cardTheme }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rpg-cards-${new Date().toISOString().slice(0, 10)}.json`;
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
      name: "Novo Item",
      type: "Item Maravilhoso",
      rarity: "Comum",
      attunement: false,
      image: null,
      imageX: 50,
      imageY: 50,
      flavor: "Descrição curta...",
      description: "Regras mecânicas aqui.",
      stats: "",
      fontSizeBack: 10,
      fontSizeFlavor: 10,
      fontColor: ''
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
      // FIX: Reset value to allow re-uploading the same image if needed
      e.target.value = ''; 
    }
  };

  // Helper function to format bold text
  const formatText = (text) => {
    if (!text) return null;
    return text.split('**').map((part, index) => 
      index % 2 === 1 ? <strong key={index} className="font-bold">{part}</strong> : part
    );
  };

  const getRarityColor = (rarity) => {
    switch (rarity.toLowerCase()) {
      case 'comum': return '#5c5c5c';
      case 'incomum': return '#1fc219';
      case 'raro': return '#4990e2';
      case 'muito raro': return '#9b49e2';
      case 'lendário': return '#e29b49';
      case 'artefato': return '#c72e2e';
      default: return '#5c5c5c';
    }
  };

  // --- Theme Definitions ---
  const themes = {
    official: {
      name: 'Livro Oficial (5e)',
      bg: '#fdf8e1', 
      bgImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")',
      border: 'border-yellow-900', 
      text: 'text-gray-900',
      headerBg: 'bg-transparent', 
      headerText: 'text-red-900', 
      font: 'font-serif',
      flavorFont: 'font-serif italic text-gray-700',
      accent: 'border-red-900', 
      phbStyle: true 
    },
    classic: {
      name: 'Pergaminho',
      bg: '#f4e4bc',
      bgImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")',
      border: 'border-gray-800',
      text: 'text-gray-900',
      headerBg: 'bg-gray-800',
      headerText: 'text-white',
      font: 'font-serif',
      flavorFont: 'font-serif italic',
      accent: 'border-yellow-600',
    },
    dark: {
      name: 'Grimório Sombrio',
      bg: '#1a1a1a',
      bgImage: 'url("https://www.transparenttextures.com/patterns/black-scales.png")',
      border: 'border-yellow-700',
      text: 'text-gray-200',
      headerBg: 'bg-yellow-900',
      headerText: 'text-yellow-100',
      font: 'font-serif',
      flavorFont: 'font-serif italic text-yellow-500',
      accent: 'border-yellow-500',
    },
    modern: {
      name: 'Clean (Moderno)',
      bg: '#ffffff',
      bgImage: 'none',
      border: 'border-red-900',
      text: 'text-slate-900',
      headerBg: 'bg-white',
      headerText: 'text-red-900',
      font: 'font-sans',
      flavorFont: 'font-sans italic text-slate-600',
      accent: 'border-red-900',
      modernHeader: true 
    },
    nature: {
      name: 'Natureza (Druídico)',
      bg: '#e6f2e1',
      bgImage: 'url("https://www.transparenttextures.com/patterns/green-dust-and-scratches.png")',
      border: 'border-green-800',
      text: 'text-green-900',
      headerBg: 'bg-green-800',
      headerText: 'text-green-50',
      font: 'font-serif',
      flavorFont: 'font-serif italic text-green-700',
      accent: 'border-green-600',
    },
    cyber: {
      name: 'Cyberpunk',
      bg: '#0f172a', 
      bgImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")',
      border: 'border-cyan-500',
      text: 'text-cyan-300',
      headerBg: 'bg-cyan-900/80',
      headerText: 'text-cyan-100',
      font: 'font-mono',
      flavorFont: 'font-mono italic text-pink-500',
      accent: 'border-pink-500',
      modernHeader: true 
    },
    oldschool: {
      name: 'Old School (P&B)',
      bg: '#ffffff',
      bgImage: 'none',
      border: 'border-black',
      text: 'text-black',
      headerBg: 'bg-white',
      headerText: 'text-black',
      font: 'font-mono',
      flavorFont: 'font-mono italic',
      accent: 'border-black',
      modernHeader: true
    }
  };

  const currentDim = {
    poker: { width: 63, height: 88, name: "Poker (Magic)", perPage: 9 },
    tarot: { width: 70, height: 120, name: "Tarot", perPage: 4 }
  }[cardFormat];
  
  const activeTheme = themes[cardTheme];

  const CardFront = ({ data, scale = 1, themeName }) => {
    const theme = themes[themeName];
    const cardRarityColor = getRarityColor(data.rarity);
    
    const isModern = theme.modernHeader;
    const isPhb = theme.phbStyle;
    const isCyber = themeName === 'cyber';
    const isOldSchool = themeName === 'oldschool';

    let borderColorStyle = undefined;
    let borderClass = theme.border;
    let borderWidth = 'border-8';

    if (isModern) {
       borderWidth = 'border-4';
       if (isOldSchool) borderColorStyle = '#000000';
       else if (isCyber) borderColorStyle = '#06b6d4'; 
       else borderColorStyle = '#7f1d1d'; 
    }
    
    if (isPhb) {
        borderWidth = 'border-4'; 
    }

    let headerBorderColor = theme.accent;

    if (isModern) {
        if (isOldSchool) headerBorderColor = '#000000';
        else if (isCyber) headerBorderColor = '#ec4899';
        else headerBorderColor = undefined; 
    }

    // Image Positioning Style
    const imgStyle = {
        objectPosition: `${data.imageX || 50}% ${data.imageY || 50}%`
    };

    return (
      <div 
        className={`relative overflow-hidden shadow-lg flex flex-col ${theme.font} ${isPhb ? 'border-double' : ''} ${borderWidth} ${isOldSchool ? 'grayscale' : ''}`}
        style={{ 
          width: `${currentDim.width * scale}mm`, 
          height: `${currentDim.height * scale}mm`,
          backgroundImage: theme.bgImage,
          backgroundColor: theme.bg,
          borderColor: borderColorStyle,
        }}
      >
        <div className={`absolute inset-0 pointer-events-none ${theme.border} ${isPhb ? 'border-double' : ''} ${borderWidth}`} style={{ zIndex: 5 }}></div>

        <div 
          className={`p-2 text-center z-10 relative ${isModern || isPhb ? 'border-b-2 pt-3' : 'border-b-4'}`}
          style={{ 
            backgroundColor: isModern ? (isCyber ? '#0f172a' : 'white') : theme.headerBg,
            borderColor: isModern || isPhb ? theme.accent : cardRarityColor,
            borderBottomColor: isModern ? headerBorderColor : (isPhb ? '#9b2c2c' : cardRarityColor)
          }}
        >
          {!isModern && !isPhb && (
            <div className={`absolute inset-0 ${theme.headerBg} opacity-100 -z-10`}></div>
          )}
          
          <h3 className={`font-bold leading-tight ${theme.headerText} ${isModern ? 'uppercase tracking-tighter' : ''} ${isPhb ? 'font-serif text-lg tracking-wide uppercase' : ''}`} style={{ fontSize: `${(isPhb ? 13 : 12) * scale}px` }}>
            {data.name}
          </h3>
          <p className={`italic opacity-90 ${isPhb ? 'text-black font-sans text-xs' : theme.headerText}`} style={{ fontSize: `${8 * scale}px` }}>{data.type}</p>
        </div>

        <div 
          className={`flex-grow relative overflow-hidden group ${isModern || isPhb ? '' : 'border-b-4'} ${isOldSchool ? 'border-b-2 border-black' : (isPhb ? '' : 'border-gray-800')}`}
          style={{ borderColor: isCyber ? '#ec4899' : undefined }}
        >
          {data.image ? (
            <img 
                src={data.image} 
                alt={data.name} 
                className={`w-full h-full object-cover ${isOldSchool ? 'grayscale contrast-125' : ''} ${isPhb ? 'sepia-[.3]' : ''}`} 
                style={imgStyle}
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center ${isCyber ? 'bg-slate-800' : 'bg-black bg-opacity-5'}`}>
              <ImageIcon size={32 * scale} className={`opacity-20 ${isCyber ? 'text-cyan-500' : 'text-stone-800'}`} />
            </div>
          )}
          
          <div 
            className={`absolute bottom-0 right-0 px-3 py-1 font-bold shadow-md z-20 ${isModern ? 'text-xs uppercase tracking-widest' : (isPhb ? 'text-xs uppercase border-t border-l border-stone-400 bg-white/90 text-red-900' : 'rounded-tl-lg border-t-2 border-l-2 border-gray-800 text-white')}`}
            style={{ 
              backgroundColor: isPhb ? undefined : (isOldSchool ? 'black' : (isCyber ? '#0f172a' : cardRarityColor)), 
              color: isPhb ? '#7f1d1d' : (isOldSchool ? 'white' : (isCyber ? '#22d3ee' : 'white')),
              border: isCyber ? '1px solid #22d3ee' : undefined,
              fontSize: `${10 * scale}px`,
              bottom: isModern || isPhb ? '0' : '0',
              right: isModern || isPhb ? '0' : '0',
            }}
          >
            {data.rarity}
          </div>
        </div>

        <div className={`p-3 relative h-1/4 flex flex-col justify-center ${isModern ? (isCyber ? 'bg-slate-900' : 'bg-white') : 'bg-opacity-50'}`}>
          {data.attunement && (
            <div className={`absolute -top-3 left-2 px-2 py-0.5 text-[10px] shadow-sm z-20 font-bold tracking-wider ${isModern ? (isCyber ? 'rounded bg-cyan-900 text-cyan-100 border border-cyan-500' : 'rounded bg-slate-800 text-white') : (isPhb ? 'rounded bg-white border border-red-800 text-red-900' : 'rounded-full bg-purple-900 border border-yellow-500 text-white')}`}>
              REQUER SINTONIA
            </div>
          )}
          <p className={`${theme.flavorFont} text-center leading-snug overflow-hidden`} style={{ fontSize: `${(data.fontSizeFlavor || 10) * scale}px`, color: data.fontColor || undefined }}>
            "{data.flavor}"
          </p>
          {data.stats && (
             <div className={`mt-2 border-t pt-1 text-center font-bold ${data.fontColor ? '' : theme.text}`} style={{ borderColor: isModern || isPhb ? (isCyber ? '#334155' : '#d6d3d1') : '#666', fontSize: `${9 * scale}px`, color: data.fontColor || undefined }}>
               {data.stats}
             </div>
          )}
        </div>
      </div>
    );
  };

  const CardBack = ({ data, scale = 1, themeName }) => {
    const theme = themes[themeName];
    const cardRarityColor = getRarityColor(data.rarity);
    const isModern = theme.modernHeader;
    const isPhb = theme.phbStyle;
    const isCyber = themeName === 'cyber';
    const isOldSchool = themeName === 'oldschool';

    let borderColorStyle = undefined;
    let borderWidth = 'border-8';
    if (isModern) {
       borderWidth = 'border-4';
       if (isOldSchool) borderColorStyle = '#000000';
       else if (isCyber) borderColorStyle = '#06b6d4'; 
       else borderColorStyle = '#7f1d1d'; 
    }
    if (isPhb) borderWidth = 'border-4';

    return (
      <div 
        className={`relative overflow-hidden shadow-lg flex flex-col ${theme.font} ${isPhb ? 'border-double' : ''} ${borderWidth}`}
        style={{ 
          width: `${currentDim.width * scale}mm`, 
          height: `${currentDim.height * scale}mm`,
          backgroundImage: theme.bgImage,
          backgroundColor: theme.bg,
          borderColor: borderColorStyle,
        }}
      >
        <div className={`absolute inset-0 pointer-events-none ${theme.border} ${isPhb ? 'border-double' : ''} ${borderWidth}`} style={{ zIndex: 5 }}></div>

        <div 
          className={`p-2 text-center relative z-10 ${isModern || isPhb ? 'border-b-2 pt-3' : 'border-b-4'}`}
          style={{ 
            backgroundColor: isModern ? (isCyber ? '#0f172a' : 'white') : theme.headerBg,
            borderColor: isModern || isPhb ? theme.accent : cardRarityColor,
            borderBottomColor: isModern ? undefined : (isPhb ? '#9b2c2c' : cardRarityColor)
          }}
        >
          {!isModern && !isPhb && (
            <div className={`absolute inset-0 ${theme.headerBg} opacity-100 -z-10`}></div>
          )}
          <h3 className={`font-bold ${theme.headerText} ${isModern || isPhb ? 'uppercase tracking-tighter' : ''}`} style={{ fontSize: `${12 * scale}px` }}>Detalhes & Regras</h3>
        </div>
        
        <div className="p-4 flex-grow overflow-hidden flex flex-col relative z-0">
          <div className="prose prose-sm max-w-none flex-grow overflow-hidden">
              <p
                className={`whitespace-pre-wrap text-justify ${data.fontColor ? '' : theme.text}`}
                style={{
                    fontSize: `${(data.fontSizeBack || 10) * scale}px`,
                    lineHeight: '1.2',
                    color: data.fontColor || undefined
                }}
              >
                {formatText(data.description)}
              </p>
          </div>
          
          <div className={`mt-auto pt-4 border-t opacity-50 text-center flex justify-center items-center gap-1 font-bold ${theme.text}`} style={{ borderColor: isModern || isPhb ? (isCyber ? '#334155' : '#d6d3d1') : '#666', fontSize: `${10 * scale}px` }}>
             <Sparkles size={14 * scale} />
          </div>
        </div>
      </div>
    );
  };

  if (viewMode === 'print') {
    return (
      <div className="min-h-screen bg-gray-500 p-8 font-sans">
        <div className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center z-50 print:hidden">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Modo de Impressão</h2>
              <p className="text-xs text-gray-500">Tema: {themes[cardTheme].name} | Formato: {currentDim.name}</p>
            </div>
            <div className="flex gap-4">
                <button onClick={() => window.print()} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2">
                    <Printer size={18} /> Imprimir
                </button>
                <button onClick={() => setViewMode('edit')} className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
                    Voltar
                </button>
            </div>
        </div>

        {/* Print Layout - Foldable */}
        
        <div 
            // MUDANÇA 1: Mudamos p-[10mm] para p-[5mm] (ganha espaço vertical)
            // MUDANÇA 2: Mudamos 'flex-col' para 'flex-wrap content-start justify-center' (melhor organização)
            // MUDANÇA 3: Mudamos 'gap-4' para 'gap-1' (reduz o espaço entre cartas)
            className="print-area mx-auto bg-white shadow-2xl print:shadow-none mb-8 p-[5mm] flex flex-wrap content-start justify-center gap-1" 
            style={{ width: '210mm', minHeight: '297mm', boxSizing: 'border-box' }}
          >
             <h1 className="w-full text-center text-gray-400 mb-4 print:hidden">Layout de Impressão: Dobra ao Meio</h1>
            {cards.map(card => (
                <div key={`card-pair-${card.id}`} className="flex items-center justify-center relative p-1 break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
                    <div className="flex gap-0.5 relative">
                        {/* Front */}
                        <CardFront data={card} themeName={cardTheme} />
                        {/* Fold Line */}
                        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gray-400 border-r border-dashed border-gray-300 transform -translate-x-1/2 h-full z-10 opacity-30"></div>
                        {/* Back */}
                        <CardBack data={card} themeName={cardTheme} />
                    </div>
                </div>
            ))}
        </div>
        
        <style>{`
          @media print {
            @page { 
                size: A4; 
                margin: 0;
            }
            body { 
                background: white; 
                -webkit-print-color-adjust: exact !important; 
                print-color-adjust: exact !important;
            }
            html {
                text-size-adjust: none;
                -webkit-text-size-adjust: none;
            }
            .print-area {
                margin: 0;
                box-shadow: none;
                padding: 5mm; /* Reduzido para caber mais cartas */
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-content: flex-start;
                gap: 2mm; /* Garante espaçamento pequeno na impressão */
            }
            .print-hidden {
                display: none !important;
            }
            .break-inside-avoid {
                break-inside: avoid;
                page-break-inside: avoid;
            }
            p {
                max-width: 100%;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
      {/* Sidebar - Card List */}
      <div className={`bg-white border-r border-gray-200 flex-col w-full md:w-64 ${mobileTab === 'list' ? 'flex' : 'hidden'} md:flex`}>
        <div className="p-4 border-b border-gray-200 bg-gray-50 space-y-2">
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Shield className="text-red-700" /> RPG Cards
          </h1>
          {onSwitch && (
            <div className="flex gap-1">
              <button
                onClick={() => onSwitch('dnd')}
                className={`flex-1 py-1.5 text-xs rounded font-bold transition-colors ${activeApp === 'dnd' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}
              >⚔️ D&D</button>
              <button
                onClick={() => onSwitch('ordem')}
                className={`flex-1 py-1.5 text-xs rounded font-bold transition-colors ${activeApp === 'ordem' ? 'bg-red-700 text-white' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}
              >💀 O.P.P.</button>
            </div>
          )}
        </div>
        <div className="flex-grow overflow-y-auto p-2 space-y-2">
          {cards.map(card => (
            <div 
              key={card.id}
              onClick={() => setActiveCardId(card.id)}
              className={`p-3 rounded-lg cursor-pointer transition-all border ${activeCardId === card.id ? 'bg-blue-50 border-blue-500 shadow-sm' : 'hover:bg-gray-50 border-transparent'}`}
            >
              <div className="font-bold text-gray-800 truncate">{card.name}</div>
              <div className="text-xs text-gray-500">{card.type}</div>
            </div>
          ))}
        </div>
        <div className="p-4 pb-20 md:pb-4 border-t border-gray-200 space-y-2">
          <button onClick={addCard} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 flex items-center justify-center gap-2">
            <Plus size={16} /> Novo Card
          </button>
          <div className="flex gap-2">
            <button
              onClick={saveToCache}
              className="flex-1 bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 flex items-center justify-center gap-1 text-xs"
              title="Salvar no navegador (cache local)"
            >
              <Save size={13} /> Cache
            </button>
            <button
              onClick={downloadSave}
              className="flex-1 bg-gray-600 text-white py-1.5 rounded hover:bg-gray-700 flex items-center justify-center gap-1 text-xs"
              title="Baixar save como arquivo JSON"
            >
              <Download size={13} /> Exportar
            </button>
          </div>
          <label
            className="w-full bg-amber-600 text-white py-1.5 rounded hover:bg-amber-700 flex items-center justify-center gap-1 text-xs cursor-pointer"
            title="Carregar save de arquivo JSON"
          >
            <FolderOpen size={13} /> Importar Save
            <input type="file" accept=".json" className="hidden" onChange={loadFromFile} />
          </label>
          {lastSaved && (
            <p className="text-[10px] text-gray-400 text-center">💾 Salvo no cache: {lastSaved}</p>
          )}
        </div>
      </div>

      {/* Main Area */}
      <div className={`flex-grow flex-col md:flex-row overflow-hidden ${mobileTab === 'list' ? 'hidden md:flex' : 'flex'}`}>
        
        {/* Editor Form */}
        <div className={`w-full md:w-1/2 p-6 overflow-y-auto bg-gray-50 border-r border-gray-200 pb-20 md:pb-6 ${mobileTab === 'edit' ? 'block' : 'hidden'} md:block`}>
           <div className="max-w-xl mx-auto space-y-6">
              
              <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-700">Editar Card</h2>
                  <div className="flex gap-2">
                      <button onClick={() => deleteCard(activeCard.id)} className="p-2 text-red-500 hover:bg-red-50 rounded" title="Excluir">
                          <Trash2 size={20} />
                      </button>
                      <button onClick={() => setViewMode('print')} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center gap-2 shadow-sm">
                          <Printer size={18} /> Preparar Impressão
                      </button>
                  </div>
              </div>
              
              {/* Card Style & Format Controls */}
               <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6 space-y-4">
                 
                 {/* Format Selection */}
                 <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Formato (Tamanho)</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="format" checked={cardFormat === 'poker'} onChange={() => setCardFormat('poker')} className="text-blue-600 focus:ring-blue-500"/>
                        <span className="text-sm font-medium">Standard / Poker</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="format" checked={cardFormat === 'tarot'} onChange={() => setCardFormat('tarot')} className="text-blue-600 focus:ring-blue-500"/>
                        <span className="text-sm font-medium">Tarot (Maior)</span>
                      </label>
                    </div>
                 </div>

                 <div className="h-px bg-gray-200 w-full"></div>

                 {/* Theme Selection */}
                 <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-2">
                      <Palette size={14} /> Estilo Visual (Skin)
                    </label>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                        <button 
                        onClick={() => setCardTheme('official')}
                        className={`p-2 rounded border text-sm font-serif bg-[#fdf8e1] text-red-900 ${cardTheme === 'official' ? 'border-red-800 ring-2 ring-red-200 shadow-md' : 'border-gray-200 hover:bg-orange-50'}`}
                       >
                         <div className="flex items-center justify-center gap-2">
                            <BookOpen size={14} /> Livro Oficial (5e)
                         </div>
                       </button>
                       <button 
                        onClick={() => setCardTheme('classic')}
                        className={`p-2 rounded border text-sm font-serif ${cardTheme === 'classic' ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 hover:bg-gray-50'}`}
                       >
                         Pergaminho
                       </button>
                       <button 
                        onClick={() => setCardTheme('dark')}
                        className={`p-2 rounded border text-sm font-serif bg-gray-800 text-white ${cardTheme === 'dark' ? 'border-yellow-500 ring-2 ring-yellow-500/50' : 'border-gray-700 hover:bg-gray-700'}`}
                       >
                         Grimório
                       </button>
                       <button 
                        onClick={() => setCardTheme('modern')}
                        className={`p-2 rounded border text-sm font-sans ${cardTheme === 'modern' ? 'border-red-500 bg-red-50 ring-2 ring-red-200' : 'border-gray-200 hover:bg-gray-50'}`}
                       >
                         Clean
                       </button>
                       <button 
                        onClick={() => setCardTheme('nature')}
                        className={`p-2 rounded border text-sm font-serif bg-green-50 text-green-900 ${cardTheme === 'nature' ? 'border-green-600 ring-2 ring-green-200' : 'border-gray-200 hover:bg-green-50'}`}
                       >
                         Natureza
                       </button>
                       <button 
                        onClick={() => setCardTheme('cyber')}
                        className={`p-2 rounded border text-sm font-mono bg-slate-900 text-cyan-400 ${cardTheme === 'cyber' ? 'border-cyan-500 ring-2 ring-cyan-500/30' : 'border-gray-700 hover:bg-slate-800'}`}
                       >
                         Cyberpunk
                       </button>
                    </div>
                 </div>

               </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nome do Item</label>
                      <input 
                        type="text" 
                        value={activeCard.name}
                        onChange={(e) => updateCard('name', e.target.value)}
                        className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                  </div>
                  <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tipo</label>
                      <input 
                        type="text" 
                        value={activeCard.type}
                        onChange={(e) => updateCard('type', e.target.value)}
                        placeholder="Ex: Arma, Anel, Poção"
                        className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                  </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Raridade</label>
                      <select 
                        value={activeCard.rarity}
                        onChange={(e) => updateCard('rarity', e.target.value)}
                        className="w-full border border-gray-300 rounded p-2 bg-white"
                      >
                          <option>Comum</option>
                          <option>Incomum</option>
                          <option>Raro</option>
                          <option>Muito Raro</option>
                          <option>Lendário</option>
                          <option>Artefato</option>
                      </select>
                  </div>
                  <div className="flex items-end pb-2">
                      <label className="flex items-center cursor-pointer gap-2 select-none">
                          <input 
                            type="checkbox" 
                            checked={activeCard.attunement}
                            onChange={(e) => updateCard('attunement', e.target.checked)}
                            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300" 
                          />
                          <span className="text-gray-700 font-medium">Requer Sintonia?</span>
                      </label>
                  </div>
              </div>

              {/* Image Upload */}
              <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Imagem</label>
                  <div className="flex gap-2">
                    <label className="flex-grow flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors">
                        <div className="text-center">
                            <Camera className="mx-auto text-gray-400 mb-1" />
                            <span className="text-sm text-gray-500">Clique para carregar imagem</span>
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </label>
                    {activeCard.image && (
                        <div className="w-20 h-20 rounded border border-gray-300 overflow-hidden relative group">
                             <img 
                                src={activeCard.image} 
                                className="w-full h-full object-cover" 
                                style={{ objectPosition: `${activeCard.imageX || 50}% ${activeCard.imageY || 50}%` }}
                             />
                             <button 
                                onClick={() => updateCard('image', null)}
                                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                             >
                                 <Trash2 size={16} />
                             </button>
                        </div>
                    )}
                  </div>
                  
                  {/* Image Positioning Controls */}
                  {activeCard.image && (
                    <div className="mt-2 p-2 bg-gray-100 rounded border border-gray-200">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1 flex items-center gap-1">
                            <Move size={10} /> Ajuste de Posição da Imagem
                        </label>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500 w-4">X</span>
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="100" 
                                    value={activeCard.imageX || 50} 
                                    onChange={(e) => updateCard('imageX', parseInt(e.target.value))}
                                    className="flex-grow h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500 w-4">Y</span>
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="100" 
                                    value={activeCard.imageY || 50} 
                                    onChange={(e) => updateCard('imageY', parseInt(e.target.value))}
                                    className="flex-grow h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                  )}
              </div>

              {/* Flavor Text */}
              <div>
                  <div className="flex justify-between items-end mb-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
                        <FileText size={14} /> Texto de Ambientação (Frente)
                    </label>
                    <div className="flex items-center gap-2 bg-gray-200 px-2 py-1 rounded">
                        <span className="text-[10px] uppercase font-bold text-gray-600">Tam. Flavor:</span>
                        <input
                            type="range"
                            min="6"
                            max="14"
                            step="0.5"
                            value={activeCard.fontSizeFlavor || 10}
                            onChange={(e) => updateCard('fontSizeFlavor', parseFloat(e.target.value))}
                            className="w-20 cursor-pointer"
                        />
                        <input
                            type="number"
                            min="6"
                            max="20"
                            step="0.5"
                            value={activeCard.fontSizeFlavor || 10}
                            onChange={(e) => updateCard('fontSizeFlavor', parseFloat(e.target.value))}
                            className="w-12 text-xs font-mono border border-gray-300 rounded px-1 text-center focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <span className="text-[10px] text-gray-500">px</span>
                    </div>
                  </div>
                  <textarea
                    value={activeCard.flavor}
                    onChange={(e) => updateCard('flavor', e.target.value)}
                    rows={2}
                    className="w-full border border-gray-300 rounded p-2 text-sm italic"
                    placeholder="Uma breve descrição visual ou histórica..."
                  />
              </div>

              {/* Font Color */}
              <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-2">
                  <Palette size={14} /> Cor da Fonte (toda a carta)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={activeCard.fontColor || '#333333'}
                    onChange={(e) => updateCard('fontColor', e.target.value)}
                    className="w-10 h-9 cursor-pointer rounded border border-gray-300"
                    title="Cor da fonte"
                  />
                  <span className="text-sm text-gray-600 font-mono">{activeCard.fontColor || '(padrão do tema)'}</span>
                  {activeCard.fontColor && (
                    <button
                      onClick={() => updateCard('fontColor', '')}
                      className="text-xs text-red-500 hover:text-red-700 border border-red-200 rounded px-2 py-1 hover:bg-red-50"
                    >
                      Resetar
                    </button>
                  )}
                </div>
              </div>

              {/* Stats Short */}
              <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1 flex items-center gap-2">
                      <Zap size={14} /> Estatísticas Rápidas (Frente)
                  </label>
                  <input 
                    type="text"
                    value={activeCard.stats}
                    onChange={(e) => updateCard('stats', e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 text-sm"
                    placeholder="Ex: +1 AC, Dano 1d8, 3 Cargas/Dia"
                  />
              </div>

              {/* Full Description */}
              <div>
                  <div className="flex justify-between items-end mb-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
                        <Type size={14} /> Regras Completas (Verso)
                    </label>
                    <div className="flex items-center gap-2 bg-gray-200 px-2 py-1 rounded">
                        <span className="text-[10px] uppercase font-bold text-gray-600">Tam. Fonte:</span>
                        <input 
                            type="range" 
                            min="6" 
                            max="14" 
                            step="0.5"
                            value={activeCard.fontSizeBack || 10}
                            onChange={(e) => updateCard('fontSizeBack', parseFloat(e.target.value))}
                            className="w-20 cursor-pointer"
                        />
                        <input 
                            type="number" 
                            min="6" 
                            max="20" 
                            step="0.5"
                            value={activeCard.fontSizeBack || 10}
                            onChange={(e) => updateCard('fontSizeBack', parseFloat(e.target.value))}
                            className="w-12 text-xs font-mono border border-gray-300 rounded px-1 text-center focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <span className="text-[10px] text-gray-500">px</span>
                    </div>
                  </div>
                  <textarea 
                    value={activeCard.description}
                    onChange={(e) => updateCard('description', e.target.value)}
                    rows={12}
                    className="w-full border border-gray-300 rounded p-2 font-mono text-sm leading-relaxed"
                    placeholder="Cole todo o texto de regras aqui. Ele irá aparecer no verso da carta."
                  />
              </div>
           </div>
        </div>

        {/* Live Preview */}
        <div className={`w-full md:w-1/2 bg-gray-200 flex-col items-center justify-center p-4 md:p-8 relative overflow-y-auto pb-20 md:pb-8 ${mobileTab === 'preview' ? 'flex' : 'hidden'} md:flex`}>
            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur rounded px-3 py-1 text-xs font-mono text-gray-500 border border-gray-300 shadow-sm z-50">
                Preview: {themes[cardTheme].name} ({currentDim.width}x{currentDim.height}mm)
            </div>

            <div className="flex flex-col xl:flex-row gap-8 items-center transform scale-100 transition-transform origin-center">
                {/* Front Preview */}
                <div className="flex flex-col items-center gap-2">
                    <span className="text-gray-500 font-bold tracking-widest text-xs uppercase">Frente</span>
                    <CardFront data={activeCard} themeName={cardTheme} scale={1.2} />
                </div>

                {/* Back Preview */}
                <div className="flex flex-col items-center gap-2">
                    <span className="text-gray-500 font-bold tracking-widest text-xs uppercase">Verso</span>
                    <CardBack data={activeCard} themeName={cardTheme} scale={1.2} />
                </div>
            </div>
            
            <p className="mt-8 text-gray-500 text-sm max-w-md text-center">
                Dica: O tema "Moderno" economiza tinta preta, enquanto o "Grimório" usa bastante tinta se impresso em casa.
            </p>
        </div>

      </div>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex md:hidden z-50 shadow-lg">
        <button
          onClick={() => setMobileTab('list')}
          className={`flex-1 py-3 flex flex-col items-center gap-0.5 text-xs font-medium transition-colors ${mobileTab === 'list' ? 'text-blue-600' : 'text-gray-400'}`}
        >
          <Layers size={20} />
          Cartas
        </button>
        <button
          onClick={() => setMobileTab('edit')}
          className={`flex-1 py-3 flex flex-col items-center gap-0.5 text-xs font-medium transition-colors ${mobileTab === 'edit' ? 'text-blue-600' : 'text-gray-400'}`}
        >
          <Type size={20} />
          Editar
        </button>
        <button
          onClick={() => setMobileTab('preview')}
          className={`flex-1 py-3 flex flex-col items-center gap-0.5 text-xs font-medium transition-colors ${mobileTab === 'preview' ? 'text-blue-600' : 'text-gray-400'}`}
        >
          <Eye size={20} />
          Preview
        </button>
      </nav>
    </div>
  );
};

export default DNDCardCreator;