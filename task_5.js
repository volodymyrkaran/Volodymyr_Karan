const meeting_list = (list) => 
    list.toUpperCase()
        .split(";")
        .map(guest => guest.split(":").reverse())
        .sort()
        .reduce((acc, guest) => (acc += `(${guest[0]}, ${guest[1]})`), "");

console.log(meeting_list("Fired:Corwill;Wilfred:Corwill;Barney:TornBull;Betty:Tornbull;Bjon:Tornbull;Raphael:Corwill;Alfred:Corwill"));