// Datos de los personajes principales de Wildwood y sus notas sobre el doblaje
const characters = [
    {
        id: 1,
        name: "Prudence McKeel",
        actor: "Actor de doblaje asignado",
        reason: "La protagonista requiere una voz que transmita valentía juvenil y asombro, pero el tono no logró conectar con la intensidad dramática de las escenas clave.",
        goodVotes: 42,
        badVotes: 185
    },
    {
        id: 2,
        name: "Curtis",
        actor: "Actor de doblaje asignado",
        reason: "El fiel compañero de aventuras. Su interpretación perdió matices de picardía y camaradería que definen su relación con Prudence en la obra original.",
        goodVotes: 30,
        badVotes: 210
    },
    {
        id: 3,
        name: "La Reina Búho (The Dowager Governess)",
        actor: "Actor de doblaje asignado",
        reason: "Un personaje imponente y oscuro. Los fans señalan que la adaptación de la voz careció de la majestuosidad y amenaza que exige la antagonista.",
        goodVotes: 15,
        badVotes: 290
    },
    {
        id: 4,
        name: "Iphegenia",
        actor: "Actor de doblaje asignado",
        reason: "Una figura mística y sabia del Bosque Intangible. El doblaje no logró reflejar la profundidad temporal y solemne del personaje.",
        goodVotes: 55,
        badVotes: 140
    }
];

// Función para renderizar las tarjetas en la página
function renderCharacters() {
    const container = document.getElementById('charactersContainer');
    container.innerHTML = '';

    characters.forEach(char => {
        const totalVotes = char.goodVotes + char.badVotes;
        const goodPercent = totalVotes > 0 ? Math.round((char.goodVotes / totalVotes) * 100) : 50;
        const badPercent = totalVotes > 0 ? Math.round((char.badVotes / totalVotes) * 100) : 50;

        const card = document.createElement('div');
        card.className = 'char-card';
        card.innerHTML = `
            <div class="char-info">
                <h3>${char.name}</h3>
                <span class="char-actor">${char.actor}</span>
                <p class="char-reason">${char.reason}</p>
            </div>
            <div class="voting-actions">
                <div class="vote-buttons">
                    <button class="v-btn good" onclick="vote(${char.id}, 'good')">👍 Bien doblado (${char.goodVotes})</button>
                    <button class="v-btn bad" onclick="vote(${char.id}, 'bad')">👎 Mal doblado (${char.badVotes})</button>
                </div>
                <div class="vote-stats">
                    <span>Descontento general: <strong>${badPercent}%</strong> (${totalVotes} votos totales)</span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Función para registrar el voto del usuario
function vote(charId, type) {
    const character = characters.find(c => c.id === charId);
    if (!character) return;

    // Verificar si el usuario ya votó por este personaje (usando localStorage)
    const votedKey = `voted_char_${charId}`;
    if (localStorage.getItem(votedKey)) {
        alert("¡Ya has votado por este personaje anteriormente desde este navegador!");
        return;
    }

    if (type === 'good') {
        character.goodVotes++;
    } else if (type === 'bad') {
        character.badVotes++;
    }

    // Marcar como votado en el navegador
    localStorage.setItem(votedKey, type);

    // Volver a renderizar para actualizar los números al instante
    renderCharacters();
}

// Cargar las tarjetas al iniciar la página
document.addEventListener('DOMContentLoaded', renderCharacters);