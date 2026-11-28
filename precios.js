// Precios mayoristas en USD por id de producto, tomados de las listas de precios
// invierno 2027 (Dama y Hombre). Se aplican solo si el producto no tiene precio cargado.
window.MAYORISTA_PRICES = {
  47: 28.50, // 125-314 Barzio
  48: 27.00, // 225-212 Merano
  49: 35.50, // 125-088 Saluzzo
  52: 27.25, // 124-511 Harold
  55: 26.50, // 224-480 Leonel
  56: 36.25, // 225-200 Juan
  58: 32.30, // 125-308 Lola
  60: 37.50, // 125-078 Civita
  61: 30.00, // 125-306 Ana
  62: 30.00, // 125-311 Polesella
  63: 18.80, // 125-312 Micaela/marmora
  64: 43.20, // 124-634 Liberti
  65: 37.50, // 124-655 Dunst long castana
  68: 18.00, // 125-548 Tonara
  69: 16.50, // 225-156 Felipe plus
  70: 18.80, // 225-206 Felipe hood fur
  71: 14.00, // 125-117 Gabrielle
  72: 17.50, // 125-345 Messika
  74: 16.00, // 224-856 Billy
  75: 20.80, // 125-472 Pietracupa
  76: 19.50, // 125-473 Pianella
  80: 16.50, // 124-773 Sirena hood
  81: 10.00, // 226-292 Milan
  111: 21.50, // 226-337 Campera luca
  115: 18.70, // 226-310 Campera pascal
  116: 16.30, // 226-312 Chaleco pascal
  117: 17.50, // 226-331 Jason/Jackie
  119: 18.30, // 226-306 Campera cervaro
  120: 15.00, // 226-305 Chaleco cervaro
  123: 11.00, // 226-294 Milan plus size
  125: 15.50, // 226-303 Fez basico
  126: 17.50, // 226-304 Fez plus size
  127: 19.50, // 126-447 Tonara
  128: 15.00, // 126-458 Lettie chaleco
  131: 22.00, // 226-268 Lynn chaleco
  132: 17.50, // 126-456 Viena
  133: 23.00, // 126-479 Croviana plus size
  134: 11.50, // 126-452 Cumiana
  135: 15.00, // 126-454 Cumiana long
  137: 11.00, // 126-445 Isadora plus size
  138: 15.80, // 126-446 Sindy
  140: 23.50, // 126-437 Marciana
  142: 22.50, // 126-473 Elena
  143: 18.80, // 126-467 Lustra
  144: 27.00, // 126-488 Mila
  151: 17.30, // 226-333 Fez cierre waterproof
  153: 32.50, // 126-421 Lira/Zara
  154: 32.50, // 126-311 Comiso
  156: 18.70, // 125-600 Curtis
  157: 20.50, // 125-587 Dobby
  158: 30.00, // 125-420 Parker
  159: 18.80, // 126-050 Malvito
  160: 29.80, // 125-293 Carl-aldeno
  161: 27.50, // 126-313 Floyd
  162: 24.80, // 225-597 Stephen
  163: 22.70, // 225-506 Doyle
  164: 22.50, // 225-500 Curno
  165: 32.50, // 126-308 Odinga
  166: 27.50, // 225-181 Aidone
  167: 20.70, // 225-505 Carpino
  168: 38.20, // 225-061 Gesico
  169: 30.75, // 124-919 Jamal
  170: 24.50, // 225-511 Mikey
  171: 30.00, // 125-319 Ubon
  172: 21.80, // 125-627 Aimmen
  173: 33.30, // 225-052 Licata
  174: 18.00, // 125-607 Sabina
  175: 25.50, // 126-312 Rennell
  176: 36.80, // 126-309 Hephzibah
  177: 22.80, // 125-680 Jules
  178: 30.50, // 125-598 Greta
  179: 20.00, // 125-596 Randit
  180: 22.00, // 225-552 Blyss
  182: 25.00, // 125-593 Simone
  183: 19.30, // 125-599 Peri
  184: 24.80, // 125-367 Gina
  185: 28.80, // 125-274 Magasa
  186: 35.50, // 124-890 Vetralia
  187: 21.30, // 125-448 Cassola fur
  188: 24.50, // 126-310 Rayna
  189: 34.50, // 126-134 Holly
  190: 28.00, // 126-307 Jabrielle
  191: 26.50, // 126-330 Keniya
  193: 22.30, // 226-024 Aveleen
  194: 25.00, // 125-656 Aliciana
  195: 27.50, // 125-164 Lesina
  196: 30.50, // 225-260 Nola
  197: 6.50, // NB 21-51 Benicio
  199: 6.50, // NB 21-50 Mateo
  201: 9.50, // NB 24-02 Gael
  202: 10.75, // NB 24-52 Lorenzo
  205: 9.00, // NB 21-58 Tomas
  206: 8.50, // NB 21-58 V Bruno
  209: 31.50, // 225-203 Ebele
  210: 20.50, // 224-512 Davina
  211: 9.80, // 226-314 Ales
  212: 9.80, // 226-321 Abbasanta
  214: 11.30, // 226-316 Fiesco
  215: 10.30, // 226-324 Pedara
  216: 13.50, // 226-318 Fiesco Plus
  218: 13.80, // 226-326 Ventura
  219: 10.00, // NL0071 Amelie
  221: 16.60, // 266229Y Bianca
  222: 19.30, // P02 Vera
  223: 21.80, // 266124J Ambar
  224: 21.50, // 263036L Roma
  225: 19.30, // P01 Viena
  226: 24.20, // 263098L Mora
  227: 22.60, // P04 Nala
  230: 12.30, // 265604 Uma
  231: 12.80, // 2518 Aurelia
  232: 15.60, // 6266 Avelina
  233: 14.50, // 8711 Calista
  236: 10.50, // - Violeta
  237: 13.20, // - Serena
  241: 12.00, // F74617 Teza
  245: 18.00, // 2620 Guillermina
  247: 18.00, // 7250 Tainy
  248: 19.10, // - Donna
  255: 7.80, // NB 21-51 BIG Benicio plus
  256: 7.80, // NB 21-50 BIG Mateo plus
  257: 8.30, // NB 21-56 BIG Dante plus
  258: 8.65, // NB 21-58 BIG Bruno plus
  259: 13.80, // 126-577 Cumiana Jacket
  260: 15.50, // 226-446 Keith jacket
  264: 14.50, // 126-532 Zoyles
  265: 15.50, // 126-283 Taft mesh
  10000: 20.30, // 125-674 Clarita
  10006: 20.75, // 125-055 Ponna
  10007: 32.50, // 226-423 Mack
  10009: 17.00, // 126-433 Elara
};

// Correcciones de género según las listas de precios (la base los trae mal cargados).
window.MAYORISTA_GENDERS = {
  218: 'MUJER', // 226-326 Ventura Reversible: "Campera reversible con piel mujer" (lista Dama)
};
