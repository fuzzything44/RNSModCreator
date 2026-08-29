Hi! I see you've found my RNS mod creator. This is currently tailored to creating custom encounters ONLY (not player skins/new chars or item sets)

This is still very experimental, so things might change rapidly. I do value feedback on what's awkward and what you'd prefer to do instead.

I do plan to change how variables work relatively soon, I'm not particularly happy with them currently so want to try some changes to them, and maybe static analysis looking at the time blocks they're being set at to make sure you don't read before setting? Or just initialize them all at t=0 with default values to prevent game crashes, at least. Let me know what you think.