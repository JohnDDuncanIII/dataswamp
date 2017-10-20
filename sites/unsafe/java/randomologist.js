

// RANDOMOLOGIST
// version 0.0000000000001 b
// A Weerwolf & friends production
// The development of this function has been supported by 'frox'

function Randomologist (ekis) 
{var rand = Math.round( ekis * Math.random()); 
if (rand < 0) rand = - rand; 
if (rand == 0) rand++; 
if (rand < 10 ) rand = "0" + rand;
return rand;}


