const tilesContainer=document.querySelector('.tiles');
const colors = ["Turquoise", "Lavender", "Coral", "Crimson", "gold", "SpringGreen", "Fuchsia", "RoyalBlue"];  
const colorPicklist=[...colors,...colors];
const tileCount=colorPicklist.length;
for(let i=0;i<tileCount;i++){
    const randomIndex=Math.floor(Math.random()*colorPicklist.length);
    const color=colorPicklist[randomIndex];
    const tile=buildMyTile(color);
    colorPicklist.splice(randomIndex,1);
    tilesContainer.appendChild(tile);
}
let revealedCount=0;
let activeTile=null;
let awaitingFinish=false;

    function buildMyTile(color){
        // Create a new tile element
        const element = document.createElement("div");
    
        // Set attributes for tiles
        element.classList.add("tile");
        element.setAttribute("data-color", color);
        element.setAttribute("data-revealed", "false");
    
        element.addEventListener('click',()=>{
            const revealed = element.getAttribute("data-revealed");
    
            // Check if user is waiting to reset tiles or if tile is already revealed
            if(awaitingFinish || revealed === "true" || element == activeTile){
                return;
            }
    
            element.style.backgroundColor = color;
    
            // If no tile is turned (currently active), then jisko click kiya h usko active bnao
            if(!activeTile){
                activeTile = element;
                return;
            }
    
            // Check if color matches the active tile
            const colorToMatch = activeTile.getAttribute("data-color");
    
            // Color Matches
            if(colorToMatch === color){
                // color matches, both tiles -> revealed
                element.setAttribute("data-revealed", "true");
                activeTile.setAttribute("data-revealed", "true");
    
                // Reset activeTile & awaitingMove
                activeTile = null;
                awaitingFinish = false;
                revealedCount +=2; 
    
                // Check if all tiles are revealed (game won)
                if(revealedCount === tileCount){
                    alert("Yay, you won the game, pls refresh.");
                }
                return;
            }
    
            // Colors if not matched
            awaitingFinish = true;
            
            setTimeout(()=>{
                activeTile.style.backgroundColor = null;
                element.style.backgroundColor = null;
                awaitingFinish = false;
                activeTile = null;
            }, 1000)
    
        });
    
        return element;
}