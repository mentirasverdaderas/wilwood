// Datos actualizados con los personajes requeridos y sus imágenes de marcador de posición (placeholder)
const characters = [
    {
        id: 1,
        name: "Prue McKeel",
        actor: "Nuestra Protagonista",
        reason: "Madura, sarcástica y fan #1 de su hermano, no se acobardó cuando fue necesario demostrar que daría todo por él. Su valentía la llevó a emprender una aventura, en la cual descubrió que la magia existe y que, aún más, está dentro de ella.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
        goodVotes: 42,
        badVotes: 185
    },
    {
        id: 2,
        name: "Curtis Mehlberg",
        actor: "El Heroe",
        reason: "Tierno y de buen corazón, creía no tener lo necesario para ser valiente, pero sin darse cuenta afrontará la prueba más grande, que le exigirá dar un salto de fe a pesar del miedo que pueda sentir.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
        goodVotes: 17,
        badVotes: 290
    },
    {
        id: 3,
        name: "Alexandra Svik",
        actor: "La Gobernadora Viuda",
        reason: "Un amor tan fuerte convertido en un dolor imborrable, que la consumirá haciéndola querer arrasar con todo y con todos, con tal de recuperar lo que el bosque le quitó.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
        goodVotes: 15,
        badVotes: 290
    },
    {
        id: 4,
        name: "Brendan",
        actor: "El Rey de los Bandidos",
        reason: "Un líder fuerte y decidido a darlo todo por su gente, no se aminora con nadie y no pide permiso; actúa.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
        goodVotes: 30,
        badVotes: 210
    },
    {
        id: 5,
        name: "El General",
        actor: "La líder de las Aves",
        reason: "Imponente y majestuosa, es la personificación del compromiso y la protección de la naturaleza. Su espíritu libre le hace tomar riesgos y no sentir temor.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop",
        goodVotes: 20,
        badVotes: 150
    },
    {
        id: 6,
        name: "Dmitri",
        actor: "Coyote Marginado",
        reason: "Sigue el instinto de manada, pero no liderazgos. El haber sido marginado lo hará estar del lado correcto, ayudando a quienes luchan por lo justo.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
        goodVotes: 25,
        badVotes: 130
    },
    {
        id: 7,
        name: "Séptima",
        actor: "Una Rata Encantadora",
        reason: "Un simpático personaje que demostrará ser más importante de lo que todos esperaban; capaz de reconocer el valor en otros, inspira con su determinación.",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
        goodVotes: 35,
        badVotes: 95
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