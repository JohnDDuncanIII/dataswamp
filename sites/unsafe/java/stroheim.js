

// VON STROHEIM MACHINE 
// version 1.1


var blurbfly = new felchEntity("Unsafe Corporate Enlightenment is the new", "Seize the", "Simulacra is an improvement over", "Under the canopy of", "Hacking the", "The modern Walt Whitman likes", "Parsing the", "Looks more like an alien", "Parse", "Management skills for the", "Eat", "Buy", "Tune in to your", "The charm of capitalism is", "Crystalline eyes is a dead-giveaway of the", "Make a deal with", "Powerbase Alpha is the bible of", "Powerbase Alpha is your eccentric")
var memeworm = new felchEntity("kooktopia", "parse-time continuum", "unsafety", "cornerstone of the Military-Entertainment Complex", "rituals of domestication", "fear", "DJ Kooky", "fight-flight treshholds", "net.coma", "lust driven enterprises", "cable-TV rhizomes", "information-play", "holy rapture", "insane otaku", "tooth-print of new media", "pure condensed capitalism", "lush hyperreality", "demented surrealist world", "far from equilibrium", "intense flow", "dissipative structures", "fractal agglomerates", "secret left over intra corporate memos", "Master Narrative") 
function felchEntity()
{this.length = felchEntity.arguments.length 
for (var i = 0; i < this.length; i++) 
this[i + 1] = felchEntity.arguments[i]} 
function VonStroheim (num) 
{var rand = Math.round( num * Math.random()); 
if (rand < 0) rand = - rand; 
if (rand == 0) rand++; return rand;}

