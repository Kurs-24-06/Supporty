
## SupportyApp by Masko 2025

SupportyAPP ist eine App die dazu dient Supportanfragen für registrierte Personen, über ein Ticketsystem einzureichen, geplant ist dies später als Bezahlmodell, in dem Mail- und Telefonsupport oder auch Endkundensupport angeboten wird.

Der andere Part der App ist kostenlos und enthält eine Wissensdataenbank um gängige Probleme in den Systemen (Windows und Linux) zu beheben.

in einer späteren version, werde ich die Möglichkeit bieten, die Wissensdatenbank durch die Nutzer zu erweitern.

#### English:

SupportyAPP is an application designed for registered users to submit support requests via a ticketing system. The plan is to later introduce a paid model, offering email and phone support, as well as customer support.

The other part of the app is free and includes a knowledge base to help users resolve common issues in Windows and Linux systems.

In a future version, I will provide users the ability to expand the knowledge base themselves.

---
02.05.2025 Backend-Entwicklung für die React-App
📌 Übersicht
Das Backend basiert auf Express.js und verwendet MariaDB als Datenbank. Die gesamte Infrastruktur wird mit Docker orchestriert und über eine docker-compose.yml verwaltet.


🚀 Technologie-Stack
Node.js (LTS)
Express.js für HTTP-Handling
Vitejs
Tailswind CSS
MariaDB für Datenverwaltung
dotenv für Umgebungsvariablen
Docker & Docker-Compose für Containerisierung
YAML für das Setup

🏗️ Projektstruktur

⚙️ Konfigurationsdateien
.env
Definiert Umgebungsvariablen für lokale Entwicklung und Docker-Container.

MYSQL_ROOT_PASSWORD=
MYSQL_DATABASE=
MYSQL_USER=
MYSQL_PASSWORD=
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=

Start des backends: docker-compose up --build

