const game_starter = `<div class="dialog">
     <div class="start-screen">
  <h1 class="game-title">🌼 Bubu’s Flower Field</h1>
  <form class="name-form">
    <input
      type="text"
      placeholder="Enter your name..."
      class="name-input"
      max="10"
    />
    <span class='error_message'></span>
    <button type="submit" class="start-btn">
      Start 💛
    </button>
  </form>
</div>
     </div>`;

const loader = `<div class="loading-screen hidden">
  <div class="loading-box">
    <p class="loading-text">Planting flowers… 🌱</p>
    <div class="loading-bar">
      <div class="loading-progress"></div>
    </div>
  </div>
</div>
`;
const reset_button = `<button class="reset">reset</button>`;
const play_again = `<button class="new-game"></button>`;

const player_name = `<h4 >player name:
<p class='player_name'></p>
 </h1>`;

const flowers_collected = `<div>
<p class='red'>r 0</p>
<p class='purple'>p 0</p>
<p class='green'>g 0</p>
<p class='blue'>b 0</p></div>
</div>`;

const counter = `<span class='counter'>
  <div class='counter-box'>  
 ${player_name}
flowers collected:
${flowers_collected}
 <div class="counter-buttons">
        ${reset_button}
        ${play_again}
      </div>
</span>`;

const character = `
 <div class='character_layout'>
 <p class='character_name'>tabark</p>
 <img src="/2D-GAME/assets/character/bubu.png" class='character' />
 </div>
`;

const game_board = `
<div class="main_board"> 
${character}
</div>
`;

const message_component = `<div class="dialog-overlay hidden">
  <div class="dialog-box">
    <button class="dialog-close">✕</button>
    <p class="dialog-message"></p>
  </div>
</div>
`;

export const game_main_layout = `
     ${game_starter}
     ${counter}
     ${message_component} 
     ${loader}
<div class="layout"> 
${game_board}
</div>
`;
