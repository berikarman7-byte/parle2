// Carnet de Mots — vocabulary data
// Each category is an array of [French, English] pairs.
// French nouns include their article (le/la/l'/les) to show gender.
// Feel free to add more categories or words — see README.md.

const VOCAB = {

"Basics & greetings": [
["bonjour","hello / good day"],["bonsoir","good evening"],["salut","hi / bye (informal)"],
["au revoir","goodbye"],["merci","thank you"],["merci beaucoup","thank you very much"],
["s'il vous plaît","please (formal)"],["s'il te plaît","please (informal)"],["pardon","sorry / pardon"],
["excusez-moi","excuse me"],["de rien","you're welcome"],["oui","yes"],["non","no"],
["peut-être","maybe"],["d'accord","okay"],["comment","how"],["pourquoi","why"],["quand","when"],
["où","where"],["qui","who"],["quoi","what"],["combien","how much / how many"],
["aujourd'hui","today"],["demain","tomorrow"],["hier","yesterday"],["maintenant","now"],
["ici","here"],["là","there"],["et","and"],["ou","or"],["mais","but"],["avec","with"],
["sans","without"],["pour","for"],["dans","in"],["sur","on"],["sous","under"],
["entre","between"],["bienvenue","welcome"],["félicitations","congratulations"],
["à bientôt","see you soon"],["bonne chance","good luck"],["bonne nuit","good night"],
["comment ça va","how's it going"],["enchanté","nice to meet you"]
],

"Numbers": [
["zéro","zero"],["un","one"],["deux","two"],["trois","three"],["quatre","four"],
["cinq","five"],["six","six"],["sept","seven"],["huit","eight"],["neuf","nine"],
["dix","ten"],["onze","eleven"],["douze","twelve"],["treize","thirteen"],["quatorze","fourteen"],
["quinze","fifteen"],["seize","sixteen"],["dix-sept","seventeen"],["dix-huit","eighteen"],
["dix-neuf","nineteen"],["vingt","twenty"],["vingt et un","twenty-one"],["trente","thirty"],
["quarante","forty"],["cinquante","fifty"],["soixante","sixty"],["soixante-dix","seventy"],
["quatre-vingts","eighty"],["quatre-vingt-dix","ninety"],["cent","one hundred"],
["mille","one thousand"],["un million","one million"],
["premier","first"],["deuxième","second"],["troisième","third"],["quatrième","fourth"],
["cinquième","fifth"],["sixième","sixth"],["septième","seventh"],["huitième","eighth"],
["neuvième","ninth"],["dixième","tenth"]
],

"Colors": [
["rouge","red"],["orange","orange"],["jaune","yellow"],["vert","green"],["bleu","blue"],
["violet","purple"],["rose","pink"],["marron","brown"],["noir","black"],["blanc","white"],
["gris","gray"],["beige","beige"],["doré","golden"],["argenté","silver"],["turquoise","turquoise"],
["clair","light (color)"],["foncé","dark (color)"]
],

"Family": [
["la famille","family"],["le père","father"],["la mère","mother"],["le frère","brother"],
["la sœur","sister"],["le fils","son"],["la fille","daughter"],["le mari","husband"],
["la femme","wife"],["le grand-père","grandfather"],["la grand-mère","grandmother"],
["l'oncle","uncle"],["la tante","aunt"],["le cousin","cousin (male)"],["la cousine","cousin (female)"],
["le neveu","nephew"],["la nièce","niece"],["les parents","parents"],["les enfants","children"],
["le beau-père","father-in-law / stepfather"],["la belle-mère","mother-in-law / stepmother"],
["le beau-frère","brother-in-law"],["la belle-sœur","sister-in-law"],["le petit-fils","grandson"],
["la petite-fille","granddaughter"],["le jumeau","twin (male)"],["la jumelle","twin (female)"],
["le bébé","baby"],["l'ami","friend (male)"],["l'amie","friend (female)"]
],

"Body": [
["la tête","head"],["le visage","face"],["les cheveux","hair"],["l'œil","eye"],["les yeux","eyes"],
["le nez","nose"],["la bouche","mouth"],["les dents","teeth"],["l'oreille","ear"],["le cou","neck"],
["l'épaule","shoulder"],["le bras","arm"],["la main","hand"],["le doigt","finger"],["la jambe","leg"],
["le genou","knee"],["le pied","foot"],["le dos","back"],["le ventre","stomach / belly"],
["le cœur","heart"],["la peau","skin"],["le corps","body"],["l'estomac","stomach (organ)"],
["la gorge","throat"],["le sourcil","eyebrow"],["le menton","chin"],["la joue","cheek"],
["le poignet","wrist"],["la cheville","ankle"],["le coude","elbow"]
],

"Clothing": [
["le vêtement","clothing / garment"],["la chemise","shirt"],["le pantalon","pants"],
["la robe","dress"],["la jupe","skirt"],["le manteau","coat"],["la veste","jacket"],
["les chaussures","shoes"],["les chaussettes","socks"],["le chapeau","hat"],
["l'écharpe","scarf"],["les gants","gloves"],["la ceinture","belt"],["le pull","sweater"],
["le tee-shirt","t-shirt"],["le short","shorts"],["le maillot de bain","swimsuit"],
["les lunettes","glasses"],["la montre","watch"],["le sac","bag"],["le costume","suit"],
["la cravate","tie"],["le pyjama","pajamas"],["les bottes","boots"],["la casquette","cap"]
],

"Food & drink": [
["le pain","bread"],["l'eau","water"],["le lait","milk"],["le café","coffee"],["le thé","tea"],
["le vin","wine"],["la bière","beer"],["le jus","juice"],["le sucre","sugar"],["le sel","salt"],
["le poivre","pepper"],["l'huile","oil"],["le beurre","butter"],["le fromage","cheese"],
["les œufs","eggs"],["la viande","meat"],["le poulet","chicken"],["le bœuf","beef"],
["le porc","pork"],["le poisson","fish"],["les légumes","vegetables"],["les fruits","fruit"],
["la pomme","apple"],["la banane","banana"],["l'orange","orange (fruit)"],["la fraise","strawberry"],
["le raisin","grapes"],["la poire","pear"],["le citron","lemon"],["la carotte","carrot"],
["la tomate","tomato"],["la pomme de terre","potato"],["l'oignon","onion"],["l'ail","garlic"],
["la salade","salad / lettuce"],["le riz","rice"],["les pâtes","pasta"],["la soupe","soup"],
["le dessert","dessert"],["le gâteau","cake"],["la glace","ice cream"],["le chocolat","chocolate"],
["le miel","honey"],["la confiture","jam"],["la farine","flour"],["le petit-déjeuner","breakfast"],
["le déjeuner","lunch"],["le dîner","dinner"],["le repas","meal"],["la cuisine","cooking / cuisine"],
["le restaurant","restaurant"],["l'addition","the bill (restaurant)"],["la recette","recipe"],
["épicé","spicy"],["sucré","sweet"],["salé","salty"],["amer","bitter"],["délicieux","delicious"]
],

"Kitchen & dining": [
["la table","table"],["la chaise","chair"],["l'assiette","plate"],["le verre","glass"],
["la tasse","cup"],["la fourchette","fork"],["le couteau","knife"],["la cuillère","spoon"],
["la casserole","saucepan"],["la poêle","frying pan"],["le four","oven"],["le frigo","fridge"],
["l'évier","sink"],["la serviette","napkin / towel"]
],

"House & home": [
["la maison","house"],["l'appartement","apartment"],["la chambre","bedroom"],
["le salon","living room"],["la salle de bain","bathroom"],["le jardin","garden"],
["la porte","door"],["la fenêtre","window"],["le mur","wall"],["le toit","roof"],
["l'escalier","stairs"],["le sol","floor"],["le plafond","ceiling"],["la lampe","lamp"],
["le lit","bed"],["l'armoire","wardrobe"],["l'étagère","shelf"],["le miroir","mirror"],
["le tapis","rug / carpet"],["la clé","key"],["le garage","garage"],["le balcon","balcony"],
["la cave","cellar"],["le grenier","attic"]
],

"Time, days & seasons": [
["lundi","Monday"],["mardi","Tuesday"],["mercredi","Wednesday"],["jeudi","Thursday"],
["vendredi","Friday"],["samedi","Saturday"],["dimanche","Sunday"],
["janvier","January"],["février","February"],["mars","March"],["avril","April"],
["mai","May"],["juin","June"],["juillet","July"],["août","August"],["septembre","September"],
["octobre","October"],["novembre","November"],["décembre","December"],
["le printemps","spring"],["l'été","summer"],["l'automne","autumn / fall"],["l'hiver","winter"],
["la seconde","second (time)"],["la minute","minute"],["l'heure","hour"],["le jour","day"],
["la semaine","week"],["le mois","month"],["l'année","year"],["le matin","morning"],
["l'après-midi","afternoon"],["le soir","evening"],["la nuit","night"],["le week-end","weekend"],
["tôt","early"],["tard","late"],["souvent","often"],["toujours","always"],["jamais","never"],
["parfois","sometimes"]
],

"Weather & nature": [
["le soleil","sun"],["la pluie","rain"],["la neige","snow"],["le vent","wind"],
["le nuage","cloud"],["l'orage","storm"],["le brouillard","fog"],["chaud","hot"],
["froid","cold"],["frais","cool"],["humide","humid"],["sec","dry"],["la montagne","mountain"],
["la forêt","forest"],["la rivière","river"],["le lac","lake"],["la mer","sea"],
["l'océan","ocean"],["la plage","beach"],["le ciel","sky"],["l'étoile","star"],
["la lune","moon"],["l'arbre","tree"],["la fleur","flower"],["l'herbe","grass"],
["la feuille","leaf"],["la pierre","stone"],["le sable","sand"]
],

"Animals": [
["le chien","dog"],["le chat","cat"],["l'oiseau","bird"],["le cheval","horse"],
["la vache","cow"],["le mouton","sheep"],["le cochon","pig"],["la poule","hen"],
["le canard","duck"],["le lapin","rabbit"],["la souris","mouse"],["l'ours","bear"],
["le loup","wolf"],["le renard","fox"],["le lion","lion"],["le tigre","tiger"],
["l'éléphant","elephant"],["le singe","monkey"],["le serpent","snake"],["l'abeille","bee"],
["le papillon","butterfly"],["l'araignée","spider"],["la mouche","fly"],["la grenouille","frog"],
["la tortue","turtle"]
],

"Travel & transport": [
["la voiture","car"],["le train","train"],["l'avion","airplane"],["le bus","bus"],
["le bateau","boat"],["le vélo","bicycle"],["la moto","motorcycle"],["le taxi","taxi"],
["la gare","train station"],["l'aéroport","airport"],["le billet","ticket"],
["le passeport","passport"],["la valise","suitcase"],["l'hôtel","hotel"],["la carte","map"],
["le voyage","trip / journey"],["partir","to leave"],["arriver","to arrive"],
["voyager","to travel"],["conduire","to drive"],["le vol","flight"],
["la réservation","reservation"],["le passager","passenger"],["le conducteur","driver"],
["l'arrêt","stop (bus/train)"],["la station","station"]
],

"City & directions": [
["la ville","city"],["la rue","street"],["le quartier","neighborhood"],["le magasin","shop"],
["le marché","market"],["la banque","bank"],["la poste","post office"],["l'hôpital","hospital"],
["la pharmacie","pharmacy"],["l'école","school"],["l'université","university"],
["l'église","church"],["le musée","museum"],["le parc","park"],["la place","town square"],
["le pont","bridge"],["à gauche","to the left"],["à droite","to the right"],
["tout droit","straight ahead"],["près","near"],["loin","far"],["là-bas","over there"],
["le nord","north"],["le sud","south"],["l'est","east"],["l'ouest","west"]
],

"Common verbs": [
["être","to be"],["avoir","to have"],["faire","to do / make"],["aller","to go"],
["venir","to come"],["pouvoir","to be able to / can"],["vouloir","to want"],
["devoir","to have to / must"],["savoir","to know (a fact)"],["voir","to see"],
["prendre","to take"],["donner","to give"],["dire","to say"],["parler","to speak"],
["manger","to eat"],["boire","to drink"],["dormir","to sleep"],["travailler","to work"],
["jouer","to play"],["apprendre","to learn"],["comprendre","to understand"],
["écouter","to listen"],["regarder","to watch / look"],["lire","to read"],["écrire","to write"],
["chercher","to look for"],["trouver","to find"],["acheter","to buy"],["vendre","to sell"],
["payer","to pay"],["ouvrir","to open"],["fermer","to close"],["commencer","to start"],
["finir","to finish"],["aider","to help"],["aimer","to like / love"],["détester","to hate"],
["penser","to think"],["croire","to believe"],["connaître","to know (a person/place)"],
["demander","to ask"],["répondre","to answer"],["attendre","to wait"],["rester","to stay"],
["sortir","to go out"],["entrer","to enter"],["monter","to go up"],["descendre","to go down"],
["marcher","to walk"],["courir","to run"],["sourire","to smile"],["pleurer","to cry"],
["rire","to laugh"],["chanter","to sing"],["danser","to dance"],["nager","to swim"],
["tomber","to fall"],["se lever","to get up"],["se coucher","to go to bed"],
["se laver","to wash oneself"],["s'habiller","to get dressed"],["oublier","to forget"],
["se souvenir","to remember"],["changer","to change"],["essayer","to try"],
["continuer","to continue"],["arrêter","to stop"],["choisir","to choose"],
["décider","to decide"],["montrer","to show"],["offrir","to offer / give a gift"],
["recevoir","to receive"],["envoyer","to send"],["appeler","to call"],["visiter","to visit"],
["construire","to build"],["casser","to break"],["réparer","to repair"],["nettoyer","to clean"],
["ranger","to tidy up"],["préparer","to prepare"],["cuisiner","to cook"]
],

"Common adjectives": [
["grand","big / tall"],["petit","small"],["beau","beautiful / handsome"],["joli","pretty"],
["laid","ugly"],["bon","good"],["mauvais","bad"],["nouveau","new"],["vieux","old"],
["jeune","young"],["riche","rich"],["pauvre","poor"],["facile","easy"],["difficile","difficult"],
["rapide","fast"],["lent","slow"],["fort","strong"],["faible","weak"],["heureux","happy"],
["triste","sad"],["fatigué","tired"],["content","glad / pleased"],["fâché","angry"],
["calme","calm"],["gentil","kind"],["méchant","mean"],["intelligent","smart"],
["stupide","stupid"],["drôle","funny"],["sérieux","serious"],["important","important"],
["intéressant","interesting"],["ennuyeux","boring"],["propre","clean"],["sale","dirty"],
["plein","full"],["vide","empty"],["cher","expensive"],["gratuit","free (no cost)"],
["ouvert","open"],["fermé","closed"],["sec","dry"],["mouillé","wet"],["long","long"],
["court","short"],["large","wide"],["étroit","narrow"],["haut","high"],["bas","low"],
["lourd","heavy"],["léger","light (weight)"],["dur","hard"],["mou","soft"],["doux","soft / sweet (texture)"],
["épais","thick"],["mince","thin"],["gros","big / fat"],["maigre","skinny"]
],

"Emotions": [
["heureux","happy"],["triste","sad"],["en colère","angry"],["surpris","surprised"],
["effrayé","scared"],["inquiet","worried"],["fier","proud"],["jaloux","jealous"],
["amoureux","in love"],["gêné","embarrassed"],["déçu","disappointed"],["excité","excited"],
["ennuyé","annoyed"],["confus","confused"],["reconnaissant","grateful"],["curieux","curious"],
["nerveux","nervous"],["détendu","relaxed"],["seul","alone / lonely"],["satisfait","satisfied"]
],

"Work & school": [
["le travail","work / job"],["le bureau","office"],["la réunion","meeting"],
["le collègue","colleague"],["le patron","boss"],["l'employé","employee"],["le salaire","salary"],
["le métier","profession"],["l'entreprise","company"],["le projet","project"],
["l'ordinateur","computer"],["l'école","school"],["le collège","middle school"],
["le lycée","high school"],["l'université","university"],["l'élève","pupil"],
["l'étudiant","student"],["le professeur","teacher"],["le cours","class / course"],
["le devoir","homework"],["l'examen","exam"],["la note","grade"],["le livre","book"],
["le cahier","notebook"],["le stylo","pen"],["le crayon","pencil"],["la classe","classroom"],
["la bibliothèque","library"],["étudier","to study"]
],

"Technology": [
["l'ordinateur","computer"],["le téléphone","phone"],["l'écran","screen"],
["le clavier","keyboard"],["la souris","mouse (device)"],["internet","internet"],
["le site web","website"],["le mot de passe","password"],["l'application","app"],
["le logiciel","software"],["le fichier","file"],["imprimer","to print"],
["télécharger","to download"],["la batterie","battery"],["charger","to charge"],
["éteindre","to turn off"],["allumer","to turn on"],["la caméra","camera"],
["les écouteurs","headphones"]
],

"Sports & hobbies": [
["le sport","sport"],["le football","soccer"],["le basket","basketball"],["le tennis","tennis"],
["la natation","swimming"],["le vélo","cycling"],["la course","running / race"],
["la lecture","reading"],["la musique","music"],["le dessin","drawing"],["la peinture","painting"],
["la photographie","photography"],["le jardinage","gardening"],["le cinéma","cinema / movies"],
["la danse","dance"],["le jeu vidéo","video game"],["l'équipe","team"],["le match","game / match"],
["gagner","to win"],["perdre","to lose"],["s'entraîner","to train / practice"]
]

};
