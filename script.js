// Datos actualizados con los personajes requeridos y sus imágenes de marcador de posición (placeholder)
const characters = [
    {
        id: 1,
        name: "Prudence McKeel",
        actor: "Protagonista",
        reason: "La protagonista requiere una voz que transmita valentía juvenil y asombro, pero el tono no logró conectar con la intensidad dramática.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
        goodVotes: 42,
        badVotes: 185
    },
    {
        id: 2,
        name: "Alexandra Svik",
        actor: "La Gobernadora Bruja",
        reason: "Un personaje imponente y oscuro. La adaptación de la voz careció de la majestuosidad y amenaza que exige la antagonista principal.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
        goodVotes: 15,
        badVotes: 290
    },
    {
        id: 3,
        name: "Brendan",
        actor: "El Rey de los Bandidos",
        reason: "Su interpretación perdió matices de picardía y peso de liderazgo que definen su imponente presencia en la obra original.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
        goodVotes: 30,
        badVotes: 210
    },
    {
        id: 4,
        name: "El General",
        actor: "El Águila",
        reason: "La voz asignada no transmite la autoridad imponente ni la textura solemne que un líder aéreo de su jerarquía demanda.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop",
        goodVotes: 20,
        badVotes: 150
    },
    {
        id: 5,
        name: "Séptima",
        actor: "Personaje clave",
        reason: "Su tono y matices de voz no lograron capturar el misterio y la profundidad táctica del personaje en la trama.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
        goodVotes: 25,
        badVotes: 130
    },
    {
        id: 6,
        name: "Dimitri",
        actor: "Personaje secundario / apoyo",
        reason: "La sincronía y el color de voz se sintieron distantes de la personalidad entrañable y dinámica que caracteriza al rol.",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
        goodVotes: 35,
        badVotes: 95
    },
    {
        id: 7,
        name: "Maksim",
        actor: "Personaje de apoyo",
        reason: "Careció de la fuerza interpretativa necesaria en los momentos clave de tensión y desarrollo argumental.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop",
        goodVotes: 18,
        badVotes: 115
    }
];

// Función para renderizar las tarjetas en la página
function renderCharacters() {
    const container = document.getElementById('charactersContainer');
    container.innerHTML = '';

    characters.forEach(char => {
        const totalVotes = char.goodVotes + char.badVotes;
        const badPercent = totalVotes > 0 ? Math.round((char.badVotes / totalVotes) * 100) : 50;

        // Comprobar si este equipo/navegador ya votó por este personaje y qué eligió ('good' o 'bad')
        const userVote = localStorage.getItem(`user_vote_char_${char.id}`);

        let goodActiveClass = (userVote === 'good') ? 'voted-active' : '';
        let badActiveClass = (userVote === 'bad') ? 'voted-active' : '';

        const card = document.createElement('div');
        card.className = 'char-card';
        card.innerHTML = `
            <div class="char-img-container">
                <img src="${char.image}" alt="${char.name}">
            </div>
            <div class="char-info">
                <h3>${char.name}</h3>
                <span class="char-actor">${char.actor}</span>
                <p class="char-reason">${char.reason}</p>
            </div>
            <div class="voting-actions">
                <div class="vote-buttons">
                    <button class="v-btn good ${goodActiveClass}" onclick="vote(${char.id}, 'good')">👍 Bien doblado (${char.goodVotes})</button>
                    <button class="v-btn bad ${badActiveClass}" onclick="vote(${char.id}, 'bad')">👎 Mal doblado (${char.badVotes})</button>
                </div>
                <div class="vote-stats">
                    <span>Descontento general: <strong>${badPercent}%</strong> (${totalVotes} votos)</span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Lógica avanzada de voto: permite emitir un voto inicial o cambiar de opinión
function vote(charId, type) {
    const character = characters.find(c => c.id === charId);
    if (!character) return;

    const storageKey = `user_vote_char_${charId}`;
    const previousVote = localStorage.getItem(storageKey);

    if (previousVote === type) {
        return; 
    }

    if (previousVote === 'good') {
        character.goodVotes--;
        character.badVotes++;
    } else if (previousVote === 'bad') {
        character.badVotes--;
        character.goodVotes++;
    } else {
        if (type === 'good') {
            character.goodVotes++;
        } else {
            character.badVotes++;
        }
    }

    localStorage.setItem(storageKey, type);
    renderCharacters();
}

// Cargar las tarjetas al iniciar la página
document.addEventListener('DOMContentLoaded', renderCharacters);