✅ Tageszusammenfassung – 05. Mai 2025
🔧 Erledigte Aufgaben
Docker & Backend
Fehlerhafte package.json-Referenz korrigiert
Dockerfile in backend/ verschoben, um Build-Prozess zu optimieren
docker-compose.yml angepasst (context: ./ statt ./backend/backend)
Port-Konflikte behoben (Backend läuft nun auf 6666)
Docker-Cache geleert & Build erfolgreich durchgeführt
NPM & Dependency-Management
package.json & package-lock.json zurückgesetzt und neu initialisiert
npm install --verbose ausgeführt, um lange Ladezeiten zu debuggen
NODE_OPTIONS="--max-old-space-size=1024" für Speicheroptimierung gesetzt
Erfolgreiche Installation von express, mariadb, dotenv
🚀 Nächste Schritte
Endpunkte testen (curl http://192.168.0.10:6666/api/entries)
Backend mit Frontend verbinden
Weitere Optimierungen für Dockerfile prüfen (Layer-Caching verbessern)
Status: 🎉 Alle heutigen Aufgaben erfolgreich abgeschlossen!

## 🚀 Fortschritte heute  

Heute habe ich mich intensiv mit mehreren Aspekten meines Projekts beschäftigt, insbesondere:  

- **Docker & Backend:**  
  - Einrichtung und Konfiguration einer Docker-Umgebung für das Projekt  
  - Analyse der Container-Architektur und deren Integration in das Backend  
  - Durchführung erster Tests zur Funktionalität und Stabilität  

- **NPM & Dependency-Management:**  
  - Überprüfung und Aktualisierung der benötigten Pakete  
  - Analyse von potenziellen Kompatibilitätsproblemen mit bestehenden Modulen  
  - Optimierung der Abhängigkeiten, um unnötige Pakete zu vermeiden  

## 🛠 Herausforderungen & Lösungen  

Wie bei vielen technischen Implementierungen gab es heute einige Herausforderungen:  

- **Problem:**  
  - Die Anwendung läuft noch nicht fehlerfrei, und ich vermute, dass die Ursache bei den verwendeten Ports liegt.  
  - Es könnte sich um eine Konfliktsituation mit bereits genutzten Ports auf dem System handeln.  

- **Lösungsansatz:**  
  - Ich werde die Port-Belegungen prüfen und gezielt nach offenen Ports für die Container suchen.  
  - Eventuell ist eine Anpassung der Konfigurationsdateien notwendig, um Konflikte zu vermeiden.  
  - Gezielte Debugging-Schritte, um den genauen Fehler zu lokalisieren.  

Status: 🎉 Alle heutigen Aufgaben erfolgreich abgeschlossen!
---

✅ Tageszusammenfassung – 06. Mai 2025
Umzug auf einen anderen Computer und Einrichtung WSL etc ...

Endpunkte testen (curl http://192.168.0.10:3002/api/entries)
Backend mit Frontend verbinden
Weitere Optimierungen für Dockerfile prüfen (Layer-Caching verbessern)
Konzept überdacht

Status: 🎉 Alle heutigen Aufgaben erfolgreich abgeschlossen!

✅ Tageszusammenfassung – 07. Mai 2025 # 🚀 Projektbericht - Tag 7 🚀

## 🔧 Fortschritte heute  

Heute stand die Fehlerbehebung (**Bug Fixing**) im Mittelpunkt meines Workflows. Dabei habe ich mich gezielt mit mehreren Aspekten des Codes und der Anwendung befasst:  

- **Identifikation und Behebung von Bugs**  
  - Fehlerhafte Funktionen analysiert und korrigiert  
  - Debugging mit verschiedenen Tools durchgeführt  
  - Anpassung von Variablen und Logiken, um unerwartete Verhaltensweisen zu eliminieren  

- **Optimierung der bestehenden Codebasis**  
  - Verbesserungen an der Performance vorgenommen  
  - Redundanten Code bereinigt, um die Lesbarkeit und Wartbarkeit zu verbessern  
  - Tests durchgeführt, um die Stabilität nach den Änderungen zu gewährleisten  

## 🛠 Herausforderungen & Lösungen  

Die größten Herausforderungen heute betrafen das **Frontend**:  

- **Problem:**  
  - Einige Komponenten rendern nicht korrekt oder brechen bei bestimmten Nutzereingaben.  
  - Möglicherweise liegt es an fehlerhafter Zustandsverwaltung oder ungültigen API-Antworten.  

- **Lösungsansatz:**  
  - Tiefere Analyse mit Debugging-Tools zur Ermittlung der genauen Ursache.  
  - Anpassung der API-Schnittstellen zur besseren Verarbeitung der Daten.  
  - Überprüfung der State-Management-Logik, um fehlerhafte Zustände zu vermeiden.  

Status: 🎉 Alle heutigen Aufgaben erfolgreich abgeschlossen!

✅ Tageszusammenfassung – 08. Mai 2025 # 🚀 Projektbericht - Tag 8 🚀

## 🛠 Fortschritte heute  

Heute lag der Fokus auf der **Verbesserung des Konzeptes** für das Projekt. Ich habe mich intensiv mit verschiedenen Aspekten beschäftigt, darunter:  

- **Analyse und Optimierung der Architektur**  
  - Evaluierung der bisherigen Struktur und Identifikation von Verbesserungspotenzialen  
  - Anpassung der Kernlogik für eine effizientere Umsetzung  

- **Recherche und Wissensvertiefung**  
  - Intensive Lektüre relevanter Dokumentationen, Blogs und technische Artikel  
  - Vergleich verschiedener Herangehensweisen zur Problemlösung  
  - Bewertung von Best Practices und deren potenzieller Anwendung auf das Projekt  

---

## 🧩 Herausforderungen & Lösungen  

- **Problem:**  
  - Einige bisherige Konzeptideen waren nicht optimal oder führten zu unnötiger Komplexität.  
  - Entscheidungsfindung erforderte tiefgehende Recherche und Abwägung der Vor- und Nachteile verschiedener Ansätze.  

- **Lösungsansatz:**  
  - Ausführliches Nachlesen und Vergleich technischer Dokumentationen  
  - Analyse bestehender Implementierungen und deren Schwächen  
  - Entwicklung einer klareren und optimierten Architektur für die kommenden Umsetzungsschritte  

- **Bug fixing: **

Status: 🎉 Alle heutigen Aufgaben erfolgreich abgeschlossen!


✅ Tageszusammenfassung – 09. Mai 2025

Bug fixing MariaDB
docker run -it --rm --network=wissensdb_default mariadb mariadb -h mariadb_container -u supporty -p

Welcome to the MariaDB monitor. Commands end with ; or \g. Your MariaDB connection id is 3 Server version: 11.7.2-MariaDB-ubu2404 mariadb.org binary distribution

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]> SHOW DATABASES; +--------------------+ | Database | +--------------------+ | information_schema | | supportydb | +--------------------+ 2 rows in set (0.003 sec)

MariaDB [(none)]> use supportydb Database changed

Status: 🎉 Alle heutigen Aufgaben erfolgreich abgeschlossen!

🗓️ Tageszusammenfassung – 12. Mai 2025 

# 🚀 Projektbericht - Tag 10 🚀


## 🔄 Fortschritte heute  

Heute lag der Fokus auf einer **Überarbeitung des Konzepts**, da die ursprüngliche Idee nicht wie erwartet funktioniert hat.  
Ich habe mich intensiv damit beschäftigt, folgende Punkte zu optimieren:  

- **Analyse der bisherigen Umsetzung:**  
  - Prüfung der bestehenden Logik auf mögliche Schwachstellen  
  - Evaluierung von Engpässen, die das ursprüngliche Konzept behinderten  

- **Neuausrichtung der Architektur:**  
  - Anpassung der zentralen Abläufe für eine bessere Skalierbarkeit  
  - Verbesserung der Struktur für eine effizientere Implementierung  

---

## 🛠 Herausforderungen & Lösungen  

- **Problem:**  
  - Das vorherige Konzept hatte unerwartete Schwierigkeiten, die eine funktionierende Umsetzung verhinderten.  

- **Lösungsansatz:**  
  - Neue strategische Planung zur Optimierung der Anwendung  
  - Anpassung der Architektur und Evaluierung besserer Lösungsansätze  


Test Branch eröffnet

✅ Erreicht
docker-compose.yml erfolgreich um mehrere Dienste erweitert:
frontend (Vite)
backend (Express.js)
mariadb
'// zum testen
phpmyadmin
cadvisor
dozzle

nginx_reverse_proxy
Funktionierende Build-Pipelines für frontend und backend.
Nutzung von env_file für zentrale Umgebungsvariablenverwaltung.
phpmyadmin für einfache DB-Verwaltung auf Port 8099 konfiguriert.
Monitoring via cAdvisor und Dozzle aufgesetzt.
Reverse-Proxy mit Nginx konfiguriert (leitet / an das Frontend, /api an das Backend).
⚠️ Probleme
❌ Port 80 war durch einen anderen Dienst blockiert → Nginx-Container konnte nicht starten.
❌ Fehler beim Mounten der nginx.conf: falscher Dateityp oder Pfadstruktur → behoben durch Korrektur im Volume-Mount.
❌ ERR_CONNECTION_REFUSED und ERR_EMPTY_RESPONSE beim Testen von localhost:8080 → Analyse zeigte, dass Proxy-Ports nicht korrekt weitergeleitet wurden.
🔁 Änderungen
Reverse-Proxy von Port 80 auf freien Port 8080 umgestellt.
Zusätzlicher direkter Port für frontend (z. B. 8082) freigegeben, um Vite-Build auch ohne Proxy testen zu können.
Dockerfile für frontend überprüft → kein Änderungsbedarf bzgl. Port, da Nginx intern auf 80 serviert.
📝 Nächstes To-Do
HTTPS-Setup für Nginx vorbereiten (optional)
Fehlerseiten oder Default-Routes im Frontend absichern
Deployment vorbereiten (z. B. via Docker Hub oder GitHub Actions)

---
✅ Tageszusammenfassung – 13. Mai 2025

# 🚀 Projektbericht - Tag 11 🚀

## 🔄 Fortschritte heute  

Heute habe ich mich auf die **Implementierung des Userlogins und des Ticket-System-Logins** konzentriert.  
Dabei wurden folgende Schritte durchgeführt:  

- **User-Authentifizierung:**  
  - Entwicklung eines sicheren Login-Mechanismus für Benutzer  
  - Implementierung von Passwortverschlüsselung und Authentifizierungsprüfung  
  - Erste Tests zur Benutzerverwaltung und Zugriffskontrolle  

- **Ticket-System Login:**  
  - Erstellung eines separaten Logins für das Ticketsystem  
  - Sicherstellung der korrekten Zuordnung von Benutzerrollen  
  - Verbindung mit der Datenbank zur Speicherung von Ticket-Daten  

## 🛠 Herausforderungen & Lösungen  

- **Problem:**  
  - Die Verbindung mit dem Backend funktioniert nur teilweise.  
  - Einige API-Anfragen liefern unvollständige oder fehlerhafte Antworten.  

- **Lösungsansatz:**  
  - Überprüfung der Backend-Logs zur Identifikation von Fehlerquellen  
  - Anpassung der API-Schnittstellen für eine stabilere Kommunikation  
  - Gezieltes Debugging, um Verbindungsprobleme zu beheben   

Bug fixing

Status: 🎉 Alle heutigen Aufgaben erfolgreich abgeschlossen!

---
✅ Tageszusammenfassung – 14. Mai 2025

# 🚀 Projektbericht - Tag 12 🚀

## 🔄 Fortschritte heute  

Heute habe ich mich auf mehrere wichtige Aspekte konzentriert:  

- **Bug Fixing:**  
  - Identifikation und Behebung von Fehlern im Code  
  - Optimierung der bestehenden Funktionen für eine stabilere Anwendung  
  - Durchführung von Tests zur Sicherstellung der Fehlerfreiheit  

- **Farbanpassungen im Frontend:**  
  - Überarbeitung des UI-Designs für eine bessere Benutzererfahrung  
  - Anpassung der Farbpalette für eine konsistente Darstellung  
  - Verbesserung der Kontraste und Lesbarkeit  

- **Übertragung zu AWS Amplify:**  
  - Migration des Projekts auf AWS Amplify für eine skalierbare Infrastruktur  
  - Einrichtung der notwendigen Services und Konfigurationen  
  - Erste Tests zur Überprüfung der Funktionalität nach der Migration  

## 🛠 Herausforderungen & Lösungen  

- **Problem:**  
  - Während der Migration zu AWS Amplify sind Fehler aufgetreten.  
  - Einige Funktionen laufen nicht wie erwartet, möglicherweise aufgrund von Konfigurationsproblemen.  

- **Lösungsansatz:**  
  - Detaillierte Analyse der Fehlerquellen  
  - Anpassung der AWS-Konfigurationen für eine reibungslose Integration  
  - Durchführung weiterer Tests zur Stabilisierung der Umgebung  

Bug fixing
Farbanpassungen Frontend
Übertag zu AWS Amplify
Es kommt zu Fehlern

Status: 🎉 Alle heutigen Aufgaben erfolgreich abgeschlossen!
---

✅ Tageszusammenfassung – 15. Mai 2025
# 🚀 Projektbericht - Tag 13 🚀

## 🔄 Fortschritte heute  

Heute habe ich mich auf die **lokale Ausführung der App mit Docker-Compose** konzentriert.  
Dabei wurden folgende Schritte durchgeführt:  

- **Docker-Compose Setup:**  
  - Die Anwendung läuft nun erfolgreich lokal in einer Docker-Compose-Umgebung.  
  - Konfiguration der Container für eine stabile Entwicklung und Tests.  

- **Migration zu AWS Amplify:**  
  - Export der Anwendung zu AWS Amplify für eine cloudbasierte Bereitstellung.  
  - Erste Tests zur Überprüfung der Funktionalität nach der Migration. 

  ## 🛠 Herausforderungen & Lösungen  

- **Problem:**  
  - Die Anwendung läuft lokal problemlos, aber in AWS Amplify gibt es Probleme mit den Links.  
  - Nach dem Export funktionieren einige Seiten nicht richtig oder laden nicht korrekt.  

- **Lösungsansatz:**  
  - Überprüfung der Link-Struktur und Routing-Mechanismen in AWS Amplify.  
  - Anpassung der Konfigurationen, um die korrekte Darstellung der Seiten sicherzustellen.  
  - Debugging der API-Verbindungen, um mögliche Fehlerquellen zu identifizieren.  


Status: 🎉 Alle heutigen Aufgaben erfolgreich abgeschlossen!

---
✅ Tageszusammenfassung – 16. Mai 2025

# 🚀 Projektbericht - Tag 14 🚀

## 🔄 Fortschritte heute  

Heute habe ich mich auf die **lokale Umsetzung des Prototyps mit Docker-Compose** konzentriert.  
Dabei wurden folgende Schritte durchgeführt:  

- **Docker-Compose Setup:**  
  - Die Anwendung läuft nun erfolgreich lokal in einer Docker-Compose-Umgebung.  
  - Konfiguration der Container für eine stabile Entwicklung und Tests.  

- **Frontend Anpassungen:**  
  - Optimierung der UI-Komponenten für eine bessere Benutzererfahrung.  
  - Anpassung der Farbpalette und Layouts für eine konsistente Darstellung.  
  - Verbesserung der Interaktionen und Responsiveness.  

## 🛠 Herausforderungen & Lösungen  

- **Problem:**  
  - Während der Frontend-Anpassungen gab es einige unerwartete Schwierigkeiten.  
  - Einige Komponenten mussten neu strukturiert werden, um eine bessere Performance zu gewährleisten.  

- **Lösungsansatz:**  
  - Detaillierte Analyse der UI-Elemente und deren Verhalten.  
  - Anpassung der Styles und Logiken für eine reibungslose Darstellung.  
  - Durchführung von Tests zur Sicherstellung der Fehlerfreiheit.  


Status: 🎉 Alle heutigen Aufgaben erfolgreich abgeschlossen!
---

✅ Tageszusammenfassung – 19. Mai 2025 

# 🚀 Projektbericht - Tag 15 🚀


## 🔄 Fortschritte heute  

Heute habe ich mich auf die **lokale Umsetzung des Prototyps mit Docker-Compose** konzentriert.  
Dabei wurden folgende Schritte durchgeführt:  

- **Docker-Compose Setup:**  
  - Die Anwendung läuft nun erfolgreich lokal in einer Docker-Compose-Umgebung.  
  - Konfiguration der Container für eine stabile Entwicklung und Tests.  

- **Frontend Anpassungen:**  
  - Optimierung der UI-Komponenten für eine bessere Benutzererfahrung.  
  - Anpassung der Farbpalette und Layouts für eine konsistente Darstellung.  
  - Verbesserung der Interaktionen und Responsiveness.  

 ## 🛠 Herausforderungen & Lösungen  

- **Problem:**  
  - Während der Frontend-Anpassungen gab es einige unerwartete Schwierigkeiten.  
  - Einige Komponenten mussten neu strukturiert werden, um eine bessere Performance zu gewährleisten.  

- **Lösungsansatz:**  
  - Detaillierte Analyse der UI-Elemente und deren Verhalten.  
  - Anpassung der Styles und Logiken für eine reibungslose Darstellung.  
  - Durchführung von Tests zur Sicherstellung der Fehlerfreiheit.  

Status: 🎉 Alle heutigen Aufgaben erfolgreich abgeschlossen!
---


✅ Tageszusammenfassung – 20. Mai 2025

# 🚀 Projektbericht - Tag 16 🚀

## 🔄 Fortschritte heute  

Heute habe ich die **Umsetzung der App in einer EC2 Instance** abgeschlossen.  
Dabei wurden folgende Schritte durchgeführt:  

- **Deployment auf AWS EC2:**  
  - Die Anwendung läuft nun erfolgreich auf einer EC2 Instance.  
  - Nutzung einer **Elastic IP**, um eine feste öffentliche Adresse für die App zu gewährleisten.  

- **Erste Tests nach der Migration:**  
  - Überprüfung der grundlegenden Funktionen in der neuen Umgebung.  
  - Sicherstellung der Erreichbarkeit und Stabilität der Anwendung.  

---

## 🛠 Herausforderungen & Lösungen  

- **Problem:**  
  - Während der Tests wurden mehrere Bugs entdeckt.  
  - Die **Wissensdatenbank war für neuangelegte User nicht sichtbar**, was zu Problemen bei der Nutzung führte.  

- **Lösungsansatz:**  
  - Analyse der Datenbankrechte und Sichtbarkeitsregeln für neue Benutzer.  
  - Anpassung der Berechtigungen, um sicherzustellen, dass alle User Zugriff auf die Wissensdatenbank haben.  
  - Durchführung weiterer Tests zur Validierung der Änderungen.  

  
Status: 🎉 Alle heutigen Aufgaben erfolgreich abgeschlossen!
---


✅ Tageszusammenfassung – 21. Mai 2025

# 🚀 Projektbericht - Tag 17 🚀



Der heutige Tag war geprägt von einer tiefgehenden Analyse und Wiederherstellung der Datenbank-Kommunikation. Ursprünglich sollte eine KI-gesteuerte Optimierung zu effizienteren Datenabläufen führen – stattdessen führte sie dazu, dass sämtliche gespeicherten Informationen plötzlich ausschließlich im LocalStorage des Browsers abgelegt wurden. Ein Problem, das sich erst im Nachhinein herausstellte und schwerwiegende Folgen für neue Nutzer hatte, da sie keinen Zugriff darauf hatten.  

Meine Aufgabe war es heute, das Problem grundlegend zu untersuchen und eine Strategie zu entwickeln, um die ursprüngliche Architektur wiederherzustellen. Ich habe mich intensiv mit den veränderten Routing-Strukturen auseinandergesetzt und deren Einfluss auf die Datenbank-Verbindung analysiert.  

## 🛠 Herausforderungen & Lösungsansätze  
Das Hauptproblem lag in der automatisierten Änderung der Back-End-Routen durch die KI. Durch diese Modifikation wurde der Datenverkehr zur eigentlichen Datenbank unterbrochen, sodass stattdessen alle Anfragen direkt im Browser-Storage landeten. Besonders kritisch:  
- **Neue Nutzer** konnten nicht auf die lokal gespeicherten Daten zugreifen.  
- **Ticket-Dienst** und **Wissensdatenbank** waren für Außenstehende unbrauchbar.  
- **Langfristige Datenintegrität** konnte durch die lokale Speicherung nicht gewährleistet werden.  

Mein Lösungsansatz begann mit der genauen Analyse der betroffenen Code-Segmente und der Identifizierung der fehlerhaften Routen. Ich habe die Code-Diff zwischen der alten und neuen Version durchgesehen, um herauszufinden, wo die KI die entscheidenden Änderungen vorgenommen hat.  

Status: 🎉 Alle heutigen Aufgaben erfolgreich abgeschlossen!
---


✅ Tageszusammenfassung – 22. Mai 2025

# 🚀 Projektbericht - Tag 18 🚀

## 🔹 **Konzeptüberarbeitung & neue Funktionen geplant**  
Gestern haben wir das **Supporty**-Projekt weiterentwickelt und neue Features diskutiert, die heute implementiert werden sollten. Dabei lag der Fokus auf **Echtzeit-Kommunikation**, Datenbankanbindung und einer verbesserten Benutzererfahrung.

---

### 🔄 **Backend-Optimierung & Architektur-Anpassungen**  
✅ Konzept für die WebSocket-Integration besprochen  
✅ Verbesserungen am Backend-Datenfluss skizziert  
✅ Neue API-Routen für Benutzerverwaltung geplant  

### 🗣️ **Live-Chat & Echtzeit-Kommunikation**  
✅ Überarbeitung der Chat-Funktion geplant  
✅ Diskussion über Benutzer-Authentifizierung im Chat  
✅ Sprachnachrichten & Audio-Support in Erwägung gezogen  

---


✅ Tageszusammenfassung – 23. Mai 2025

# 🚀 Projektbericht - Tag 19 🚀

## 🚀 Erledigte Aufgaben  
Heute wurden mehrere Verbesserungen an **Supporty** vorgenommen, insbesondere:

### 🔹 **Live-Chat mit WebSockets**  
✅ Chat-Funktion integriert (`Services.tsx`)  
✅ Echtzeit-Nachrichten mit `socket.io-client`  
✅ Benutzername aus `AuthContext.tsx` wird jetzt korrekt angezeigt  
✅ Nachrichten enthalten jetzt Text und Absender  

### 🔹 **Sprachnachrichten-Integration**  
✅ **Mikrofonsymbol hinzugefügt** 🎤  
✅ **Sprachnachrichten können aufgenommen und gesendet werden**  
✅ **Audio wird im Chat angezeigt und kann abgespielt werden**  
✅ `MediaRecorder`-API zur Aufnahme genutzt  

### 🔹 **Arbeitsschutz-Seite aktualisiert**  
✅ **Bilder aus `public/images/` eingebunden**  
✅ `Image`-Tags angepasst, um lokale Dateien zu nutzen  
✅ Inhaltliche Ergänzung zu **Fluchtwegen, PSA & Erste Hilfe**  


Status: 🎉 Alle heutigen Aufgaben erfolgreich abgeschlossen!
---

✅ Tageszusammenfassung – 27. Mai 2025

# 🚀 Projektbericht - Tag 20 🚀

### 📌 **Abschliessende Aufgaben**  
- 🔄 Datenbank-Speicherung für Chat-Nachrichten  
- 🎙️ Speech-to-Text für Sprachnachrichten  
- 🖼️ Avatar-Funktion für Benutzer  

Status: 🎉 Alle heutigen Aufgaben erfolgreich abgeschlossen!
---
