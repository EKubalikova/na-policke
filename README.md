# Webová aplikácia Shelfee

Aplikácia Shelfee slúži pre evidenciu súkromných zbierok kníh. Užívateľ si tak v rámci svojho účtu dokáže spravovať svoju súkromnú knižnicu tak, že jednotlivé knihy eviduje na poličkách, ktorým prisudzuje názov (napr. Polička nad krbom, Piata polička v knižnici Billy).

Pre používanie aplikácie je nutná registrácia. Po vytvorení registrácie sa užívateľ prihlási a môže začať vytvárať poličky, na ktoré bude následne pridávať knižky.

Užívateľ si po pridaní poličiek môže na konkrétne poličky pridať knižky. Údaje o knižke môže vyplniť buď manuálne, alebo automaticky po zadaní ISBN, ktoré umožní vyhľadať ďalšie údaje o knihe. Na automatické vypĺňanie údajov sa využíva Google Books API. 

Užívateľ si môže trackovať pokrok v čítaní, označiť obľúbené knihy a v zozname kníh prehľadávať knihy a filtorvať ich podľa vytvorených tagov.

Pre nasadenie aplikácie bola využitá služba Firebase.

Zhrnutie funkcionality:
- registrácia užívateľa
- prihlásenie a odhlásenie užívateľa
- vytvorenie poličky
- vytvorenie a vymazanie záznamu o knihe
	- vyhľadávanie podľa ISBN a automatické doplnenie údajov
	- kontrola či daná kniha v databáze už nie je evidovaná
	- zadávanie dát o názve, autorovi, ISBN, počte strán, roku vydania, obálky knihy
	- priradenie knihy na konkrétnu poličku z DB
	- pridanie vlastných tagov ku knihe
- označenie knihy ako obľúbenej
- označenie knihy ako práve čítam
- trackovanie pokroku v čítaní, zadanie stany na ktorej sa práve užívateľ v knihe nachádza
- vizuálne zobrazenie kníh na poličkách s možnosťou pridať ďalšiu knihu
- zobrazenie detailu knihy
- pridávanie poznámok ku knihe
- zobrazenie zoznamu kníh
	- vyhľadávanie v zozname kníh
	- filtrovanie podľa tagov aj názvov, ktoré si užívateľ vytvoril, medzi ktorými sa predpokladá, že bude užívateľ používať hlavne žánre

Fotografia knižnice v aplikácií je prevzatá zo služby Unsplash na adrese: https://unsplash.com/s/photos/library-trnava