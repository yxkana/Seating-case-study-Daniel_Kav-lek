Použité technologie

-@tanstack-query&axios: jakožto řešení volaní a menegovaní Api callů

-@daisyUI: Pro stylovaní ui komponentů, nevytvářel jsem vlastní custom  componenty s atributy pro používaní napříč applikací, ale šel jsem cestou tailwind templetů. Přišlo mi to jako lepší cesta pro SPA.

-@react-hook-form&zod: Pro základní validaci formulářů.

-@zustand: Pro global state managment, za mě nejlepší varianta pro takto malý project.

Multi-language jsem nestihl, udělal jsem aspoň zákkad ve forme setupu.

S prací s gitem jsem u toho projektu postupoval formout push commitů v mainu branch. Další a idealní možnost by byla vytvaření branch tasků a ty následně commitovat pro CR a merge na github.

Ohledně seating problému s posloupností jsem postupoval tak, že jsem je seřadil přesně za sebe pomocí indexu. Původně jsem to chtěl udělat formout že bych bral missing čísla jako obsazená pole, ale pro tento způsob chybělo až moc informací v ohledu na to kde by řada končila a co kdyby celá řada byla zaplněná.